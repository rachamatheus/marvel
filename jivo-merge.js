/* Слива публикуваните PeakView оферти (избрани от админ каталога, пазени глобално в
   Worker KV /catalog) в основната секция „Оферти" на началната страница.
   Зарежда data/peakview.js само ако има публикувани оферти. */
(function () {
  var EP = 'https://marveltour-push.marveltour.workers.dev';

  function isoFromPv(datesText) {
    var m = String(datesText || '').match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
    return m ? (m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0')) : '';
  }
  function eurOf(bgn) { var n = parseFloat(bgn); return n ? Math.round(n / 1.95583) : 0; }
  function deriveDest(title) { return (typeof window.mtDeriveDest === 'function') ? window.mtDeriveDest(title) : ''; }
  // изтекла ли е (всички дати в миналото). Ако няма дати → не я смятаме за изтекла.
  function pvExpired(datesText) {
    var t0 = new Date(); t0.setHours(0, 0, 0, 0); t0 = t0.getTime();
    var re = /(\d{1,2})\.(\d{1,2})\.(\d{4})/g, m, any = false, future = false;
    while ((m = re.exec(String(datesText || '')))) { any = true; var t = Date.parse(m[3] + '-' + m[2].padStart(2, '0') + '-' + m[1].padStart(2, '0')); if (!isNaN(t) && t >= t0) future = true; }
    return any && !future;
  }

  function buildOffer(p, prices, titles) {
    var bgn = (prices && prices[p.id] != null && prices[p.id] !== '') ? prices[p.id] : p.bgn;
    var nbgn = parseFloat(bgn) || 0;
    var title = (titles && titles[p.id]) ? titles[p.id] : p.title;
    return {
      id: p.id, pv: true,
      title: title, destination: deriveDest(title) || p.dest, country: '',
      category: p.cat || 'vacation',
      tags: (p.cat === 'cruise') ? ['cruise'] : [],
      duration: (p.days ? p.days + ' дни' : '') + (p.nights ? ' / ' + p.nights + ' нощувки' : ''),
      days: parseInt(p.days) || 0, nights: parseInt(p.nights) || 0,
      price_bgn: nbgn || '', price_eur: nbgn ? eurOf(nbgn) : (parseFloat(p.eur) || ''),
      dates: [], next_date: isoFromPv(p.dates), transport: '',
      description: '', image: p.cover, cover: p.cover, featured: false
    };
  }

  function merge(ids, prices, titles) {
    if (!window.PEAKVIEW_OFFERS || typeof ALL_OFFERS === 'undefined') return;
    var idset = {}; ids.forEach(function (i) { idset[String(i)] = 1; });
    var have = {}; ALL_OFFERS.forEach(function (o) { have[String(o.id)] = 1; });
    var added = 0;
    window.PEAKVIEW_OFFERS.forEach(function (p) {
      if (idset[String(p.id)] && !have[String(p.id)] && !pvExpired(p.dates)) { ALL_OFFERS.push(buildOffer(p, prices, titles)); added++; }
    });
    if (added) {
      if (typeof renderOffers === 'function') renderOffers();
      if (typeof renderFilters === 'function') renderFilters();
      if (typeof renderFeatured === 'function') renderFeatured();
      if (typeof initContinentMap === 'function') initContinentMap();
      if (typeof updateStatCounter === 'function') updateStatCounter();
    }
  }

  function loadData(cb) {
    if (window.PEAKVIEW_OFFERS) return cb();
    var s = document.createElement('script');
    s.src = 'data/peakview.js?v=2'; s.onload = cb; s.onerror = cb;
    document.head.appendChild(s);
  }

  fetch(EP + '/catalog').then(function (r) { return r.json(); }).then(function (d) {
    var ids = (d && d.ids) || [];
    if (!ids.length) return;
    loadData(function () { merge(ids, (d && d.prices) || {}, (d && d.titles) || {}); });
  }).catch(function () {});

  // Глобални ръчни оферти (от админ редактора) → в основната мрежа „Оферти".
  fetch(EP + '/offers').then(function (r) { return r.json(); }).then(function (arr) {
    if (!Array.isArray(arr) || !arr.length || typeof ALL_OFFERS === 'undefined') return;
    var have = {}; ALL_OFFERS.forEach(function (o) { have[String(o.id)] = 1; });
    var added = 0;
    arr.forEach(function (o) { if (o && o.id != null && !have[String(o.id)]) { ALL_OFFERS.push(o); added++; } });
    if (added) {
      if (typeof renderOffers === 'function') renderOffers();
      if (typeof renderFilters === 'function') renderFilters();
      if (typeof renderFeatured === 'function') renderFeatured();
      if (typeof initContinentMap === 'function') initContinentMap();
      if (typeof updateStatCounter === 'function') updateStatCounter();
    }
  }).catch(function () {});
})();
