/**
 * Marvel Tour — Push Worker (Cloudflare).
 * Пази абонаментите в KV и праща Web Push известия (VAPID, без шифрован payload —
 * Service Worker-ът дърпа съдържанието от /latest).
 *
 * Bindings (wrangler.toml / dashboard):
 *   KV namespace:  SUBS
 *   Vars:          VAPID_PUBLIC_KEY, VAPID_SUBJECT (mailto:you@site.bg), ALLOWED_ORIGIN
 *   Secrets:       VAPID_PRIVATE_KEY, ADMIN_TOKEN
 *
 * Endpoints:
 *   POST /subscribe   тяло = PushSubscription (от браузъра)
 *   POST /send        header x-admin-token; тяло = {title, body, url}  → разпраща до всички
 *   GET  /latest      връща последното известие (SW го чете при payload-less push)
 */

export default {
  async fetch(req, env) {
    const origin = env.ALLOWED_ORIGIN || '*';
    const cors = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, x-admin-token',
    };
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });

    const url = new URL(req.url);
    const J = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'Content-Type': 'application/json', ...cors } });

    // ---- /subscribe ----
    if (url.pathname === '/subscribe' && req.method === 'POST') {
      let sub; try { sub = await req.json(); } catch { return J({ error: 'bad json' }, 400); }
      if (!sub || !sub.endpoint) return J({ error: 'no endpoint' }, 400);
      const id = await sha256(sub.endpoint);
      await env.SUBS.put('sub:' + id, JSON.stringify(sub));
      return J({ ok: true });
    }

    // ---- /catalog (публикувани PeakView оферти) ----
    // GET: връща {ids:[...], prices:{id:bgn}, companies:{...}} — четат го всички (публично).
    // POST (админ): записва избора.
    if (url.pathname === '/catalog') {
      if (req.method === 'GET') {
        const c = await env.SUBS.get('catalog');
        return new Response(c || '{"ids":[],"prices":{}}',
          { headers: { 'Content-Type': 'application/json', ...cors } });
      }
      if (req.method === 'POST') {
        if (req.headers.get('x-admin-token') !== env.ADMIN_TOKEN) return J({ error: 'unauthorized' }, 401);
        let body; try { body = await req.json(); } catch { return J({ error: 'bad json' }, 400); }
        const clean = {
          ids: Array.isArray(body.ids) ? body.ids.slice(0, 2000).map(String) : [],
          prices: (body.prices && typeof body.prices === 'object') ? body.prices : {},
        };
        await env.SUBS.put('catalog', JSON.stringify(clean));
        return J({ ok: true, count: clean.ids.length });
      }
    }

    // ---- /latest ----
    if (url.pathname === '/latest' && req.method === 'GET') {
      const latest = await env.SUBS.get('latest');
      return new Response(latest || '{"title":"Marvel Tour","body":"Имаме нещо ново!"}',
        { headers: { 'Content-Type': 'application/json', ...cors } });
    }

    // ---- /send (само админ) ----
    if (url.pathname === '/send' && req.method === 'POST') {
      if (req.headers.get('x-admin-token') !== env.ADMIN_TOKEN) return J({ error: 'unauthorized' }, 401);
      let msg; try { msg = await req.json(); } catch { return J({ error: 'bad json' }, 400); }
      const payload = {
        title: (msg.title || 'Marvel Tour').slice(0, 80),
        body: (msg.body || '').slice(0, 200),
        url: msg.url || './index.html',
        ts: Date.now()
      };
      await env.SUBS.put('latest', JSON.stringify(payload));

      const list = await env.SUBS.list({ prefix: 'sub:' });
      let sent = 0, removed = 0;
      for (const k of list.keys) {
        const raw = await env.SUBS.get(k.name);
        if (!raw) continue;
        const sub = JSON.parse(raw);
        const aud = new URL(sub.endpoint).origin;
        const r = await fetch(sub.endpoint, {
          method: 'POST',
          headers: {
            'TTL': '86400',
            'Authorization': 'vapid t=' + (await makeVapidJwt(env, aud)) + ', k=' + env.VAPID_PUBLIC_KEY,
          },
        });
        if (r.status === 201 || r.status === 200) sent++;
        else if (r.status === 404 || r.status === 410) { await env.SUBS.delete(k.name); removed++; }
      }
      return J({ ok: true, sent, removed, total: list.keys.length });
    }

    return J({ error: 'not found' }, 404);
  },
};

// ===== Помощни =====
async function sha256(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}
function b64urlToBytes(s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/'); while (s.length % 4) s += '=';
  const bin = atob(s), arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}
function bytesToB64url(bytes) {
  let bin = ''; const a = new Uint8Array(bytes);
  for (let i = 0; i < a.length; i++) bin += String.fromCharCode(a[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

let _vapidKey = null;
async function getVapidKey(env) {
  if (_vapidKey) return _vapidKey;
  const pub = b64urlToBytes(env.VAPID_PUBLIC_KEY); // 65 байта: 0x04 + x(32) + y(32)
  const jwk = {
    kty: 'EC', crv: 'P-256',
    x: bytesToB64url(pub.slice(1, 33)),
    y: bytesToB64url(pub.slice(33, 65)),
    d: env.VAPID_PRIVATE_KEY.replace(/-/g, '-'), // вече е base64url
    ext: true, key_ops: ['sign'],
  };
  _vapidKey = await crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  return _vapidKey;
}
async function makeVapidJwt(env, aud) {
  const header = bytesToB64url(new TextEncoder().encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const payload = bytesToB64url(new TextEncoder().encode(JSON.stringify({
    aud: aud || 'https://fcm.googleapis.com',
    exp: Math.floor(Date.now() / 1000) + 12 * 3600,
    sub: env.VAPID_SUBJECT || 'mailto:admin@example.com',
  })));
  const input = header + '.' + payload;
  const key = await getVapidKey(env);
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, new TextEncoder().encode(input));
  return input + '.' + bytesToB64url(sig);
}
