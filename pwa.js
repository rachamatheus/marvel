/* Marvel Tour — PWA: инсталиране + push нотификации (клиентска част).
 * Зарежда се на всяка публична страница. */
(function () {
  if (window.__mtPwaInit) return;
  window.__mtPwaInit = true;

  // ===== НАСТРОЙКА (Фаза 2 — нотификации) =====
  // Попълни тези два реда СЛЕД като деплойнеш push Worker-а и генерираш VAPID ключ.
  // Докато са празни, бутонът „Известия" не се показва (Фаза 1 работи и без тях).
  var PUSH_ENDPOINT = '';        // напр. 'https://marveltour-push.ТВОЙ.workers.dev'
  var VAPID_PUBLIC_KEY = '';     // публичният VAPID ключ (base64url)

  // ---------- Service worker ----------
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }

  // ---------- Плаващи бутони (долу вляво, за да не пречат на чата вдясно) ----------
  var bar = document.createElement('div');
  bar.style.cssText = 'position:fixed;left:18px;bottom:20px;z-index:9990;display:flex;flex-direction:column;gap:8px;align-items:flex-start;';
  document.body.appendChild(bar);

  function makeChip(label, bg) {
    var b = document.createElement('button');
    b.textContent = label;
    b.style.cssText = 'display:none;border:0;border-radius:999px;padding:11px 16px;font:600 0.85rem system-ui,sans-serif;color:#fff;cursor:pointer;box-shadow:0 8px 24px rgba(8,20,50,.28);background:' + bg + ';';
    bar.appendChild(b);
    return b;
  }
  var installBtn = makeChip('📲 Инсталирай приложението', 'linear-gradient(135deg,#1e3a8a,#2563eb)');
  var notifyBtn = makeChip('🔔 Получавай оферти', '#c9a84c');

  // ---------- Инсталиране (Фаза 1) ----------
  var deferredPrompt = null;
  var standalone = window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (!standalone) installBtn.style.display = 'inline-block';
  });
  window.addEventListener('appinstalled', function () {
    deferredPrompt = null;
    installBtn.style.display = 'none';
    maybeShowNotify();
  });
  installBtn.addEventListener('click', function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.finally(function () { deferredPrompt = null; installBtn.style.display = 'none'; });
    } else {
      alert('За да инсталирате приложението:\n\n• Chrome/Edge (Android/PC): меню ⋮ → „Инсталирай приложението".\n• iPhone (Safari): Сподели → „Към началния екран".');
    }
  });

  // ---------- Нотификации (Фаза 2) ----------
  function pushConfigured() { return PUSH_ENDPOINT && VAPID_PUBLIC_KEY && ('PushManager' in window); }

  function maybeShowNotify() {
    if (!pushConfigured()) return;
    if (Notification.permission === 'granted') return; // вече е разрешил
    notifyBtn.style.display = 'inline-block';
  }

  function urlB64ToUint8Array(base64) {
    var pad = '='.repeat((4 - base64.length % 4) % 4);
    var b64 = (base64 + pad).replace(/-/g, '+').replace(/_/g, '/');
    var raw = atob(b64), arr = new Uint8Array(raw.length);
    for (var i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
    return arr;
  }

  notifyBtn.addEventListener('click', function () {
    if (!pushConfigured()) return;
    Notification.requestPermission().then(function (perm) {
      if (perm !== 'granted') { notifyBtn.style.display = 'none'; return; }
      navigator.serviceWorker.ready.then(function (reg) {
        return reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)
        });
      }).then(function (sub) {
        return fetch(PUSH_ENDPOINT + '/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(sub)
        });
      }).then(function () {
        notifyBtn.style.display = 'none';
        alert('Готово! Ще получавате известия за нови оферти и промоции. 🎉');
      }).catch(function () {
        alert('Възникна проблем с абонамента за известия. Опитайте отново по-късно.');
      });
    });
  });

  maybeShowNotify();
})();
