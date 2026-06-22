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
const deletedIds = [].concat(
  JSON.parse(localStorage.getItem('mt_deleted_offers') || '[]'),
  JSON.parse(localStorage.getItem('mt_deleted_offer_ids') || '[]')
);
// Custom offers OVERRIDE base offers with the same id (no double counting) — the
// total is the distinct sum of base + custom.
const _customIds = new Set(customOffers.map(o => o.id));
// Изтекли оферти (без нито една бъдеща дата) се скриват автоматично навсякъде.
function mtOfferExpired(o) {
  var ds = [];
  if (Array.isArray(o.dates)) ds = ds.concat(o.dates);
  if (o.next_date) ds.push(o.next_date);
  if (Array.isArray(o.departures)) o.departures.forEach(function (d) { if (d && d.date) ds.push(d.date); });
  var t0 = new Date(); t0.setHours(0, 0, 0, 0); t0 = t0.getTime();
  var parsed = ds.map(function (s) { var t = Date.parse(String(s).slice(0, 10)); return isNaN(t) ? null : t; }).filter(function (x) { return x != null; });
  if (!parsed.length) return false; // няма дати → не пипаме
  return parsed.every(function (t) { return t < t0; });
}
// Клиентският сайт показва САМО добавеното от админа (ръчни глобални оферти + публикувани
// PeakView, които се сливат от jivo-merge.js). Старият статичен каталог (OFFERS) не се показва.
const ALL_OFFERS = [...customOffers].filter(o => !mtOfferExpired(o));

// ===== SUPABASE CONFIG =====
// Replace with your Supabase project URL and anon key after setup
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_ANON_KEY';
let mtSb = null;

function initSupabase() {
  // Prefer the shared client created by sb-init.js (reads keys from admin Settings / localStorage)
  if (window.__mtSupabase) { mtSb = window.__mtSupabase; return true; }
  if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'YOUR_SUPABASE_URL') {
    mtSb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.__mtSupabase = mtSb;
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
        <img src="${proxify(img)}" alt="${o.title}" loading="lazy" onerror="imgFallback(this)">
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
// Don't let the browser restore the old scroll position on reload — if there is
// no explicit anchor (e.g. after adding a favourite), start at the top of the page.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', () => {
  if (!location.hash) window.scrollTo(0, 0);
});

