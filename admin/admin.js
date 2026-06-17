// ===== AUTH GUARD =====
if (sessionStorage.getItem('mt_admin_auth') !== '1') {
  window.location.href = 'login.html';
}
// Роля на влезлия: 'admin' (пълни права + управление на потребители) или 'worker'.
const MT_ROLE = sessionStorage.getItem('mt_role') || 'admin';
function isAdmin() { return MT_ROLE === 'admin'; }

// ===== STATE =====
let currentPage = 'dashboard';
let inquiriesFilter = 'all';
let inquiriesPeriod = 'all';
let allInquiries = [];
let allOffers = [];
let currentEditOfferId = null;
let weekChart = null;
let statusChart = null;
let destChart = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  loadOffers();
  await syncFromSupabase();
  loadInquiries();
  populateCountryFilter();
  showPage('dashboard');
  renderCustomTags();
  // Скрий бутона „Потребители" за работници — само админ го вижда/отваря.
  if (!isAdmin()) {
    const nu = document.getElementById('nav-users');
    if (nu) nu.style.display = 'none';
  }
});

// Pull shared data (views + inquiries from all visitors) when Supabase is configured.
// Mirrors into localStorage so the existing render code works unchanged.
async function syncFromSupabase() {
  const sb = window.__mtSupabase;
  if (!sb) return;
  try {
    const { data: views } = await sb.from('offer_views')
      .select('offer_id,offer_title,created_at')
      .order('created_at', { ascending: false }).limit(5000);
    if (Array.isArray(views)) {
      localStorage.setItem('mt_offer_views', JSON.stringify(
        views.map(v => ({ offer_id: v.offer_id, offer_title: v.offer_title, created_at: v.created_at }))
      ));
    }
  } catch (e) {}
  // NOTE: inquiries contain personal data (names, phones) and are intentionally
  // NOT made publicly readable via the anon key. They remain on the device they
  // were created on, or require Supabase auth to read centrally.
}

function doLogout() {
  sessionStorage.removeItem('mt_admin_auth');
  sessionStorage.removeItem('mt_role');
  sessionStorage.removeItem('mt_user');
  window.location.href = 'login.html';
}

// ===== МОБИЛНО МЕНЮ (drawer) =====
function toggleAdminNav() {
  const sb = document.getElementById('adminSidebar');
  const bd = document.getElementById('adminNavBackdrop');
  const open = sb.classList.toggle('open');
  if (bd) bd.classList.toggle('open', open);
}
function closeAdminNav() {
  const sb = document.getElementById('adminSidebar');
  const bd = document.getElementById('adminNavBackdrop');
  if (sb) sb.classList.remove('open');
  if (bd) bd.classList.remove('open');
}

// ===== PAGE ROUTER =====
function showPage(page) {
  currentPage = page;
  const titles = {
    dashboard: 'Табло',
    inquiries: 'Запитвания',
    offers: 'Оферти',
    analytics: 'Статистики',
    settings: 'Настройки',
    users: 'Потребители',
    peakview: 'PeakView — оферти на живо',
    pvcatalog: 'PeakView каталог'
  };
  // Само админ може да отвори страницата с потребителите.
  if (page === 'users' && !isAdmin()) { page = 'dashboard'; }
  document.getElementById('pageTitle').textContent = titles[page] || page;
  closeAdminNav(); // затвори мобилното меню при избор на страница

  document.querySelectorAll('[id^="page-"]').forEach(el => el.style.display = 'none');
  document.getElementById(`page-${page}`).style.display = 'block';

  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const navEl = document.getElementById(`nav-${page}`);
  if (navEl) navEl.classList.add('active');

  if (page === 'dashboard') renderDashboard();
  if (page === 'inquiries') renderInquiriesTable();
  if (page === 'offers') renderAdminOffers();
  if (page === 'analytics') renderAnalytics();
  if (page === 'settings') {
    renderCustomTags();
    var pt = document.getElementById('pushToken');
    if (pt) pt.value = localStorage.getItem('mt_push_token') || '';
  }
  if (page === 'users') renderUsers();
  if (page === 'pvcatalog') initPvCatalog();
  if (page === 'peakview' && !window._pvInit && typeof iFrameResize === 'function') {
    window._pvInit = true;
    try { iFrameResize({ checkOrigin: false, heightCalculationMethod: 'max' }, '#pvFrame'); } catch (e) {}
  }
}

// ===== LOAD OFFERS =====
function loadOffers() {
  const customOffers = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
  const deletedIds = JSON.parse(localStorage.getItem('mt_deleted_offer_ids') || '[]');

  // Start with base OFFERS filtered by deleted
  const baseFiltered = OFFERS.filter(o => !deletedIds.includes(o.id));

  // Merge: custom offers override base by id
  const customIds = customOffers.map(o => o.id);
  const merged = baseFiltered.filter(o => !customIds.includes(o.id));
  allOffers = [...merged, ...customOffers];
}

function saveOffer(data) {
  let customOffers = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
  const idx = customOffers.findIndex(o => o.id === data.id);
  if (idx >= 0) {
    customOffers[idx] = data;
  } else {
    customOffers.push(data);
  }
  localStorage.setItem('mt_custom_offers', JSON.stringify(customOffers));
  loadOffers();
}

function deleteOffer(id) {
  // Remove from custom offers if present
  let customOffers = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
  const wasCustom = customOffers.some(o => o.id === id);
  customOffers = customOffers.filter(o => o.id !== id);
  localStorage.setItem('mt_custom_offers', JSON.stringify(customOffers));

  // If it was a base offer, mark as deleted
  if (!wasCustom) {
    const deletedIds = JSON.parse(localStorage.getItem('mt_deleted_offer_ids') || '[]');
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem('mt_deleted_offer_ids', JSON.stringify(deletedIds));
    }
  }
  loadOffers();
}

// ===== LOAD INQUIRIES =====
function loadInquiries() {
  allInquiries = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');

  if (!allInquiries.length) {
    allInquiries = generateDemoData();
    localStorage.setItem('mt_inquiries', JSON.stringify(allInquiries));
  }

  updateNewBadge();
}

function generateDemoData() {
  const names = ['Иван Петров', 'Мария Стоянова', 'Георги Николов', 'Елена Димитрова', 'Петър Костов', 'Анна Тодорова', 'Симон Андреев', 'Виктория Илиева'];
  const phones = ['+359 88 123 4567', '+359 87 765 4321', '+359 89 222 3333', '+359 88 444 5555', '+359 87 666 7777'];
  const statuses = ['new', 'new', 'new', 'contacted', 'contacted', 'booked', 'closed'];
  const offers = allOffers.slice(0, 8);
  const data = [];
  const now = Date.now();
  for (let i = 0; i < 24; i++) {
    const offer = offers[Math.floor(Math.random() * offers.length)];
    const daysAgo = Math.floor(Math.random() * 14);
    data.push({
      id: now - i * 100000,
      offer_id: offer.id,
      offer_title: offer.title,
      name: names[Math.floor(Math.random() * names.length)],
      phone: phones[Math.floor(Math.random() * phones.length)],
      email: `demo${i}@example.com`,
      people: ['1', '2', '2', '3', '4'][Math.floor(Math.random() * 5)],
      preferred_date: offer.dates ? offer.dates[0] || '' : '',
      message: i % 3 === 0 ? 'Имам специални изисквания относно храната.' : '',
      created_at: new Date(now - daysAgo * 86400000 - Math.random() * 86400000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)]
    });
  }
  return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function updateNewBadge() {
  const newCount = allInquiries.filter(i => i.status === 'new').length;
  const badge = document.getElementById('newBadge');
  if (newCount > 0) {
    badge.textContent = newCount;
    badge.style.display = 'inline-block';
  } else {
    badge.style.display = 'none';
  }
}

