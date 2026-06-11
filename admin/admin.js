// ===== AUTH GUARD =====
if (sessionStorage.getItem('mt_admin_auth') !== '1') {
  window.location.href = 'login.html';
}

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
document.addEventListener('DOMContentLoaded', () => {
  loadOffers();
  loadInquiries();
  populateCountryFilter();
  showPage('dashboard');
  renderCustomTags();
});

function doLogout() {
  sessionStorage.removeItem('mt_admin_auth');
  window.location.href = 'login.html';
}

// ===== PAGE ROUTER =====
function showPage(page) {
  currentPage = page;
  const titles = {
    dashboard: 'Табло',
    inquiries: 'Запитвания',
    offers: 'Оферти',
    analytics: 'Статистики',
    settings: 'Настройки'
  };
  document.getElementById('pageTitle').textContent = titles[page] || page;

  document.querySelectorAll('[id^="page-"]').forEach(el => el.style.display = 'none');
  document.getElementById(`page-${page}`).style.display = 'block';

  document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
  const navEl = document.getElementById(`nav-${page}`);
  if (navEl) navEl.classList.add('active');

  if (page === 'dashboard') renderDashboard();
  if (page === 'inquiries') renderInquiriesTable();
  if (page === 'offers') renderAdminOffers();
  if (page === 'analytics') renderAnalytics();
  if (page === 'settings') renderCustomTags();
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
  const views = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
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
      <td><strong>${inq.name}</strong></td>
      <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${shortTitle(inq.offer_title)}</td>
      <td style="white-space:nowrap;">${formatDate(inq.created_at)}</td>
      <td><span class="status-badge status-${inq.status}">${statusLabel(inq.status)}</span></td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--gray-400);">Няма запитвания</td></tr>';
}

function renderPopularList() {
  const views = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
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

  document.getElementById('inqBody').innerHTML = list.map((inq, idx) => `
    <tr style="cursor:pointer;" onclick="openInquiry(${inq.id})">
      <td style="color:var(--gray-400);font-size:0.8rem;">#${idx + 1}</td>
      <td><strong>${inq.name}</strong></td>
      <td><a href="tel:${inq.phone}" onclick="event.stopPropagation()" style="color:var(--primary);text-decoration:none;">${inq.phone}</a></td>
      <td style="color:var(--gray-600);">${inq.email || '—'}</td>
      <td style="max-width:170px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${inq.offer_ref ? `<strong style="color:var(--primary);">${inq.offer_ref}</strong> · ` : ''}${shortTitle(inq.offer_title)}</td>
      <td>${inq.preferred_date || '—'}</td>
      <td>${inq.people || '—'}</td>
      <td style="white-space:nowrap;">${formatDate(inq.created_at)}</td>
      <td><span class="status-badge status-${inq.status}">${statusLabel(inq.status)}</span></td>
      <td onclick="event.stopPropagation()">
        <select onchange="changeStatus(${inq.id}, this.value)" style="border:1.5px solid var(--gray-200);border-radius:6px;padding:4px 8px;font-size:0.78rem;font-family:inherit;cursor:pointer;background:white;">
          <option value="new" ${inq.status === 'new' ? 'selected' : ''}>Ново</option>
          <option value="contacted" ${inq.status === 'contacted' ? 'selected' : ''}>Контактувано</option>
          <option value="booked" ${inq.status === 'booked' ? 'selected' : ''}>Резервирано</option>
          <option value="closed" ${inq.status === 'closed' ? 'selected' : ''}>Затворено</option>
        </select>
      </td>
    </tr>
  `).join('');
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
      ${inq.message ? `
      <div style="grid-column:span 2;">
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Съобщение</div>
        <div style="background:var(--gray-100);border-radius:8px;padding:12px;font-size:0.88rem;color:var(--gray-600);">${inq.message}</div>
      </div>` : ''}
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
  const views = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');

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
        <td style="color:var(--gray-400);font-size:0.8rem;">${o.id}</td>
        <td style="max-width:220px;">
          <div style="font-weight:600;font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.title}</div>
          ${isCustom ? '<span style="font-size:0.7rem;color:#7c3aed;background:#f5f3ff;padding:2px 6px;border-radius:4px;">custom</span>' : ''}
        </td>
        <td><span class="modal-tag ${o.category === 'vacation' ? 'blue' : ''}">${o.category === 'vacation' ? 'Почивка' : 'Екскурзия'}</span></td>
        <td>${o.destination || '—'}</td>
        <td style="font-weight:700;color:var(--primary);white-space:nowrap;">${o.price_bgn ? o.price_bgn.toFixed(0) + ' лв.' : '—'}<div style="font-weight:600;color:var(--gray-400);font-size:0.78rem;">${o.price_eur ? o.price_eur.toFixed(0) + ' €' : ''}</div></td>
        <td>${o.duration || '—'}</td>
        <td style="white-space:nowrap;">${nextDateOf(o) || '—'}${remainingDatesBadge(o)}</td>
        <td>${views[o.id] || 0}</td>
        <td>
          <span style="background:${inqCount > 0 ? 'rgba(59,130,246,0.1)' : 'var(--gray-100)'};color:${inqCount > 0 ? '#1d4ed8' : 'var(--gray-400)'};padding:3px 10px;border-radius:100px;font-size:0.75rem;font-weight:700;">
            ${inqCount}
          </span>
        </td>
        <td style="white-space:nowrap;">
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
    document.getElementById('of_tags').value = Array.isArray(offer.tags) ? offer.tags.join(', ') : (offer.tags || '');
    document.getElementById('of_description').value = offer.description || '';
    document.getElementById('of_featured').checked = !!offer.featured;
  } else {
    titleEl.textContent = 'Добави нова оферта';
    document.getElementById('of_title').value = '';
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
    document.getElementById('of_tags').value = '';
    document.getElementById('of_description').value = '';
    document.getElementById('of_featured').checked = false;
  }

  renderOfferDates();
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

  const data = {
    id,
    title,
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
    dates: editorDates.slice().sort()
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

// ===== ANALYTICS =====
function renderAnalytics() {
  const views = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
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
  const p1 = document.getElementById('newPass').value;
  const p2 = document.getElementById('confirmPass').value;
  if (!p1 || p1.length < 6) { showToast('Паролата трябва да е поне 6 символа.', 'error'); return; }
  if (p1 !== p2) { showToast('Паролите не съвпадат.', 'error'); return; }
  localStorage.setItem('mt_admin_pass', p1);
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
  showToast('Паролата е сменена! (Supabase не е настроен — промяната е само локална)', 'success');
}

function saveSupabase() {
  const url = document.getElementById('sbUrl').value.trim();
  const key = document.getElementById('sbKey').value.trim();
  if (!url || !key) { showToast('Въведете URL и Key.', 'error'); return; }
  localStorage.setItem('mt_sb_url', url);
  localStorage.setItem('mt_sb_key', key);
  showToast('Настройките са запазени. Обновете страницата.', 'success');
}

function clearData() {
  if (!confirm('Сигурни ли сте? Ще бъдат изтрити всички локални данни.')) return;
  ['mt_inquiries','mt_offerviews','mt_pageviews','mt_favorites','mt_custom_offers','mt_deleted_offer_ids'].forEach(k => localStorage.removeItem(k));
  loadOffers();
  loadInquiries();
  showToast('Данните са изчистени.', 'success');
  if (currentPage === 'dashboard') renderDashboard();
  if (currentPage === 'inquiries') renderInquiriesTable();
  if (currentPage === 'offers') renderAdminOffers();
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
