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
  // Prefer the shared client created by sb-init.js (reads keys from admin Settings / localStorage)
  if (window.__mtSupabase) { supabase = window.__mtSupabase; return true; }
  if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.__mtSupabase = supabase;
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

  const initial = customer ? (customer.name || '?').trim().charAt(0).toUpperCase() : '';

  // Desktop navbar button
  const btn = document.getElementById('customerAuthBtn');
  if (btn) {
    if (customer) {
      btn.innerHTML = `<span class="nav-avatar">${initial}</span><span>${customer.name.split(' ')[0]}</span>`;
      btn.onclick = openAccountPanel;
      btn.title = 'Моят профил';
      btn.classList.add('logged-in');
    } else {
      btn.textContent = '👤 Вход / Регистрация';
      btn.onclick = openAuthModal;
      btn.classList.remove('logged-in');
    }
  }

  // Mobile menu button
  const mobileBtn = document.getElementById('mobileAuthBtn');
  if (mobileBtn) {
    if (customer) {
      mobileBtn.textContent = `👤 ${customer.name} — Моят профил`;
      mobileBtn.classList.add('logged-in');
      mobileBtn.onclick = () => { toggleMobileMenu(); openAccountPanel(); };
    } else {
      mobileBtn.textContent = '👤 Вход / Регистрация';
      mobileBtn.classList.remove('logged-in');
      mobileBtn.onclick = () => { toggleMobileMenu(); openAuthModal(); };
    }
  }
}

// ===== ACCOUNT PANEL =====
const INQUIRY_STATUS = {
  new:        { label: 'Получено',    cls: 'st-new' },
  processing: { label: 'В обработка',  cls: 'st-proc' },
  in_progress:{ label: 'В обработка',  cls: 'st-proc' },
  confirmed:  { label: 'Потвърдено',   cls: 'st-ok' },
  done:       { label: 'Приключено',   cls: 'st-done' },
  completed:  { label: 'Приключено',   cls: 'st-done' },
  cancelled:  { label: 'Отказано',     cls: 'st-cancel' }
};