// ===== DASHBOARD =====
function renderDashboard() {
  const total = allInquiries.length;
  const newCount = allInquiries.filter(i => i.status === 'new').length;
  const booked = allInquiries.filter(i => i.status === 'booked').length;
  const views = getViewCounts();
  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);

  document.getElementById('statInquiries').textContent = total;
  document.getElementById('statNewInq').textContent = `${newCount} нови`;
  document.getElementById('statViews').textContent = totalViews || Math.floor(Math.random() * 80) + 40;
  document.getElementById('statOffers').textContent = allOffers.length;
  document.getElementById('statBooked').textContent = booked;

  renderRecentTable();
  renderPopularList();
  renderWeekChart();
}

function renderRecentTable() {
  const recent = allInquiries.slice(0, 6);
  document.getElementById('recentBody').innerHTML = recent.map(inq => `
    <tr style="cursor:pointer;" onclick="openInquiry(${inq.id})">
      <td data-label="Клиент"><strong>${inq.name}</strong></td>
      <td data-label="Реф. №" style="white-space:nowrap;font-weight:700;color:var(--primary);">${inq.offer_ref || '—'}</td>
      <td data-label="Оферта" style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${shortTitle(inq.offer_title)}</td>
      <td data-label="Дата" style="white-space:nowrap;">${formatDate(inq.created_at)}</td>
      <td data-label="Статус"><span class="status-badge status-${inq.status}">${statusLabel(inq.status)}</span></td>
    </tr>
  `).join('') || '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--gray-400);">Няма запитвания</td></tr>';
}

// Unified offer-view counts based on what customers actually viewed.
// Primary source: mt_offer_views (detailed event log written by the public site).
// Falls back to legacy mt_offerviews count map for ids not present in the log.
function getViewCounts() {
  const counts = {};
  try {
    const arr = JSON.parse(localStorage.getItem('mt_offer_views') || '[]');
    arr.forEach(v => {
      const id = v && v.offer_id;
      if (id !== undefined && id !== null && id !== '') counts[id] = (counts[id] || 0) + 1;
    });
  } catch (e) {}
  try {
    const map = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
    Object.keys(map).forEach(id => { if (!(id in counts)) counts[id] = parseInt(map[id]) || 0; });
  } catch (e) {}
  return counts;
}

function renderPopularList() {
  const views = getViewCounts();
  const scores = {};
  allOffers.forEach(o => {
    scores[o.id] = { title: o.title, views: views[o.id] || 0, inq: 0 };
  });
  allInquiries.forEach(i => {
    if (scores[i.offer_id]) scores[i.offer_id].inq++;
  });

  const sorted = Object.entries(scores)
    .sort((a, b) => (b[1].views + b[1].inq * 3) - (a[1].views + a[1].inq * 3))
    .slice(0, 7);

  const maxScore = sorted[0] ? sorted[0][1].views + sorted[0][1].inq * 3 : 1;

  document.getElementById('popularList').innerHTML = sorted.map(([id, d], i) => {
    const score = d.views + d.inq * 3;
    const pct = Math.round((score / maxScore) * 100);
    return `
      <div class="popular-item">
        <div class="popular-rank ${i < 3 ? 'top' : ''}">${i + 1}</div>
        <div class="popular-name">${shortTitle(d.title, 30)}</div>
        <div class="popular-bar-wrap"><div class="popular-bar" style="width:${pct}%"></div></div>
        <div class="popular-views">${d.views + d.inq}</div>
      </div>
    `;
  }).join('');
}

function renderWeekChart() {
  const ctx = document.getElementById('weekChart');
  if (!ctx) return;

  const labels = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    labels.push(d.toLocaleDateString('bg', { weekday: 'short', day: 'numeric' }));
    counts.push(allInquiries.filter(inq => inq.created_at.startsWith(dateStr)).length);
  }

  if (weekChart) weekChart.destroy();
  weekChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Запитвания',
        data: counts,
        backgroundColor: 'rgba(26,58,107,0.15)',
        borderColor: '#1a3a6b',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(0,0,0,0.04)' } },
        x: { grid: { display: false } }
      }
    }
  });
}

// ===== INQUIRIES — PERIOD FILTER =====
function filterByPeriod(period, btn) {
  inquiriesPeriod = period;
  document.querySelectorAll('#inqPeriodFilters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const rangeDiv = document.getElementById('customDateRange');
  if (period === 'custom') {
    rangeDiv.style.display = 'flex';
  } else {
    rangeDiv.style.display = 'none';
  }
  renderInquiriesTable();
}

function getInquiriesByPeriod(list) {
  if (inquiriesPeriod === 'all') return list;

  const now = new Date();
  if (inquiriesPeriod === 'week') {
    const start = new Date(now);
    start.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));
    start.setHours(0, 0, 0, 0);
    return list.filter(i => new Date(i.created_at) >= start);
  }

  if (inquiriesPeriod === 'month') {
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    return list.filter(i => new Date(i.created_at) >= start);
  }

  if (inquiriesPeriod === 'custom') {
    const fromVal = document.getElementById('dateFrom')?.value;
    const toVal = document.getElementById('dateTo')?.value;
    return list.filter(i => {
      const d = new Date(i.created_at);
      if (fromVal && d < new Date(fromVal)) return false;
      if (toVal) {
        const toEnd = new Date(toVal);
        toEnd.setHours(23, 59, 59, 999);
        if (d > toEnd) return false;
      }
      return true;
    });
  }

  return list;
}

