// ===== STATE =====
let currentCategory = 'all';
let currentTag = null;
let currentCountry = null;
let currentSearch = '';
let currentSort = 'default';
let activeOffer = null;
let favorites = JSON.parse(localStorage.getItem('mt_favorites') || '[]');

// ===== MERGE CUSTOM OFFERS =====
const customOffers = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
const deletedIds = JSON.parse(localStorage.getItem('mt_deleted_offers') || '[]');
const ALL_OFFERS = [...OFFERS.filter(o => !deletedIds.includes(o.id)), ...customOffers];

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

// ===== CUSTOMER AUTH =====
function registerCustomer(name, email, password) {
  const customers = JSON.parse(localStorage.getItem('mt_customers') || '[]');
  if (customers.find(c => c.email === email)) {
    return { success: false, error: 'Имейлът вече е регистриран.' };
  }
  const customer = {
    id: Date.now(),
    name,
    email,
    password: btoa(password),
    created_at: new Date().toISOString(),
    favorites: []
  };
  customers.push(customer);
  localStorage.setItem('mt_customers', JSON.stringify(customers));
  return { success: true, customer };
}

function loginCustomer(email, password) {
  const customers = JSON.parse(localStorage.getItem('mt_customers') || '[]');
  const customer = customers.find(c => c.email === email && c.password === btoa(password));
  if (!customer) {
    return { success: false, error: 'Грешен имейл или парола.' };
  }
  const session = { id: customer.id, name: customer.name, email: customer.email };
  sessionStorage.setItem('mt_customer_session', JSON.stringify(session));
  // Sync favorites from customer profile
  favorites = customer.favorites || [];
  localStorage.setItem('mt_favorites', JSON.stringify(favorites));
  return { success: true, customer: session };
}

function logoutCustomer() {
  sessionStorage.removeItem('mt_customer_session');
  favorites = JSON.parse(localStorage.getItem('mt_favorites') || '[]');
  updateNavbarAuth();
  renderOffers();
  showToast('Излязохте от профила си.', 'success');
}

function getCurrentCustomer() {
  return JSON.parse(sessionStorage.getItem('mt_customer_session') || 'null');
}

function updateNavbarAuth() {
  const customer = getCurrentCustomer();

  // Desktop navbar button
  const btn = document.getElementById('customerAuthBtn');
  if (btn) {
    if (customer) {
      btn.textContent = `👤 ${customer.name}`;
      btn.onclick = logoutCustomer;
      btn.title = 'Кликнете за изход';
    } else {
      btn.textContent = '👤 Вход / Регистрация';
      btn.onclick = openAuthModal;
    }
  }

  // Mobile menu button
  const mobileBtn = document.getElementById('mobileAuthBtn');
  if (mobileBtn) {
    if (customer) {
      mobileBtn.textContent = `👤 ${customer.name} — Изход`;
      mobileBtn.classList.add('logged-in');
      mobileBtn.onclick = () => { toggleMobileMenu(); logoutCustomer(); };
    } else {
      mobileBtn.textContent = '👤 Вход / Регистрация';
      mobileBtn.classList.remove('logged-in');
      mobileBtn.onclick = () => { toggleMobileMenu(); openAuthModal(); };
    }
  }
}

function openAuthModal(tab) {
  // Reset error messages
  const le = document.getElementById('loginError');
  const re = document.getElementById('regError');
  if (le) { le.textContent = ''; le.style.display = 'none'; }
  if (re) { re.textContent = ''; re.style.display = 'none'; }
  switchAuthTab(tab || 'login');
  document.getElementById('authModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  // Focus first input
  setTimeout(() => {
    const f = document.querySelector('#authFormLogin input:first-of-type, #authFormRegister input:first-of-type');
    if (f && f.offsetParent) f.focus();
  }, 200);
}

function closeAuthModal() {
  document.getElementById('authModal').classList.remove('active');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('authFormLogin').style.display = isLogin ? 'block' : 'none';
  document.getElementById('authFormRegister').style.display = isLogin ? 'none' : 'block';
  document.getElementById('authTabLogin').classList.toggle('active', isLogin);
  document.getElementById('authTabRegister').classList.toggle('active', !isLogin);
}

function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errEl = document.getElementById('loginError');
  const result = loginCustomer(email, password);
  if (!result.success) {
    errEl.textContent = result.error;
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';
  closeAuthModal();
  updateNavbarAuth();
  renderOffers();
  showToast(`Добре дошли, ${result.customer.name}!`, 'success');
}

function handleRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value;
  const confirm = document.getElementById('regPasswordConfirm').value;
  const errEl = document.getElementById('regError');

  if (!name || !email || !password) {
    errEl.textContent = 'Моля попълнете всички полета.';
    errEl.style.display = 'block';
    return;
  }
  if (password !== confirm) {
    errEl.textContent = 'Паролите не съвпадат.';
    errEl.style.display = 'block';
    return;
  }

  const result = registerCustomer(name, email, password);
  if (!result.success) {
    errEl.textContent = result.error;
    errEl.style.display = 'block';
    return;
  }

  // Auto-login after registration
  loginCustomer(email, password);
  errEl.style.display = 'none';
  closeAuthModal();
  updateNavbarAuth();
  renderOffers();
  showToast(`Регистрацията е успешна! Добре дошли, ${name}!`, 'success');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  updateStatCounter();
  renderFeatured();
  initContinentMap();
  renderFilters();
  renderOffers();
  initNavbar();
  initHeroSearch();
  updateNavbarAuth();
  trackPageView('home');
});

