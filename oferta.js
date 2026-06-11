// Marvel Tour — single offer page (oferta.html?id=N or ?ref=Е422)
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=70';
// Route external operator photos through a free image cache/proxy (wsrv.nl):
// faster, cached, and bypasses hotlink blocks (e.g. aquatour.bg).
function proxify(u) {
  if (!u || typeof u !== 'string') return u;
  if (u.indexOf('data:') === 0 || u.indexOf('//') === -1) return u;
  if (u.indexOf('wsrv.nl') !== -1 || u.indexOf('images.unsplash.com') !== -1) return u;
  return 'https://wsrv.nl/?url=' + encodeURIComponent(u) + '&w=1400&output=webp&we&q=82';
}
// On error: if a proxied URL failed, fall back to the direct original; then placeholder.
function imgFallback(img) {
  try {
    if (img && !img.dataset.retried) {
      img.dataset.retried = '1';
      var s = img.src || '';
      var m = s.match(/wsrv\.nl\/\?url=([^&]+)/);
      if (m) { img.src = decodeURIComponent(m[1]); return; }
      img.src = '';
      setTimeout(function () { img.src = s; }, 700);
      return;
    }
  } catch (e) {}
  if (img) { img.onerror = null; img.src = PLACEHOLDER_IMG; }
}
// Hotel photo failed: try the direct original (if it was proxied), then fall back
// to the offer's own cover image, then a generic placeholder — never blank.
function hotelImgError(img) {
  try {
    var s = img.src || '';
    var m = s.match(/wsrv\.nl\/\?url=([^&]+)/);
    if (m && !img.dataset.triedDirect) { img.dataset.triedDirect = '1'; img.src = decodeURIComponent(m[1]); return; }
    if (!img.dataset.triedCover && typeof activeOffer !== 'undefined' && activeOffer) {
      img.dataset.triedCover = '1';
      img.onerror = function () { this.onerror = null; this.src = PLACEHOLDER_IMG; };
      img.src = proxify(coverOf(activeOffer));
      return;
    }
  } catch (e) {}
  img.onerror = null; img.src = PLACEHOLDER_IMG;
}

function hotelKeyVariants(name) {
  if (!name) return [];
  const out = [name];
  let base = name.replace(/\s*\([^)]*\)/g, '').trim();
  base = base.replace(/\s*\d?\s*★+\s*$/g, '').replace(/\s*\d\s*\*+\s*$/g, '').trim();
  if (base && base !== name) out.push(base);
  return out;
}
function hotelImg(h) {
  if (!h) return PLACEHOLDER_IMG;
  if (typeof HOTEL_IMAGES !== 'undefined') {
    for (const k of hotelKeyVariants(h.name)) {
      if (HOTEL_IMAGES[k]) return HOTEL_IMAGES[k];
    }
  }
  // No specific hotel photo → use the offer's own cover (relevant destination
  // image) instead of a generic placeholder, so hotels are never blank.
  if (h.image) return h.image;
  try { if (typeof activeOffer !== 'undefined' && activeOffer) return coverOf(activeOffer); } catch (e) {}
  return PLACEHOLDER_IMG;
}

// Merge custom offers exactly like the main site
const _custom = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
const _deleted = JSON.parse(localStorage.getItem('mt_deleted_offers') || '[]');
const ALL_OFFERS = [...OFFERS.filter(o => !_deleted.includes(o.id)), ..._custom];

let activeOffer = null;
let selectedDate = null;
let selectedHotelIdx = 0;