// ===== INQUIRIES TABLE =====
function filterInquiries(status, btn) {
  inquiriesFilter = status;
  document.querySelectorAll('#inqStatusFilters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderInquiriesTable();
}

function renderInquiriesTable() {
  let list = [...allInquiries];
  if (inquiriesFilter !== 'all') list = list.filter(i => i.status === inquiriesFilter);
  list = getInquiriesByPeriod(list);

  const empty = document.getElementById('inqEmpty');
  const table = document.getElementById('inqTable');

  if (!list.length) {
    table.style.display = 'none';
    empty.style.display = 'block';
    return;
  }
  table.style.display = 'table';
  empty.style.display = 'none';

  document.getElementById('inqBody').innerHTML = list.map((inq, idx) => {
    const kids = (typeof inq.children !== 'undefined' && inq.children !== null && inq.children !== '')
      ? inq.children
      : ((/(\d+)\s*(?:деца|дете)/.exec(inq.people || '') || [])[1] || 0);
    const adu = (typeof inq.adults !== 'undefined' && inq.adults !== null && inq.adults !== '')
      ? inq.adults
      : ((/(\d+)\s*възр/.exec(inq.people || '') || [])[1] || (inq.people ? inq.people : '—'));
    return `
    <tr style="cursor:pointer;" onclick="openInquiry(${inq.id})">
      <td class="td-hide-sm" data-label="#" style="color:var(--gray-400);font-size:0.8rem;">#${idx + 1}</td>
      <td data-label="Клиент"><strong>${inq.name}</strong></td>
      <td data-label="Телефон"><a href="tel:${inq.phone}" onclick="event.stopPropagation()" style="color:var(--primary);text-decoration:none;">${inq.phone}</a></td>
      <td class="td-hide-sm" data-label="Имейл" style="color:var(--gray-600);">${inq.email || '—'}</td>
      <td data-label="Реф. №" style="white-space:nowrap;font-weight:700;color:var(--primary);">${inq.offer_ref || '—'}</td>
      <td data-label="Оферта" style="max-width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${shortTitle(inq.offer_title)}</td>
      <td class="td-hide-sm" data-label="Дата">${inq.preferred_date || '—'}</td>
      <td class="td-hide-sm" data-label="Възрастни" style="text-align:center;">${adu}</td>
      <td class="td-hide-sm" data-label="Деца" style="text-align:center;font-weight:600;${(+kids) > 0 ? 'color:var(--primary);' : 'color:var(--gray-400);'}">${kids}</td>
      <td data-label="Получено" style="white-space:nowrap;">${formatDate(inq.created_at)}</td>
      <td data-label="Статус"><span class="status-badge status-${inq.status}">${statusLabel(inq.status)}</span></td>
      <td class="td-actions" data-label="Промени" onclick="event.stopPropagation()">
        <select onchange="changeStatus(${inq.id}, this.value)" style="border:1.5px solid var(--gray-200);border-radius:6px;padding:4px 8px;font-size:0.78rem;font-family:inherit;cursor:pointer;background:white;">
          <option value="new" ${inq.status === 'new' ? 'selected' : ''}>Ново</option>
          <option value="contacted" ${inq.status === 'contacted' ? 'selected' : ''}>Контактувано</option>
          <option value="booked" ${inq.status === 'booked' ? 'selected' : ''}>Резервирано</option>
          <option value="closed" ${inq.status === 'closed' ? 'selected' : ''}>Затворено</option>
        </select>
      </td>
    </tr>
  `;
  }).join('');
}

function changeStatus(id, status) {
  const inq = allInquiries.find(i => i.id === id);
  if (!inq) return;
  inq.status = status;
  localStorage.setItem('mt_inquiries', JSON.stringify(allInquiries));
  updateNewBadge();
  showToast(`Статус: ${statusLabel(status)}`, 'success');
}

function openInquiry(id) {
  const inq = allInquiries.find(i => i.id === id);
  if (!inq) return;

  document.getElementById('inqDetailTitle').textContent = `Запитване от ${inq.name}`;

  // Split the message: pull out "Избран вариант: …" lines as separate cards
  const _selected = [], _freeLines = [];
  (inq.message || '').split('\n').forEach(l => {
    l = l.trim(); if (!l) return;
    if (l.indexOf('Избран вариант:') === 0) _selected.push(l.replace('Избран вариант:', '').trim());
    else _freeLines.push(l);
  });
  const _variantsHtml = _selected.length ? `
      <div style="grid-column:span 2;">
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Избрани варианти / екскурзии (${_selected.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${_selected.map(v => `<div style="background:#ecfdf3;border:1px solid #86efac;border-left:4px solid #16a34a;border-radius:8px;padding:9px 12px;font-size:0.86rem;color:#08351c;font-weight:600;"><span style="color:#16a34a;">✔</span> ${v}</div>`).join('')}
        </div>
      </div>` : '';
  const _freeText = _freeLines.join('\n');
  const _messageHtml = _freeText ? `
      <div style="grid-column:span 2;">
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Съобщение</div>
        <div style="background:var(--gray-100);border-radius:8px;padding:12px;font-size:0.88rem;color:var(--gray-600);white-space:pre-wrap;">${_freeText}</div>
      </div>` : '';

  document.getElementById('inqDetailContent').innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:1rem;">
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Клиент</div>
        <div style="font-weight:600;">${inq.name}</div>
      </div>
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Телефон</div>
        <a href="tel:${inq.phone}" style="color:var(--primary);font-weight:600;text-decoration:none;">${inq.phone}</a>
      </div>
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Email</div>
        <div>${inq.email || '—'}</div>
      </div>
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Пътуващи</div>
        <div>${typeof inq.adults !== 'undefined' ? `${inq.adults} възрастни${inq.children ? ' + ' + inq.children + ' деца' : ''}` : (inq.people || '—')}</div>
      </div>
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Реф. номер</div>
        <div style="font-weight:700;color:var(--primary);">${inq.offer_ref || '—'}</div>
      </div>
      <div style="grid-column:span 2;">
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Оферта</div>
        <div style="font-weight:600;">${inq.offer_ref ? inq.offer_ref + ' — ' : ''}${inq.offer_title}</div>
      </div>
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Предпочитана дата</div>
        <div>${inq.preferred_date || '—'}</div>
      </div>
      <div>
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Изпратено на</div>
        <div>${formatDate(inq.created_at, true)}</div>
      </div>
      ${_variantsHtml}
      ${_messageHtml}
      <div style="grid-column:span 2;">
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Статус</div>
        <select onchange="changeStatus(${inq.id}, this.value)" style="border:1.5px solid var(--gray-200);border-radius:8px;padding:8px 12px;font-size:0.88rem;font-family:inherit;cursor:pointer;background:white;width:100%;">
          <option value="new" ${inq.status === 'new' ? 'selected' : ''}>Ново</option>
          <option value="contacted" ${inq.status === 'contacted' ? 'selected' : ''}>Контактувано</option>
          <option value="booked" ${inq.status === 'booked' ? 'selected' : ''}>Резервирано</option>
          <option value="closed" ${inq.status === 'closed' ? 'selected' : ''}>Затворено</option>
        </select>
      </div>
    </div>
  `;

  document.getElementById('inqDetailActions').innerHTML = `
    <a href="tel:${inq.phone}" class="contact-btn contact-btn-primary" style="font-size:0.85rem;padding:10px 18px;">Обади се</a>
    ${inq.email ? `<a href="mailto:${inq.email}?subject=Marvel Tour - ${encodeURIComponent(inq.offer_title)}" class="contact-btn contact-btn-outline" style="background:var(--primary);font-size:0.85rem;padding:10px 18px;">Изпрати email</a>` : ''}
    <button onclick="deleteInquiry(${inq.id})" style="padding:10px 18px;background:#fef2f2;color:#dc2626;border:1.5px solid #fca5a5;border-radius:100px;cursor:pointer;font-family:inherit;font-weight:600;font-size:0.85rem;margin-left:auto;">Изтрий</button>
  `;

  document.getElementById('inqDetailModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeInqModal() {
  document.getElementById('inqDetailModal').classList.remove('active');
  document.body.style.overflow = '';
}

function deleteInquiry(id) {
  if (!confirm('Сигурни ли сте, че искате да изтриете това запитване?')) return;
  allInquiries = allInquiries.filter(i => i.id !== id);
  localStorage.setItem('mt_inquiries', JSON.stringify(allInquiries));
  closeInqModal();
  renderInquiriesTable();
  updateNewBadge();
  showToast('Запитването е изтрито.', 'success');
}

function exportInquiries() {
  let list = [...allInquiries];
  if (inquiriesFilter !== 'all') list = list.filter(i => i.status === inquiriesFilter);
  list = getInquiriesByPeriod(list);
  const headers = ['Ime', 'Телефон', 'Email', 'Реф. номер', 'Оферта', 'Дата пътуване', 'Възрастни', 'Деца', 'Пътуващи', 'Съобщение', 'Изпратено', 'Статус'];
  const rows = list.map(i => [
    i.name, i.phone, i.email || '', i.offer_ref || '', i.offer_title, i.preferred_date || '',
    (typeof i.adults !== 'undefined' ? i.adults : ''), (typeof i.children !== 'undefined' ? i.children : ''),
    i.people || '', i.message || '', formatDate(i.created_at, true), statusLabel(i.status)
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `zapitvaniya_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  showToast('Файлът е изтеглен!', 'success');
}

// ===== OFFERS TABLE =====
function populateCountryFilter() {
  const sel = document.getElementById('offerCountryFilter');
  if (!sel) return;
  const countries = [...new Set(allOffers.map(o => o.country))];
  countries.forEach(c => {
    const country = (typeof COUNTRIES !== 'undefined' ? COUNTRIES : []).find(x => x.id === c);
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = country ? `${country.flag} ${country.label}` : c;
    sel.appendChild(opt);
  });
}

function renderAdminOffers() {
  const search = (document.getElementById('offerSearch')?.value || '').toLowerCase();
  const country = document.getElementById('offerCountryFilter')?.value || '';
  const views = getViewCounts();

  let list = allOffers.filter(o => {
    const matchSearch = !search || o.title.toLowerCase().includes(search) || (o.destination && o.destination.toLowerCase().includes(search));
    const matchCountry = !country || o.country === country;
    return matchSearch && matchCountry;
  });

  document.getElementById('offersAdminBody').innerHTML = list.map(o => {
    const inqCount = allInquiries.filter(i => i.offer_id === o.id).length;
    const isCustom = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]').some(c => c.id === o.id);
    return `
      <tr>
        <td class="td-hide-sm" data-label="ID" style="color:var(--gray-400);font-size:0.8rem;">${o.id}</td>
        <td data-label="Номер" style="font-weight:700;color:var(--primary);font-size:0.82rem;white-space:nowrap;">${o.refNum || '—'}</td>
        <td data-label="Оферта" style="max-width:220px;">
          <div style="font-weight:600;font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.title}</div>
          ${isCustom ? '<span style="font-size:0.7rem;color:#7c3aed;background:#f5f3ff;padding:2px 6px;border-radius:4px;">custom</span>' : ''}
        </td>
        <td data-label="Категория"><span class="cat-badge ${o.category || 'other'}">${ {vacation:'🏖️ Почивка',excursion:'🗺️ Екскурзия',exotic:'🏝️ Екзотика',cruise:'🚢 Круиз'}[o.category] || o.category || '—' }</span></td>
        <td data-label="Дестинация">${o.destination || '—'}</td>
        <td data-label="Цена от" style="font-weight:700;color:var(--primary);white-space:nowrap;">${o.price_bgn ? o.price_bgn.toFixed(0) + ' лв.' : '—'}<span style="font-weight:600;color:var(--gray-400);font-size:0.78rem;"> ${o.price_eur ? o.price_eur.toFixed(0) + ' €' : ''}</span></td>
        <td class="td-hide-sm" data-label="Продълж.">${o.duration || '—'}</td>
        <td data-label="Следваща дата" style="white-space:nowrap;">${nextDateOf(o) || '—'}${remainingDatesBadge(o)}</td>
        <td class="td-hide-sm" data-label="Прегледи">${views[o.id] || 0}</td>
        <td data-label="Запитвания">
          <span style="background:${inqCount > 0 ? 'rgba(59,130,246,0.1)' : 'var(--gray-100)'};color:${inqCount > 0 ? '#1d4ed8' : 'var(--gray-400)'};padding:3px 10px;border-radius:100px;font-size:0.75rem;font-weight:700;">
            ${inqCount}
          </span>
        </td>
        <td class="td-actions" data-label="Действия" style="white-space:nowrap;">
          <button onclick="openOfferModal('${o.id}')" style="margin-right:6px;padding:5px 12px;background:var(--primary);color:white;border:none;border-radius:6px;font-size:0.78rem;cursor:pointer;font-family:inherit;font-weight:600;">Редактирай</button>
          <button onclick="confirmDeleteOffer('${o.id}')" style="padding:5px 12px;background:#fef2f2;color:#dc2626;border:1.5px solid #fca5a5;border-radius:6px;font-size:0.78rem;cursor:pointer;font-family:inherit;font-weight:600;">Изтрий</button>
        </td>
      </tr>
    `;
  }).join('');
}

