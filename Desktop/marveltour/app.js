// ===== STATE =====
let currentCategory = 'all';
let currentTag = null;
let currentCountry = null;
let currentSearch = '';
let currentSort = 'default';
let activeOffer = null;
let favorites = JSON.parse(localStorage.getItem('mt_favorites') || '[]');

// ===== SUPABASE CONFIG =====
// Replace with your Supabase project URL and anon key after setup
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
let supabase = null;

function initSupabase() {
  if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    return true;
  }
  return false;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  updateStatCounter();
  renderFeatured();
  renderDestinations();
  renderOffers();
  initNavbar();
  initHeroSearch();
  trackPageView('home');
});

// ===== NAVBAR SCROLL =====
function initNavbar() {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.remove('transparent');
      nav.classList.add('scrolled');
    } else {
      nav.classList.add('transparent');
      nav.classList.remove('scrolled');
    }
  });
}

// ===== HERO SEARCH =====
function initHeroSearch() {
  const input = document.getElementById('heroSearch');
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') doHeroSearch();
  });
}

function doHeroSearch() {
  const val = document.getElementById('heroSearch').value.trim();
  if (!val) return;
  currentSearch = val.toLowerCase();
  currentCategory = 'all';
  currentTag = null;
  currentCountry = null;
  document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
  setTimeout(renderOffers, 400);
}

// ===== STAT COUNTER =====
function updateStatCounter() {
  const el = document.getElementById('stat-total');
  if (!el) return;
  let count = 0;
  const target = OFFERS.length;
  const step = Math.ceil(target / 30);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.textContent = count;
    if (count >= target) clearInterval(timer);
  }, 40);
}

// ===== FEATURED GRID =====
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = OFFERS.filter(o => o.featured).slice(0, 5);
  if (!featured.length) return;

  const [main, ...rest] = featured;
  let html = `
    <a class="featured-card-large" onclick="openOffer(${main.id})" href="javascript:void(0)">
      <img src="${main.image}" alt="${main.title}" loading="lazy">
      <div class="featured-card-overlay">
        <div class="offer-destination">📍 ${main.destination}</div>
        <div class="offer-title">${main.title}</div>
        <div style="display:flex;align-items:baseline;gap:6px;margin-top:8px;">
          <span class="offer-price">от ${main.price_bgn.toFixed(0)} лв.</span>
          <span class="offer-price-eur">/ ${main.price_eur} €</span>
        </div>
      </div>
    </a>
  `;
  rest.slice(0, 4).forEach(o => {
    html += `
      <a class="featured-card-sm" onclick="openOffer(${o.id})" href="javascript:void(0)">
        <img src="${o.image}" alt="${o.title}" loading="lazy">
        <div class="featured-card-overlay">
          <div class="offer-destination">📍 ${o.destination}</div>
          <div class="offer-title">${o.title}</div>
          <div style="display:flex;align-items:baseline;gap:6px;margin-top:6px;">
            <span class="offer-price" style="font-size:1.1rem;">от ${o.price_bgn.toFixed(0)} лв.</span>
            <span class="offer-price-eur">/ ${o.price_eur} €</span>
          </div>
        </div>
      </a>
    `;
  });
  grid.innerHTML = html;
}

// ===== DESTINATIONS =====
function renderDestinations() {
  const grid = document.getElementById('destinationsGrid');
  if (!grid) return;
  grid.innerHTML = COUNTRIES.map(c => {
    const count = OFFERS.filter(o => o.country === c.id).length;
    return `
      <a class="dest-card" href="javascript:void(0)" onclick="filterByCountry('${c.id}')">
        <span class="dest-flag">${c.flag}</span>
        <div class="dest-name">${c.label}</div>
        <div class="dest-count">${count} оферт${count === 1 ? 'а' : 'и'}</div>
      </a>
    `;
  }).join('');
}

// ===== OFFERS GRID =====
function getFilteredOffers() {
  let list = [...OFFERS];
  if (currentCategory !== 'all') list = list.filter(o => o.category === currentCategory);
  if (currentTag) list = list.filter(o => o.tags.includes(currentTag));
  if (currentCountry) list = list.filter(o => o.country === currentCountry);
  if (currentSearch) {
    list = list.filter(o =>
      o.title.toLowerCase().includes(currentSearch) ||
      o.destination.toLowerCase().includes(currentSearch) ||
      o.description.toLowerCase().includes(currentSearch)
    );
  }
  if (currentSort === 'price-asc') list.sort((a, b) => a.price_bgn - b.price_bgn);
  if (currentSort === 'price-desc') list.sort((a, b) => b.price_bgn - a.price_bgn);
  if (currentSort === 'duration-asc') list.sort((a, b) => a.days - b.days);
  return list;
}