// ===== MOBILE MENU =====
function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

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
  const target = ALL_OFFERS.length;
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
  const featured = ALL_OFFERS.filter(o => o.featured).slice(0, 5);
  if (!featured.length) return;

  const [main, ...rest] = featured;
  let html = `
    <a class="featured-card-large" onclick="openOffer(${main.id})" href="javascript:void(0)">
      <img src="${main.image}" alt="${main.title}" loading="lazy">
      <div class="featured-card-overlay">
        <div class="offer-destination">📍 ${main.destination}</div>
        <div class="offer-title">${main.title}</div>
        <div style="display:flex;align-items:baseline;gap:6px;margin-top:8px;">
          <span class="offer-price">от ${main.price_eur} €</span>
          <span class="offer-price-eur">/ ${main.price_bgn.toFixed(0)} лв.</span>
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
            <span class="offer-price" style="font-size:1.1rem;">от ${o.price_eur} €</span>
            <span class="offer-price-eur">/ ${o.price_bgn.toFixed(0)} лв.</span>
          </div>
        </div>
      </a>
    `;
  });
  grid.innerHTML = html;
}

// ===== CONTINENT MAP =====
const CONTINENT_DATA = {
  europe: {
    label: 'Европа', icon: '🏰',
    countries: ['greece','france','spain','italy','albania','poland','austria'],
    images: {
      greece:  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80',
      france:  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80',
      spain:   'https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=400&q=80',
      italy:   'https://images.unsplash.com/photo-1555993539-1732b0258235?w=400&q=80',
      albania: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=400&q=80',
      poland:  'https://images.unsplash.com/photo-1519197924294-4ba991a11128?w=400&q=80',
      austria: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
    }
  },
  africa: {
    label: 'Африка', icon: '🦁',
    countries: ['egypt','morocco'],
    images: {
      egypt:   'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&q=80',
      morocco: 'https://images.unsplash.com/photo-1548697741-cc45ab89ef66?w=400&q=80',
    }
  },
  asia: {
    label: 'Азия', icon: '🏯',
    countries: ['turkey','uae','jordan','thailand','vietnam'],
    images: {
      turkey:   'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=400&q=80',
      uae:      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80',
      jordan:   'https://images.unsplash.com/photo-1548607595-dc2f55dcf63c?w=400&q=80',
      thailand: 'https://images.unsplash.com/photo-1508009603885-50cf7c8dd0d5?w=400&q=80',
      vietnam:  'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=400&q=80',
    }
  },
  america: {
    label: 'Америка', icon: '🗽',
    countries: [],
    images: {}
  }
};

let activeContinent = null;

function initContinentMap() {
  // Count offers per continent and update badges
  Object.entries(CONTINENT_DATA).forEach(([key, data]) => {
    const count = ALL_OFFERS.filter(o => data.countries.includes(o.country)).length;
    const el = document.getElementById(`cnt-${key}`);
    if (el) el.textContent = count > 0 ? `${count} оферти` : 'Скоро';
  });
}