function confirmDeleteOffer(id) {
  const offer = allOffers.find(o => o.id == id || o.id === id);
  if (!offer) return;
  if (!confirm(`Сигурни ли сте, че искате да изтриете офертата "${offer.title}"?`)) return;
  deleteOffer(id);
  renderAdminOffers();
  showToast('Офертата е изтрита.', 'success');
}

// ===== OFFER MODAL =====
function openOfferModal(id) {
  currentEditOfferId = id;
  const modal = document.getElementById('offerEditModal');
  const titleEl = document.getElementById('offerModalTitle');

  if (id) {
    const offer = allOffers.find(o => o.id == id || o.id === id);
    if (!offer) return;
    titleEl.textContent = 'Редактирай оферта';
    document.getElementById('of_title').value = offer.title || '';
    document.getElementById('of_refnum').value = offer.refNum || '';
    document.getElementById('of_category').value = offer.category || 'excursion';
    document.getElementById('of_destination').value = offer.destination || '';
    document.getElementById('of_country').value = offer.country || '';
    document.getElementById('of_transport').value = offer.transport || '';
    document.getElementById('of_days').value = offer.days || '';
    document.getElementById('of_nights').value = offer.nights || '';
    document.getElementById('of_price_bgn').value = offer.price_bgn || '';
    document.getElementById('of_price_eur').value = offer.price_eur || '';
    document.getElementById('of_duration').value = offer.duration || '';
    editorDates = Array.isArray(offer.dates) ? offer.dates.slice() : [];
    editorHotels = Array.isArray(offer.hotels) ? offer.hotels.map(h => ({ ...h })) : [];
    const vc = getViewCounts()[offer.id] || 0;
    const vb = document.getElementById('of_views_badge');
    if (vb) { vb.style.display = ''; vb.textContent = `👁️ ${vc} прегледа`; }
    document.getElementById('of_tags').value = Array.isArray(offer.tags) ? offer.tags.join(', ') : (offer.tags || '');
    document.getElementById('of_description').value = offer.description || '';
    document.getElementById('of_featured').checked = !!offer.featured;
  } else {
    titleEl.textContent = 'Добави нова оферта';
    document.getElementById('of_title').value = '';
    document.getElementById('of_refnum').value = '';
    document.getElementById('of_category').value = 'excursion';
    document.getElementById('of_destination').value = '';
    document.getElementById('of_country').value = '';
    document.getElementById('of_transport').value = '';
    document.getElementById('of_days').value = '';
    document.getElementById('of_nights').value = '';
    document.getElementById('of_price_bgn').value = '';
    document.getElementById('of_price_eur').value = '';
    document.getElementById('of_duration').value = '';
    editorDates = [];
    editorHotels = [];
    const vb = document.getElementById('of_views_badge');
    if (vb) vb.style.display = 'none';
    document.getElementById('of_tags').value = '';
    document.getElementById('of_description').value = '';
    document.getElementById('of_featured').checked = false;
  }

  renderOfferDates();
  renderOfferHotels();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeOfferModal() {
  document.getElementById('offerEditModal').classList.remove('active');
  document.body.style.overflow = '';
  currentEditOfferId = null;
}

function saveOfferFromModal() {
  const title = document.getElementById('of_title').value.trim();
  if (!title) { showToast('Въведете заглавие на офертата.', 'error'); return; }

  const tagsRaw = document.getElementById('of_tags').value;
  const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);

  let id = currentEditOfferId;
  if (!id) {
    // Generate new id
    id = 'custom_' + Date.now();
  }

  // Preserve any fields not present in the form (program, includes/excludes, gallery, image, etc.)
  const original = currentEditOfferId ? (allOffers.find(o => o.id == currentEditOfferId) || {}) : {};

  const data = {
    ...original,
    id,
    title,
    refNum: document.getElementById('of_refnum').value.trim(),
    category: document.getElementById('of_category').value,
    destination: document.getElementById('of_destination').value.trim(),
    country: document.getElementById('of_country').value.trim(),
    transport: document.getElementById('of_transport').value.trim(),
    days: parseInt(document.getElementById('of_days').value) || 0,
    nights: parseInt(document.getElementById('of_nights').value) || 0,
    price_bgn: parseFloat(document.getElementById('of_price_bgn').value) || 0,
    price_eur: parseFloat(document.getElementById('of_price_eur').value) || 0,
    duration: document.getElementById('of_duration').value.trim(),
    next_date: document.getElementById('of_next_date').value.trim(),
    tags,
    description: document.getElementById('of_description').value.trim(),
    featured: document.getElementById('of_featured').checked,
    dates: editorDates.slice().sort(),
    hotels: editorHotels.slice()
  };

  saveOffer(data);
  closeOfferModal();
  renderAdminOffers();
  showToast('Офертата е запазена.', 'success');
}