function renderOffers() {
  const grid = document.getElementById('offersGrid');
  const noRes = document.getElementById('noResults');
  if (!grid) return;

  const list = getFilteredOffers();
  if (!list.length) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';

  grid.innerHTML = list.map((o, i) => {
    const isFav = favorites.includes(o.id);
    const typeLabel = o.category === 'vacation' ? 'Почивка' : 'Екскурзия';
    const typeCls = o.category === 'vacation' ? 'vacation' : '';
    return `
      <div class="offer-card animate-in" style="animation-delay:${i * 0.05}s" onclick="openOffer(${o.id})">
        <div class="offer-card-img-wrap">
          <img class="offer-card-img" src="${o.image}" alt="${o.title}" loading="lazy">
          <span class="offer-badge ${typeCls}">${typeLabel}</span>
          <button class="offer-fav ${isFav ? 'active' : ''}" onclick="toggleFav(event, ${o.id})" title="Любими">${isFav ? '❤️' : '🤍'}</button>
        </div>
        <div class="offer-card-body">
          <div class="offer-destination">📍 ${o.destination}</div>
          <div class="offer-title">${o.title}</div>
          <div class="offer-meta">
            <div class="offer-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              ${o.duration}
            </div>
            <div class="offer-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>
              от ${o.next_date}
            </div>
            <div class="offer-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              ${o.transport}
            </div>
          </div>
          <div class="offer-card-footer">
            <div>
              <div class="offer-price-label">Цена от</div>
              <div>
                <span class="offer-price">${o.price_bgn.toFixed(0)} лв.</span>
                <span class="offer-price-eur"> / ${o.price_eur} €</span>
              </div>
            </div>
            <button class="offer-btn" onclick="openOffer(${o.id});event.stopPropagation()">Детайли →</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== FILTER FUNCTIONS =====
function filterByCategory(cat) {
  currentCategory = cat;
  currentTag = null;
  currentSearch = '';
  document.getElementById('heroSearch').value = '';
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
  renderOffers();
  document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
}

function filterByTag(tag) {
  if (currentTag === tag) {
    currentTag = null;
    document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
  } else {
    currentTag = tag;
    document.querySelectorAll('[data-tag]').forEach(b => b.classList.toggle('active', b.dataset.tag === tag));
  }
  currentSearch = '';
  document.getElementById('heroSearch').value = '';
  renderOffers();
  document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
}

function filterByCountry(country) {
  currentCountry = country === currentCountry ? null : country;
  currentCategory = 'all';
  currentTag = null;
  currentSearch = '';
  document.getElementById('heroSearch').value = '';
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  renderOffers();
  document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
}

function applySortAndRender() {
  currentSort = document.getElementById('sortSelect').value;
  renderOffers();
}

function resetFilters() {
  currentCategory = 'all';
  currentTag = null;
  currentCountry = null;
  currentSearch = '';
  currentSort = 'default';
  document.getElementById('heroSearch').value = '';
  document.getElementById('sortSelect').value = 'default';
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
  renderOffers();
}

// ===== FAVORITES =====
function toggleFav(event, id) {
  event.stopPropagation();
  const idx = favorites.indexOf(id);
  if (idx === -1) {
    favorites.push(id);
    showToast('❤️ Добавено в любими!', 'success');
  } else {
    favorites.splice(idx, 1);
    showToast('🤍 Премахнато от любими', 'success');
  }
  localStorage.setItem('mt_favorites', JSON.stringify(favorites));
  renderOffers();
}

// ===== OFFER MODAL =====
let selectedDate = null;

function openOffer(id) {
  const offer = OFFERS.find(o => o.id === id);
  if (!offer) return;
  activeOffer = offer;
  selectedDate = offer.dates[0] || null;

  document.getElementById('modalImg').src = offer.image;
  document.getElementById('modalImg').alt = offer.title;
  document.getElementById('modalTitle').textContent = offer.title;
  document.getElementById('modalPrice').textContent = `от ${offer.price_bgn.toFixed(2)} лв.`;
  document.getElementById('modalPriceSub').textContent = `/ ${offer.price_eur} €  · ${offer.duration}`;
  document.getElementById('modalDesc').textContent = offer.description;

  // Badges
  const typeLabel = offer.category === 'vacation' ? 'Почивка' : 'Екскурзия';
  document.getElementById('modalBadges').innerHTML = `
    <span class="modal-tag blue">${typeLabel}</span>
    <span class="modal-tag">🚌 ${offer.transport}</span>
    ${offer.featured ? '<span class="modal-tag gold">⭐ Препоръчано</span>' : ''}
  `;

  // Highlights
  document.getElementById('modalHighlights').innerHTML = offer.highlights ? `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.5rem;">
      ${offer.highlights.map(h => `<span style="background:rgba(26,58,107,0.07);color:var(--primary);padding:6px 12px;border-radius:100px;font-size:0.8rem;font-weight:600;">✦ ${h}</span>`).join('')}
    </div>
  ` : '';

  // Includes / Excludes
  document.getElementById('modalIncludes').innerHTML = offer.includes.map(i => `<li>${i}</li>`).join('');
  document.getElementById('modalExcludes').innerHTML = offer.excludes.map(e => `<li>${e}</li>`).join('');

  // Dates
  document.getElementById('modalDates').innerHTML = offer.dates.map(d => `
    <button class="modal-date-btn ${d === selectedDate ? 'selected' : ''}" onclick="selectDate('${d}')">${d}</button>
  `).join('');

  // Inquiry date select
  document.getElementById('inqDate').innerHTML = offer.dates.map(d => `<option>${d}</option>`).join('');

  // Reset form
  document.getElementById('inquiryFormContent').style.display = 'block';
  document.getElementById('inquirySuccess').style.display = 'none';
  ['inqName','inqPhone','inqEmail','inqMsg'].forEach(id => { document.getElementById(id).value = ''; });

  document.getElementById('offerModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Track view
  trackOfferView(offer.id, offer.title);
}

function selectDate(date) {
  selectedDate = date;
  document.querySelectorAll('.modal-date-btn').forEach(b => {
    b.classList.toggle('selected', b.textContent === date);
  });
  document.getElementById('inqDate').value = date;
}

function closeModal(e) {
  if (e.target === document.getElementById('offerModal') || !e) {
    document.getElementById('offerModal').classList.remove('active');
    document.body.style.overflow = '';
    activeOffer = null;
  }
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('offerModal').classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===== INQUIRY SUBMIT =====
async function submitInquiry() {
  const name = document.getElementById('inqName').value.trim();
  const phone = document.getElementById('inqPhone').value.trim();
  const email = document.getElementById('inqEmail').value.trim();
  const people = document.getElementById('inqPeople').value;
  const date = document.getElementById('inqDate').value;
  const msg = document.getElementById('inqMsg').value.trim();

  if (!name || !phone) {
    showToast('❗ Моля попълнете ime и телефон.', 'error');
    return;
  }

  const btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.textContent = '⏳ Изпращане...';

  const inquiry = {
    offer_id: activeOffer?.id,
    offer_title: activeOffer?.title,
    name, phone, email, people,
    preferred_date: date,
    message: msg,
    created_at: new Date().toISOString(),
    status: 'new'
  };

  // Save to Supabase if configured, else localStorage fallback
  let saved = false;
  if (supabase) {
    try {
      const { error } = await supabase.from('inquiries').insert([inquiry]);
      if (!error) saved = true;
    } catch (err) { /* fallback */ }
  }

  if (!saved) {
    // LocalStorage fallback
    const local = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');
    local.unshift({ ...inquiry, id: Date.now() });
    localStorage.setItem('mt_inquiries', JSON.stringify(local));
  }

  btn.disabled = false;
  btn.textContent = '✉️ Изпрати запитване';
  document.getElementById('inquiryFormContent').style.display = 'none';
  document.getElementById('inquirySuccess').style.display = 'block';
  showToast('✅ Запитването е изпратено!', 'success');
}

// ===== ANALYTICS TRACKING =====
function trackPageView(page) {
  const views = JSON.parse(localStorage.getItem('mt_pageviews') || '[]');
  views.push({ page, ts: Date.now() });
  // Keep last 500
  if (views.length > 500) views.splice(0, views.length - 500);
  localStorage.setItem('mt_pageviews', JSON.stringify(views));

  if (supabase) {
    supabase.from('page_views').insert([{ page, created_at: new Date().toISOString() }]).catch(() => {});
  }
}

function trackOfferView(offerId, offerTitle) {
  const views = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
  views[offerId] = (views[offerId] || 0) + 1;
  localStorage.setItem('mt_offerviews', JSON.stringify(views));

  if (supabase) {
    supabase.from('offer_views').insert([{
      offer_id: offerId,
      offer_title: offerTitle,
      created_at: new Date().toISOString()
    }]).catch(() => {});
  }
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
