/* Marvel Tour Admin — service worker (нужен за инсталиране като приложение).
 * Лек кеш на основните файлове, за да работи и офлайн. */
var CACHE = 'mt-admin-v3';
var CORE = [
  './index.html',
  './admin.js?v=140',
  '../styles.css',
  '../logo.svg?v=7',
  '../favicon.svg?v=9',
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
  // Network-first за да са офертите/данните винаги пресни; кешът е резерва офлайн.
  e.respondWith(
    fetch(e.request).then(function (resp) {
      var copy = resp.clone();
      caches.open(CACHE).then(function (c) { c.put(e.request, copy).catch(function () {}); });
      return resp;
    }).catch(function () { return caches.match(e.request); })
  );
});
