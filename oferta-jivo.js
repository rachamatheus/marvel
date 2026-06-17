/* Детайл на „жива" PeakView оферта — нашия дизайн (галерия, табове, запитване). */
(function () {
  function getParam(n){ return new URLSearchParams(location.search).get(n); }

  var PUSH_ENDPOINT = 'https://marveltour-push.marveltour.workers.dev';
  var OFFERS = window.PEAKVIEW_OFFERS || [];
  var offer = null, detail = null;
  var PVH = { list: null, loading: false, failed: false, det: {} };
  var gImgs = [], gIdx = 0, lbImgs = [], lbIdx = 0;

  // ---------- галерия ----------
  function setupGallery(imgs) {
    gImgs = imgs.filter(Boolean); gIdx = 0;
    var thumbs = document.getElementById('offerThumbs');
    thumbs.innerHTML = gImgs.map(function (u, i) {
      return '<img class="modal-thumb' + (i === 0 ? ' active' : '') + '" src="' + u + '" onclick="galleryGoto(' + i + ')" loading="lazy" onerror="this.style.display=\'none\'">';
    }).join('');
    galleryGoto(0);
    var multi = gImgs.length > 1;
    document.getElementById('galleryPrev').style.display = multi ? '' : 'none';
    document.getElementById('galleryNext').style.display = multi ? '' : 'none';
  }
  window.galleryGoto = function (i) {
    if (!gImgs.length) return;
    gIdx = (i + gImgs.length) % gImgs.length;
    var main = document.getElementById('offerImg');
    main.src = gImgs[gIdx]; main.onclick = function () { openLightbox(gImgs, gIdx); };
    document.getElementById('galleryCounter').textContent = (gIdx + 1) + ' / ' + gImgs.length;
    document.querySelectorAll('#offerThumbs .modal-thumb').forEach(function (t, k) { t.classList.toggle('active', k === gIdx); });
  };
  window.galleryStep = function (d) { galleryGoto(gIdx + d); };
  window.openLightbox = function (imgs, start) { lbImgs = imgs; lbIdx = start || 0; lbRender(); document.getElementById('lightbox').classList.add('active'); document.body.style.overflow = 'hidden'; };
  function lbRender(){ document.getElementById('lightboxImg').src = lbImgs[lbIdx]; }
  window.lightboxStep = function (d) { if (lbImgs.length) { lbIdx = (lbIdx + d + lbImgs.length) % lbImgs.length; lbRender(); } };
  window.closeLightbox = function () { document.getElementById('lightbox').classList.remove('active'); document.body.style.overflow = ''; };

  // ---------- табове ----------
  var TABDEF = [
    { k: 'program', el: 'panelProgram', label: '📋 Програма' },
    { k: 'hotels', el: 'panelHotels', label: '🏨 Хотели' },
    { k: 'includes', el: 'panelIncludes', label: '✅ Цената включва' },
    { k: 'excludes', el: 'panelExcludes', label: '❌ Цената не включва' }
  ];
  var curTab = null;
  function hotelList() { return PVH.list; }
  function hasContent(s){ return s && s.replace(/<[^>]+>/g,'').trim().length > 2; }
  function tabHasData(k){
    if (k === 'hotels') return hasContent(detail && detail.hotels) || (offer && offer.cat === 'vacation');
    return hasContent(detail && detail[k]);
  }
  function buildTabs() {
    var avail = TABDEF.filter(function (t) { return tabHasData(t.k); });
    if (!avail.length) { document.getElementById('offerTabs').style.display = 'none'; return; }
    if (!curTab || !avail.some(function (t) { return t.k === curTab; })) curTab = avail[0].k;
    document.getElementById('offerTabs').innerHTML = avail.map(function (t) {
      return '<button class="offer-tab-btn' + (t.k === curTab ? ' active' : '') + '" onclick="showTab(\'' + t.k + '\')">' + t.label + '</button>';
    }).join('');
    TABDEF.forEach(function (t) {
      var p = document.getElementById(t.el); if (!p) return;
      p.innerHTML = (t.k === 'hotels') ? hotelsHtml() : (detail[t.k] || '');
      p.style.display = (t.k === curTab) ? 'block' : 'none';
    });
  }
  window.showTab = function (k) { curTab = k; buildTabs(); };

  // ---------- хотели (динамично от Worker-а: списък → детайл с галерия + цени по дати) ----------
  function loadHotels() {
    if (PVH.loading || PVH.list) return;
    PVH.loading = true;
    fetch(PUSH_ENDPOINT + '/hotels?url=' + encodeURIComponent(offer.detail))
      .then(function (r) { return r.json(); })
      .then(function (d) { PVH.list = (d && d.hotels) || []; })
      .catch(function () { PVH.failed = true; })
      .finally(function () { PVH.loading = false; if (curTab === 'hotels') buildTabs(); });
  }
  function hotelsHtml() {
    if (!PVH.list) {
      if (!PVH.failed) { loadHotels(); return '<div class="offer-section-title" style="margin-top:0;">🏨 Хотели</div><p style="color:var(--gray-400);">Зареждане на хотелите…</p>'; }
      return detail.hotels || '';  // резервно при грешка
    }
    if (!PVH.list.length) return detail.hotels || '';
    return '<div class="offer-section-title" style="margin-top:0;">🏨 Хотели по програмата <span style="font-weight:400;color:var(--gray-400);font-size:0.82rem;">(натиснете за галерия и цени по дати)</span></div>' +
      '<div class="pv-hotels">' + PVH.list.map(function (h, i) {
        return '<div class="pv-hotel" id="pvh-' + i + '">' +
            '<div class="pv-hotel-head" onclick="toggleHotel(' + i + ')">' +
              (h.cover ? '<img src="' + h.cover + '" loading="lazy" onerror="this.style.display=\'none\'">' : '') +
              '<div class="pv-hotel-info"><div class="pv-hotel-name">' + h.name + '</div>' +
                '<div class="pv-hotel-loc">' + (h.loc || '') + '</div>' +
                (h.price ? '<div class="pv-hotel-price">от ' + h.price + ' лв.</div>' : '') +
              '</div>' +
              '<span class="pv-hotel-toggle">Виж повече ▾</span>' +
            '</div>' +
            '<div class="pv-hotel-body" id="pvhb-' + i + '" style="display:none;"></div>' +
          '</div>';
      }).join('') + '</div>';
  }
  window.toggleHotel = function (i) {
    var body = document.getElementById('pvhb-' + i);
    var card = document.getElementById('pvh-' + i);
    if (!body) return;
    if (body.style.display === 'block') { body.style.display = 'none'; card.classList.remove('open'); return; }
    body.style.display = 'block'; card.classList.add('open');
    if (PVH.det[i]) { body.innerHTML = hotelBodyHtml(i); return; }
    body.innerHTML = '<p style="color:var(--gray-400);padding:10px 0;">Зареждане…</p>';
    fetch(PUSH_ENDPOINT + '/hotel?url=' + encodeURIComponent(PVH.list[i].url))
      .then(function (r) { return r.json(); })
      .then(function (d) { PVH.det[i] = d || { gallery: [], dates: {} }; })
      .catch(function () { PVH.det[i] = { gallery: [], dates: {} }; })
      .finally(function () { if (body.style.display === 'block') body.innerHTML = hotelBodyHtml(i); });
  };
  function hotelBodyHtml(i) {
    var d = PVH.det[i]; if (!d) return '';
    var thumbs = (d.gallery || []).map(function (u, k) { return '<img src="' + u + '" loading="lazy" onclick="openLightbox(PVHGAL(' + i + '),' + k + ')" onerror="this.style.display=\'none\'">'; }).join('');
    var dates = Object.keys(d.dates || {});
    var dsel = dates.length ? ('<div class="pv-hp-head"><label>📅 Дата:</label> <select onchange="hotelDate(' + i + ',this.value)">' + dates.map(function (x) { return '<option value="' + x + '">' + x + '</option>'; }).join('') + '</select></div>') : '';
    return (thumbs ? '<div class="pv-hgal">' + thumbs + '</div>' : '') +
      dsel +
      '<div id="pvhp-' + i + '">' + priceTable(d, dates[0]) + '</div>' +
      (!dates.length && !thumbs ? '<p style="color:var(--gray-400);">Няма допълнителна информация. Свържете се с нас за този хотел.</p>' : '');
  }
  window.PVHGAL = function (i) { return (PVH.det[i] && PVH.det[i].gallery) || []; };
  function priceTable(d, date) {
    var rows = (d.dates && d.dates[date]) || [];
    if (!rows.length) return '';
    return '<table class="pv-price-table"><thead><tr><th>Настаняване</th><th>Цена</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r.room + '</td><td><strong>' + r.price + ' лв.</strong></td></tr>'; }).join('') +
      '</tbody></table>';
  }
  window.hotelDate = function (i, date) { var t = document.getElementById('pvhp-' + i); if (t) t.innerHTML = priceTable(PVH.det[i], date); };

  // ---------- рендер ----------
  function render() {
    var id = getParam('id');
    offer = OFFERS.filter(function (o) { return o.id === id; })[0];
    var root = document.getElementById('offerRoot');
    if (!offer) {
      root.innerHTML = '<div class="offer-page" style="text-align:center;"><h2 style="color:var(--primary);">Офертата не е намерена</h2><a href="oferti.html" class="form-submit" style="display:inline-block;width:auto;padding:12px 28px;text-decoration:none;">← Към офертите на живо</a></div>';
      return;
    }
    document.title = offer.title + ' — Marvel Tour';
    var bg = document.getElementById('ofertaBg'); if (bg) bg.style.backgroundImage = "url('" + offer.cover + "')";

    detail = (window.PV_DETAIL && window.PV_DETAIL[id]) || {};
    var imgs = (detail.gallery && detail.gallery.length) ? detail.gallery.slice() : [offer.cover];
    if (imgs.indexOf(offer.cover) === -1) imgs.unshift(offer.cover);
    setupGallery(imgs);

    document.getElementById('offerTitle').textContent = offer.title;
    var price = offer.bgn;
    document.getElementById('offerPrice').textContent = price ? ('от ' + price + ' лв.') : '';
    document.getElementById('offerPriceSub').textContent = (offer.eur ? '/ ' + offer.eur + ' € ' : '') + (offer.days ? '· ' + offer.days + ' дни / ' + offer.nights + ' нощувки' : '');
    document.getElementById('offerBadges').innerHTML =
      '<span class="modal-tag blue">' + offer.catlbl + '</span>' +
      (offer.company ? '<span class="modal-tag">🏢 ' + offer.company + '</span>' : '') +
      (offer.dest ? '<span class="modal-tag" style="background:rgba(201,168,76,0.15);color:#9a7b1f;">📍 ' + offer.dest + '</span>' : '');

    buildTabs();

    // дати
    var dates = (offer.dates || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    document.getElementById('offerDates').innerHTML = dates.length
      ? dates.map(function (d) { return '<button class="modal-date-btn" onclick="pickDate(this)">' + d + '</button>'; }).join('')
      : '<span style="color:var(--gray-400);">Свържете се с нас за актуални дати.</span>';
    document.getElementById('inqDate').innerHTML = dates.map(function (d) { return '<option>' + d + '</option>'; }).join('');
    document.getElementById('inqRef').value = 'PV-' + offer.id;

    // авто-попълване от логнат клиент
    try {
      var cust = JSON.parse(sessionStorage.getItem('mt_customer_session') || 'null');
      if (cust) { document.getElementById('inqName').value = cust.name || ''; document.getElementById('inqEmail').value = cust.email || ''; }
    } catch (e) {}
  }
  window.pickDate = function (btn) {
    document.querySelectorAll('#offerDates .modal-date-btn').forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');
    var sel = document.getElementById('inqDate'); if (sel) sel.value = btn.textContent;
  };

  // ---------- запитване → mt_inquiries ----------
  window.submitJivoInquiry = function () {
    var name = document.getElementById('inqName').value.trim();
    var phone = document.getElementById('inqPhone').value.trim();
    if (!name || !phone) { alert('Моля попълнете име и телефон.'); return; }
    var inq = {
      id: Date.now(),
      name: name, phone: phone,
      email: document.getElementById('inqEmail').value.trim(),
      offer_id: offer ? offer.id : '',
      offer_ref: 'PV-' + (offer ? offer.id : ''),
      offer_title: offer ? offer.title : '',
      preferred_date: document.getElementById('inqDate').value || '',
      adults: document.getElementById('inqAdults').value,
      children: document.getElementById('inqChildren').value,
      message: document.getElementById('inqMsg').value.trim(),
      status: 'new',
      created_at: new Date().toISOString()
    };
    try {
      var arr = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');
      arr.unshift(inq);
      localStorage.setItem('mt_inquiries', JSON.stringify(arr));
    } catch (e) {}
    // ако има Supabase — прати и там (по желание)
    try { if (window.__mtSupabase) window.__mtSupabase.from('inquiries').insert([inq]); } catch (e) {}
    document.getElementById('inquiryFormContent').style.display = 'none';
    document.getElementById('inquirySuccess').style.display = 'block';
  };

  // зареди детайла + хотелите за тази оферта (lazy), после рендирай
  function loadScript(src, cb) { var s = document.createElement('script'); s.src = src; s.onload = cb; s.onerror = cb; document.head.appendChild(s); }
  var id = getParam('id');
  if (id) {
    loadScript('data/pvdetails/' + id + '.js?v=1', render); // хотелите се дърпат динамично от Worker-а
  } else { render(); }
})();
