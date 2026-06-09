// Marvel Tour — single offer page (oferta.html?id=N or ?ref=Е422)
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=70';

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
  return h.image || PLACEHOLDER_IMG;
}

// Merge custom offers exactly like the main site
const _custom = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
const _deleted = JSON.parse(localStorage.getItem('mt_deleted_offers') || '[]');
const ALL_OFFERS = [...OFFERS.filter(o => !_deleted.includes(o.id)), ..._custom];

let activeOffer = null;
let selectedDate = null;
let selectedHotelIdx = 0;

function transportLabel(t) {
  const map = { flight: '✈️ Самолет', plane: '✈️ Самолет', bus: '🚌 Автобус', car: '🚗 Автомобил', ship: '🚢 Кораб', train: '🚆 Влак' };
  return map[t] || t || '✈️ Самолет';
}

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function coverOf(o) {
  return (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) ||
    (o.image && o.image.startsWith('http') ? o.image : '') || PLACEHOLDER_IMG;
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
      `<img class="modal-thumb ${i === 0 ? 'active' : ''}" src="${src}" alt="${alt || ''} ${i + 1}" onclick="galleryGoto(${i})" onerror="this.style.display='none'">`).join('') : '';
  }
  galleryGoto(0, alt);
}
function galleryGoto(i, alt) {
  if (!galleryImages.length) return;
  galleryIdx = (i + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('offerImg');
  if (img) { img.src = galleryImages[galleryIdx]; if (alt) img.alt = alt; }
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
  if (img) img.src = lbImages[lbIdx];
  if (cap) cap.textContent = lbCaption + (multi ? `  (${lbIdx + 1}/${lbImages.length})` : '');
  document.querySelectorAll('.lightbox-nav').forEach(b => b.style.display = multi ? '' : 'none');
}
function lightboxStep(d) { if (lbImages.length) { lbIdx = (lbIdx + d + lbImages.length) % lbImages.length; lbRender(); } }
function closeLightbox() { const lb = document.getElementById('lightbox'); if (lb) lb.classList.remove('active'); document.body.style.overflow = ''; }
function openHotelPhotos(idx) {
  if (!activeOffer) return;
  const hotels = activeOffer.hotels || [];
  const h = hotels[idx];
  const name = h ? h.name : (activeOffer.title || '');
  const distinct = new Set(hotels.map(hotelImg)).size;
  if (distinct > 1) {
    const set = [];
    const add = u => { if (u && set.indexOf(u) === -1) set.push(u); };
    if (h) add(hotelImg(h));
    hotels.forEach(x => add(hotelImg(x)));
    openLightbox(set, 0, name);
    return;
  }
  if (galleryImages && galleryImages.length > 1) {
    openLightbox(galleryImages, idx % galleryImages.length, name);
    return;
  }
  openLightbox([hotelImg(h)], 0, name);
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
}
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

  const hotels = offer.hotels || [];
  const priceEur = hotels.length ? hotels[0].price_eur : offer.price_eur;
  const priceBgn = hotels.length ? hotels[0].price_bgn : offer.price_bgn;
  const cat = offer.category || '';
  const typeLabel = cat.includes('vacation') ? 'Почивка' : cat.includes('excursion') ? 'Екскурзия' : cat.includes('exotic') ? 'Екзотика' : 'Оферта';

  // Gallery
  const cover = coverOf(offer);
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
          el.src = imgs[i % imgs.length]; el.style.display = '';
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

  // Hotels
  const hotelsSec = document.getElementById('offerHotelsSection');
  const hotelsEl = document.getElementById('offerHotels');
  if (hotels.length) {
    hotelsSec.style.display = '';
    hotelsEl.innerHTML = hotels.map((h, i) => `
      <div class="hotel-card ${i === 0 ? 'selected' : ''}" onclick="selectHotel(${i})">
        <div class="hotel-card-imgwrap" onclick="event.stopPropagation();openHotelPhotos(${i})" title="Виж снимки">
          <img class="hotel-card-img" src="${hotelImg(h)}" alt="${h.name}" onerror="this.style.display='none'">
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
  } else {
    hotelsSec.style.display = 'none';
  }

  // Program
  const progSec = document.getElementById('offerProgramSection');
  const progEl = document.getElementById('offerProgram');
  if (offer.program && offer.program.length) {
    progSec.style.display = '';
    progEl.innerHTML = offer.program.map(p => `
      <div class="program-day"><div class="program-day-title">${p.day}</div><div class="program-day-text">${p.text}</div></div>`).join('');
  } else { progSec.style.display = 'none'; }

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