// ===== PRICE (BGN <-> EUR) + DATES =====
const EUR_RATE = 1.95583;
let _priceSyncing = false;
function syncPrice(src) {
  if (_priceSyncing) return;
  _priceSyncing = true;
  const bgnEl = document.getElementById('of_price_bgn');
  const eurEl = document.getElementById('of_price_eur');
  if (src === 'bgn') {
    const v = parseFloat(bgnEl.value);
    eurEl.value = (v > 0) ? (Math.round(v / EUR_RATE * 100) / 100) : '';
  } else {
    const v = parseFloat(eurEl.value);
    bgnEl.value = (v > 0) ? (Math.round(v * EUR_RATE * 100) / 100) : '';
  }
  _priceSyncing = false;
}

let editorDates = [];
function _todayISO() { return new Date().toISOString().slice(0, 10); }
function _fmtDate(d) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(d || '');
  return m ? (m[3] + '.' + m[2] + '.' + m[1]) : (d || '');
}
function upcomingDates(dates) {
  const t = _todayISO();
  return (dates || []).filter(d => /^\d{4}-\d{2}-\d{2}/.test(d) && d >= t);
}
function nextDateOf(o) {
  const up = upcomingDates(o.dates).sort();
  if (up.length) return _fmtDate(up[0]);
  if (o.dates && o.dates.length) return _fmtDate([...o.dates].sort()[0]);
  return o.next_date || '';
}
function remainingDatesBadge(o) {
  const total = (o.dates || []).length;
  if (!total) return '';
  const rem = upcomingDates(o.dates).length;
  const color = rem === 0 ? '#b91c1c' : (rem <= 2 ? '#b45309' : '#15803d');
  const bg = rem === 0 ? 'rgba(239,68,68,0.12)' : (rem <= 2 ? 'rgba(245,158,11,0.14)' : 'rgba(34,197,94,0.12)');
  return `<div style="margin-top:3px;"><span style="font-size:0.7rem;font-weight:700;color:${color};background:${bg};padding:2px 8px;border-radius:100px;">${rem} оставащи / ${total}</span></div>`;
}
function addOfferDate() {
  const el = document.getElementById('of_date_add');
  const v = el.value;
  if (!v) { showToast('Изберете дата.', 'error'); return; }
  if (editorDates.indexOf(v) === -1) { editorDates.push(v); editorDates.sort(); }
  el.value = '';
  renderOfferDates();
}
function removeOfferDate(d) {
  editorDates = editorDates.filter(x => x !== d);
  renderOfferDates();
}
function renderOfferDates() {
  const list = document.getElementById('of_dates_list');
  const rem = document.getElementById('of_dates_remaining');
  const hidden = document.getElementById('of_next_date');
  if (!list) return;
  editorDates.sort();
  const up = upcomingDates(editorDates).sort();
  list.innerHTML = editorDates.map(d => {
    const past = d < _todayISO();
    return `<span style="display:inline-flex;align-items:center;gap:6px;font-size:0.8rem;padding:4px 10px;border-radius:100px;background:${past ? 'var(--gray-100)' : 'rgba(26,58,107,0.08)'};color:${past ? 'var(--gray-400)' : 'var(--primary)'};">
      ${_fmtDate(d)}${past ? ' (минала)' : ''}
      <button type="button" onclick="removeOfferDate('${d}')" title="Премахни" style="border:none;background:none;color:#b91c1c;cursor:pointer;font-size:1rem;line-height:1;padding:0;">×</button>
    </span>`;
  }).join('') || '<span style="color:var(--gray-400);font-size:0.82rem;">Няма добавени дати</span>';
  if (rem) rem.textContent = `${up.length} оставащи дати`;
  if (hidden) hidden.value = up[0] || editorDates[0] || '';
}