function openAccountPanel() {
  const c = getCurrentCustomer();
  if (!c) { openAuthModal(); return; }
  renderAccount();
  switchAccountTab('inq');
  document.getElementById('accountModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeAccountModal() {
  document.getElementById('accountModal').classList.remove('active');
  document.body.style.overflow = '';
}
function switchAccountTab(tab) {
  const inq = tab === 'inq';
  document.getElementById('accPanelInq').style.display = inq ? '' : 'none';
  document.getElementById('accPanelFav').style.display = inq ? 'none' : '';
  document.getElementById('accTabInq').classList.toggle('active', inq);
  document.getElementById('accTabFav').classList.toggle('active', !inq);
}
function renderAccount() {
  const c = getCurrentCustomer();
  if (!c) return;
  const initial = (c.name || '?').trim().charAt(0).toUpperCase();
  document.getElementById('accAvatar').textContent = initial;
  document.getElementById('accName').textContent = c.name;
  document.getElementById('accEmail').textContent = c.email;

  // Inquiries for this customer (match by email)
  const all = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');
  const mine = all.filter(i => (i.email || '').toLowerCase() === (c.email || '').toLowerCase());
  document.getElementById('accInqCount').textContent = mine.length;
  document.getElementById('accFavCount').textContent = favorites.length;

  const inqBox = document.getElementById('accPanelInq');
  if (!mine.length) {
    inqBox.innerHTML = `<div class="account-empty">📭 Все още нямате запитвания.<br><span>Разгледайте офертите и изпратете запитване — статусът ще се появи тук.</span></div>`;
  } else {
    inqBox.innerHTML = mine.map(i => {
      const st = INQUIRY_STATUS[i.status] || INQUIRY_STATUS.new;
      const d = i.created_at ? new Date(i.created_at).toLocaleDateString('bg-BG') : '';
      return `<div class="account-inq">
        <div class="account-inq-top">
          <span class="account-inq-title">${i.offer_title || 'Оферта'}</span>
          <span class="status-badge ${st.cls}">${st.label}</span>
        </div>
        <div class="account-inq-meta">
          ${i.offer_ref ? `Реф. ${i.offer_ref} · ` : ''}${d}
          ${i.preferred_date ? ` · 📅 ${i.preferred_date}` : ''}
          ${i.hotel ? ` · 🏨 ${i.hotel}` : ''}
        </div>
      </div>`;
    }).join('');
  }

  const favBox = document.getElementById('accPanelFav');
  const favOffers = favorites.map(id => ALL_OFFERS.find(o => o.id === id)).filter(Boolean);
  if (!favOffers.length) {
    favBox.innerHTML = `<div class="account-empty">🤍 Нямате запазени любими.<br><span>Натиснете сърцето ❤️ върху всяка оферта, за да я запазите тук.</span></div>`;
  } else {
    favBox.innerHTML = favOffers.map(o => {
      const img = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) || (o.image && o.image.startsWith('http') ? o.image : PLACEHOLDER_IMG);
      return `<a class="account-fav" href="oferta.html?id=${o.id}">
        <img src="${img}" alt="${o.title}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
        <div class="account-fav-body">
          <div class="account-fav-title">${o.title}</div>
          <div class="account-fav-meta">📍 ${o.destination} · от ${o.price_eur} €</div>
        </div>
        <button class="account-fav-x" title="Премахни" onclick="event.preventDefault();event.stopPropagation();removeFavFromAccount(${o.id})">✕</button>
      </a>`;
    }).join('');
  }
}
function removeFavFromAccount(id) {
  const idx = favorites.indexOf(id);
  if (idx > -1) favorites.splice(idx, 1);
  localStorage.setItem('mt_favorites', JSON.stringify(favorites));
  // sync to customer profile
  const c = getCurrentCustomer();
  if (c) {
    const customers = JSON.parse(localStorage.getItem('mt_customers') || '[]');
    const cust = customers.find(x => x.id === c.id);
    if (cust) { cust.favorites = favorites; localStorage.setItem('mt_customers', JSON.stringify(customers)); }
  }
  renderAccount();
  if (typeof renderOffers === 'function') renderOffers();
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

// Inline (live) search in the filters bar
function doInlineSearch(val) {
  currentSearch = (val || '').trim().toLowerCase();
  const clr = document.getElementById('inlineSearchClear');
  if (clr) clr.style.display = currentSearch ? '' : 'none';
  renderOffers();
}
function clearInlineSearch() {
  currentSearch = '';
  const inp = document.getElementById('inlineSearch');
  if (inp) inp.value = '';
  const clr = document.getElementById('inlineSearchClear');
  if (clr) clr.style.display = 'none';
  renderOffers();
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
  const _ids = new Set(ALL_OFFERS.map(o => o.id));
  const featured = ALL_OFFERS.filter(o => o.featured && _ids.has(o.id)).slice(0, 5);
  if (!featured.length) { grid.innerHTML = ''; return; }

  const coverOf = o => (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) ||
    (o.image && o.image.startsWith('http') ? o.image : '') || PLACEHOLDER_IMG;

  const [main, ...rest] = featured;
  let html = `
    <a class="featured-card-large" href="oferta.html?id=${main.id}">
      <img src="${coverOf(main)}" alt="${main.title}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
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
      <a class="featured-card-sm" href="oferta.html?id=${o.id}">
        <img src="${coverOf(o)}" alt="${o.title}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
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
    countries: ['greece','france','spain','italy','albania','poland','austria','bulgaria','portugal','switzerland','germany','hungary','croatia','romania','serbia','cyprus','belgium','denmark','sweden','ireland','iceland','estonia','bosnia','kosovo','montenegro','uk','czech','finland','malta'],
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
    countries: ['egypt','morocco','kenya','tanzania','mauritius','madagascar','seychelles','tunisia','ethiopia','namibia','south-africa'],
    images: {
      egypt:   'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=400&q=80',
      morocco: 'https://images.unsplash.com/photo-1548697741-cc45ab89ef66?w=400&q=80',
    }
  },
  asia: {
    label: 'Азия', icon: '🏯',
    countries: ['turkey','uae','jordan','thailand','vietnam','india','indonesia','china','japan','srilanka','armenia','georgia','maldives','azerbaijan','qatar','new-zealand'],
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
    countries: ['usa','argentina','brazil','colombia','peru','dominicana','bahamas'],
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
  renderDestinationPins();
}

// Geographic coordinates [lat, lon] per destination country
const DEST_COORDS = {
  greece:[39,22], turkey:[39,35], egypt:[26.5,30], albania:[41,20], bulgaria:[42.7,25.5],
  maldives:[3.2,73], uae:[24,54], thailand:[15,101], armenia:[40.2,44.9], georgia:[42,43.5],
  vietnam:[16,107], india:[22,79], indonesia:[-5,115], china:[35,104], srilanka:[7.5,80.7],
  japan:[36,138], kenya:[0.3,37.9], tanzania:[-6,38.5], mauritius:[-20.3,57.6],
  madagascar:[-19,47], seychelles:[-4.6,55.5], usa:[39,-98], argentina:[-34,-64],
  brazil:[-15,-48], colombia:[4.5,-73], peru:[-10,-76], dominicana:[18.7,-70.2], bahamas:[24.5,-76.5],
  spain:[40.2,-3.7], france:[47,2], italy:[42.8,12.5], morocco:[32,-6], jordan:[31,36],
  poland:[52,19], austria:[47.5,14]
};

// d3 geoEquirectangular params used for the map: scale = 1010/(2π), translate [505,255]
function geoToPercent(lat, lon) {
  const k = 1010 / (2 * Math.PI) * Math.PI / 180; // ≈ 2.8056 px per degree
  const x = 505 + lon * k;
  const y = 255 - lat * k;
  return { left: (x / 1010) * 100, top: (y / 510) * 100 };
}

function renderDestinationPins() {
  const map = document.querySelector('.world-map');
  if (!map) return;
  let layer = document.getElementById('destPins');
  if (layer) layer.remove();
  layer = document.createElement('div');
  layer.id = 'destPins';

  const FLAGS = {
    greece:'🇬🇷', turkey:'🇹🇷', egypt:'🇪🇬', spain:'🇪🇸', albania:'🇦🇱', bulgaria:'🇧🇬',
    maldives:'🇲🇻', uae:'🇦🇪', thailand:'🇹🇭', armenia:'🇦🇲', georgia:'🇬🇪', vietnam:'🇻🇳',
    india:'🇮🇳', indonesia:'🇮🇩', china:'🇨🇳', srilanka:'🇱🇰', japan:'🇯🇵', kenya:'🇰🇪',
    tanzania:'🇹🇿', mauritius:'🇲🇺', madagascar:'🇲🇬', seychelles:'🇸🇨', usa:'🇺🇸',
    argentina:'🇦🇷', brazil:'🇧🇷', colombia:'🇨🇴', peru:'🇵🇪', dominicana:'🇩🇴',
    bahamas:'🇧🇸', france:'🇫🇷', italy:'🇮🇹', morocco:'🇲🇦', jordan:'🇯🇴', poland:'🇵🇱', austria:'🇦🇹'
  };

  // One pin per country that has offers
  const seen = {};
  ALL_OFFERS.forEach(o => { seen[o.country] = (seen[o.country] || 0) + 1; });
  Object.keys(seen).forEach(key => {
    const coord = DEST_COORDS[key];
    if (!coord) return;
    const country = COUNTRIES.find(c => c.key === key);
    const name = country ? country.label : key;
    const pos = geoToPercent(coord[0], coord[1]);
    const count = seen[key];
    const pin = document.createElement('button');
    pin.className = 'dest-dot';
    pin.style.left = pos.left + '%';
    pin.style.top = pos.top + '%';
    pin.setAttribute('aria-label', name);
    pin.onclick = () => {
      filterByCountry(key);
      closeContinent();
      document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
    };
    pin.innerHTML =
      `<span class="dest-dot-core"></span>` +
      `<span class="dest-tip">${FLAGS[key] || '🌍'} ${name} · ${count}</span>`;
    layer.appendChild(pin);
  });

  map.appendChild(layer);
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
    austria:'🇦🇹', poland:'🇵🇱', thailand:'🇹🇭', vietnam:'🇻🇳', bulgaria:'🇧🇬',
    armenia:'🇦🇲', georgia:'🇬🇪', maldives:'🇲🇻', india:'🇮🇳', indonesia:'🇮🇩',
    china:'🇨🇳', japan:'🇯🇵', srilanka:'🇱🇰', kenya:'🇰🇪', tanzania:'🇹🇿',
    mauritius:'🇲🇺', madagascar:'🇲🇬', seychelles:'🇸🇨', usa:'🇺🇸',
    argentina:'🇦🇷', brazil:'🇧🇷', colombia:'🇨🇴', peru:'🇵🇪',
    dominicana:'🇩🇴', bahamas:'🇧🇸',
    portugal:'🇵🇹', switzerland:'🇨🇭', germany:'🇩🇪', hungary:'🇭🇺', croatia:'🇭🇷',
    romania:'🇷🇴', serbia:'🇷🇸', cyprus:'🇨🇾', belgium:'🇧🇪', denmark:'🇩🇰',
    sweden:'🇸🇪', ireland:'🇮🇪', iceland:'🇮🇸', estonia:'🇪🇪', bosnia:'🇧🇦',
    kosovo:'🇽🇰', montenegro:'🇲🇪', uk:'🇬🇧', czech:'🇨🇿', finland:'🇫🇮',
    malta:'🇲🇹', tunisia:'🇹🇳', ethiopia:'🇪🇹', namibia:'🇳🇦', 'south-africa':'🇿🇦',
    'new-zealand':'🇳🇿', azerbaijan:'🇦🇿', qatar:'🇶🇦'
  };
  if (!data.countries.length) {
    grid.innerHTML = `<div style="color:rgba(255,255,255,0.5);font-size:0.9rem;padding:1rem 0;grid-column:1/-1;">Оферти за тази дестинация скоро...</div>`;
  } else {
    grid.innerHTML = data.countries.map(countryId => {
      const country = COUNTRIES.find(c => c.key === countryId);
      if (!country) return '';
      const offers = ALL_OFFERS.filter(o => o.country === countryId);
      const minPrice = offers.length ? Math.min(...offers.map(o => o.price_eur)) : 0;
      const offerImg = offers.length ? ((typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[offers[0].id]) || offers[0].image || '') : '';
      const img = data.images[countryId] || offerImg || '';
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

  // Show ONLY the main campaign tags — hide the descriptive ones
  // (плаж, град, култура, природа, луксозни, семейни, приключения, all inclusive…)
  const CAMPAIGN_TAGS = ['lyato-gartsia', 'ranni-zapisvaniya', 'uikend', 'avtorski'];
  const builtInTags = (typeof TAGS !== 'undefined' ? TAGS : [])
    .filter(t => CAMPAIGN_TAGS.includes(typeof t === 'object' ? t.key : t));
  // Custom tags stored as {key, label} or as strings
  const customTags = JSON.parse(localStorage.getItem('mt_custom_tags') || '[]');
  const customNorm = customTags.map(t => typeof t === 'object' ? t : { key: t, label: t });
  const allTags = [
    ...builtInTags,
    ...customNorm.filter(ct => !builtInTags.some(bt => bt.key === ct.key) && CAMPAIGN_TAGS.includes(ct.key))
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
  if (currentCategory !== 'all') {
    if (currentCategory === 'cruise') list = list.filter(o => (o.tags || []).includes('cruise'));
    else list = list.filter(o => o.category === currentCategory);
  }
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

// Resolve a hotel's photo: real booking photo by name (HOTEL_IMAGES) → data image → placeholder
function hotelKeyVariants(name) {
  if (!name) return [];
  const out = [name];
  // strip "(...)" parentheticals and star/rating suffixes like " 4★", " 3*"
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

function renderOffers() {
  const grid = document.getElementById('offersGrid');
  const noRes = document.getElementById('noResults');
  if (!grid) return;

  renderActiveFilters();

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
      <a class="offer-card animate-in" href="oferta.html?id=${o.id}" style="animation-delay:${Math.min(i * 0.05, 0.4)}s">
        <div class="offer-card-img-wrap">
          <img class="offer-card-img" src="${imgSrc}" alt="${o.title}" loading="lazy"
               onerror="this.src='${PLACEHOLDER_IMG}'">
          <span class="offer-badge ${typeCls}">${typeLabel}</span>
          <button type="button" class="offer-fav ${isFav ? 'active' : ''}" onclick="event.preventDefault();event.stopPropagation();toggleFav(event, ${o.id})" title="Любими">${isFav ? '❤️' : '🤍'}</button>
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
            <span class="offer-btn">Детайли →</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ===== FILTER FUNCTIONS =====
function filterByCategory(cat) {
  currentCategory = cat;
  currentTag = null;
  currentCountry = null;          // categories are top-level — clear any country filter
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

// ===== ACTIVE FILTER CHIPS =====
const CATEGORY_LABELS = { exotic:'🌴 Екзотика', vacation:'🏖️ Почивки', excursion:'🗺️ Екскурзии', cruise:'🚢 Круизи' };

function clearCountryFilter() {
  currentCountry = null;
  renderOffers();
}
function clearCategoryFilter() {
  currentCategory = 'all';
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
  renderOffers();
}
function clearTagFilter() {
  currentTag = null;
  document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
  renderOffers();
}
function clearSearchFilter() {
  currentSearch = '';
  const s = document.getElementById('heroSearch');
  if (s) s.value = '';
  const inp = document.getElementById('inlineSearch');
  if (inp) inp.value = '';
  const clr = document.getElementById('inlineSearchClear');
  if (clr) clr.style.display = 'none';
  renderOffers();
}

function renderActiveFilters() {
  const box = document.getElementById('activeFilters');
  if (!box) return;
  const chips = [];

  if (currentCategory !== 'all') {
    chips.push(`<button class="filter-chip" onclick="clearCategoryFilter()">${CATEGORY_LABELS[currentCategory] || currentCategory} <span class="filter-chip-x">✕</span></button>`);
  }
  if (currentCountry) {
    const c = (typeof COUNTRIES !== 'undefined') ? COUNTRIES.find(x => x.key === currentCountry) : null;
    chips.push(`<button class="filter-chip" onclick="clearCountryFilter()">📍 ${c ? c.label : currentCountry} <span class="filter-chip-x">✕</span></button>`);
  }
  if (currentTag) {
    const t = (typeof TAGS !== 'undefined') ? TAGS.find(x => x.key === currentTag) : null;
    chips.push(`<button class="filter-chip" onclick="clearTagFilter()">🏷️ ${t ? t.label : currentTag} <span class="filter-chip-x">✕</span></button>`);
  }
  if (currentSearch) {
    chips.push(`<button class="filter-chip" onclick="clearSearchFilter()">🔍 „${currentSearch}" <span class="filter-chip-x">✕</span></button>`);
  }

  if (!chips.length) {
    box.innerHTML = '';
    box.style.display = 'none';
    return;
  }
  box.style.display = 'flex';
  box.innerHTML =
    `<span class="active-filters-label">Активни филтри:</span>` +
    chips.join('') +
    `<button class="filter-chip clear-all" onclick="resetFilters()">Изчисти всички</button>`;
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
let selectedHotelIdx = 0;

// ── Gallery ──
let galleryImages = [];
let galleryIdx = 0;

// Derive gallery URLs from the cover image by incrementing the index segment
// (e.g. ...-1_12345.jpg → ...-2_12345.jpg). Count comes from GALLERY_COUNTS.
function buildGallery(cover, id) {
  const n = (typeof GALLERY_COUNTS !== 'undefined' && GALLERY_COUNTS[id]) || 1;
  if (n <= 1) return [cover];
  const out = [];
  for (let i = 1; i <= n; i++) {
    out.push(cover.replace(/([-_])1_(\d+\.[a-z0-9]+)$/i, `$1${i}_$2`));
  }
  return out;
}

// Candidate image URLs derived from the cover (cover, -2, -3 ... up to max)
function deriveCandidates(cover, max) {
  const out = [cover];
  for (let i = 2; i <= (max || 12); i++) {
    const u = cover.replace(/([-_])1_(\d+\.[a-z0-9]+)$/i, `$1${i}_$2`);
    if (u !== cover) out.push(u);
  }
  return out;
}

// Preload derived candidates and call done() with only the ones that actually exist
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
  const thumbs = document.getElementById('modalThumbs');
  if (prev) prev.style.display = multi ? '' : 'none';
  if (next) next.style.display = multi ? '' : 'none';
  if (counter) counter.style.display = multi ? '' : 'none';
  if (thumbs) {
    thumbs.style.display = multi ? '' : 'none';
    thumbs.innerHTML = multi ? galleryImages.map((src, i) =>
      `<img class="modal-thumb ${i === 0 ? 'active' : ''}" src="${src}" alt="${alt || ''} ${i + 1}" onclick="galleryGoto(${i})" onerror="this.style.display='none'">`
    ).join('') : '';
  }
  galleryGoto(0, alt);
}

