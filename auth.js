// Portable customer-auth module — works on every page (login button + logged-in
// state + account panel). Self-contained: injects its own modals and nav button,
// degrades gracefully when offer data isn't loaded on the page.
(function () {
  if (window.__mtAuthInit) return;
  window.__mtAuthInit = true;

  function toast(msg, type) {
    if (typeof window.showToast === 'function') { try { window.showToast(msg, type); return; } catch (e) {} }
    var c = document.getElementById('mtAuthToast');
    if (!c) { c = document.createElement('div'); c.id = 'mtAuthToast'; c.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:5000;display:flex;flex-direction:column;gap:10px;'; document.body.appendChild(c); }
    var t = document.createElement('div'); t.textContent = msg;
    t.style.cssText = 'background:' + (type === 'error' ? '#dc2626' : '#16a34a') + ';color:#fff;padding:12px 18px;border-radius:10px;font-weight:600;box-shadow:0 6px 20px rgba(0,0,0,0.18);';
    c.appendChild(t); setTimeout(function () { t.remove(); }, 3500);
  }
  function getFavs() { try { return JSON.parse(localStorage.getItem('mt_favorites') || '[]'); } catch (e) { return []; } }
  function getCustomers() { try { return JSON.parse(localStorage.getItem('mt_customers') || '[]'); } catch (e) { return []; } }
  function getCurrentCustomer() { try { return JSON.parse(sessionStorage.getItem('mt_customer_session') || 'null'); } catch (e) { return null; } }

  function registerCustomer(name, email, password) {
    var customers = getCustomers();
    if (customers.find(function (c) { return c.email === email; })) return { success: false, error: 'Имейлът вече е регистриран.' };
    var customer = { id: Date.now(), name: name, email: email, password: btoa(password), created_at: new Date().toISOString(), favorites: [] };
    customers.push(customer); localStorage.setItem('mt_customers', JSON.stringify(customers));
    return { success: true, customer: customer };
  }
  function loginCustomer(email, password) {
    var customer = getCustomers().find(function (c) { return c.email === email && c.password === btoa(password); });
    if (!customer) return { success: false, error: 'Грешен имейл или парола.' };
    sessionStorage.setItem('mt_customer_session', JSON.stringify({ id: customer.id, name: customer.name, email: customer.email }));
    if (customer.favorites) localStorage.setItem('mt_favorites', JSON.stringify(customer.favorites));
    return { success: true, customer: customer };
  }
  function logoutCustomer() {
    sessionStorage.removeItem('mt_customer_session');
    updateNavbarAuth();
    if (typeof window.renderOffers === 'function') try { window.renderOffers(); } catch (e) {}
    toast('Излязохте от профила си.', 'success');
  }

  function updateNavbarAuth() {
    var customer = getCurrentCustomer();
    var initial = customer ? (customer.name || '?').trim().charAt(0).toUpperCase() : '';
    var btn = document.getElementById('customerAuthBtn');
    if (btn) {
      if (customer) {
        btn.innerHTML = '<span class="nav-avatar">' + initial + '</span><span>' + customer.name.split(' ')[0] + '</span>';
        btn.onclick = openAccountPanel; btn.title = 'Моят профил'; btn.classList.add('logged-in');
      } else {
        btn.textContent = '👤 Вход / Регистрация'; btn.onclick = function () { openAuthModal(); }; btn.classList.remove('logged-in');
      }
    }
    var mobileBtn = document.getElementById('mobileAuthBtn');
    if (mobileBtn) {
      if (customer) {
        mobileBtn.textContent = '👤 ' + customer.name + ' — Моят профил'; mobileBtn.classList.add('logged-in');
        mobileBtn.onclick = function () { if (typeof window.toggleMobileMenu === 'function') window.toggleMobileMenu(); openAccountPanel(); };
      } else {
        mobileBtn.textContent = '👤 Вход / Регистрация'; mobileBtn.classList.remove('logged-in');
        mobileBtn.onclick = function () { if (typeof window.toggleMobileMenu === 'function') window.toggleMobileMenu(); openAuthModal(); };
      }
    }
  }

  var INQUIRY_STATUS = { new: { label: 'Получено', cls: 'st-new' }, processing: { label: 'В обработка', cls: 'st-proc' }, in_progress: { label: 'В обработка', cls: 'st-proc' }, confirmed: { label: 'Потвърдено', cls: 'st-ok' }, done: { label: 'Приключено', cls: 'st-done' }, completed: { label: 'Приключено', cls: 'st-done' }, cancelled: { label: 'Отказано', cls: 'st-cancel' } };

  function openAuthModal(tab) {
    var le = document.getElementById('loginError'); var re = document.getElementById('regError');
    if (le) { le.textContent = ''; le.style.display = 'none'; }
    if (re) { re.textContent = ''; re.style.display = 'none'; }
    switchAuthTab(tab || 'login');
    document.getElementById('authModal').classList.add('active'); document.body.style.overflow = 'hidden';
  }
  function closeAuthModal() { document.getElementById('authModal').classList.remove('active'); document.body.style.overflow = ''; }
  function switchAuthTab(tab) {
    var isLogin = tab === 'login';
    document.getElementById('authFormLogin').style.display = isLogin ? 'block' : 'none';
    document.getElementById('authFormRegister').style.display = isLogin ? 'none' : 'block';
    document.getElementById('authTabLogin').classList.toggle('active', isLogin);
    document.getElementById('authTabRegister').classList.toggle('active', !isLogin);
  }
  function handleLogin() {
    var email = document.getElementById('loginEmail').value.trim(); var password = document.getElementById('loginPassword').value;
    var errEl = document.getElementById('loginError'); var r = loginCustomer(email, password);
    if (!r.success) { errEl.textContent = r.error; errEl.style.display = 'block'; return; }
    errEl.style.display = 'none'; closeAuthModal(); updateNavbarAuth();
    if (typeof window.renderOffers === 'function') try { window.renderOffers(); } catch (e) {}
    toast('Добре дошли, ' + r.customer.name + '!', 'success');
  }
  function handleRegister() {
    var name = document.getElementById('regName').value.trim(); var email = document.getElementById('regEmail').value.trim();
    var password = document.getElementById('regPassword').value; var confirm = document.getElementById('regPasswordConfirm').value;
    var errEl = document.getElementById('regError');
    if (!name || !email || !password) { errEl.textContent = 'Моля попълнете всички полета.'; errEl.style.display = 'block'; return; }
    if (password !== confirm) { errEl.textContent = 'Паролите не съвпадат.'; errEl.style.display = 'block'; return; }
    var r = registerCustomer(name, email, password);
    if (!r.success) { errEl.textContent = r.error; errEl.style.display = 'block'; return; }
    loginCustomer(email, password); errEl.style.display = 'none'; closeAuthModal(); updateNavbarAuth();
    if (typeof window.renderOffers === 'function') try { window.renderOffers(); } catch (e) {}
    toast('Регистрацията е успешна! Добре дошли, ' + name + '!', 'success');
  }

  function openAccountPanel() {
    if (!getCurrentCustomer()) { openAuthModal(); return; }
    renderAccount(); switchAccountTab('inq');
    document.getElementById('accountModal').classList.add('active'); document.body.style.overflow = 'hidden';
  }
  function closeAccountModal() { document.getElementById('accountModal').classList.remove('active'); document.body.style.overflow = ''; }
  function switchAccountTab(tab) {
    var inq = tab === 'inq';
    document.getElementById('accPanelInq').style.display = inq ? '' : 'none';
    document.getElementById('accPanelFav').style.display = inq ? 'none' : '';
    document.getElementById('accTabInq').classList.toggle('active', inq);
    document.getElementById('accTabFav').classList.toggle('active', !inq);
  }
  function offersData() { return (typeof OFFERS !== 'undefined' && OFFERS) || (typeof ALL_OFFERS !== 'undefined' && ALL_OFFERS) || null; }
  function imgFor(o) {
    var u = (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) || (o.image && o.image.indexOf('http') === 0 ? o.image : '') || '';
    return (typeof proxify === 'function') ? proxify(u) : u;
  }
  function renderAccount() {
    var c = getCurrentCustomer(); if (!c) return;
    document.getElementById('accAvatar').textContent = (c.name || '?').trim().charAt(0).toUpperCase();
    document.getElementById('accName').textContent = c.name; document.getElementById('accEmail').textContent = c.email;
    var all = []; try { all = JSON.parse(localStorage.getItem('mt_inquiries') || '[]'); } catch (e) {}
    var mine = all.filter(function (i) { return (i.email || '').toLowerCase() === (c.email || '').toLowerCase(); });
    var favs = getFavs();
    document.getElementById('accInqCount').textContent = mine.length;
    document.getElementById('accFavCount').textContent = favs.length;
    var inqBox = document.getElementById('accPanelInq');
    inqBox.innerHTML = !mine.length
      ? '<div class="account-empty">📭 Все още нямате запитвания.<br><span>Разгледайте офертите и изпратете запитване — статусът ще се появи тук.</span></div>'
      : mine.map(function (i) {
          var st = INQUIRY_STATUS[i.status] || INQUIRY_STATUS.new;
          var d = i.created_at ? new Date(i.created_at).toLocaleDateString('bg-BG') : '';
          return '<div class="account-inq"><div class="account-inq-top"><span class="account-inq-title">' + (i.offer_title || 'Оферта') + '</span><span class="status-badge ' + st.cls + '">' + st.label + '</span></div><div class="account-inq-meta">' + (i.offer_ref ? 'Реф. ' + i.offer_ref + ' · ' : '') + d + (i.preferred_date ? ' · 📅 ' + i.preferred_date : '') + (i.hotel ? ' · 🏨 ' + i.hotel : '') + '</div></div>';
        }).join('');
    var favBox = document.getElementById('accPanelFav');
    var data = offersData();
    if (!favs.length) {
      favBox.innerHTML = '<div class="account-empty">🤍 Нямате запазени любими.<br><span>Натиснете сърцето ❤️ върху всяка оферта, за да я запазите тук.</span></div>';
    } else if (data) {
      var favOffers = favs.map(function (id) { return data.find(function (o) { return o.id === id; }); }).filter(Boolean);
      favBox.innerHTML = favOffers.map(function (o) {
        return '<a class="account-fav" href="oferta.html?id=' + o.id + '"><img src="' + imgFor(o) + '" alt="' + o.title + '" loading="lazy" onerror="this.style.visibility=\'hidden\'"><div class="account-fav-body"><div class="account-fav-title">' + o.title + '</div><div class="account-fav-meta">📍 ' + (o.destination || '') + ' · от ' + (o.price_eur || '') + ' €</div></div></a>';
      }).join('');
    } else {
      favBox.innerHTML = favs.map(function (id) {
        return '<a class="account-fav" href="oferta.html?id=' + id + '"><div class="account-fav-body"><div class="account-fav-title">Оферта #' + id + '</div><div class="account-fav-meta">Отворете за детайли →</div></div></a>';
      }).join('');
    }
  }

  function ensureModals() {
    if (document.getElementById('authModal')) return;
    var logo = 'logo.svg?v=9';
    var html =
'<div class="auth-overlay" id="authModal" onclick="if(event.target===this)closeAuthModal()"><div class="auth-card" onclick="event.stopPropagation()"><button class="auth-close" onclick="closeAuthModal()" aria-label="Затвори">✕</button><div class="auth-header"><img src="' + logo + '" alt="Marvel Tour" class="auth-logo" onerror="this.style.display=\'none\'"><p class="auth-sub">Добре дошли в Marvel Tour</p></div><div class="auth-tabs"><button id="authTabLogin" class="auth-tab active" onclick="switchAuthTab(\'login\')">Вход</button><button id="authTabRegister" class="auth-tab" onclick="switchAuthTab(\'register\')">Регистрация</button></div><div id="authFormLogin" class="auth-form"><div class="auth-field"><label>📧 Имейл</label><input id="loginEmail" type="email" placeholder="вашия@имейл.bg" autocomplete="email"></div><div class="auth-field"><label>🔒 Парола</label><input id="loginPassword" type="password" placeholder="••••••••" autocomplete="current-password" onkeydown="if(event.key===\'Enter\')handleLogin()"></div><div class="auth-error" id="loginError"></div><button class="auth-btn" onclick="handleLogin()">Влез в профила</button><p class="auth-switch">Нямате профил? <a href="javascript:void(0)" onclick="switchAuthTab(\'register\')">Регистрирайте се</a></p></div><div id="authFormRegister" class="auth-form" style="display:none"><div class="auth-field"><label>👤 Вашето име</label><input id="regName" type="text" placeholder="Иван Иванов" autocomplete="name"></div><div class="auth-field"><label>📧 Имейл</label><input id="regEmail" type="email" placeholder="вашия@имейл.bg" autocomplete="email"></div><div class="auth-field"><label>🔒 Парола</label><input id="regPassword" type="password" placeholder="Минимум 6 символа" autocomplete="new-password"></div><div class="auth-field"><label>🔒 Потвърди парола</label><input id="regPasswordConfirm" type="password" placeholder="••••••••" autocomplete="new-password" onkeydown="if(event.key===\'Enter\')handleRegister()"></div><div class="auth-error" id="regError"></div><button class="auth-btn" onclick="handleRegister()">Създай профил</button><p class="auth-switch">Вече имате профил? <a href="javascript:void(0)" onclick="switchAuthTab(\'login\')">Влезте</a></p></div><div class="auth-perks"><div class="auth-perks-title">✨ Защо да си създадете профил?</div><ul><li>📬 Следете <strong>статуса на запитванията</strong> си в реално време</li><li>❤️ Запазвайте <strong>любими почивки</strong> и се връщайте към тях</li><li>⚡ По-бързо запитване — данните ви се попълват автоматично</li></ul></div></div></div>' +
'<div class="auth-overlay" id="accountModal" onclick="if(event.target===this)closeAccountModal()"><div class="account-card" onclick="event.stopPropagation()"><button class="auth-close" onclick="closeAccountModal()" aria-label="Затвори">✕</button><div class="account-head"><div class="account-avatar" id="accAvatar">U</div><div><div class="account-name" id="accName">—</div><div class="account-email" id="accEmail">—</div></div></div><div class="account-stats"><div class="account-stat"><span id="accFavCount">0</span><small>❤️ Любими</small></div><div class="account-stat"><span id="accInqCount">0</span><small>📬 Запитвания</small></div></div><div class="account-tabs"><button id="accTabInq" class="account-tab active" onclick="switchAccountTab(\'inq\')">📬 Моите запитвания</button><button id="accTabFav" class="account-tab" onclick="switchAccountTab(\'fav\')">❤️ Любими почивки</button></div><div id="accPanelInq" class="account-panel"></div><div id="accPanelFav" class="account-panel" style="display:none;"></div><button class="account-logout" onclick="logoutCustomer();closeAccountModal()">↩ Изход от профила</button></div></div>';
    var wrap = document.createElement('div'); wrap.innerHTML = html;
    while (wrap.firstChild) document.body.appendChild(wrap.firstChild);
  }

  function ensureNavButton() {
    var nav = document.querySelector('.nav-links');
    if (nav && !document.getElementById('customerAuthBtn')) {
      var li = document.createElement('li'); li.id = 'customerAuthNav';
      li.innerHTML = '<button class="nav-customer-btn" id="customerAuthBtn" onclick="openAuthModal()">👤 Вход / Регистрация</button>';
      nav.appendChild(li);
    }
    var mm = document.getElementById('mobileMenu');
    if (mm && !document.getElementById('mobileAuthBtn')) {
      if (!mm.querySelector('.mobile-menu-divider')) { var dv = document.createElement('div'); dv.className = 'mobile-menu-divider'; mm.appendChild(dv); }
      var mb = document.createElement('button'); mb.className = 'mobile-auth-btn'; mb.id = 'mobileAuthBtn';
      mb.textContent = '👤 Вход / Регистрация'; mb.onclick = function () { openAuthModal(); };
      mm.appendChild(mb);
    }
  }

  function init() { ensureModals(); ensureNavButton(); updateNavbarAuth(); }

  // expose handlers referenced by inline onclick / injected markup
  window.openAuthModal = openAuthModal; window.closeAuthModal = closeAuthModal; window.switchAuthTab = switchAuthTab;
  window.handleLogin = handleLogin; window.handleRegister = handleRegister;
  window.openAccountPanel = openAccountPanel; window.closeAccountModal = closeAccountModal;
  window.switchAccountTab = switchAccountTab; window.logoutCustomer = logoutCustomer;
  window.updateNavbarAuth = window.updateNavbarAuth || updateNavbarAuth;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
