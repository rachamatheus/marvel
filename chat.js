/* Marvel Tour — плаващ WhatsApp бутон.
 * Отваря разговор в WhatsApp към телефона на агенцията. Зарежда се на всяка страница. */
(function () {
  if (window.__mtChatInit) return;
  window.__mtChatInit = true;

  var PHONE = '359878904104'; // 0878 904 104 в международен формат (без +, без интервали)
  var PREFILL = 'Здравейте! Имам въпрос относно оферта от сайта на Marvel Tour.';
  var WA_URL = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(PREFILL);

  var css =
  '.mt-wa-btn{position:fixed;right:22px;bottom:22px;z-index:9998;display:flex;align-items:center;gap:10px;' +
    'background:#25D366;color:#fff;border:none;border-radius:999px;padding:13px 18px;cursor:pointer;' +
    'font:600 0.92rem system-ui,-apple-system,"Segoe UI",sans-serif;text-decoration:none;' +
    'box-shadow:0 10px 30px rgba(37,211,102,.45);transition:transform .15s, box-shadow .15s;}' +
  '.mt-wa-btn:hover{transform:translateY(-2px) scale(1.03);box-shadow:0 14px 38px rgba(37,211,102,.55);}' +
  '.mt-wa-btn svg{width:26px;height:26px;flex:0 0 auto;}' +
  '.mt-wa-label{white-space:nowrap;}' +
  '@media(max-width:560px){.mt-wa-btn{padding:14px;right:16px;bottom:16px;}.mt-wa-label{display:none;}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var a = document.createElement('a');
  a.className = 'mt-wa-btn';
  a.href = WA_URL;
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', 'Пишете ни в WhatsApp');
  a.innerHTML =
    '<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M16.04 3C9.42 3 4.04 8.38 4.04 15c0 2.12.56 4.18 1.62 6L4 29l8.2-1.62A11.9 11.9 0 0016.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3zm0 21.6c-1.74 0-3.45-.47-4.94-1.36l-.35-.21-3.6.71.72-3.5-.23-.36A9.6 9.6 0 016.4 15c0-5.32 4.32-9.64 9.64-9.64 5.32 0 9.64 4.32 9.64 9.64s-4.32 9.6-9.64 9.6zm5.28-7.2c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.01 3.08 4.88 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/>' +
    '</svg><span class="mt-wa-label">Пишете ни в WhatsApp</span>';
  document.body.appendChild(a);
})();
