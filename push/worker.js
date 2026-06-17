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
      const ck = 'hl3:' + await sha256(target);
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
      const ck = 'h3:' + await sha256(target);
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
      const ck = 'd2:' + await sha256(target);
      if (!url.searchParams.get('fresh')) { const c = await env.SUBS.get(ck); if (c) return new Response(c, { headers: { 'Content-Type': 'application/json', ...cors } }); }
      const html = await (await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0' } })).text();
      const body = JSON.stringify(parseProgramDetail(html, target));
      await env.SUBS.put(ck, body, { expirationTtl: 86400 });
      return new Response(body, { headers: { 'Content-Type': 'application/json', ...cors } });
    }

    // ---- /upload (POST {data:"<dataURL>"}) → хоства снимка глобално, връща {url} ----
    if (url.pathname === '/upload' && req.method === 'POST') {
      let body; try { body = await req.json(); } catch { return J({ error: 'bad json' }, 400); }
      const m = /^data:([^;]+);base64,(.+)$/s.exec(body.data || '');
      if (!m) return J({ error: 'bad data url' }, 400);
      const ct = m[1], b64 = m[2];
      const bin = atob(b64); const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      if (bytes.length > 6 * 1024 * 1024) return J({ error: 'too large' }, 413);
      const id = await sha256(b64);
      await env.SUBS.put('img:' + id, bytes, { metadata: { ct } });
      return J({ url: new URL(req.url).origin + '/img/' + id });
    }
    // ---- /img/<id> — сервира хостната снимка ----
    if (url.pathname.startsWith('/img/') && req.method === 'GET') {
      const id = url.pathname.slice(5);
      const r = await env.SUBS.getWithMetadata('img:' + id, { type: 'arrayBuffer' });
      if (!r || !r.value) return new Response('not found', { status: 404, headers: cors });
      return new Response(r.value, { headers: { 'Content-Type': (r.metadata && r.metadata.ct) || 'image/jpeg', 'Cache-Control': 'public, max-age=31536000, immutable', ...cors } });
    }
    // ---- /offers (глобални ръчни оферти) GET връща масив; POST записва ----
    if (url.pathname === '/offers') {
      if (req.method === 'GET') {
        const c = await env.SUBS.get('customoffers');
        return new Response(c || '[]', { headers: { 'Content-Type': 'application/json', ...cors } });
      }
      if (req.method === 'POST') {
        let body; try { body = await req.json(); } catch { return J({ error: 'bad json' }, 400); }
        const arr = Array.isArray(body) ? body : (body.offers || []);
        const s = JSON.stringify(arr.slice(0, 1000));
        if (s.length > 20 * 1024 * 1024) return J({ error: 'too large' }, 413);
        await env.SUBS.put('customoffers', s);
        return J({ ok: true, count: arr.length });
      }
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
        return new Response(c || '{"ids":[],"prices":{},"titles":{}}',
          { headers: { 'Content-Type': 'application/json', ...cors } });
      }
      if (req.method === 'POST') {
        let body; try { body = await req.json(); } catch { return J({ error: 'bad json' }, 400); }
        const clean = {
          ids: Array.isArray(body.ids) ? body.ids.slice(0, 2000).map(String) : [],
          prices: (body.prices && typeof body.prices === 'object') ? body.prices : {},
          titles: (body.titles && typeof body.titles === 'object') ? body.titles : {},
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

// общи филтри/нормализация за изображения (хотелски снимки от ЛЮБ хост)
var IMG_BAD = /(logo|bialfon|pv_bial|sprite|icon|favicon|flag|blank|loader|spinner|placeholder|noimage|wd_)/i;
var IMG_GOOD = /(hoteli|\/hotel\/|\/hotels\/|\/images\/|programi|\/files\/)/i;
function normImg(u) { if (u.indexOf('//') === 0) u = 'https:' + u; return u.replace(/^http:\/\//i, 'https://').replace(/ /g, '%20'); }
function firstHotelImg(block) {
  var re = /(?:data-original|data-src|src)\s*=\s*["'](https?:\/\/[^"']+?\.(?:jpe?g|png|webp)|\/\/[^"']+?\.(?:jpe?g|png|webp))["']/gi, m;
  while ((m = re.exec(block))) { if (IMG_BAD.test(m[1]) || !IMG_GOOD.test(m[1])) continue; return normImg(m[1]); }
  return '';
}
function parseHotelList(html) {
  var hotels = [];
  var re = /<h2>\s*<a[^>]*href="(hotel-pochivka\.php\?[^"]+)"[^>]*>([\s\S]*?)<\/a>\s*<\/h2>([\s\S]*?)(?=<h2>\s*<a[^>]*hotel-pochivka|resp-tabs|$)/g;
  var m;
  while ((m = re.exec(html))) {
    var href = m[1].replace(/&amp;/g, '&');
    var name = m[2].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    var rest = m[3];
    var cover = firstHotelImg(rest);   // снимка от ЛЮБ хост (emerald.bg, static.peakview, solvex и т.н.)
    var loc = rest.match(/>\s*([^<]*Турция[^<]*|[^<]*,\s*[^<]+?)<br/);
    var price = rest.match(/Цена\s*от[\s\S]{0,60}?([\d.]+)\s*лв/);
    hotels.push({
      name: name,
      url: 'https://iframe.peakview.bg/' + href,
      cover: cover,
      loc: loc ? loc[1].trim() : '',
      price: price ? price[1] : ''
    });
  }
  return hotels;
}

function parseHotelDetail(html) {
  // ---- галерия: хотелски снимки от ЛЮБ хост (PeakView static, emerald.bg, solvex.bg и др.) ----
  var gallery = [], seen = {};
  function pushU(u) {
    if (u.indexOf('//') === 0) u = 'https:' + u;
    u = u.replace(/^http:\/\//i, 'https://').replace(/ /g, '%20');
    if (seen[u]) return; seen[u] = 1; gallery.push(u);
  }
  // изключи лога/икони/служебни картинки
  var BAD = /(logo|bialfon|pv_bial|sprite|icon|favicon|flag|blank|loader|spinner|placeholder|noimage|wd_)/i;
  // допусни само „хотелски" пътища
  var GOODPATH = /(hoteli|\/hotel\/|\/hotels\/|\/images\/|programi|\/files\/)/i;
  var ire = /(?:src|data-original|data-src)\s*=\s*["'](https?:\/\/[^"']+?\.(?:jpe?g|png|webp)|\/\/[^"']+?\.(?:jpe?g|png|webp))["']/gi, im;
  while ((im = ire.exec(html))) { var uu = im[1]; if (BAD.test(uu) || !GOODPATH.test(uu)) continue; pushU(uu); }
  // ако нищо — поне програмната снимка
  if (!gallery.length) { var pg = /(\/\/static\.peakview\.bg\/img\/data2?\/\d+\/programi\/\d+\/[A-Za-z0-9_]+\.(?:jpg|jpeg|png))/gi, pm; while ((pm = pg.exec(html))) pushU(pm[1]); }
  // ---- цени по дати (само ако резервационните връзки носят ndate/ncena/ntab) ----
  var dates = {};
  var pre = /reservation_[a-z]+\.php\?[^"']*?ndate=([0-9.]+)&ncena=([0-9]+)&nvaluta=([A-Z]+)&ntab=([^"'&]+)/g;
  var p;
  while ((p = pre.exec(html))) {
    var d = p[1], price = p[2];
    var room = decodeURIComponent(p[4].replace(/\+/g, ' ')).replace(/\s+/g, ' ').trim();
    (dates[d] = dates[d] || []).push({ room: room, price: price });
  }
  // ---- описание: най-дългият htext блок (не „карта") ----
  var desc = '';
  var hre = /class="htext"[^>]*>([\s\S]*?)<\/div>/gi, hm;
  while ((hm = hre.exec(html))) {
    var t = hm[1].replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
    if (/^\s*карта\s*:?/i.test(t)) continue;
    if (t.length > desc.length) desc = t;
  }
  desc = desc.slice(0, 2200);
  return { gallery: gallery, dates: dates, desc: desc };
}

// --- програма/детайл (gallery + 4 resp-tabs панела), аналог на _scrape_pv_details.pl ---
function parseProgramDetail(html, target) {
  const toid = (target.match(/toid=(\d+)/) || [])[1] || '\\d+';
  const spo = (target.match(/spo_id=(\d+)/) || [])[1] || '\\d+';
  // галерия (програмни снимки от ЛЮБ хост — не само static.peakview)
  const gallery = [], seen = {};
  const gre = new RegExp('(\\/\\/static\\.peakview\\.bg\\/img\\/data\\/' + toid + '\\/programi\\/' + spo + '\\/[A-Za-z0-9_]+\\.(?:jpg|jpeg|png))', 'gi');
  let g; while ((g = gre.exec(html))) { const u = 'https:' + g[1]; if (!seen[u]) { seen[u] = 1; gallery.push(u); } }
  // панели от resp-tabs-container — взимаме ВСИЧКИ (нищо не пропускаме)
  const ci = (html.match(/resp-tabs-container[^>]*>([\s\S]*)/) || [])[1] || '';
  const panels = topDivs(ci).map(cleanHtml);
  return {
    gallery: gallery,
    hotels: panels[0] || '',
    program: panels[1] || '',
    includes: panels[2] || '',
    excludes: panels[3] || '',
    extra: panels.slice(4).filter(Boolean).join('<br><br>')   // „Допълнителна информация" и всичко след 4-те
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