// ===== HOTELS MANAGER (offer edit) =====
const OF_HOTEL_PLACEHOLDER = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&q=60';
let editorHotels = [];
function syncHotelPrice(src) {
  const b = document.getElementById('oh_bgn'), e = document.getElementById('oh_eur');
  if (src === 'bgn') { const v = parseFloat(b.value); e.value = (v > 0) ? (Math.round(v / EUR_RATE * 100) / 100) : ''; }
  else { const v = parseFloat(e.value); b.value = (v > 0) ? (Math.round(v * EUR_RATE * 100) / 100) : ''; }
}
function renderOfferHotels() {
  const list = document.getElementById('of_hotels_list');
  if (!list) return;
  list.innerHTML = editorHotels.map((h, i) => `
    <div style="display:flex;align-items:center;gap:10px;padding:8px;border:1px solid var(--gray-200);border-radius:10px;">
      <img src="${h.image || OF_HOTEL_PLACEHOLDER}" onerror="this.src='${OF_HOTEL_PLACEHOLDER}'" style="width:56px;height:42px;object-fit:cover;border-radius:6px;flex-shrink:0;background:var(--gray-100);">
      <div style="flex:1;min-width:0;">
        <div style="font-weight:600;font-size:0.85rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${h.name}</div>
        <div style="font-size:0.74rem;color:var(--gray-400);">${h.board || '—'}</div>
      </div>
      <div style="font-weight:700;color:var(--primary);font-size:0.82rem;text-align:right;white-space:nowrap;">${h.price_bgn ? h.price_bgn + ' лв.' : '—'}<div style="font-weight:600;color:var(--gray-400);">${h.price_eur ? h.price_eur + ' €' : ''}</div></div>
      <button type="button" onclick="removeOfferHotel(${i})" title="Премахни хотел" style="border:none;background:#fee2e2;color:#b91c1c;width:30px;height:30px;border-radius:8px;cursor:pointer;font-size:1.05rem;line-height:1;flex-shrink:0;">×</button>
    </div>`).join('') || '<div style="color:var(--gray-400);font-size:0.82rem;padding:4px 0;">Няма добавени хотели</div>';
}
function addOfferHotel() {
  const name = document.getElementById('oh_name').value.trim();
  if (!name) { showToast('Въведете име на хотел.', 'error'); return; }
  let bgn = parseFloat(document.getElementById('oh_bgn').value) || 0;
  let eur = parseFloat(document.getElementById('oh_eur').value) || 0;
  if (bgn && !eur) eur = Math.round(bgn / EUR_RATE * 100) / 100;
  if (eur && !bgn) bgn = Math.round(eur * EUR_RATE * 100) / 100;
  editorHotels.push({
    name,
    board: document.getElementById('oh_board').value.trim() || '—',
    price_bgn: bgn,
    price_eur: eur,
    image: document.getElementById('oh_img').value.trim()
  });
  ['oh_name', 'oh_board', 'oh_bgn', 'oh_eur', 'oh_img'].forEach(id => document.getElementById(id).value = '');
  renderOfferHotels();
  document.getElementById('oh_name').focus();
}
function removeOfferHotel(i) {
  editorHotels.splice(i, 1);
  renderOfferHotels();
}

// ===== ANALYTICS =====
function renderAnalytics() {
  const views = getViewCounts();
  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);
  const total = allInquiries.length;
  const rate = totalViews > 0 ? Math.round((total / totalViews) * 100) : 0;

  const topId = Object.entries(views).sort((a,b) => b[1]-a[1])[0]?.[0];
  const topOffer = topId ? allOffers.find(o => o.id == topId) : null;

  document.getElementById('anlViews').textContent = totalViews || '—';
  document.getElementById('anlInq').textContent = total;
  document.getElementById('anlRate').textContent = rate + '%';
  document.getElementById('anlTop').textContent = topOffer ? shortTitle(topOffer.title, 12) : '—';

  renderStatusChart();
  renderDestChart();
  renderTopViewsList(views);
  renderTopLocationsList(views);
  renderTopByCategory(views);
}

function renderStatusChart() {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;
  const statuses = ['new', 'contacted', 'booked', 'closed'];
  const labels = ['Нови', 'Контактувани', 'Резервирани', 'Затворени'];
  const data = statuses.map(s => allInquiries.filter(i => i.status === s).length);
  if (statusChart) statusChart.destroy();
  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data, backgroundColor: ['#3b82f6','#f59e0b','#10b981','#6b7280'], borderWidth: 0 }]
    },
    options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
  });
}

function renderDestChart() {
  const ctx = document.getElementById('destChart');
  if (!ctx) return;
  const destCounts = {};
  allInquiries.forEach(inq => {
    const offer = allOffers.find(o => o.id === inq.offer_id);
    if (offer) {
      destCounts[offer.destination] = (destCounts[offer.destination] || 0) + 1;
    }
  });
  const sorted = Object.entries(destCounts).sort((a,b) => b[1]-a[1]).slice(0,6);
  if (destChart) destChart.destroy();
  destChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(([d]) => d.split('—')[0].trim()),
      datasets: [{
        label: 'Запитвания',
        data: sorted.map(([,c]) => c),
        backgroundColor: 'rgba(201,168,76,0.7)',
        borderColor: '#c9a84c',
        borderWidth: 2,
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } }
    }
  });
}

function renderTopViewsList(views) {
  const sorted = Object.entries(views).sort((a,b) => b[1]-a[1]).slice(0,10);
  const max = sorted[0]?.[1] || 1;
  document.getElementById('topViewsList').innerHTML = sorted.map(([id, count], i) => {
    const offer = allOffers.find(o => o.id == id);
    const pct = Math.round((count / max) * 100);
    return `
      <div class="popular-item">
        <div class="popular-rank ${i < 3 ? 'top' : ''}">${i + 1}</div>
        <div class="popular-name">${offer ? shortTitle(offer.title, 35) : 'Неизвестна'}</div>
        <div class="popular-bar-wrap"><div class="popular-bar" style="width:${pct}%"></div></div>
        <div class="popular-views">${count} прег.</div>
      </div>
    `;
  }).join('') || '<p style="color:var(--gray-400);font-size:0.85rem;">Няма данни за прегледи</p>';
}

function renderTopLocationsList(views) {
  // Aggregate views by destination
  const destViews = {};
  allOffers.forEach(o => {
    if (views[o.id] && o.destination) {
      const dest = o.destination.split('—')[0].trim();
      destViews[dest] = (destViews[dest] || 0) + views[o.id];
    }
  });
  const sorted = Object.entries(destViews).sort((a,b) => b[1]-a[1]).slice(0,10);
  const max = sorted[0]?.[1] || 1;
  const container = document.getElementById('topLocationsList');
  if (!container) return;
  container.innerHTML = sorted.map(([dest, count], i) => {
    const pct = Math.round((count / max) * 100);
    return `
      <div class="popular-item">
        <div class="popular-rank ${i < 3 ? 'top' : ''}">${i + 1}</div>
        <div class="popular-name">${dest}</div>
        <div class="popular-bar-wrap"><div class="popular-bar" style="width:${pct}%"></div></div>
        <div class="popular-views">${count} прег.</div>
      </div>
    `;
  }).join('') || '<p style="color:var(--gray-400);font-size:0.85rem;">Няма данни за прегледи</p>';
}

