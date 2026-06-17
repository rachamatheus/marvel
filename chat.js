/* Marvel Tour — плаващи балончета за връзка (WhatsApp, Instagram, Facebook).
 * Зарежда се на всяка страница. Отварят съответната апликация/страница. */
(function () {
  if (window.__mtChatInit) return;
  window.__mtChatInit = true;

  // ===== НАСТРОЙКА =====
  var PHONE = '359878904104'; // 0878 904 104 в международен формат
  var WA_TEXT = 'Здравейте! Имам въпрос относно оферта от сайта на Marvel Tour.';
  var INSTAGRAM_URL = 'https://www.instagram.com/marvel_tour/';
  var FACEBOOK_URL  = 'https://www.facebook.com/p/MARVEL-TOUR-100064228083046/?locale=bg_BG';

  var WA_URL = 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(WA_TEXT);

  var css =
  '.mt-social{position:fixed;right:20px;bottom:20px;z-index:9998;display:flex;flex-direction:column;gap:12px;align-items:center;}' +
  '.mt-bubble{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;' +
    'color:#fff;text-decoration:none;box-shadow:0 8px 22px rgba(8,20,50,.30);transition:transform .15s, box-shadow .15s;}' +
  '.mt-bubble:hover{transform:translateY(-2px) scale(1.07);box-shadow:0 12px 30px rgba(8,20,50,.4);}' +
  '.mt-bubble svg{width:28px;height:28px;}' +
  '.mt-wa{background:#25D366;}' +
  '.mt-ig{background:radial-gradient(circle at 30% 110%,#fed576,#f47133 25%,#bc3081 50%,#4c63d2 90%);}' +
  '.mt-fb{background:#1877F2;}' +
  '@media(max-width:560px){.mt-social{right:16px;bottom:16px;gap:10px;flex-direction:row;}.mt-bubble{width:48px;height:48px;}.mt-bubble svg{width:24px;height:24px;}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var ICONS = {
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.42.37 1.06.42 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.17-1.06.37-2.23.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.42-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.17-.42-.37-1.06-.42-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.17 1.06-.37 2.23-.42C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.12 1.38C1.36 2.67.95 3.34.64 4.13.34 4.9.14 5.77.08 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.92.31.79.72 1.46 1.38 2.12.66.66 1.33 1.07 2.12 1.38.77.3 1.64.5 2.92.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.92-.56.79-.31 1.46-.72 2.12-1.38.66-.66 1.07-1.33 1.38-2.12.3-.77.5-1.64.56-2.92.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.92-.31-.79-.72-1.46-1.38-2.12C21.33 1.36 20.66.95 19.87.64 19.1.34 18.23.14 16.95.08 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.4-11.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z"/></svg>',
    wa: '<svg viewBox="0 0 32 32" fill="currentColor"><path d="M16.04 3C9.42 3 4.04 8.38 4.04 15c0 2.12.56 4.18 1.62 6L4 29l8.2-1.62A11.9 11.9 0 0016.04 27C22.66 27 28 21.62 28 15S22.66 3 16.04 3zm0 21.6c-1.74 0-3.45-.47-4.94-1.36l-.35-.21-3.6.71.72-3.5-.23-.36A9.6 9.6 0 016.4 15c0-5.32 4.32-9.64 9.64-9.64 5.32 0 9.64 4.32 9.64 9.64s-4.32 9.6-9.64 9.6zm5.28-7.2c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.65.15-.19.29-.74.94-.91 1.13-.17.19-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.77-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.57-.89-2.15-.23-.56-.47-.48-.65-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.01 3.08 4.88 4.32.68.29 1.21.47 1.62.6.68.22 1.3.19 1.79.11.55-.08 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34z"/></svg>'
  };

  var wrap = document.createElement('div');
  wrap.className = 'mt-social';

  function bubble(cls, url, label, icon) {
    var a = document.createElement('a');
    a.className = 'mt-bubble ' + cls;
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', label);
    a.title = label;
    a.innerHTML = icon;
    return a;
  }

  wrap.appendChild(bubble('mt-fb', FACEBOOK_URL, 'Facebook', ICONS.fb));
  wrap.appendChild(bubble('mt-ig', INSTAGRAM_URL, 'Instagram', ICONS.ig));
  wrap.appendChild(bubble('mt-wa', WA_URL, 'Пишете ни в WhatsApp', ICONS.wa));
  document.body.appendChild(wrap);
})();
