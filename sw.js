/* Marvel Tour — service worker за публичното приложение (PWA).
 * Фаза 1: офлайн кеш на основните файлове.
 * Фаза 2: получаване и показване на push нотификации. */
var CACHE = 'mt-app-v17';
// Push Worker endpoint — попълни СЪЩИЯ адрес като в pwa.js (за payload-less известия).
var PUSH_ENDPOINT = 'https://marveltour-push.marveltour.workers.dev';
var CORE = [
  './index.html',
  './styles.css?v=155',
  './app.js?v=178',
  './lang.js?v=136',
  './data/offers.js?v=139',
  './logo.svg?v=11',
  './favicon.svg?v=9',
  './manifest.webmanifest'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE).catch(function () {}); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  // Network-first: данните/офертите винаги пресни; кешът е резерва офлайн.
  e.respondWith(
    fetch(e.request).then(function (resp) {
      var copy = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy).catch(function () {}); });
      return resp;
    }).catch(function () {
      return caches.match(e.request).then(function (m) { return m || caches.match('./index.html'); });
    })
  );
});

// ===== Фаза 2: PUSH нотификации =====
self.addEventListener('push', function (e) {
  e.waitUntil((async function () {
    var data = {};
    // 1) Ако има payload в самото известие — ползвай него.
    if (e.data) { try { data = e.data.json(); } catch (err) { data = { body: e.data.text() }; } }
    // 2) Иначе (payload-less) — дръпни последното известие от Worker-а.
    if ((!data || !data.title) && PUSH_ENDPOINT) {
      try { data = await (await fetch(PUSH_ENDPOINT + '/latest', { cache: 'no-store' })).json(); } catch (err) {}
    }
    data = data || {};
    return self.registration.showNotification(data.title || 'Marvel Tour', {
      body: data.body || 'Имаме нещо ново за вас!',
      icon: 'logo.svg?v=11',
      badge: 'favicon.svg?v=9',
      data: { url: data.url || './index.html' },
      tag: data.tag || ('mt-' + (data.ts || ''))
    });
  })());
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  var url = (e.notification.data && e.notification.data.url) || './index.html';
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
      for (var i = 0; i < list.length; i++) {
        if ('focus' in list[i]) { list[i].navigate(url); return list[i].focus(); }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