function transportLabel(t) {
  const map = { flight: '✈️ Полет', plane: '✈️ Полет', bus: '🚌 Бус', car: '🚗 Кола', ship: '🚢 Кораб', train: '🚆 Влак' };
  return map[t] || t || '✈️ Самолет';
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function coverOf(o) {
  return (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) ||
    (o.image && o.image.startsWith('http') ? o.image : '') || PLACEHOLDER_IMG;
}

// ── View tracking (feeds admin Top-10 by what customers viewed) ──
function recordOfferView(offer) {
  if (!offer) return;
  try {
    // detailed event log (source of truth for analytics)
    const arr = JSON.parse(localStorage.getItem('mt_offer_views') || '[]');
    arr.push({
      offer_id: offer.id,
      offer_title: offer.title,
      destination: offer.destination || '',
      category: offer.category || '',
      created_at: new Date().toISOString()
    });
    if (arr.length > 1000) arr.splice(0, arr.length - 1000);
    localStorage.setItem('mt_offer_views', JSON.stringify(arr));
    // legacy count map (kept in sync)
    const map = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
    map[offer.id] = (parseInt(map[offer.id]) || 0) + 1;
    localStorage.setItem('mt_offerviews', JSON.stringify(map));
    // shared backend (when configured) — enables cross-device analytics
    if (typeof window !== 'undefined' && window.__mtSupabase) {
      window.__mtSupabase.from('offer_views').insert([{
        offer_id: String(offer.id),
        offer_title: offer.title,
        created_at: new Date().toISOString()
      }]).then(() => {}, () => {});
    }
  } catch (e) {}
}

// ── Gallery ──
let galleryImages = [], galleryIdx = 0;
function buildGallery(cover, id) {
  const n = (typeof GALLERY_COUNTS !== 'undefined' && GALLERY_COUNTS[id]) || 1;
  if (n <= 1) return [cover];
  const out = [];
  for (let i = 1; i <= n; i++) out.push(cover.replace(/([-_])1_(\d+\.[a-z0-9]+)$/i, `$1${i}_$2`));
  return out;
}
function deriveCandidates(cover, max) {
  const out = [cover];
  for (let i = 2; i <= (max || 12); i++) {
    const u = cover.replace(/([-_])1_(\d+\.[a-z0-9]+)$/i, `$1${i}_$2`);
    if (u !== cover) out.push(u);
  }
  return out;
}
function buildGalleryAsync(cover, done) {
  const cands = deriveCandidates(cover);
  if (cands.length === 1) { done([cover]); return; }
  const results = new Array(cands.length).fill(null);
  let pending = cands.length;
  const finish = () => done(results.filter(Boolean));
  cands.forEach((u, i) => {
    const im = new Image();
    im.onload = () => { if (im.naturalWidth > 1) results[i] = u; if (--pending === 0) finish(); };
    im.onerror = () => { if (--pending === 0) finish(); };
    im.src = u;
  });
}
function setupGallery(imgs, alt) {
  galleryImages = imgs || [];
  galleryIdx = 0;
  const multi = galleryImages.length > 1;
  const prev = document.getElementById('galleryPrev');
  const next = document.getElementById('galleryNext');
  const counter = document.getElementById('galleryCounter');
  const thumbs = document.getElementById('offerThumbs');
  if (prev) prev.style.display = multi ? '' : 'none';
  if (next) next.style.display = multi ? '' : 'none';
  if (counter) counter.style.display = multi ? '' : 'none';
  if (thumbs) {
    thumbs.style.display = multi ? '' : 'none';
    thumbs.innerHTML = multi ? galleryImages.map((src, i) =>
      `<img class="modal-thumb ${i === 0 ? 'active' : ''}" src="${proxify(src)}" alt="${alt || ''} ${i + 1}" onclick="galleryGoto(${i})" onerror="this.style.display='none'">`).join('') : '';
  }
  galleryGoto(0, alt);
}
function galleryGoto(i, alt) {
  if (!galleryImages.length) return;
  galleryIdx = (i + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('offerImg');
  if (img) { img.dataset.retried = ''; img.onerror = function () { imgFallback(this); }; img.src = proxify(galleryImages[galleryIdx]); if (alt) img.alt = alt; }
  const counter = document.getElementById('galleryCounter');
  if (counter) counter.textContent = `${galleryIdx + 1} / ${galleryImages.length}`;
  document.querySelectorAll('#offerThumbs .modal-thumb').forEach((t, idx) => t.classList.toggle('active', idx === galleryIdx));
}
function galleryStep(d) { galleryGoto(galleryIdx + d); }

// ── Lightbox ──
let lbImages = [], lbIdx = 0, lbCaption = '';
function openLightbox(images, startIdx, caption) {
  lbImages = (images && images.length) ? images : [];
  if (!lbImages.length) return;
  lbIdx = startIdx || 0; lbCaption = caption || '';
  lbRender();
  const lb = document.getElementById('lightbox');
  if (lb) { lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function lbRender() {
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  const multi = lbImages.length > 1;
  if (img) { img.onerror = function () { imgFallback(this); }; img.dataset.retried = ''; img.src = proxify(lbImages[lbIdx]); }
  if (cap) cap.textContent = lbCaption + (multi ? `  (${lbIdx + 1}/${lbImages.length})` : '');
  document.querySelectorAll('.lightbox-nav').forEach(b => b.style.display = multi ? '' : 'none');
}
function lightboxStep(d) { if (lbImages.length) { lbIdx = (lbIdx + d + lbImages.length) % lbImages.length; lbRender(); } }
function closeLightbox() { const lb = document.getElementById('lightbox'); if (lb) lb.classList.remove('active'); document.body.style.overflow = ''; }
// Per-hotel scraped info (gallery + description), keyed by the hotel's cover image.
function hotelInfoFor(h) {
  if (!h || typeof HOTEL_INFO === 'undefined') return null;
  return HOTEL_INFO[h.image] || null;
}
// A hotel's OWN gallery only — never mixes other hotels' photos.
function hotelGallery(h) {
  const info = hotelInfoFor(h);
  if (info && info.images && info.images.length) return info.images.slice();
  const c = hotelImg(h);
  return c ? [c] : [];
}
let _hotelGalleryImgs = [];
function openHotelPhotos(idx) {
  if (!activeOffer) return;
  const h = (activeOffer.hotels || [])[idx];
  if (!h) return;
  const imgs = hotelGallery(h);
  if (!imgs.length) return;
  openLightbox(imgs, 0, h.name);
}
function openHotelGalleryAt(i) {
  if (!_hotelGalleryImgs.length) return;
  const h = activeOffer && activeOffer.hotels ? activeOffer.hotels[selectedHotelIdx] : null;
  openLightbox(_hotelGalleryImgs, i, h ? h.name : '');
}

// Lazy-load a pochivka offer's scraped hotel info (data/hotels/<num>.js), then run cb.
let _hotelDataLoaded = {};
function loadHotelInfo(offer, cb) {
  const m = (offer && offer.refNum || '').match(/^П(\d+)/); // П<num>
  if (!m) { cb(); return; }
  const num = m[1];
  if (_hotelDataLoaded[num]) { cb(); return; }
  const s = document.createElement('script');
  s.src = 'data/hotels/' + num + '.js?v=2';
  s.onload = function () { _hotelDataLoaded[num] = true; cb(); };
  s.onerror = function () { cb(); }; // no data file yet → render with fallbacks
  document.head.appendChild(s);
}
function renderHotelsSection() {
  const offer = activeOffer; if (!offer) return;
  const hotels = offer.hotels || [];
  const hotelsSec = document.getElementById('offerHotelsSection');
  const hotelsEl = document.getElementById('offerHotels');
  if (!hotelsSec || !hotelsEl) return;
  if (hotels.length) {
    hotelsSec.style.display = '';
    hotelsEl.innerHTML = hotels.map((h, i) => `
      <div class="hotel-card ${i === 0 ? 'selected' : ''}" onclick="selectHotel(${i})">
        <div class="hotel-card-imgwrap" onclick="event.stopPropagation();openHotelPhotos(${i})" title="Виж снимки">
          <img class="hotel-card-img" src="${proxify(hotelImg(h))}" alt="${h.name}" onerror="hotelImgError(this)">
          <span class="hotel-card-zoom">🔍</span>
        </div>
        <div class="hotel-card-info">
          <div class="hotel-card-name">${h.name}</div>
          <div class="hotel-card-board">${h.board}</div>
        </div>
        <div class="hotel-card-price">
          <div class="hotel-card-price-eur">${h.price_eur} €</div>
          <div class="hotel-card-price-bgn">${h.price_bgn.toFixed(2)} лв.</div>
        </div>
      </div>`).join('');
    renderHotelDetail(hotels[0]);
  } else {
    hotelsSec.style.display = 'none';
  }
}

// ── Hotel / date selection ──
function selectHotel(idx) {
  if (!activeOffer || !activeOffer.hotels) return;
  selectedHotelIdx = idx;
  const h = activeOffer.hotels[idx];
  document.querySelectorAll('.hotel-card').forEach((el, i) => el.classList.toggle('selected', i === idx));
  document.getElementById('offerPrice').textContent = `от ${h.price_eur} €`;
  document.getElementById('offerPriceSub').textContent = `/ ${h.price_bgn.toFixed(2)} лв. · ${activeOffer.duration}`;
  const inq = document.getElementById('inqHotel'); if (inq) inq.value = h.name;
  renderHotelDetail(h);
}
// Turn the flat operator description into clear, client-friendly sections.
function structureHotelDesc(html) {
  if (!html) return '';
  const segs = html.split(/<strong>([^<]{2,45}?):<\/strong>/);
  let out = '';
  const intro = (segs[0] || '').trim();
  if (intro && intro.replace(/<[^>]+>/g, '').trim()) out += `<div class="hd-body">${intro}</div>`;
  for (let i = 1; i < segs.length; i += 2) {
    const label = (segs[i] || '').trim();
    const body = (segs[i + 1] || '').trim();
    out += `<div class="hd-sec"><div class="hd-sec-title">${label}</div><div class="hd-body">${body}</div></div>`;
  }
  return out || html;
}
function renderHotelDetail(h) {
  const box = document.getElementById('hotelDetail');
  if (!box || !h) return;
  const info = hotelInfoFor(h);
  const imgs = hotelGallery(h);
  _hotelGalleryImgs = imgs;
  const stars = info && info.stars ? ' ' + '★'.repeat(info.stars) : '';
  const big = imgs.length
    ? `<img src="${proxify(imgs[0])}" alt="${h.name}" loading="lazy" onclick="openHotelGalleryAt(0)" onerror="hotelImgError(this)" style="width:100%;max-height:340px;height:auto;object-fit:cover;border-radius:12px;cursor:pointer;display:block;margin-bottom:10px;">`
    : '';
  const thumbs = imgs.slice(1, 13).map((u, i) =>
    `<img src="${proxify(u)}" alt="${h.name} ${i + 2}" loading="lazy" onclick="openHotelGalleryAt(${i + 1})" onerror="hotelImgError(this)" style="width:190px;height:134px;object-fit:cover;border-radius:10px;cursor:pointer;flex:0 0 auto;">`).join('');
  const desc = info && info.desc ? info.desc : '';
  box.innerHTML =
    `<div style="font-weight:800;color:var(--primary);font-size:1.2rem;margin-bottom:2px;">${h.name}<span style="color:var(--gold);">${stars}</span></div>` +
    `<div style="color:var(--gray-600);font-size:0.9rem;margin-bottom:12px;">${h.board || ''}${info && info.location ? ' · 📍 ' + info.location : ''}</div>` +
    big +
    (imgs.length > 1 ? `<div style="display:flex;gap:10px;overflow-x:auto;padding-bottom:8px;margin-bottom:14px;">${thumbs}</div>` : '') +
    (desc ? `<div class="hotel-desc">${structureHotelDesc(desc)}</div>`
          : `<div style="color:var(--gray-400);font-size:0.86rem;">Подробна информация за този хотел предстои да бъде добавена.</div>`) +
    renderHotelPrices(info);
  box.style.display = '';
}
// Option B: clean room-type → price table with a date dropdown.
let _hotelPrices = null;
function renderHotelPrices(info) {
  if (!info || !info.rooms || !info.rooms.length || !info.dates || !info.dates.length) return '';
  _hotelPrices = info;
  const opts = info.dates.map((d, i) => `<option value="${i}">${d}</option>`).join('');
  return `<div class="hotel-prices">
    <div class="hp-head"><span>💶 Цени по тип стая</span>
      <label>📅 Дата: <select id="hpDate" onchange="hpUpdate(this.value)">${opts}</select></label></div>
    <div id="hpBody">${hpTable(0)}</div>
    <div style="font-size:0.76rem;color:var(--gray-400);margin-top:6px;">Цените са ориентировъчни, на човек. Изпратете запитване за точна оферта.</div>
  </div>`;
}
function hpTable(di) {
  di = +di || 0;
  if (!_hotelPrices) return '';
  const rows = _hotelPrices.rooms.map(r => {
    const eur = r.p[di] || 0;
    const bgn = eur ? eur * 1.95583 : 0;
    return `<tr><td>${r.n}</td><td style="white-space:nowrap;text-align:right;font-weight:700;color:var(--primary);">${eur ? eur + ' € <span style="color:var(--gray-500);font-weight:500;">/ ' + bgn.toFixed(2) + ' лв.</span>' : '—'}</td></tr>`;
  }).join('');
  return `<table class="hp-table"><thead><tr><th>Тип стая</th><th style="text-align:right;">Цена / човек</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function hpUpdate(di) { const b = document.getElementById('hpBody'); if (b) b.innerHTML = hpTable(di); }
function selectDate(date) {
  selectedDate = date;
  document.querySelectorAll('.modal-date-btn').forEach(b => b.classList.toggle('selected', b.textContent === date));
  const d = document.getElementById('inqDate'); if (d) d.value = date;
}

// ── Render the page ──
function renderOfferPage() {
  const idParam = getParam('id');
  const refParam = getParam('ref');
  let offer = null;
  if (idParam) offer = ALL_OFFERS.find(o => String(o.id) === String(idParam));
  if (!offer && refParam) offer = ALL_OFFERS.find(o => (o.refNum || '').toLowerCase() === refParam.toLowerCase());
  if (!offer) {
    document.getElementById('offerRoot').innerHTML =
      '<div style="max-width:700px;margin:6rem auto;text-align:center;padding:2rem;">' +
      '<h2 style="font-family:\'Playfair Display\',serif;color:var(--primary);">Офертата не е намерена</h2>' +
      '<p style="color:var(--gray-600);margin:1rem 0;">Възможно е да е премахната или линкът да е остарял.</p>' +
      '<a href="index.html#offers" class="form-submit" style="display:inline-block;text-decoration:none;width:auto;padding:12px 28px;">← Към всички оферти</a></div>';
    return;
  }
  activeOffer = offer;
  selectedDate = offer.dates && offer.dates[0] || null;
  selectedHotelIdx = 0;
  document.title = `${offer.title} — Marvel Tour`;
  recordOfferView(offer);

  // Auto-fill inquiry from logged-in customer (session shared via storage)
  try {
    const cust = JSON.parse(sessionStorage.getItem('mt_customer_session') || 'null');
    if (cust) {
      setTimeout(() => {
        const n = document.getElementById('inqName'), e = document.getElementById('inqEmail');
        if (n && !n.value) n.value = cust.name || '';
        if (e && !e.value) e.value = cust.email || '';
      }, 0);
    }
  } catch (err) {}

  const hotels = offer.hotels || [];
  const priceEur = hotels.length ? hotels[0].price_eur : offer.price_eur;
  const priceBgn = hotels.length ? hotels[0].price_bgn : offer.price_bgn;
  const cat = offer.category || '';
  const typeLabel = cat.includes('vacation') ? 'Почивка' : cat.includes('excursion') ? 'Екскурзия' : cat.includes('exotic') ? 'Екзотика' : 'Оферта';

  // Gallery
  const cover = coverOf(offer);
  // Themed page backdrop from the offer's own photo
  const ob = document.getElementById('ofertaBg');
  if (ob && cover) ob.style.backgroundImage = `url('${proxify(cover)}')`;
  if (offer.gallery && offer.gallery.length) {
    let imgs = offer.gallery.slice();
    if (imgs.indexOf(cover) === -1) imgs.unshift(cover);
    setupGallery(imgs, offer.title);
  } else {
    setupGallery([cover], offer.title);
    buildGalleryAsync(cover, (imgs) => {
      if (imgs.length <= 1) return;
      setupGallery(imgs, offer.title);
      const distinct = new Set((activeOffer.hotels || []).map(hotelImg)).size;
      if (distinct <= 1) {
        document.querySelectorAll('#offerHotels .hotel-card-img').forEach((el, i) => {
          el.src = proxify(imgs[i % imgs.length]); el.style.display = '';
        });
      }
    });
  }

  // Header texts
  document.getElementById('offerTitle').textContent = offer.title;
  document.getElementById('offerPrice').textContent = `от ${priceEur} €`;
  document.getElementById('offerPriceSub').textContent = `/ ${priceBgn.toFixed(2)} лв. · ${offer.duration}`;
  document.getElementById('offerDesc').textContent = offer.description || '';
  document.getElementById('offerBadges').innerHTML =
    `<span class="modal-tag blue">${typeLabel}</span>` +
    `<span class="modal-tag">${transportLabel(offer.transport)}</span>` +
    (offer.refNum ? `<span class="modal-tag" style="background:rgba(26,58,107,0.1);color:var(--primary);">🔖 ${offer.refNum}</span>` : '') +
    `<span class="modal-tag" style="background:rgba(201,168,76,0.15);color:#9a7b1f;">📍 ${offer.destination || ''}</span>`;

  // Hotels — lazy-load this offer's per-hotel info (gallery + description), then render
  loadHotelInfo(offer, renderHotelsSection);

  // Program
  const progSec = document.getElementById('offerProgramSection');
  const progEl = document.getElementById('offerProgram');
  if (offer.program && offer.program.length) {
    progSec.style.display = '';
    progEl.innerHTML = offer.program.map(p => `
      <div class="program-day"><div class="program-day-title">${p.day}</div><div class="program-day-text">${p.text}</div></div>`).join('');
  } else { progSec.style.display = 'none'; }

  // Full details (verbatim operator text / tables)
  const detSec = document.getElementById('offerDetailsSection');
  const detEl = document.getElementById('offerDetails');
  if (detSec && detEl) {
    detSec.style.display = 'none';
    detEl.innerHTML = '';
    fetch('data/details/' + offer.id + '.html?v=141')
      .then(r => r.ok ? r.text() : '')
      .then(t => { if (t && t.trim().length > 10) {
        detEl.innerHTML = t; detSec.style.display = ''; makeDetailTablesInteractive(detEl);
        // Avoid duplication: if the full detail already contains a section, hide the structured copy
        const has = re => re.test(t);
        if (has(/<h3>\s*Програма/i) && progSec) progSec.style.display = 'none';
        const incExc = document.getElementById('offerIncExcSection');
        if (incExc && (has(/Цената включва/i) || has(/Цената не включва/i))) incExc.style.display = 'none';
      } })
      .catch(() => {});
  }

  // Includes / Excludes
  document.getElementById('offerIncludes').innerHTML = (offer.includes || []).map(i => `<li>${i}</li>`).join('');
  document.getElementById('offerExcludes').innerHTML = (offer.excludes || []).map(e => `<li>${e}</li>`).join('');

  // Dates
  document.getElementById('offerDates').innerHTML = (offer.dates || []).map(d =>
    `<button class="modal-date-btn ${d === selectedDate ? 'selected' : ''}" onclick="selectDate('${d}')">${d}</button>`).join('');

  // Inquiry form defaults
  document.getElementById('inqDate').innerHTML = (offer.dates || []).map(d => `<option>${d}</option>`).join('');
  document.getElementById('inqRef').value = offer.refNum || ('#' + offer.id);
  const ig = document.getElementById('inqHotelGroup');
  if (hotels.length) { ig.style.display = ''; document.getElementById('inqHotel').value = hotels[0].name; }
  else ig.style.display = 'none';
}

// ── Inquiry submit (localStorage + optional Supabase) ──
async function submitInquiry() {
  const name = document.getElementById('inqName').value.trim();
  const phone = document.getElementById('inqPhone').value.trim();
  const email = document.getElementById('inqEmail').value.trim();
  const adults = parseInt(document.getElementById('inqAdults').value, 10) || 1;
  const children = parseInt(document.getElementById('inqChildren').value, 10) || 0;
  const people = `${adults} възр.${children ? ' + ' + children + ' деца' : ''}`;
  const hotelName = (document.getElementById('inqHotel').value || '').trim();
  const date = document.getElementById('inqDate').value;
  const msg = document.getElementById('inqMsg').value.trim();
  if (!name || !phone) { showToast('❗ Моля попълнете име и телефон.', 'error'); return; }

  const btn = document.querySelector('.form-submit');
  btn.disabled = true; btn.textContent = '⏳ Изпращане...';

  const inquiry = {
    offer_id: activeOffer?.id,
    offer_ref: activeOffer?.refNum || (activeOffer ? '#' + activeOffer.id : ''),
    offer_title: activeOffer?.title,
    hotel: hotelName || undefined,
    name, phone, email, adults, children, people,
    preferred_date: date, message: msg,
    created_at: new Date().toISOString(), status: 'new'
  };

  let saved = false;
  if (typeof window.supabase !== 'undefined' && window.__mtSupabase) {
    try { const { error } = await window.__mtSupabase.from('inquiries').insert([inquiry]); if (!error) saved = true; } catch (e) {}
  }
  if (!saved) {
    const local = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');
    local.unshift({ ...inquiry, id: Date.now() });
    localStorage.setItem('mt_inquiries', JSON.stringify(local));
  }

  btn.disabled = false; btn.textContent = '✉️ Изпрати запитване';
  document.getElementById('inquiryFormContent').style.display = 'none';
  document.getElementById('inquirySuccess').style.display = 'block';
  showToast('✅ Запитването е изпратено!', 'success');
}

// Make price/variant tables in the details clickable — the client can pick a
// row (e.g. apartment with/without sea view) and it is added to the inquiry,
// without changing the layout/flow.
function makeDetailTablesInteractive(container) {
  if (!container) return;
  const MARKER = 'Избран вариант: ';
  // Rebuild the inquiry message from ALL currently-selected rows (multi-select)
  function syncSelectionToMsg() {
    const labels = [];
    container.querySelectorAll('tr.od-row-selected').forEach(tr => {
      const cells = Array.from(tr.querySelectorAll('td')).map(c => c.textContent.replace(/^✔\s*/, '').trim()).filter(Boolean);
      if (cells.length) labels.push(cells.join(' · '));
    });
    const inqMsg = document.getElementById('inqMsg');
    if (!inqMsg) return;
    const other = (inqMsg.value || '').split('\n').filter(l => l && !l.startsWith(MARKER));
    const sel = labels.map(l => MARKER + l);
    inqMsg.value = [...sel, ...other].join('\n').trim();
  }
  const CUR = /(€|\bEUR\b|\bBGN\b|лв|евро|лева)/i;
  container.querySelectorAll('table').forEach(tbl => {
    const rows = Array.from(tbl.querySelectorAll('tr'));
    if (rows.length < 2) return;
    // A selectable service/room row must carry BOTH a number AND a currency
    // (a real price). This excludes informative tables — flight schedules,
    // documents, notes — which never satisfy this.
    const selectable = rows.filter(function (tr, i) {
      if (tr.querySelector('th') || i === 0) return false;
      var t = tr.textContent || '';
      return /\d/.test(t) && CUR.test(t);
    });
    if (!selectable.length) return; // purely informative table → not interactive, no hint
    selectable.forEach(function (tr) {
      tr.style.cursor = 'pointer';
      tr.title = 'Кликнете, за да маркирате / размаркирате';
      tr.addEventListener('click', function () {
        const on = tr.classList.toggle('od-row-selected');
        syncSelectionToMsg();
        const cells = Array.from(tr.querySelectorAll('td')).map(function (c) { return c.textContent.replace(/^✔\s*/, '').trim(); }).filter(Boolean);
        const label = cells.join(' · ');
        try { showToast((on ? '✓ Маркирано: ' : '✕ Премахнато: ') + label.slice(0, 45), on ? 'success' : 'error'); } catch (e) {}
      });
    });
    const hint = document.createElement('div');
    hint.textContent = '👆 Кликнете върху редове, за да маркирате един или повече варианти (отново — за размаркиране)';
    hint.style.cssText = 'font-size:0.8rem;color:#16a34a;margin:2px 0 6px;font-weight:600;';
    tbl.parentNode.insertBefore(hint, tbl);
  });
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

document.addEventListener('DOMContentLoaded', renderOfferPage);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
