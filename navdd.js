/* Споделено падащо меню за дестинации (Почивки / Екскурзии / Екзотика)
 * за вътрешните страници. Бутонът само отваря подменюто; елементите водят към
 * дестинацията (frame) или филтрират офертите на началната страница.
 * Данните трябва да съвпадат с FIXED_DD_GROUPS в app.js. */
(function () {
  var POCHIVKI = [
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
      ['Сейшели', 'sc'], ['Тунис', 'tn', 38188]
    ]]
  ];
  var EKSKURZII = [
    ['ЕВРОПА', [
      ['Австрия', 'at'], ['Азербайджан', 'az'], ['Армения', 'am'], ['Белгия', 'be'],
      ['Босна и Херцеговина', 'ba'], ['Великобритания', 'gb'], ['Германия', 'de'], ['Грузия', 'ge'],
      ['Гърция', 'gr'], ['Дания', 'dk'], ['Естония', 'ee'], ['Ирландия', 'ie'],
      ['Исландия', 'is'], ['Испания', 'es'], ['Италия', 'it'], ['Кипър', 'cy'],
      ['Малта', 'mt'], ['Полша', 'pl'], ['Португалия', 'pt'], ['Румъния', 'ro'],
      ['Словения', 'si'], ['Сърбия', 'rs'], ['Турция', 'tr'], ['Унгария', 'hu'],
      ['Франция', 'fr'], ['Хърватия', 'hr'], ['Черна Гора', 'me'], ['Швейцария', 'ch'],
      ['Швеция', 'se']
    ]],
    ['АЗИЯ', [
      ['Виетнам', 'vn'], ['Дубай-ОАЕ', 'ae'], ['Индия', 'in'], ['Индонезия', 'id'],
      ['Камбоджа', 'kh'], ['Катар', 'qa'], ['Китай', 'cn'], ['Сингапур', 'sg'],
      ['Тайланд', 'th'], ['Шри Ланка', 'lk'], ['Южна Корея', 'kr'], ['Япония', 'jp']
    ]],
    ['АВСТРАЛИЯ', [
      ['Австралия', 'au']
    ]],
    ['АМЕРИКА', [
      ['Бахамски острови', 'bs'], ['Канада', 'ca'], ['САЩ', 'us'], ['Аржентина', 'ar'],
      ['Бразилия', 'br'], ['Колумбия', 'co'], ['Перу', 'pe']
    ]],
    ['АФРИКА', [
      ['Египет', 'eg'], ['Етиопия', 'et'], ['Занзибар', 'tz'], ['Кения', 'ke'],
      ['Мароко', 'ma'], ['Намибия', 'na'], ['Сейшели', 'sc'], ['ЮАР / Южна Африка', 'za']
    ]]
  ];
  var EKZOTIKA = [
    ['ЕВРОПА', [
      ['Армения', 'am'], ['Грузия', 'ge'], ['Испания', 'es']
    ]],
    ['АЗИЯ', [
      ['Индия', 'in'], ['Индонезия', 'id'], ['Китай', 'cn'], ['Малдиви', 'mv'],
      ['Тайланд', 'th'], ['Шри Ланка', 'lk'], ['Япония', 'jp']
    ]],
    ['АМЕРИКА', [
      ['Аржентина', 'ar'], ['Бахамски острови', 'bs'], ['Бразилия', 'br'],
      ['Доминикана', 'do'], ['Колумбия', 'co']
    ]],
    ['АФРИКА', [
      ['Египет', 'eg'], ['Занзибар', 'tz'], ['Кения', 'ke'], ['Мавриций', 'mu'],
      ['Мадагаскар', 'mg'], ['Сейшели', 'sc']
    ]]
  ];
  var GROUPS = { vacation: POCHIVKI, excursion: EKSKURZII, exotic: EKZOTIKA };

  function flag(cc, h) {
    h = h || 16;
    return cc
      ? '<img src="https://flagcdn.com/w40/' + cc + '.png" alt="" style="height:' + h + 'px;width:auto;border-radius:2px;box-shadow:0 1px 2px rgba(0,0,0,.3);vertical-align:middle;object-fit:cover;">'
      : '🌍';
  }
  function closeAll() {
    var open = document.querySelectorAll('.nav-dd-menu.open');
    for (var i = 0; i < open.length; i++) open[i].classList.remove('open');
  }
  // Бутонът само отваря/затваря подменюто.
  window.toggleNavDD = function (id) {
    var m = document.getElementById(id);
    if (!m) return;
    var was = m.classList.contains('open');
    closeAll();
    if (!was) m.classList.add('open');
  };
  // Държава с frame → отделна страница; иначе → филтрирани оферти на index.
  window.openDestFrame = function (name, ifr, cc) {
    closeAll();
    location.href = 'destinacia.html?d=' + encodeURIComponent(name) + '&f=' + encodeURIComponent(ifr) + '&cc=' + encodeURIComponent(cc || '');
  };
  window.mtNavFilter = function (cat, name) {
    var u = 'index.html?cat=' + encodeURIComponent(cat);
    if (name) u += '&country=' + encodeURIComponent(name);
    location.href = u + '#offers';
  };

  function build() {
    [['vacation', 'ddPochivki', 'почивки', '🏖️'], ['excursion', 'ddEkskurzii', 'екскурзии', '🗺️'], ['exotic', 'ddEkzotika', 'екзотика', '🏝️']].forEach(function (t) {
      var cat = t[0], id = t[1], word = t[2], icon = t[3];
      var menu = document.getElementById(id);
      if (!menu) return;
      var html = '<div class="nav-dd-head">' + icon + ' Изберете дестинация</div>';
      html += '<a class="nav-dd-all" onclick="mtNavFilter(\'' + cat + '\', null)">🌍 Всички ' + word + '</a>';
      GROUPS[cat].forEach(function (g) {
        var cont = g[0], list = g[1];
        html += '<div class="nav-dd-head" style="padding-top:12px;">' + cont + '</div>';
        html += '<div class="nav-dd-grid">' + list.map(function (it) {
          var name = it[0], cc = it[1], ifr = it[2];
          var esc = name.replace(/'/g, "\\'");
          var oc = ifr ? "openDestFrame('" + esc + "','" + ifr + "','" + cc + "')" : "mtNavFilter('" + cat + "','" + esc + "')";
          return '<a onclick="' + oc + '"><span class="nav-dd-name">' + flag(cc, 16) + '<span class="nav-dd-lbl">' + name + '</span></span></a>';
        }).join('') + '</div>';
      });
      menu.innerHTML = html;
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', build);
  else build();
  document.addEventListener('click', function (e) { if (!e.target.closest('.nav-dd')) closeAll(); });
})();