function renderTopByCategory(views) {
  const excursions = allOffers.filter(o => o.category === 'excursion')
    .map(o => ({ offer: o, count: views[o.id] || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const vacations = allOffers.filter(o => o.category === 'vacation')
    .map(o => ({ offer: o, count: views[o.id] || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const excBody = document.getElementById('topExcursionsBody');
  const vacBody = document.getElementById('topVacationsBody');

  if (excBody) {
    excBody.innerHTML = excursions.map(({ offer, count }, i) => `
      <tr>
        <td style="color:var(--gray-400);font-size:0.8rem;">${i + 1}</td>
        <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.85rem;">${shortTitle(offer.title, 30)}</td>
        <td style="font-weight:700;color:var(--primary);">${count}</td>
      </tr>
    `).join('') || '<tr><td colspan="3" style="text-align:center;padding:1.5rem;color:var(--gray-400);">Няма данни</td></tr>';
  }

  if (vacBody) {
    vacBody.innerHTML = vacations.map(({ offer, count }, i) => `
      <tr>
        <td style="color:var(--gray-400);font-size:0.8rem;">${i + 1}</td>
        <td style="max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:0.85rem;">${shortTitle(offer.title, 30)}</td>
        <td style="font-weight:700;color:var(--primary);">${count}</td>
      </tr>
    `).join('') || '<tr><td colspan="3" style="text-align:center;padding:1.5rem;color:var(--gray-400);">Няма данни</td></tr>';
  }
}

// ===== SETTINGS =====
function changePassword() {
  if (!isAdmin()) { showToast('Само администраторът може да сменя паролата.', 'error'); return; }
  const p1 = document.getElementById('newPass').value;
  const p2 = document.getElementById('confirmPass').value;
  if (!p1 || p1.length < 6) { showToast('Паролата трябва да е поне 6 символа.', 'error'); return; }
  if (p1 !== p2) { showToast('Паролите не съвпадат.', 'error'); return; }
  localStorage.setItem('mt_admin_pass', p1);
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
  showToast('Паролата е сменена! (Supabase не е настроен — промяната е само локална)', 'success');
}

// ===== PUSH ИЗВЕСТИЯ =====
// Попълни адреса на push Worker-а след деплой (същия като в pwa.js/sw.js):
var PUSH_ENDPOINT = 'https://marveltour-push.marveltour.workers.dev';   // напр. 'https://marveltour-push.ТВОЙ.workers.dev'

function sendPush() {
  var token = (document.getElementById('pushToken').value || '').trim();
  var title = (document.getElementById('pushTitle').value || '').trim();
  var body = (document.getElementById('pushBody').value || '').trim();
  var url = (document.getElementById('pushUrl').value || '').trim();
  var out = document.getElementById('pushResult');
  if (!PUSH_ENDPOINT) { out.style.color = '#dc2626'; out.textContent = 'Липсва адрес на push Worker-а (PUSH_ENDPOINT в admin.js).'; return; }
  if (!token) { out.style.color = '#dc2626'; out.textContent = 'Въведете тайния код (ADMIN_TOKEN).'; return; }
  localStorage.setItem('mt_push_token', token); // запази кода веднага (важи и за каталога)
  if (!title && !body) { out.style.color = '#dc2626'; out.textContent = 'Кодът е запазен. За известие въведете заглавие или текст.'; return; }
  out.style.color = 'var(--gray-600)'; out.textContent = 'Изпращане…';
  fetch(PUSH_ENDPOINT + '/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
    body: JSON.stringify({ title: title, body: body, url: url })
  }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
    .then(function (res) {
      if (res.ok && res.d.ok) {
        out.style.color = '#16a34a';
        out.textContent = '✅ Изпратено до ' + res.d.sent + ' устройства' + (res.d.removed ? ' (' + res.d.removed + ' неактивни премахнати)' : '') + '.';
        document.getElementById('pushTitle').value = '';
        document.getElementById('pushBody').value = '';
        document.getElementById('pushUrl').value = '';
      } else {
        out.style.color = '#dc2626';
        out.textContent = '❌ Грешка: ' + (res.d.error || 'неуспешно изпращане') + (res.d.status ? ' (' + res.d.status + ')' : '');
      }
    }).catch(function () { out.style.color = '#dc2626'; out.textContent = '❌ Няма връзка с push Worker-а.'; });
}

// ===== PEAKVIEW КАТАЛОГ (избор кои оферти да се публикуват) =====
var PV_OFFERS = (typeof window !== 'undefined' && window.PEAKVIEW_OFFERS) ? window.PEAKVIEW_OFFERS : [];
var pvSel = null;      // Set с публикуваните id-та
var pvPrice = {};      // override цени {id: bgn}
var pvLoaded = false;

function initPvCatalog() {
  if (pvLoaded) { renderPvCatalog(); return; }
  pvSel = new Set();
  var list = document.getElementById('pvCatalogList');
  list.innerHTML = '<p style="color:var(--gray-400);">Зареждане…</p>';
  if (!PUSH_ENDPOINT) { list.innerHTML = '<p style="color:#dc2626;">Липсва PUSH_ENDPOINT в admin.js.</p>'; return; }
  fetch(PUSH_ENDPOINT + '/catalog').then(function (r) { return r.json(); }).then(function (d) {
    (d.ids || []).forEach(function (id) { pvSel.add(String(id)); });
    pvPrice = d.prices || {};
  }).catch(function () {}).finally(function () {
    pvLoaded = true;
    // фирми във филтъра
    var sel = document.getElementById('pvCompFilter'); var seen = {};
    PV_OFFERS.forEach(function (o) { if (o.company && !seen[o.company]) { seen[o.company] = 1; var op = document.createElement('option'); op.value = o.company; op.textContent = o.company; sel.appendChild(op); } });
    renderPvCatalog();
  });
}

function renderPvCatalog() {
  var q = (document.getElementById('pvSearch').value || '').toLowerCase().trim();
  var cat = document.getElementById('pvCatFilter').value;
  var comp = document.getElementById('pvCompFilter').value;
  var list = PV_OFFERS.filter(function (o) {
    if (cat && o.cat !== cat) return false;
    if (comp && o.company !== comp) return false;
    if (q && (o.title + ' ' + o.dest).toLowerCase().indexOf(q) === -1) return false;
    return true;
  });
  document.getElementById('pvCount').textContent = 'Избрани: ' + pvSel.size + ' / ' + PV_OFFERS.length + ' (показани ' + list.length + ')';
  var html = list.map(function (o) {
    var checked = pvSel.has(o.id) ? 'checked' : '';
    var price = (pvPrice[o.id] != null && pvPrice[o.id] !== '') ? pvPrice[o.id] : (o.bgn || '');
    var img = o.cover;
    return '<div style="display:flex;align-items:center;gap:12px;padding:10px;border:1px solid var(--gray-200,#e5e7eb);border-radius:10px;margin-bottom:8px;background:' + (checked ? '#f0fdf4' : '#fff') + ';">' +
      '<input type="checkbox" ' + checked + ' onchange="pvToggle(\'' + o.id + '\',this.checked)" style="width:20px;height:20px;flex:0 0 auto;cursor:pointer;">' +
      '<img src="' + img + '" style="width:56px;height:42px;object-fit:cover;border-radius:6px;flex:0 0 auto;" loading="lazy">' +
      '<div style="min-width:0;flex:1;">' +
        '<div style="font-weight:600;font-size:0.86rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + escapeHtml(o.title) + '</div>' +
        '<div style="font-size:0.76rem;color:var(--gray-500);">' + o.catlbl + ' · ' + escapeHtml(o.company) + (o.dates ? ' · ' + o.dates : '') + '</div>' +
      '</div>' +
      '<div style="flex:0 0 auto;display:flex;align-items:center;gap:4px;">' +
        '<input type="number" value="' + price + '" onchange="pvSetPrice(\'' + o.id + '\',this.value)" style="width:80px;padding:6px;border:1px solid var(--gray-200);border-radius:6px;font-size:0.82rem;"> лв.' +
      '</div>' +
      '</div>';
  }).join('');
  document.getElementById('pvCatalogList').innerHTML = html || '<p style="color:var(--gray-400);">Няма оферти по филтъра.</p>';
}

function pvToggle(id, on) {
  if (on) pvSel.add(id); else pvSel.delete(id);
  document.getElementById('pvCount').textContent = 'Избрани: ' + pvSel.size + ' / ' + PV_OFFERS.length;
  renderPvCatalog();
}
function pvSetPrice(id, val) { pvPrice[id] = val; }

function savePvCatalog() {
  var token = localStorage.getItem('mt_push_token') || '';
  var out = document.getElementById('pvSaveResult');
  if (!token) { out.style.color = '#dc2626'; out.textContent = 'Първо въведи тайния код в Настройки → Изпрати известие (ADMIN_TOKEN).'; return; }
  var prices = {};
  pvSel.forEach(function (id) { if (pvPrice[id] != null && pvPrice[id] !== '') prices[id] = pvPrice[id]; });
  out.style.color = 'var(--gray-600)'; out.textContent = 'Запазване…';
  fetch(PUSH_ENDPOINT + '/catalog', {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
    body: JSON.stringify({ ids: Array.from(pvSel), prices: prices })
  }).then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
    .then(function (res) {
      if (res.ok && res.d.ok) { out.style.color = '#16a34a'; out.textContent = '✅ Публикувани ' + res.d.count + ' оферти. Виж ги на /oferti.html'; }
      else { out.style.color = '#dc2626'; out.textContent = '❌ Грешка: ' + (res.d.error || 'неуспешно'); }
    }).catch(function () { out.style.color = '#dc2626'; out.textContent = '❌ Няма връзка с Worker-а.'; });
}

// ===== ПОТРЕБИТЕЛИ / РАБОТНИЦИ (само админ) =====
function getUsers() {
  try { return JSON.parse(localStorage.getItem('mt_users') || '[]'); } catch (e) { return []; }
}
function saveUsers(list) {
  localStorage.setItem('mt_users', JSON.stringify(list));
}

function renderUsers() {
  const wrap = document.getElementById('usersList');
  if (!wrap) return;
  const users = getUsers();
  if (users.length === 0) {
    wrap.innerHTML = '<p style="font-size:0.85rem;color:var(--gray-400);">Все още няма добавени работници.</p>';
    return;
  }
  wrap.innerHTML = users.map(function (u, i) {
    return '<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;padding:10px 14px;background:var(--gray-50,#f9fafb);border:1px solid var(--gray-200,#e5e7eb);border-radius:10px;margin-bottom:8px;flex-wrap:wrap;">' +
      '<div style="min-width:0;">' +
        '<strong>' + escapeHtml(u.u) + '</strong>' +
        '<span style="color:var(--gray-400);font-size:0.8rem;margin-left:8px;">работник</span>' +
        '<div style="font-size:0.8rem;color:var(--gray-500);margin-top:2px;">Парола: <code>' + escapeHtml(u.p) + '</code></div>' +
      '</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button onclick="editUserPass(' + i + ')" style="background:#eff6ff;color:var(--primary);border:1px solid #bfdbfe;border-radius:8px;padding:5px 12px;font-size:0.8rem;cursor:pointer;font-family:inherit;font-weight:600;">Смени парола</button>' +
        '<button onclick="removeUser(' + i + ')" style="background:#fef2f2;color:#dc2626;border:1px solid #fca5a5;border-radius:8px;padding:5px 12px;font-size:0.8rem;cursor:pointer;font-family:inherit;font-weight:600;">Премахни</button>' +
      '</div>' +
      '</div>';
  }).join('');
}

function editUserPass(index) {
  if (!isAdmin()) return;
  const users = getUsers();
  if (index < 0 || index >= users.length) return;
  const np = prompt('Нова парола за „' + users[index].u + '" (мин. 4 символа):', users[index].p);
  if (np === null) return; // отказ
  const pass = np.trim();
  if (pass.length < 4) { showToast('Паролата трябва да е поне 4 символа.', 'error'); return; }
  users[index].p = pass;
  saveUsers(users);
  renderUsers();
  showToast('Паролата на „' + users[index].u + '" е сменена.', 'success');
}

function addUser() {
  if (!isAdmin()) return;
  const name = (document.getElementById('newUserName').value || '').trim();
  const pass = (document.getElementById('newUserPass').value || '').trim();
  if (!name || name.toLowerCase() === 'admin') { showToast('Въведете валидно потребителско име (различно от admin).', 'error'); return; }
  if (pass.length < 4) { showToast('Паролата трябва да е поне 4 символа.', 'error'); return; }
  const users = getUsers();
  if (users.some(function (u) { return u.u.toLowerCase() === name.toLowerCase(); })) {
    showToast('Вече има работник с това име.', 'error'); return;
  }
  users.push({ u: name, p: pass });
  saveUsers(users);
  document.getElementById('newUserName').value = '';
  document.getElementById('newUserPass').value = '';
  renderUsers();
  showToast('Работникът е добавен.', 'success');
}

function removeUser(index) {
  if (!isAdmin()) return;
  const users = getUsers();
  if (index < 0 || index >= users.length) return;
  if (!confirm('Премахване на работник „' + users[index].u + '"?')) return;
  users.splice(index, 1);
  saveUsers(users);
  renderUsers();
  showToast('Работникът е премахнат.', 'success');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

// ===== CUSTOM TAGS =====
function renderCustomTags() {
  const container = document.getElementById('customTagsContainer');
  if (!container) return;
  const tags = JSON.parse(localStorage.getItem('mt_custom_tags') || '[]');
  if (!tags.length) {
    container.innerHTML = '<span style="font-size:0.82rem;color:var(--gray-400);">Няма добавени тагове.</span>';
    return;
  }
  container.innerHTML = tags.map((tag, idx) => `
    <div style="display:inline-flex;align-items:center;gap:6px;background:#f0f4ff;color:#1a3a6b;border:1.5px solid #c7d7f5;border-radius:100px;padding:5px 12px;font-size:0.82rem;font-weight:600;">
      ${escHtml(tag)}
      <button onclick="removeCustomTag(${idx})" style="background:none;border:none;cursor:pointer;color:#6b7280;font-size:1rem;line-height:1;padding:0;margin:0;" title="Изтрий">&times;</button>
    </div>
  `).join('');
}

function addCustomTag() {
  const input = document.getElementById('newTagInput');
  const val = input.value.trim();
  if (!val) { showToast('Въведете таг.', 'error'); return; }
  const tags = JSON.parse(localStorage.getItem('mt_custom_tags') || '[]');
  if (tags.includes(val)) { showToast('Този таг вече съществува.', 'error'); return; }
  tags.push(val);
  localStorage.setItem('mt_custom_tags', JSON.stringify(tags));
  input.value = '';
  renderCustomTags();
  showToast('Тагът е добавен.', 'success');
}

function removeCustomTag(idx) {
  const tags = JSON.parse(localStorage.getItem('mt_custom_tags') || '[]');
  tags.splice(idx, 1);
  localStorage.setItem('mt_custom_tags', JSON.stringify(tags));
  renderCustomTags();
  showToast('Тагът е премахнат.', 'success');
}

// ===== HELPERS =====
function shortTitle(title, max = 24) {
  if (!title) return '—';
  return title.length > max ? title.slice(0, max) + '…' : title;
}

function formatDate(iso, long = false) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (long) return d.toLocaleString('bg', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString('bg', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function statusLabel(status) {
  return { new: 'Ново', contacted: 'Контактувано', booked: 'Резервирано', closed: 'Затворено' }[status] || status;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeInqModal();
    closeOfferModal();
  }
});