function selectContinent(key) {
  const data = CONTINENT_DATA[key];
  if (!data) return;

  // Toggle off
  if (activeContinent === key) {
    closeContinent();
    return;
  }
  activeContinent = key;

  // Update bubble states
  document.querySelectorAll('.continent-bubble').forEach(b => {
    b.classList.toggle('active', b.dataset.continent === key);
  });

  // Build country cards
  const panel = document.getElementById('continentPanel');
  const title = document.getElementById('panelTitle');
  const grid  = document.getElementById('continentCountries');

  title.innerHTML = `<span>${data.icon}</span> ${data.label}`;

  const FLAGS = {
    greece:'🇬🇷', turkey:'🇹🇷', egypt:'🇪🇬', spain:'🇪🇸', france:'🇫🇷',
    italy:'🇮🇹', uae:'🇦🇪', morocco:'🇲🇦', jordan:'🇯🇴', albania:'🇦🇱',
    austria:'🇦🇹', poland:'🇵🇱', thailand:'🇹🇭', vietnam:'🇻🇳'
  };
  if (!data.countries.length) {
    grid.innerHTML = `<div style="color:rgba(255,255,255,0.5);font-size:0.9rem;padding:1rem 0;grid-column:1/-1;">Оферти за тази дестинация скоро...</div>`;
  } else {
    grid.innerHTML = data.countries.map(countryId => {
      const country = COUNTRIES.find(c => c.key === countryId);
      if (!country) return '';
      const offers = ALL_OFFERS.filter(o => o.country === countryId);
      const minPrice = offers.length ? Math.min(...offers.map(o => o.price_eur)) : 0;
      const img = data.images[countryId] || '';
      const flag = FLAGS[countryId] || '🌍';
      return `
        <a class="country-card" href="javascript:void(0)" onclick="filterByCountry('${countryId}');closeContinent();document.getElementById('offers').scrollIntoView({behavior:'smooth'})">
          <div class="country-card-img-wrap">
            <img class="country-card-img" src="${img}" alt="${country.label}" loading="lazy"
                 onerror="this.src='${PLACEHOLDER_IMG}'">
          </div>
          <div class="country-card-body">
            <div class="country-flag-name">
              <span class="country-flag">${flag}</span>
              <span class="country-name-text">${country.label}</span>
            </div>
            <div class="country-offer-count">${offers.length} оферт${offers.length === 1 ? 'а' : 'и'}</div>
            ${minPrice ? `<div class="country-price">от ${minPrice.toFixed(0)} €</div>` : ''}
          </div>
        </a>
      `;
    }).join('');
  }

  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeContinent() {
  activeContinent = null;
  document.querySelectorAll('.continent-bubble').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('continentPanel');
  panel.style.display = 'none';
}

// ===== FILTER RENDERING =====
function renderFilters() {
  const container = document.getElementById('tagFilters');
  if (!container) return;

  const builtInTags = typeof TAGS !== 'undefined' ? TAGS : [];
  // Custom tags stored as {key, label} or as strings
  const customTags = JSON.parse(localStorage.getItem('mt_custom_tags') || '[]');
  const customNorm = customTags.map(t => typeof t === 'object' ? t : { key: t, label: t });
  const allTags = [
    ...builtInTags,
    ...customNorm.filter(ct => !builtInTags.some(bt => bt.key === ct.key))
  ];

  container.innerHTML = allTags.map(tag => {
    const key   = typeof tag === 'object' ? tag.key   : tag;
    const label = typeof tag === 'object' ? tag.label : tag;
    return `<button data-tag="${key}" class="filter-btn${currentTag === key ? ' active' : ''}" onclick="filterByTag('${key}')">${label}</button>`;
  }).join('');
}

// ===== OFFERS GRID =====
function getFilteredOffers() {
  let list = [...ALL_OFFERS];
  if (currentCategory !== 'all') list = list.filter(o => o.category === currentCategory);
  if (currentTag) list = list.filter(o => o.tags.includes(currentTag));
  if (currentCountry) list = list.filter(o => o.country === currentCountry);
  if (currentSearch) {
    const COUNTRY_NAMES_BG = {
      greece:'гърция', turkey:'турция', egypt:'египет', spain:'испания',
      france:'франция', italy:'италия', uae:'дубай', morocco:'мароко',
      jordan:'йордания', albania:'албания', austria:'австрия', poland:'полша',
      thailand:'тайланд', vietnam:'виетнам'
    };
    list = list.filter(o => {
      const countryBg = COUNTRY_NAMES_BG[o.country] || o.country;
      return (
        o.title.toLowerCase().includes(currentSearch) ||
        o.destination.toLowerCase().includes(currentSearch) ||
        (o.description || '').toLowerCase().includes(currentSearch) ||
        countryBg.includes(currentSearch) ||
        o.country.includes(currentSearch) ||
        (o.tags || []).some(t => t.toLowerCase().includes(currentSearch))
      );
    });
  }
  if (currentSort === 'price-asc') list.sort((a, b) => a.price_eur - b.price_eur);
  if (currentSort === 'price-desc') list.sort((a, b) => b.price_eur - a.price_eur);
  if (currentSort === 'duration-asc') list.sort((a, b) => a.days - b.days);
  return list;
}

// Helper: translate transport
function transportLabel(t) {
  const map = { flight: '✈️ Самолет', bus: '🚌 Автобус', car: '🚗 Автомобил', ship: '🚢 Кораб', train: '🚆 Влак' };
  return map[t] || t || '✈️ Самолет';
}

// Helper: format date to Bulgarian
function formatDate(d) {
  if (!d) return '';
  const months = ['яну','фев','март','апр','май','юни','юли','авг','сеп','окт','ное','дек'];
  const parts = d.split('-');
  if (parts.length === 3) {
    return `${parseInt(parts[2])} ${months[parseInt(parts[1])-1]} ${parts[0]}`;
  }
  return d;
}

// Helper: fallback placeholder image
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=70';

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
    const cat = o.category || '';
    const typeLabel = cat.includes('vacation') ? 'Почивка' : cat.includes('excursion') ? 'Екскурзия' : cat.includes('weekend') ? 'Уикенд' : 'Оферта';
    const typeCls = cat.includes('vacation') ? 'vacation' : cat.includes('excursion') ? 'excursion' : '';
    const imgSrc = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) || (o.image && o.image.startsWith('http') ? o.image : PLACEHOLDER_IMG);
    const dateStr = formatDate(o.next_date);
    const transport = transportLabel(o.transport);
    return `
      <div class="offer-card animate-in" style="animation-delay:${i * 0.05}s" onclick="openOffer(${o.id})">
        <div class="offer-card-img-wrap">
          <img class="offer-card-img" src="${imgSrc}" alt="${o.title}" loading="lazy"
               onerror="this.src='${PLACEHOLDER_IMG}'">
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
            ${dateStr ? `<div class="offer-meta-item">
              <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              от ${dateStr}
            </div>` : ''}
            <div class="offer-meta-item">
              ${transport}
            </div>
          </div>
          <div class="offer-card-footer">
            <div>
              <div class="offer-price-label">Цена от</div>
              <div>
                <span class="offer-price">${o.price_eur} €</span>
                <span class="offer-price-eur"> / ${o.price_bgn} лв.</span>
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
  document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
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
  const sortEl = document.getElementById('sortSelect');
  if (sortEl) sortEl.value = 'default';
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

  // Sync to logged-in customer profile
  const customer = getCurrentCustomer();
  if (customer) {
    const customers = JSON.parse(localStorage.getItem('mt_customers') || '[]');
    const cust = customers.find(c => c.id === customer.id);
    if (cust) {
      cust.favorites = favorites;
      localStorage.setItem('mt_customers', JSON.stringify(customers));
    }
  }

  renderOffers();
}

// ===== OFFER MODAL =====
let selectedDate = null;

function openOffer(id) {
  const offer = ALL_OFFERS.find(o => o.id === id);
  if (!offer) return;
  activeOffer = offer;
  selectedDate = offer.dates[0] || null;

  document.getElementById('modalImg').src = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[offer.id]) || offer.image || PLACEHOLDER_IMG;
  document.getElementById('modalImg').alt = offer.title;
  document.getElementById('modalTitle').textContent = offer.title;
  document.getElementById('modalPrice').textContent = `от ${offer.price_eur} €`;
  document.getElementById('modalPriceSub').textContent = `/ ${offer.price_bgn.toFixed(2)} лв.  · ${offer.duration}`;
  document.getElementById('modalDesc').textContent = offer.description;

  // Badges
  const cat2 = offer.category || '';
  const typeLabel = cat2.includes('vacation') ? 'Почивка' : cat2.includes('weekend') ? 'Уикенд' : 'Екскурзия';
  document.getElementById('modalBadges').innerHTML = `
    <span class="modal-tag blue">${typeLabel}</span>
    <span class="modal-tag">${transportLabel(offer.transport)}</span>
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
  ['inqName','inqPhone','inqEmail','inqMsg'].forEach(fid => { document.getElementById(fid).value = ''; });

  document.getElementById('offerModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Track view
  trackOfferView(offer.id, offer.title, offer.destination, offer.category);
}

function selectDate(date) {
  selectedDate = date;
  document.querySelectorAll('.modal-date-btn').forEach(b => {
    b.classList.toggle('selected', b.textContent === date);
  });
  document.getElementById('inqDate').value = date;
}

function closeModal(e) {
  // Close only when clicking the overlay backdrop itself
  if (!e || e.target === document.getElementById('offerModal')) {
    forceCloseModal();
  }
}

function forceCloseModal() {
  document.getElementById('offerModal').classList.remove('active');
  document.body.style.overflow = '';
  activeOffer = null;
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    forceCloseModal();
    closeAuthModal();
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

function trackOfferView(offerId, offerTitle, destination, category) {
  // Detailed array-based tracking in mt_offer_views
  const views = JSON.parse(localStorage.getItem('mt_offer_views') || '[]');
  views.push({
    offer_id: offerId,
    offer_title: offerTitle,
    destination: destination || '',
    category: category || '',
    created_at: new Date().toISOString()
  });
  // Keep max 500 entries
  if (views.length > 500) views.splice(0, views.length - 500);
  localStorage.setItem('mt_offer_views', JSON.stringify(views));

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
