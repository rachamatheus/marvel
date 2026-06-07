// ===== AUTH GUARD =====
if (sessionStorage.getItem('mt_admin_auth') !== '1') {
  window.location.href = 'login.html';
}

// ===== STATE =====
let currentPage = 'dashboard';
let inquiriesFilter = 'all';
let allInquiries = [];
let weekChart = null;
let statusChart = null;
let destChart = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  loadInquiries();
  populateCountryFilter();
  showPage('dashboard');
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
}

// ===== LOAD DATA =====
function loadInquiries() {
  allInquiries = JSON.parse(localStorage.getItem('mt_inquiries') || '[]');

  // Seed demo data if empty
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
  const offers = OFFERS.slice(0, 8);
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
      preferred_date: offer.dates[0] || '',
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
  document.getElementById('statOffers').textContent = OFFERS.length;
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

  // Merge with inquiry counts
  const scores = {};
  OFFERS.forEach(o => {
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

  const days = [];
  const labels = [];
  const counts = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    days.push(dateStr);
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
      <td style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${shortTitle(inq.offer_title)}</td>
      <td>${inq.preferred_date || '—'}</td>
      <td>${inq.people} бр.</td>
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
  showToast(`✅ Статус: ${statusLabel(status)}`, 'success');
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
        <div>${inq.people} бр.</div>
      </div>
      <div style="grid-column:span 2;">
        <div style="font-size:0.72rem;color:var(--gray-400);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Оферта</div>
        <div style="font-weight:600;">${inq.offer_title}</div>
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
          <option value="new" ${inq.status === 'new' ? 'selected' : ''}>🔵 Ново</option>
          <option value="contacted" ${inq.status === 'contacted' ? 'selected' : ''}>🟡 Контактувано</option>
          <option value="booked" ${inq.status === 'booked' ? 'selected' : ''}>🟢 Резервирано</option>
          <option value="closed" ${inq.status === 'closed' ? 'selected' : ''}>⚫ Затворено</option>
        </select>
      </div>
    </div>
  `;

  document.getElementById('inqDetailActions').innerHTML = `
    <a href="tel:${inq.phone}" class="contact-btn contact-btn-primary" style="font-size:0.85rem;padding:10px 18px;">📞 Обади се</a>
    ${inq.email ? `<a href="mailto:${inq.email}?subject=Marvel Tour - ${encodeURIComponent(inq.offer_title)}" class="contact-btn contact-btn-outline" style="background:var(--primary);font-size:0.85rem;padding:10px 18px;">✉️ Изпрати email</a>` : ''}
    <button onclick="deleteInquiry(${inq.id})" style="padding:10px 18px;background:#fef2f2;color:#dc2626;border:1.5px solid #fca5a5;border-radius:100px;cursor:pointer;font-family:inherit;font-weight:600;font-size:0.85rem;margin-left:auto;">🗑 Изтрий</button>
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
  showToast('🗑️ Запитването е изтрито.', 'success');
}

function exportInquiries() {
  const list = inquiriesFilter === 'all' ? allInquiries : allInquiries.filter(i => i.status === inquiriesFilter);
  const headers = ['Ime', 'Телефон', 'Email', 'Оферта', 'Дата пътуване', 'Хора', 'Съобщение', 'Изпратено', 'Статус'];
  const rows = list.map(i => [
    i.name, i.phone, i.email || '', i.offer_title, i.preferred_date || '',
    i.people, i.message || '', formatDate(i.created_at, true), statusLabel(i.status)
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `zapitvaniya_${new Date().toISOString().slice(0,10)}.csv`;
  link.click();
  showToast('⬇ Файлът е изтеглен!', 'success');
}

// ===== OFFERS TABLE =====
function populateCountryFilter() {
  const sel = document.getElementById('offerCountryFilter');
  if (!sel) return;
  const countries = [...new Set(OFFERS.map(o => o.country))];
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

  let list = OFFERS.filter(o => {
    const matchSearch = !search || o.title.toLowerCase().includes(search) || o.destination.toLowerCase().includes(search);
    const matchCountry = !country || o.country === country;
    return matchSearch && matchCountry;
  });

  document.getElementById('offersAdminBody').innerHTML = list.map(o => {
    const inqCount = allInquiries.filter(i => i.offer_id === o.id).length;
    return `
      <tr>
        <td style="color:var(--gray-400);font-size:0.8rem;">${o.id}</td>
        <td style="max-width:220px;">
          <div style="font-weight:600;font-size:0.88rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${o.title}</div>
        </td>
        <td><span class="modal-tag ${o.category === 'vacation' ? 'blue' : ''}">${o.category === 'vacation' ? '🏖 Почивка' : '🗺 Екскурзия'}</span></td>
        <td>${o.destination}</td>
        <td style="font-weight:700;color:var(--primary);">${o.price_bgn.toFixed(0)} лв.</td>
        <td>${o.duration}</td>
        <td style="white-space:nowrap;">${o.next_date}</td>
        <td>${views[o.id] || 0}</td>
        <td>
          <span style="background:${inqCount > 0 ? 'rgba(59,130,246,0.1)' : 'var(--gray-100)'};color:${inqCount > 0 ? '#1d4ed8' : 'var(--gray-400)'};padding:3px 10px;border-radius:100px;font-size:0.75rem;font-weight:700;">
            ${inqCount}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// ===== ANALYTICS =====
function renderAnalytics() {
  const views = JSON.parse(localStorage.getItem('mt_offerviews') || '{}');
  const totalViews = Object.values(views).reduce((a, b) => a + b, 0);
  const total = allInquiries.length;
  const rate = totalViews > 0 ? Math.round((total / totalViews) * 100) : 0;

  // Find top offer by views
  const topId = Object.entries(views).sort((a,b) => b[1]-a[1])[0]?.[0];
  const topOffer = topId ? OFFERS.find(o => o.id == topId) : null;

  document.getElementById('anlViews').textContent = totalViews || '—';
  document.getElementById('anlInq').textContent = total;
  document.getElementById('anlRate').textContent = rate + '%';
  document.getElementById('anlTop').textContent = topOffer ? shortTitle(topOffer.title, 12) : '—';

  renderStatusChart();
  renderDestChart();
  renderTopViewsList(views);
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
    const offer = OFFERS.find(o => o.id === inq.offer_id);
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
    const offer = OFFERS.find(o => o.id == id);
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

// ===== SETTINGS =====
function changePassword() {
  const p1 = document.getElementById('newPass').value;
  const p2 = document.getElementById('confirmPass').value;
  if (!p1 || p1.length < 6) { showToast('❗ Паролата трябва да е поне 6 символа.', 'error'); return; }
  if (p1 !== p2) { showToast('❗ Паролите не съвпадат.', 'error'); return; }
  localStorage.setItem('mt_admin_pass', p1);
  document.getElementById('newPass').value = '';
  document.getElementById('confirmPass').value = '';
  showToast('✅ Паролата е сменена! (Суpabase не е настроен — промяната е само локална)', 'success');
}

function saveSupabase() {
  const url = document.getElementById('sbUrl').value.trim();
  const key = document.getElementById('sbKey').value.trim();
  if (!url || !key) { showToast('❗ Въведете URL и Key.', 'error'); return; }
  localStorage.setItem('mt_sb_url', url);
  localStorage.setItem('mt_sb_key', key);
  showToast('✅ Настройките са запазени. Обновете страницата.', 'success');
}

function clearData() {
  if (!confirm('Сигурни ли сте? Ще бъдат изтрити всички локални данни.')) return;
  ['mt_inquiries','mt_offerviews','mt_pageviews','mt_favorites'].forEach(k => localStorage.removeItem(k));
  loadInquiries();
  showToast('🗑️ Данните са изчистени.', 'success');
  if (currentPage === 'dashboard') renderDashboard();
  if (currentPage === 'inquiries') renderInquiriesTable();
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

function showToast(msg, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// Escape key closes modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeInqModal();
  }
});