function galleryGoto(i, alt) {
  if (!galleryImages.length) return;
  galleryIdx = (i + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('modalImg');
  if (img) { img.src = galleryImages[galleryIdx]; if (alt) img.alt = alt; }
  const counter = document.getElementById('galleryCounter');
  if (counter) counter.textContent = `${galleryIdx + 1} / ${galleryImages.length}`;
  document.querySelectorAll('#modalThumbs .modal-thumb').forEach((t, idx) =>
    t.classList.toggle('active', idx === galleryIdx));
  const active = document.querySelectorAll('#modalThumbs .modal-thumb')[galleryIdx];
  if (active && active.scrollIntoView) active.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

function galleryStep(dir) { galleryGoto(galleryIdx + dir); }

// ── Lightbox (fullscreen photo viewer for hotels / gallery) ──
let lightboxImages = [];
let lightboxIdx = 0;
let lightboxCaption = '';

function openLightbox(images, startIdx, caption) {
  lightboxImages = (images && images.length) ? images : [];
  if (!lightboxImages.length) return;
  lightboxIdx = startIdx || 0;
  lightboxCaption = caption || '';
  lightboxRender();
  const lb = document.getElementById('lightbox');
  if (lb) { lb.classList.add('active'); document.body.style.overflow = 'hidden'; }
}
function lightboxRender() {
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  const multi = lightboxImages.length > 1;
  if (img) img.src = lightboxImages[lightboxIdx];
  if (cap) cap.textContent = lightboxCaption + (multi ? `  (${lightboxIdx + 1}/${lightboxImages.length})` : '');
  document.querySelectorAll('.lightbox-nav').forEach(b => b.style.display = multi ? '' : 'none');
}
function lightboxStep(dir) {
  if (!lightboxImages.length) return;
  lightboxIdx = (lightboxIdx + dir + lightboxImages.length) % lightboxImages.length;
  lightboxRender();
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('active');
  document.body.style.overflow = 'hidden'; // modal is still open underneath
}

// Open photos for a hotel: prefer the offer gallery; fall back to the hotel image
function openHotelPhotos(idx) {
  if (!activeOffer) return;
  const hotels = activeOffer.hotels || [];
  const h = hotels[idx];
  const name = h ? h.name : (activeOffer.title || '');
  const distinct = new Set(hotels.map(hotelImg)).size;
  // Hotels have their own real photos → show them, starting at this hotel
  if (distinct > 1) {
    const set = [];
    const add = u => { if (u && set.indexOf(u) === -1) set.push(u); };
    if (h) add(hotelImg(h));
    hotels.forEach(x => add(hotelImg(x)));
    openLightbox(set, 0, name);
    return;
  }
  // Otherwise fall back to the offer's discovered gallery
  if (galleryImages && galleryImages.length > 1) {
    openLightbox(galleryImages, idx % galleryImages.length, name);
    return;
  }
  openLightbox([hotelImg(h)], 0, name);
}

function openOffer(id) {
  const offer = ALL_OFFERS.find(o => o.id === id);
  if (!offer) return;
  activeOffer = offer;
  selectedDate = offer.dates[0] || null;
  selectedHotelIdx = 0;

  // Gallery setup
  const coverImg = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[offer.id]) || offer.image || PLACEHOLDER_IMG;
  if (offer.gallery && offer.gallery.length) {
    let imgs = offer.gallery.slice();
    if (imgs.indexOf(coverImg) === -1) imgs.unshift(coverImg);
    setupGallery(imgs, offer.title);
  } else {
    // Show the cover immediately, then auto-discover extra real photos
    setupGallery([coverImg], offer.title);
    const reqId = offer.id;
    buildGalleryAsync(coverImg, (imgs) => {
      if (!activeOffer || activeOffer.id !== reqId || imgs.length <= 1) return;
      setupGallery(imgs, offer.title);
      // only fill hotel cards from the gallery if hotels don't already have distinct real photos
      const distinct = new Set((activeOffer.hotels || []).map(hotelImg)).size;
      if (distinct <= 1) {
        document.querySelectorAll('#modalHotels .hotel-card-img').forEach((el, i) => {
          el.src = imgs[i % imgs.length]; el.style.display = '';
        });
      }
    });
  }

  document.getElementById('modalTitle').textContent = offer.title;

  // Price from first hotel (cheapest) or package defaults
  const hotels = offer.hotels || [];
  const priceEur = hotels.length ? hotels[0].price_eur : offer.price_eur;
  const priceBgn = hotels.length ? hotels[0].price_bgn : offer.price_bgn;
  document.getElementById('modalPrice').textContent = `от ${priceEur} €`;
  document.getElementById('modalPriceSub').textContent = `/ ${priceBgn.toFixed(2)} лв. · ${offer.duration}`;

  document.getElementById('modalDesc').textContent = offer.description;

  // Badges
  const cat2 = offer.category || '';
  const typeLabel = cat2.includes('vacation') ? 'Почивка' : cat2.includes('weekend') ? 'Уикенд' : 'Екскурзия';
  document.getElementById('modalBadges').innerHTML = `
    <span class="modal-tag blue">${typeLabel}</span>
    <span class="modal-tag">${transportLabel(offer.transport)}</span>
    ${offer.refNum ? `<span class="modal-tag" style="background:rgba(26,58,107,0.1);color:var(--primary);">🔖 ${offer.refNum}</span>` : ''}
    ${offer.featured ? '<span class="modal-tag gold">⭐ Препоръчано</span>' : ''}
  `;

  // Hotels section
  const hotelsSec = document.getElementById('modalHotelsSection');
  const hotelsEl  = document.getElementById('modalHotels');
  if (hotels.length) {
    hotelsSec.style.display = '';
    hotelsEl.innerHTML = hotels.map((h, i) => `
      <div class="hotel-card ${i === 0 ? 'selected' : ''}" id="hotelCard_${i}" onclick="selectHotel(${i})">
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
      </div>
    `).join('');
    // pre-fill inquiry hotel field
    document.getElementById('inqHotel').value = hotels[0].name;
    document.getElementById('inqHotelGroup').style.display = '';
  } else {
    hotelsSec.style.display = 'none';
    hotelsEl.innerHTML = '';
    document.getElementById('inqHotelGroup').style.display = 'none';
  }

  // Program section
  const programSec = document.getElementById('modalProgramSection');
  const programEl  = document.getElementById('modalProgram');
  if (offer.program && offer.program.length) {
    programSec.style.display = '';
    programEl.innerHTML = offer.program.map(p => `
      <div class="program-day">
        <div class="program-day-title">${p.day}</div>
        <div class="program-day-text">${p.text}</div>
      </div>
    `).join('');
  } else {
    programSec.style.display = 'none';
    programEl.innerHTML = '';
  }

  // Highlights (legacy support — element may not exist)
  const hlEl = document.getElementById('modalHighlights');
  if (hlEl) {
    hlEl.innerHTML = offer.highlights ? `
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:1.5rem;">
        ${offer.highlights.map(h => `<span style="background:rgba(26,58,107,0.07);color:var(--primary);padding:6px 12px;border-radius:100px;font-size:0.8rem;font-weight:600;">✦ ${h}</span>`).join('')}
      </div>
    ` : '';
  }

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
  // Reference number + default party size (1 adult, 0 children)
  const refEl = document.getElementById('inqRef');
  if (refEl) refEl.value = offer.refNum || ('#' + offer.id);
  const adEl = document.getElementById('inqAdults'); if (adEl) adEl.value = '1';
  const chEl = document.getElementById('inqChildren'); if (chEl) chEl.value = '0';

  document.getElementById('offerModal').classList.add('active');
  document.body.style.overflow = 'hidden';

  // Auto-fill inquiry with logged-in customer details (faster inquiry perk)
  prefillInquiryFromCustomer();

  // Track view
  trackOfferView(offer.id, offer.title, offer.destination, offer.category);
}

function prefillInquiryFromCustomer() {
  const c = getCurrentCustomer();
  if (!c) return;
  const n = document.getElementById('inqName');
  const e = document.getElementById('inqEmail');
  if (n && !n.value) n.value = c.name || '';
  if (e && !e.value) e.value = c.email || '';
}

function selectHotel(idx) {
  if (!activeOffer || !activeOffer.hotels) return;
  selectedHotelIdx = idx;
  const h = activeOffer.hotels[idx];

  // Highlight selected card
  document.querySelectorAll('.hotel-card').forEach((el, i) => {
    el.classList.toggle('selected', i === idx);
  });

  // Update price display
  document.getElementById('modalPrice').textContent = `от ${h.price_eur} €`;
  document.getElementById('modalPriceSub').textContent = `/ ${h.price_bgn.toFixed(2)} лв. · ${activeOffer.duration}`;

  // Update modal image to this hotel's image
  if (h.image) {
    document.getElementById('modalImg').src = hotelImg(h);
  }

  // Update inquiry hotel field
  document.getElementById('inqHotel').value = h.name;
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
  const adults = parseInt(document.getElementById('inqAdults').value, 10) || 1;
  const children = parseInt(document.getElementById('inqChildren').value, 10) || 0;
  const people = `${adults} възр.${children ? ' + ' + children + ' деца' : ''}`;
  const hotelName = document.getElementById('inqHotel').value.trim();
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
    offer_ref: activeOffer?.refNum || (activeOffer ? '#' + activeOffer.id : ''),
    offer_title: activeOffer?.title,
    hotel: hotelName || undefined,
    name, phone, email,
    adults, children, people,
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
