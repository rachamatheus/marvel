// Marvel Tour — custom BG/EN UI translation with flag selector (no Google, no bar).
// Default is Bulgarian. Selecting EN translates the interface (nav, hero, sections,
// footer, forms, buttons, modals). Offer content (operator data) stays Bulgarian.
(function () {
  'use strict';

  var DICT = {
    // Nav
    'Оферти': 'Offers', 'Дестинации': 'Destinations', 'Круизи': 'Cruises', 'Блог': 'Blog',
    'За нас': 'About us', 'Контакти': 'Contacts', '👤 Вход / Регистрация': '👤 Login / Register',
    '✈️ Оферти': '✈️ Offers', '🗺️ Дестинации': '🗺️ Destinations', '🚢 Круизи': '🚢 Cruises',
    '📖 Блог': '📖 Blog', '💎 За нас': '💎 About us', '📧 Контакти': '📧 Contacts',
    // Hero
    '⭐ Над 20 години опит в туризма': '⭐ Over 20 years of travel experience',
    'Открийте света с': 'Discover the world with',
    'Екскурзии, почивки и незабравими приключения от Пловдив.': 'Excursions, holidays and unforgettable adventures from Plovdiv.',
    'Намерете перфектната оферта за вас.': 'Find the perfect offer for you.',
    'Търси': 'Search', 'Активни оферти': 'Active offers', 'Години опит': 'Years of experience',
    // Featured
    '🔥 Топ избори': '🔥 Top picks', 'Препоръчани оферти': 'Recommended offers',
    'Нашите най-популярни дестинации за сезона': 'Our most popular destinations for the season',
    // Campaigns
    '🌅 Кампания': '🌅 Campaign', '🇬🇷 Кампания': '🇬🇷 Campaign', '🧳 Кампания': '🧳 Campaign', '✍️ Кампания': '✍️ Campaign',
    'Ранни записвания': 'Early bookings', 'Най-добрите цени за лято 2026 →': 'Best prices for summer 2026 →',
    'Лято 2026 Гърция': 'Summer 2026 Greece', 'Острови, плажове и история →': 'Islands, beaches and history →',
    'Уикенд': 'Weekend', 'Кратки бягства за уикенда →': 'Short weekend getaways →',
    'Авторски програми': 'Signature programs', 'Специално подбрани пътешествия →': 'Specially curated journeys →',
    // Destinations
    '🌍 Дестинации': '🌍 Destinations', 'Изберете своя континент': 'Choose your continent',
    'Кликнете върху континент и открийте офертите за него': 'Click on a continent and discover its offers',
    'Европа': 'Europe', 'Азия': 'Asia', 'Африка': 'Africa', 'Америка': 'America', 'Океания': 'Oceania', 'Антарктида': 'Antarctica',
    // Offers section
    '✈️ Всички оферти': '✈️ All offers', 'Намерете вашата мечтана ваканция': 'Find your dream vacation',
    'Всички': 'All', '🗺️ Екскурзии': '🗺️ Excursions', '🌴 Екзотика': '🌴 Exotic', '🏖️ Почивки': '🏖️ Holidays',
    'Почивки': 'Holidays', 'Екскурзии': 'Excursions',
    'По подразбиране': 'Default', 'Цена: ниска → висока': 'Price: low → high', 'Цена: висока → ниска': 'Price: high → low',
    'Продължителност: кратко': 'Duration: short',
    'Няма намерени оферти': 'No offers found', 'Опитайте с различни филтри или': 'Try different filters or',
    'изчистете всички': 'clear all', 'и се връщайте към тях': 'and come back to them',
    // Why us
    '💎 Защо ние': '💎 Why us', 'Защо да изберете Marvel Tour?': 'Why choose Marvel Tour?',
    'Над две десетилетия в туризма. Опитен екип, който знае как да направи вашата ваканция съвършена.': 'Over two decades in tourism. An experienced team that knows how to make your vacation perfect.',
    'Опит и доверие': 'Experience & trust',
    'Директни договори с хотели и авиокомпании. Ранни записвания с отстъпки до 30%.': 'Direct contracts with hotels and airlines. Early bookings with discounts up to 30%.',
    'Най-добрите цени': 'Best prices',
    'Много от нашите екскурзии включват водач на Български език. Никога не се чувствате сами.': 'Many of our excursions include a Bulgarian-speaking guide. You never feel alone.',
    'Водач на Български': 'Bulgarian-speaking guide',
    'Медицинска застраховка включена. Лицензиран туроператор. Вашата безопасност е наш приоритет.': 'Medical insurance included. Licensed tour operator. Your safety is our priority.',
    'Пълна защита': 'Full protection',
    'Отговаряме на всяко запитване в рамките на 24 часа. Ние сме тук за вас преди, по време и след пътуването.': 'We respond to every inquiry within 24 hours. We are here for you before, during and after your trip.',
    'Лична грижа': 'Personal care',
    // CTA
    'Готови за приключение?': 'Ready for an adventure?',
    'Свържете се с нас и ние ще намерим перфектната оферта за вас.': 'Contact us and we will find the perfect offer for you.',
    // Footer
    'Информация': 'Information',
    'Вашият доверен туроператор от Пловдив. Организираме незабравими пътувания от над 20 години — екскурзии, почивки и индивидуални програми.': 'Your trusted tour operator from Plovdiv. We have been organizing unforgettable trips for over 20 years — excursions, holidays and custom programs.',
    'Уикенд оферти': 'Weekend offers', 'Общи условия': 'Terms & conditions',
    'Политика за поверителност': 'Privacy policy', 'Застраховки': 'Insurance', 'Трансфери': 'Transfers',
    'Пловдив 4000, ул. „Арчарица" 1': 'Plovdiv 4000, 1 Archaritsa St.',
    'Пон-Пет: 09:00 - 18:00': 'Mon-Fri: 09:00 - 18:00',
    '© 2026 Marvel Tour. Всички права запазени.': '© 2026 Marvel Tour. All rights reserved.',
    'Лицензиран туроператор': 'Licensed tour operator', 'Туроператор': 'Tour operator',
    // Auth / account
    'Вход': 'Sign in', 'Регистрация': 'Register', 'Влез в профила': 'Log in', 'Създай профил': 'Create account',
    'Вашето име *': 'Your name *', 'Телефон *': 'Phone *', 'Парола': 'Password', 'Имейл': 'Email',
    'Вече имате профил?': 'Already have an account?', 'Влезте': 'Sign in', 'Нямате профил?': 'No account?', 'Регистрирайте се': 'Register',
    '❤️ Любими почивки': '❤️ Favorite holidays', '📬 Моите запитвания': '📬 My inquiries', '↩ Изход от профила': '↩ Log out',
    // Inquiry form
    'Възрастни *': 'Adults *', 'Деца': 'Children', 'Без деца': 'No children',
    '1 възрастен': '1 adult', '2 възрастни': '2 adults', '3 възрастни': '3 adults', '4 възрастни': '4 adults', '5 възрастни': '5 adults', '6+ възрастни': '6+ adults',
    '1 дете': '1 child', '2 деца': '2 children', '3 деца': '3 children', '4 деца': '4 children',
    'Избран хотел': 'Selected hotel', 'Предпочитана дата': 'Preferred date', 'Реф. номер на оферта': 'Offer ref. number',
    'Съобщение (по желание)': 'Message (optional)', '✉️ Изпрати запитване': '✉️ Send inquiry',
    'Запитването е изпратено!': 'Your inquiry has been sent!',
    // Offer page chrome
    '← Всички оферти': '← All offers', '🏨 Изберете хотел': '🏨 Choose a hotel', '(кликнете 🔍 за снимки)': '(click 🔍 for photos)',
    '🗺️ Програма по дни': '🗺️ Day-by-day program', '📋 Подробна информация': '📋 Detailed information',
    '✅ Какво е включено': '✅ What is included', '❌ Не е включено': '❌ Not included',
    '📅 Налични дати': '📅 Available dates', '📬 Изпратете запитване': '📬 Send an inquiry',
    'Офертата не е намерена': 'Offer not found', 'Скоро': 'Soon',
    'Дестинации': 'Destinations', '20+ години опит': '20+ years of experience',
    // Why-us extra cards
    'Полети от Пловдив': 'Flights from Plovdiv',
    'Специални оферти с директни полети от Пловдив — без да се налага да пътувате до София.': 'Special offers with direct flights from Plovdiv — no need to travel to Sofia.',
    'Гъвкави плащания': 'Flexible payments',
    'Депозит при записване и доплащане преди отпътуване. Удобни схеми за всеки бюджет.': 'Deposit on booking and balance before departure. Convenient plans for every budget.',
    'Богат избор': 'Wide selection',
    'Стотици оферти до Гърция, Турция, Египет, Италия и екзотични дестинации по целия свят.': 'Hundreds of offers to Greece, Turkey, Egypt, Italy and exotic destinations worldwide.',
    'Лесна онлайн резервация': 'Easy online booking',
    'Разгледайте, изберете и изпратете запитване само за минути — изцяло онлайн.': 'Browse, choose and send an inquiry in just minutes — fully online.',
    'Хиляди доволни клиенти': 'Thousands of happy clients',
    'Пътешественици, които ни се доверяват и се връщат при нас година след година.': 'Travelers who trust us and come back to us year after year.',
    // Contact section
    '📨 Контакти': '📨 Contacts', 'Свържете се с нас': 'Contact us',
    'Попълнете формата и ще се свържем с вас възможно най-скоро.': 'Fill in the form and we will get back to you as soon as possible.',
    'Тема': 'Subject', 'Съобщение *': 'Message *', 'Email': 'Email',
    '✉️ Изпрати съобщение': '✉️ Send message', '✉️ Изпратете запитване': '✉️ Send an inquiry',
    'Съобщението е изпратено!': 'Your message has been sent!',
    'Благодарим ви! Ще се свържем с вас възможно най-скоро.': 'Thank you! We will contact you as soon as possible.'
  };

  var PH = {
    'Търсете дестинация, оферта...': 'Search destination, offer...',
    'Търсете оферта, дестинация...': 'Search offer, destination...',
    'Иван Иванов': 'John Smith', 'Изберете хотел от списъка': 'Select a hotel from the list',
    'Специални изисквания, въпроси...': 'Special requirements, questions...',
    'Минимум 6 символа': 'Minimum 6 characters', 'вашия@имейл.bg': 'your@email.com',
    'Запитване за оферта': 'Inquiry about an offer',
    'Опишете накратко какво търсите — дестинация, дати, брой пътници...': 'Briefly describe what you are looking for — destination, dates, number of travelers...'
  };

  function getLang() { try { return localStorage.getItem('mt_lang') || 'bg'; } catch (e) { return 'bg'; } }
  function setLang(l) { try { localStorage.setItem('mt_lang', l); } catch (e) {} location.reload(); }

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, IFRAME: 1, TEXTAREA: 1 };
  function translateTree(root) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var p = node.parentNode;
      if (!p || SKIP[p.nodeName] || (p.closest && p.closest('.notranslate'))) return;
      var raw = node.nodeValue;
      var key = raw.trim();
      if (key && DICT[key]) node.nodeValue = raw.replace(key, DICT[key]);
    });
    // placeholders
    if (root.querySelectorAll) {
      root.querySelectorAll('[placeholder]').forEach(function (el) {
        var v = el.getAttribute('placeholder');
        if (v && PH[v.trim()]) el.setAttribute('placeholder', PH[v.trim()]);
      });
    }
  }

  function applyEnglish() {
    document.documentElement.setAttribute('lang', 'en');
    translateTree(document.body);
    // re-translate dynamically rendered chrome (offers grid, modals)
    var pending = false;
    var obs = new MutationObserver(function (muts) {
      if (pending) return; pending = true;
      requestAnimationFrame(function () {
        pending = false;
        muts.forEach(function (m) {
          m.addedNodes && m.addedNodes.forEach(function (nd) {
            if (nd.nodeType === 1) translateTree(nd);
            else if (nd.nodeType === 3 && nd.parentNode) {
              var k = (nd.nodeValue || '').trim();
              if (k && DICT[k]) nd.nodeValue = nd.nodeValue.replace(k, DICT[k]);
            }
          });
        });
      });
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }

  function injectFlags() {
    var nav = document.querySelector('.nav-links');
    if (!nav || document.getElementById('mt-lang')) return;
    var cur = getLang();
    var li = document.createElement('li');
    li.id = 'mt-lang';
    li.className = 'notranslate';
    li.setAttribute('translate', 'no');
    li.innerHTML =
      '<span class="mt-lang-wrap">' +
      '<button type="button" class="mt-flag' + (cur === 'bg' ? ' active' : '') + '" data-l="bg" title="Български" aria-label="Български"><img src="https://flagcdn.com/32x24/bg.png" alt="БГ" width="24" height="18"></button>' +
      '<button type="button" class="mt-flag' + (cur === 'en' ? ' active' : '') + '" data-l="en" title="English" aria-label="English"><img src="https://flagcdn.com/32x24/gb.png" alt="EN" width="24" height="18"></button>' +
      '</span>';
    li.querySelectorAll('.mt-flag').forEach(function (b) {
      b.onclick = function () { var l = b.getAttribute('data-l'); if (l !== getLang()) setLang(l); };
    });
    nav.appendChild(li);
  }

  // styles for the flag selector
  var st = document.createElement('style');
  st.textContent =
    '.mt-lang-wrap{display:inline-flex;gap:4px;align-items:center;background:rgba(255,255,255,0.12);padding:3px;border-radius:100px;}' +
    '.mt-flag{border:none;background:transparent;cursor:pointer;font-size:0.85rem;font-weight:600;color:#fff;line-height:1;padding:4px 7px;border-radius:100px;opacity:0.55;transition:.18s;filter:grayscale(0.5);display:inline-flex;align-items:center;gap:5px;}' +
    '.mt-flag img{border-radius:3px;display:block;box-shadow:0 1px 3px rgba(0,0,0,0.25);}' +
    '.mt-flag:hover{opacity:0.9;}' +
    '.mt-flag.active{opacity:1;background:rgba(255,255,255,0.92);color:var(--primary,#1A3A6B);filter:none;box-shadow:0 1px 4px rgba(0,0,0,0.15);}' +
    '#mobileMenu .mt-lang-wrap{margin:8px 0;}';
  (document.head || document.documentElement).appendChild(st);

  function start() {
    injectFlags();
    // mobile menu flags
    var mob = document.getElementById('mobileMenu');
    if (mob && !document.getElementById('mt-lang-m')) {
      var cur = getLang();
      var d = document.createElement('div');
      d.id = 'mt-lang-m'; d.className = 'notranslate'; d.setAttribute('translate', 'no');
      d.innerHTML = '<span class="mt-lang-wrap"><button type="button" class="mt-flag mt-flag-m' + (cur === 'bg' ? ' active' : '') + '" data-l="bg"><img src="https://flagcdn.com/32x24/bg.png" width="22" height="16" alt=""> БГ</button><button type="button" class="mt-flag mt-flag-m' + (cur === 'en' ? ' active' : '') + '" data-l="en"><img src="https://flagcdn.com/32x24/gb.png" width="22" height="16" alt=""> EN</button></span>';
      d.querySelectorAll('.mt-flag').forEach(function (b) { b.onclick = function () { var l = b.getAttribute('data-l'); if (l !== getLang()) setLang(l); }; });
      mob.appendChild(d);
    }
    if (getLang() === 'en') applyEnglish();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
