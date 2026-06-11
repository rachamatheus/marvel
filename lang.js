// Marvel Tour — BG/EN site translation (Google Translate, whole page incl. offers).
// Default language is Bulgarian. A toggle in the navbar switches BG <-> EN and
// persists via the googtrans cookie (applies across all pages).
(function () {
  'use strict';

  function getLang() {
    var m = document.cookie.match(/googtrans=\/[a-z]+\/([a-z-]+)/);
    return (m && m[1]) ? m[1] : 'bg';
  }

  function setLang(lang) {
    var val = '/bg/' + lang;
    // set for path and (sub)domain so it applies site-wide
    document.cookie = 'googtrans=' + val + ';path=/';
    try { document.cookie = 'googtrans=' + val + ';path=/;domain=' + location.hostname; } catch (e) {}
    try {
      var parts = location.hostname.split('.');
      if (parts.length > 1) document.cookie = 'googtrans=' + val + ';path=/;domain=.' + parts.slice(-2).join('.');
    } catch (e) {}
    location.reload();
  }
  window.mtSetLang = setLang;

  // Google Translate init
  window.googleTranslateElementInit = function () {
    try {
      new google.translate.TranslateElement({
        pageLanguage: 'bg',
        includedLanguages: 'bg,en',
        autoDisplay: false
      }, 'google_translate_element');
    } catch (e) {}
  };

  function injectWidget() {
    if (!document.getElementById('google_translate_element')) {
      var d = document.createElement('div');
      d.id = 'google_translate_element';
      d.style.display = 'none';
      document.body.appendChild(d);
    }
    if (!document.getElementById('gt-script')) {
      var s = document.createElement('script');
      s.id = 'gt-script';
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(s);
    }
  }

  function injectToggle() {
    var nav = document.querySelector('.nav-links');
    if (!nav || document.getElementById('mt-lang-toggle')) return;
    var cur = getLang();
    var next = (cur === 'en') ? 'bg' : 'en';
    var label = (cur === 'en') ? 'БГ' : 'EN';
    var flag = (cur === 'en') ? '🇧🇬' : '🇬🇧';
    var li = document.createElement('li');
    li.id = 'mt-lang-toggle';
    var a = document.createElement('a');
    a.href = '#';
    a.style.fontWeight = '700';
    a.style.cursor = 'pointer';
    a.setAttribute('translate', 'no');
    a.className = 'notranslate';
    a.textContent = flag + ' ' + label;
    a.onclick = function (e) { e.preventDefault(); setLang(next); };
    li.appendChild(a);
    nav.appendChild(li);
  }

  // Hide the default Google Translate banner / tooltip and keep layout intact
  var st = document.createElement('style');
  st.textContent =
    '.goog-te-banner-frame,.goog-te-balloon-frame{display:none!important;}' +
    'body{top:0!important;position:static!important;}' +
    '.goog-te-gadget{height:0;overflow:hidden;}' +
    '#goog-gt-tt,.goog-tooltip{display:none!important;}' +
    '.goog-text-highlight{background:none!important;box-shadow:none!important;}' +
    'font[style]{background:transparent!important;box-shadow:none!important;}';
  (document.head || document.documentElement).appendChild(st);

  function start() { injectWidget(); injectToggle(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
