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

    // ---- /hotels?url=<programa.php> — списък хотели за оферта (динамично + KV кеш) ----
    if (url.pathname === '/hotels' && req.method === 'GET') {
      const target = url.searchParams.get('url') || '';
      if (!isPeakview(target)) return J({ error: 'bad url' }, 400);
      const ck = 'hl:' + await sha256(target);
      if (!url.searchParams.get('fresh')) { const c = await env.SUBS.get(ck); if (c) return new Response(c, { headers: { 'Content-Type': 'application/json', ...cors } }); }
      const html = await (await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
      const hotels = parseHotelList(html);
      const body = JSON.stringify({ hotels });
      await env.SUBS.put(ck, body, { expirationTtl: 86400 });
      return new Response(body, { headers: { 'Content-Type': 'application/json', ...cors } });
    }

    // ---- /hotel?url=<hotel-pochivka.php> — галерия + цени по дати за един хотел ----
    if (url.pathname === '/hotel' && req.method === 'GET') {
      const target = url.searchParams.get('url') || '';
      if (!isPeakview(target)) return J({ error: 'bad url' }, 400);
      const ck = 'h1:' + await sha256(target);
      if (!url.searchParams.get('fresh')) { const c = await env.SUBS.get(ck); if (c) return new Response(c, { headers: { 'Content-Type': 'application/json', ...cors } }); }
      const html = await (await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
      const body = JSON.stringify(parseHotelDetail(html));
      await env.SUBS.put(ck, body, { expirationTtl: 86400 });
      return new Response(body, { headers: { 'Content-Type': 'application/json', ...cors } });
    }

    // ---- /detail?url=<programa.php> — галерия + 4-те панела (програма/хотели/вкл./изкл.), динамично ----
    if (url.pathname === '/detail' && req.method === 'GET') {
      const target = url.searchParams.get('url') || '';
      if (!isPeakview(target)) return J({ error: 'bad url' }, 400);
      const ck = 'd1:' + await sha256(target);
      if (!url.searchParams.get('fresh')) { const c = await env.SUBS.get(ck); if (c) return new Response(c, { headers: { 'Content-Type': 'application/json', ...cors } }); }
      const html = await (await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
      const body = JSON.stringify(parseProgramDetail(html, target));
      await env.SUBS.put(ck, body, { expirationTtl: 86400 });
      return new Response(body, { headers: { 'Content-Type': 'application/json', ...cors } });
    }

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

// ===== PeakView парсване =====
function isPeakview(u) { try { return new URL(u).hostname === 'iframe.peakview.bg'; } catch { return false; } }

function parseHotelList(html) {
  var hotels = [];
  var re = /<h2>\s*<a[^>]*href="(hotel-pochivka\.php\?[^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h2>([\s\S]*?)(?=<h2>\s*<a[^>]*hotel-pochivka|resp-tabs|$)/g;
  var m;
  while ((m = re.exec(html))) {
    var href = m[1].replace(/&amp;/g, '&');
    var name = m[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    var rest = m[3];
    var cov = rest.match(/(\/\/static\.peakview\.bg\/img\/data2?\/\d+\/hoteli\/\d+\/[^"]+\.(?:jpg|jpeg|png))/i);
    var loc = rest.match(/>\s*([^<]*Турция[^<]*|[^<]*,\s*[^<]+?)<br/);
    var price = rest.match(/Цена\s*от[\s\S]{0,60}?([\d.]+)\s*лв/);
    hotels.push({
      name: name,
      url: 'https://iframe.peakview.bg/' + href,
      cover: cov ? ('https:' + cov[1]) : '',
      loc: loc ? loc[1].trim() : '',
      price: price ? price[1] : ''
    });
  }
  return hotels;
}

function parseHotelDetail(html) {
  // галерия
  var gallery = [], seen = {};
  var hid = (html.match(/hoteli\/(\d+)\//) || [])[1] || '\\d+';
  var gre = new RegExp('(\\/\\/static\\.peakview\\.bg\\/img\\/data2?\\/\\d+\\/hoteli\\/' + hid + '\\/[A-Za-z0-9_]+\\.(?:jpg|jpeg|png))', 'gi');
  var g;
  while ((g = gre.exec(html))) { var u = 'https:' + g[1]; if (!seen[u]) { seen[u] = 1; gallery.push(u); } }
  // цени по дати
  var dates = {};
  var pre = /reservation_[a-z]+\.php\?[^"']*?ndate=([0-9.]+)&ncena=([0-9]+)&nvaluta=([A-Z]+)&ntab=([^"'&]+)/g;
  var p;
  while ((p = pre.exec(html))) {
    var d = p[1], price = p[2];
    var room = decodeURIComponent(p[4].replace(/\+/g, ' ')).replace(/\s+/g, ' ').trim();
    (dates[d] = dates[d] || []).push({ room: room, price: price });
  }
  // описание (първият htext блок)
  var desc = '';
  var dm = html.match(/class="htext"[^>]*>([\s\S]*?)<\/div>/);
  if (dm) {
    desc = dm[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
    if (/^\s*карта\s*:?/i.test(desc)) desc = '';
    desc = desc.slice(0, 1600);
  }
  return { gallery: gallery, dates: dates, desc: desc };
}

// --- програма/детайл (gallery + 4 resp-tabs панела), аналог на _scrape_pv_details.pl ---
function parseProgramDetail(html, target) {
  const toid = (target.match(/toid=(\d+)/) || [])[1] || '\\d+';
  const spo = (target.match(/spo_id=(\d+)/) || [])[1] || '\\d+';
  // галерия
  const gallery = [], seen = {};
  const gre = new RegExp('(\\/\\/static\\.peakview\\.bg\\/img\\/data\\/' + toid + '\\/programi\\/' + spo + '\\/[A-Za-z0-9_]+\\.(?:jpg|jpeg|png))', 'gi');
  let g; while ((g = gre.exec(html))) { const u = 'https:' + g[1]; if (!seen[u]) { seen[u] = 1; gallery.push(u); } }
  // панели от resp-tabs-container
  const ci = (html.match(/resp-tabs-container[^>]*>([\s\S]*)/) || [])[1] || '';
  const panels = topDivs(ci);
  return {
    gallery: gallery,
    hotels: cleanHtml(panels[0] || ''),
    program: cleanHtml(panels[1] || ''),
    includes: cleanHtml(panels[2] || ''),
    excludes: cleanHtml(panels[3] || '')
  };
}
// top-level <div> деца (по дълбочина)
function topDivs(html) {
  const out = []; let depth = 0, start = -1;
  const re = /<(\/?)div\b[^>]*>/gi; let m;
  while ((m = re.exec(html))) {
    const closing = m[1], pos0 = m.index, pos1 = re.lastIndex;
    if (!closing) { if (depth === 0) start = pos1; depth++; }
    else { depth--; if (depth === 0 && start >= 0) { out.push(html.slice(start, pos0)); start = -1; } }
  }
  return out;
}
function imgFix(attrs) {
  const m = attrs.match(/(?:data-original|src)="([^"]+)"/);
  if (!m) return '';
  let src = m[1]; if (src.startsWith('//')) src = 'https:' + src;
  if (!/^https?:/.test(src)) return '';
  return '<img src="' + src + '" loading="lazy">';
}
function cleanHtml(h) {
  h = h || '';
  h = h.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '').replace(/<form\b[\s\S]*?<\/form>/gi, '');
  h = h.replace(/<(input|select|textarea|button)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  h = h.replace(/<(input|img|br|hr)\b([^>]*)\/?>/gi, (mm, t, a) => t === 'img' ? imgFix(a) : (t === 'br' ? '<br>' : ''));
  h = h.replace(/\son\w+="[^"]*"/gi, '').replace(/\shref="[^"]*"/gi, '');
  h = h.replace(/<a\b[^>]*>/gi, '<span>').replace(/<\/a>/gi, '</span>');
  h = h.replace(/\sclass="[^"]*"/gi, '').replace(/\sstyle="[^"]*"/gi, '');
  h = h.replace(/<div\b[^>]*>/gi, '<div>');
  h = h.replace(/(\s*<br>\s*){3,}/g, '<br><br>').replace(/\s+/g, ' ').replace(/<div>\s*<\/div>/g, '');
  return h.trim();
}

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