// Render curated 5-star Google reviews. Hides the section if there are none.
function renderReviews() {
  const sec = document.getElementById('reviews');
  const grid = document.getElementById('reviewsGrid');
  if (!sec || !grid || typeof REVIEWS === 'undefined') return;
  if (!REVIEWS.length) { sec.style.display = 'none'; return; }
  sec.style.display = '';
  grid.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="review-head">
        <div class="review-avatar">${(r.name || '?').trim().charAt(0).toUpperCase()}</div>
        <div>
          <div class="review-name">${r.name || ''}</div>
          ${r.date ? `<div class="review-date">${r.date}</div>` : ''}
        </div>
        <div class="review-gicon" title="Google">G</div>
      </div>
      <div class="review-stars">★★★★★</div>
      <div class="review-text">${r.text || ''}</div>
    </div>`).join('');
  const btn = document.getElementById('reviewsGoogleBtn');
  if (btn && typeof REVIEWS_GOOGLE_URL !== 'undefined') {
    btn.href = REVIEWS_GOOGLE_URL;
    if (typeof REVIEWS_GOOGLE_RATING !== 'undefined') {
      btn.innerHTML = `<span style="color:#FBBC05;">★★★★★</span>&nbsp; Виж всички отзиви в Google (${REVIEWS_GOOGLE_RATING})`;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSupabase();
  renderReviews();
  updateStatCounter();
  renderFeatured();
  initContinentMap();
  renderFilters();
  renderOffers();
  buildCategoryMenus();
  // Apply ?cat / ?country from URL (links from inner pages' Почивки/Екскурзии)
  try {
    const _p = new URLSearchParams(location.search);
    const _cat = _p.get('cat');
    if (_cat) setTimeout(() => filterCatCountry(_cat, _p.get('country')), 60);
  } catch (e) {}
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

  // Real number of destinations (distinct countries / destinations across offers)
  const destEl = document.getElementById('stat-destinations');
  if (destEl) {
    const set = new Set();
    ALL_OFFERS.forEach(o => {
      const key = (o.country || '').trim() ||
        ((o.destination || '').split(/[,–-]/)[0].trim());
      if (key) set.add(key.toLowerCase());
    });
    const destTarget = set.size;
    let dc = 0;
    const dStep = Math.max(1, Math.ceil(destTarget / 30));
    const dTimer = setInterval(() => {
      dc = Math.min(dc + dStep, destTarget);
      destEl.textContent = dc;
      if (dc >= destTarget) clearInterval(dTimer);
    }, 40);
  }
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
      <img src="${proxify(coverOf(main))}" alt="${main.title}" loading="lazy" onerror="imgFallback(this)">
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
        <img src="${proxify(coverOf(o))}" alt="${o.title}" loading="lazy" onerror="imgFallback(this)">
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

// Континент + координати на оферта — определя се от чистата дестинация (авто-попълване).
function offerGeo(o) {
  if (typeof window.mtGeo !== 'function') {
    var coord0 = DEST_COORDS[o.country]; if (!coord0) return null;
    var cont0 = Object.keys(CONTINENT_DATA).find(k => CONTINENT_DATA[k].countries.includes(o.country));
    return cont0 ? { country: o.country, cont: cont0, lat: coord0[0], lon: coord0[1], flag: '📍' } : null;
  }
  // 1) ако офертата има изрично избрана държава (на кирилица) — тя е водеща
  var c = (o.country && window.mtGeo(o.country)) ? o.country : '';
  // 2) иначе изведи от дестинацията/заглавието
  if (!c) c = window.mtCountryFromDest(o.destination || '');
  if (!c || !window.mtGeo(c)) c = window.mtCountryFromDest(window.mtDeriveDest(o.title || ''));
  var g = window.mtGeo(c);
  return g ? { country: c, cont: g[0], lat: g[1], lon: g[2], flag: g[3] } : null;
}
// ISO код от флаг-емоджи (за флаг-картинки от flagcdn — Windows не рисува емоджи-флагове)
function flagCC(emoji) {
  if (!emoji) return '';
  var cps = Array.from(emoji).map(c => c.codePointAt(0));
  if (cps.length >= 2 && cps[0] >= 0x1F1E6 && cps[0] <= 0x1F1FF)
    return String.fromCharCode(cps[0] - 0x1F1E6 + 97) + String.fromCharCode(cps[1] - 0x1F1E6 + 97);
  return '';
}
function ccOfCountry(bgName) { var g = (typeof window.mtGeo === 'function') ? window.mtGeo(bgName) : null; return g ? flagCC(g[3]) : ''; }
function flagImg(cc, h) { h = h || 18; return cc ? `<img src="https://flagcdn.com/w40/${cc}.png" alt="" style="height:${h}px;width:auto;border-radius:2px;box-shadow:0 1px 2px rgba(0,0,0,.3);vertical-align:middle;object-fit:cover;">` : '🌍'; }
// филтрира офертите по име на държава (бг) — за картата/континентите
function filterByCountryName(name) {
  currentCountry = null; currentCategory = 'all'; currentTag = null;
  currentSearch = (name || '').toLowerCase();
  const si = document.getElementById('heroSearch'); if (si) si.value = name;
  if (typeof closeContinent === 'function') closeContinent();
  renderOffers();
  const sec = document.getElementById('offers'); if (sec) sec.scrollIntoView({ behavior: 'smooth' });
}
function initContinentMap() {
  var counts = { europe: 0, africa: 0, asia: 0, america: 0 };
  ALL_OFFERS.forEach(o => { var g = offerGeo(o); if (g && counts[g.cont] != null) counts[g.cont]++; });
  Object.keys(counts).forEach(key => {
    const el = document.getElementById(`cnt-${key}`);
    if (el) el.textContent = counts[key] > 0 ? `${counts[key]} оферти` : 'Скоро';
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
  poland:[52,19], austria:[47.5,14],
  azerbaijan:[40.4,47.9], belgium:[50.6,4.7], bosnia:[44,18], croatia:[45.1,15.5], cyprus:[35,33.2],
  czech:[49.8,15.5], denmark:[56,10], estonia:[58.7,25.5], ethiopia:[9,39.5], finland:[62,26],
  germany:[51,10.4], hungary:[47.2,19.5], iceland:[64.9,-18.5], ireland:[53.2,-8], kosovo:[42.6,21],
  malta:[35.9,14.4], montenegro:[42.7,19.3], namibia:[-22,17], 'new-zealand':[-41,174], portugal:[39.5,-8],
  qatar:[25.3,51.2], romania:[45.9,25], serbia:[44,21], 'south-africa':[-29,24], sweden:[62,15],
  switzerland:[46.8,8.2], tunisia:[34,9.5], uk:[54,-2.5]
};

// d3 geoEquirectangular params used for the map: scale = 1010/(2π), translate [505,255]
const MAP_Y0 = 0, MAP_VH = 510;
function geoToPercent(lat, lon) {
  const k = 1010 / (2 * Math.PI) * Math.PI / 180; // ≈ 2.8056 px per degree
  const x = 505 + lon * k;
  const y = 255 - lat * k;
  return { left: (x / 1010) * 100, top: ((y - MAP_Y0) / MAP_VH) * 100 };
}

function renderDestinationPins() {
  const map = document.querySelector('.world-map-inner') || document.querySelector('.world-map');
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

  // По една точка на държава с оферти — автоматично от дестинациите
  const byCountry = {};
  ALL_OFFERS.forEach(o => { const g = offerGeo(o); if (!g) return; (byCountry[g.country] = byCountry[g.country] || { n: 0, g: g }).n++; });
  Object.keys(byCountry).forEach(name => {
    const g = byCountry[name].g;
    const pos = geoToPercent(g.lat, g.lon);
    const count = byCountry[name].n;
    const pin = document.createElement('button');
    pin.className = 'dest-dot';
    pin.style.left = pos.left + '%';
    pin.style.top = pos.top + '%';
    pin.setAttribute('aria-label', name);
    pin.dataset.count = count;
    pin.onclick = () => {
      currentCountry = null; currentCategory = 'all'; currentTag = null;
      currentSearch = name.toLowerCase();
      const si = document.getElementById('searchInput'); if (si) si.value = name;
      renderOffers();
      closeContinent();
      document.getElementById('offers').scrollIntoView({ behavior: 'smooth' });
    };
    pin.innerHTML =
      `<span class="dest-dot-core"></span>` +
      `<span class="dest-tip">${flagImg(flagCC(g.flag), 16)} ${name}</span>`;
    layer.appendChild(pin);
  });

  map.appendChild(layer);
}

// Show as many destination name-bubbles as fit without overlapping (greedy by
// offer count). The rest keep their label on hover only.
function placeLabels() {
  const dots = Array.from(document.querySelectorAll('#destPins .dest-dot'));
  if (!dots.length) return;
  dots.forEach(d => d.classList.remove('labeled'));
  const hit = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  // Boxes of all destination dots — a label must not cover another dest's dot
  const dotBoxes = dots.map(d => {
    const r = d.getBoundingClientRect();
    return { el: d, box: { left: r.left - 2, right: r.right + 2, top: r.top - 2, bottom: r.bottom + 2 } };
  });
  dots.sort((a, b) => (+b.dataset.count || 0) - (+a.dataset.count || 0));
  const placed = [];
  dots.forEach(d => {
    const tip = d.querySelector('.dest-tip');
    if (!tip) return;
    const r = tip.getBoundingClientRect();
    if (!r.width) return;
    const box = { left: r.left - 4, right: r.right + 4, top: r.top - 4, bottom: r.bottom + 4 };
    if (placed.some(p => hit(box, p))) return;                       // not over another label
    if (dotBoxes.some(db => db.el !== d && hit(box, db.box))) return; // not over another dot
    d.classList.add('labeled');
    placed.push(box);
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
    const cards = data.countries.map(countryId => {
      const country = COUNTRIES.find(c => c.key === countryId);
      if (!country) return '';
      const nameLC = country.label.toLowerCase();
      // брой по същата логика като при отваряне (търсене по име) — за да съвпада
      const offers = ALL_OFFERS.filter(o => {
        const hay = ((o.title || '') + ' ' + (o.destination || '') + ' ' + (o.description || '')).toLowerCase();
        return hay.indexOf(nameLC) !== -1;
      });
      if (!offers.length) return '';  // скрий държави без оферти
      const minPrice = Math.min(...offers.map(o => o.price_eur).filter(p => p));
      const cc = ccOfCountry(country.label);
      // голяма снимка от някоя оферта (с реална снимка)
      const withImg = offers.find(o => (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) || o.image || o.cover) || offers[0];
      const img = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[withImg.id]) || withImg.image || withImg.cover || (cc ? `https://flagcdn.com/w320/${cc}.png` : '');
      return `
        <a class="country-card" href="javascript:void(0)" onclick="filterByCountryName('${country.label.replace(/'/g, "\\'")}')">
          <div class="country-card-img-wrap">
            <img class="country-card-img" src="${proxify(img)}" alt="${country.label}" loading="lazy" onerror="imgFallback(this)">
          </div>
          <div class="country-card-body">
            <div class="country-flag-name">
              <span class="country-flag">${flagImg(cc, 18)}</span>
              <span class="country-name-text">${country.label}</span>
            </div>
            <div class="country-offer-count">${offers.length} оферт${offers.length === 1 ? 'а' : 'и'}</div>
            ${minPrice && isFinite(minPrice) ? `<div class="country-price">от ${minPrice.toFixed(0)} €</div>` : ''}
          </div>
        </a>
      `;
    }).filter(Boolean);
    grid.innerHTML = cards.length ? cards.join('') : `<div style="color:rgba(255,255,255,0.5);font-size:0.9rem;padding:1rem 0;grid-column:1/-1;">Няма оферти за този континент.</div>`;
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
    const catsOf = o => (o.categories && o.categories.length ? o.categories : [o.category]);
    if (currentCategory === 'cruise') list = list.filter(o => (o.tags || []).includes('cruise') || catsOf(o).includes('cruise'));
    else list = list.filter(o => catsOf(o).includes(currentCategory));
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
  const map = { flight: '✈️ Полет', plane: '✈️ Полет', bus: '🚌 Бус', car: '🚗 Кола', ship: '🚢 Кораб', train: '🚆 Влак' };
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

  // results count
  const cntEl = document.getElementById('offersCount');
  if (cntEl) {
    const total = (typeof ALL_OFFERS !== 'undefined' ? ALL_OFFERS : OFFERS).length;
    const filtered = (currentCategory !== 'all') || currentCountry || currentTag || currentSearch;
    cntEl.innerHTML = filtered
      ? '🔎 Намерени <strong style="color:var(--primary);">' + list.length + '</strong> от ' + total + ' оферти'
      : '🔎 <strong style="color:var(--primary);">' + total + '</strong> оферти общо';
  }

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
    const imgSrc = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) || (o.image && (o.image.startsWith('http') || o.image.startsWith('data:')) ? o.image : PLACEHOLDER_IMG);
    const dateStr = formatDate(o.next_date);
    const transport = transportLabel(o.transport);
    const _href = o.pv ? `oferta-jivo.html?id=${encodeURIComponent(o.id)}` : `oferta.html?id=${o.id}`;
    const _img = o.pv ? (o.image || imgSrc) : imgSrc;
    return `
      <a class="offer-card animate-in" href="${_href}" style="animation-delay:${Math.min(i * 0.05, 0.4)}s">
        <div class="offer-card-img-wrap">
          <img class="offer-card-img" src="${o.pv ? _img : proxify(_img)}" alt="${o.title}" loading="lazy"
               onerror="imgFallback(this)">
          <span class="offer-badge ${typeCls}">${typeLabel}</span>
          ${o.pv ? '' : `<button type="button" class="offer-fav ${isFav ? 'active' : ''}" onclick="event.preventDefault();event.stopPropagation();toggleFav(event, ${o.id})" title="Любими">${isFav ? '❤️' : '🤍'}</button>`}
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

// Filter by category + destination together (used by the nav dropdowns)
function filterCatCountry(cat, country) {
  currentCategory = cat;
  currentCountry = country || null;
  currentTag = null;
  currentSearch = '';
  const hs = document.getElementById('heroSearch'); if (hs) hs.value = '';
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
  closeAllNavDD();
  if (typeof closeMobileMenuIfOpen === 'function') closeMobileMenuIfOpen();
  renderOffers();
  const off = document.getElementById('offers'); if (off) off.scrollIntoView();
}
// Филтър по категория + държава (по име на дестинация)
function filterCatCountryName(cat, name) {
  currentCategory = cat || 'all';
  currentCountry = null;
  currentTag = null;
  currentSearch = name ? name.toLowerCase() : '';
  const hs = document.getElementById('heroSearch'); if (hs) hs.value = name || '';
  document.querySelectorAll('[data-filter]').forEach(b => b.classList.toggle('active', b.dataset.filter === cat));
  document.querySelectorAll('[data-tag]').forEach(b => b.classList.remove('active'));
  closeAllNavDD();
  if (typeof closeMobileMenuIfOpen === 'function') closeMobileMenuIfOpen();
  renderOffers();
  const off = document.getElementById('offers'); if (off) off.scrollIntoView();
}
// Country → ISO code (colorful flag images via flagcdn)
const COUNTRY_ISO = {
  albania:'al', argentina:'ar', armenia:'am', austria:'at', azerbaijan:'az', bahamas:'bs',
  belgium:'be', bosnia:'ba', brazil:'br', bulgaria:'bg', china:'cn', colombia:'co',
  croatia:'hr', cyprus:'cy', czech:'cz', denmark:'dk', dominicana:'do', egypt:'eg',
  estonia:'ee', ethiopia:'et', finland:'fi', france:'fr', georgia:'ge', germany:'de',
  greece:'gr', hungary:'hu', iceland:'is', india:'in', indonesia:'id', ireland:'ie',
  italy:'it', japan:'jp', jordan:'jo', kenya:'ke', kosovo:'xk', madagascar:'mg',
  maldives:'mv', malta:'mt', mauritius:'mu', montenegro:'me', morocco:'ma', namibia:'na',
  'new-zealand':'nz', peru:'pe', poland:'pl', portugal:'pt', qatar:'qa', romania:'ro',
  serbia:'rs', seychelles:'sc', 'south-africa':'za', spain:'es', srilanka:'lk', sweden:'se',
  switzerland:'ch', tanzania:'tz', thailand:'th', tunisia:'tn', turkey:'tr', uae:'ae',
  uk:'gb', usa:'us', vietnam:'vn'
};
// Populate the Почивки / Екскурзии / Екзотика nav dropdowns with destinations
// Фиксиран списък държави за „Почивки" — групиран по континент, с цветни флаг-картинки.
// (ISO кодовете са изрични, за да се виждат флаговете, а не букви.)
const POCHIVKI_GROUPS = [
  ['ЕВРОПА', [
    ['Австрия', 'at'], ['Албания', 'al'], ['Армения', 'am'], ['България', 'bg'],
    ['Грузия', 'ge'], ['Гърция', 'gr'], ['Испания', 'es'], ['Италия', 'it'],
    ['Малта', 'mt'], ['Португалия', 'pt'], ['Турция', 'tr'], ['Финландия', 'fi'],
    ['Франция', 'fr'], ['Чехия', 'cz']
  ]],
  ['АЗИЯ', [
    ['Виетнам', 'vn'], ['Дубай-ОАЕ', 'ae'], ['Йордания', 'jo'], ['Малдиви', 'mv'],
    ['Тайланд', 'th'], ['Шри Ланка', 'lk']
  ]],
  ['АМЕРИКА', [
    ['Доминикана', 'do'], ['САЩ', 'us']
  ]],
  ['АФРИКА', [
    ['Египет', 'eg'], ['Мавриций', 'mu'], ['Мадагаскар', 'mg'], ['Мароко', 'ma'],
    ['Сейшели', 'sc'], ['Тунис', 'tn']
  ]]
];
function buildCategoryMenus() {
  [
    ['vacation', 'ddPochivki', 'почивки', '🏖️'],
    ['excursion', 'ddEkskurzii', 'екскурзии', '🗺️'],
    ['exotic', 'ddEkzotika', 'екзотика', '🏝️']
  ].forEach(([cat, id, word, icon]) => {
    const menu = document.getElementById(id);
    if (!menu) return;
    // „Почивки" → фиксиран списък държави с флагове (фрейм/филтър се добавя по-късно)
    if (cat === 'vacation') {
      let html = `<div class="nav-dd-head">${icon} Изберете дестинация</div>`;
      html += `<a class="nav-dd-all" onclick="filterCatCountryName('vacation', null)">🌍 Всички ${word}</a>`;
      POCHIVKI_GROUPS.forEach(([cont, list]) => {
        html += `<div class="nav-dd-head" style="padding-top:12px;">${cont}</div>`;
        html += `<div class="nav-dd-grid">` + list.map(([name, cc]) =>
          `<a onclick="filterCatCountryName('vacation','${name.replace(/'/g, "\\'")}')"><span class="nav-dd-name">${flagImg(cc, 16)}<span class="nav-dd-lbl">${name}</span></span></a>`).join('') + `</div>`;
      });
      menu.innerHTML = html;
      return;
    }
    // брои по реална дестинация (Бг държава), а не по англ. ключ — уеднаквено и без дубли
    const counts = {};
    ALL_OFFERS.forEach(o => {
      const cats = (o.categories && o.categories.length ? o.categories : [o.category]);
      if (cats.indexOf(cat) === -1) return;
      const g = offerGeo(o); if (!g) return;
      counts[g.country] = (counts[g.country] || 0) + 1;
    });
    const items = Object.keys(counts).map(name => ({ name: name, cc: ccOfCountry(name), n: counts[name] }))
      .sort((a, b) => a.name.localeCompare(b.name, 'bg'));
    const total = items.reduce((s, i) => s + i.n, 0);
    let html = `<div class="nav-dd-head">${icon} Изберете дестинация</div>`;
    html += `<a class="nav-dd-all" onclick="filterCatCountryName('${cat}', null)">🌍 Всички ${word}<span class="nav-dd-n">${total}</span></a>`;
    html += `<div class="nav-dd-grid">` + items.map(it =>
      `<a onclick="filterCatCountryName('${cat}','${it.name.replace(/'/g, "\\'")}')"><span class="nav-dd-name">${flagImg(it.cc, 16)}<span class="nav-dd-lbl">${it.name}</span></span><span class="nav-dd-n">${it.n}</span></a>`).join('') + `</div>`;
    menu.innerHTML = html;
  });
}
function toggleNavDD(id) {
  const m = document.getElementById(id);
  if (!m) return;
  const wasOpen = m.classList.contains('open');
  closeAllNavDD();
  if (!wasOpen) m.classList.add('open');
}
function closeAllNavDD() { document.querySelectorAll('.nav-dd-menu.open').forEach(m => m.classList.remove('open')); }
document.addEventListener('click', e => { if (!e.target.closest('.nav-dd')) closeAllNavDD(); });

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
function favOfferImg(o) {
  return (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) ||
    (o.image && String(o.image).startsWith('http') ? o.image : '') ||
    'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=200&q=60';
}
// Floating bubble listing favorites — works for guests and logged-in users
function showFavBubble() {
  let el = document.getElementById('favBubble');
  if (!el) {
    el = document.createElement('div');
    el.id = 'favBubble';
    el.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:3500;width:330px;max-width:92vw;background:#fff;border:1px solid var(--gray-200);border-radius:16px;box-shadow:0 12px 40px rgba(0,0,0,0.18);overflow:hidden;font-family:inherit;animation:fadeInUp .25s ease;';
    document.body.appendChild(el);
  }
  const all = (typeof ALL_OFFERS !== 'undefined' ? ALL_OFFERS : OFFERS);
  const favs = favorites.map(id => all.find(o => o.id === id)).filter(Boolean);
  el.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;background:var(--primary);color:#fff;">' +
      '<strong style="font-size:0.95rem;">❤️ Любими (' + favs.length + ')</strong>' +
      '<button onclick="document.getElementById(\'favBubble\').remove()" style="background:none;border:none;color:#fff;font-size:1.1rem;cursor:pointer;line-height:1;">✕</button>' +
    '</div>' +
    '<div style="max-height:300px;overflow:auto;">' +
    (favs.length ? favs.map(o =>
      '<a href="oferta.html?id=' + o.id + '" style="display:flex;gap:10px;align-items:center;padding:10px 14px;text-decoration:none;color:inherit;border-bottom:1px solid var(--gray-100);">' +
        '<img src="' + proxify(favOfferImg(o)) + '" style="width:54px;height:40px;object-fit:cover;border-radius:6px;flex-shrink:0;background:var(--gray-100);" onerror="this.style.visibility=\'hidden\'">' +
        '<div style="min-width:0;flex:1;">' +
          '<div style="font-weight:600;font-size:0.84rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + o.title + '</div>' +
          '<div style="font-size:0.74rem;color:var(--gray-400);">' + (o.destination || '') + ' · от ' + o.price_eur + ' €</div>' +
        '</div>' +
        '<span style="color:var(--gray-400);font-size:0.9rem;">›</span>' +
      '</a>').join('') :
      '<div style="padding:18px;text-align:center;color:var(--gray-400);font-size:0.85rem;">Няма любими още.</div>') +
    '</div>';
  clearTimeout(window.__favBubbleT);
  window.__favBubbleT = setTimeout(() => { const b = document.getElementById('favBubble'); if (b) b.remove(); }, 7000);
}
function toggleFav(event, id) {
  event.stopPropagation();
  const idx = favorites.indexOf(id);
  if (idx === -1) {
    favorites.push(id);
    showFavBubble();
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
          <img class="hotel-card-img" src="${proxify(hotelImg(h))}" alt="${h.name}" onerror="this.style.display='none'">
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
  if (mtSb) {
    try {
      const { error } = await mtSb.from('inquiries').insert([inquiry]);
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

// ===== CONTACT FORM SUBMIT =====
async function submitContactForm() {
  const name = document.getElementById('cfName').value.trim();
  const phone = document.getElementById('cfPhone').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const subject = document.getElementById('cfSubject').value.trim();
  const message = document.getElementById('cfMessage').value.trim();

  if (!name || !phone || !message) {
    showToast('❗ Моля попълнете име, телефон и съобщение.', 'error');
    return;
  }

  const btn = document.querySelector('#contactFormContent .form-submit');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Изпращане...'; }

  const record = {
    offer_id: null,
    offer_title: 'Контактна форма' + (subject ? ': ' + subject : ''),
    name, phone, email,
    people: '',
    preferred_date: '',
    message: message,
    status: 'new',
    created_at: new Date().toISOString()
  };

  let saved = false;
  if (mtSb) {
    try {
      const { error } = await mtSb.from('inquiries').insert([record]);
      if (!error) saved = true;
    } catch (err) { /* fallback */ }
  }
  if (!saved) {
    const local = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');
    local.unshift({ ...record, id: Date.now() });
    localStorage.setItem('mt_inquiries', JSON.stringify(local));
  }

  if (btn) { btn.disabled = false; btn.textContent = '✉️ Изпрати съобщение'; }
  document.getElementById('contactFormContent').style.display = 'none';
  document.getElementById('contactFormSuccess').style.display = 'block';
  showToast('✅ Съобщението е изпратено!', 'success');
}

// ===== ANALYTICS TRACKING =====
function trackPageView(page) {
  const views = JSON.parse(localStorage.getItem('mt_pageviews') || '[]');
  views.push({ page, ts: Date.now() });
  // Keep last 500
  if (views.length > 500) views.splice(0, views.length - 500);
  localStorage.setItem('mt_pageviews', JSON.stringify(views));

  if (mtSb) {
    mtSb.from('page_views').insert([{ page, created_at: new Date().toISOString() }]).then(() => {}, () => {});
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

  if (mtSb) {
    mtSb.from('offer_views').insert([{
      offer_id: offerId,
      offer_title: offerTitle,
      created_at: new Date().toISOString()
    }]).then(() => {}, () => {});
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
