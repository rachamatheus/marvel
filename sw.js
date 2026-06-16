/* Marvel Tour — service worker за публичното приложение (PWA).
 * Фаза 1: офлайн кеш на основните файлове.
 * Фаза 2: получаване и показване на push нотификации. */
var CACHE = 'mt-app-v1';
var CORE = [
  './index.html',
  './styles.css?v=151',
  './app.js?v=157',
  './lang.js?v=136',
  './data/offers.js?v=137',
  './logo.svg?v=7',
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
  var data = {};
  try { data = e.data ? e.data.json() : {}; } catch (err) { data = { body: e.data && e.data.text() }; }
  var title = data.title || 'Marvel Tour';
  var options = {
    body: data.body || 'Имаме нещо ново за вас!',
    icon: 'logo.svg?v=7',
    badge: 'favicon.svg?v=9',
    data: { url: data.url || './index.html' },
    tag: data.tag || 'mt-news'
  };
  e.waitUntil(self.registration.showNotification(title, options));
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
