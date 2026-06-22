// Marvel Tour — Offers Database

const CATEGORIES = [
  { key: 'exotic',    label: 'Екзотика' },
  { key: 'vacation',  label: 'Почивки' },
  { key: 'excursion', label: 'Екскурзии' },
  { key: 'cruise',    label: 'Круизи' },
];

const TAGS = [
  { key: 'beach', label: 'Плаж' },
  { key: 'city', label: 'Градски' },
  { key: 'culture', label: 'Култура' },
  { key: 'nature', label: 'Природа' },
  { key: 'luxury', label: 'Луксозен' },
  { key: 'family', label: 'Семеен' },
  { key: 'adventure', label: 'Приключение' },
  { key: 'cruise', label: 'Круиз' },
  { key: 'allInclusive', label: 'All Inclusive' },
  { key: 'lyato-gartsia', label: '🇬🇷 Лято 2026 Гърция' },
  { key: 'ranni-zapisvaniya', label: '🌅 Ранни записвания' },
  { key: 'uikend', label: '🧳 Уикенд' },
  { key: 'avtorski', label: '✍️ Авторски програми' },
];

const COUNTRIES = [
  { key: 'greece',      label: 'Гърция' },
  { key: 'poland',      label: 'Полша' },
  { key: 'switzerland', label: 'Швейцария' },
  { key: 'germany',     label: 'Германия' },
  { key: 'austria',     label: 'Австрия' },
  { key: 'hungary',     label: 'Унгария' },
  { key: 'croatia',     label: 'Хърватия' },
  { key: 'romania',     label: 'Румъния' },
  { key: 'serbia',      label: 'Сърбия' },
  { key: 'cyprus',      label: 'Кипър' },
  { key: 'belgium',     label: 'Белгия' },
  { key: 'denmark',     label: 'Дания' },
  { key: 'sweden',      label: 'Швеция' },
  { key: 'ireland',     label: 'Ирландия' },
  { key: 'iceland',     label: 'Исландия' },
  { key: 'estonia',     label: 'Естония' },
  { key: 'bosnia',      label: 'Босна и Херцеговина' },
  { key: 'kosovo',      label: 'Косово' },
  { key: 'montenegro',  label: 'Черна Гора' },
  { key: 'uk',          label: 'Великобритания' },
  { key: 'azerbaijan',  label: 'Азербайджан' },
  { key: 'qatar',       label: 'Катар' },
  { key: 'ethiopia',    label: 'Етиопия' },
  { key: 'namibia',     label: 'Намибия' },
  { key: 'south-africa',label: 'Южна Африка' },
  { key: 'new-zealand', label: 'Нова Зеландия' },
  { key: 'turkey',      label: 'Турция' },
  { key: 'egypt',       label: 'Египет' },
  { key: 'albania',     label: 'Албания' },
  { key: 'bulgaria',    label: 'България' },
  { key: 'maldives',    label: 'Малдиви' },
  { key: 'uae',         label: 'Дубай / ОАЕ' },
  { key: 'thailand',    label: 'Тайланд' },
  { key: 'argentina',   label: 'Аржентина' },
  { key: 'armenia',     label: 'Армения' },
  { key: 'georgia',     label: 'Грузия' },
  { key: 'bahamas',     label: 'Бахамски острови' },
  { key: 'brazil',      label: 'Бразилия' },
  { key: 'dominicana',  label: 'Доминикана' },
  { key: 'usa',         label: 'САЩ' },
  { key: 'tanzania',    label: 'Занзибар / Танзания' },
  { key: 'kenya',       label: 'Кения' },
  { key: 'mauritius',   label: 'Мавриций' },
  { key: 'madagascar',  label: 'Мадагаскар' },
  { key: 'seychelles',  label: 'Сейшели' },
  { key: 'vietnam',     label: 'Виетнам' },
  { key: 'india',       label: 'Индия' },
  { key: 'indonesia',   label: 'Индонезия' },
  { key: 'china',       label: 'Китай' },
  { key: 'colombia',    label: 'Колумбия' },
  { key: 'srilanka',    label: 'Шри Ланка' },
  { key: 'japan',       label: 'Япония' },
  { key: 'peru',        label: 'Перу' },
  { key: 'spain',       label: 'Испания' },
  { key: 'tunisia',     label: 'Тунис' },
  { key: 'italy',       label: 'Италия' },
  { key: 'france',      label: 'Франция' },
  { key: 'morocco',     label: 'Мароко' },
  { key: 'jordan',      label: 'Йордания' },
  { key: 'malta',       label: 'Малта' },
  { key: 'portugal',    label: 'Португалия' },
  { key: 'finland',     label: 'Финландия' },
  { key: 'czech',       label: 'Чехия' },
];

const SAT_FULL = ['2026-06-13','2026-06-20','2026-06-27','2026-07-04','2026-07-11','2026-07-18','2026-07-25','2026-08-01','2026-08-08','2026-08-15','2026-08-22','2026-08-29','2026-09-05','2026-09-12','2026-09-19'];

const OFFERS = [
  {
    "id": 4,
    "refNum": "Е579",
    "title": "САЩ Западно крайбрежие с круиз по Бахамите",
    "category": "exotic",
    "tags": [
      "city",
      "culture",
      "cruise",
      "nature"
    ],
    "destination": "САЩ / Бахамски острови",
    "country": "bahamas",
    "duration": "19 дни / 17 нощувки",
    "days": 19,
    "nights": 17,
    "price_bgn": 12735,
    "price_eur": 6511,
    "dates": [
      "2026-06-23",
      "2026-09-22"
    ],
    "next_date": "2026-06-23",
    "transport": "plane",
    "description": "Комбиниран тур свързващ иконичните дестинации на западното крайбрежие на Америка с карибски круиз. Сан Франциско, Лас Вегас, Гранд Каньон, Холивуд, Лос Анджелис, после 4 нощи на круизния кораб Wonder of the Seas с посещения на Coco Cay, Насау и Бахамите.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване от София → Истанбул → Сан Франциско. Настаняване в хотел."
      },
      {
        "day": "Ден 2–3",
        "text": "Панорамна обиколка на Сан Франциско, разходка с лодка в залива. Полет до Лас Вегас."
      },
      {
        "day": "Ден 4–6",
        "text": "Лас Вегас – казина и атракции. Западен ръб на Гранд Каньон с факултативен хеликоптер."
      },
      {
        "day": "Ден 7–10",
        "text": "Лос Анджелис / Холивуд – Хол на Славата, Universal Studios (факулт.), Санта Моника, Венис Бийч."
      },
      {
        "day": "Ден 11–12",
        "text": "Маями – обиколка на Кий Уест по Seven Mile Bridge. Качване на кораба в Маями."
      },
      {
        "day": "Ден 13–16",
        "text": "Круиз Wonder of the Seas: Coco Cay, Насау (факулт. обиколка), ден в морето."
      },
      {
        "day": "Ден 17–19",
        "text": "Пристигане Маями, обиколка на квартали. Вечерен полет Маями → Истанбул → София."
      }
    ],
    "includes": [
      "Международни и вътрешни полети с багаж",
      "17 нощувки (4★ хотели + 4★ круизен кораб)",
      "16 закуски, 5 обяда, 4 вечери",
      "Всички трансфери",
      "Туристически автобус и водач"
    ],
    "excludes": [
      "Американска виза (323.75 лв.)",
      "Медицинска застраховка (от 43 лв.)",
      "Сервизна такса кораб ~15–20 USD/ден",
      "Факултативни екскурзии"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "4★ хотели (Сан Франциско, Лас Вегас, Холивуд, ЛА, Маями) + Wonder of the Seas",
        "board": "16 закуски / 5 обяда / 4 вечери",
        "price_bgn": 12735,
        "price_eur": 6511,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_sasht-zapadno-kraybrezhie-s-kruiz-po-bahamite-1_1764592146579.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 6,
    "refNum": "П962",
    "title": "В ритъма на доминиканското слънце – Пунта Кана",
    "category": "exotic",
    "tags": [
      "beach",
      "allInclusive",
      "luxury",
      "avtorski"
    ],
    "destination": "Доминикана – Пунта Кана",
    "country": "dominicana",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2268,
    "price_eur": 1160,
    "dates": [
      "2026-06-09",
      "2026-07-21",
      "2026-08-04"
    ],
    "next_date": "2026-06-09",
    "transport": "plane",
    "description": "Карибски рай All Inclusive в най-красивите 4★ и 5★ хотели на Playa Bavaro! Директен чартърен полет от Мадрид, 7 нощи All Inclusive и незабравими белопясъчни плажове на Доминиканската република.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет Мадрид – Пунта Кана; трансфер и настаняване в хотел."
      },
      {
        "day": "Ден 2–7",
        "text": "Свободни дни на плажа и в хотела. Факултативни екскурзии: ATV приключение (€115), Санто Доминго (€120), остров Каталина (€120+), Саона (€120), Лос Хайтисес (€110)."
      },
      {
        "day": "Ден 8",
        "text": "Освобождаване, трансфер на летището, обратен полет за Мадрид."
      }
    ],
    "includes": [
      "Чартърен полет Мадрид–Пунта Кана–Мадрид с летищни такси и 20 кг багаж",
      "7 нощи All Inclusive (4★ или 5★ хотел)",
      "Трансфери летище–хотел–летище",
      "Медицинска застраховка",
      "Събитие „White Sunset Party\""
    ],
    "excludes": [
      "Полети София–Мадрид–София (~€250)",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Мадрид"
    ],
    "hotels": [
      {
        "name": "SUNSCAPE COCO PUNTA CANA ★★★★",
        "board": "All Inclusive",
        "price_bgn": 2268,
        "price_eur": 1160,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1755177709118.jpg"
      },
      {
        "name": "Vista Sol Punta Cana Beach Resort & Spa ★★★★",
        "board": "All Inclusive",
        "price_bgn": 2268,
        "price_eur": 1160,
        "image": "https://www.marveltourbg.com/img/OBEKTI/11_1755242561113.jpg"
      },
      {
        "name": "Tropical Deluxe Princess ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 2707,
        "price_eur": 1384,
        "image": "https://www.marveltourbg.com/img/OBEKTI/111_1760351681146.jpg"
      },
      {
        "name": "Serenade Punta Cana Beach & Spa Resort ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 2793,
        "price_eur": 1428,
        "image": "https://www.marveltourbg.com/img/OBEKTI/IMG_167334555681.jpg"
      },
      {
        "name": "Grand Bavaro Princess ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 2852,
        "price_eur": 1458,
        "image": "https://www.marveltourbg.com/img/OBEKTI/2222_175524264291.jpg"
      },
      {
        "name": "Iberostar Waves Punta Cana ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 2899,
        "price_eur": 1482,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1755177274119.jpg"
      },
      {
        "name": "Dreams Flora Resort & Spa ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 3478,
        "price_eur": 1778,
        "image": "https://www.marveltourbg.com/img/OBEKTI/11_1760352044147.jpg"
      },
      {
        "name": "Lopesan Costa Bavaro Resort Spa & Casino ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 3482,
        "price_eur": 1780,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1755174735123.jpg"
      },
      {
        "name": "Dreams Royal Beach Punta Cana ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 3487,
        "price_eur": 1783,
        "image": "https://www.marveltourbg.com/img/OBEKTI/12_1760352324148.jpg"
      },
      {
        "name": "Caribe Deluxe Princess ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 3576,
        "price_eur": 1828,
        "image": "https://www.marveltourbg.com/img/OBEKTI/IMG_167334540880.jpg"
      },
      {
        "name": "Iberostar Selection Bavaro Suites ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 3800,
        "price_eur": 1943,
        "image": "https://www.marveltourbg.com/img/OBEKTI/111_1760350591145.jpg"
      },
      {
        "name": "Secrets Royal Beach Punta Cana ★★★★★",
        "board": "All Inclusive",
        "price_bgn": 4111,
        "price_eur": 2102,
        "image": "https://www.marveltourbg.com/img/OBEKTI/11_1760354161149.jpg"
      },
      {
        "name": "Secrets Cap Cana Resort & Spa ★★★★★ (само възрастни)",
        "board": "All Inclusive",
        "price_bgn": 4134,
        "price_eur": 2114,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1760354607150.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 7,
    "refNum": "Е732",
    "title": "Карибски круиз с Пуерто Рико",
    "category": "exotic",
    "tags": [
      "cruise",
      "culture",
      "city"
    ],
    "destination": "Бахами / Пуерто Рико / Синт Мартен / Сен Томас",
    "country": "bahamas",
    "duration": "12 дни / 9 нощувки",
    "days": 12,
    "nights": 9,
    "price_bgn": 4489,
    "price_eur": 2295,
    "dates": [
      "2027-01-28"
    ],
    "next_date": "2027-01-28",
    "transport": "plane",
    "description": "Карибски круиз на борда на MSC Meraviglia – 8 нощи на кораба с пълен пансион, 1 нощ в Маями и посещения на Насау (Бахами), Сан Хуан (Пуерто Рико), Синт Мартен и Сен Томас.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет София–Истанбул–Маями. Обиколка на Art Deco района и Little Havana. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Свободно в Маями. Качване на MSC Meraviglia в 16:00."
      },
      {
        "day": "Ден 4",
        "text": "Насау, Бахами (08:00–17:00) – факулт. екскурзия."
      },
      {
        "day": "Ден 5",
        "text": "Ден в морето."
      },
      {
        "day": "Ден 6",
        "text": "Сан Хуан, Пуерто Рико (10:00–19:00)."
      },
      {
        "day": "Ден 7",
        "text": "Синт Мартен (08:00–18:00)."
      },
      {
        "day": "Ден 8",
        "text": "Сен Томас (08:00–18:00)."
      },
      {
        "day": "Ден 9–10",
        "text": "Дни в морето."
      },
      {
        "day": "Ден 11–12",
        "text": "Пристигане Маями; посещение мол. Вечерен полет Маями → Истанбул → София."
      }
    ],
    "includes": [
      "Полети Turkish Airlines (2×23 кг + 7 кг)",
      "1 нощ хотел Маями (3★) + закуска",
      "8 нощи MSC Meraviglia пълен пансион",
      "Пристанищни такси",
      "Медицинска застраховка",
      "Водач от агенцията"
    ],
    "excludes": [
      "Алкохолни напитки",
      "Задължителна сервизна такса кораб 120 € (234.70 лв.)",
      "Американска виза и визова помощ (50 €)",
      "Факултативни брегови екскурзии"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "MSC Meraviglia – вътрешна каюта",
        "board": "Пълен пансион",
        "price_bgn": 4489,
        "price_eur": 2295,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_karibski-kruiz-s-puerto-riko-28012027-1_1779365703732.jpg"
      },
      {
        "name": "MSC Meraviglia – балкон Bella",
        "board": "Пълен пансион",
        "price_bgn": 5242,
        "price_eur": 2680,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_karibski-kruiz-s-puerto-riko-28012027-1_1779365703732.jpg"
      },
      {
        "name": "MSC Meraviglia – балкон Aurea",
        "board": "Пълен пансион",
        "price_bgn": 5859,
        "price_eur": 2995,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_karibski-kruiz-s-puerto-riko-28012027-1_1779365703732.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 8,
    "refNum": "Е404",
    "title": "САЩ – Западен бряг",
    "category": "exotic",
    "tags": [
      "nature",
      "city",
      "culture"
    ],
    "destination": "САЩ – Западен бряг",
    "country": "usa",
    "duration": "14 дни / 12 нощувки",
    "days": 14,
    "nights": 12,
    "price_bgn": 5799,
    "price_eur": 2965,
    "dates": [
      "2026-09-26",
      "2026-10-17"
    ],
    "next_date": "2026-09-26",
    "transport": "plane",
    "description": "Великолепният западен бряг на Америка – Лос Анджелис, Гранд Каньон, Паркнат монумент Валей, езерото Пауъл, Брайс Каньон, Лас Вегас, Долината на смъртта, Йосемити и Сан Франциско. 14 дни с водач на български.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет до Лос Анджелис. Обиколка на ЛА, после Лофлин."
      },
      {
        "day": "Ден 3–4",
        "text": "Гранд Каньон, Боядисана пустиня, Паркнат монумент Валей, езерото Пауъл."
      },
      {
        "day": "Ден 5–6",
        "text": "Брайс Каньон, пристигане Лас Вегас. Факулт. Долина на огъня."
      },
      {
        "day": "Ден 7",
        "text": "Долината на смъртта, Бейкърсфийлд."
      },
      {
        "day": "Ден 8–9",
        "text": "Йосемити, Сан Франциско (Голдън Гейт, Алкатрас факулт.)."
      },
      {
        "day": "Ден 10–12",
        "text": "Монтерей, Карсбад, Санта Барбара, Малибу, Санта Моника. Лос Анджелис."
      },
      {
        "day": "Ден 13–14",
        "text": "Факулт. Сан Диего. Полет обратно за България."
      }
    ],
    "includes": [
      "Самолетен билет и летищни такси (23 кг + 7 кг)",
      "12 нощувки с закуски",
      "Всички трансфери",
      "Автобус с климатик",
      "Водач на български",
      "Задължителна медицинска застраховка"
    ],
    "excludes": [
      "Американска виза (185 USD)",
      "Пакет факулт. екскурзии (599 лв.)",
      "Единична стая (1549 лв.)",
      "Лични разходи"
    ],
    "departures": [
      "Лос Анджелис (чартър или редовен)"
    ],
    "hotels": [
      {
        "name": "3★ хотели по маршрута (Супър 8, Дейс Ин, Тропикана)",
        "board": "Закуска",
        "price_bgn": 5799,
        "price_eur": 2965,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_sasht-%E2%80%93-zapaden-bryag-1_1740054319404.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 9,
    "refNum": "Е380",
    "title": "САЩ и Канада – Новият свят",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "nature"
    ],
    "destination": "САЩ / Канада",
    "country": "usa",
    "duration": "15 дни / 13 нощувки",
    "days": 15,
    "nights": 13,
    "price_bgn": 6999,
    "price_eur": 3579,
    "dates": [
      "2026-09-12"
    ],
    "next_date": "2026-09-12",
    "transport": "plane",
    "description": "Грандиозно пътешествие из Новия свят – Ню Йорк, Бостън, Монреал, Квебек, Ниагарски водопад, Торонто, Вашингтон, Филаделфия, с водач на български. Амишки дом с вечеря и захарна ферма в Квебек.",
    "program": [
      {
        "day": "Ден 1–3",
        "text": "Полет до Ню Йорк. Обиколка от Даунтаун до Ъптаун. Пътуване до Бостън и Харвард."
      },
      {
        "day": "Ден 4–6",
        "text": "Монреал; Квебек (захарна ферма). Оттава и пристигане Торонто."
      },
      {
        "day": "Ден 7–8",
        "text": "Ниагара-он-де-Лейк и Ниагарски водопад (факулт. лодка). Преминаване в САЩ."
      },
      {
        "day": "Ден 9–11",
        "text": "Ланкастър с амишки музей и вечеря; Гетисбърг; Вашингтон обиколка вечер и сутринта."
      },
      {
        "day": "Ден 12–14",
        "text": "Филаделфия; свободно в Ню Йорк."
      },
      {
        "day": "Ден 15",
        "text": "Трансфер на летище; полет за България."
      }
    ],
    "includes": [
      "Самолетен билет с летищни такси (23 кг + 7 кг)",
      "Закуски навсякъде",
      "Обиколки Ню Йорк, Бостън, Монреал, Оттава, Гетисбърг, Вашингтон, Филаделфия",
      "Амишки дом с вечеря",
      "Захарна ферма Квебек с вечеря",
      "Медицинска застраховка",
      "Водач на български"
    ],
    "excludes": [
      "Американска виза (185 USD)",
      "Пакет факулт. (599 лв.)",
      "Единична стая (1690 лв.)",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "3-4★ хотели по маршрута (Best Western, Holiday Inn, Howard Johnson)",
        "board": "Закуска",
        "price_bgn": 6999,
        "price_eur": 3579,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_sasht-i-kanada%E2%80%93noviyat-svyat-1_1725350463380.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 13,
    "refNum": "Е613",
    "title": "САЩ – Бостън, Ню Йорк, Вашингтон, Маями + Торонто и Ниагара",
    "category": "exotic",
    "tags": [
      "city",
      "culture",
      "nature"
    ],
    "destination": "САЩ / Канада – Изток + Маями",
    "country": "usa",
    "duration": "14 дни / 12 нощувки",
    "days": 14,
    "nights": 12,
    "price_bgn": 10151,
    "price_eur": 5190,
    "dates": [
      "2026-09-02",
      "2026-09-17",
      "2026-10-16"
    ],
    "next_date": "2026-09-02",
    "transport": "plane",
    "description": "Мегатур по американското и канадско изток – Бостън с Харвард, Ню Йорк (2 обиколки + SUMMIT панорамна), Вашингтон, Маями с Литъл Хавана, Ниагарски водопад с хеликоптер (факулт.) и Торонто. 14 дни с Lufthansa.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет до Бостън. Харвард, Bunker Hill, Freedom Trail. Нюпорт, пристигане Ню Йорк."
      },
      {
        "day": "Ден 3–4",
        "text": "Ню Йорк: Централ Парк, 5-та авеню, Рокфелер. SUMMIT обсерватория, Гранд Централ, Бруклин Бридж."
      },
      {
        "day": "Ден 5",
        "text": "Статуята на свободата и Елис Айлънд. Филаделфия."
      },
      {
        "day": "Ден 6–7",
        "text": "Вашингтон – Капитола, мемориали, Арлингтон. Полет до Маями."
      },
      {
        "day": "Ден 8–9",
        "text": "Маями – Литъл Хавана, Ocean Drive Art Deco. Свободен плажен ден."
      },
      {
        "day": "Ден 10–11",
        "text": "Полет до Торонто. Ниагара-он-де-Лейк, Ниагарски водопад, Флорален часовник."
      },
      {
        "day": "Ден 12–13",
        "text": "Торонто – CN Tower, Rogers Centre, St. Lawrence Market."
      },
      {
        "day": "Ден 14",
        "text": "Полет Toronto → Sofia."
      }
    ],
    "includes": [
      "Lufthansa полети (Sofia→Boston; Wash→Miami; Miami→Toronto; Toronto→Sofia)",
      "12 нощи 3★ хотели с закуска",
      "Трансфери и автобус",
      "SUMMIT обсерватория",
      "Статуята на свободата + Елис Айлънд",
      "Метро карти Ню Йорк",
      "Водач и местни гидове",
      "Медицинска застраховка (€30 000)"
    ],
    "excludes": [
      "Американска виза (~$185)",
      "Факулт. хеликоптер Ниагара (€150)",
      "Бакшиши",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "3★ хотели по маршрута (Hyatt Place Boston, Hotel Belleclaire NYC, Hampton Inn DC, Marriott Niagara, Eurostars Miami, Element Toronto)",
        "board": "Закуска",
        "price_bgn": 10151,
        "price_eur": 5190,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_sasht-%E2%80%93-iztochno-kraybrezhie-%E2%80%93-nyu-york-bostan-vash-1_1765966575613.png"
      }
    ],
    "featured": false
  },
  {
    "id": 14,
    "refNum": "Е127",
    "title": "САЩ – Източно и Западно крайбрежие с круиз по Бахамите",
    "category": "exotic",
    "tags": [
      "city",
      "culture",
      "cruise",
      "nature"
    ],
    "destination": "САЩ – цялата страна + Бахами",
    "country": "usa",
    "duration": "30 дни / 28 нощувки",
    "days": 30,
    "nights": 28,
    "price_bgn": 19440,
    "price_eur": 9940,
    "dates": [
      "2026-07-10",
      "2026-08-14"
    ],
    "next_date": "2026-07-10",
    "transport": "plane",
    "description": "Грандиозно 30-дневно пътешествие из цяла Америка – Ню Йорк, Филаделфия, Вашингтон, Ниагарски водопад, Чикаго, Сан Франциско, Лас Вегас, Лос Анджелис, Маями и круиз по Бахамите с Royal Caribbean.",
    "program": [
      {
        "day": "Ден 1–3",
        "text": "Полет Sofia→Rome→NYC. Манхатън обиколки."
      },
      {
        "day": "Ден 4–7",
        "text": "Филаделфия, Вашингтон, Ниагарски водопад."
      },
      {
        "day": "Ден 8–11",
        "text": "Чикаго, Сан Франциско, Залив."
      },
      {
        "day": "Ден 12–17",
        "text": "Лас Вегас, Гранд Каньон, Лос Анджелис/Холивуд."
      },
      {
        "day": "Ден 18–23",
        "text": "Маями, качване на кораб, круиз Coco Cay и Насау (Бахами)."
      },
      {
        "day": "Ден 24–30",
        "text": "Завръщане Маями → Рим → София."
      }
    ],
    "includes": [
      "Международни полети + 6 вътрешни",
      "28 нощи (3-4★ хотели + 4 нощи на кораб)",
      "27 закуски, 5 обяда, 4 вечери",
      "Всички трансфери и екскурзии по програмата",
      "Водач на български"
    ],
    "excludes": [
      "Американска виза (304 лв.)",
      "Застраховка",
      "Факулт. (Бродуей, студийни обиколки, хеликоптер)",
      "Бакшиши"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "3-4★ хотели по маршрута + Mariner of the Seas (Royal Caribbean)",
        "board": "27 закуски / 5 обяда / 4 вечери",
        "price_bgn": 19440,
        "price_eur": 9940,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-sasht-iztochno-i-zapadno-kraybrezhie-s-kr-1_1671100359127.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 22,
    "refNum": "П1158",
    "title": "Сейшелите – екзотична почивка сред райски плажове",
    "category": "exotic",
    "tags": [
      "beach",
      "luxury",
      "nature"
    ],
    "destination": "о-в Махе, Сейшели",
    "country": "seychelles",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 3345,
    "price_eur": 1710,
    "dates": [
      "2026-08-11",
      "2026-08-13",
      "2026-08-25",
      "2026-09-03"
    ],
    "next_date": "2026-08-11",
    "transport": "plane",
    "description": "7 нощи на о-в Махе, Сейшели – кристалночисто Индийско море, гранитни скали и тропическа природа. Избор от 4-5★ хотели с включени закуски и трансфери.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване от София с Turkish Airlines."
      },
      {
        "day": "Ден 2",
        "text": "Пристигане Махе, трансфер, настаняване."
      },
      {
        "day": "Ден 3–7",
        "text": "Свободни плажни дни. Факулт.: обиколка на Махе, рифно сафари, Praslin и La Digue."
      },
      {
        "day": "Ден 8",
        "text": "Закуска, освобождаване, трансфер, полет за България."
      }
    ],
    "includes": [
      "Самолетен билет с летищни такси (23 кг)",
      "7 нощи с закуска",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Лични разходи",
      "Обяд и вечеря",
      "Факулт. екскурзии"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Berjaya Beau Vallon Bay Resort & Casino ★★★",
        "board": "Закуска",
        "price_bgn": 3345,
        "price_eur": 1710,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1779964361161.jpg"
      },
      {
        "name": "Coral Strand Smart Choice ★★★★",
        "board": "Закуска",
        "price_bgn": 3468,
        "price_eur": 1773,
        "image": "https://www.marveltourbg.com/img/OBEKTI/IMG_167307961261.jpg"
      },
      {
        "name": "Bliss Boutique Hotel Seychelles ★★★★",
        "board": "Закуска",
        "price_bgn": 3855,
        "price_eur": 1971,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1779966499163.jpg"
      },
      {
        "name": "Crown Beach Hotel Seychelles ★★★★",
        "board": "Закуска",
        "price_bgn": 3952,
        "price_eur": 2021,
        "image": "https://www.marveltourbg.com/img/OBEKTI/568702392_1779966359162.jpg"
      },
      {
        "name": "Savoy Seychelles Resort & Spa ★★★★★",
        "board": "Закуска",
        "price_bgn": 4526,
        "price_eur": 2314,
        "image": "https://www.marveltourbg.com/img/OBEKTI/IMG_167307940060.jpg"
      },
      {
        "name": "Kempinski Seychelles Resort ★★★★★",
        "board": "Закуска",
        "price_bgn": 4899,
        "price_eur": 2505,
        "image": "https://www.marveltourbg.com/img/OBEKTI/IMG_167316409063.jpg"
      },
      {
        "name": "Constance Ephelia ★★★★★",
        "board": "Закуска",
        "price_bgn": 5170,
        "price_eur": 2643,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1779966687164.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 26,
    "refNum": "П1150",
    "title": "Вкусът на Азия – Виетнам и Камбоджа (12 нощувки)",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Виетнам / Камбоджа",
    "country": "vietnam",
    "duration": "14 дни / 12 нощувки",
    "days": 14,
    "nights": 12,
    "price_bgn": 5259,
    "price_eur": 2689,
    "dates": [
      "2026-11-12",
      "2026-11-25",
      "2026-12-01",
      "2027-01-09",
      "2027-01-19",
      "2027-02-03",
      "2027-02-17"
    ],
    "next_date": "2026-11-12",
    "transport": "plane",
    "description": "Мащабна обиколка на Виетнам и Камбоджа за 14 дни – Хошимин, Фном Пен, Ангкор Ват, Дананг, Хой Ан, Ниин Бин, круиз в Халонг и Ханой. 12 нощи в 4★ хотели и луксозен круизен кораб.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет до Хошимин. Настаняване."
      },
      {
        "day": "Ден 3",
        "text": "Хошимин – Военен музей, Дворец на обединението, катедрала."
      },
      {
        "day": "Ден 4",
        "text": "Делта на Меконг с кулинарен клас."
      },
      {
        "day": "Ден 5–6",
        "text": "Пграничен преход Камбоджа – Фном Пен (Кралски дворец, Национален музей)."
      },
      {
        "day": "Ден 7–8",
        "text": "Ангкор Ват и Ангкор Том. Езерото Тонле Сап."
      },
      {
        "day": "Ден 9–10",
        "text": "Дананг и Хой Ан (стар град, Ба На Хилс факулт.)."
      },
      {
        "day": "Ден 11",
        "text": "Ниин Бин – Хоа Лу и Тан Коа."
      },
      {
        "day": "Ден 12–13",
        "text": "Луксозен круиз Халонг с таи-чи и пещери."
      },
      {
        "day": "Ден 14",
        "text": "Ханой. Полет за България."
      }
    ],
    "includes": [
      "Turkish Airlines + вътрешни полети",
      "12 нощи + 1 нощ круиз с закуски",
      "Ръководни обиколки с English гидове",
      "Входни такси",
      "Медицинска застраховка (€10 000)"
    ],
    "excludes": [
      "Cambodia виза (45 USD)",
      "Такса обработка ($91)",
      "Наушници ($3/ден)",
      "Факулт. Ку Чи, Ба На Хилс",
      "Бакшиши"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Saigon Prince 4★ + Duong Chan 4★ + Lotus Blanc 4★ + Anmira Resort 4★ + La Casta Cruise + Ninh Binh Hidden Charm 4★ + Army Hotel 4★",
        "board": "Закуска",
        "price_bgn": 5259,
        "price_eur": 2689,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3200/gallery/PYNUJRD2.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 27,
    "refNum": "Е207",
    "title": "Виетнам – Ханой, Хюе, Хой Ан, Дананг, Златния мост и Сайгон",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Виетнам",
    "country": "vietnam",
    "duration": "11 дни / 8 нощувки",
    "days": 11,
    "nights": 8,
    "price_bgn": 5660,
    "price_eur": 2894,
    "dates": [
      "2026-09-07",
      "2026-10-16"
    ],
    "next_date": "2026-09-07",
    "transport": "plane",
    "description": "Изчерпателна 11-дневна обиколка на Виетнам – Ханой, круиз в Халонг, UNESCO Хюе, Хой Ан, Ба На Хилс с Золотния мост, и Хошимин. Полет с Qatar Airways до Ханой и обратно от Хошимин.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет Sofia→Doha→Hanoi. Пристигане и настаняване."
      },
      {
        "day": "Ден 3",
        "text": "Ханой – храмове и исторически забележителности."
      },
      {
        "day": "Ден 4",
        "text": "Круиз в залива Халонг (UNESCO)."
      },
      {
        "day": "Ден 5",
        "text": "Вътрешен полет до Хюе; речен круиз и Императорски гробници."
      },
      {
        "day": "Ден 6",
        "text": "Хой Ан пеша; Дананг с Музея на Чам."
      },
      {
        "day": "Ден 7",
        "text": "Ба На Хилс комплекс с Золотния мост."
      },
      {
        "day": "Ден 8–9",
        "text": "Хошимин обиколка; факулт. Ку Чи или речен круиз."
      },
      {
        "day": "Ден 10–11",
        "text": "Полет Ho Chi Minh→Hanoi→Doha→Sofia."
      }
    ],
    "includes": [
      "Полети + трансфери",
      "8 нощи 3-4★ хотели с закуска",
      "1 обяд, 3 вечери",
      "Круиз Халонг",
      "Всички обиколки по програмата",
      "Местни гидове"
    ],
    "excludes": [
      "Медицинска застраховка",
      "Ку Чи тунели и Меконг (факулт.)",
      "Единична стая (900 лв./460 €)"
    ],
    "departures": [
      "София (Летище Т2, 19:15)"
    ],
    "hotels": [
      {
        "name": "3-4★ хотели по маршрута",
        "board": "Закуска",
        "price_bgn": 5660,
        "price_eur": 2894,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_vietnam-1_1770637809207.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 29,
    "refNum": "Е681",
    "title": "Виетнам – Златния мост, Халонг, Ханой, Хой Ан и почивка на о-в Фу Куок",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "beach"
    ],
    "destination": "Виетнам – Ханой / Хой Ан / Фу Куок",
    "country": "vietnam",
    "duration": "15 дни / 12 нощувки",
    "days": 15,
    "nights": 12,
    "price_bgn": 7021,
    "price_eur": 3590,
    "dates": [
      "2026-11-16",
      "2027-03-12"
    ],
    "next_date": "2026-11-16",
    "transport": "plane",
    "description": "15 дни – пълна програма с всичко най-добро от Виетнам: Ханой, Ниин Бин, нощен круиз Халонг с яхта, Ба На Хилс с Золотния мост, Хой Ан, Хошимин и 3 дни релакс на тропическия о-в Фу Куок.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет до Ханой. Обиколка с кукленото водно театро."
      },
      {
        "day": "Ден 3",
        "text": "Ниин Бин – Хоа Лу и Танг Ан екологичен комплекс."
      },
      {
        "day": "Ден 4–5",
        "text": "Нощен круиз Paradise Elegance 5★ в Халонг с перлена ферма и каяк."
      },
      {
        "day": "Ден 6",
        "text": "Ба На Хилс с Золотния мост. Хой Ан вечерна церемония с фенери."
      },
      {
        "day": "Ден 7",
        "text": "Мраморни планини. Полет до Хошимин."
      },
      {
        "day": "Ден 8",
        "text": "Меконг с традиционни занаяти. Река Сайгон круиз."
      },
      {
        "day": "Ден 9",
        "text": "Хошимин – Дворец на независимостта."
      },
      {
        "day": "Ден 10–12",
        "text": "Фу Куок 5★ – свободни плажни дни."
      },
      {
        "day": "Ден 13–15",
        "text": "Полет обратно за България."
      }
    ],
    "includes": [
      "Turkish Airlines + вътрешни полети",
      "12 нощи 4-5★ хотели с закуски",
      "6 обяда, 4 вечери",
      "Медицинска застраховка (€30 000)",
      "Водач на български"
    ],
    "excludes": [
      "Vietnam виза (€40)",
      "Бакшиши",
      "Лични разходи",
      "Факулт. екскурзии"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Silk Path Hanoi 4★ + Paradise Elegance Cruise 5★ + Belle Maison Hadana 4★ + Palace Hotel Saigon 4★ + Novotel Phu Quoc 5★",
        "board": "Закуска",
        "price_bgn": 7021,
        "price_eur": 3590,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_vietnam%E2%80%93-zlatniyat-most-kruiz-v-ha-long-bey-hanoy-ho-1_1772615892681.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 33,
    "refNum": "Е684",
    "title": "Опознай Индия – Делхи, Агра, Джайпур, Джодхпур, Удайпур",
    "category": "exotic",
    "tags": [
      "culture",
      "adventure",
      "nature"
    ],
    "destination": "Индия – Голям тур",
    "country": "india",
    "duration": "14 дни / 11 нощувки",
    "days": 14,
    "nights": 11,
    "price_bgn": 4209,
    "price_eur": 2152,
    "dates": [
      "2026-09-29",
      "2026-10-17"
    ],
    "next_date": "2026-09-29",
    "transport": "plane",
    "description": "Мащабна 14-дневна обиколка на Индия – Делхи, Тадж Махал, Джайпур с крепост Амбър, Пушкар, Джодхпур, Ранакпур, лодъчна разходка на езерото Удайпур и Сити Пале. 4★ хотели, закуска и вечеря.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет до Делхи. Настаняване."
      },
      {
        "day": "Ден 3",
        "text": "Стар Делхи – Червен форт, Джама Масджид."
      },
      {
        "day": "Ден 4–5",
        "text": "Агра – залез в Мехтаб Баг, Тадж Махал и Агра форт."
      },
      {
        "day": "Ден 6",
        "text": "Фатехпур Сикри и Абханери по пътя към Джайпур."
      },
      {
        "day": "Ден 7",
        "text": "Джайпур – Амбър форт с жийп, Хава Махал, Сити Пале."
      },
      {
        "day": "Ден 8",
        "text": "Пушкар – Свещеното езеро и Храмът на Брахма."
      },
      {
        "day": "Ден 9",
        "text": "Джодхпур – форт Мехрангарх и дворец."
      },
      {
        "day": "Ден 10",
        "text": "Ранакпур (джайнски храм); пристигане Удайпур."
      },
      {
        "day": "Ден 11",
        "text": "Удайпур – Сити Пале, лодъчна разходка."
      },
      {
        "day": "Ден 12–14",
        "text": "Полет Удайпур→Делхи. Отпътуване за България."
      }
    ],
    "includes": [
      "Полети + вътрешен полет Удайпур–Делхи",
      "11 нощи 4★ хотели с закуска и вечеря",
      "Частен транспорт и входни такси",
      "Жийп Амбър форт",
      "Лодъчна разходка Удайпур",
      "Медицинска застраховка"
    ],
    "excludes": [
      "India виза (€56.24)",
      "Камера такси",
      "Бакшиши (~€8/ден)",
      "Факулт. яздене на слон"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "4★ хотели по маршрута (Zone Connect Delhi, Hotel Saura Agra, Ramada Jaipur, Park Plaza Jodhpur, Regenta Udaipur)",
        "board": "Закуска + вечеря",
        "price_bgn": 4209,
        "price_eur": 2152,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-indiya-zlatniyat-triagalnik-s-vodach-ot-ba-1_1765964324610.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 34,
    "refNum": "Е250",
    "title": "Екскурзия – Остров Бали (7 екскурзии включени в цената)",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "о-в Бали, Индонезия",
    "country": "indonesia",
    "duration": "11 дни / 8 нощувки",
    "days": 11,
    "nights": 8,
    "price_bgn": 4477,
    "price_eur": 2290,
    "dates": [
      "2026-09-01",
      "2026-09-22",
      "2026-10-05"
    ],
    "next_date": "2026-09-01",
    "transport": "plane",
    "description": "Бали с 7 включени екскурзии – горски лемури, тераси ориз Тегалаланг, балийски люлки, водопади, свещени храмове, кралски водни градини и залез на Семиняк. Водач на български, 4★ хотели.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет до Бали."
      },
      {
        "day": "Ден 2",
        "text": "Пристигане, настаняване в Убуд."
      },
      {
        "day": "Ден 3",
        "text": "Горски лемури, Тегалаланг тераси, Балийски люлки, танц Кечак."
      },
      {
        "day": "Ден 4",
        "text": "Музей Пури Лукисан, водопад Таман Сари, храм Гоа Гаджах."
      },
      {
        "day": "Ден 5",
        "text": "Храм Гунунг Кауи, свещен извор Тирта Емпул."
      },
      {
        "day": "Ден 6",
        "text": "Езерата Буян и Тамблинган, гора Мундук, храм Улун Дану Братан."
      },
      {
        "day": "Ден 7",
        "text": "Амед гмуркане, кралски градини Тирта Ганга."
      },
      {
        "day": "Ден 8",
        "text": "Пазаруване, преместване Семиняк, залез на плажа."
      },
      {
        "day": "Ден 9–11",
        "text": "Нуса Дуа плаж. Полет обратно за България."
      }
    ],
    "includes": [
      "Полети Sofia–Bali (23 кг)",
      "8 нощи 4★ с закуска",
      "7 целодневни екскурзии с входни такси",
      "Транспорт по програмата",
      "Медицинска застраховка (€15 000)"
    ],
    "excludes": [
      "Виза Бали (на място)",
      "Факулт. сърф (€50/ден)",
      "Застраховка „Отмяна\"",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Rama Phala Resort & Spa ★★★★ (Убуд) + Hotel Puri Raja ★★★ (Семиняк)",
        "board": "Закуска",
        "price_bgn": 4477,
        "price_eur": 2290,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-ostrov-bali%E2%80%937-ekskurzii-vklyucheni-v-tse-1_1747728721250.jpg"
      }
    ],
    "featured": true
  },
  {
    "id": 37,
    "refNum": "Е301",
    "title": "Китай – Необятно разнообразие",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "cruise"
    ],
    "destination": "Китай – Шанхай / Янцзъ / Сиан / Пекин",
    "country": "china",
    "duration": "14 дни / 11 нощувки",
    "days": 14,
    "nights": 11,
    "price_bgn": 3608,
    "price_eur": 1845,
    "dates": [
      "2026-07-07",
      "2026-08-11",
      "2026-08-23",
      "2026-09-06",
      "2026-09-14",
      "2026-10-26",
      "2026-11-01",
      "2026-11-09",
      "2026-11-15"
    ],
    "next_date": "2026-07-07",
    "transport": "plane",
    "description": "Китай в цялото му величие – Шанхай с воден град Джуцзяцяо, 4-нощен круиз по река Янцзъ, древният Сиан с Теракотената армия и Пекин с Великата Китайска стена и Забранения град.",
    "program": [
      {
        "day": "Ден 1–3",
        "text": "Полет до Шанхай. Водният Джуцзяцяо, Бундът, Нанкин Блевар. Качване на круиз."
      },
      {
        "day": "Ден 4–7",
        "text": "Круиз по Янцзъ: язовир Три клисури, ждрелото Синлин, р. Шънnonг."
      },
      {
        "day": "Ден 8–9",
        "text": "Сиан – Теракотената армия, Пагода Дива Гъска, Мюсюлмански квартал."
      },
      {
        "day": "Ден 10–12",
        "text": "Пекин – Летен дворец, Великата стена (факулт.), Тянанмън, Забранен град."
      },
      {
        "day": "Ден 13–14",
        "text": "Полет обратно за България."
      }
    ],
    "includes": [
      "Самолетен билет (23 кг + 7 кг)",
      "4★ хотели + 4★ круизен кораб",
      "Закуски в хотели, пълен пансион на кораба",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Пакет факулт. екскурзии (479 лв.)",
      "Пакет вечери (379 лв.)",
      "Круизна такса (€25)",
      "Сервизна такса (€5/ден)",
      "Единична стая (899 лв.)"
    ],
    "departures": [
      "България (Летище)"
    ],
    "hotels": [
      {
        "name": "Zhong Xiang Grand Hotel Shanghai + 4★ President/Victoria Cruises + Titan Jincheng Art Hotel Xian + Riverside Hotel Beijing",
        "board": "Закуска (пълен пансион на кораб)",
        "price_bgn": 3608,
        "price_eur": 1845,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay%E2%80%93neobyatno-raznoobrazie-1_1752043221301.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 38,
    "refNum": "Е669",
    "title": "Кунг Фу и Панди – Шанхай, Чънду, Сиан, Лоян, Пекин",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Китай – Шанхай / Чънду / Сиан / Пекин",
    "country": "china",
    "duration": "15 дни / 12 нощувки",
    "days": 15,
    "nights": 12,
    "price_bgn": 4899,
    "price_eur": 2505,
    "dates": [
      "2026-06-28"
    ],
    "next_date": "2026-06-28",
    "transport": "plane",
    "description": "Китай за ценителите – гигантски панди в Чънду, монасите Шаолин с кунг фу, Теракотената армия, Пещерите Лунмън и Великата стена. Шанхай, Чунцин, Чънду, Сиан, Лоян и Пекин за 15 дни.",
    "program": [
      {
        "day": "Ден 1–3",
        "text": "Полет до Шанхай. Обиколка: Нефритов Буда, Ю Градина, Нанкин Рд, Бундът. Чунцин."
      },
      {
        "day": "Ден 4–6",
        "text": "База за панди Чънду; чайна церемония Народен парк. Скоростен влак Сиан."
      },
      {
        "day": "Ден 7",
        "text": "Теракотената армия, Пагода Дива Гъска, Мюсюлмански квартал."
      },
      {
        "day": "Ден 8",
        "text": "Скоростен влак Лоян – Пещерите Лунмън."
      },
      {
        "day": "Ден 9",
        "text": "Шаолин Monastery с кунг фу шоу. Скоростен влак Пекин."
      },
      {
        "day": "Ден 10–11",
        "text": "Великата стена; Нефритова фабрика; Олимпийски комплекс; Пекинска патица."
      },
      {
        "day": "Ден 12–13",
        "text": "Тянанмън, Забранен град, Традиционна медицина, Хутун."
      },
      {
        "day": "Ден 14–15",
        "text": "Храм на Небето, Летен дворец. Полет обратно."
      }
    ],
    "includes": [
      "Самолетен билет Sofia–Shanghai–Beijing v.v.",
      "11 нощи 4★ Jin Jiang Metropolo с закуска и 12 вечери",
      "Всички входни такси",
      "Скоростни влакове",
      "Трансфери",
      "Местни гидове и водач"
    ],
    "excludes": [
      "Факулт. (речен круиз, опера, 80 USD бакшиш)",
      "Напитки при ядене",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Jin Jiang Metropolo Hua Ting ★★★★",
        "board": "Закуска + 12 вечери",
        "price_bgn": 4899,
        "price_eur": 2505,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-pekin-i-shankhay-1_1779365599669.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 39,
    "refNum": "Е715",
    "title": "Китай, Хон Конг и Макао",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Китай – Пекин / Сиан / Шанхай / Макао / Хон Конг",
    "country": "china",
    "duration": "13 дни / 10 нощувки",
    "days": 13,
    "nights": 10,
    "price_bgn": 4999,
    "price_eur": 2556,
    "dates": [
      "2026-08-26",
      "2026-09-02",
      "2026-09-04",
      "2026-09-11",
      "2026-09-17",
      "2026-10-10",
      "2026-10-17",
      "2026-10-27"
    ],
    "next_date": "2026-08-26",
    "transport": "plane",
    "description": "13 дни в Китай – Пекин (Великата стена, Забранен град), Сиан (Теракотена армия), Шаолин Monastery, Шанхай, пресичане до Макао и Хон Конг. 4★ хотели с водач.",
    "program": [
      {
        "day": "Ден 1–4",
        "text": "Пекин: Великата стена, Тянанмън, Забранен град, Летен дворец, Хутун рикша."
      },
      {
        "day": "Ден 5–6",
        "text": "Сиан: Теракотена армия, Джамия, Дива Гъска Пагода; Лоян: Пещерите Лунмън."
      },
      {
        "day": "Ден 7",
        "text": "Шаолин Monastery с кунг фу; полет Шанхай."
      },
      {
        "day": "Ден 8–10",
        "text": "Шанхай: Джуцзяцяо воден град, Ю Градина, Бундът, Нанкин Рд."
      },
      {
        "day": "Ден 11",
        "text": "Полет Макао; тур; фери Хон Конг."
      },
      {
        "day": "Ден 12",
        "text": "Хон Конг: Виктория Пийк, Victoria Harbour. Полет за България."
      },
      {
        "day": "Ден 13",
        "text": "Пристигане в България."
      }
    ],
    "includes": [
      "Turkish Airlines Sofia→Beijing; Hong Kong→Sofia (30 кг)",
      "Вътрешни полети + влакове + фери Макао–ХК",
      "10 нощи 4★ с закуски и 11 вечери",
      "Всички входни такси",
      "Водач с превод на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Хуангпу речен круиз (€48.58 факулт.)",
      "Ориентал Пърл Тауър (€38.35)",
      "Акробатично шоу (€56.24)",
      "Шаолин Зен шоу (€58.80)",
      "Бакшиши (€6/ден задължителни)",
      "China виза"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Metropark Lido Beijing 4★ + Tian Central Park Xian 4★ + Shaolin International Dengfeng 4★ + Shaanxi Business Shanghai 4★ + Harbour Plaza 8 Degrees HK 4★",
        "board": "Закуска + 11 вечери",
        "price_bgn": 4999,
        "price_eur": 2556,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-1._1777270516715.jpeg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-1._1777270516715.jpeg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-2._1777270516715.jpeg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-3_1777270516715.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-4_1777270516715.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-5_1777270516715.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-6._1777270516715.jpeg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-7._1777270516715.jpeg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-8_1777270516715.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-hong-kong-i-makao-9._1777270516715.jpeg"
    ],
    "featured": false
  },
  {
    "id": 40,
    "refNum": "Е671",
    "title": "Китай и Планините от Аватар – Джангдзяцзи",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Китай – Пекин / Джангдзяцзи / Шанхай",
    "country": "china",
    "duration": "12 дни / 10 нощувки",
    "days": 12,
    "nights": 10,
    "price_bgn": 5199,
    "price_eur": 2658,
    "dates": [
      "2026-09-07",
      "2026-09-20",
      "2026-10-05"
    ],
    "next_date": "2026-09-07",
    "transport": "plane",
    "description": "Китай включително планините от „Аватар\" в Джангдзяцзи – стъкленият мост над Гранд Каньона, асансьорът Байлонг, езерото Дъга и стъклената разходка на Тянмън Шан. Плюс Пекин и Шанхай.",
    "program": [
      {
        "day": "Ден 1–4",
        "text": "Пекин: Тянанмън, Забранен град, Летен дворец, Великата стена, Олимпийски парк."
      },
      {
        "day": "Ден 5–6",
        "text": "Лоян: Пещерите Лунмън; Шаолин с кунг фу; влак Сиан."
      },
      {
        "day": "Ден 7",
        "text": "Сиан: Теракотена армия, Стенен корон, Дива Гъска, Полет Джангдзяцзи."
      },
      {
        "day": "Ден 8",
        "text": "Джангдзяцзи – Горски парк, Поток Злато, Асансьор Байлонг."
      },
      {
        "day": "Ден 9",
        "text": "Стъклен мост Гранд Каньон, Дъгово езеро."
      },
      {
        "day": "Ден 10",
        "text": "Тянмън Шан и стъклена разходка. Полет Шанхай."
      },
      {
        "day": "Ден 11–12",
        "text": "Шанхай: Ю Градина, Бундът, Нефритова Буда. Полет за България."
      }
    ],
    "includes": [
      "Полети Sofia–Beijing/Shanghai v.v. (20 кг)",
      "10 нощи хотели с закуска + 10 вечери + 9 обяда",
      "Всички трансфери и влакове",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факулт. (Золотна Маска Шоу 100 лв., Хуангпу круиз 99 лв.)",
      "Бакшиши (80 USD)",
      "Лични разходи"
    ],
    "departures": [
      "България (Летище)"
    ],
    "hotels": [
      {
        "name": "Metro Lido Hotel Beijing ★★★★ + хотели по маршрута",
        "board": "Закуска + 10 вечери",
        "price_bgn": 5199,
        "price_eur": 2658,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_kitay-pekin-i-shankhay-1_1779365599669.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 41,
    "refNum": "Е603",
    "title": "Екскурзия в Китай, Хон Конг и Макао с посещение на Шаолин – с водач от България",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Китай – Пекин / Сиан / Шанхай / Хон Конг",
    "country": "china",
    "duration": "11 дни / 8 нощувки",
    "days": 11,
    "nights": 8,
    "price_bgn": 5611,
    "price_eur": 2869,
    "dates": [
      "2026-10-02",
      "2026-11-13",
      "2027-03-11",
      "2027-03-17",
      "2027-03-20",
      "2027-04-14"
    ],
    "next_date": "2026-10-02",
    "transport": "plane",
    "description": "11 дни в Китай с водач на български – Пекин (Тянанмън, Забранен град, Великата стена), Сиан (Теракотена армия), Шаолин Monastery, Шанхай, Макао и Хон Конг.",
    "program": [
      {
        "day": "Ден 1–3",
        "text": "Полет до Пекин. Тянанмън, Забранен град, Летен дворец, Великата стена Джиншанлинг."
      },
      {
        "day": "Ден 4",
        "text": "Сиан: Теракотена армия, Мюсюлмански квартал."
      },
      {
        "day": "Ден 5",
        "text": "Шаолин Monastery, Пещерите Лунмън; влак Шанхай."
      },
      {
        "day": "Ден 6–7",
        "text": "Шанхай: Нефритова Буда, Ю Градина, Бундът."
      },
      {
        "day": "Ден 8",
        "text": "Свободно Шанхай."
      },
      {
        "day": "Ден 9",
        "text": "Фери Макао – Тук-Тук обиколка, А-Ма храм; фери Хон Конг."
      },
      {
        "day": "Ден 10–11",
        "text": "Хон Конг: Виктория Пийк, Aberdeen. Полет за Bulgaria."
      }
    ],
    "includes": [
      "Turkish Airlines/Qatar Sofia→Beijing; HK→Sofia (30 кг)",
      "Скоростни влакове",
      "8 нощи 4★ с закуска + 5 вечери + 2 обяда",
      "Всички входни такси",
      "Водач от България",
      "Медицинска застраховка (€30 000)"
    ],
    "excludes": [
      "Шанхай Тауър (139 лв. факулт.)",
      "Жълта Рика круиз (139 лв.)",
      "China виза",
      "Бакшиши (5 USD/ден)"
    ],
    "departures": [
      "София (Летище Т2, 21:15)"
    ],
    "hotels": [
      {
        "name": "Zhongle Six Star Beijing 4★ + Huiyuan Jinjiang Xian 4★ + Vienna Classic Luoyang 4★ + Shanghai Baolong 4★ + Harbour Plaza HK 4★",
        "board": "Закуска + 5 вечери",
        "price_bgn": 5611,
        "price_eur": 2869,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-kitay-kitay-honkong-i-makao-s-poseshtenie--1_1765963569603.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 43,
    "refNum": "Е540",
    "title": "Екскурзия в Китай – тайните на Изтока с посещение на Шаолин",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Китай – Чънду / Сиан / Пекин / Шанхай / Хон Конг",
    "country": "china",
    "duration": "15 дни / 12 нощувки",
    "days": 15,
    "nights": 12,
    "price_bgn": 6628,
    "price_eur": 3389,
    "dates": [
      "2026-10-18"
    ],
    "next_date": "2026-10-18",
    "transport": "plane",
    "description": "15 дни в Китай – Великата стена, Шаолин Monastery, Теракотената армия, Чайна плантация Ханджоу, Шанхай, Макао и Хон Конг. Qatar Airways, 4★ хотели, пълна програма с водач.",
    "program": [
      {
        "day": "Ден 1–4",
        "text": "Полет до Пекин. Великата стена Джиншанлинг, Летен дворец, Тянанмън, Забранен град."
      },
      {
        "day": "Ден 5–6",
        "text": "Сиан: Теракотена армия, Дива Гъска Пагода, Стени; Лоян: Пещерите Лунмън."
      },
      {
        "day": "Ден 7–8",
        "text": "Шаолин Monastery с кабинков лифт; Ханджоу: чайна плантация, езерото Уест, Линин Храм."
      },
      {
        "day": "Ден 9–10",
        "text": "Сучжоу: каналите и Градина Мрежа Мастер; Шанхай: Ю Градина, Нефритова Буда, Бундът."
      },
      {
        "day": "Ден 11–12",
        "text": "Шанхай: Исторически музей, Синтянди, Тянцзифанг арт квартал."
      },
      {
        "day": "Ден 13",
        "text": "Полет Макао – тур, А-Ма Храм, Венецианско Казино; фери Хон Конг."
      },
      {
        "day": "Ден 14–15",
        "text": "Хон Конг: Виктория Пийк, Aberdeen. Полет за България."
      }
    ],
    "includes": [
      "Turkish/Qatar Airlines Sofia→Beijing; HK→Sofia (30 кг)",
      "Скоростни влакове",
      "12 нощи 4★ с закуски + вечери",
      "Всички входни такси",
      "Медицинска застраховка (€30 000)",
      "Водач"
    ],
    "excludes": [
      "China виза (задължителна)",
      "Бакшиши (3–5 USD/ден)",
      "Факулт. Шанхай Тауър и вечерни круизи",
      "Лични разходи"
    ],
    "departures": [
      "България (Летище)"
    ],
    "hotels": [
      {
        "name": "Zhongle Six Star Beijing 4★ + Yohol Xian 4★ + Dengfeng Guan Song Shan 4★ + Merchant Marco Hangzhou 4★ + UrCove by Hyatt Shanghai 4★ + Harbour Plaza HK 4★",
        "board": "Закуска + вечери",
        "price_bgn": 6628,
        "price_eur": 3389,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-kitay-%E2%80%93-taynite-na-iztoka-s-poseshtenie--1_1777270657540.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 47,
    "refNum": "Е431",
    "title": "Екскурзия в Япония – Токио, Фуджи, Киото, Осака",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "nature"
    ],
    "destination": "Япония – Токио / Киото / Осака",
    "country": "japan",
    "duration": "10 дни / 8 нощувки",
    "days": 10,
    "nights": 8,
    "price_bgn": 7821,
    "price_eur": 3999,
    "dates": [
      "2026-09-04",
      "2026-10-11"
    ],
    "next_date": "2026-09-04",
    "transport": "plane",
    "description": "Съкровищата на Япония – Токио (Мейджи Шрайн, Сенсо-джи, Скайтри), Хаконе с вулканичния Овакудани и лодка на езерото Аши, Киото (Кинкаку-джи, чаена церемония), Нара и Осака.",
    "program": [
      {
        "day": "Ден 1–2",
        "text": "Полет Sofia→Istanbul→Tokyo. Настаняване."
      },
      {
        "day": "Ден 3",
        "text": "Токио: Мейджи Шрайн, Харадджуку, Сенсо-джи, Гинза."
      },
      {
        "day": "Ден 4",
        "text": "Хаконе: лодка Аши, Овакудани рожена линия, музей скулптури."
      },
      {
        "day": "Ден 5",
        "text": "Свободно в Токио или факулт. Никко (Чузенджи, Тошогу)."
      },
      {
        "day": "Ден 6",
        "text": "Шинкансен до Киото. Кинкаку-джи, чаена церемония."
      },
      {
        "day": "Ден 7",
        "text": "Нара: Фушими Инари, Тодай-джи, елени."
      },
      {
        "day": "Ден 8",
        "text": "Осака: Умеда Скай, Осака Замък, Пазар Куромон."
      },
      {
        "day": "Ден 9–10",
        "text": "Вечерен полет Osaka→Istanbul→Sofia. Пристигане."
      }
    ],
    "includes": [
      "Turkish Airlines Sofia→Tokyo, Osaka→Sofia",
      "8 нощи 4★ хотели с закуска",
      "Шинкансен Токио–Киото",
      "Обиколка Хаконе",
      "Всички входни такси и трансфери",
      "Чаена церемония",
      "Медицинска застраховка (€30 000)",
      "Водач на български"
    ],
    "excludes": [
      "Напитки при ядене",
      "Бакшиши (5 USD/ден)",
      "Наушници (задължителни)",
      "Факулт. (Никко, Токио Скайтри)"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "4★ хотели Токио (3н) + Киото (3н) + Осака (2н)",
        "board": "Закуска",
        "price_bgn": 7821,
        "price_eur": 3999,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-yaponiya-tokio-fudzhi-kioto-osaka-sakrovis-1_1755585497431.jpg"
      }
    ],
    "featured": true
  },
  {
    "id": 51,
    "refNum": "Е430",
    "title": "Южна Корея и Япония – от Сеул до Токио",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "nature"
    ],
    "destination": "Южна Корея / Япония",
    "country": "japan",
    "duration": "15 дни / 12 нощувки",
    "days": 15,
    "nights": 12,
    "price_bgn": 8956,
    "price_eur": 4579,
    "dates": [
      "2026-10-19"
    ],
    "next_date": "2026-10-19",
    "transport": "plane",
    "description": "Сеул, Бусан, Осака, Киото, Фуджи и Токио за 15 дни – DMZ тур, Ангкор Ват, Булгукса Храм, Гион квартал, Шинкансен и Скайтри. Turkish Airlines, 4★ хотели, 12 нощи.",
    "program": [
      {
        "day": "Ден 1–4",
        "text": "Полет до Сеул. Дворец Кьонбокгунг, Инсадонг, DMZ, Джагалчи Бусан, Гамчон."
      },
      {
        "day": "Ден 5–6",
        "text": "Хандонг Йонгунгса, Булгукса Храм, Тумули; полет Осака."
      },
      {
        "day": "Ден 7",
        "text": "Шинсайбаши, Дотонбори."
      },
      {
        "day": "Ден 8–9",
        "text": "Тодайджи и Нара; Осака Замък. Фушими Инари, Кийомизу Храм, чаена церемония, Гион."
      },
      {
        "day": "Ден 10",
        "text": "Арашияма бамбукова гора, Миями тракционно село."
      },
      {
        "day": "Ден 11",
        "text": "Хаконе, Шинкансен Токио, Фудзи 5-та Станция, Ошино."
      },
      {
        "day": "Ден 12",
        "text": "Овакудани; Токио Скайтри."
      },
      {
        "day": "Ден 13",
        "text": "Имперски дворец, Асакуса Сенсо-джи, Накамисе."
      },
      {
        "day": "Ден 14",
        "text": "Свободно Токио. Вечерен полет."
      },
      {
        "day": "Ден 15",
        "text": "Пристигане в България."
      }
    ],
    "includes": [
      "Turkish Airlines Sofia→Seoul; Busan→Osaka; Tokyo→Sofia (30 кг)",
      "12 нощи 4★ с закуска",
      "2 обяда Корея, 5 обяда + 2 вечери Япония",
      "Шинкансен",
      "Медицинска застраховка (€30 000)"
    ],
    "excludes": [
      "Бакшиши (5 USD/ден задължителни)",
      "Напитки",
      "Лични разходи",
      "Факулт. дейности"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "4★ хотели Сеул, Бусан, Осака, Киото, Токио",
        "board": "Закуска",
        "price_bgn": 8956,
        "price_eur": 4579,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-yuzhna-koreya-i-yaponiya-ot-seul-do-tokio--1_1742210591430.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 54,
    "refNum": "Е551",
    "title": "Перу – Лима, Наска, Аракипа, Титикака и Мачу Пикчу",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Перу",
    "country": "peru",
    "duration": "15 дни / 13 нощувки",
    "days": 15,
    "nights": 13,
    "price_bgn": 6933,
    "price_eur": 3545,
    "dates": [
      "2026-10-18"
    ],
    "next_date": "2026-10-18",
    "transport": "plane",
    "description": "Грандиозно пътешествие из Перу – колониалната Лима, линиите Наска, манастирите на Аракипа, плаващите острови на езерото Титикака и кулминацията – легендарният Мачу Пикчу. 15 дни с влак Vistadome и водач на български.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет Sofia→Madrid→Lima. Вечерно пристигане и трансфер."
      },
      {
        "day": "Ден 2",
        "text": "Целодневна обиколка на Лима – модерни и колониални квартали, музеи."
      },
      {
        "day": "Ден 3",
        "text": "Резерват Паракас с лодка; оазис Уакачина; път до Наска."
      },
      {
        "day": "Ден 4",
        "text": "Факулт. полет над линиите Наска; завръщане Лима."
      },
      {
        "day": "Ден 5",
        "text": "Полет до Аракипа; обиколка – манастир Санта Каталина."
      },
      {
        "day": "Ден 6",
        "text": "Каньон Колка през резерват; настаняване в Чивай с термални извори."
      },
      {
        "day": "Ден 7",
        "text": "Наблюдение на кондори при Cruz del Condor; местни села; път до Пуно."
      },
      {
        "day": "Ден 8",
        "text": "Целодневна екскурзия на езерото Титикака – острови Такиле и Урос."
      },
      {
        "day": "Ден 9",
        "text": "Път до Куско през археологически обекти (храм Ракчи)."
      },
      {
        "day": "Ден 10",
        "text": "Куско – храм Кориканча, крепост Саксайуаман, пазар Сан Педро."
      },
      {
        "day": "Ден 11",
        "text": "Свещената долина; Чинчеро; крепост Олантайтамбо; влак Vistadome до Агуас Калиентес."
      },
      {
        "day": "Ден 12",
        "text": "Мачу Пикчу с водач; връщане с влак до Куско."
      },
      {
        "day": "Ден 13",
        "text": "Полет до Лима; факулт. Магически фонтани вечер."
      },
      {
        "day": "Ден 14–15",
        "text": "Полет Lima→Madrid→Sofia."
      }
    ],
    "includes": [
      "Международни полети (Bulgaria Air, Iberia) + вътрешни перуански полети",
      "13 нощи 3-4★ хотели с закуски",
      "5 обяда",
      "Влак Vistadome",
      "Входни такси по програмата",
      "Трансфери",
      "Водач с превод на български"
    ],
    "excludes": [
      "Факулт. (буги, полет над Наска, фонтани)",
      "Медицинска застраховка (2 лв./ден)",
      "Бакшиши (~40 USD)",
      "Напитки при ядене"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "3-4★ хотели по маршрута (Tambo Uno Lima, Majoro Nazca, San Agustin Plaza Cusco, Intiwatana Aguas Calientes)",
        "board": "Закуска + 5 обяда",
        "price_bgn": 6933,
        "price_eur": 3545,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_peru-velikden-2026-1_1761827812551.jpg"
      }
    ],
    "featured": true
  },
  {
    "id": 57,
    "refNum": "Е546",
    "title": "Съкровищата на Древен Египет – Кайро, Луксор, Хургада и оазис Фаюм",
    "category": "exotic",
    "tags": [
      "culture",
      "nature",
      "beach"
    ],
    "destination": "Египет – Кайро / Луксор / Хургада",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2286,
    "price_eur": 1169,
    "dates": [
      "2026-09-09",
      "2026-09-23",
      "2026-10-07",
      "2026-10-21",
      "2026-11-04"
    ],
    "next_date": "2026-09-09",
    "transport": "plane",
    "description": "Пълно потапяне в Древен Египет – пирамидите в Гиза, храмовете Карнак и Луксор, Долината на царете и релакс на Червено море в Хургада. С вътрешен полет и водач-египтолог.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет Sofia–Cairo; музей GEM; настаняване."
      },
      {
        "day": "Ден 2",
        "text": "Пирамидите, Сфинксът, некрополът Сакара, Серапеума."
      },
      {
        "day": "Ден 3",
        "text": "Факулт. оазис Фаюм или свободно в Кайро."
      },
      {
        "day": "Ден 4",
        "text": "Вътрешен полет до Луксор; храмовете Карнак и Луксор."
      },
      {
        "day": "Ден 5",
        "text": "Факулт. балон; Долината на царете и цариците, Колосите на Мемнон, храмът на Хатшепсут."
      },
      {
        "day": "Ден 6",
        "text": "Храмът Дендера; храмът Абидос; трансфер до Хургада 5★."
      },
      {
        "day": "Ден 7",
        "text": "Свободен плажен ден; факулт. сафари, Ел Гуна или шнорхелинг."
      },
      {
        "day": "Ден 8",
        "text": "Обратен полет за София."
      }
    ],
    "includes": [
      "Чартърни полети + вътрешен Cairo–Luxor",
      "Багаж (7 кг + 20 кг)",
      "3 нощи Кайро 4★, 2 нощи Луксор 4★, 2 нощи Хургада 5★ AI",
      "Входни такси по програмата",
      "Водач-египтолог",
      "Застраховка (10 000 €)"
    ],
    "excludes": [
      "Виза Египет (25 USD)",
      "Бакшиши (~25 USD)",
      "Факулт. екскурзии",
      "Премиум гробници (Тутанкамон, Сети, Нефертари)",
      "Напитки при ядене"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Pyramids Park 4★ + Lotus/Aracan Eatabe Luxor 4★ + AMC Royal/Gravity Hurghada 5★ AI",
        "board": "Закуска / All Inclusive",
        "price_bgn": 2286,
        "price_eur": 1169,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-1_1770823273546.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-1_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-2_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-3_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-4_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-5_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-6_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-7_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-8_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-9_1770823273546.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-dreven-egipet-kayro-luksor-hurgada-i-o-10_1770823273546.jpg"
    ],
    "featured": true
  },
  {
    "id": 58,
    "refNum": "Е433",
    "title": "Ваканция в Египет – Кайро, Хургада и круиз по река Нил",
    "category": "exotic",
    "tags": [
      "culture",
      "cruise",
      "beach"
    ],
    "destination": "Египет – Кайро / Нил / Хургада",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2327,
    "price_eur": 1190,
    "dates": [
      "2026-09-09",
      "2026-09-23",
      "2026-10-07",
      "2026-10-21",
      "2026-11-04"
    ],
    "next_date": "2026-09-09",
    "transport": "plane",
    "description": "Древен Египет с 3-нощен круиз по Нил – пирамидите в Гиза, Асуан с Високия язовир и храма на Изида, храмовете Ком Омбо, Едфу и Луксор, и накрая релакс на Червено море в Хургада.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Ранно отпътуване, пристигане Кайро, музей GEM, настаняване в Гиза."
      },
      {
        "day": "Ден 2",
        "text": "Пирамидите и Сфинксът, парфюмена фабрика, свободно или Стар Кайро."
      },
      {
        "day": "Ден 3",
        "text": "Вътрешен полет до Асуан; Високият язовир, Недовършеният обелиск, храмът на Изида; качване на круиза."
      },
      {
        "day": "Ден 4",
        "text": "Факулт. Абу Симбел; круиз до Ком Омбо, после Едфу."
      },
      {
        "day": "Ден 5",
        "text": "Храмът Едфу; круиз до Луксор през Есна; храмът Луксор."
      },
      {
        "day": "Ден 6",
        "text": "Факулт. балон; Долината на царете, храмът на Хатшепсут, Колосите на Мемнон; трансфер Хургада."
      },
      {
        "day": "Ден 7",
        "text": "Свободен плажен ден; факулт. сафари, Ел Гуна, шнорхелинг."
      },
      {
        "day": "Ден 8",
        "text": "Закуска, трансфер, обратен полет за София."
      }
    ],
    "includes": [
      "Чартърни полети + вътрешен Cairo–Aswan",
      "Багаж (7 кг + 20 кг)",
      "2 нощи Pyramids Park 4★",
      "3 нощи 5★ Nile Cruise пълен пансион",
      "2 нощи Gravity Hotel Hurghada 5★ AI",
      "2 обяда Кайро",
      "Входни такси",
      "Застраховка (10 000 €)"
    ],
    "excludes": [
      "Виза Египет (25 USD)",
      "Бакшиши (~30 USD)",
      "Факулт. екскурзии",
      "Гробници (Тутанкамон, Сети, Хеопс)",
      "Напитки при ядене"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Pyramids Park 4★ + 5★ Nile Cruise + Gravity Hotel Aqua Park Hurghada 5★ AI",
        "board": "Закуска / Пълен пансион / All Inclusive",
        "price_bgn": 2327,
        "price_eur": 1190,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-1_1770823312433.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-1_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-2_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-3_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-4_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-5_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-6_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-7_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-8_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-9_1770823312433.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-kayro-hurgada-i-kruiz-po-reka-nil-s-10_1770823312433.jpg"
    ],
    "featured": false
  },
  {
    "id": 63,
    "refNum": "П951",
    "title": "Почивка в Хургада, Египет – със самолет от София",
    "category": "exotic",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Хургада, Египет",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 901,
    "price_eur": 461,
    "dates": [
      "2026-08-29",
      "2026-09-05",
      "2026-09-12",
      "2026-09-19",
      "2026-09-26",
      "2026-10-03",
      "2026-10-10",
      "2026-10-17",
      "2026-10-24"
    ],
    "next_date": "2026-08-29",
    "transport": "plane",
    "description": "Плажна почивка в Хургада на Червено море – чартър от София, над 90 хотела по избор и факултативни културни екскурзии до Луксор, Кайро и пирамидите.",
    "includes": [
      "Чартър София–Хургада–София с летищни такси",
      "Багаж 20 кг + 10 кг",
      "7 нощувки в избран хотел",
      "Трансфери",
      "Медицинска застраховка (10 000 €)",
      "Представител на български"
    ],
    "excludes": [
      "Застраховка „Отмяна\"",
      "Виза Египет (25 USD)",
      "Факултативни екскурзии",
      "Такса гориво"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Empire Hotel Aqua Park",
        "board": "All Inclusive",
        "price_bgn": 901,
        "price_eur": 461,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/5079/images/64c0db8372964738714872.jpg"
      },
      {
        "name": "Royal Star Empire Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 963,
        "price_eur": 492,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/5078/images/64c0cbe61d3e5471428177.jpg"
      },
      {
        "name": "Viva Blue Resort (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 979,
        "price_eur": 501,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4247/images/65f190e305d3e268191906.jpg"
      },
      {
        "name": "Zahabia Hotel & Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1013,
        "price_eur": 518,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4273/images/65f190692b15d027713291.jpg"
      },
      {
        "name": "New Eagles Aqua Park",
        "board": "All Inclusive",
        "price_bgn": 1035,
        "price_eur": 529,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4736/images/62de8cc554526781183869.jpg"
      },
      {
        "name": "Imperial Shams Abu Soma",
        "board": "All Inclusive",
        "price_bgn": 1044,
        "price_eur": 534,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/3745/images/IMG_4270.jpg"
      },
      {
        "name": "Minamark Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1054,
        "price_eur": 539,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/1814/images/1%20(7).jpg"
      },
      {
        "name": "White Valley Palace Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1055,
        "price_eur": 539,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/5976/images/l0.jpg"
      },
      {
        "name": "Royal Star Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1100,
        "price_eur": 563,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/2841/images/679513763.jpg"
      },
      {
        "name": "King Tut Aqua Park Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1110,
        "price_eur": 568,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/2816/images/DJI_0106.jpg"
      },
      {
        "name": "Sphinx Aquapark Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1110,
        "price_eur": 568,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/2849/images/DJI_0038%20-%20Copy.jpg"
      },
      {
        "name": "Sunny Days Mirette Family & Aqua Park",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4252/images/60abb80761c86237787481.jpg"
      },
      {
        "name": "Marlin Inn Resort",
        "board": "All Inclusive",
        "price_bgn": 1116,
        "price_eur": 570,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/2829/images/BIG_IMG20_156569890363868.jpg"
      },
      {
        "name": "Bella Vista Resort Hurghada",
        "board": "All Inclusive",
        "price_bgn": 1120,
        "price_eur": 573,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/446/images/BIG_4_157184024463896.jpg"
      },
      {
        "name": "Le Pacha Resort",
        "board": "All Inclusive",
        "price_bgn": 1121,
        "price_eur": 573,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/2819/images/60929dce0424e.jpg"
      },
      {
        "name": "Coral Sun Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1132,
        "price_eur": 579,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4230/images/661d1a8962256008620410.jpg"
      },
      {
        "name": "Palm Beach Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1195,
        "price_eur": 611,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4234/images/60ad20a14ed7a055506856.jpg"
      },
      {
        "name": "Sunny Days El Palacio",
        "board": "All Inclusive",
        "price_bgn": 1201,
        "price_eur": 614,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4765/images/68de4621a3d11256287592.jpg"
      },
      {
        "name": "Eagles Paradise Abu Soma",
        "board": "All Inclusive",
        "price_bgn": 1202,
        "price_eur": 614,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4271/images/beach.jpg"
      },
      {
        "name": "Mirage Bay Resort & Aquapark",
        "board": "All Inclusive",
        "price_bgn": 1215,
        "price_eur": 621,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/4201/images/65f1912e9eb0f186737250.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 65,
    "refNum": "П1160",
    "title": "All Inclusive почивка в Хургада – с полет от Пловдив",
    "category": "exotic",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Хургада, Египет",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1250,
    "price_eur": 639,
    "dates": [
      "2026-10-08",
      "2026-10-15",
      "2026-10-22",
      "2026-10-29",
      "2026-11-05",
      "2026-11-12"
    ],
    "next_date": "2026-10-08",
    "transport": "plane",
    "description": "All Inclusive почивка в Хургада с директен полет от Пловдив – 7 нощувки, плаж на Червено море и факултативни екскурзии (гмуркане, сафари, Луксор, Кайро).",
    "includes": [
      "Директен полет от Пловдив (20 кг + 5 кг)",
      "7 нощувки с All Inclusive",
      "Трансфери",
      "Медицинска застраховка (10 000 €)",
      "Представител"
    ],
    "excludes": [
      "Напитки при ядене",
      "Факултативни екскурзии",
      "Виза Египет (30 USD)",
      "Такса гориво",
      "Такса обработка (5 USD)"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "El Karma Aqua Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8909/gallery/P62N1JDH.jpg"
      },
      {
        "name": "Blend Club Aqua Resort",
        "board": "All Inclusive",
        "price_bgn": 1264,
        "price_eur": 646,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/10091/gallery/R7VPDXNL.jpg"
      },
      {
        "name": "Sea Star Beau Rivage Hotel",
        "board": "All Inclusive",
        "price_bgn": 1317,
        "price_eur": 673,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/892/gallery/Z9TAPSWN.jpg"
      },
      {
        "name": "Magic Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1368,
        "price_eur": 699,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/10119/gallery/4PQGST8A.jpg"
      },
      {
        "name": "Palm Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1372,
        "price_eur": 701,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/7211/gallery/KUDLS7B8.jpg"
      },
      {
        "name": "Jasmine Palace Resort 5★",
        "board": "All Inclusive",
        "price_bgn": 1436,
        "price_eur": 734,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/887/gallery/HEV9A6ZR.jpg"
      },
      {
        "name": "Gravity Sahl Hasheesh Premium",
        "board": "All Inclusive",
        "price_bgn": 1450,
        "price_eur": 741,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/7645/gallery/N29H64LE.jpg"
      },
      {
        "name": "Sunny Days El Palacio Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1526,
        "price_eur": 780,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/342/gallery/JGXK16U8.jpg"
      },
      {
        "name": "Pharaoh Azur Resort",
        "board": "All Inclusive",
        "price_bgn": 1526,
        "price_eur": 780,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/371/gallery/4YBK6312.jpg"
      },
      {
        "name": "Swiss Inn Resort Hurghada Superior",
        "board": "All Inclusive",
        "price_bgn": 1567,
        "price_eur": 801,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/7354/gallery/VMDB9AJQ.jpg"
      },
      {
        "name": "Sunrise Alora Aqua Park Resort",
        "board": "All Inclusive",
        "price_bgn": 1570,
        "price_eur": 803,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9821/gallery/R7QZYS8T.jpg"
      },
      {
        "name": "Desert Rose Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 1580,
        "price_eur": 808,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/660/gallery/M85H2DYF.jpg"
      },
      {
        "name": "Jaz Makadi Oasis Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 1581,
        "price_eur": 808,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/768/gallery/HQWBA4S8.jpg"
      },
      {
        "name": "Hurghada Long Beach Resort 4★",
        "board": "All Inclusive",
        "price_bgn": 1608,
        "price_eur": 822,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/894/gallery/6SU5MGKJ.jpg"
      },
      {
        "name": "Sunrise Solara Aqua Park Resort",
        "board": "All Inclusive",
        "price_bgn": 1646,
        "price_eur": 842,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9822/gallery/AEHGM64D.jpg"
      },
      {
        "name": "Caribbean World Soma Bay",
        "board": "All Inclusive",
        "price_bgn": 1709,
        "price_eur": 874,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/10088/gallery/VGXQ9TCZ.jpg"
      },
      {
        "name": "Jaz Aquaviva Hotel Premium",
        "board": "All Inclusive",
        "price_bgn": 1743,
        "price_eur": 891,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8895/gallery/SN2JGWPM.jpg"
      },
      {
        "name": "Gravity Hotel and Aqua Park Hurghada 5★",
        "board": "All Inclusive",
        "price_bgn": 1749,
        "price_eur": 894,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/893/gallery/WGLFMA6J.jpg"
      },
      {
        "name": "Cleopatra Luxury Makadi Beach Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 1791,
        "price_eur": 916,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9008/gallery/KDBMF8SA.jpg"
      },
      {
        "name": "Jaz Aquamarine Premium",
        "board": "All Inclusive",
        "price_bgn": 1824,
        "price_eur": 933,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/897/gallery/5HLAKQF9.jpg"
      },
      {
        "name": "Aladdin Beach Resort 4★",
        "board": "All Inclusive",
        "price_bgn": 1867,
        "price_eur": 955,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8388/gallery/L17YZ4PN.jpg"
      },
      {
        "name": "Bellagio Resort and Spa Superior",
        "board": "All Inclusive",
        "price_bgn": 1933,
        "price_eur": 988,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/7499/gallery/SUDBZG1L.jpg"
      },
      {
        "name": "Jaz Casa Del Mar Beach Premium",
        "board": "All Inclusive",
        "price_bgn": 1941,
        "price_eur": 992,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/620/gallery/3K6VZ7U2.jpg"
      },
      {
        "name": "Tropitel Sahl Hasheesh Lux",
        "board": "All Inclusive",
        "price_bgn": 1972,
        "price_eur": 1008,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/7659/gallery/MHF3ZLR7.jpg"
      },
      {
        "name": "Iberotel Makadi Beach Lux",
        "board": "All Inclusive",
        "price_bgn": 1983,
        "price_eur": 1014,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/770/gallery/BFJCS675.jpg"
      },
      {
        "name": "Jaz Makadina Lux",
        "board": "All Inclusive",
        "price_bgn": 2093,
        "price_eur": 1070,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/769/gallery/W2XR8GBU.jpg"
      },
      {
        "name": "Jaz Asteria Sahl Hashish Premium 5★",
        "board": "All Inclusive",
        "price_bgn": 2159,
        "price_eur": 1104,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9758/gallery/6AUHBV49.jpg"
      },
      {
        "name": "Xanadu Makadi Bay Lux",
        "board": "All Inclusive",
        "price_bgn": 2681,
        "price_eur": 1371,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8376/gallery/BUZNYEWV.jpg"
      },
      {
        "name": "Steigenberger Ras Soma Lux",
        "board": "All Inclusive",
        "price_bgn": 2903,
        "price_eur": 1484,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/7577/gallery/VM5PE7CS.jpg"
      },
      {
        "name": "Serry Beach Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 3153,
        "price_eur": 1612,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8901/gallery/XBT97RJA.jpg"
      },
      {
        "name": "Panorama Bungalows El Gouna Superior",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3274/hotel/27/gallery/ENV9J5MU.jpg"
      },
      {
        "name": "Mercure Hurghada",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3274/hotel/100/gallery/1V9YJ56F.jpg"
      },
      {
        "name": "Three Corners Rihana Resort",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3274/hotel/7414/gallery/VQXS5FTG.jpg"
      },
      {
        "name": "Movenpick Resort and Spa El Gouna",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3274/hotel/7663/gallery/64TGL2ZM.jpg"
      },
      {
        "name": "Labranda Club Hotel Superior",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8899/gallery/SF5EK91H.jpg"
      },
      {
        "name": "Labranda Royal Hotel Superior",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/8900/gallery/1TZQSHNB.jpg"
      },
      {
        "name": "Serenity Alpha Beach",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9808/gallery/RSZEQ5LY.jpg"
      },
      {
        "name": "Serenity Alma",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9812/gallery/CY85RBXD.jpg"
      },
      {
        "name": "Stella Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9814/gallery/MTS17GRX.jpg"
      },
      {
        "name": "Stella Gardens Resort",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9815/gallery/YGEDQHN7.jpg"
      },
      {
        "name": "Viva Blue Resort (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/9816/gallery/BG6AT7LJ.jpg"
      },
      {
        "name": "Rewaya Majestic Resort",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3296/hotel/10090/gallery/Q8C3ABFL.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-1_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-2_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-3_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-4_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-5_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-6_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-7_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-8_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-9_17803821591160.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-hurgada-s-polet-ot-plovdiv-ese-10_17803821591160.jpg"
    ],
    "featured": false
  },
  {
    "id": 66,
    "refNum": "П1049",
    "title": "All Inclusive почивка в Шарм ел Шейх – Лято-Есен 2026",
    "category": "exotic",
    "tags": [
      "beach",
      "allInclusive",
      "family",
      "ranni-zapisvaniya"
    ],
    "destination": "Шарм ел Шейх, Египет",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1268,
    "price_eur": 648,
    "dates": [
      "2026-06-14",
      "2026-06-21",
      "2026-06-28",
      "2026-07-05",
      "2026-07-12",
      "2026-07-19",
      "2026-07-26",
      "2026-08-02",
      "2026-08-09",
      "2026-08-16"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "All Inclusive почивка на Шарм ел Шейх с директен полет от София – 7 нощувки на Червено море с богат избор от хотели и факултативни екскурзии.",
    "includes": [
      "Полет с багаж (20 кг + 5 кг) European Air Charter",
      "7 нощувки All Inclusive",
      "Трансфери",
      "Медицинска застраховка (10 000 €)",
      "Представител"
    ],
    "excludes": [
      "Напитки при факулт. екскурзии",
      "Вход в пирамиди",
      "Такси за снимки",
      "Виза (освен Шарм печат)",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Falcon Hills Hotel 3★",
        "board": "All Inclusive",
        "price_bgn": 1268,
        "price_eur": 648,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9749/gallery/E894VYQA.jpg"
      },
      {
        "name": "Falcon Naama Star Hotel",
        "board": "All Inclusive",
        "price_bgn": 1268,
        "price_eur": 648,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9750/gallery/SZEJ643U.jpg"
      },
      {
        "name": "IL Mercato Splash Aqua Park",
        "board": "All Inclusive",
        "price_bgn": 1299,
        "price_eur": 664,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9751/gallery/R7945JDQ.jpg"
      },
      {
        "name": "Jaz Neo Naama Bay",
        "board": "All Inclusive",
        "price_bgn": 1309,
        "price_eur": 669,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/8059/gallery/ACUG63NB.jpg"
      },
      {
        "name": "Cataract Resort",
        "board": "All Inclusive",
        "price_bgn": 1341,
        "price_eur": 686,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9819/gallery/5L79861N.jpg"
      },
      {
        "name": "Cataract Layalina",
        "board": "All Inclusive",
        "price_bgn": 1395,
        "price_eur": 713,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9820/gallery/1539H8VN.jpg"
      },
      {
        "name": "Regency Plaza Aquapark Resort",
        "board": "All Inclusive",
        "price_bgn": 1394,
        "price_eur": 713,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/467/gallery/RYN9JSQW.jpg"
      },
      {
        "name": "Xperience St. George",
        "board": "All Inclusive",
        "price_bgn": 1404,
        "price_eur": 718,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/8601/gallery/RJVBUL91.jpg"
      },
      {
        "name": "Dreams Beach Resort Superior",
        "board": "All Inclusive",
        "price_bgn": 1411,
        "price_eur": 721,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9007/gallery/UPVWAHXQ.jpg"
      },
      {
        "name": "Hilton Sharks Bay Resort 4★",
        "board": "All Inclusive",
        "price_bgn": 1412,
        "price_eur": 722,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/970/gallery/68J52URK.jpg"
      },
      {
        "name": "Aurora Oriental Resort",
        "board": "All Inclusive",
        "price_bgn": 1475,
        "price_eur": 754,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/465/gallery/Y7BLED64.jpg"
      },
      {
        "name": "Dreams Vacation Resort",
        "board": "All Inclusive",
        "price_bgn": 1475,
        "price_eur": 754,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9274/gallery/JMTYA2LE.jpg"
      },
      {
        "name": "Romance Regency Club (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1467,
        "price_eur": 750,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9817/gallery/VXPJFNCE.jpg"
      },
      {
        "name": "Barcelo Tiran Sharm Resort",
        "board": "All Inclusive",
        "price_bgn": 1590,
        "price_eur": 813,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/641/gallery/MFLXTV3H.jpg"
      },
      {
        "name": "Jaz Mirabel Park and Club",
        "board": "All Inclusive",
        "price_bgn": 1553,
        "price_eur": 794,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7707/gallery/H1SA2ZER.jpg"
      },
      {
        "name": "Xperience Kiroseiz Premier",
        "board": "All Inclusive",
        "price_bgn": 1558,
        "price_eur": 797,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/8602/gallery/QNXLP3EV.jpg"
      },
      {
        "name": "Jaz Sharm Dreams Premium",
        "board": "All Inclusive",
        "price_bgn": 1580,
        "price_eur": 808,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9748/gallery/HM3LWE5G.jpg"
      },
      {
        "name": "Royal Regency Club",
        "board": "All Inclusive",
        "price_bgn": 1568,
        "price_eur": 802,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/9818/gallery/G61CPQUS.jpg"
      },
      {
        "name": "Xperience Kiroseiz Parkland",
        "board": "All Inclusive",
        "price_bgn": 1611,
        "price_eur": 824,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/8600/gallery/LHXDS9FK.jpg"
      },
      {
        "name": "Jaz Mirabel Beach Premium",
        "board": "All Inclusive",
        "price_bgn": 1620,
        "price_eur": 828,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7328/gallery/CSG58EV2.jpg"
      },
      {
        "name": "Charmillion Gardens Aqua Park Superior",
        "board": "All Inclusive",
        "price_bgn": 1620,
        "price_eur": 828,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/8060/gallery/RM9152F3.jpg"
      },
      {
        "name": "Charmillion Club Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 1652,
        "price_eur": 845,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7480/gallery/RG5F92AZ.jpg"
      },
      {
        "name": "Xperience Sea Breeze Resort 5★",
        "board": "All Inclusive",
        "price_bgn": 1687,
        "price_eur": 863,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7474/gallery/W2TSLAKD.jpg"
      },
      {
        "name": "Domina Coral Bay Resort",
        "board": "All Inclusive",
        "price_bgn": 1622,
        "price_eur": 829,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7839/gallery/K9M4P3EU.jpg"
      },
      {
        "name": "Jaz Belvedere Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 1781,
        "price_eur": 911,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/572/gallery/7YHC6TD1.jpg"
      },
      {
        "name": "Jaz Fanara Resort Premium",
        "board": "All Inclusive",
        "price_bgn": 1822,
        "price_eur": 932,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7342/gallery/H8ZY91X6.jpg"
      },
      {
        "name": "SIMBA CLUB – Cleopatra Luxury Resort Sharm Lux",
        "board": "All Inclusive",
        "price_bgn": 1824,
        "price_eur": 933,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7479/gallery/C2FJ1D93.jpg"
      },
      {
        "name": "Iberotel Redsina Premium",
        "board": "All Inclusive",
        "price_bgn": 1974,
        "price_eur": 1009,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7478/gallery/2RAN8MZW.jpg"
      },
      {
        "name": "Coral Sea Holiday Resort",
        "board": "All Inclusive",
        "price_bgn": 2168,
        "price_eur": 1108,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/574/gallery/YBL28JVE.jpg"
      },
      {
        "name": "Coral Sea Water World Resort",
        "board": "All Inclusive",
        "price_bgn": 2265,
        "price_eur": 1158,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/969/gallery/HGXZ1V2P.jpg"
      },
      {
        "name": "Coral Sea Imperial Sensatori",
        "board": "All Inclusive",
        "price_bgn": 2917,
        "price_eur": 1491,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/836/gallery/HP4MT5CL.jpg"
      },
      {
        "name": "Steigenberger Alcazar Lux",
        "board": "All Inclusive",
        "price_bgn": 1622,
        "price_eur": 829,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/7656/gallery/PWD9RNB4.jpg"
      },
      {
        "name": "Rixos Sharm El Sheikh (Adults Only) Lux",
        "board": "All Inclusive",
        "price_bgn": 3348,
        "price_eur": 1712,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/840/gallery/N9WD1KLB.jpg"
      },
      {
        "name": "Rixos Premium Seagate Lux",
        "board": "All Inclusive",
        "price_bgn": 3495,
        "price_eur": 1787,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3276/hotel/839/gallery/E1WZMDP9.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-1_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-2_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-3_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-4_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-5_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-6_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-7_17659020581049.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_all-inclusive-pochivka-v-sharm-el-sheyh-lyato-esen-2026-8_17659020581049.jpg"
    ],
    "featured": false
  },
  {
    "id": 68,
    "refNum": "П1149",
    "title": "Египетски Малдиви – Алмаза Бей",
    "category": "exotic",
    "tags": [
      "beach",
      "allInclusive",
      "luxury"
    ],
    "destination": "Алмаза Бей, Египет",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1427,
    "price_eur": 730,
    "dates": [
      "2026-06-12",
      "2026-06-26",
      "2026-07-03",
      "2026-07-10",
      "2026-07-17",
      "2026-08-07",
      "2026-09-12",
      "2026-09-26"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "„Египетските Малдиви\" – Алмаза Бей с тюркоазено море и бели плажове. Луксозни Jaz хотели, директен полет от София и спокойствие на брега на Средиземно море.",
    "includes": [
      "Полет с багаж (20 кг + 5 кг)",
      "7 нощувки с избрания пакет хранене",
      "Трансфери",
      "Медицинска застраховка (10 000 € Euroins)",
      "Представител"
    ],
    "excludes": [
      "Виза (27–30 USD)",
      "Такса гориво",
      "Такса обработка (5 USD)",
      "Факултативни екскурзии",
      "Напитки при ядене"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Jaz Almazino Almaza Bay Superior",
        "board": "All Inclusive",
        "price_bgn": 1572,
        "price_eur": 804,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9057/gallery/LCMVPW7B.jpg"
      },
      {
        "name": "Jaz Tamerina Premium",
        "board": "All Inclusive",
        "price_bgn": 1572,
        "price_eur": 804,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9350/gallery/UZ5VEMQ6.jpg"
      },
      {
        "name": "The G Hotel Seashell",
        "board": "All Inclusive",
        "price_bgn": 1572,
        "price_eur": 804,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/10093/gallery/8A2Z59HP.jpg"
      },
      {
        "name": "Jaz Almaza Blue Premium",
        "board": "All Inclusive",
        "price_bgn": 1907,
        "price_eur": 975,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9697/gallery/BR5MDYQ8.jpg"
      },
      {
        "name": "Jaz Neo Caza Maza",
        "board": "All Inclusive",
        "price_bgn": 1907,
        "price_eur": 975,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9945/gallery/AGXZ3JLU.jpg"
      },
      {
        "name": "Jaz Villagio",
        "board": "All Inclusive",
        "price_bgn": 1973,
        "price_eur": 1009,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9946/gallery/JFDSBKUL.jpg"
      },
      {
        "name": "Jaz Almaza Beach Premium",
        "board": "All Inclusive",
        "price_bgn": 2054,
        "price_eur": 1050,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9055/gallery/83PQG9J5.jpg"
      },
      {
        "name": "Jaz Oriental Premium",
        "board": "All Inclusive",
        "price_bgn": 2121,
        "price_eur": 1084,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9698/gallery/UE8ZKT43.jpg"
      },
      {
        "name": "Jaz Crystal Premium",
        "board": "All Inclusive",
        "price_bgn": 2309,
        "price_eur": 1181,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9056/gallery/NEHPB8R4.jpg"
      },
      {
        "name": "Cleopatra Sidi Heneish Premium",
        "board": "All Inclusive",
        "price_bgn": 3259,
        "price_eur": 1666,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9774/gallery/3RDG45X7.jpg"
      },
      {
        "name": "Jaz Sakhra Premium",
        "board": "All Inclusive",
        "price_bgn": 4008,
        "price_eur": 2049,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3023/hotel/9696/gallery/42NZ5B7L.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-1_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-2_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-3_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-4_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-5_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-6_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-7_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-8_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-9_17794373041149.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_egipetski-maldivi-almaza-bey-sinyo-spokoyno-i-bezkrayno-10_17794373041149.jpg"
    ],
    "featured": false
  },
  {
    "id": 69,
    "refNum": "Е425",
    "title": "Ваканция в Египет – Хургада, Кайро и круиз по река Нил",
    "category": "exotic",
    "tags": [
      "culture",
      "cruise",
      "beach"
    ],
    "destination": "Египет – Хургада / Нил / Кайро",
    "country": "egypt",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2337,
    "price_eur": 1195,
    "dates": [
      "2026-09-02",
      "2026-09-16",
      "2026-09-30",
      "2026-10-14",
      "2026-10-28",
      "2026-11-11"
    ],
    "next_date": "2026-09-02",
    "transport": "plane",
    "description": "Древен Египет и Червено море – релакс в Хургада, 4-нощен круиз по Нил с храмовете на Луксор, Едфу, Ком Омбо и Асуан, и накрая пирамидите и Сфинксът в Кайро. С вътрешен полет.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет София→Хургада; настаняване; факулт. сафари или лодка с прозрачно дъно."
      },
      {
        "day": "Ден 2",
        "text": "Храмът Дендера, Луксор (Карнак и Луксор), качване на круиза."
      },
      {
        "day": "Ден 3",
        "text": "Факулт. балон; Долината на царете, храмът на Хатшепсут, Колосите на Мемнон."
      },
      {
        "day": "Ден 4",
        "text": "Храмовете Едфу и Ком Омбо; пристигане Асуан."
      },
      {
        "day": "Ден 5",
        "text": "Факулт. Абу Симбел; факулт. нубийско село/ботаническа градина."
      },
      {
        "day": "Ден 6",
        "text": "Асуан – язовир, обелиск, храм на Изида; вътрешен полет до Кайро."
      },
      {
        "day": "Ден 7",
        "text": "Пирамидите, Сфинксът, музей GEM; факулт. вечерен круиз по Нил."
      },
      {
        "day": "Ден 8",
        "text": "Обратен полет Кайро→София."
      }
    ],
    "includes": [
      "Чартърни полети (Sofia–Hurghada–Cairo) + вътрешен Aswan–Cairo",
      "Багаж (7 кг + 20 кг)",
      "1 нощ Хургада 5★ AI",
      "4 нощи 5★ круиз пълен пансион",
      "2 нощи Pyramids Park 4★ Кайро",
      "2 обяда",
      "Входни такси по програмата",
      "Български придружител",
      "Застраховка (10 000 €)"
    ],
    "excludes": [
      "Виза Египет (25 USD)",
      "Бакшиши (~30 USD)",
      "Такса гориво",
      "Факулт. (балон, Абу Симбел, нубийско село)",
      "Гробници (Тутанкамон, Сети, Хеопс)"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "AMC Royal / Sea Star Beau Rivage 5★ Хургада + 5★ Nile Cruise + Pyramids Park 4★ Кайро",
        "board": "All Inclusive / Пълен пансион / Закуска+вечеря",
        "price_bgn": 2337,
        "price_eur": 1195,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-1_1742197840425.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-1_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-2_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-3_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-4_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-5_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-6_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-7_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-8_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-9_1742197840425.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_vakantsiya-v-egipet-hurgada-kayro-i-kruiz-po-reka-nil-s-10_1742197840425.jpg"
    ],
    "featured": false
  },
  {
    "id": 73,
    "refNum": "Е636",
    "title": "Екскурзия в Испания – Великолепният Мадрид",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "ranni-zapisvaniya"
    ],
    "destination": "Испания – Мадрид",
    "country": "spain",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1211,
    "price_eur": 619,
    "dates": [
      "2026-06-12",
      "2026-07-10",
      "2026-09-04",
      "2026-09-18",
      "2026-10-02",
      "2026-10-16",
      "2026-10-30",
      "2026-11-20"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Мадрид – кралски дворци, емблематични площади и музеи от световна класа. Факултативни екскурзии до Толедо, Сеговия и Ел Ескориал.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет София–Мадрид; настаняване."
      },
      {
        "day": "Ден 2",
        "text": "Обиколка – Кралският дворец, Пласа Майор, Гран Виа, Прадо; факулт. Сеговия/Ел Ескориал; вечерно фламенко."
      },
      {
        "day": "Ден 3",
        "text": "Свободно или факулт. Толедо."
      },
      {
        "day": "Ден 4",
        "text": "Свободно; факулт. Прадо; трансфер и полет за София."
      }
    ],
    "includes": [
      "Полет с летищни такси и 10 кг ръчен багаж",
      "3 нощи 3-4★ хотел със закуска",
      "Трансфери",
      "Обиколка на Мадрид",
      "Застраховка (10 000 €)"
    ],
    "excludes": [
      "Чекиран багаж",
      "Входни такси",
      "Градски транспорт",
      "Факулт. екскурзии",
      "Бакшиши (3 €/ден)"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Porcel Torre Garden 3★ / Praga 4★",
        "board": "Закуска",
        "price_bgn": 1211,
        "price_eur": 619,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-1_1765982551636.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-1_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-2_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-3_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-4_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-5_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-6_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-7_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-8_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-9_1765982551636.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ispaniya-velikolepniyat-madrid-zashemetyav-10_1765982551636.jpg"
    ],
    "featured": false
  },
  {
    "id": 81,
    "refNum": "Е517",
    "title": "Съкровищата на Испания – със самолет, на български език",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "adventure",
      "ranni-zapisvaniya"
    ],
    "destination": "Испания – Андалусия и център",
    "country": "spain",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2228,
    "price_eur": 1139,
    "dates": [
      "2026-09-17",
      "2026-10-15"
    ],
    "next_date": "2026-09-17",
    "transport": "plane",
    "description": "Съкровищата на Испания – от Малага до Гранада. Уникална смес от средновековно, мавританско и християнско наследство из Андалусия и централна Испания с водач на български.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Полет до Малага, настаняване."
      },
      {
        "day": "Ден 2",
        "text": "Гибралтар, Кадис, Севиля."
      },
      {
        "day": "Ден 3",
        "text": "Севиля – катедралата, дворците, парковете."
      },
      {
        "day": "Ден 4",
        "text": "Толедо; трансфер до Мадрид."
      },
      {
        "day": "Ден 5",
        "text": "Обиколка на Мадрид – Кралският дворец, музеите."
      },
      {
        "day": "Ден 6",
        "text": "Валенсия с Град на изкуствата и науките."
      },
      {
        "day": "Ден 7",
        "text": "Гранада – факулт. Алхамбра, факулт. фламенко."
      },
      {
        "day": "Ден 8",
        "text": "Обиколка на Малага, обратен полет."
      }
    ],
    "includes": [
      "Полет (Wizz Air/Ryanair) с ръчен багаж",
      "Трансфери и автобус из Испания",
      "7 нощи 3-4★ хотели със закуска",
      "Обиколки Севиля, Мадрид, Валенсия",
      "Гибралтар, Кадис, Кордоба, Толедо, Гранада",
      "Застраховка (10 000 €)",
      "Водач на български"
    ],
    "excludes": [
      "Чекиран багаж",
      "Входни такси (13–15 € всяка)",
      "Алхамбра (99 лв.)",
      "Прадо (89 лв.)",
      "Фламенко (69 лв.)",
      "Бакшиши (3 €/ден)"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "3-4★ хотели по маршрута (Vik Gran Malaga, MA Sevilla, Crisol Cordoba, Vertice Madrid, Port Feria Valencia, Granada)",
        "board": "Закуска",
        "price_bgn": 2228,
        "price_eur": 1139,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-1_1755763730517.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-1_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-2_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-3_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-4_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-5_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-6_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-7_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-8_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-9_1755763730517.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_sakrovishtata-na-ispaniya-sas-samolet-na-balgarski-ezik-10_1755763730517.jpg"
    ],
    "featured": false
  },
  {
    "id": 82,
    "refNum": "Е396",
    "title": "Страната на баските – със самолет, на български език",
    "category": "exotic",
    "tags": [
      "culture",
      "city",
      "nature"
    ],
    "destination": "Испания – Баски регион",
    "country": "spain",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2498,
    "price_eur": 1277,
    "dates": [
      "2026-08-25"
    ],
    "next_date": "2026-08-25",
    "transport": "plane",
    "description": "Баският регион и северозападна Испания – Бургос, Памплона, Сан Себастиан, Билбао с музея Гугенхайм, Сантандер, Овиедо, Ла Коруня и Сантяго де Компостела.",
    "program": [
      {
        "day": "Ден 1",
        "text": "София–Мадрид; трансфер до Бургос; катедралата."
      },
      {
        "day": "Ден 2",
        "text": "Памплона; Сан Себастиан с крайбрежния булевард."
      },
      {
        "day": "Ден 3",
        "text": "Билбао – Стария град и музея Гугенхайм."
      },
      {
        "day": "Ден 4",
        "text": "Сантандер катедрала; Овиедо."
      },
      {
        "day": "Ден 5",
        "text": "Ла Коруня (Кулата на Херкулес); Сантяго де Компостела."
      },
      {
        "day": "Ден 6",
        "text": "Понтеведра; Виго; трансфер до Саламанка."
      },
      {
        "day": "Ден 7",
        "text": "Саламанка; трансфер до Мадрид; факулт. обиколка."
      },
      {
        "day": "Ден 8",
        "text": "Обратен полет за София."
      }
    ],
    "includes": [
      "Полет (Wizz Air/Ryanair) с такси и 10 кг ръчен багаж",
      "Трансфери и автобус",
      "7 нощи 4★ хотели със закуска",
      "Обиколки на всички градове",
      "Застраховка (10 000 €)",
      "Водач на български"
    ],
    "excludes": [
      "Градски такси",
      "Входни такси (Прадо, Гугенхайм и др.)",
      "Бакшиши (3 €/ден)",
      "Допълнителни музеи",
      "Застраховка „Отмяна\""
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "4★ хотели по маршрута",
        "board": "Закуска",
        "price_bgn": 2498,
        "price_eur": 1277,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-1_1737985341396.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-1_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-2_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-3_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-4_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-5_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-6_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-7_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-8_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-9_1737985341396.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-10_1737985341396.jpg"
    ],
    "featured": false
  },
  {
    "id": 83,
    "refNum": "Е706",
    "title": "Природен феномен Метеора – Катерини Паралия – Солун",
    "category": "excursion",
    "tags": [
      "lyato-gartsia",
      "culture",
      "nature"
    ],
    "destination": "Метеора / Солун, Гърция",
    "country": "greece",
    "duration": "3 дни / 2 нощувки",
    "days": 3,
    "nights": 2,
    "price_bgn": 289,
    "price_eur": 148,
    "dates": [
      "2026-09-19",
      "2026-10-09",
      "2026-10-31"
    ],
    "next_date": "2026-09-19",
    "transport": "bus",
    "description": "Уникалните скали на Метеора с манастирите (ЮНЕСКО), морето на Катерини Паралия и византийският Солун. 3 дни с автобус и водач.",
    "program": [
      {
        "day": "Ден 1",
        "text": "София → Солун → Катерини Паралия (~370 км). Настаняване и свободно време."
      },
      {
        "day": "Ден 2",
        "text": "Посещение на иконописна работилница, манастирите на Метеора, свободно; вечер по желание вечеря в таверна с музика."
      },
      {
        "day": "Ден 3",
        "text": "Панорамен Солун – Бялата кула, паметникът на Александър, църквата „Св. Димитър\"; връщане в София."
      }
    ],
    "includes": [
      "Автобусен транспорт 3★",
      "2 нощувки със закуска (2-3★)",
      "Програма в Солун",
      "Екскурзия до Метеора",
      "Представител",
      "Медицинска застраховка (5000 €)",
      "Багаж 25 кг"
    ],
    "excludes": [
      "Входни такси манастири (~5 €)",
      "Вечеря в таверна (35 €)",
      "Градска такса (~3 €/нощ)",
      "Лични разходи"
    ],
    "departures": [
      "София (07:00)"
    ],
    "hotels": [
      {
        "name": "2-3★ хотел Катерини Паралия",
        "board": "Закуска",
        "price_bgn": 289,
        "price_eur": 148,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_priroden-fenomen-meteora-katerini-paraliya-solun-1_1776245586706.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_priroden-fenomen-meteora-katerini-paraliya-solun-1_1776245586706.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_priroden-fenomen-meteora-katerini-paraliya-solun-2_1776245586706.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_priroden-fenomen-meteora-katerini-paraliya-solun-3_1776245586706.jpg"
    ],
    "featured": false
  },
  {
    "id": 84,
    "refNum": "Е713",
    "title": "Екскурзия до Кавала, остров Тасос и плажът Амолофи",
    "category": "excursion",
    "tags": [
      "lyato-gartsia",
      "beach",
      "culture"
    ],
    "destination": "Кавала / Тасос, Гърция",
    "country": "greece",
    "duration": "3 дни / 2 нощувки",
    "days": 3,
    "nights": 2,
    "price_bgn": 289,
    "price_eur": 148,
    "dates": [
      "2026-06-26",
      "2026-07-03",
      "2026-07-10",
      "2026-07-17",
      "2026-07-24",
      "2026-07-31",
      "2026-08-07",
      "2026-08-21",
      "2026-08-28",
      "2026-09-05"
    ],
    "next_date": "2026-06-26",
    "transport": "bus",
    "description": "Крайбрежен уикенд – историческата Кавала, плажът Амолофи и факултативна екскурзия до остров Тасос. 2 нощувки в хотел Esperia 3★ в центъра на Кавала.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Пловдив/София → плаж Амолофи (свободно) → Кавала с пешеходна обиколка."
      },
      {
        "day": "Ден 2",
        "text": "Свободно или факулт. целодневна екскурзия до о-в Тасос (ферибот, маслинова фабрика, манастири)."
      },
      {
        "day": "Ден 3",
        "text": "Връщане на плаж Амолофи до 16:00, отпътуване за Пловдив/София."
      }
    ],
    "includes": [
      "Автобусен транспорт",
      "2 нощувки със закуска (бюфет) в Esperia 3★",
      "Пешеходна обиколка на Кавала",
      "Трансфери до плажа",
      "Медицинска застраховка (2000 €)",
      "Представител"
    ],
    "excludes": [
      "Факулт. Тасос (25 €/15 € деца)",
      "Доплащане Пловдив (15 €)",
      "Градска такса (5 €/стая/нощ)",
      "Преден ред (10 €)"
    ],
    "departures": [
      "Пловдив (05:00)",
      "София (07:00)"
    ],
    "hotels": [
      {
        "name": "Esperia 3★ (Кавала)",
        "board": "Закуска",
        "price_bgn": 289,
        "price_eur": 148,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-1_1776246366713.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-1_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-2_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-3_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-4_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-5_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-6_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-7_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-8_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-9_1776246366713.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-kavala-ostrov-tasos-i-plazhat-amolofi-s-d-10_1776246366713.jpg"
    ],
    "featured": false
  },
  {
    "id": 85,
    "refNum": "П1078",
    "title": "Почивка на Халкидики – Касандра (автобус от Пловдив и София)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "family",
      "ranni-zapisvaniya"
    ],
    "destination": "Халкидики – Касандра, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 513,
    "price_eur": 262,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04",
      "2026-07-11",
      "2026-07-18",
      "2026-07-25",
      "2026-08-01",
      "2026-08-08",
      "2026-08-15"
    ],
    "next_date": "2026-06-13",
    "transport": "bus",
    "description": "Лято 2026 на полуостров Касандра, Халкидики – 7 нощувки с автобусен транспорт от София и Пловдив и богат избор от хотели на брега на Егейско море.",
    "includes": [
      "Автобусен транспорт с пътни такси",
      "7 нощувки в избран хотел",
      "Багаж до 25 кг",
      "Медицинска застраховка (5000 €)",
      "Представител"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси (3-15 €/нощ)",
      "Факулт. екскурзии",
      "Трансфер от Пловдив/Пазарджик (25 €)"
    ],
    "departures": [
      "София",
      "Пловдив",
      "Пазарджик"
    ],
    "hotels": [
      {
        "name": "Olympic Kosma",
        "board": "Според хотела",
        "price_bgn": 513,
        "price_eur": 262,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/1959/images/661944262e858467309642.jpg"
      },
      {
        "name": "Kassandra Bay Hotel",
        "board": "Според хотела",
        "price_bgn": 549,
        "price_eur": 281,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/1455/images/BIG_IMG_148457504863238.jpg"
      },
      {
        "name": "Dionysos",
        "board": "Според хотела",
        "price_bgn": 564,
        "price_eur": 288,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/3524/images/20.jpeg"
      },
      {
        "name": "Sousouras Hotel",
        "board": "Според хотела",
        "price_bgn": 579,
        "price_eur": 296,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/2426/images/BIG_839_sousouras-hotel_69007._15144481938497.peg"
      },
      {
        "name": "Elinotel Polis",
        "board": "Според хотела",
        "price_bgn": 699,
        "price_eur": 357,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/957/images/636e0b49728d1310889527.jpg"
      },
      {
        "name": "Chrousso Village",
        "board": "Според хотела",
        "price_bgn": 739,
        "price_eur": 378,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/707/images/BIG_IMG12_15181709848493.jpg"
      },
      {
        "name": "Hanioti Grand Hotel",
        "board": "Според хотела",
        "price_bgn": 820,
        "price_eur": 419,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/1233/images/66194ce5cb41d037088182.jpg"
      },
      {
        "name": "Aegean Melathron Thalasso Spa 5★",
        "board": "Според хотела",
        "price_bgn": 988,
        "price_eur": 505,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/61/images/66195baa46936493973452.jpg"
      },
      {
        "name": "Ammon Zeus",
        "board": "Според хотела",
        "price_bgn": 1094,
        "price_eur": 559,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/204/images/BIG_Amon_Zeus_2018_082_15302651128226.jpg"
      },
      {
        "name": "Kassandra Palace Seaside Resort",
        "board": "Според хотела",
        "price_bgn": 1210,
        "price_eur": 619,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/1453/images/66195de6c0ce7715926628.jpg"
      },
      {
        "name": "Elinotel Apolamare",
        "board": "Според хотела",
        "price_bgn": 1405,
        "price_eur": 716,
        "image": "https://xml.emerald.bg/web/files/hotels/Hotel/956/images/661961c43472a655301864.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 86,
    "refNum": "Е710",
    "title": "Корфу – островът на нимфите (хотел Hellinis 3★)",
    "category": "excursion",
    "tags": [
      "lyato-gartsia",
      "beach",
      "culture",
      "allInclusive"
    ],
    "destination": "о-в Корфу, Гърция",
    "country": "greece",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 577,
    "price_eur": 295,
    "dates": [
      "2026-06-17",
      "2026-07-01",
      "2026-07-15",
      "2026-07-22",
      "2026-08-05",
      "2026-08-12",
      "2026-08-19",
      "2026-08-26",
      "2026-09-03",
      "2026-09-22"
    ],
    "next_date": "2026-06-17",
    "transport": "bus",
    "description": "Корфу в Йонийско море – пясъчни плажове, византийски храмове и екзотична природа. Керкира, дворецът Ахилеон, манастирът Палеокастрица, Сидари и Каналът на любовта. 4 нощувки All Inclusive.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване рано сутрин; ферибот Игуменица–Корфу; настаняване."
      },
      {
        "day": "Ден 2",
        "text": "Факулт. Керкира и дворецът Мон Репо."
      },
      {
        "day": "Ден 3",
        "text": "Факулт. Палеокастрица и Сидари с Канала на любовта."
      },
      {
        "day": "Ден 4",
        "text": "Свободен плажен ден или факулт. лодка до Антипаксос и Паксос."
      },
      {
        "day": "Ден 5",
        "text": "Връщане за България."
      }
    ],
    "includes": [
      "Автобусен транспорт",
      "4 нощувки All Inclusive",
      "Ферибот",
      "Водач на български",
      "Медицинска застраховка (10 000 €)"
    ],
    "excludes": [
      "Такса гориво",
      "Градска такса (5 €/нощ)",
      "Факулт. екскурзии и входни такси"
    ],
    "departures": [
      "София (05:30)",
      "Дупница",
      "Благоевград",
      "Сандански"
    ],
    "hotels": [
      {
        "name": "Hellinis 3★ (Корфу)",
        "board": "All Inclusive",
        "price_bgn": 577,
        "price_eur": 295,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-1_1776245891710.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-1_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-2_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-3_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-4_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-5_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-6_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-7_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-8_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-9_1776245891710.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-hellinisquot-3-10_1776245891710.jpg"
    ],
    "featured": false
  },
  {
    "id": 87,
    "refNum": "Е712",
    "title": "Йонийска мечта – Лефкада, Кефалония и Закинтос",
    "category": "excursion",
    "tags": [
      "lyato-gartsia",
      "beach",
      "nature",
      "adventure"
    ],
    "destination": "Йонийски острови, Гърция",
    "country": "greece",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 597,
    "price_eur": 305,
    "dates": [
      "2026-06-10",
      "2026-09-09",
      "2026-09-23"
    ],
    "next_date": "2026-06-10",
    "transport": "bus",
    "description": "Три приказни йонийски острова – Лефкада, Кефалония и Закинтос с крайбрежни круизи, пещерата Мелисани, плажа Миртос и Синьото пещери. 4 нощувки с водач.",
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване; вечер на Лефкада с пешеходна обиколка на столицата."
      },
      {
        "day": "Ден 2",
        "text": "Факулт. 9-часов круиз: плажове Порто Кацики/Егремни, Фискардо, Итака, Меганиси."
      },
      {
        "day": "Ден 3",
        "text": "Ферибот до Кефалония; Сами; факулт. пещерата Мелисани; плажа Миртос; ферибот до Закинтос."
      },
      {
        "day": "Ден 4",
        "text": "Факулт. 7-часов круиз до Сините пещери и Залива на корабокрушението; обиколка на Закинтос."
      },
      {
        "day": "Ден 5",
        "text": "Връщане за България."
      }
    ],
    "includes": [
      "Автобусен транспорт",
      "2 нощувки Лефкада + 2 Закинтос (3★) със закуска",
      "Феrиботи",
      "Обиколки",
      "Водач",
      "Медицинска застраховка (10 000 €)"
    ],
    "excludes": [
      "Такса гориво",
      "Градска такса (5 €/нощ)",
      "Факулт. круизи и входни такси"
    ],
    "departures": [
      "София (06:00)",
      "Дупница",
      "Благоевград",
      "Сандански"
    ],
    "hotels": [
      {
        "name": "3★ хотели Лефкада + Закинтос",
        "board": "Закуска",
        "price_bgn": 597,
        "price_eur": 305,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-1_1776246182712.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-1_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-2_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-3_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-4_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-5_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-6_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-7_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-8_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-9_1776246182712.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_yoniyska-mechta-10_1776246182712.jpg"
    ],
    "featured": false
  },
  {
    "id": 89,
    "refNum": "Е702",
    "title": "Почивка на остров Евия в Едипсос – море и СПА оазис",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "nature",
      "luxury"
    ],
    "destination": "о-в Евия – Едипсос, Гърция",
    "country": "greece",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 626,
    "price_eur": 320,
    "dates": [
      "2026-10-02"
    ],
    "next_date": "2026-10-02",
    "transport": "bus",
    "description": "Релакс на остров Евия в Едипсос – термални минерални извори и море. 5 нощувки със закуска и вечеря в хотел Mitho 3★.",
    "includes": [
      "Автобусен транспорт",
      "Ферибот",
      "5 нощувки със закуска",
      "5 вечери (3 ястия)",
      "Медицинска застраховка (4000 €)",
      "Водач"
    ],
    "excludes": [
      "Туристическа такса (5 €/нощ)",
      "Факулт. екскурзии (15-40 €)",
      "Такса гориво",
      "Единична стая (+90 €)"
    ],
    "departures": [
      "София",
      "Перник",
      "Дупница",
      "Благоевград",
      "Сандански"
    ],
    "hotels": [
      {
        "name": "Mitho 3★ (Лутра Едипсос)",
        "board": "Закуска + вечеря",
        "price_bgn": 626,
        "price_eur": 320,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--1_1776245036702.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--1_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--2_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--3_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--4_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--5_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--6_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--7_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--8_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--9_1776245036702.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-gartsiya-na-ostrov-eviya-v-edipsos-more-i-spa--10_1776245036702.jpg"
    ],
    "featured": false
  },
  {
    "id": 90,
    "refNum": "П1125",
    "title": "Мини почивка на Олимпийска Ривиера (Cronwell Platamon 5★)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "luxury",
      "allInclusive"
    ],
    "destination": "Олимпийска Ривиера, Гърция",
    "country": "greece",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 663,
    "price_eur": 339,
    "dates": [
      "2026-09-21"
    ],
    "next_date": "2026-09-21",
    "transport": "bus",
    "description": "Кратка луксозна почивка на Олимпийската Ривиера – 3 нощувки All Inclusive в Cronwell Platamon Resort 5★, с факултативни Метеора и Палеос Панталеймонас.",
    "includes": [
      "Автобусен транспорт",
      "3 нощувки All Inclusive в Cronwell Platamon 5★",
      "Кафе пауза в Солун",
      "Пътни такси",
      "Застраховка (5000 €)"
    ],
    "excludes": [
      "Факулт. Метеора (25 €)",
      "Входни такси манастири (5 €)",
      "Туристическа такса (15 €)",
      "Доплащане 65+"
    ],
    "departures": [
      "София (пл. Александър Невски)"
    ],
    "hotels": [
      {
        "name": "Cronwell Platamon Resort 5★",
        "board": "All Inclusive",
        "price_bgn": 663,
        "price_eur": 339,
        "image": "http://www.welcometravelbg.eu/img/OBEKTI/BIG_IMG_1401349879446.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_mini-pochivka-na-olimpiyska-riviera-gartsiya-2309-1_17772770611125.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_mini-pochivka-na-olimpiyska-riviera-gartsiya-2309-2_17772770611125.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_mini-pochivka-na-olimpiyska-riviera-gartsiya-2309-3_17772770611125.jpg"
    ],
    "featured": false
  },
  {
    "id": 97,
    "refNum": "П456",
    "title": "Почивки на о-в Закинтос – Лято 2026",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "о-в Закинтос, Гърция",
    "country": "greece",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 1033,
    "price_eur": 528,
    "dates": [
      "2026-06-15",
      "2026-07-13",
      "2026-08-10",
      "2026-09-01",
      "2026-09-14",
      "2026-09-21"
    ],
    "next_date": "2026-06-15",
    "transport": "bus",
    "description": "All Inclusive почивка на живописния Закинтос – 6 нощувки в Majestic SPA 4★ в Лаганас, с обиколка на града и факултативни морски екскурзии.",
    "includes": [
      "Автобусен транспорт и феrиботи",
      "6 нощувки All Inclusive в Majestic SPA 4★",
      "Wi-Fi",
      "Обиколка на Закинтос",
      "Мост Рио-Антирио",
      "Медицинска застраховка (10 000 €)",
      "Водач"
    ],
    "excludes": [
      "Факулт. круизи (30-75 €)",
      "Кефалония (75 €)",
      "Курортна такса (10 €/нощ)",
      "Доплащане Пловдив (25 €)"
    ],
    "departures": [
      "Пловдив (02:00)",
      "София (04:00)"
    ],
    "hotels": [
      {
        "name": "Majestic SPA 4★ (Лаганас)",
        "board": "All Inclusive",
        "price_bgn": 1033,
        "price_eur": 528,
        "image": ""
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivki-na-o-v-zakintos-lyato-2026-1_1776245698456.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivki-na-o-v-zakintos-lyato-2026-2_1776245698456.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivki-na-o-v-zakintos-lyato-2026-3_1776245698456.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivki-na-o-v-zakintos-lyato-2026-4_1776245698456.jpg"
    ],
    "featured": false
  },
  {
    "id": 98,
    "refNum": "П1128",
    "title": "Почивка на о-в Крит 2026 – с включени екскурзии и директен полет",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "culture",
      "family"
    ],
    "destination": "о-в Крит, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1645,
    "price_eur": 841,
    "dates": [
      "2026-06-14",
      "2026-06-21",
      "2026-06-28",
      "2026-07-05",
      "2026-08-23",
      "2026-08-30",
      "2026-09-06",
      "2026-09-13",
      "2026-09-20"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "Крит с включени 7 екскурзии – Санторини, Ханя, Ретимно, дворецът Кносос, Спиналонга, платото Ласити и критско село. Директен полет от София.",
    "includes": [
      "Самолетен билет (20 кг + 5 кг)",
      "7 нощувки на Крит",
      "Трансфери",
      "7 екскурзии (Санторини, Ханя, Ретимно, Кносос, Спиналонга, Ласити, критско село)",
      "Медицинска застраховка (10 000 €)",
      "Водач"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Слушалки (15 €)",
      "Такса обработка (5 €)",
      "Входни такси"
    ],
    "departures": [
      "София (Bulgaria Air)"
    ],
    "hotels": [
      {
        "name": "Ilios Hotel",
        "board": "Според хотела",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/9718/gallery/HEG27LQ9.jpg"
      },
      {
        "name": "Agrabella Hotel Adults Only",
        "board": "Според хотела",
        "price_bgn": 1686,
        "price_eur": 862,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8197/gallery/4LXCVFSW.jpg"
      },
      {
        "name": "Niko Elen",
        "board": "Според хотела",
        "price_bgn": 1723,
        "price_eur": 881,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/9689/gallery/Q5BKWCL9.jpg"
      },
      {
        "name": "Azure Mare Hotel",
        "board": "Според хотела",
        "price_bgn": 1847,
        "price_eur": 944,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10104/gallery/9E1UPBLC.jpg"
      },
      {
        "name": "Pollis Hotel",
        "board": "Според хотела",
        "price_bgn": 2038,
        "price_eur": 1042,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8928/gallery/9Y17C2RL.jpg"
      },
      {
        "name": "Lucky Crete",
        "board": "Според хотела",
        "price_bgn": 2038,
        "price_eur": 1042,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/9066/gallery/QBCLR1G6.jpg"
      },
      {
        "name": "Golden Beach Hotel",
        "board": "Според хотела",
        "price_bgn": 2025,
        "price_eur": 1035,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/9717/gallery/HKL5S43R.jpg"
      },
      {
        "name": "Nami Hotel (Ex. Residence Villas)",
        "board": "Според хотела",
        "price_bgn": 2042,
        "price_eur": 1044,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/9488/gallery/4JDFNAX3.jpg"
      },
      {
        "name": "Semiramis Village Hotel 4★",
        "board": "Според хотела",
        "price_bgn": 2202,
        "price_eur": 1126,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10103/gallery/GZT578H6.jpg"
      },
      {
        "name": "Mari Kristin Beach Hotel",
        "board": "Според хотела",
        "price_bgn": 2236,
        "price_eur": 1143,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10106/gallery/QDFAWZN7.jpg"
      },
      {
        "name": "Mediterraneo Hotel",
        "board": "Според хотела",
        "price_bgn": 2321,
        "price_eur": 1187,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10108/gallery/YV51C4PH.jpg"
      },
      {
        "name": "Palmera Beach Hotel & Spa (Adults Only 15+)",
        "board": "Според хотела",
        "price_bgn": 2324,
        "price_eur": 1188,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10109/gallery/CYU76DG2.jpg"
      },
      {
        "name": "Hersonissos Village Hotel",
        "board": "Според хотела",
        "price_bgn": 2388,
        "price_eur": 1221,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/2984/gallery/2DHCQWKN.jpg"
      },
      {
        "name": "Hersonissos Maris Hotel",
        "board": "Според хотела",
        "price_bgn": 2448,
        "price_eur": 1252,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/2982/gallery/UYKB4W85.jpg"
      },
      {
        "name": "Royal Imperial Belvedere 4★",
        "board": "Според хотела",
        "price_bgn": 2680,
        "price_eur": 1370,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10102/gallery/SHJWNYMB.jpg"
      },
      {
        "name": "Hersonissos Palace Crete",
        "board": "Според хотела",
        "price_bgn": 2692,
        "price_eur": 1376,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8076/gallery/EKMHRNQC.jpg"
      },
      {
        "name": "Silva Beach Hotel LUX",
        "board": "Според хотела",
        "price_bgn": 2905,
        "price_eur": 1485,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8077/gallery/R8HG7E9Q.jpg"
      },
      {
        "name": "Akasha Beach Hotel and Spa",
        "board": "Според хотела",
        "price_bgn": 3184,
        "price_eur": 1628,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10105/gallery/3WQB4PTC.jpg"
      },
      {
        "name": "Star Beach Village Water Park",
        "board": "Според хотела",
        "price_bgn": 3184,
        "price_eur": 1628,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8207/gallery/Z1VFET5X.jpg"
      },
      {
        "name": "Blue Sea Beach Affiliated by Meliá",
        "board": "Според хотела",
        "price_bgn": 3210,
        "price_eur": 1641,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10107/gallery/Q2KMWXVL.jpg"
      },
      {
        "name": "I-Resort Beach Hotel and Spa",
        "board": "Според хотела",
        "price_bgn": 3353,
        "price_eur": 1714,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10110/gallery/2UYPSA5Q.jpg"
      },
      {
        "name": "Bella Beach",
        "board": "Според хотела",
        "price_bgn": 3496,
        "price_eur": 1787,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8075/gallery/13S8ZFTG.jpg"
      },
      {
        "name": "Harma Boutique",
        "board": "Според хотела",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/8918/gallery/RVJCZ4SP.jpg"
      },
      {
        "name": "Infinity Beach (ex Infinity Blue)",
        "board": "Според хотела",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10113/gallery/KD9T2P1W.jpg"
      },
      {
        "name": "Asana Hotel 4★",
        "board": "Според хотела",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10114/gallery/QPT63SUX.jpg"
      },
      {
        "name": "Anastasia Hotel 3★",
        "board": "Според хотела",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10115/gallery/KD42MJ13.jpg"
      },
      {
        "name": "Aeolos Beach 3★",
        "board": "Според хотела",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3145/hotel/10116/gallery/ZKA2SDU3.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-o-v-krit-2026-s-vklyucheni-ekskurzii-i-dire-1_17762462461128.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-o-v-krit-2026-s-vklyucheni-ekskurzii-i-dire-2_17762462461128.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-o-v-krit-2026-s-vklyucheni-ekskurzii-i-dire-3_17762462461128.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-o-v-krit-2026-s-vklyucheni-ekskurzii-i-dire-4_17762462461128.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-o-v-krit-2026-s-vklyucheni-ekskurzii-i-dire-5_17762462461128.jpg",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-o-v-krit-2026-s-vklyucheni-ekskurzii-i-dire-6_17762462461128.jpg"
    ],
    "featured": false
  },
  {
    "id": 100,
    "refNum": "П999",
    "title": "Алания – Лято 2026 (автобусна програма, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "10 дни / 7 нощувки",
    "days": 10,
    "nights": 7,
    "price_bgn": 529,
    "price_eur": 270,
    "dates": [
      "2026-06-12",
      "2026-06-19",
      "2026-06-26",
      "2026-07-03",
      "2026-07-10"
    ],
    "next_date": "2026-06-12",
    "transport": "bus",
    "description": "Автобусна почивка до Алания с ранни записвания – 7 нощувки в избран хотел и широк избор от оферти на турската ривиера.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки в избран хотел",
      "Трансфери",
      "Медицинска застраховка",
      "Представител"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София",
      "Пловдив",
      "Пазарджик"
    ],
    "hotels": [
      {
        "name": "Galaxy Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 459,
        "price_eur": 235,
        "image": ""
      },
      {
        "name": "Club Bayar Beach",
        "board": "All Inclusive",
        "price_bgn": 470,
        "price_eur": 240,
        "image": ""
      },
      {
        "name": "Asrin Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 477,
        "price_eur": 244,
        "image": ""
      },
      {
        "name": "Cleopatra Golden Beach",
        "board": "All Inclusive",
        "price_bgn": 477,
        "price_eur": 244,
        "image": ""
      },
      {
        "name": "Villa Sun Flower Hotel",
        "board": "All Inclusive",
        "price_bgn": 523,
        "price_eur": 267,
        "image": ""
      },
      {
        "name": "Eftalia Downtown Hotel",
        "board": "All Inclusive",
        "price_bgn": 529,
        "price_eur": 270,
        "image": ""
      },
      {
        "name": "Kleopatra Ada Beach",
        "board": "All Inclusive",
        "price_bgn": 530,
        "price_eur": 271,
        "image": ""
      },
      {
        "name": "Kleopatra Royal Palm Hotel",
        "board": "All Inclusive",
        "price_bgn": 530,
        "price_eur": 271,
        "image": ""
      },
      {
        "name": "Campushill Hotel",
        "board": "All Inclusive",
        "price_bgn": 530,
        "price_eur": 271,
        "image": ""
      },
      {
        "name": "Lonicera City",
        "board": "All Inclusive",
        "price_bgn": 541,
        "price_eur": 277,
        "image": ""
      },
      {
        "name": "Club Mermaid Alanya",
        "board": "All Inclusive",
        "price_bgn": 541,
        "price_eur": 277,
        "image": ""
      },
      {
        "name": "Club Hotel Anjeliq",
        "board": "All Inclusive",
        "price_bgn": 545,
        "price_eur": 279,
        "image": ""
      },
      {
        "name": "Prestige Alanya",
        "board": "All Inclusive",
        "price_bgn": 548,
        "price_eur": 280,
        "image": ""
      },
      {
        "name": "Kaia Coracesium",
        "board": "All Inclusive",
        "price_bgn": 550,
        "price_eur": 281,
        "image": ""
      },
      {
        "name": "Numa Konaktepe Hotel",
        "board": "All Inclusive",
        "price_bgn": 551,
        "price_eur": 282,
        "image": ""
      },
      {
        "name": "Oba Star Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 562,
        "price_eur": 287,
        "image": ""
      },
      {
        "name": "Eos Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 566,
        "price_eur": 289,
        "image": ""
      },
      {
        "name": "Kaila City Hotel",
        "board": "All Inclusive",
        "price_bgn": 568,
        "price_eur": 290,
        "image": ""
      },
      {
        "name": "Kaila Krizantem",
        "board": "All Inclusive",
        "price_bgn": 568,
        "price_eur": 290,
        "image": ""
      },
      {
        "name": "Sun Heaven Queen",
        "board": "All Inclusive",
        "price_bgn": 568,
        "price_eur": 290,
        "image": ""
      },
      {
        "name": "Eftalia Splash Resort",
        "board": "All Inclusive",
        "price_bgn": 583,
        "price_eur": 298,
        "image": ""
      },
      {
        "name": "Senza The Inn Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 583,
        "price_eur": 298,
        "image": ""
      },
      {
        "name": "Club Paradiso Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 583,
        "price_eur": 298,
        "image": ""
      },
      {
        "name": "The Nora Family Club",
        "board": "All Inclusive",
        "price_bgn": 584,
        "price_eur": 299,
        "image": ""
      },
      {
        "name": "Sey Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 586,
        "price_eur": 300,
        "image": ""
      },
      {
        "name": "Monte Carlo Hotel",
        "board": "All Inclusive",
        "price_bgn": 594,
        "price_eur": 304,
        "image": ""
      },
      {
        "name": "Alaiye Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 600,
        "price_eur": 307,
        "image": ""
      },
      {
        "name": "Xeno Eftalia Resort",
        "board": "All Inclusive",
        "price_bgn": 608,
        "price_eur": 311,
        "image": ""
      },
      {
        "name": "Miarosa Konakli Garden",
        "board": "All Inclusive",
        "price_bgn": 612,
        "price_eur": 313,
        "image": ""
      },
      {
        "name": "Eftalia Village Hv",
        "board": "All Inclusive",
        "price_bgn": 619,
        "price_eur": 316,
        "image": ""
      },
      {
        "name": "Xoria Deluxe Hotel",
        "board": "All Inclusive",
        "price_bgn": 621,
        "price_eur": 318,
        "image": ""
      },
      {
        "name": "Senza Sunset Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 621,
        "price_eur": 318,
        "image": ""
      },
      {
        "name": "Insula Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 622,
        "price_eur": 318,
        "image": ""
      },
      {
        "name": "Eftalia Aqua Hotel",
        "board": "All Inclusive",
        "price_bgn": 624,
        "price_eur": 319,
        "image": ""
      },
      {
        "name": "Caretta Relax Hotel",
        "board": "All Inclusive",
        "price_bgn": 625,
        "price_eur": 320,
        "image": ""
      },
      {
        "name": "Club Sun Heaven Family And Spa",
        "board": "All Inclusive",
        "price_bgn": 627,
        "price_eur": 321,
        "image": ""
      },
      {
        "name": "Tac Premier Hotel",
        "board": "All Inclusive",
        "price_bgn": 631,
        "price_eur": 323,
        "image": ""
      },
      {
        "name": "Noxinn Club Hotel",
        "board": "All Inclusive",
        "price_bgn": 633,
        "price_eur": 324,
        "image": ""
      },
      {
        "name": "Rubi",
        "board": "All Inclusive",
        "price_bgn": 635,
        "price_eur": 325,
        "image": ""
      },
      {
        "name": "Mira Meridia Beach Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 644,
        "price_eur": 329,
        "image": ""
      },
      {
        "name": "Aska Bayview Resort",
        "board": "All Inclusive",
        "price_bgn": 646,
        "price_eur": 330,
        "image": ""
      },
      {
        "name": "Lonicera World",
        "board": "All Inclusive",
        "price_bgn": 646,
        "price_eur": 330,
        "image": ""
      },
      {
        "name": "Eftalia Marin Resort",
        "board": "All Inclusive",
        "price_bgn": 647,
        "price_eur": 331,
        "image": ""
      },
      {
        "name": "Eftalia Ocean Hotel",
        "board": "All Inclusive",
        "price_bgn": 647,
        "price_eur": 331,
        "image": ""
      },
      {
        "name": "Eftalia Blue Hotel",
        "board": "All Inclusive",
        "price_bgn": 647,
        "price_eur": 331,
        "image": ""
      },
      {
        "name": "Oz Hotels Sui",
        "board": "All Inclusive",
        "price_bgn": 649,
        "price_eur": 332,
        "image": ""
      },
      {
        "name": "Doganay Beach Club",
        "board": "All Inclusive",
        "price_bgn": 663,
        "price_eur": 339,
        "image": ""
      },
      {
        "name": "Aska Just In Beach",
        "board": "All Inclusive",
        "price_bgn": 669,
        "price_eur": 342,
        "image": ""
      },
      {
        "name": "Armas Green Fugla Beach",
        "board": "All Inclusive",
        "price_bgn": 669,
        "price_eur": 342,
        "image": ""
      },
      {
        "name": "Timo Deluxe Resort",
        "board": "All Inclusive",
        "price_bgn": 675,
        "price_eur": 345,
        "image": ""
      },
      {
        "name": "Alan Xafira Deluxe Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 680,
        "price_eur": 348,
        "image": ""
      },
      {
        "name": "Incekum Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 681,
        "price_eur": 348,
        "image": ""
      },
      {
        "name": "Kaila Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 681,
        "price_eur": 348,
        "image": ""
      },
      {
        "name": "Caretta Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 692,
        "price_eur": 354,
        "image": ""
      },
      {
        "name": "Lonicera Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 699,
        "price_eur": 357,
        "image": ""
      },
      {
        "name": "Ozkaymak Incekum",
        "board": "All Inclusive",
        "price_bgn": 704,
        "price_eur": 360,
        "image": ""
      },
      {
        "name": "Kleopatra Dreams Beach",
        "board": "All Inclusive",
        "price_bgn": 712,
        "price_eur": 364,
        "image": ""
      },
      {
        "name": "A Good Life Utopia Family Resort",
        "board": "All Inclusive",
        "price_bgn": 719,
        "price_eur": 368,
        "image": ""
      },
      {
        "name": "Holiday Garden Resort",
        "board": "All Inclusive",
        "price_bgn": 719,
        "price_eur": 368,
        "image": ""
      },
      {
        "name": "Holiday Park Resort",
        "board": "All Inclusive",
        "price_bgn": 719,
        "price_eur": 368,
        "image": ""
      },
      {
        "name": "Yalihan Una",
        "board": "All Inclusive",
        "price_bgn": 728,
        "price_eur": 372,
        "image": ""
      },
      {
        "name": "Royal Garden Beach",
        "board": "All Inclusive",
        "price_bgn": 730,
        "price_eur": 373,
        "image": ""
      },
      {
        "name": "Miarosa Incekum Beach",
        "board": "All Inclusive",
        "price_bgn": 737,
        "price_eur": 377,
        "image": ""
      },
      {
        "name": "Sea Life Buket Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 739,
        "price_eur": 378,
        "image": ""
      },
      {
        "name": "Orange County Resort Hotel Alanya",
        "board": "All Inclusive",
        "price_bgn": 740,
        "price_eur": 378,
        "image": ""
      },
      {
        "name": "Palmeras Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 742,
        "price_eur": 379,
        "image": ""
      },
      {
        "name": "Utopia Beach Club",
        "board": "All Inclusive",
        "price_bgn": 743,
        "price_eur": 380,
        "image": ""
      },
      {
        "name": "Ozkaymak Select Resort",
        "board": "All Inclusive",
        "price_bgn": 749,
        "price_eur": 383,
        "image": ""
      },
      {
        "name": "Aydinbey Gold Dreams Hotel",
        "board": "All Inclusive",
        "price_bgn": 751,
        "price_eur": 384,
        "image": ""
      },
      {
        "name": "Lonicera Premium",
        "board": "All Inclusive",
        "price_bgn": 752,
        "price_eur": 384,
        "image": ""
      },
      {
        "name": "Yalihan Aspendos",
        "board": "All Inclusive",
        "price_bgn": 752,
        "price_eur": 384,
        "image": ""
      },
      {
        "name": "Saphir Hotel & Villas",
        "board": "All Inclusive",
        "price_bgn": 758,
        "price_eur": 388,
        "image": ""
      },
      {
        "name": "Noxinn Deluxe Hotel",
        "board": "All Inclusive",
        "price_bgn": 765,
        "price_eur": 391,
        "image": ""
      },
      {
        "name": "Justiniano Deluxe Resort",
        "board": "All Inclusive",
        "price_bgn": 775,
        "price_eur": 396,
        "image": ""
      },
      {
        "name": "The Lumos Deluxe",
        "board": "All Inclusive",
        "price_bgn": 776,
        "price_eur": 397,
        "image": ""
      },
      {
        "name": "Azura Deluxe Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 783,
        "price_eur": 400,
        "image": ""
      },
      {
        "name": "Concordia Celes Hotel",
        "board": "All Inclusive",
        "price_bgn": 800,
        "price_eur": 409,
        "image": ""
      },
      {
        "name": "Calido Sol",
        "board": "All Inclusive",
        "price_bgn": 828,
        "price_eur": 423,
        "image": ""
      },
      {
        "name": "Alarcha Hotels & Resorts",
        "board": "All Inclusive",
        "price_bgn": 841,
        "price_eur": 430,
        "image": ""
      },
      {
        "name": "Utopia World Hotel",
        "board": "All Inclusive",
        "price_bgn": 850,
        "price_eur": 435,
        "image": ""
      },
      {
        "name": "Club Kastalia Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 869,
        "price_eur": 444,
        "image": ""
      },
      {
        "name": "Saphir Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 876,
        "price_eur": 448,
        "image": ""
      },
      {
        "name": "Numa Bay Exclusive Hotel",
        "board": "All Inclusive",
        "price_bgn": 878,
        "price_eur": 449,
        "image": ""
      },
      {
        "name": "Seaphoria Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 880,
        "price_eur": 450,
        "image": ""
      },
      {
        "name": "Utopia Resort & Residence",
        "board": "All Inclusive",
        "price_bgn": 916,
        "price_eur": 468,
        "image": ""
      },
      {
        "name": "Azura World Hotel",
        "board": "All Inclusive",
        "price_bgn": 930,
        "price_eur": 476,
        "image": ""
      },
      {
        "name": "Vikingen Infinity Resort",
        "board": "All Inclusive",
        "price_bgn": 946,
        "price_eur": 484,
        "image": ""
      },
      {
        "name": "Aqi Pegasos Resort",
        "board": "All Inclusive",
        "price_bgn": 954,
        "price_eur": 488,
        "image": ""
      },
      {
        "name": "Litore Resort Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 962,
        "price_eur": 492,
        "image": ""
      },
      {
        "name": "Aqi Pegasos Club",
        "board": "All Inclusive",
        "price_bgn": 963,
        "price_eur": 492,
        "image": ""
      },
      {
        "name": "Labranda Alantur",
        "board": "All Inclusive",
        "price_bgn": 975,
        "price_eur": 499,
        "image": ""
      },
      {
        "name": "White City Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 994,
        "price_eur": 508,
        "image": ""
      },
      {
        "name": "Aqi Pegasos Royal",
        "board": "All Inclusive",
        "price_bgn": 997,
        "price_eur": 510,
        "image": ""
      },
      {
        "name": "Rubi Platinum Spa Resort & Suites",
        "board": "All Inclusive",
        "price_bgn": 1018,
        "price_eur": 521,
        "image": ""
      },
      {
        "name": "Granada Luxury Red",
        "board": "All Inclusive",
        "price_bgn": 1019,
        "price_eur": 521,
        "image": ""
      },
      {
        "name": "Granada Luxury Beach Avsallar",
        "board": "All Inclusive",
        "price_bgn": 1019,
        "price_eur": 521,
        "image": ""
      },
      {
        "name": "Haydarpasha Palace Hotel",
        "board": "All Inclusive",
        "price_bgn": 1020,
        "price_eur": 522,
        "image": ""
      },
      {
        "name": "Justiniano Park Conti",
        "board": "All Inclusive",
        "price_bgn": 1035,
        "price_eur": 529,
        "image": ""
      },
      {
        "name": "Granada Luxury Okurcalar",
        "board": "All Inclusive",
        "price_bgn": 1039,
        "price_eur": 531,
        "image": ""
      },
      {
        "name": "Seven Seas Palmeras Bay Hotel",
        "board": "All Inclusive",
        "price_bgn": 1048,
        "price_eur": 536,
        "image": ""
      },
      {
        "name": "Galeri Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1050,
        "price_eur": 537,
        "image": ""
      },
      {
        "name": "Aria Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1055,
        "price_eur": 539,
        "image": ""
      },
      {
        "name": "Selene Beach & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1055,
        "price_eur": 539,
        "image": ""
      },
      {
        "name": "Delphin Botanik Resort",
        "board": "All Inclusive",
        "price_bgn": 1080,
        "price_eur": 552,
        "image": ""
      },
      {
        "name": "Grand Kolibri Hotel",
        "board": "All Inclusive",
        "price_bgn": 1102,
        "price_eur": 563,
        "image": ""
      },
      {
        "name": "White City Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1109,
        "price_eur": 567,
        "image": ""
      },
      {
        "name": "Delphin Botanik Platinum",
        "board": "All Inclusive",
        "price_bgn": 1110,
        "price_eur": 568,
        "image": ""
      },
      {
        "name": "Delphin Deluxe",
        "board": "All Inclusive",
        "price_bgn": 1110,
        "price_eur": 568,
        "image": ""
      },
      {
        "name": "Serenity Queen Hotel",
        "board": "All Inclusive",
        "price_bgn": 1133,
        "price_eur": 579,
        "image": ""
      },
      {
        "name": "Mylome Luxury Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 1260,
        "price_eur": 644,
        "image": ""
      },
      {
        "name": "Kirman Sidera Luxury & Spa",
        "board": "All Inclusive",
        "price_bgn": 1303,
        "price_eur": 666,
        "image": ""
      },
      {
        "name": "Rubi Platinum Sign",
        "board": "All Inclusive",
        "price_bgn": 1380,
        "price_eur": 706,
        "image": ""
      },
      {
        "name": "Oz Hotels Incekum Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1409,
        "price_eur": 720,
        "image": ""
      },
      {
        "name": "Kirman Arycanda De Luxe",
        "board": "All Inclusive",
        "price_bgn": 1409,
        "price_eur": 720,
        "image": ""
      },
      {
        "name": "Kirman Leodikya Resort",
        "board": "All Inclusive",
        "price_bgn": 1409,
        "price_eur": 720,
        "image": ""
      },
      {
        "name": "Sunprime C-Lounge",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": ""
      }
    ],
    "featured": false
  },
  {
    "id": 101,
    "refNum": "П984",
    "title": "Алания – Лято 2026 (самолет, вторник, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 663,
    "price_eur": 339,
    "dates": [
      "2026-06-09",
      "2026-06-16",
      "2026-06-23",
      "2026-06-30",
      "2026-07-07"
    ],
    "next_date": "2026-06-09",
    "transport": "plane",
    "description": "Чартърен полет до Анталия и 7 нощувки в Алания с ранни записвания.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки в избран хотел",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Club Bayar Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 573,
        "price_eur": 293,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Club%20Bayar%20Beach%20Hotel%201_17078386053541.jpg"
      },
      {
        "name": "Mysea Hotels Alara",
        "board": "All Inclusive",
        "price_bgn": 573,
        "price_eur": 293,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MYSEA%20HOTEL%20ALARA1_15559255046164.jpg"
      },
      {
        "name": "Eftalia Downtown",
        "board": "All Inclusive",
        "price_bgn": 602,
        "price_eur": 308,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_aytur_15734844194313.jpg"
      },
      {
        "name": "Sunstar Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 673,
        "price_eur": 344,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Sunstar%20Beach%20Hotel1_15755611346748.jpg"
      },
      {
        "name": "First Class Hotel",
        "board": "All Inclusive",
        "price_bgn": 685,
        "price_eur": 350,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561824803552.jpg"
      },
      {
        "name": "Kleopatra Melissa Hotel",
        "board": "All Inclusive",
        "price_bgn": 698,
        "price_eur": 357,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20MELISSA%202_16823397414391.jpg"
      },
      {
        "name": "Green Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 710,
        "price_eur": 363,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295919597632.jpg"
      },
      {
        "name": "Simply Fine Hotel Alize",
        "board": "All Inclusive",
        "price_bgn": 720,
        "price_eur": 368,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIMPLY%20FINE%20HOTEL%201_16951072027874.jpg"
      },
      {
        "name": "Acar Hotel Alanya",
        "board": "All Inclusive",
        "price_bgn": 722,
        "price_eur": 369,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15768538544184.jpg"
      },
      {
        "name": "Galaxy Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 724,
        "price_eur": 370,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561003123562.jpg"
      },
      {
        "name": "Bora Bora Butik Hotel",
        "board": "All Inclusive",
        "price_bgn": 724,
        "price_eur": 370,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_unnamed_17343505869002.jpg"
      },
      {
        "name": "Bieno Club Hotel Svs",
        "board": "All Inclusive",
        "price_bgn": 728,
        "price_eur": 372,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Bieno%20Club%20Svs2_16696402463609.jpg"
      },
      {
        "name": "Muz Hotel",
        "board": "All Inclusive",
        "price_bgn": 739,
        "price_eur": 378,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Leto-Turecko-Turecka-riviera-Hotel-Muz_17301920698755.jpeg"
      },
      {
        "name": "Wasa Hotel",
        "board": "All Inclusive",
        "price_bgn": 739,
        "price_eur": 378,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_W1_17260505878758.jpeg"
      },
      {
        "name": "Miarosa Konakli Garden",
        "board": "All Inclusive",
        "price_bgn": 743,
        "price_eur": 380,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_miarosa-konakli-garden-genel-970x650-8_17695050979557.jpeg"
      },
      {
        "name": "Elysee Beach",
        "board": "All Inclusive",
        "price_bgn": 749,
        "price_eur": 383,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_3-plaz_17695021509554.jpg"
      },
      {
        "name": "Buyuk Hotel",
        "board": "All Inclusive",
        "price_bgn": 763,
        "price_eur": 390,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276834948778.jpg"
      },
      {
        "name": "Grand Alisa Alanya",
        "board": "All Inclusive",
        "price_bgn": 763,
        "price_eur": 390,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_grandalisa-hotel-gallery-1_17695033049555.jpg"
      },
      {
        "name": "Club Wasa Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 765,
        "price_eur": 391,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260478998754.jpg"
      },
      {
        "name": "Kleopatra Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 769,
        "price_eur": 393,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20BEACH%20HOTEL1_15746981493568.jpg"
      },
      {
        "name": "Relax Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 771,
        "price_eur": 394,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17262114398761.jpg"
      },
      {
        "name": "Perre Delta Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 784,
        "price_eur": 401,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PERRE%20DELTA%20RESORT%203_16836203306866.jpg"
      },
      {
        "name": "Kleopatra Ada Beach",
        "board": "All Inclusive",
        "price_bgn": 786,
        "price_eur": 402,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20ADA%20BEACH1_15747684985571.jpg"
      },
      {
        "name": "Prestige Alanya",
        "board": "All Inclusive",
        "price_bgn": 792,
        "price_eur": 405,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_A1_17023728236499.jpg"
      },
      {
        "name": "Saritas Hotel",
        "board": "All Inclusive",
        "price_bgn": 794,
        "price_eur": 406,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16944254703602.jpg"
      },
      {
        "name": "Calimera Sunpark Alanya",
        "board": "All Inclusive",
        "price_bgn": 804,
        "price_eur": 411,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_sp-media-pool_1_sunpark_garden_17684697189553.jpeg"
      },
      {
        "name": "Kolibri Hotel",
        "board": "All Inclusive",
        "price_bgn": 806,
        "price_eur": 412,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KOLIBRI%20HOTEL1_16696414655872.jpg"
      },
      {
        "name": "Parador Beach",
        "board": "All Inclusive",
        "price_bgn": 806,
        "price_eur": 412,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG2_17267347318763_17267348388763.jpg"
      },
      {
        "name": "Senza Sunset Beach",
        "board": "All Inclusive",
        "price_bgn": 812,
        "price_eur": 415,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_724403662_17695069189559.jpg"
      },
      {
        "name": "A11 Hotel Obakoy",
        "board": "All Inclusive",
        "price_bgn": 816,
        "price_eur": 417,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17313997858964.jpg"
      },
      {
        "name": "Kleopatra Royal Palm Hotel",
        "board": "All Inclusive",
        "price_bgn": 821,
        "price_eur": 420,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20ROYAL%20PALM%20HOTEL1_15613790286864.jpg"
      },
      {
        "name": "Club Titan Hotel",
        "board": "All Inclusive",
        "price_bgn": 833,
        "price_eur": 426,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_clubtitanhotelalanya1_16716289054203.jpg"
      },
      {
        "name": "Asrin Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 833,
        "price_eur": 426,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ASRIN%20BEACH%20HOTEL%201_17023743214194.jpg"
      },
      {
        "name": "Monte Carlo Hotel",
        "board": "All Inclusive",
        "price_bgn": 839,
        "price_eur": 429,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MONTE%20CARLO%20HOTEL1_15745120984216.jpg"
      },
      {
        "name": "Bonapart Sealine Hotel",
        "board": "All Inclusive",
        "price_bgn": 839,
        "price_eur": 429,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Bonapart%20Sealine1_16708520896062.jpg"
      },
      {
        "name": "Senza The Inn Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 841,
        "price_eur": 430,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16159045627391.jpg"
      },
      {
        "name": "Senza Grand Santana",
        "board": "All Inclusive",
        "price_bgn": 841,
        "price_eur": 430,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Senza%20Grand%20Santana1_16735186706786.jpg"
      },
      {
        "name": "Avena Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 851,
        "price_eur": 435,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295926535866.jpg"
      },
      {
        "name": "Arabella World Hotel",
        "board": "All Inclusive",
        "price_bgn": 861,
        "price_eur": 440,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARABELLA%20WORLD1_16698128414188.jpg"
      },
      {
        "name": "Oba Time Hotel",
        "board": "All Inclusive",
        "price_bgn": 866,
        "price_eur": 443,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17267341478762.jpg"
      },
      {
        "name": "Sunstar Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 884,
        "price_eur": 452,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SUN%20STAR%20RESORT%20HOTEL1_15759050796749.jpg"
      },
      {
        "name": "Senza Garden Holiday Club",
        "board": "All Inclusive",
        "price_bgn": 886,
        "price_eur": 453,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SENZA%20GARDEN%20HOLIDAY%20CLUB1_16699018547013.jpg"
      },
      {
        "name": "Cleopatra Golden Beach",
        "board": "All Inclusive",
        "price_bgn": 888,
        "price_eur": 454,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Cleopatra%20Golden%20Beach%20Hotel1_16681825306073.jpg"
      },
      {
        "name": "Remi Hotel",
        "board": "All Inclusive",
        "price_bgn": 898,
        "price_eur": 459,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_221580327_16541656307342.jpg"
      },
      {
        "name": "Caretta Relax Hotel",
        "board": "All Inclusive",
        "price_bgn": 900,
        "price_eur": 460,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CARETTA%20RELAX%20HOTEL1_16663406317630.jpg"
      },
      {
        "name": "Kleopatra Ramira Hotel",
        "board": "All Inclusive",
        "price_bgn": 906,
        "price_eur": 463,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561835806737.jpg"
      },
      {
        "name": "Miarosa Incekum Beach",
        "board": "All Inclusive",
        "price_bgn": 919,
        "price_eur": 470,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Miarosa-incekum-beach-plaj-970x650-1_17695043139556.jpeg"
      },
      {
        "name": "Kleopatra Atlas (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 923,
        "price_eur": 472,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561802035848.jpg"
      },
      {
        "name": "Ramira Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 923,
        "price_eur": 472,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Ramira%20Beach%20Hotel%201_16836265315778.jpg"
      },
      {
        "name": "Q Aventura Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 929,
        "price_eur": 475,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_5067_15544748975067.jpg"
      },
      {
        "name": "Kleopatra Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 929,
        "price_eur": 475,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20LIFE%20HOTEL%201_16987578487917.jpg"
      },
      {
        "name": "Alaiye Kleopatra Hotel",
        "board": "All Inclusive",
        "price_bgn": 935,
        "price_eur": 478,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548141073515.jpg"
      },
      {
        "name": "Antik Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 937,
        "price_eur": 479,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_hotel-antik-5_17480805569533.jpg"
      },
      {
        "name": "Gold City Hotel",
        "board": "All Inclusive",
        "price_bgn": 937,
        "price_eur": 479,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GOLDCITY1_15751088264880.jpg"
      },
      {
        "name": "Blue Star Hotel",
        "board": "All Inclusive",
        "price_bgn": 945,
        "price_eur": 483,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BLUE%20STAR%20HOTEL2_15743481904199.jpg"
      },
      {
        "name": "Mira Meridia Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 945,
        "price_eur": 483,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_6504_15544750226504.jpg"
      },
      {
        "name": "Solivia Hotel",
        "board": "All Inclusive",
        "price_bgn": 945,
        "price_eur": 483,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TITAN%20SELECT%201_16841451564255.jpg"
      },
      {
        "name": "Xafira Deluxe Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 949,
        "price_eur": 485,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_XAFIRA%20DELUXE%20RESORT%20%26%20SPA1_15765092696564.jpg"
      },
      {
        "name": "Xoria Deluxe Hotel",
        "board": "All Inclusive",
        "price_bgn": 952,
        "price_eur": 487,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_XORIA%20DELUXE1_15631983196878.jpg"
      },
      {
        "name": "Monart City",
        "board": "All Inclusive",
        "price_bgn": 960,
        "price_eur": 491,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276856878782.jpg"
      },
      {
        "name": "Sun Heaven Queen Hotel",
        "board": "All Inclusive",
        "price_bgn": 964,
        "price_eur": 493,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_an_2_16708572413594.jpg"
      },
      {
        "name": "Obastar Hotel",
        "board": "All Inclusive",
        "price_bgn": 968,
        "price_eur": 495,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OBA%20STAR1_15747749634221.jpg"
      },
      {
        "name": "Kaila Krizantem Hotel",
        "board": "All Inclusive",
        "price_bgn": 974,
        "price_eur": 498,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KAILA%20KRIZANTEM1_16697322204214.jpg"
      },
      {
        "name": "Kaila City Hotel",
        "board": "All Inclusive",
        "price_bgn": 974,
        "price_eur": 498,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Kaila%20City%20hotel1_16697137157341.jpg"
      },
      {
        "name": "The Marilis Hill Resort",
        "board": "All Inclusive",
        "price_bgn": 974,
        "price_eur": 498,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_%D0%BC%D0%B0%D1%80%D0%B8%D0%BB%D0%B8%D1%81_16148515067344.jpg"
      },
      {
        "name": "Eos Beach Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 974,
        "price_eur": 498,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_land-of-paradise-beach_17368420746785.jpg"
      },
      {
        "name": "Drita Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 978,
        "price_eur": 500,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DRITA%20RESORT1_16715437414885.jpg"
      },
      {
        "name": "Concordia Celes Hotel",
        "board": "All Inclusive",
        "price_bgn": 982,
        "price_eur": 502,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_0bc91fe6_z_15561839473936.jpg"
      },
      {
        "name": "Insula Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 982,
        "price_eur": 502,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_56_17424620639478.jpg"
      },
      {
        "name": "Blue Wave Suite Hotel",
        "board": "All Inclusive",
        "price_bgn": 986,
        "price_eur": 504,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561812213539.jpg"
      },
      {
        "name": "Anitas Hotel",
        "board": "All Inclusive",
        "price_bgn": 994,
        "price_eur": 508,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17274255628775.jpg"
      },
      {
        "name": "Ramira City Hotel (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 996,
        "price_eur": 509,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15729603036939.jpg"
      },
      {
        "name": "Ramira Joy",
        "board": "All Inclusive",
        "price_bgn": 996,
        "price_eur": 509,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16148495297343.jpg"
      },
      {
        "name": "Vikingen Infinity Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 997,
        "price_eur": 510,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567907356875.jpg"
      },
      {
        "name": "Grand Kolibri Prestige",
        "board": "All Inclusive",
        "price_bgn": 999,
        "price_eur": 511,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_grand%20kolibri%20prestige1_16147705557340.jpg"
      },
      {
        "name": "Club Aqua Plaza",
        "board": "All Inclusive",
        "price_bgn": 1001,
        "price_eur": 512,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17271650058767.jpg"
      },
      {
        "name": "Mc Arancia Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1029,
        "price_eur": 526,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_M.C.%20ARANCIA%20RESORT%20HOTEL1_15761647723531.jpg"
      },
      {
        "name": "Incekum Su Hotel",
        "board": "All Inclusive",
        "price_bgn": 1033,
        "price_eur": 528,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_INCEKUM%20SU%201_16811359196311.jpg"
      },
      {
        "name": "Parador Sky Hotel",
        "board": "All Inclusive",
        "price_bgn": 1033,
        "price_eur": 528,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG4_17626881409549_17626884069549.jpg"
      },
      {
        "name": "Diamond Hill Resort",
        "board": "All Inclusive",
        "price_bgn": 1039,
        "price_eur": 531,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OuterView%2B%282%29%20%28Copy%29_15834220056335.jpg"
      },
      {
        "name": "Elysee Rive Hotel",
        "board": "All Inclusive",
        "price_bgn": 1039,
        "price_eur": 531,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_elysee-rive-sq_17207807248744.jpg"
      },
      {
        "name": "Seaphoria Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1048,
        "price_eur": 536,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEAPHORIA%20BEACH%20RESORT%201_17029778867718.jpg"
      },
      {
        "name": "Club Dizalya",
        "board": "All Inclusive",
        "price_bgn": 1050,
        "price_eur": 537,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_d1_16529638755299.jpeg"
      },
      {
        "name": "Telatiye Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1050,
        "price_eur": 537,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561792053611.jpg"
      },
      {
        "name": "Club Mermaid Village",
        "board": "All Inclusive",
        "price_bgn": 1052,
        "price_eur": 538,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20MERMAID%20VILLAGE1_16715385167515.jpg"
      },
      {
        "name": "Lonicera City Hotel",
        "board": "All Inclusive",
        "price_bgn": 1058,
        "price_eur": 541,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560998426503.jpg"
      },
      {
        "name": "Palmeras Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1060,
        "price_eur": 542,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Palmeras%20Beach%20Hotel1_16732789466312.jpg"
      },
      {
        "name": "Dizalya Palm Garden Resort",
        "board": "All Inclusive",
        "price_bgn": 1068,
        "price_eur": 546,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DIZALYA%20PALM%20GARDEN%20RESORT1_15802251335245.jpg"
      },
      {
        "name": "Eftalia Marin Resort",
        "board": "All Inclusive",
        "price_bgn": 1070,
        "price_eur": 547,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_eftalia%20marin1_15739038665881.jpg"
      },
      {
        "name": "Kahya Hotel",
        "board": "All Inclusive",
        "price_bgn": 1080,
        "price_eur": 552,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561916252991.jpg"
      },
      {
        "name": "Calido Sol Hotel",
        "board": "All Inclusive",
        "price_bgn": 1080,
        "price_eur": 552,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_793121714_17720174083606.jpg"
      },
      {
        "name": "White City Beach Hotel (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1085,
        "price_eur": 555,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_WHITE%20CITY%20BEACH%20HOTEL1_15749323163615.jpg"
      },
      {
        "name": "Eftalia Splash Resort",
        "board": "All Inclusive",
        "price_bgn": 1085,
        "price_eur": 555,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16529427635089.jpg"
      },
      {
        "name": "Caretta Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1091,
        "price_eur": 558,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CARETTA%20BEACH%20HOTEL1_16662729827629.jpg"
      },
      {
        "name": "Grand Kaptan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1093,
        "price_eur": 559,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566308776850.jpg"
      },
      {
        "name": "Mesut Hotel",
        "board": "All Inclusive",
        "price_bgn": 1093,
        "price_eur": 559,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MESUT%20HOTEL%201_17110255275985.jpg"
      },
      {
        "name": "Ozkaymak Incekum Hotel",
        "board": "All Inclusive",
        "price_bgn": 1095,
        "price_eur": 560,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OZKAYMAK%20INCEKUM1_15838371224224.jpg"
      },
      {
        "name": "Asia Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1095,
        "price_eur": 560,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295926696063.jpg"
      },
      {
        "name": "Eftalia Village Hotel",
        "board": "All Inclusive",
        "price_bgn": 1097,
        "price_eur": 561,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_eftaliavillage_15734806996847.jpg"
      },
      {
        "name": "Doganay Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1097,
        "price_eur": 561,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15550554274878.jpg"
      },
      {
        "name": "Rubi Hotel",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_503049052_17695058649558.jpg"
      },
      {
        "name": "Oz Hotels Sui Resort",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17292353758880.jpg"
      },
      {
        "name": "Aydinbey Gold Dreams",
        "board": "All Inclusive",
        "price_bgn": 1107,
        "price_eur": 566,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_aydinbey-gold-dreams-genel1_16714407163384.jpg"
      },
      {
        "name": "Blue Diamond Alya",
        "board": "All Inclusive",
        "price_bgn": 1109,
        "price_eur": 567,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276823538776.jpg"
      },
      {
        "name": "Gardenia Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561870876733.jpg"
      },
      {
        "name": "Cooks Club Alanya",
        "board": "All Inclusive",
        "price_bgn": 1117,
        "price_eur": 571,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276838298779.jpg"
      },
      {
        "name": "Kaila Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1123,
        "price_eur": 574,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_o318946_16714443496940.jpg"
      },
      {
        "name": "Eftalia Blue Hotel",
        "board": "All Inclusive",
        "price_bgn": 1127,
        "price_eur": 576,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_download%20%287%29_17611270639547.jpg"
      },
      {
        "name": "Kahya Resort Aqua & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1129,
        "price_eur": 577,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KAHYA%20RESORT%20AQUA2_15748653936857.jpg"
      },
      {
        "name": "Ozkaymak Select Resort",
        "board": "All Inclusive",
        "price_bgn": 1136,
        "price_eur": 581,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OZKAYMAK%20SELECT%20RESORT%20HOTEL%201_17053336685106.jpg"
      },
      {
        "name": "Citrus Plaza",
        "board": "All Inclusive",
        "price_bgn": 1136,
        "price_eur": 581,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295926874396.jpg"
      },
      {
        "name": "Eftalia Aqua Resort",
        "board": "All Inclusive",
        "price_bgn": 1138,
        "price_eur": 582,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_EFTALIA%20AQUA_16553659064497.jpg"
      },
      {
        "name": "Sunny Hill Alya",
        "board": "All Inclusive",
        "price_bgn": 1138,
        "price_eur": 582,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276861748783.jpg"
      },
      {
        "name": "Michell Hotel (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1146,
        "price_eur": 586,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_6742_15544750366742.jpg"
      },
      {
        "name": "Labranda Hotel Alantur",
        "board": "All Inclusive",
        "price_bgn": 1162,
        "price_eur": 594,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LABRANDA%20%20ALANTUR1_15839313406738.jpg"
      },
      {
        "name": "Club Sun Heaven Family & Spa",
        "board": "All Inclusive",
        "price_bgn": 1168,
        "price_eur": 597,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_5087_15544748995087.jpg"
      },
      {
        "name": "Kleopatra Dreams Beach",
        "board": "All Inclusive",
        "price_bgn": 1173,
        "price_eur": 600,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17193961636908.jpg"
      },
      {
        "name": "Riviera Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1185,
        "price_eur": 606,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260488658756.jpg"
      },
      {
        "name": "Gardenia Hotel",
        "board": "All Inclusive",
        "price_bgn": 1187,
        "price_eur": 607,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17278526098820.jpg"
      },
      {
        "name": "Justiniano Club Alanya",
        "board": "All Inclusive",
        "price_bgn": 1189,
        "price_eur": 608,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16811386555092.jpg"
      },
      {
        "name": "Laguna Beach Alya Resort Spa",
        "board": "All Inclusive",
        "price_bgn": 1195,
        "price_eur": 611,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276847538781.jpg"
      },
      {
        "name": "En Vie Beach Boutique Hotel (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1199,
        "price_eur": 613,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17288887838831.jpg"
      },
      {
        "name": "Aska Just In Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1213,
        "price_eur": 620,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ASKA%20JUST%20IN%20BEACH%20HOTEL1_16553863144193.jpg"
      },
      {
        "name": "Antique Roman Palace (16+ Adult Only)",
        "board": "All Inclusive",
        "price_bgn": 1217,
        "price_eur": 622,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ANTIQUE%20ROMAN%20PALACE1_15748618184875.jpg"
      },
      {
        "name": "Mary Hotel Alanya",
        "board": "All Inclusive",
        "price_bgn": 1217,
        "price_eur": 622,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIRIUS%20DELUXE2_16837956515607.jpg"
      },
      {
        "name": "Orange County Alanya",
        "board": "All Inclusive",
        "price_bgn": 1217,
        "price_eur": 622,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567870625991.jpg"
      },
      {
        "name": "Riviera Zen",
        "board": "All Inclusive",
        "price_bgn": 1217,
        "price_eur": 622,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260498108757.jpg"
      },
      {
        "name": "Club Turtas Beach",
        "board": "All Inclusive",
        "price_bgn": 1218,
        "price_eur": 623,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561975076066.jpg"
      },
      {
        "name": "Lonicera World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1222,
        "price_eur": 625,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567858126077.jpg"
      },
      {
        "name": "Sealife Buket Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1226,
        "price_eur": 627,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEALIFE%20BUKET%201_16837161934191.jpg"
      },
      {
        "name": "A Good Life Utopia Family Resort",
        "board": "All Inclusive",
        "price_bgn": 1232,
        "price_eur": 630,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_65f316d00e258280363408_17647553619552.jpg"
      },
      {
        "name": "Saphir Hotel & Villas",
        "board": "All Inclusive",
        "price_bgn": 1240,
        "price_eur": 634,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SAPHIR%20HOTEL%20%26%20VILLAS%201_16553849166870.jpg"
      },
      {
        "name": "Incekum West Hotel",
        "board": "All Inclusive",
        "price_bgn": 1240,
        "price_eur": 634,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_INCEKUM%20WEST%20HOTEL%201_17065421316974.jpg"
      },
      {
        "name": "Royal Garden Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1242,
        "price_eur": 635,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20GARDEN%20BEACH%20HOTEL%201_16837076217633.jpg"
      },
      {
        "name": "Azura World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1246,
        "price_eur": 637,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17478210069531.jpg"
      },
      {
        "name": "Alaiye Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1248,
        "price_eur": 638,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16551209903516.jpg"
      },
      {
        "name": "Meryan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1248,
        "price_eur": 638,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MERYAN%20HOTEL3_16551286723383.jpg"
      },
      {
        "name": "Q Premium Resort",
        "board": "All Inclusive",
        "price_bgn": 1254,
        "price_eur": 641,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_q-premium1_15798565205066.jpg"
      },
      {
        "name": "Oz Hotels Incekum Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1254,
        "price_eur": 641,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17292362218881.jpg"
      },
      {
        "name": "The Lumos Deluxe Resort Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1256,
        "price_eur": 642,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LUMOS3_15749366795933.jpg"
      },
      {
        "name": "Club Kastalia Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1262,
        "price_eur": 645,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_tatil-koyu-galeri-1_17331269748991.jpg"
      },
      {
        "name": "Mukarnas Spa & Resort",
        "board": "All Inclusive",
        "price_bgn": 1279,
        "price_eur": 654,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289830843583.jpg"
      },
      {
        "name": "Armas Green Fugla Beach",
        "board": "All Inclusive",
        "price_bgn": 1281,
        "price_eur": 655,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_armas1_16552053576310.jpg"
      },
      {
        "name": "Galeri Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1283,
        "price_eur": 656,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295919043553.jpg"
      },
      {
        "name": "Eftalia Ocean Resort",
        "board": "All Inclusive",
        "price_bgn": 1293,
        "price_eur": 661,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_eftalia%20ocean_15739009506285.jpg"
      },
      {
        "name": "Timo Deluxe Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1310,
        "price_eur": 670,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TIMO%20RESORT1_16552179683229.jpg"
      },
      {
        "name": "Floria Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1312,
        "price_eur": 671,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566284136732.jpg"
      },
      {
        "name": "Lonicera Premium Hotel 18+ (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1332,
        "price_eur": 681,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_premium_genel20_16553915196938.jpg"
      },
      {
        "name": "Litore Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1334,
        "price_eur": 682,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LITORE%20RESORT%20%26%20SPA%20HOTEL2_15765108315573.jpg"
      },
      {
        "name": "Utopia Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1351,
        "price_eur": 691,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_790850453_17695918059560.jpg"
      },
      {
        "name": "Lonicera Resort And Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1357,
        "price_eur": 694,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567857526076.jpg"
      },
      {
        "name": "Justiniano Club Park Conti",
        "board": "All Inclusive",
        "price_bgn": 1414,
        "price_eur": 723,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_JUSTINIANO%20CLUB%20PARK%20CONTI_15693349273587.jpg"
      },
      {
        "name": "White City Resort",
        "board": "All Inclusive",
        "price_bgn": 1428,
        "price_eur": 730,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567908225113.jpg"
      },
      {
        "name": "Justiniano Deluxe Resort",
        "board": "All Inclusive",
        "price_bgn": 1436,
        "price_eur": 734,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295919886050.jpg"
      },
      {
        "name": "Utopia Resort & Residence",
        "board": "All Inclusive",
        "price_bgn": 1436,
        "price_eur": 734,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_790850008_17695926709561.jpg"
      },
      {
        "name": "Azura Deluxe Hotel Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1443,
        "price_eur": 738,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15761428455565.jpg"
      },
      {
        "name": "Saphir Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1469,
        "price_eur": 751,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567891743600.jpg"
      },
      {
        "name": "Selene Beach & Spa Hotel (Adult Only)",
        "board": "All Inclusive",
        "price_bgn": 1469,
        "price_eur": 751,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567903456747.jpg"
      },
      {
        "name": "Aria Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1473,
        "price_eur": 753,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_genel-7-scaled_17374459839053.jpg"
      },
      {
        "name": "Haydarpasha Palace",
        "board": "All Inclusive",
        "price_bgn": 1494,
        "price_eur": 764,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HAYDARPASA%20PALACE1_15766734775976.jpg"
      },
      {
        "name": "Gold Island Selected",
        "board": "All Inclusive",
        "price_bgn": 1494,
        "price_eur": 764,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_0-general-photo-5_17274207468773.jpg"
      },
      {
        "name": "Granada Luxury Red (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1496,
        "price_eur": 765,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260483148682.jpg"
      },
      {
        "name": "Numa Bay Exclusive Hotel",
        "board": "All Inclusive",
        "price_bgn": 1555,
        "price_eur": 795,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567895126081.jpg"
      },
      {
        "name": "Serenity Queen",
        "board": "All Inclusive",
        "price_bgn": 1565,
        "price_eur": 800,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Serenity%20Queen%20Hotel%201_17068902577978.jpg"
      },
      {
        "name": "Green Garden Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1578,
        "price_eur": 807,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Green%20Garden%20Resort1_16668784957631.jpg"
      },
      {
        "name": "Granada Luxury Okurcalar",
        "board": "All Inclusive",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15701954553560.jpg"
      },
      {
        "name": "Utopia World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1659,
        "price_eur": 848,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_UTOPIA%20WORLD%20HOTEL%201_16841543403613.jpg"
      },
      {
        "name": "Aqi Pegasos Club",
        "board": "All Inclusive",
        "price_bgn": 1660,
        "price_eur": 849,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302997818893.jpg"
      },
      {
        "name": "Blue Marlin Deluxe Spa Resort",
        "board": "All Inclusive",
        "price_bgn": 1670,
        "price_eur": 854,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16564093905152.jpg"
      },
      {
        "name": "Granada Luxury Beach",
        "board": "All Inclusive",
        "price_bgn": 1676,
        "price_eur": 857,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GRANADA%20LUXURY%20BEACH1_15767595036734.jpg"
      },
      {
        "name": "Long Beach Resorts",
        "board": "All Inclusive",
        "price_bgn": 1803,
        "price_eur": 922,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295925073577.jpg"
      },
      {
        "name": "Aqi Pegasos Resort",
        "board": "All Inclusive",
        "price_bgn": 1815,
        "price_eur": 928,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302994208892.jpg"
      },
      {
        "name": "Aqi Pegasos Royal",
        "board": "All Inclusive",
        "price_bgn": 1878,
        "price_eur": 960,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Pegasos%20Royal_16148641756287.jpg"
      },
      {
        "name": "Delphin Botanik Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 1915,
        "price_eur": 979,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DELPHIN%20BOTANIK%20HOTEL%20%26%20RESORT1_15767705946723.jpg"
      },
      {
        "name": "Rubi Platinum Spa Resort & Suites",
        "board": "All Inclusive",
        "price_bgn": 1925,
        "price_eur": 984,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17267350408764.jpg"
      },
      {
        "name": "Botanik Platinum",
        "board": "All Inclusive",
        "price_bgn": 1948,
        "price_eur": 996,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BOTANIK%20PLATINIUM1_15765957035566.jpg"
      },
      {
        "name": "Sidera Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 1989,
        "price_eur": 1017,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDERA1_15762530945776.jpg"
      },
      {
        "name": "Delphin Deluxe Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 2050,
        "price_eur": 1048,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295918643543.jpg"
      },
      {
        "name": "Mylome Luxury Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 2052,
        "price_eur": 1049,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Mylome-Luxury_0_15825372507014.jpg"
      },
      {
        "name": "Rubi Platinum Sign",
        "board": "All Inclusive",
        "price_bgn": 2065,
        "price_eur": 1056,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17267357988765.jpg"
      },
      {
        "name": "Arycanda Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2140,
        "price_eur": 1094,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KIRMAN%20HOTELS%20ARYCANDA4_15765994684605.jpg"
      },
      {
        "name": "Leodikya Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2140,
        "price_eur": 1094,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KIRMAN%20LEODIKYA%20HOTEL%20HIGH%20CLASS1_15766712816858.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 102,
    "refNum": "П986",
    "title": "Кемер – Лято 2026 (самолет, вторник, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Кемер, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 602,
    "price_eur": 308,
    "dates": [
      "2026-06-09",
      "2026-06-16",
      "2026-06-23",
      "2026-06-30"
    ],
    "next_date": "2026-06-09",
    "transport": "plane",
    "description": "Директен чартър до Анталия и 7 нощувки в Кемер с ранни записвания.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Santana Hotel",
        "board": "All Inclusive",
        "price_bgn": 555,
        "price_eur": 284,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG15_17277752368815_17277754748815.jpg"
      },
      {
        "name": "Himeros Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 563,
        "price_eur": 288,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16777572107698.jpg"
      },
      {
        "name": "Ares Blue Hotel",
        "board": "All Inclusive",
        "price_bgn": 612,
        "price_eur": 313,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARES%20BLUE%20HOTEL1_15568826876891.jpg"
      },
      {
        "name": "More Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 620,
        "price_eur": 317,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277718138810.jpg"
      },
      {
        "name": "La Muer City Hotel (Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 636,
        "price_eur": 325,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ezgif-7-dbc42f9eff_17277736638812.jpg"
      },
      {
        "name": "Rios Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 642,
        "price_eur": 328,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16777574627700.jpg"
      },
      {
        "name": "Hotel Gold Stone",
        "board": "All Inclusive",
        "price_bgn": 649,
        "price_eur": 332,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276952078797.jpg"
      },
      {
        "name": "Belpoint Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 661,
        "price_eur": 338,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276890628788.jpg"
      },
      {
        "name": "Garden Park Beldibi Hotel",
        "board": "All Inclusive",
        "price_bgn": 665,
        "price_eur": 340,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276928518794.jpg"
      },
      {
        "name": "Ares Dream Hotel",
        "board": "All Inclusive",
        "price_bgn": 675,
        "price_eur": 345,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568834246893.jpg"
      },
      {
        "name": "Ares City Hotel",
        "board": "All Inclusive",
        "price_bgn": 690,
        "price_eur": 353,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17301970496892.jpg"
      },
      {
        "name": "Grand Nar Hotel",
        "board": "All Inclusive",
        "price_bgn": 714,
        "price_eur": 365,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277705298807.jpg"
      },
      {
        "name": "Havana Hotel",
        "board": "All Inclusive",
        "price_bgn": 714,
        "price_eur": 365,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277708708808.jpg"
      },
      {
        "name": "Idyros Hotel",
        "board": "All Inclusive",
        "price_bgn": 739,
        "price_eur": 378,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_006_17441811349525.jpg"
      },
      {
        "name": "Erkal Resort",
        "board": "All Inclusive",
        "price_bgn": 755,
        "price_eur": 386,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276912068793.jpg"
      },
      {
        "name": "Viking Express Hotel",
        "board": "All Inclusive",
        "price_bgn": 755,
        "price_eur": 386,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325272258982.jpg"
      },
      {
        "name": "Magic Sun Hotel",
        "board": "All Inclusive",
        "price_bgn": 769,
        "price_eur": 393,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17284659068828.jpg"
      },
      {
        "name": "Elite Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 776,
        "price_eur": 397,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_beso-beach-hotel_17301979468789.jpg"
      },
      {
        "name": "Saint Star Kemer (Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 780,
        "price_eur": 399,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_28_17352871309006.jpg"
      },
      {
        "name": "The Nix Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 790,
        "price_eur": 404,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17508328899538.jpg"
      },
      {
        "name": "Castle Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 792,
        "price_eur": 405,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276899028790.jpg"
      },
      {
        "name": "Mr Crane Hotel",
        "board": "All Inclusive",
        "price_bgn": 802,
        "price_eur": 410,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277721428811.jpg"
      },
      {
        "name": "Valeri Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 833,
        "price_eur": 426,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_VALERI%20BEACH%20HOTEL1_15839354123799.jpg"
      },
      {
        "name": "Tu Casa Gelidonya Hotel",
        "board": "All Inclusive",
        "price_bgn": 841,
        "price_eur": 430,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TU%20CASA%20GELIDONYA_15694215936763.jpg"
      },
      {
        "name": "Tal Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 843,
        "price_eur": 431,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277763578817.jpg"
      },
      {
        "name": "Golden Sun Hotel",
        "board": "All Inclusive",
        "price_bgn": 859,
        "price_eur": 439,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_02_17276948318796.jpg"
      },
      {
        "name": "Onkel Resort",
        "board": "All Inclusive",
        "price_bgn": 894,
        "price_eur": 457,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_onkel1_15796944516760.jpg"
      },
      {
        "name": "Dedeman Kemer Resort",
        "board": "All Inclusive",
        "price_bgn": 904,
        "price_eur": 462,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17224201198745.jpg"
      },
      {
        "name": "Asdem Park",
        "board": "All Inclusive",
        "price_bgn": 906,
        "price_eur": 463,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_asdempark2_16734376287683.jpg"
      },
      {
        "name": "Adalin Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 919,
        "price_eur": 470,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16559938543769.jpg"
      },
      {
        "name": "Uk Hotel Kiris",
        "board": "All Inclusive",
        "price_bgn": 921,
        "price_eur": 471,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17371007059052.jpg"
      },
      {
        "name": "Pine House Hotel",
        "board": "All Inclusive",
        "price_bgn": 933,
        "price_eur": 477,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16763859844245.jpg"
      },
      {
        "name": "Stella Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 937,
        "price_eur": 479,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Stella%20Hotel1_16717094453031.jpg"
      },
      {
        "name": "Viking Park Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 937,
        "price_eur": 479,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325288118985.jpg"
      },
      {
        "name": "Club Hotel Sunbel",
        "board": "All Inclusive",
        "price_bgn": 937,
        "price_eur": 479,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277680558803.jpg"
      },
      {
        "name": "Miramor Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 937,
        "price_eur": 479,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16716989545161.jpg"
      },
      {
        "name": "Elamir Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 945,
        "price_eur": 483,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Elamir%20Resort%20Hotel%201_16983174476777.jpg"
      },
      {
        "name": "Fame Hotel",
        "board": "All Inclusive",
        "price_bgn": 951,
        "price_eur": 486,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_377780_15722760653737.jpg"
      },
      {
        "name": "Astoria Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 952,
        "price_eur": 487,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ASTORIA%20HOTEL%20KEMER1_16717014296101.jpg"
      },
      {
        "name": "Kemer Dream Hotel",
        "board": "All Inclusive",
        "price_bgn": 958,
        "price_eur": 490,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276959058799.jpg"
      },
      {
        "name": "Aleria Belport Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 964,
        "price_eur": 493,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_13_17352858989005.jpg"
      },
      {
        "name": "Sl La Perla Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 976,
        "price_eur": 499,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17441815699526.jpg"
      },
      {
        "name": "Mg Club Akman Beach",
        "board": "All Inclusive",
        "price_bgn": 988,
        "price_eur": 505,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Club-Akman-Beach-5_17277671488802.jpg"
      },
      {
        "name": "Grand Ring Hotel",
        "board": "All Inclusive",
        "price_bgn": 990,
        "price_eur": 506,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GRAND%20RING%20HOTEL1_16560785673746.jpg"
      },
      {
        "name": "Grand Miramor Hotel",
        "board": "All Inclusive",
        "price_bgn": 999,
        "price_eur": 511,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Grand%20Miramor%20Hotel1_16717039767676.jpg"
      },
      {
        "name": "Golden Lotus Hotel",
        "board": "All Inclusive",
        "price_bgn": 1011,
        "price_eur": 517,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276933258795.jpg"
      },
      {
        "name": "Lancora Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1015,
        "price_eur": 519,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_95CJASD3_20240220172501_17294969218885.jpg"
      },
      {
        "name": "Ambassador Plaza",
        "board": "All Inclusive",
        "price_bgn": 1015,
        "price_eur": 519,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17284652328825.jpg"
      },
      {
        "name": "Viking Beach Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1029,
        "price_eur": 526,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17327815358990.jpg"
      },
      {
        "name": "White Lilyum Hotel",
        "board": "All Inclusive",
        "price_bgn": 1033,
        "price_eur": 528,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MG%20WHITE%20LILYUM%201_16784648493265.jpg"
      },
      {
        "name": "C Istanbul Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 1035,
        "price_eur": 529,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_general-2048x1152_16224557787424.jpg"
      },
      {
        "name": "Selcukhan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1035,
        "price_eur": 529,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277755718816.jpg"
      },
      {
        "name": "Perre La Mer Hotel",
        "board": "All Inclusive",
        "price_bgn": 1041,
        "price_eur": 532,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MIRADA%20DEL%20MAR%20HOTEL1_15568105724242.jpg"
      },
      {
        "name": "Fame Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1044,
        "price_eur": 534,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16559948423741.jpg"
      },
      {
        "name": "Monk Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1046,
        "price_eur": 535,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17466978319530.jpg"
      },
      {
        "name": "Club Hotel Rama",
        "board": "All Inclusive",
        "price_bgn": 1062,
        "price_eur": 543,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276903428791.jpg"
      },
      {
        "name": "Viking Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 1064,
        "price_eur": 544,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325276968983.jpg"
      },
      {
        "name": "Club Hotel Belpinar",
        "board": "All Inclusive",
        "price_bgn": 1093,
        "price_eur": 559,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20HOTEL%20BELPINAR%201_17121385127702.jpg"
      },
      {
        "name": "Viking Star Hotel",
        "board": "All Inclusive",
        "price_bgn": 1111,
        "price_eur": 568,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325292508986.jpg"
      },
      {
        "name": "Viking Nona Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1113,
        "price_eur": 569,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_nona5_17325284538984.jpg"
      },
      {
        "name": "Akka Hotels Claros",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AKKA%20HOTELS%20CLAROS%201_16777659833514.jpg"
      },
      {
        "name": "Transatlantik Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Gallery-Source-011taaks_17156740777682.jpg"
      },
      {
        "name": "Daima Biz Hotel",
        "board": "All Inclusive",
        "price_bgn": 1123,
        "price_eur": 574,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277897914238.jpg"
      },
      {
        "name": "Ring Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1130,
        "price_eur": 578,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RING%20BEACH%20HOTEL%201_17028892394886.jpg"
      },
      {
        "name": "Alder Garden Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1132,
        "price_eur": 579,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277684478804.jpg"
      },
      {
        "name": "Gravel Hotels Select Kemer",
        "board": "All Inclusive",
        "price_bgn": 1136,
        "price_eur": 581,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16566584836292.jpg"
      },
      {
        "name": "Pashas Princess",
        "board": "All Inclusive",
        "price_bgn": 1154,
        "price_eur": 590,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16763861126105.jpg"
      },
      {
        "name": "Camyuva Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1156,
        "price_eur": 591,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16662593803029.jpg"
      },
      {
        "name": "Miarosa Kemer Beach",
        "board": "All Inclusive",
        "price_bgn": 1160,
        "price_eur": 593,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_2_17695972359562.jpg"
      },
      {
        "name": "Champion Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1175,
        "price_eur": 601,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566291375074.jpg"
      },
      {
        "name": "Sinatra Hotel",
        "board": "All Inclusive",
        "price_bgn": 1203,
        "price_eur": 615,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568680143790.jpg"
      },
      {
        "name": "Transatlantik Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1215,
        "price_eur": 621,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARMAS%20TRANSATLANTIK%20HOTEL_16121862656496.jpg"
      },
      {
        "name": "Karmir Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1222,
        "price_eur": 625,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_image-17-f_16563244565949.jpg"
      },
      {
        "name": "The Norm Oriental",
        "board": "All Inclusive",
        "price_bgn": 1224,
        "price_eur": 626,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16564179613738.jpg"
      },
      {
        "name": "Alder Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1234,
        "price_eur": 631,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277691758805.jpg"
      },
      {
        "name": "Dosinia Luxury Resort",
        "board": "All Inclusive",
        "price_bgn": 1285,
        "price_eur": 657,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Dosinia_0_15809118466497.jpg"
      },
      {
        "name": "Greenwood Kemer Resort",
        "board": "All Inclusive",
        "price_bgn": 1289,
        "price_eur": 659,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568654205065.jpg"
      },
      {
        "name": "Loceanica Beach Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1295,
        "price_eur": 662,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277894528746.jpg"
      },
      {
        "name": "Meder Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1297,
        "price_eur": 663,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568058453768.jpg"
      },
      {
        "name": "Ozkaymak Kemer Marina Hotel",
        "board": "All Inclusive",
        "price_bgn": 1301,
        "price_eur": 665,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1724655856_NJ262UIOBR_medium_17277892118819.jpg"
      },
      {
        "name": "Ozkaymak Otem Hotel",
        "board": "All Inclusive",
        "price_bgn": 1301,
        "price_eur": 665,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1682602399_IIV6VEJVKX_medium_17314022988965.jpg"
      },
      {
        "name": "Armas Kaplan Paradise",
        "board": "All Inclusive",
        "price_bgn": 1334,
        "price_eur": 682,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16560764886309.jpg"
      },
      {
        "name": "Armas Gul Beach",
        "board": "All Inclusive",
        "price_bgn": 1334,
        "price_eur": 682,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566208056099.jpg"
      },
      {
        "name": "Lims Bona Dea Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1344,
        "price_eur": 687,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17331273538992.jpg"
      },
      {
        "name": "Emelda Sun Club",
        "board": "All Inclusive",
        "price_bgn": 1369,
        "price_eur": 700,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BEACH%20%26%20PIER_17098148992893.jpg"
      },
      {
        "name": "Ma Biche Kemer",
        "board": "All Inclusive",
        "price_bgn": 1373,
        "price_eur": 702,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16763858473766.jpg"
      },
      {
        "name": "Orange County Kemer (Adults Only 18+)",
        "board": "All Inclusive",
        "price_bgn": 1375,
        "price_eur": 703,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1%20%28Copy%29_16564198742548.jpg"
      },
      {
        "name": "Club Phaselis Rose",
        "board": "All Inclusive",
        "price_bgn": 1379,
        "price_eur": 705,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_image-60514-1549289857_17309712318905.jpg"
      },
      {
        "name": "Armas Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1385,
        "price_eur": 708,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARMAS%20BEACH%20HOTEL1_16560810416098.jpg"
      },
      {
        "name": "Crystal Aura Aqua Collection",
        "board": "All Inclusive",
        "price_bgn": 1408,
        "price_eur": 720,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484130425064.jpg"
      },
      {
        "name": "Crystal De Luxe Comfort Collection",
        "board": "All Inclusive",
        "price_bgn": 1414,
        "price_eur": 723,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484132353024.jpg"
      },
      {
        "name": "Amara Comfort Resort",
        "board": "All Inclusive",
        "price_bgn": 1461,
        "price_eur": 747,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_2_16564070586753.jpg"
      },
      {
        "name": "Armas Labada",
        "board": "All Inclusive",
        "price_bgn": 1465,
        "price_eur": 749,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16563424966100.jpg"
      },
      {
        "name": "Queens Park Goynuk",
        "board": "All Inclusive",
        "price_bgn": 1479,
        "price_eur": 756,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_QUEENS%20PARK%20GOYNUK1_16560822186106.jpg"
      },
      {
        "name": "Crystal Flora Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484132763730.jpg"
      },
      {
        "name": "Crystal Prestige Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484133006293.jpg"
      },
      {
        "name": "Sealife Kemer Resort",
        "board": "All Inclusive",
        "price_bgn": 1516,
        "price_eur": 775,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568111236761.jpg"
      },
      {
        "name": "Pirates Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1518,
        "price_eur": 776,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PIRATES%20BEACH%20CLUB1_15803804315361.jpg"
      },
      {
        "name": "Limak Limra Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 1545,
        "price_eur": 790,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BIG_IMG26_16564229363763_16564231133763.jpg"
      },
      {
        "name": "Le Jardin Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1549,
        "price_eur": 792,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16124414375773.jpg"
      },
      {
        "name": "Sailors Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1555,
        "price_eur": 795,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SAILORS%20BEACH%20CLUB_16121824904314.jpg"
      },
      {
        "name": "Mirada Del Mar Hotel",
        "board": "All Inclusive",
        "price_bgn": 1600,
        "price_eur": 818,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MIRADA%20DEL%20MAR%20HOTEL1_15568065953771.jpg"
      },
      {
        "name": "Baia Salima Kemer",
        "board": "All Inclusive",
        "price_bgn": 1639,
        "price_eur": 838,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16564246566955.jpg"
      },
      {
        "name": "Akka Hotels Alinda",
        "board": "All Inclusive",
        "price_bgn": 1645,
        "price_eur": 841,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16566723323512.jpg"
      },
      {
        "name": "Ulusoy Kemer Holiday Club",
        "board": "All Inclusive",
        "price_bgn": 1678,
        "price_eur": 858,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ULUSOY%20KEMER%20HOLIDAY1_15723543433796.jpg"
      },
      {
        "name": "Rai Foresta Tekirova",
        "board": "All Inclusive",
        "price_bgn": 1715,
        "price_eur": 877,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_foresta1_17695986669563.jpg"
      },
      {
        "name": "Siu Collection",
        "board": "All Inclusive",
        "price_bgn": 1725,
        "price_eur": 882,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AYDINBEY%20SIU%20COLLECTION1_16708411302332.jpg"
      },
      {
        "name": "Kimeros Park Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1725,
        "price_eur": 882,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_kimeros_16576290235839.jpg"
      },
      {
        "name": "Corendon Playa Kemer",
        "board": "All Inclusive",
        "price_bgn": 1743,
        "price_eur": 891,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16564164746157.jpg"
      },
      {
        "name": "Corendon Hydros Club Kemer",
        "board": "All Inclusive",
        "price_bgn": 1750,
        "price_eur": 895,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AQI%20HYDROS%20CLUB%201_16983924033751.jpg"
      },
      {
        "name": "Balmy Foresta Kemer",
        "board": "All Inclusive",
        "price_bgn": 1792,
        "price_eur": 916,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PALOMA%20FORESTA%20RESORT_16119143663263.jpg"
      },
      {
        "name": "Sherwood Exclusive Kemer",
        "board": "All Inclusive",
        "price_bgn": 1815,
        "price_eur": 928,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16566849776762.jpg"
      },
      {
        "name": "Marti Myra Kemer",
        "board": "All Inclusive",
        "price_bgn": 1835,
        "price_eur": 938,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568044092513.jpg"
      },
      {
        "name": "Club Marco Polo Kemer",
        "board": "All Inclusive",
        "price_bgn": 1889,
        "price_eur": 966,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17068870993259.jpg"
      },
      {
        "name": "Seven Seas Hotel Life",
        "board": "All Inclusive",
        "price_bgn": 1903,
        "price_eur": 973,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15871510916104.jpg"
      },
      {
        "name": "Juju Premier Palace",
        "board": "All Inclusive",
        "price_bgn": 1926,
        "price_eur": 985,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16754123817686.jpg"
      },
      {
        "name": "Akka Hotels Antedon",
        "board": "All Inclusive",
        "price_bgn": 1966,
        "price_eur": 1005,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_antedon_16576265825171.jpg"
      },
      {
        "name": "Zena Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 2011,
        "price_eur": 1028,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_4_17325302478987.jpg"
      },
      {
        "name": "Balmy Beach Resort Kemer (Adult Only 18+)",
        "board": "All Inclusive",
        "price_bgn": 2061,
        "price_eur": 1054,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BALMY%20BEACH1_16727489297678.jpg"
      },
      {
        "name": "Rai Premium Tekirova",
        "board": "All Inclusive",
        "price_bgn": 2097,
        "price_eur": 1072,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16486262783781.jpg"
      },
      {
        "name": "Dobedan World Palace",
        "board": "All Inclusive",
        "price_bgn": 2099,
        "price_eur": 1073,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16566842985931.jpg"
      },
      {
        "name": "Akra Kemer",
        "board": "All Inclusive",
        "price_bgn": 2159,
        "price_eur": 1104,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BARUT%20KEMER1_15566289885837.jpg"
      },
      {
        "name": "Fashiontv Luxe Resort",
        "board": "All Inclusive",
        "price_bgn": 2185,
        "price_eur": 1117,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_fashiontv-luxe-resort_823224_17441833699057.jpg"
      },
      {
        "name": "Tui Magic Life Beldibi (Adult Only +16)",
        "board": "All Inclusive",
        "price_bgn": 2189,
        "price_eur": 1119,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RIXOS%20BELDIBI_16121786455579.jpg"
      },
      {
        "name": "Mirage Park Resort",
        "board": "All Inclusive",
        "price_bgn": 2234,
        "price_eur": 1142,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568067416759.jpg"
      },
      {
        "name": "Swandor Hotel & Resort Kemer",
        "board": "All Inclusive",
        "price_bgn": 2312,
        "price_eur": 1182,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568107715049.jpg"
      },
      {
        "name": "Nirvana Dolce Vita",
        "board": "All Inclusive",
        "price_bgn": 2386,
        "price_eur": 1220,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484139846047.jpg"
      },
      {
        "name": "Nirvana Mediterranean Excellence",
        "board": "All Inclusive",
        "price_bgn": 2412,
        "price_eur": 1233,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_nirvana-mediterranean-excellence-generalview2-22cca828b193cd9046d27b2412dc9ba2-Resize1920.JPG_17484141656594.jpg"
      },
      {
        "name": "Gural Premier Tekirova",
        "board": "All Inclusive",
        "price_bgn": 2466,
        "price_eur": 1261,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_gural1_16577141244868.jpg"
      },
      {
        "name": "Rixos Sungate",
        "board": "All Inclusive",
        "price_bgn": 2558,
        "price_eur": 1308,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568130112634.jpg"
      },
      {
        "name": "Rixos Premium Tekirova",
        "board": "All Inclusive",
        "price_bgn": 2934,
        "price_eur": 1500,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16577228472595.jpg"
      },
      {
        "name": "Rixos Sungate Club Diamond",
        "board": "All Inclusive",
        "price_bgn": 3745,
        "price_eur": 1915,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Rixos%20Sungate%20Club%20Diamond1_16128706257312.jpg"
      },
      {
        "name": "Ng Phaselis Bay",
        "board": "All Inclusive",
        "price_bgn": 5081,
        "price_eur": 2598,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16577817823729.jpg"
      },
      {
        "name": "Maxx Royal Kemer",
        "board": "All Inclusive",
        "price_bgn": 6806,
        "price_eur": 3480,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568045315360.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 103,
    "refNum": "П985",
    "title": "Белек – Лято 2026 (самолет, събота, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive",
      "luxury"
    ],
    "destination": "Белек, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 775,
    "price_eur": 396,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "All Inclusive почивка в луксозния Белек с директен чартър до Анталия.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Belkon Hotel",
        "board": "All Inclusive",
        "price_bgn": 775,
        "price_eur": 396,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BELKON%20HOTEL2_16554643244592.jpg"
      },
      {
        "name": "Amon Hotel",
        "board": "All Inclusive",
        "price_bgn": 1068,
        "price_eur": 546,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AMON%20HOTEL1_16147658177339.jpg"
      },
      {
        "name": "Maya World Park",
        "board": "All Inclusive",
        "price_bgn": 1142,
        "price_eur": 584,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MAYA%20WORLD%20PARK_16125213137307.jpg"
      },
      {
        "name": "Crystal World Of Colours Comfort Collection",
        "board": "All Inclusive",
        "price_bgn": 1305,
        "price_eur": 667,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484139027317.jpg"
      },
      {
        "name": "Sy Hotels Belek Boutique Luxury",
        "board": "All Inclusive",
        "price_bgn": 1383,
        "price_eur": 707,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_genel-gorunum-1-1_17364956019008.jpeg"
      },
      {
        "name": "Luna Vista Hotel",
        "board": "All Inclusive",
        "price_bgn": 1385,
        "price_eur": 708,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17626864769548.jpg"
      },
      {
        "name": "Crystal Paraiso Aqua Collection",
        "board": "All Inclusive",
        "price_bgn": 1396,
        "price_eur": 714,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484136213626.jpg"
      },
      {
        "name": "The X Belek",
        "board": "All Inclusive",
        "price_bgn": 1451,
        "price_eur": 742,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_THE%20X%20BELEK%201_17049018707976.jpg"
      },
      {
        "name": "Aydinbey Queens Palace",
        "board": "All Inclusive",
        "price_bgn": 1455,
        "price_eur": 744,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AYDINBEY%20QUEENS%20PALACE%26SPA14_15722727826701.jpg"
      },
      {
        "name": "Innvista Hotels",
        "board": "All Inclusive",
        "price_bgn": 1457,
        "price_eur": 745,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_INNVISTA%20HOTEL1_16554677926167.jpg"
      },
      {
        "name": "Armas Life Belek",
        "board": "All Inclusive",
        "price_bgn": 1461,
        "price_eur": 747,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_318244_03_17334788998998.jpg"
      },
      {
        "name": "Aydinbey Famous Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1467,
        "price_eur": 750,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560256843621.jpg"
      },
      {
        "name": "Asteria Family Resort Belek",
        "board": "All Inclusive",
        "price_bgn": 1473,
        "price_eur": 753,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AQUAWOLRD%20BELEK1_15839379937030.jpg"
      },
      {
        "name": "Orange County Belek",
        "board": "All Inclusive",
        "price_bgn": 1498,
        "price_eur": 766,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15551477786774.jpg"
      },
      {
        "name": "Crystal Waterworld Aqua Collection",
        "board": "All Inclusive",
        "price_bgn": 1522,
        "price_eur": 778,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484136945052.jpg"
      },
      {
        "name": "Crystal Boutique Comfort Collection",
        "board": "All Inclusive",
        "price_bgn": 1549,
        "price_eur": 792,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484131496702.jpg"
      },
      {
        "name": "Green Max Hotel",
        "board": "All Inclusive",
        "price_bgn": 1596,
        "price_eur": 816,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GREEN%20MAX%20HOTEL%201_17126523238685.jpg"
      },
      {
        "name": "Siam Elegance Hotels & Spa",
        "board": "All Inclusive",
        "price_bgn": 1612,
        "price_eur": 824,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568936593646.jpg"
      },
      {
        "name": "Selectum Noa Belek",
        "board": "All Inclusive",
        "price_bgn": 1674,
        "price_eur": 856,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_7-1-scaled-1000x1000_17289839144728.jpg"
      },
      {
        "name": "Sherwood Dreams Resort",
        "board": "All Inclusive",
        "price_bgn": 1711,
        "price_eur": 875,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SHERWOOD%20DREAMS%20RESORT_16127888344233.jpg"
      },
      {
        "name": "Crystal Family Comfort Collecton",
        "board": "All Inclusive",
        "price_bgn": 1725,
        "price_eur": 882,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484135833624.jpg"
      },
      {
        "name": "Tui Blue Sherwood Belek",
        "board": "All Inclusive",
        "price_bgn": 1745,
        "price_eur": 892,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15670025175056.jpg"
      },
      {
        "name": "Adora Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 1756,
        "price_eur": 898,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17320175915207.jpg"
      },
      {
        "name": "Crystal Tat Beach Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1788,
        "price_eur": 914,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484136554860.jpg"
      },
      {
        "name": "Belconti Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1809,
        "price_eur": 925,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289838033622.jpg"
      },
      {
        "name": "Pine Beach Belek",
        "board": "All Inclusive",
        "price_bgn": 1854,
        "price_eur": 948,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Pine%20Beach1_16696315543638.jpg"
      },
      {
        "name": "Selectum Family Resort Belek",
        "board": "All Inclusive",
        "price_bgn": 1895,
        "price_eur": 969,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16559716253636.jpg"
      },
      {
        "name": "Lykia World Antalya Hotel",
        "board": "All Inclusive",
        "price_bgn": 1928,
        "price_eur": 986,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_lykia%20world_15670825233637.jpg"
      },
      {
        "name": "Ic Hotels Santai Family Resort",
        "board": "All Inclusive",
        "price_bgn": 1966,
        "price_eur": 1005,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IC%20Santai%20FAMILY1_15815069193633.jpg"
      },
      {
        "name": "Adam & Eve Hotel",
        "board": "All Inclusive",
        "price_bgn": 1977,
        "price_eur": 1011,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560330853511.jpg"
      },
      {
        "name": "Limak Atlantis De Luxe Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 2042,
        "price_eur": 1044,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_114%20%28Copy%29.JPG_15815998743619.jpg"
      },
      {
        "name": "Limak Arcadia Sport Resort Belek",
        "board": "All Inclusive",
        "price_bgn": 2054,
        "price_eur": 1050,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LIMAK%20ARCADIA%201_16769075113617.jpg"
      },
      {
        "name": "Spice Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 2079,
        "price_eur": 1063,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560334573647.jpg"
      },
      {
        "name": "Paloma Sencia",
        "board": "All Inclusive",
        "price_bgn": 2085,
        "price_eur": 1066,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CORNELIA%20DELUXE%20RESORT1_15816773593623.jpeg"
      },
      {
        "name": "Dobedan Exclusive Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 2177,
        "price_eur": 1113,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ALVA%20DONNA%20EXCLUSIVE1_15816029773526.jpg"
      },
      {
        "name": "Granada Luxury Belek",
        "board": "All Inclusive",
        "price_bgn": 2206,
        "price_eur": 1128,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560329826166.jpg"
      },
      {
        "name": "Tui Magic Life Belek",
        "board": "All Inclusive",
        "price_bgn": 2220,
        "price_eur": 1135,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TUI%20MAGIC%20LIFE%20BELEK_15813282444229.jpg"
      },
      {
        "name": "Tui Magic Life Masmavi",
        "board": "All Inclusive",
        "price_bgn": 2265,
        "price_eur": 1158,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TUI%20MAGIC%20LIFE%20MASMAVI1_16558938006450.jpg"
      },
      {
        "name": "Susesi Luxury Resort",
        "board": "All Inclusive",
        "price_bgn": 2314,
        "price_eur": 1183,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15974069793650.jpg"
      },
      {
        "name": "Gural Premier Belek",
        "board": "All Inclusive",
        "price_bgn": 2384,
        "price_eur": 1219,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_guralpremier-genel-belek-01_15796009594859.jpg"
      },
      {
        "name": "Papillon Ayscha Hotel",
        "board": "All Inclusive",
        "price_bgn": 2396,
        "price_eur": 1225,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PAPILLON%20AYSCHA_15670857213640.jpeg"
      },
      {
        "name": "Xanadu Resort Hotel Belek",
        "board": "All Inclusive",
        "price_bgn": 2435,
        "price_eur": 1245,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_XANADU%20RESORT3_16559056954858.jpg"
      },
      {
        "name": "Rixos Park Belek - The Land Of Legends Access Resort",
        "board": "All Inclusive",
        "price_bgn": 2451,
        "price_eur": 1253,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_genel-gorunum-3-100_17295852257027.jpg"
      },
      {
        "name": "Papillon Belvil Hotel",
        "board": "All Inclusive",
        "price_bgn": 2486,
        "price_eur": 1271,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PAPILLON%20BELVIL%20HOTEL1_15682906603642.jpg"
      },
      {
        "name": "Paloma Grida",
        "board": "All Inclusive",
        "price_bgn": 2503,
        "price_eur": 1280,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17555172007535.jpg"
      },
      {
        "name": "Papillon Zeugma Relaxury Hotel",
        "board": "All Inclusive",
        "price_bgn": 2531,
        "price_eur": 1294,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PAPILLON%20ZEUGMA_15682921483644.jpg"
      },
      {
        "name": "Selectum Luxury Resort Belek",
        "board": "All Inclusive",
        "price_bgn": 2546,
        "price_eur": 1302,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SELECTUM%20LUXURY%20RESORT1_15615387856704.jpeg"
      },
      {
        "name": "Bellis Deluxe Hotel",
        "board": "All Inclusive",
        "price_bgn": 2556,
        "price_eur": 1307,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BELLIS1_15816064485343.jpg"
      },
      {
        "name": "Cornelia Diamond Golf Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2568,
        "price_eur": 1313,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CORNELIA%20DIAMOND_15626791333625.jpg"
      },
      {
        "name": "Kirman Premium Belazur Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2633,
        "price_eur": 1346,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Kirman%20Belazur%201_16769058145054.jpg"
      },
      {
        "name": "Megasaray Club Belek",
        "board": "All Inclusive",
        "price_bgn": 2687,
        "price_eur": 1374,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302048714231.jpg"
      },
      {
        "name": "Sirene Belek Hotel",
        "board": "All Inclusive",
        "price_bgn": 2750,
        "price_eur": 1406,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIRENE%20BELEK_15671749006189.jpg"
      },
      {
        "name": "Gloria Golf Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 2947,
        "price_eur": 1507,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289840573629.jpg"
      },
      {
        "name": "Titanic Deluxe Golf Belek",
        "board": "All Inclusive",
        "price_bgn": 2969,
        "price_eur": 1518,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17237082285037.jpg"
      },
      {
        "name": "Gloria Verde Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 2977,
        "price_eur": 1522,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GLORIA-VERDE_15681200412379.jpg"
      },
      {
        "name": "Voyage Belek Hotel",
        "board": "All Inclusive",
        "price_bgn": 3125,
        "price_eur": 1598,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_VOYAGE%20BELEK%20HOTEL_15626542653651.jpg"
      },
      {
        "name": "The Land Of Legends Nickelodeon Hotel",
        "board": "All Inclusive",
        "price_bgn": 3133,
        "price_eur": 1602,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17247564488750.jpg"
      },
      {
        "name": "Kempinski Hotel The Dome",
        "board": "All Inclusive",
        "price_bgn": 3196,
        "price_eur": 1634,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17343509713635.jpg"
      },
      {
        "name": "Calista Luxury Resort",
        "board": "All Inclusive",
        "price_bgn": 3391,
        "price_eur": 1734,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_calista_15615391033627.jpeg"
      },
      {
        "name": "The Land Of Legends Theme Park",
        "board": "All Inclusive",
        "price_bgn": 3479,
        "price_eur": 1779,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RIXOS%20WORLD%20LAND%20OF%20LEGENDS_15626817196039.jpg"
      },
      {
        "name": "Ela Excellence Resort Belek",
        "board": "All Inclusive",
        "price_bgn": 3679,
        "price_eur": 1881,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17479015903628.jpg"
      },
      {
        "name": "Sueno Hotels Golf Belek",
        "board": "All Inclusive",
        "price_bgn": 3898,
        "price_eur": 1993,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560874293649.jpg"
      },
      {
        "name": "Sueno Hotels Deluxe Belek",
        "board": "All Inclusive",
        "price_bgn": 4178,
        "price_eur": 2136,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_deluxe%20belek_15814953125583.jpg"
      },
      {
        "name": "Rixos Premium Belek",
        "board": "All Inclusive",
        "price_bgn": 4197,
        "price_eur": 2146,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RIXOS%20PREMIUM%20BELEK1_15808049173645.jpg"
      },
      {
        "name": "Ethno Belek",
        "board": "All Inclusive",
        "price_bgn": 4279,
        "price_eur": 2188,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17479016147948.jpg"
      },
      {
        "name": "Gloria Serenity Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 4616,
        "price_eur": 2360,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560894313630.jpg"
      },
      {
        "name": "Club Arona By Laren Hotels",
        "board": "All Inclusive",
        "price_bgn": 5071,
        "price_eur": 2593,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_artboard-11_17696007469564.jpg"
      },
      {
        "name": "Regnum Carya",
        "board": "All Inclusive",
        "price_bgn": 5138,
        "price_eur": 2627,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_7c0a4f6b-1474-4804-b32c-9bca787cab2d_17298470925354.jpeg"
      },
      {
        "name": "Maxx Royal Belek Golf Resort",
        "board": "All Inclusive",
        "price_bgn": 5510,
        "price_eur": 2817,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16705107554230.jpg"
      },
      {
        "name": "Cullinan Golf & Resort Belek",
        "board": "All Inclusive",
        "price_bgn": 5529,
        "price_eur": 2827,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17237081177524.jpg"
      },
      {
        "name": "Azure Villas By Cornelia",
        "board": "All Inclusive",
        "price_bgn": 6110,
        "price_eur": 3124,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AZURE%20VILLAS_15681259795932.jpeg"
      },
      {
        "name": "Rixos Park Belek Suites & Villas",
        "board": "All Inclusive",
        "price_bgn": 7221,
        "price_eur": 3692,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_genel-gorunum-3-100_17295855828888.jpg"
      },
      {
        "name": "Regnum The Crown",
        "board": "All Inclusive",
        "price_bgn": 8813,
        "price_eur": 4506,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_8b949acf-ecde-413d-95dc-687aacf4be11_17295801168887.jpeg"
      },
      {
        "name": "Club Prive By Rixos Belek",
        "board": "All Inclusive",
        "price_bgn": 10757,
        "price_eur": 5500,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15617036156927.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 104,
    "refNum": "П987",
    "title": "Сиде – Лято 2026 (самолет, събота, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Сиде, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 835,
    "price_eur": 427,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Почивка в Сиде на турската ривиера с директен чартър и ранни записвания.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Leda Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 835,
        "price_eur": 427,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LEDA%20BEACH%20HOTEL%201_17029730625352.jpg"
      },
      {
        "name": "Sun Beach Hill Hotel",
        "board": "All Inclusive",
        "price_bgn": 835,
        "price_eur": 427,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_side%20town%20hotel_16717000787677.jpg"
      },
      {
        "name": "Club Side Coast",
        "board": "All Inclusive",
        "price_bgn": 857,
        "price_eur": 438,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20SIDE%20COAST1_16129635054272.jpg"
      },
      {
        "name": "Akdora Elite Hotel And Spa",
        "board": "All Inclusive",
        "price_bgn": 857,
        "price_eur": 438,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17307128908894.jpg"
      },
      {
        "name": "Art Poseidon Side",
        "board": "All Inclusive",
        "price_bgn": 890,
        "price_eur": 455,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1778924136_6a083a687147e_17800646529571.jpg"
      },
      {
        "name": "Ramada Resort By Wyndham Side",
        "board": "All Inclusive",
        "price_bgn": 906,
        "price_eur": 463,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16521835215980.jpg"
      },
      {
        "name": "Side Temple Hotel",
        "board": "All Inclusive",
        "price_bgn": 911,
        "price_eur": 466,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289835234387.jpg"
      },
      {
        "name": "Side West Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 923,
        "price_eur": 472,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16964947927877.jpg"
      },
      {
        "name": "Cenger Beach Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 927,
        "price_eur": 474,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17180923478733.jpg"
      },
      {
        "name": "Sun Beach Park Side",
        "board": "All Inclusive",
        "price_bgn": 943,
        "price_eur": 482,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SUN%20BEACH%20PARK%20SIDE2_16146874294892.jpg"
      },
      {
        "name": "Alessia Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 982,
        "price_eur": 502,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Alessia%20Hotel%201_16895809567621.jpg"
      },
      {
        "name": "Dosi Hotel",
        "board": "All Inclusive",
        "price_bgn": 997,
        "price_eur": 510,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15556881524275.jpg"
      },
      {
        "name": "Merve Sun Side Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1007,
        "price_eur": 515,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15557587855363.jpg"
      },
      {
        "name": "Side Alegria Hotel Spa (Adult Only +16)",
        "board": "All Inclusive",
        "price_bgn": 1023,
        "price_eur": 523,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20ALEGRIA%20HOTEL1_16134732005743.jpg"
      },
      {
        "name": "Dream Of Side Hotel",
        "board": "All Inclusive",
        "price_bgn": 1023,
        "price_eur": 523,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17337348648999.jpg"
      },
      {
        "name": "Irem Garden Hotel Family Club",
        "board": "All Inclusive",
        "price_bgn": 1033,
        "price_eur": 528,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17292493958884.jpg"
      },
      {
        "name": "Asteria Family Resort Side",
        "board": "All Inclusive",
        "price_bgn": 1052,
        "price_eur": 538,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17016777725059.jpg"
      },
      {
        "name": "Seher Sun Palace Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1058,
        "price_eur": 541,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEHER%20SUN%20PALACE1_15825593324304.jpg"
      },
      {
        "name": "Casa Fora Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1070,
        "price_eur": 547,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Casa%20Fora%20Beach%20Resort%201_16819764747709.jpg"
      },
      {
        "name": "Q Ella Beach Side",
        "board": "All Inclusive",
        "price_bgn": 1099,
        "price_eur": 562,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_18_17600001899546.jpg"
      },
      {
        "name": "Sunmelia Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1101,
        "price_eur": 563,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SUNMELIA%20BEACH%20RESORT1_16587557926464.jpg"
      },
      {
        "name": "Side Village Family Hotel",
        "board": "All Inclusive",
        "price_bgn": 1103,
        "price_eur": 564,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Side%20Village%20Hotel1_16685145987627.jpg"
      },
      {
        "name": "Well Palace Hotel Side",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_well-palace-genel-gorunum-7_17294982968886.jpg"
      },
      {
        "name": "Armella Hill Hotel",
        "board": "All Inclusive",
        "price_bgn": 1107,
        "price_eur": 566,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_armella1_16529459907565.jpg"
      },
      {
        "name": "Serenis Side Hotel",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_5957a7c91032e_17282852568824.jpeg"
      },
      {
        "name": "Orfeus Queen Spa",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260508938759.jpg"
      },
      {
        "name": "Asteria Collection Side",
        "board": "All Inclusive",
        "price_bgn": 1123,
        "price_eur": 574,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Exterior%20%281%29_17352887586769.jpg"
      },
      {
        "name": "Master Family Club",
        "board": "All Inclusive",
        "price_bgn": 1138,
        "price_eur": 582,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289834037585.jpg"
      },
      {
        "name": "Asteria Bloom Side",
        "board": "All Inclusive",
        "price_bgn": 1144,
        "price_eur": 585,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HEAVEN%20BEACH1_16588269815353.jpg"
      },
      {
        "name": "Orfeus Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 1150,
        "price_eur": 588,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_orfeus-28-1024x576_17352894609007.jpg"
      },
      {
        "name": "Sunthalia Hotels & Resorts",
        "board": "All Inclusive",
        "price_bgn": 1150,
        "price_eur": 588,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_21_16692024187644.jpg"
      },
      {
        "name": "Selectum Colours Side",
        "board": "All Inclusive",
        "price_bgn": 1150,
        "price_eur": 588,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_EUPHORIA%20BARBAROSS%20BEACH%20RESORT%201_17016800446897.jpg"
      },
      {
        "name": "Side Golden Rock Hotel & Spa (+16 Adult)",
        "board": "All Inclusive",
        "price_bgn": 1152,
        "price_eur": 589,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG3_17247587808753_17260518708753.jpg"
      },
      {
        "name": "Febeach Side",
        "board": "All Inclusive",
        "price_bgn": 1160,
        "price_eur": 593,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_FEBEACH%20SIDE2_16685224827624.jpg"
      },
      {
        "name": "Orfeus Armin Hotel (Adult Only +16)",
        "board": "All Inclusive",
        "price_bgn": 1160,
        "price_eur": 593,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_31-1024x683_17206890268732.jpg"
      },
      {
        "name": "Vita Silva Hotel",
        "board": "All Inclusive",
        "price_bgn": 1160,
        "price_eur": 593,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AMELIA%20BEACH%20RESORT%20HOTEL1_15820211094257.jpg"
      },
      {
        "name": "Side Kum Hotel",
        "board": "All Inclusive",
        "price_bgn": 1173,
        "price_eur": 600,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20KUM%20HOTEL_16134765403688.jpg"
      },
      {
        "name": "Side Lowe Hotel",
        "board": "All Inclusive",
        "price_bgn": 1175,
        "price_eur": 601,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17599987569545.jpg"
      },
      {
        "name": "Water Side Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1181,
        "price_eur": 604,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_6572_15544750256572.jpg"
      },
      {
        "name": "Calido Maris Hotel",
        "board": "All Inclusive",
        "price_bgn": 1191,
        "price_eur": 609,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_main_slide_16584986195855.jpg"
      },
      {
        "name": "Ozlem Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 1209,
        "price_eur": 618,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OZLEM%20GARDEN%20HOTEL1_16588239233677.jpg"
      },
      {
        "name": "Side Aluna Hotel",
        "board": "All Inclusive",
        "price_bgn": 1209,
        "price_eur": 618,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DIAMOND%20BEACH%20%26%20SPA%20HOTEL1_15820186505328.jpg"
      },
      {
        "name": "Sunis Elita Beach Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1224,
        "price_eur": 626,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569644655865.jpg"
      },
      {
        "name": "Side Zeugma (+16 Adult Only)",
        "board": "All Inclusive",
        "price_bgn": 1228,
        "price_eur": 628,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17247580218752.jpg"
      },
      {
        "name": "Side Amour Hotel",
        "board": "All Inclusive",
        "price_bgn": 1232,
        "price_eur": 630,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17599977149544.jpg"
      },
      {
        "name": "Alarcha Hotels And Resorts",
        "board": "All Inclusive",
        "price_bgn": 1234,
        "price_eur": 631,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ALARCHA%20HOTELS%20RESORTS%201_16929596257394.jpg"
      },
      {
        "name": "Linda Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1236,
        "price_eur": 632,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15557574203670.jpg"
      },
      {
        "name": "Cenger Blue Collection",
        "board": "All Inclusive",
        "price_bgn": 1246,
        "price_eur": 637,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_general-view-4_17697663479565.jpg"
      },
      {
        "name": "Side Story Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1248,
        "price_eur": 638,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302878443692.jpg"
      },
      {
        "name": "Grand Seker Hotel",
        "board": "All Inclusive",
        "price_bgn": 1248,
        "price_eur": 638,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_otel_info_162582508313-360x200_17288881878830.jpg"
      },
      {
        "name": "Arcanus Hotels Trendline Side",
        "board": "All Inclusive",
        "price_bgn": 1248,
        "price_eur": 638,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17483290347622.jpg"
      },
      {
        "name": "Seaden Corolla Hotel",
        "board": "All Inclusive",
        "price_bgn": 1250,
        "price_eur": 639,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17337484983686.jpg"
      },
      {
        "name": "Seher Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1254,
        "price_eur": 641,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEHER%20RESORT%20%26%20SPA%20HOTEL1_16584122013691.jpg"
      },
      {
        "name": "Castival Hotel",
        "board": "All Inclusive",
        "price_bgn": 1256,
        "price_eur": 642,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17297517408889.jpg"
      },
      {
        "name": "Port River Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1262,
        "price_eur": 645,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PORT%20RIVER%20HOTEL_16661863015605.jpg"
      },
      {
        "name": "Seher Side Quality Resort & Spa (Adult +16)",
        "board": "All Inclusive",
        "price_bgn": 1265,
        "price_eur": 647,
        "image": "http://aquatour.bg/img/OBEKTI/BIG__66c9c215a2f27_17282847388823.jpg"
      },
      {
        "name": "Glamour Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1269,
        "price_eur": 649,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GLAMOUR%20RESORT1_16587532576048.jpg"
      },
      {
        "name": "Dream Family Club",
        "board": "All Inclusive",
        "price_bgn": 1279,
        "price_eur": 654,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DREAM%20FAMILY%20CLUB%201_16584071206086.jpg"
      },
      {
        "name": "Linda Sunny Beach Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1283,
        "price_eur": 656,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_dis-03-scaled_17319194998967.jpg"
      },
      {
        "name": "La Benata Hotel",
        "board": "All Inclusive",
        "price_bgn": 1285,
        "price_eur": 657,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DSCF2648_16910552117688.jpg"
      },
      {
        "name": "Orange Palace Side",
        "board": "All Inclusive",
        "price_bgn": 1303,
        "price_eur": 666,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_20251216010449-7052_17697692149566.jpeg"
      },
      {
        "name": "Side Breeze Hotel",
        "board": "All Inclusive",
        "price_bgn": 1314,
        "price_eur": 672,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20BREEZE1_15569600686898.jpg"
      },
      {
        "name": "Aletris Deluxe Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1320,
        "price_eur": 675,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ALETRIS%20DELUXE%201_16669684667634.jpg"
      },
      {
        "name": "Riolavitas Spa Resort",
        "board": "All Inclusive",
        "price_bgn": 1322,
        "price_eur": 676,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RIOLAVITAS%20SPA%20RESORT_16131400746092.jpg"
      },
      {
        "name": "Lake & River Side Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1334,
        "price_eur": 682,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LAKE%20AND%20RIVER%20HOTEL%20SIDE1_16661909975210.jpg"
      },
      {
        "name": "Cesars Side",
        "board": "All Inclusive",
        "price_bgn": 1342,
        "price_eur": 686,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BEACH%204_17104940713924.jpg"
      },
      {
        "name": "Dream World Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1350,
        "price_eur": 690,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_3_16681720255347.jpg"
      },
      {
        "name": "Sural Garden",
        "board": "All Inclusive",
        "price_bgn": 1359,
        "price_eur": 695,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Overview%20%283%29_17207763418743.jpg"
      },
      {
        "name": "Nova Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 1359,
        "price_eur": 695,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_o8980_16685906334888.jpg"
      },
      {
        "name": "Adora Calma Beach Hotel (+16 Couples Only)",
        "board": "All Inclusive",
        "price_bgn": 1361,
        "price_eur": 696,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16716962797675.jpg"
      },
      {
        "name": "Villa Side Hotel",
        "board": "All Inclusive",
        "price_bgn": 1363,
        "price_eur": 697,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_VILLA%20SIDE%20HOTEL1%20%28Copy%29%20%28Copy%29_16589935283703.jpg"
      },
      {
        "name": "Selectum Family Comfort Side",
        "board": "All Inclusive",
        "price_bgn": 1367,
        "price_eur": 699,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Lyra%20Resort1_15825552493308.jpg"
      },
      {
        "name": "Sural Hotel",
        "board": "All Inclusive",
        "price_bgn": 1369,
        "price_eur": 700,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Overview%20%285%29_17207735978740.jpg"
      },
      {
        "name": "Terrace Elite Resort",
        "board": "All Inclusive",
        "price_bgn": 1371,
        "price_eur": 701,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569666345936.jpg"
      },
      {
        "name": "Armas Bella Sun Hotel",
        "board": "All Inclusive",
        "price_bgn": 1373,
        "price_eur": 702,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARMAS%20BELLA%20SUN%201_16849181986288.jpg"
      },
      {
        "name": "Selectum Family Resort Side",
        "board": "All Inclusive",
        "price_bgn": 1375,
        "price_eur": 703,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SELECTUM%20FAMILY%20RESORT%20SIDE1_16590927073693.jpg"
      },
      {
        "name": "Mary Palace Side",
        "board": "All Inclusive",
        "price_bgn": 1383,
        "price_eur": 707,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MARY%20PALACE%201_16868172025575.jpg"
      },
      {
        "name": "Alba Queen Hotel",
        "board": "All Inclusive",
        "price_bgn": 1387,
        "price_eur": 709,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17271695228769.jpg"
      },
      {
        "name": "Sueno Beach Hotel Side",
        "board": "All Inclusive",
        "price_bgn": 1393,
        "price_eur": 712,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SUENO%20BEACH%20SIDE_15815019703685.jpg"
      },
      {
        "name": "Washington Resort",
        "board": "All Inclusive",
        "price_bgn": 1396,
        "price_eur": 714,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_WASHINGTON%20HOTEL1_16587579304262.jpg"
      },
      {
        "name": "Crystal Admiral Aqua Collection",
        "board": "All Inclusive",
        "price_bgn": 1400,
        "price_eur": 716,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484129813659.jpg"
      },
      {
        "name": "Oz Hotels Side Premium",
        "board": "All Inclusive",
        "price_bgn": 1422,
        "price_eur": 727,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OZ%20SIDE%20PREMIUM1_15789964655357.jpg"
      },
      {
        "name": "Royal Atlantis Icon",
        "board": "All Inclusive",
        "price_bgn": 1426,
        "price_eur": 729,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_A1_17260515148760.png"
      },
      {
        "name": "Jadore Deluxe Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1445,
        "price_eur": 739,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_JADORE%20DELUXE%20HOTEL%201_16855318075860.jpg"
      },
      {
        "name": "Armas Pemar Beach",
        "board": "All Inclusive",
        "price_bgn": 1445,
        "price_eur": 739,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARMAS%20PEMAR%20BEACH%201_17110232084299.jpg"
      },
      {
        "name": "Royal Atlantis Spa & Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1449,
        "price_eur": 741,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20ATLANTIS%20SPA1_16589250453683.jpg"
      },
      {
        "name": "Seher Kumkoy Star Resort Spa",
        "board": "All Inclusive",
        "price_bgn": 1455,
        "price_eur": 744,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Seher%20Kumkoy%20Star1_16681805297643.jpg"
      },
      {
        "name": "Raxeria Hotel",
        "board": "All Inclusive",
        "price_bgn": 1455,
        "price_eur": 744,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_tr-image-4_1771794026_17720165939569.jpeg"
      },
      {
        "name": "Seaden Sea World Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1467,
        "price_eur": 750,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17337486913698.jpg"
      },
      {
        "name": "Diamond Elite Hotel (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1467,
        "price_eur": 750,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DIAMOND%20ELITE1_16588433905526.jpg"
      },
      {
        "name": "Bosphorus Sorgun Resort",
        "board": "All Inclusive",
        "price_bgn": 1477,
        "price_eur": 755,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548193326350.jpg"
      },
      {
        "name": "Aqi Pegasos World",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AQI%20PEGASOS%20WORLD%201_16983903903678.jpg"
      },
      {
        "name": "Alexia Resort & Spa (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ALEXIA%20RESORT%20%26%20SPA2_16672134207635.jpg"
      },
      {
        "name": "The Sense De Luxe",
        "board": "All Inclusive",
        "price_bgn": 1484,
        "price_eur": 759,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569667635674.jpg"
      },
      {
        "name": "Sorgun Akadia Luxury Hotel (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1494,
        "price_eur": 764,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_sorgun%20akadia%20luxury1_16691999117628.jpg"
      },
      {
        "name": "Royal Atlantis Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1502,
        "price_eur": 768,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20ATLANTIS%20BEACH%20HOTEL_16131421184300.jpg"
      },
      {
        "name": "Dream World Aqua Resort",
        "board": "All Inclusive",
        "price_bgn": 1506,
        "price_eur": 770,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15608462656707.jpg"
      },
      {
        "name": "Dream World Palace",
        "board": "All Inclusive",
        "price_bgn": 1506,
        "price_eur": 770,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DREAM%20WORLD%20PALACE1_16588284454894.jpg"
      },
      {
        "name": "Seaden Valentine Resort & Spa (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1510,
        "price_eur": 772,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17337486296771.jpg"
      },
      {
        "name": "Barut B Suites",
        "board": "All Inclusive",
        "price_bgn": 1510,
        "price_eur": 772,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548188746506.jpg"
      },
      {
        "name": "Horus Paradise Luxury Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1516,
        "price_eur": 775,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17327081685350.jpg"
      },
      {
        "name": "Luna Blanca Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1516,
        "price_eur": 775,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LUNA%20BLANCA1_16691071885574.jpg"
      },
      {
        "name": "Dream World Hill",
        "board": "All Inclusive",
        "price_bgn": 1518,
        "price_eur": 776,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DREAM%20WORLD%20HILL1_16589293246340.jpg"
      },
      {
        "name": "Berry Blue Hotel",
        "board": "All Inclusive",
        "price_bgn": 1535,
        "price_eur": 785,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MAYA%20WORLD%20SIDE%20HOTEL1_16692071275116.jpg"
      },
      {
        "name": "Sural Resort",
        "board": "All Inclusive",
        "price_bgn": 1539,
        "price_eur": 787,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Overview%20%283%29_17207742398741.jpg"
      },
      {
        "name": "Adalya Art Side",
        "board": "All Inclusive",
        "price_bgn": 1549,
        "price_eur": 792,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548023735852.jpg"
      },
      {
        "name": "Vox Maris Resort (Adult Only +16)",
        "board": "All Inclusive",
        "price_bgn": 1549,
        "price_eur": 792,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17206096647967.jpg"
      },
      {
        "name": "Dream Fun World",
        "board": "All Inclusive",
        "price_bgn": 1551,
        "price_eur": 793,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DREAM%20FUN%20WORLD%201_16944251817871.jpg"
      },
      {
        "name": "Seamelia Beach Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1561,
        "price_eur": 798,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEAMELIA%20BEACH%20RESORT%20%26%20SPA1%20%28Copy%29_16590839014305.jpg"
      },
      {
        "name": "Side Stella Elite Resort & Spa (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1571,
        "price_eur": 803,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302877057626.jpg"
      },
      {
        "name": "Marvida Family Eco",
        "board": "All Inclusive",
        "price_bgn": 1584,
        "price_eur": 810,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OTIUM%20FAMILY%20ECO%20CLUB%20SIDE1_15820374063676.jpg"
      },
      {
        "name": "Alba Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1584,
        "price_eur": 810,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17271691378768.jpg"
      },
      {
        "name": "Seaden Sea Planet Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1598,
        "price_eur": 817,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17337486625211.jpg"
      },
      {
        "name": "Can Garden Beach",
        "board": "All Inclusive",
        "price_bgn": 1600,
        "price_eur": 818,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CAN%20GARDEN%20BEACH_16129599047313.jpg"
      },
      {
        "name": "Arnor De Luxe Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1602,
        "price_eur": 819,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16661719567623.jpg"
      },
      {
        "name": "Vonresort Golden Beach & Aqua",
        "board": "All Inclusive",
        "price_bgn": 1604,
        "price_eur": 820,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289835823658.jpg"
      },
      {
        "name": "Side Star Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 1606,
        "price_eur": 821,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16134870374385.jpg"
      },
      {
        "name": "The Raga Hotel Side (Fine Dining Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 1610,
        "price_eur": 823,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_4_17340834329001.jpg"
      },
      {
        "name": "Vonresort Golden Coast",
        "board": "All Inclusive",
        "price_bgn": 1612,
        "price_eur": 824,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_VONRESORT%20GOLDEN%20COAST1_15785683514280.jpg"
      },
      {
        "name": "Starlight Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1619,
        "price_eur": 828,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_STARLIGHT%20RESORT%20HOTEL%202_16946141103697.jpg"
      },
      {
        "name": "Sunrise Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1619,
        "price_eur": 828,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Sunrise%20Resort%20Hotel_16946147494388.jpg"
      },
      {
        "name": "Diamond Premium Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1625,
        "price_eur": 831,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DIAMOND%20PREMIUM%20HOTEL%20%26%20SPA3_16590010335858.jpg"
      },
      {
        "name": "Dream Water World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1635,
        "price_eur": 836,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Dream%20Water%20World1_16686027613410.jpg"
      },
      {
        "name": "Side Royal Palace",
        "board": "All Inclusive",
        "price_bgn": 1641,
        "price_eur": 839,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20ROYAL%20PALACE_16134780025981.jpg"
      },
      {
        "name": "Side Crown Serenity",
        "board": "All Inclusive",
        "price_bgn": 1647,
        "price_eur": 842,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Side%20Crown%20Serenity1_16684284495356.jpg"
      },
      {
        "name": "Megasaray Resort Side",
        "board": "All Inclusive",
        "price_bgn": 1660,
        "price_eur": 849,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17297551018890.jpg"
      },
      {
        "name": "Arcanus Hotels Sorgun",
        "board": "All Inclusive",
        "price_bgn": 1662,
        "price_eur": 850,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17483290115346.jpg"
      },
      {
        "name": "Villa Side Residence",
        "board": "All Inclusive",
        "price_bgn": 1692,
        "price_eur": 865,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15559422814896.jpg"
      },
      {
        "name": "Side Moon Palace Hotel",
        "board": "All Inclusive",
        "price_bgn": 1692,
        "price_eur": 865,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302872837965.jpg"
      },
      {
        "name": "Nerton Hotel (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1694,
        "price_eur": 866,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16661761924291.jpg"
      },
      {
        "name": "Roma Beach Resort (Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 1694,
        "price_eur": 866,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Roma_Panorama1_2000x1022-1024x523_17271702758770.jpg"
      },
      {
        "name": "Side Sun Hotel",
        "board": "All Inclusive",
        "price_bgn": 1698,
        "price_eur": 868,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20SUN%201_17090233873690.jpg"
      },
      {
        "name": "Vonresort Elite",
        "board": "All Inclusive",
        "price_bgn": 1709,
        "price_eur": 874,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_General_15785586706900.jpg"
      },
      {
        "name": "Side Royal Style",
        "board": "All Inclusive",
        "price_bgn": 1709,
        "price_eur": 874,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20ROYAL%20STYLE_16134789535672.jpg"
      },
      {
        "name": "Kamelya Aishen Club",
        "board": "All Inclusive",
        "price_bgn": 1717,
        "price_eur": 878,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16130438045063.jpg"
      },
      {
        "name": "Seashell Vega",
        "board": "All Inclusive",
        "price_bgn": 1717,
        "price_eur": 878,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20CROWN%20SUNSHINE2_16685087156826.jpg"
      },
      {
        "name": "Trendy Side Beach",
        "board": "All Inclusive",
        "price_bgn": 1717,
        "price_eur": 878,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_%D1%824_16529652556557.jpg"
      },
      {
        "name": "Club Felicia Village",
        "board": "All Inclusive",
        "price_bgn": 1719,
        "price_eur": 879,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20FELICIA%20VILLAGE2_16672194097636.jpg"
      },
      {
        "name": "Side Crown Palace",
        "board": "All Inclusive",
        "price_bgn": 1725,
        "price_eur": 882,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16684174614891.jpg"
      },
      {
        "name": "Royal Alhambra Palace",
        "board": "All Inclusive",
        "price_bgn": 1725,
        "price_eur": 882,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20ALHAMBRA%20PALACE_16131414574889.jpg"
      },
      {
        "name": "Crystal Sunset Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1725,
        "price_eur": 882,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484138225058.jpg"
      },
      {
        "name": "Barut Goia",
        "board": "All Inclusive",
        "price_bgn": 1752,
        "price_eur": 896,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16435683817532.jpg"
      },
      {
        "name": "Side Star Beach",
        "board": "All Inclusive",
        "price_bgn": 1764,
        "price_eur": 902,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20STAR%20BEACH1_16134836294386.jpg"
      },
      {
        "name": "Terrace Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1788,
        "price_eur": 914,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TERRACE%20BEACH%20RESORT1_15754743603702.jpg"
      },
      {
        "name": "Trendy Palm Beach",
        "board": "All Inclusive",
        "price_bgn": 1792,
        "price_eur": 916,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569672216556.jpg"
      },
      {
        "name": "Bella Resort And Spa",
        "board": "All Inclusive",
        "price_bgn": 1805,
        "price_eur": 923,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548190366507.jpg"
      },
      {
        "name": "Side Star Resort",
        "board": "All Inclusive",
        "price_bgn": 1817,
        "price_eur": 929,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16146080854893.jpg"
      },
      {
        "name": "Kamelya Fulya",
        "board": "All Inclusive",
        "price_bgn": 1819,
        "price_eur": 930,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15557536585943.jpg"
      },
      {
        "name": "Diamond Excellence Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1823,
        "price_eur": 932,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15556861524271.jpg"
      },
      {
        "name": "Club Melas Prive",
        "board": "All Inclusive",
        "price_bgn": 1838,
        "price_eur": 940,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15712180144297.jpg"
      },
      {
        "name": "Alba Royal Hotel (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1864,
        "price_eur": 953,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17271690288735.jpg"
      },
      {
        "name": "Tui Blue Barut Andiz (Adults +16)",
        "board": "All Inclusive",
        "price_bgn": 1911,
        "price_eur": 977,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BARUT%20SENSIMAR%20ANDIZ1_15719039886935.jpg"
      },
      {
        "name": "Monachus Family Resort Sorgun",
        "board": "All Inclusive",
        "price_bgn": 1911,
        "price_eur": 977,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15871537296161.jpg"
      },
      {
        "name": "Hotel Turan Prince",
        "board": "All Inclusive",
        "price_bgn": 1919,
        "price_eur": 981,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15871535606162.jpg"
      },
      {
        "name": "Sunis Evren Beach Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1925,
        "price_eur": 984,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569646673664.jpg"
      },
      {
        "name": "Ali Bey Club Manavgat",
        "board": "All Inclusive",
        "price_bgn": 1926,
        "price_eur": 985,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17116275223523.jpg"
      },
      {
        "name": "Club Hotel Turan Prince World",
        "board": "All Inclusive",
        "price_bgn": 1946,
        "price_eur": 995,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20HOTEL%20TURAN%20PRINCE%20WORLD1_16590069942328.jpg"
      },
      {
        "name": "Kamelya Selin Hotel",
        "board": "All Inclusive",
        "price_bgn": 1946,
        "price_eur": 995,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KAMELYA%20SELIN%20HOTEL%209_16855402905117.jpg"
      },
      {
        "name": "Trendy Aspendos Beach",
        "board": "All Inclusive",
        "price_bgn": 1946,
        "price_eur": 995,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_trasp1_16529691856095.jpg"
      },
      {
        "name": "Adalya Ocean Deluxe",
        "board": "All Inclusive",
        "price_bgn": 1962,
        "price_eur": 1003,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_adalya%20ocean_15617062765212.jpg"
      },
      {
        "name": "Dobedan Beach Resort Comfort",
        "board": "All Inclusive",
        "price_bgn": 1973,
        "price_eur": 1009,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ALVA%20DONNA%20BEACH%20RESORT%20SIDE_16847672145930.jpg"
      },
      {
        "name": "Seaden De Mar Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1973,
        "price_eur": 1009,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_2025-10-11_17626915759551.jpeg"
      },
      {
        "name": "Sentido Trendy Verbena Beach",
        "board": "All Inclusive",
        "price_bgn": 1995,
        "price_eur": 1020,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569675986096.jpg"
      },
      {
        "name": "Aydinbey Kings Palace & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 2015,
        "price_eur": 1030,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AYDINBEY%20KINGS%20PALACE_15698453203655.jpg"
      },
      {
        "name": "Seashell Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2022,
        "price_eur": 1034,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15559428745581.jpg"
      },
      {
        "name": "Side Star Elegance",
        "board": "All Inclusive",
        "price_bgn": 2026,
        "price_eur": 1036,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDE%20STAR%20ELEGANCE1_16691138015673.jpg"
      },
      {
        "name": "Royal Dragon Hotel",
        "board": "All Inclusive",
        "price_bgn": 2042,
        "price_eur": 1044,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20DRAGON%20HOTEL1_16692114783684.jpg"
      },
      {
        "name": "Tui Blue Xanthe",
        "board": "All Inclusive",
        "price_bgn": 2048,
        "price_eur": 1047,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_XANTHE%20RESORT1_16687766343705.jpg"
      },
      {
        "name": "Tui Magic Life Jacaranda",
        "board": "All Inclusive",
        "price_bgn": 2048,
        "price_eur": 1047,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15559436246451.jpg"
      },
      {
        "name": "Jacaranda Luxury Resort",
        "board": "All Inclusive",
        "price_bgn": 2056,
        "price_eur": 1051,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG2_17268223058747_17268224528747.jpg"
      },
      {
        "name": "Calyptus Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2101,
        "price_eur": 1074,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KIRMAN%20CALYPTUS1_16692059587525.jpg"
      },
      {
        "name": "Melas Resort",
        "board": "All Inclusive",
        "price_bgn": 2104,
        "price_eur": 1076,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15754632066296.jpg"
      },
      {
        "name": "Sural Saray (Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 2114,
        "price_eur": 1081,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Overview%2027_17207765078742.jpg"
      },
      {
        "name": "Tui Blue Palm Garden",
        "board": "All Inclusive",
        "price_bgn": 2122,
        "price_eur": 1085,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TUI%20BLUE%20Palm%20Garden%202_16872502487578.jpg"
      },
      {
        "name": "Diamond De Luxe Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 2130,
        "price_eur": 1089,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Diamond%20Deluxe%20Hotel1_16687675305318.jpg"
      },
      {
        "name": "Miramare Queen",
        "board": "All Inclusive",
        "price_bgn": 2183,
        "price_eur": 1116,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Miramare%20Queen1_15791693375821.jpg"
      },
      {
        "name": "Royal Taj Mahal",
        "board": "All Inclusive",
        "price_bgn": 2187,
        "price_eur": 1118,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20TAJ%20MAHAL_15617296365580.jpg"
      },
      {
        "name": "Seaden Quality Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2198,
        "price_eur": 1124,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17337485886936.jpg"
      },
      {
        "name": "Paloma Perissia",
        "board": "All Inclusive",
        "price_bgn": 2220,
        "price_eur": 1135,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16361156157512.jpg"
      },
      {
        "name": "Sunis Kumkoy Beach Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2236,
        "price_eur": 1143,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15569648443669.jpg"
      },
      {
        "name": "Paloma Oceana Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 2243,
        "price_eur": 1147,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PALOMA%20OCEANA%20RESORT%201_16859575517511.jpg"
      },
      {
        "name": "Sidemarin Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2269,
        "price_eur": 1160,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302756036768.jpg"
      },
      {
        "name": "Commodore Elite Suites & Spa (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 2312,
        "price_eur": 1182,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_COMMODORE%20ELITE%20SUITES1_15730538096941.jpg"
      },
      {
        "name": "Lago Hotel Sorgun",
        "board": "All Inclusive",
        "price_bgn": 2345,
        "price_eur": 1199,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LAGO%20HOTEL%20SORGUN%201_16868385523675.jpg"
      },
      {
        "name": "Ali Bey Resort Sorgun",
        "board": "All Inclusive",
        "price_bgn": 2365,
        "price_eur": 1209,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17116276023524.jpg"
      },
      {
        "name": "Arum Barut Collection",
        "board": "All Inclusive",
        "price_bgn": 2460,
        "price_eur": 1258,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARUM%20BARUT%20COLLECTION%201_16849219094264.jpg"
      },
      {
        "name": "Adalya Bliss (+16 Adult Only)",
        "board": "All Inclusive",
        "price_bgn": 2484,
        "price_eur": 1270,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_adalya%20resort1_16691980673652.jpg"
      },
      {
        "name": "Club Grand Side",
        "board": "All Inclusive",
        "price_bgn": 2490,
        "price_eur": 1273,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_17335146_Genel_17288870468829.jpeg"
      },
      {
        "name": "Paloma Orenda",
        "board": "All Inclusive",
        "price_bgn": 2531,
        "price_eur": 1294,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289834467526.jpg"
      },
      {
        "name": "Barut Hotels Hemera",
        "board": "All Inclusive",
        "price_bgn": 2535,
        "price_eur": 1296,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BARUT%20HEMERA1_15720090305834.jpg"
      },
      {
        "name": "Tui Blue Side (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 2558,
        "price_eur": 1308,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_7_16692988165118.jpg"
      },
      {
        "name": "Miramare Beach",
        "board": "All Inclusive",
        "price_bgn": 2584,
        "price_eur": 1321,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Miramare%20Beach%20Hotel1_15791713225576.jpg"
      },
      {
        "name": "Akra Sorgun Tui Blue Sensatori",
        "board": "All Inclusive",
        "price_bgn": 2611,
        "price_eur": 1335,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TUI%20SENSATORI%20RESORT1_16129576265854.jpg"
      },
      {
        "name": "Paloma Finesse",
        "board": "All Inclusive",
        "price_bgn": 2627,
        "price_eur": 1343,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16433711847527.jpg"
      },
      {
        "name": "Lusso Sorgun",
        "board": "All Inclusive",
        "price_bgn": 2711,
        "price_eur": 1386,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17483289768751.jpg"
      },
      {
        "name": "Liu Resorts Side",
        "board": "All Inclusive",
        "price_bgn": 2816,
        "price_eur": 1440,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LIU%20RESORTS1_16693061017521.jpg"
      },
      {
        "name": "Voyage Sorgun",
        "board": "All Inclusive",
        "price_bgn": 2906,
        "price_eur": 1486,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289837242331.jpg"
      },
      {
        "name": "Acanthus & Cennet Barut Collection",
        "board": "All Inclusive",
        "price_bgn": 3024,
        "price_eur": 1546,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548175734263.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 105,
    "refNum": "П1054",
    "title": "Лара – Лято 2026 (самолет, събота, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive",
      "luxury"
    ],
    "destination": "Лара, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 866,
    "price_eur": 443,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Почивка в Лара (Анталия) с директен чартър и ранни записвания.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Palmora Lara Hotel",
        "board": "All Inclusive",
        "price_bgn": 866,
        "price_eur": 443,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_jura_hotels_lara_resort_89591_17711604519568.jpg"
      },
      {
        "name": "Sherwood Premio Hotel",
        "board": "All Inclusive",
        "price_bgn": 1177,
        "price_eur": 602,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG2_17626894899550_17626897819550.jpg"
      },
      {
        "name": "Ozkaymak Falez Hotel",
        "board": "All Inclusive",
        "price_bgn": 1193,
        "price_eur": 610,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17291471178834.jpg"
      },
      {
        "name": "Wind Of Lara Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1314,
        "price_eur": 672,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_WIND%20OF%20LARA_15645775025847.jpg"
      },
      {
        "name": "Wyndham Garden Lara",
        "board": "All Inclusive",
        "price_bgn": 1355,
        "price_eur": 693,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289866056902.jpg"
      },
      {
        "name": "Greenwood Suites Resort",
        "board": "All Inclusive",
        "price_bgn": 1422,
        "price_eur": 727,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16578841996589.jpg"
      },
      {
        "name": "Grand Park Lara",
        "board": "All Inclusive",
        "price_bgn": 1463,
        "price_eur": 748,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_gpl_16577980945843.jpg"
      },
      {
        "name": "Ramada Resort Lara",
        "board": "All Inclusive",
        "price_bgn": 1469,
        "price_eur": 751,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289864195766.jpg"
      },
      {
        "name": "The Corner Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 1531,
        "price_eur": 783,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Ana-gorsel-1024x575_17791041409570.jpg"
      },
      {
        "name": "Kremlin Palace",
        "board": "All Inclusive",
        "price_bgn": 1592,
        "price_eur": 814,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_15595939_15561126544376.jpg"
      },
      {
        "name": "Sealife Family Resort",
        "board": "All Inclusive",
        "price_bgn": 1641,
        "price_eur": 839,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEALIFE%20FAMILY%20RESORT_15645787853722.jpg"
      },
      {
        "name": "Club Hotel Sera",
        "board": "All Inclusive",
        "price_bgn": 1643,
        "price_eur": 840,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561135356495.jpg"
      },
      {
        "name": "Porto Bello Hotel Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1704,
        "price_eur": 871,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PORTO%20BELLO%20HOTEL1_16578007352571.jpg"
      },
      {
        "name": "Crystal Centro Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1872,
        "price_eur": 957,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17626840533714.jpg"
      },
      {
        "name": "Ducale Lara",
        "board": "All Inclusive",
        "price_bgn": 1887,
        "price_eur": 965,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Pier%20%283%29_17364179713725.jpg"
      },
      {
        "name": "Baia Lara Hotel",
        "board": "All Inclusive",
        "price_bgn": 1893,
        "price_eur": 968,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BAIA%20LARA%20HOTEL_16121914663706.jpg"
      },
      {
        "name": "Aska Lara Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1895,
        "price_eur": 969,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289863205344.jpg"
      },
      {
        "name": "Trendy Perge Resort & Suites",
        "board": "All Inclusive",
        "price_bgn": 1940,
        "price_eur": 992,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17598303929541.jpg"
      },
      {
        "name": "Melas Hotel Lara",
        "board": "All Inclusive",
        "price_bgn": 1956,
        "price_eur": 1000,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MELAS%20HOTEL%20LARA%201_17139687616954.jpg"
      },
      {
        "name": "Trendy Lara",
        "board": "All Inclusive",
        "price_bgn": 1966,
        "price_eur": 1005,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561144055937.jpg"
      },
      {
        "name": "Saturn Palace Resort",
        "board": "All Inclusive",
        "price_bgn": 2022,
        "price_eur": 1034,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289865612886.jpg"
      },
      {
        "name": "Miracle Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2052,
        "price_eur": 1049,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MIRACLE%20RESORT%20%26%20SPA_16123450545774.jpeg"
      },
      {
        "name": "Royal Holiday Palace",
        "board": "All Inclusive",
        "price_bgn": 2095,
        "price_eur": 1071,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289864795670.jpg"
      },
      {
        "name": "Royal Seginus",
        "board": "All Inclusive",
        "price_bgn": 2095,
        "price_eur": 1071,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289864486226.jpg"
      },
      {
        "name": "Sherwood Exclusive Lara",
        "board": "All Inclusive",
        "price_bgn": 2097,
        "price_eur": 1072,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289865763721.jpg"
      },
      {
        "name": "Ramada Plaza Antalya",
        "board": "All Inclusive",
        "price_bgn": 2161,
        "price_eur": 1105,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Ramada-Plaza_0_15991319495880.jpg"
      },
      {
        "name": "Ic Hotels Green Palace & Villas",
        "board": "All Inclusive",
        "price_bgn": 2169,
        "price_eur": 1109,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17320999823712.jpg"
      },
      {
        "name": "Limak Lara De Luxe Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 2257,
        "price_eur": 1154,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LIMAK%20LARA_15617262983716.jpg"
      },
      {
        "name": "Royal Wings Hotel",
        "board": "All Inclusive",
        "price_bgn": 2275,
        "price_eur": 1163,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Royal-Wings-General-Photos-6_17289867393719.jpg"
      },
      {
        "name": "Adalya Elite Lara",
        "board": "All Inclusive",
        "price_bgn": 2298,
        "price_eur": 1175,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561147485841.jpg"
      },
      {
        "name": "Rixos Downtown Antalya",
        "board": "All Inclusive",
        "price_bgn": 2437,
        "price_eur": 1246,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_down_15728789765846.jpg"
      },
      {
        "name": "Swandor Hotel & Resort Topkapi Palace",
        "board": "All Inclusive",
        "price_bgn": 2546,
        "price_eur": 1302,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_181307370_15561125704377.jpg"
      },
      {
        "name": "Titanic Deluxe Lara",
        "board": "All Inclusive",
        "price_bgn": 2803,
        "price_eur": 1433,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16711002673724.jpg"
      },
      {
        "name": "Nirvana Cosmopolitan",
        "board": "All Inclusive",
        "price_bgn": 2805,
        "price_eur": 1434,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_nirvana-cosmopolitan-nirvana-cosmopolitan-general-view-9-c9da5823dc1e27e5144dbc2441e8db5f-Resize1920_17484144873715.jpg"
      },
      {
        "name": "Delphin Diva",
        "board": "All Inclusive",
        "price_bgn": 2816,
        "price_eur": 1440,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561143053709.jpg"
      },
      {
        "name": "Delphin Palace",
        "board": "All Inclusive",
        "price_bgn": 2818,
        "price_eur": 1441,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17467006563710.jpg"
      },
      {
        "name": "Delphin Be Grand Resort",
        "board": "All Inclusive",
        "price_bgn": 2973,
        "price_eur": 1520,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DELPHIN%20BE%20GRAND%20RESORT_15791836776294.jpg"
      },
      {
        "name": "Delphin Imperial Hotel",
        "board": "All Inclusive",
        "price_bgn": 2996,
        "price_eur": 1532,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289863505053.jpg"
      },
      {
        "name": "Concorde Deluxe Resort",
        "board": "All Inclusive",
        "price_bgn": 3037,
        "price_eur": 1553,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16582308883708.jpg"
      },
      {
        "name": "Voyage Kundu",
        "board": "All Inclusive",
        "price_bgn": 3272,
        "price_eur": 1673,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_VKU_plaj_1140x570_17555071519540.jpg"
      },
      {
        "name": "Lara Barut Collection",
        "board": "All Inclusive",
        "price_bgn": 3554,
        "price_eur": 1817,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289863814249.jpg"
      },
      {
        "name": "Barut Bayou Villas",
        "board": "All Inclusive",
        "price_bgn": 8439,
        "price_eur": 4315,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BARUT%20BAYOU%20VILLAS%207_16771404927647.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 106,
    "refNum": "П1048",
    "title": "8 дни в Анталия – турската ривиера (полет от София)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Анталия, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 888,
    "price_eur": 454,
    "dates": [
      "2026-06-11",
      "2026-06-14",
      "2026-06-18",
      "2026-06-21"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "Плажен курорт на турската ривиера с All Inclusive и полет от София.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Bora Bora Butik Exclusive",
        "board": "All Inclusive",
        "price_bgn": 888,
        "price_eur": 454,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_8-dni-v-antaliya-turskata-riviera-vi-ochakva-s-polet-ot-1_17659020041048.jpg"
      },
      {
        "name": "Green Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 916,
        "price_eur": 468,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_8-dni-v-antaliya-turskata-riviera-vi-ochakva-s-polet-ot-1_17659020041048.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 108,
    "refNum": "П1081",
    "title": "Алания – Лято 2026 (самолет, събота, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 698,
    "price_eur": 357,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Директен чартър до Анталия и 7 нощувки в Алания (съботна програма).",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Eftalia Downtown",
        "board": "All Inclusive",
        "price_bgn": 698,
        "price_eur": 357,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_aytur_15734844194313.jpg"
      },
      {
        "name": "Club Bayar Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 724,
        "price_eur": 370,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Club%20Bayar%20Beach%20Hotel%201_17078386053541.jpg"
      },
      {
        "name": "Mysea Hotels Alara",
        "board": "All Inclusive",
        "price_bgn": 726,
        "price_eur": 371,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MYSEA%20HOTEL%20ALARA1_15559255046164.jpg"
      },
      {
        "name": "Green Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 731,
        "price_eur": 374,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295919597632.jpg"
      },
      {
        "name": "Galaxy Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 747,
        "price_eur": 382,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561003123562.jpg"
      },
      {
        "name": "Bieno Club Hotel Svs",
        "board": "All Inclusive",
        "price_bgn": 771,
        "price_eur": 394,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Bieno%20Club%20Svs2_16696402463609.jpg"
      },
      {
        "name": "Sunstar Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 782,
        "price_eur": 400,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Sunstar%20Beach%20Hotel1_15755611346748.jpg"
      },
      {
        "name": "Acar Hotel Alanya",
        "board": "All Inclusive",
        "price_bgn": 800,
        "price_eur": 409,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15768538544184.jpg"
      },
      {
        "name": "Bora Bora Butik Hotel",
        "board": "All Inclusive",
        "price_bgn": 810,
        "price_eur": 414,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_unnamed_17343505869002.jpg"
      },
      {
        "name": "Calimera Sunpark Alanya",
        "board": "All Inclusive",
        "price_bgn": 825,
        "price_eur": 422,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_sp-media-pool_1_sunpark_garden_17684697189553.jpeg"
      },
      {
        "name": "Parador Beach",
        "board": "All Inclusive",
        "price_bgn": 827,
        "price_eur": 423,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG2_17267347318763_17267348388763.jpg"
      },
      {
        "name": "Kleopatra Melissa Hotel",
        "board": "All Inclusive",
        "price_bgn": 831,
        "price_eur": 425,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20MELISSA%202_16823397414391.jpg"
      },
      {
        "name": "Prestige Alanya",
        "board": "All Inclusive",
        "price_bgn": 831,
        "price_eur": 425,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_A1_17023728236499.jpg"
      },
      {
        "name": "Relax Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 833,
        "price_eur": 426,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17262114398761.jpg"
      },
      {
        "name": "Kolibri Hotel",
        "board": "All Inclusive",
        "price_bgn": 837,
        "price_eur": 428,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KOLIBRI%20HOTEL1_16696414655872.jpg"
      },
      {
        "name": "Simply Fine Hotel Alize",
        "board": "All Inclusive",
        "price_bgn": 839,
        "price_eur": 429,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIMPLY%20FINE%20HOTEL%201_16951072027874.jpg"
      },
      {
        "name": "Buyuk Hotel",
        "board": "All Inclusive",
        "price_bgn": 849,
        "price_eur": 434,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276834948778.jpg"
      },
      {
        "name": "Asrin Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 857,
        "price_eur": 438,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ASRIN%20BEACH%20HOTEL%201_17023743214194.jpg"
      },
      {
        "name": "A11 Hotel Obakoy",
        "board": "All Inclusive",
        "price_bgn": 857,
        "price_eur": 438,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17313997858964.jpg"
      },
      {
        "name": "Saritas Hotel",
        "board": "All Inclusive",
        "price_bgn": 857,
        "price_eur": 438,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16944254703602.jpg"
      },
      {
        "name": "Miarosa Konakli Garden",
        "board": "All Inclusive",
        "price_bgn": 859,
        "price_eur": 439,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_miarosa-konakli-garden-genel-970x650-8_17695050979557.jpeg"
      },
      {
        "name": "Bonapart Sealine Hotel",
        "board": "All Inclusive",
        "price_bgn": 863,
        "price_eur": 441,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Bonapart%20Sealine1_16708520896062.jpg"
      },
      {
        "name": "Kleopatra Ramira Hotel",
        "board": "All Inclusive",
        "price_bgn": 880,
        "price_eur": 450,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561835806737.jpg"
      },
      {
        "name": "Arabella World Hotel",
        "board": "All Inclusive",
        "price_bgn": 882,
        "price_eur": 451,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARABELLA%20WORLD1_16698128414188.jpg"
      },
      {
        "name": "First Class Hotel",
        "board": "All Inclusive",
        "price_bgn": 900,
        "price_eur": 460,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561824803552.jpg"
      },
      {
        "name": "Ramira Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 900,
        "price_eur": 460,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Ramira%20Beach%20Hotel%201_16836265315778.jpg"
      },
      {
        "name": "Elysee Beach",
        "board": "All Inclusive",
        "price_bgn": 908,
        "price_eur": 464,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_3-plaz_17695021509554.jpg"
      },
      {
        "name": "Grand Alisa Alanya",
        "board": "All Inclusive",
        "price_bgn": 908,
        "price_eur": 464,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_grandalisa-hotel-gallery-1_17695033049555.jpg"
      },
      {
        "name": "Perre Delta Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 909,
        "price_eur": 465,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PERRE%20DELTA%20RESORT%203_16836203306866.jpg"
      },
      {
        "name": "Avena Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 911,
        "price_eur": 466,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295926535866.jpg"
      },
      {
        "name": "Kleopatra Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 917,
        "price_eur": 469,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20BEACH%20HOTEL1_15746981493568.jpg"
      },
      {
        "name": "Citrus Plaza(Ex.Artemis Princess Hotel)",
        "board": "All Inclusive",
        "price_bgn": 921,
        "price_eur": 471,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295926874396.jpg"
      },
      {
        "name": "Monte Carlo Hotel",
        "board": "All Inclusive",
        "price_bgn": 931,
        "price_eur": 476,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MONTE%20CARLO%20HOTEL1_15745120984216.jpg"
      },
      {
        "name": "Oba Time Hotel",
        "board": "All Inclusive",
        "price_bgn": 935,
        "price_eur": 478,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17267341478762.jpg"
      },
      {
        "name": "Kleopatra Ada Beach",
        "board": "All Inclusive",
        "price_bgn": 939,
        "price_eur": 480,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20ADA%20BEACH1_15747684985571.jpg"
      },
      {
        "name": "Sunstar Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 939,
        "price_eur": 480,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SUN%20STAR%20RESORT%20HOTEL1_15759050796749.jpg"
      },
      {
        "name": "Miarosa Incekum Beach",
        "board": "All Inclusive",
        "price_bgn": 941,
        "price_eur": 481,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Miarosa-incekum-beach-plaj-970x650-1_17695043139556.jpeg"
      },
      {
        "name": "Remi Hotel",
        "board": "All Inclusive",
        "price_bgn": 951,
        "price_eur": 486,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_221580327_16541656307342.jpg"
      },
      {
        "name": "Alaiye Kleopatra Hotel",
        "board": "All Inclusive",
        "price_bgn": 956,
        "price_eur": 489,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15548141073515.jpg"
      },
      {
        "name": "Kleopatra Royal Palm Hotel",
        "board": "All Inclusive",
        "price_bgn": 958,
        "price_eur": 490,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20ROYAL%20PALM%20HOTEL1_15613790286864.jpg"
      },
      {
        "name": "Gold City Hotel",
        "board": "All Inclusive",
        "price_bgn": 960,
        "price_eur": 491,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GOLDCITY1_15751088264880.jpg"
      },
      {
        "name": "Mira Meridia Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 976,
        "price_eur": 499,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_6504_15544750226504.jpg"
      },
      {
        "name": "Blue Star Hotel",
        "board": "All Inclusive",
        "price_bgn": 978,
        "price_eur": 500,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BLUE%20STAR%20HOTEL2_15743481904199.jpg"
      },
      {
        "name": "Kleopatra Atlas (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 984,
        "price_eur": 503,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561802035848.jpg"
      },
      {
        "name": "Caretta Relax Hotel",
        "board": "All Inclusive",
        "price_bgn": 996,
        "price_eur": 509,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CARETTA%20RELAX%20HOTEL1_16663406317630.jpg"
      },
      {
        "name": "Antik Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 997,
        "price_eur": 510,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_hotel-antik-5_17480805569533.jpg"
      },
      {
        "name": "The Marilis Hill Resort",
        "board": "All Inclusive",
        "price_bgn": 997,
        "price_eur": 510,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_%D0%BC%D0%B0%D1%80%D0%B8%D0%BB%D0%B8%D1%81_16148515067344.jpg"
      },
      {
        "name": "Kleopatra Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 999,
        "price_eur": 511,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KLEOPATRA%20LIFE%20HOTEL%201_16987578487917.jpg"
      },
      {
        "name": "Obastar Hotel",
        "board": "All Inclusive",
        "price_bgn": 1007,
        "price_eur": 515,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OBA%20STAR1_15747749634221.jpg"
      },
      {
        "name": "Drita Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1011,
        "price_eur": 517,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DRITA%20RESORT1_16715437414885.jpg"
      },
      {
        "name": "Cleopatra Golden Beach",
        "board": "All Inclusive",
        "price_bgn": 1013,
        "price_eur": 518,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Cleopatra%20Golden%20Beach%20Hotel1_16681825306073.jpg"
      },
      {
        "name": "Sun Heaven Queen Hotel",
        "board": "All Inclusive",
        "price_bgn": 1017,
        "price_eur": 520,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_an_2_16708572413594.jpg"
      },
      {
        "name": "Vikingen Infinity Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1019,
        "price_eur": 521,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567907356875.jpg"
      },
      {
        "name": "Club Titan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1019,
        "price_eur": 521,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_clubtitanhotelalanya1_16716289054203.jpg"
      },
      {
        "name": "Xoria Deluxe Hotel",
        "board": "All Inclusive",
        "price_bgn": 1027,
        "price_eur": 525,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_XORIA%20DELUXE1_15631983196878.jpg"
      },
      {
        "name": "Monart City",
        "board": "All Inclusive",
        "price_bgn": 1031,
        "price_eur": 527,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276856878782.jpg"
      },
      {
        "name": "Kaila Krizantem Hotel",
        "board": "All Inclusive",
        "price_bgn": 1031,
        "price_eur": 527,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KAILA%20KRIZANTEM1_16697322204214.jpg"
      },
      {
        "name": "Kaila City Hotel",
        "board": "All Inclusive",
        "price_bgn": 1031,
        "price_eur": 527,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Kaila%20City%20hotel1_16697137157341.jpg"
      },
      {
        "name": "Blue Wave Suite Hotel",
        "board": "All Inclusive",
        "price_bgn": 1042,
        "price_eur": 533,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561812213539.jpg"
      },
      {
        "name": "Club Aqua Plaza",
        "board": "All Inclusive",
        "price_bgn": 1044,
        "price_eur": 534,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17271650058767.jpg"
      },
      {
        "name": "Insula Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1046,
        "price_eur": 535,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_56_17424620639478.jpg"
      },
      {
        "name": "Mc Arancia Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1050,
        "price_eur": 537,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_M.C.%20ARANCIA%20RESORT%20HOTEL1_15761647723531.jpg"
      },
      {
        "name": "Solivia Hotel",
        "board": "All Inclusive",
        "price_bgn": 1050,
        "price_eur": 537,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TITAN%20SELECT%201_16841451564255.jpg"
      },
      {
        "name": "Grand Kolibri Prestige",
        "board": "All Inclusive",
        "price_bgn": 1054,
        "price_eur": 539,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_grand%20kolibri%20prestige1_16147705557340.jpg"
      },
      {
        "name": "Parador Sky Hotel",
        "board": "All Inclusive",
        "price_bgn": 1056,
        "price_eur": 540,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG4_17626881409549_17626884069549.jpg"
      },
      {
        "name": "Q Aventura Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 1058,
        "price_eur": 541,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_5067_15544748975067.jpg"
      },
      {
        "name": "Eos Beach Resort Hotel ( Ex Crystal Land Of Paradise)",
        "board": "All Inclusive",
        "price_bgn": 1058,
        "price_eur": 541,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_land-of-paradise-beach_17368420746785.jpg"
      },
      {
        "name": "Elysee Rive Hotel",
        "board": "All Inclusive",
        "price_bgn": 1060,
        "price_eur": 542,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_elysee-rive-sq_17207807248744.jpg"
      },
      {
        "name": "Xafira Deluxe Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1072,
        "price_eur": 548,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_XAFIRA%20DELUXE%20RESORT%20%26%20SPA1_15765092696564.jpg"
      },
      {
        "name": "Club Mermaid Village",
        "board": "All Inclusive",
        "price_bgn": 1074,
        "price_eur": 549,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20MERMAID%20VILLAGE1_16715385167515.jpg"
      },
      {
        "name": "Anitas Hotel",
        "board": "All Inclusive",
        "price_bgn": 1078,
        "price_eur": 551,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17274255628775.jpg"
      },
      {
        "name": "Telatiye Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1080,
        "price_eur": 552,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561792053611.jpg"
      },
      {
        "name": "Concordia Celes Hotel",
        "board": "All Inclusive",
        "price_bgn": 1080,
        "price_eur": 552,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_0bc91fe6_z_15561839473936.jpg"
      },
      {
        "name": "Incekum Su Hotel",
        "board": "All Inclusive",
        "price_bgn": 1082,
        "price_eur": 553,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_INCEKUM%20SU%201_16811359196311.jpg"
      },
      {
        "name": "Seaphoria Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1103,
        "price_eur": 564,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEAPHORIA%20BEACH%20RESORT%201_17029778867718.jpg"
      },
      {
        "name": "Ramira City Hotel (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15729603036939.jpg"
      },
      {
        "name": "Ramira Joy",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16148495297343.jpg"
      },
      {
        "name": "Oz Hotels Sui Resort",
        "board": "All Inclusive",
        "price_bgn": 1107,
        "price_eur": 566,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17292353758880.jpg"
      },
      {
        "name": "Club Dizalya",
        "board": "All Inclusive",
        "price_bgn": 1109,
        "price_eur": 567,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_d1_16529638755299.jpeg"
      },
      {
        "name": "Lonicera City Hotel",
        "board": "All Inclusive",
        "price_bgn": 1109,
        "price_eur": 567,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15560998426503.jpg"
      },
      {
        "name": "Mesut Hotel",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MESUT%20HOTEL%201_17110255275985.jpg"
      },
      {
        "name": "Dizalya Palm Garden Resort",
        "board": "All Inclusive",
        "price_bgn": 1117,
        "price_eur": 571,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DIZALYA%20PALM%20GARDEN%20RESORT1_15802251335245.jpg"
      },
      {
        "name": "Asia Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1119,
        "price_eur": 572,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295926696063.jpg"
      },
      {
        "name": "White City Beach Hotel (Adult Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1134,
        "price_eur": 580,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_WHITE%20CITY%20BEACH%20HOTEL1_15749323163615.jpg"
      },
      {
        "name": "Blue Diamond Alya",
        "board": "All Inclusive",
        "price_bgn": 1136,
        "price_eur": 581,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276823538776.jpg"
      },
      {
        "name": "Diamond Hill Resort",
        "board": "All Inclusive",
        "price_bgn": 1138,
        "price_eur": 582,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OuterView%2B%282%29%20%28Copy%29_15834220056335.jpg"
      },
      {
        "name": "Cooks Club Alanya",
        "board": "All Inclusive",
        "price_bgn": 1138,
        "price_eur": 582,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276838298779.jpg"
      },
      {
        "name": "Ozkaymak Incekum Hotel",
        "board": "All Inclusive",
        "price_bgn": 1152,
        "price_eur": 589,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OZKAYMAK%20INCEKUM1_15838371224224.jpg"
      },
      {
        "name": "Kahya Hotel",
        "board": "All Inclusive",
        "price_bgn": 1166,
        "price_eur": 596,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561916252991.jpg"
      },
      {
        "name": "Calido Sol Hotel",
        "board": "All Inclusive",
        "price_bgn": 1166,
        "price_eur": 596,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_793121714_17720174083606.jpg"
      },
      {
        "name": "Muz Hotel",
        "board": "All Inclusive",
        "price_bgn": 1170,
        "price_eur": 598,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Leto-Turecko-Turecka-riviera-Hotel-Muz_17301920698755.jpeg"
      },
      {
        "name": "Wasa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1170,
        "price_eur": 598,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_W1_17260505878758.jpeg"
      },
      {
        "name": "Palmeras Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1173,
        "price_eur": 600,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Palmeras%20Beach%20Hotel1_16732789466312.jpg"
      },
      {
        "name": "Aydinbey Gold Dreams",
        "board": "All Inclusive",
        "price_bgn": 1175,
        "price_eur": 601,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_aydinbey-gold-dreams-genel1_16714407163384.jpg"
      },
      {
        "name": "Caretta Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1177,
        "price_eur": 602,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CARETTA%20BEACH%20HOTEL1_16662729827629.jpg"
      },
      {
        "name": "Doganay Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1177,
        "price_eur": 602,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15550554274878.jpg"
      },
      {
        "name": "Kaila Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1179,
        "price_eur": 603,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_o318946_16714443496940.jpg"
      },
      {
        "name": "Gardenia Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1185,
        "price_eur": 606,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561870876733.jpg"
      },
      {
        "name": "Sunny Hill Alya",
        "board": "All Inclusive",
        "price_bgn": 1187,
        "price_eur": 607,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276861748783.jpg"
      },
      {
        "name": "Labranda Hotel Alantur",
        "board": "All Inclusive",
        "price_bgn": 1191,
        "price_eur": 609,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LABRANDA%20%20ALANTUR1_15839313406738.jpg"
      },
      {
        "name": "Ozkaymak Select Resort",
        "board": "All Inclusive",
        "price_bgn": 1193,
        "price_eur": 610,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_OZKAYMAK%20SELECT%20RESORT%20HOTEL%201_17053336685106.jpg"
      },
      {
        "name": "Michell Hotel (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1199,
        "price_eur": 613,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_6742_15544750366742.jpg"
      },
      {
        "name": "Rubi Hotel",
        "board": "All Inclusive",
        "price_bgn": 1201,
        "price_eur": 614,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_503049052_17695058649558.jpg"
      },
      {
        "name": "Kahya Resort Aqua & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1205,
        "price_eur": 616,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KAHYA%20RESORT%20AQUA2_15748653936857.jpg"
      },
      {
        "name": "Club Wasa Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1205,
        "price_eur": 616,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260478998754.jpg"
      },
      {
        "name": "Club Sun Heaven Family & Spa",
        "board": "All Inclusive",
        "price_bgn": 1207,
        "price_eur": 617,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HOTEL_5087_15544748995087.jpg"
      },
      {
        "name": "Eftalia Marin Resort",
        "board": "All Inclusive",
        "price_bgn": 1211,
        "price_eur": 619,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_eftalia%20marin1_15739038665881.jpg"
      },
      {
        "name": "Justiniano Club Alanya",
        "board": "All Inclusive",
        "price_bgn": 1211,
        "price_eur": 619,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16811386555092.jpg"
      },
      {
        "name": "Eftalia Splash Resort",
        "board": "All Inclusive",
        "price_bgn": 1220,
        "price_eur": 624,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16529427635089.jpg"
      },
      {
        "name": "Laguna Beach Alya Resort Spa",
        "board": "All Inclusive",
        "price_bgn": 1224,
        "price_eur": 626,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276847538781.jpg"
      },
      {
        "name": "Eftalia Village Hotel",
        "board": "All Inclusive",
        "price_bgn": 1234,
        "price_eur": 631,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_eftaliavillage_15734806996847.jpg"
      },
      {
        "name": "Kleopatra Dreams Beach",
        "board": "All Inclusive",
        "price_bgn": 1242,
        "price_eur": 635,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17193961636908.jpg"
      },
      {
        "name": "En Vie Beach Boutique Hotel (Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1258,
        "price_eur": 643,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17288887838831.jpg"
      },
      {
        "name": "Eftalia Blue Hotel",
        "board": "All Inclusive",
        "price_bgn": 1262,
        "price_eur": 645,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_download%20%287%29_17611270639547.jpg"
      },
      {
        "name": "Alaiye Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1269,
        "price_eur": 649,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16551209903516.jpg"
      },
      {
        "name": "Club Turtas Beach",
        "board": "All Inclusive",
        "price_bgn": 1269,
        "price_eur": 649,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15561975076066.jpg"
      },
      {
        "name": "Eftalia Aqua Resort",
        "board": "All Inclusive",
        "price_bgn": 1273,
        "price_eur": 651,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_EFTALIA%20AQUA_16553659064497.jpg"
      },
      {
        "name": "Q Premium Resort",
        "board": "All Inclusive",
        "price_bgn": 1277,
        "price_eur": 653,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_q-premium1_15798565205066.jpg"
      },
      {
        "name": "Sealife Buket Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1287,
        "price_eur": 658,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SEALIFE%20BUKET%201_16837161934191.jpg"
      },
      {
        "name": "Grand Kaptan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1289,
        "price_eur": 659,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566308776850.jpg"
      },
      {
        "name": "Incekum West Hotel",
        "board": "All Inclusive",
        "price_bgn": 1299,
        "price_eur": 664,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_INCEKUM%20WEST%20HOTEL%201_17065421316974.jpg"
      },
      {
        "name": "A Good Life Utopia Family Resort",
        "board": "All Inclusive",
        "price_bgn": 1308,
        "price_eur": 669,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_65f316d00e258280363408_17647553619552.jpg"
      },
      {
        "name": "Lonicera World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1310,
        "price_eur": 670,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567858126077.jpg"
      },
      {
        "name": "Oz Hotels Incekum Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 1324,
        "price_eur": 677,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17292362218881.jpg"
      },
      {
        "name": "Galeri Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1328,
        "price_eur": 679,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295919043553.jpg"
      },
      {
        "name": "Royal Garden Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1328,
        "price_eur": 679,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ROYAL%20GARDEN%20BEACH%20HOTEL%201_16837076217633.jpg"
      },
      {
        "name": "Aska Just In Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1334,
        "price_eur": 682,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ASKA%20JUST%20IN%20BEACH%20HOTEL1_16553863144193.jpg"
      },
      {
        "name": "The Lumos Deluxe Resort Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1334,
        "price_eur": 682,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LUMOS3_15749366795933.jpg"
      },
      {
        "name": "Riviera Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1336,
        "price_eur": 683,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260488658756.jpg"
      },
      {
        "name": "Gardenia Hotel",
        "board": "All Inclusive",
        "price_bgn": 1346,
        "price_eur": 688,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17278526098820.jpg"
      },
      {
        "name": "Meryan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1346,
        "price_eur": 688,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MERYAN%20HOTEL3_16551286723383.jpg"
      },
      {
        "name": "Mukarnas Spa & Resort",
        "board": "All Inclusive",
        "price_bgn": 1348,
        "price_eur": 689,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17289830843583.jpg"
      },
      {
        "name": "Saphir Hotel & Villas",
        "board": "All Inclusive",
        "price_bgn": 1350,
        "price_eur": 690,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SAPHIR%20HOTEL%20%26%20VILLAS%201_16553849166870.jpg"
      },
      {
        "name": "Aqi Pegasos Club",
        "board": "All Inclusive",
        "price_bgn": 1359,
        "price_eur": 695,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302997818893.jpg"
      },
      {
        "name": "Riviera Zen",
        "board": "All Inclusive",
        "price_bgn": 1367,
        "price_eur": 699,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260498108757.jpg"
      },
      {
        "name": "Litore Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1369,
        "price_eur": 700,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_LITORE%20RESORT%20%26%20SPA%20HOTEL2_15765108315573.jpg"
      },
      {
        "name": "Timo Deluxe Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1369,
        "price_eur": 700,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TIMO%20RESORT1_16552179683229.jpg"
      },
      {
        "name": "Floria Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1375,
        "price_eur": 703,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566284136732.jpg"
      },
      {
        "name": "Club Kastalia Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1385,
        "price_eur": 708,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_tatil-koyu-galeri-1_17331269748991.jpg"
      },
      {
        "name": "Mary Hotel Alanya",
        "board": "All Inclusive",
        "price_bgn": 1385,
        "price_eur": 708,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIRIUS%20DELUXE2_16837956515607.jpg"
      },
      {
        "name": "Lonicera Premium Hotel 18+(Adults Only)",
        "board": "All Inclusive",
        "price_bgn": 1408,
        "price_eur": 720,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_premium_genel20_16553915196938.jpg"
      },
      {
        "name": "Orange County Alanya",
        "board": "All Inclusive",
        "price_bgn": 1410,
        "price_eur": 721,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567870625991.jpg"
      },
      {
        "name": "Selene Beach & Spa Hotel(Adult Only)",
        "board": "All Inclusive",
        "price_bgn": 1426,
        "price_eur": 729,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567903456747.jpg"
      },
      {
        "name": "Armas Green Fugla Beach",
        "board": "All Inclusive",
        "price_bgn": 1430,
        "price_eur": 731,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_armas1_16552053576310.jpg"
      },
      {
        "name": "Justiniano Club Park Conti",
        "board": "All Inclusive",
        "price_bgn": 1436,
        "price_eur": 734,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_JUSTINIANO%20CLUB%20PARK%20CONTI_15693349273587.jpg"
      },
      {
        "name": "Eftalia Ocean Resort",
        "board": "All Inclusive",
        "price_bgn": 1447,
        "price_eur": 740,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_eftalia%20ocean_15739009506285.jpg"
      },
      {
        "name": "Justiniano Deluxe Resort",
        "board": "All Inclusive",
        "price_bgn": 1457,
        "price_eur": 745,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295919886050.jpg"
      },
      {
        "name": "Aqi Pegasos Resort",
        "board": "All Inclusive",
        "price_bgn": 1465,
        "price_eur": 749,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17302994208892.jpg"
      },
      {
        "name": "Utopia Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1473,
        "price_eur": 753,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_790850453_17695918059560.jpg"
      },
      {
        "name": "Lonicera Resort And Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1477,
        "price_eur": 755,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567857526076.jpg"
      },
      {
        "name": "Aria Resort & Spa Hotel",
        "board": "All Inclusive",
        "price_bgn": 1496,
        "price_eur": 765,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_genel-7-scaled_17374459839053.jpg"
      },
      {
        "name": "Aqi Pegasos Royal",
        "board": "All Inclusive",
        "price_bgn": 1508,
        "price_eur": 771,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Pegasos%20Royal_16148641756287.jpg"
      },
      {
        "name": "White City Resort",
        "board": "All Inclusive",
        "price_bgn": 1514,
        "price_eur": 774,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567908225113.jpg"
      },
      {
        "name": "Gold Island Selected",
        "board": "All Inclusive",
        "price_bgn": 1516,
        "price_eur": 775,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_0-general-photo-5_17274207468773.jpg"
      },
      {
        "name": "Senza Garden Holiday Club",
        "board": "All Inclusive",
        "price_bgn": 1516,
        "price_eur": 775,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SENZA%20GARDEN%20HOLIDAY%20CLUB1_16699018547013.jpg"
      },
      {
        "name": "Utopia Resort & Residence",
        "board": "All Inclusive",
        "price_bgn": 1524,
        "price_eur": 779,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_790850008_17695926709561.jpg"
      },
      {
        "name": "Numa Bay Exclusive Hotel",
        "board": "All Inclusive",
        "price_bgn": 1551,
        "price_eur": 793,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567895126081.jpg"
      },
      {
        "name": "Serenity Queen",
        "board": "All Inclusive",
        "price_bgn": 1586,
        "price_eur": 811,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Serenity%20Queen%20Hotel%201_17068902577978.jpg"
      },
      {
        "name": "Senza The Inn Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1590,
        "price_eur": 813,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16159045627391.jpg"
      },
      {
        "name": "Senza Grand Santana",
        "board": "All Inclusive",
        "price_bgn": 1590,
        "price_eur": 813,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Senza%20Grand%20Santana1_16735186706786.jpg"
      },
      {
        "name": "Green Garden Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1602,
        "price_eur": 819,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Green%20Garden%20Resort1_16668784957631.jpg"
      },
      {
        "name": "Azura World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1602,
        "price_eur": 819,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17478210069531.jpg"
      },
      {
        "name": "Haydarpasha Palace",
        "board": "All Inclusive",
        "price_bgn": 1653,
        "price_eur": 845,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_HAYDARPASA%20PALACE1_15766734775976.jpg"
      },
      {
        "name": "Granada Luxury Red (Adults Only 16+)",
        "board": "All Inclusive",
        "price_bgn": 1655,
        "price_eur": 846,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17260483148682.jpg"
      },
      {
        "name": "Senza Sunset Beach",
        "board": "All Inclusive",
        "price_bgn": 1664,
        "price_eur": 851,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_724403662_17695069189559.jpg"
      },
      {
        "name": "Saphir Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1688,
        "price_eur": 863,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15567891743600.jpg"
      },
      {
        "name": "Blue Marlin Deluxe Spa Resort",
        "board": "All Inclusive",
        "price_bgn": 1692,
        "price_eur": 865,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16564093905152.jpg"
      },
      {
        "name": "Granada Luxury Beach",
        "board": "All Inclusive",
        "price_bgn": 1700,
        "price_eur": 869,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GRANADA%20LUXURY%20BEACH1_15767595036734.jpg"
      },
      {
        "name": "Granada Luxury Okurcalar",
        "board": "All Inclusive",
        "price_bgn": 1711,
        "price_eur": 875,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15701954553560.jpg"
      },
      {
        "name": "Utopia World Hotel",
        "board": "All Inclusive",
        "price_bgn": 1741,
        "price_eur": 890,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_UTOPIA%20WORLD%20HOTEL%201_16841543403613.jpg"
      },
      {
        "name": "Antique Roman Palace (16+ Adult Only)",
        "board": "All Inclusive",
        "price_bgn": 1764,
        "price_eur": 902,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ANTIQUE%20ROMAN%20PALACE1_15748618184875.jpg"
      },
      {
        "name": "Long Beach Resorts",
        "board": "All Inclusive",
        "price_bgn": 1866,
        "price_eur": 954,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295925073577.jpg"
      },
      {
        "name": "Azura Deluxe Hotel Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 2038,
        "price_eur": 1042,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15761428455565.jpg"
      },
      {
        "name": "Rubi Platinum Spa Resort & Suites",
        "board": "All Inclusive",
        "price_bgn": 2044,
        "price_eur": 1045,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17267350408764.jpg"
      },
      {
        "name": "Mylome Luxury Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 2073,
        "price_eur": 1060,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Mylome-Luxury_0_15825372507014.jpg"
      },
      {
        "name": "Delphin Botanik Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 2101,
        "price_eur": 1074,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_DELPHIN%20BOTANIK%20HOTEL%20%26%20RESORT1_15767705946723.jpg"
      },
      {
        "name": "Sidera Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2104,
        "price_eur": 1076,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SIDERA1_15762530945776.jpg"
      },
      {
        "name": "Botanik Platinum",
        "board": "All Inclusive",
        "price_bgn": 2138,
        "price_eur": 1093,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BOTANIK%20PLATINIUM1_15765957035566.jpg"
      },
      {
        "name": "Rubi Platinum Sign",
        "board": "All Inclusive",
        "price_bgn": 2144,
        "price_eur": 1096,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17267357988765.jpg"
      },
      {
        "name": "Delphin Deluxe Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 2249,
        "price_eur": 1150,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17295918643543.jpg"
      },
      {
        "name": "Arycanda Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2273,
        "price_eur": 1162,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KIRMAN%20HOTELS%20ARYCANDA4_15765994684605.jpg"
      },
      {
        "name": "Leodikya Kirman Premium",
        "board": "All Inclusive",
        "price_bgn": 2273,
        "price_eur": 1162,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_KIRMAN%20LEODIKYA%20HOTEL%20HIGH%20CLASS1_15766712816858.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 109,
    "refNum": "П1082",
    "title": "Кемер – Лято 2026 (самолет, събота, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive"
    ],
    "destination": "Кемер, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 698,
    "price_eur": 357,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "All Inclusive почивка в Кемер със съботен чартър до Анталия.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Himeros Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 677,
        "price_eur": 346,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16777572107698.jpg"
      },
      {
        "name": "Santana Hotel",
        "board": "All Inclusive",
        "price_bgn": 686,
        "price_eur": 351,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG15_17277752368815_17277754748815.jpg"
      },
      {
        "name": "Belpoint Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 710,
        "price_eur": 363,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276890628788.jpg"
      },
      {
        "name": "Ares Blue Hotel",
        "board": "All Inclusive",
        "price_bgn": 714,
        "price_eur": 365,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARES%20BLUE%20HOTEL1_15568826876891.jpg"
      },
      {
        "name": "Hotel Gold Stone",
        "board": "All Inclusive",
        "price_bgn": 714,
        "price_eur": 365,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276952078797.jpg"
      },
      {
        "name": "Ares City Hotel",
        "board": "All Inclusive",
        "price_bgn": 714,
        "price_eur": 365,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17301970496892.jpg"
      },
      {
        "name": "Ares Dream Hotel",
        "board": "All Inclusive",
        "price_bgn": 741,
        "price_eur": 379,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568834246893.jpg"
      },
      {
        "name": "Grand Nar Hotel",
        "board": "All Inclusive",
        "price_bgn": 741,
        "price_eur": 379,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277705298807.jpg"
      },
      {
        "name": "Garden Park Beldibi Hotel",
        "board": "All Inclusive",
        "price_bgn": 749,
        "price_eur": 383,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276928518794.jpg"
      },
      {
        "name": "More Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 755,
        "price_eur": 386,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277718138810.jpg"
      },
      {
        "name": "Idyros Hotel",
        "board": "All Inclusive",
        "price_bgn": 775,
        "price_eur": 396,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_006_17441811349525.jpg"
      },
      {
        "name": "La Muer City Hotel (Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 788,
        "price_eur": 403,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ezgif-7-dbc42f9eff_17277736638812.jpg"
      },
      {
        "name": "Havana Hotel",
        "board": "All Inclusive",
        "price_bgn": 796,
        "price_eur": 407,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277708708808.jpg"
      },
      {
        "name": "Erkal Resort",
        "board": "All Inclusive",
        "price_bgn": 827,
        "price_eur": 423,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276912068793.jpg"
      },
      {
        "name": "Saint Star Kemer (Adults Only +16)",
        "board": "All Inclusive",
        "price_bgn": 827,
        "price_eur": 423,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_28_17352871309006.jpg"
      },
      {
        "name": "Mr Crane Hotel",
        "board": "All Inclusive",
        "price_bgn": 835,
        "price_eur": 427,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277721428811.jpg"
      },
      {
        "name": "Rios Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 847,
        "price_eur": 433,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16777574627700.jpg"
      },
      {
        "name": "Castle Park Hotel",
        "board": "All Inclusive",
        "price_bgn": 851,
        "price_eur": 435,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276899028790.jpg"
      },
      {
        "name": "Golden Sun Hotel",
        "board": "All Inclusive",
        "price_bgn": 861,
        "price_eur": 440,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_02_17276948318796.jpg"
      },
      {
        "name": "The Nix Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 863,
        "price_eur": 441,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17508328899538.jpg"
      },
      {
        "name": "Tal Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 864,
        "price_eur": 442,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277763578817.jpg"
      },
      {
        "name": "Tu Casa Gelidonya Hotel",
        "board": "All Inclusive",
        "price_bgn": 864,
        "price_eur": 442,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_TU%20CASA%20GELIDONYA_15694215936763.jpg"
      },
      {
        "name": "Adalin Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 872,
        "price_eur": 446,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16559938543769.jpg"
      },
      {
        "name": "Magic Sun Hotel",
        "board": "All Inclusive",
        "price_bgn": 888,
        "price_eur": 454,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17284659068828.jpg"
      },
      {
        "name": "Elite Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 896,
        "price_eur": 458,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_beso-beach-hotel_17301979468789.jpg"
      },
      {
        "name": "Viking Express Hotel",
        "board": "All Inclusive",
        "price_bgn": 911,
        "price_eur": 466,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325272258982.jpg"
      },
      {
        "name": "Astoria Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 923,
        "price_eur": 472,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ASTORIA%20HOTEL%20KEMER1_16717014296101.jpg"
      },
      {
        "name": "Stella Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 923,
        "price_eur": 472,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Stella%20Hotel1_16717094453031.jpg"
      },
      {
        "name": "Dedeman Kemer Resort",
        "board": "All Inclusive",
        "price_bgn": 925,
        "price_eur": 473,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17224201198745.jpg"
      },
      {
        "name": "Asdem Park",
        "board": "All Inclusive",
        "price_bgn": 952,
        "price_eur": 487,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_asdempark2_16734376287683.jpg"
      },
      {
        "name": "Onkel Resort",
        "board": "All Inclusive",
        "price_bgn": 962,
        "price_eur": 492,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_onkel1_15796944516760.jpg"
      },
      {
        "name": "Grand Miramor Hotel",
        "board": "All Inclusive",
        "price_bgn": 966,
        "price_eur": 494,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Grand%20Miramor%20Hotel1_16717039767676.jpg"
      },
      {
        "name": "Elamir Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 968,
        "price_eur": 495,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Elamir%20Resort%20Hotel%201_16983174476777.jpg"
      },
      {
        "name": "Valeri Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 972,
        "price_eur": 497,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_VALERI%20BEACH%20HOTEL1_15839354123799.jpg"
      },
      {
        "name": "Club Hotel Sunbel",
        "board": "All Inclusive",
        "price_bgn": 974,
        "price_eur": 498,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277680558803.jpg"
      },
      {
        "name": "Miramor Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 976,
        "price_eur": 499,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16716989545161.jpg"
      },
      {
        "name": "Aleria Belport Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 990,
        "price_eur": 506,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_13_17352858989005.jpg"
      },
      {
        "name": "Fame Hotel",
        "board": "All Inclusive",
        "price_bgn": 996,
        "price_eur": 509,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_377780_15722760653737.jpg"
      },
      {
        "name": "Sl La Perla Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 999,
        "price_eur": 511,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17441815699526.jpg"
      },
      {
        "name": "Mg Club Akman Beach",
        "board": "All Inclusive",
        "price_bgn": 1009,
        "price_eur": 516,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Club-Akman-Beach-5_17277671488802.jpg"
      },
      {
        "name": "Viking Park Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1009,
        "price_eur": 516,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325288118985.jpg"
      },
      {
        "name": "Kemer Dream Hotel",
        "board": "All Inclusive",
        "price_bgn": 1011,
        "price_eur": 517,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276959058799.jpg"
      },
      {
        "name": "Uk Hotel Kiris",
        "board": "All Inclusive",
        "price_bgn": 1035,
        "price_eur": 529,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17371007059052.jpg"
      },
      {
        "name": "Lancora Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1039,
        "price_eur": 531,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_95CJASD3_20240220172501_17294969218885.jpg"
      },
      {
        "name": "Ambassador Plaza",
        "board": "All Inclusive",
        "price_bgn": 1039,
        "price_eur": 531,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17284652328825.jpg"
      },
      {
        "name": "C Istanbul Hotel Kemer",
        "board": "All Inclusive",
        "price_bgn": 1042,
        "price_eur": 533,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_general-2048x1152_16224557787424.jpg"
      },
      {
        "name": "Pine House Hotel",
        "board": "All Inclusive",
        "price_bgn": 1042,
        "price_eur": 533,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16763859844245.jpg"
      },
      {
        "name": "Selcukhan Hotel",
        "board": "All Inclusive",
        "price_bgn": 1058,
        "price_eur": 541,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277755718816.jpg"
      },
      {
        "name": "Monk Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1080,
        "price_eur": 552,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17466978319530.jpg"
      },
      {
        "name": "Grand Ring Hotel",
        "board": "All Inclusive",
        "price_bgn": 1082,
        "price_eur": 553,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_GRAND%20RING%20HOTEL1_16560785673746.jpg"
      },
      {
        "name": "White Lilyum Hotel",
        "board": "All Inclusive",
        "price_bgn": 1095,
        "price_eur": 560,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MG%20WHITE%20LILYUM%201_16784648493265.jpg"
      },
      {
        "name": "Fame Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16559948423741.jpg"
      },
      {
        "name": "Club Hotel Belpinar",
        "board": "All Inclusive",
        "price_bgn": 1115,
        "price_eur": 570,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_CLUB%20HOTEL%20BELPINAR%201_17121385127702.jpg"
      },
      {
        "name": "Golden Lotus Hotel",
        "board": "All Inclusive",
        "price_bgn": 1138,
        "price_eur": 582,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276933258795.jpg"
      },
      {
        "name": "Club Hotel Rama",
        "board": "All Inclusive",
        "price_bgn": 1146,
        "price_eur": 586,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17276903428791.jpg"
      },
      {
        "name": "Transatlantik Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1152,
        "price_eur": 589,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Gallery-Source-011taaks_17156740777682.jpg"
      },
      {
        "name": "Ring Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1154,
        "price_eur": 590,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RING%20BEACH%20HOTEL%201_17028892394886.jpg"
      },
      {
        "name": "Daima Biz Hotel",
        "board": "All Inclusive",
        "price_bgn": 1154,
        "price_eur": 590,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277897914238.jpg"
      },
      {
        "name": "Perre La Mer Hotel",
        "board": "All Inclusive",
        "price_bgn": 1162,
        "price_eur": 594,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MIRADA%20DEL%20MAR%20HOTEL1_15568105724242.jpg"
      },
      {
        "name": "Camyuva Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1177,
        "price_eur": 602,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16662593803029.jpg"
      },
      {
        "name": "Miarosa Kemer Beach",
        "board": "All Inclusive",
        "price_bgn": 1181,
        "price_eur": 604,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_2_17695972359562.jpg"
      },
      {
        "name": "Viking Beach Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1187,
        "price_eur": 607,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17327815358990.jpg"
      },
      {
        "name": "Champion Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1197,
        "price_eur": 612,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566291375074.jpg"
      },
      {
        "name": "Viking Garden Hotel",
        "board": "All Inclusive",
        "price_bgn": 1220,
        "price_eur": 624,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325276968983.jpg"
      },
      {
        "name": "Sinatra Hotel",
        "board": "All Inclusive",
        "price_bgn": 1224,
        "price_eur": 626,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568680143790.jpg"
      },
      {
        "name": "Alder Garden Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1224,
        "price_eur": 626,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277684478804.jpg"
      },
      {
        "name": "Viking Star Hotel",
        "board": "All Inclusive",
        "price_bgn": 1240,
        "price_eur": 634,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17325292508986.jpg"
      },
      {
        "name": "Pashas Princess",
        "board": "All Inclusive",
        "price_bgn": 1242,
        "price_eur": 635,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16763861126105.jpg"
      },
      {
        "name": "Alder Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1256,
        "price_eur": 642,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277691758805.jpg"
      },
      {
        "name": "Viking Nona Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1263,
        "price_eur": 646,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_nona5_17325284538984.jpg"
      },
      {
        "name": "Transatlantik Hotel & Spa",
        "board": "All Inclusive",
        "price_bgn": 1265,
        "price_eur": 647,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARMAS%20TRANSATLANTIK%20HOTEL_16121862656496.jpg"
      },
      {
        "name": "Akka Hotels Claros",
        "board": "All Inclusive",
        "price_bgn": 1273,
        "price_eur": 651,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AKKA%20HOTELS%20CLAROS%201_16777659833514.jpg"
      },
      {
        "name": "Gravel Hotels Select Kemer",
        "board": "All Inclusive",
        "price_bgn": 1293,
        "price_eur": 661,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16566584836292.jpg"
      },
      {
        "name": "Ozkaymak Kemer Marina Hotel",
        "board": "All Inclusive",
        "price_bgn": 1312,
        "price_eur": 671,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1724655856_NJ262UIOBR_medium_17277892118819.jpg"
      },
      {
        "name": "Meder Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1318,
        "price_eur": 674,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568058453768.jpg"
      },
      {
        "name": "The Norm Oriental",
        "board": "All Inclusive",
        "price_bgn": 1318,
        "price_eur": 674,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16564179613738.jpg"
      },
      {
        "name": "Karmir Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1338,
        "price_eur": 684,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_image-17-f_16563244565949.jpg"
      },
      {
        "name": "Ozkaymak Otem Hotel",
        "board": "All Inclusive",
        "price_bgn": 1359,
        "price_eur": 695,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1682602399_IIV6VEJVKX_medium_17314022988965.jpg"
      },
      {
        "name": "Greenwood Kemer Resort",
        "board": "All Inclusive",
        "price_bgn": 1361,
        "price_eur": 696,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568654205065.jpg"
      },
      {
        "name": "Lims Bona Dea Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1365,
        "price_eur": 698,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17331273538992.jpg"
      },
      {
        "name": "Loceanica Beach Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1383,
        "price_eur": 707,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17277894528746.jpg"
      },
      {
        "name": "Club Phaselis Rose",
        "board": "All Inclusive",
        "price_bgn": 1416,
        "price_eur": 724,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_image-60514-1549289857_17309712318905.jpg"
      },
      {
        "name": "Dosinia Luxury Resort",
        "board": "All Inclusive",
        "price_bgn": 1422,
        "price_eur": 727,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Dosinia_0_15809118466497.jpg"
      },
      {
        "name": "Ma Biche Kemer",
        "board": "All Inclusive",
        "price_bgn": 1449,
        "price_eur": 741,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16763858473766.jpg"
      },
      {
        "name": "Emelda Sun Club",
        "board": "All Inclusive",
        "price_bgn": 1451,
        "price_eur": 742,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BEACH%20%26%20PIER_17098148992893.jpg"
      },
      {
        "name": "Armas Kaplan Paradise",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16560764886309.jpg"
      },
      {
        "name": "Armas Gul Beach",
        "board": "All Inclusive",
        "price_bgn": 1481,
        "price_eur": 757,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15566208056099.jpg"
      },
      {
        "name": "Zena Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1522,
        "price_eur": 778,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_4_17325302478987.jpg"
      },
      {
        "name": "Crystal De Luxe Comfort Collection",
        "board": "All Inclusive",
        "price_bgn": 1533,
        "price_eur": 784,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484132353024.jpg"
      },
      {
        "name": "Queens Park Goynuk",
        "board": "All Inclusive",
        "price_bgn": 1533,
        "price_eur": 784,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_QUEENS%20PARK%20GOYNUK1_16560822186106.jpg"
      },
      {
        "name": "Armas Beach Hotel",
        "board": "All Inclusive",
        "price_bgn": 1533,
        "price_eur": 784,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ARMAS%20BEACH%20HOTEL1_16560810416098.jpg"
      },
      {
        "name": "Pirates Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1555,
        "price_eur": 795,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PIRATES%20BEACH%20CLUB1_15803804315361.jpg"
      },
      {
        "name": "Crystal Aura Aqua Collection",
        "board": "All Inclusive",
        "price_bgn": 1557,
        "price_eur": 796,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484130425064.jpg"
      },
      {
        "name": "Amara Comfort Resort",
        "board": "All Inclusive",
        "price_bgn": 1557,
        "price_eur": 796,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_2_16564070586753.jpg"
      },
      {
        "name": "Orange County Kemer (Adults Only 18+)",
        "board": "All Inclusive",
        "price_bgn": 1576,
        "price_eur": 806,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1%20%28Copy%29_16564198742548.jpg"
      },
      {
        "name": "Armas Labada",
        "board": "All Inclusive",
        "price_bgn": 1612,
        "price_eur": 824,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16563424966100.jpg"
      },
      {
        "name": "Sailors Beach Club",
        "board": "All Inclusive",
        "price_bgn": 1617,
        "price_eur": 827,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_SAILORS%20BEACH%20CLUB_16121824904314.jpg"
      },
      {
        "name": "Mirada Del Mar Hotel",
        "board": "All Inclusive",
        "price_bgn": 1621,
        "price_eur": 829,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_MIRADA%20DEL%20MAR%20HOTEL1_15568065953771.jpg"
      },
      {
        "name": "Sealife Kemer Resort",
        "board": "All Inclusive",
        "price_bgn": 1627,
        "price_eur": 832,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568111236761.jpg"
      },
      {
        "name": "Le Jardin Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1631,
        "price_eur": 834,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16124414375773.jpg"
      },
      {
        "name": "Crystal Flora Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1643,
        "price_eur": 840,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484132763730.jpg"
      },
      {
        "name": "Crystal Prestige Pearl Collection",
        "board": "All Inclusive",
        "price_bgn": 1643,
        "price_eur": 840,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484133006293.jpg"
      },
      {
        "name": "Baia Salima Kemer",
        "board": "All Inclusive",
        "price_bgn": 1662,
        "price_eur": 850,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16564246566955.jpg"
      },
      {
        "name": "Limak Limra Hotel & Resort",
        "board": "All Inclusive",
        "price_bgn": 1700,
        "price_eur": 869,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BIG_IMG26_16564229363763_16564231133763.jpg"
      },
      {
        "name": "Akka Hotels Alinda",
        "board": "All Inclusive",
        "price_bgn": 1754,
        "price_eur": 897,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16566723323512.jpg"
      },
      {
        "name": "Ulusoy Kemer Holiday Club",
        "board": "All Inclusive",
        "price_bgn": 1792,
        "price_eur": 916,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_ULUSOY%20KEMER%20HOLIDAY1_15723543433796.jpg"
      },
      {
        "name": "Kimeros Park Holiday Village",
        "board": "All Inclusive",
        "price_bgn": 1813,
        "price_eur": 927,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_kimeros_16576290235839.jpg"
      },
      {
        "name": "Siu Collection",
        "board": "All Inclusive",
        "price_bgn": 1840,
        "price_eur": 941,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AYDINBEY%20SIU%20COLLECTION1_16708411302332.jpg"
      },
      {
        "name": "Rai Foresta Tekirova",
        "board": "All Inclusive",
        "price_bgn": 1856,
        "price_eur": 949,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_foresta1_17695986669563.jpg"
      },
      {
        "name": "Corendon Playa Kemer",
        "board": "All Inclusive",
        "price_bgn": 1866,
        "price_eur": 954,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16564164746157.jpg"
      },
      {
        "name": "Sherwood Exclusive Kemer",
        "board": "All Inclusive",
        "price_bgn": 1901,
        "price_eur": 972,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16566849776762.jpg"
      },
      {
        "name": "Club Marco Polo Kemer",
        "board": "All Inclusive",
        "price_bgn": 1911,
        "price_eur": 977,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17068870993259.jpg"
      },
      {
        "name": "Corendon Hydros Club Kemer",
        "board": "All Inclusive",
        "price_bgn": 1923,
        "price_eur": 983,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_AQI%20HYDROS%20CLUB%201_16983924033751.jpg"
      },
      {
        "name": "Balmy Foresta Kemer",
        "board": "All Inclusive",
        "price_bgn": 1940,
        "price_eur": 992,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_PALOMA%20FORESTA%20RESORT_16119143663263.jpg"
      },
      {
        "name": "Marti Myra Kemer",
        "board": "All Inclusive",
        "price_bgn": 1946,
        "price_eur": 995,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568044092513.jpg"
      },
      {
        "name": "Rai Premium Tekirova",
        "board": "All Inclusive",
        "price_bgn": 2013,
        "price_eur": 1029,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16486262783781.jpg"
      },
      {
        "name": "Juju Premier Palace",
        "board": "All Inclusive",
        "price_bgn": 2028,
        "price_eur": 1037,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16754123817686.jpg"
      },
      {
        "name": "Seven Seas Hotel Life",
        "board": "All Inclusive",
        "price_bgn": 2075,
        "price_eur": 1061,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15871510916104.jpg"
      },
      {
        "name": "Akka Hotels Antedon",
        "board": "All Inclusive",
        "price_bgn": 2159,
        "price_eur": 1104,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_antedon_16576265825171.jpg"
      },
      {
        "name": "Dobedan World Palace",
        "board": "All Inclusive",
        "price_bgn": 2200,
        "price_eur": 1125,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_1_16566842985931.jpg"
      },
      {
        "name": "Tui Magic Life Beldibi (Adult Only +16)",
        "board": "All Inclusive",
        "price_bgn": 2210,
        "price_eur": 1130,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_RIXOS%20BELDIBI_16121786455579.jpg"
      },
      {
        "name": "Balmy Beach Resort Kemer (Adult Only 18+)",
        "board": "All Inclusive",
        "price_bgn": 2236,
        "price_eur": 1143,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BALMY%20BEACH1_16727489297678.jpg"
      },
      {
        "name": "Fashiontv Luxe Resort",
        "board": "All Inclusive",
        "price_bgn": 2265,
        "price_eur": 1158,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_fashiontv-luxe-resort_823224_17441833699057.jpg"
      },
      {
        "name": "Akra Kemer",
        "board": "All Inclusive",
        "price_bgn": 2267,
        "price_eur": 1159,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_BARUT%20KEMER1_15566289885837.jpg"
      },
      {
        "name": "Mirage Park Resort",
        "board": "All Inclusive",
        "price_bgn": 2298,
        "price_eur": 1175,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568067416759.jpg"
      },
      {
        "name": "Swandor Hotel & Resort Kemer",
        "board": "All Inclusive",
        "price_bgn": 2441,
        "price_eur": 1248,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568107715049.jpg"
      },
      {
        "name": "Gural Premier Tekirova",
        "board": "All Inclusive",
        "price_bgn": 2490,
        "price_eur": 1273,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_gural1_16577141244868.jpg"
      },
      {
        "name": "Nirvana Dolce Vita",
        "board": "All Inclusive",
        "price_bgn": 2505,
        "price_eur": 1281,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_17484139846047.jpg"
      },
      {
        "name": "Nirvana Mediterranean Excellence",
        "board": "All Inclusive",
        "price_bgn": 2566,
        "price_eur": 1312,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_nirvana-mediterranean-excellence-generalview2-22cca828b193cd9046d27b2412dc9ba2-Resize1920.JPG_17484141656594.jpg"
      },
      {
        "name": "Rixos Sungate",
        "board": "All Inclusive",
        "price_bgn": 2580,
        "price_eur": 1319,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568130112634.jpg"
      },
      {
        "name": "Rixos Premium Tekirova",
        "board": "All Inclusive",
        "price_bgn": 2955,
        "price_eur": 1511,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16577228472595.jpg"
      },
      {
        "name": "Rixos Sungate Club Diamond",
        "board": "All Inclusive",
        "price_bgn": 3767,
        "price_eur": 1926,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_Rixos%20Sungate%20Club%20Diamond1_16128706257312.jpg"
      },
      {
        "name": "Ng Phaselis Bay",
        "board": "All Inclusive",
        "price_bgn": 5349,
        "price_eur": 2735,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_16577817823729.jpg"
      },
      {
        "name": "Maxx Royal Kemer",
        "board": "All Inclusive",
        "price_bgn": 6828,
        "price_eur": 3491,
        "image": "http://aquatour.bg/img/OBEKTI/BIG_IMG_15568045315360.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 111,
    "refNum": "П1062",
    "title": "Почивка в Лара, Турция (полет от Пловдив)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive",
      "luxury"
    ],
    "destination": "Лара, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1351,
    "price_eur": 691,
    "dates": [
      "2026-06-11",
      "2026-06-18",
      "2026-06-25",
      "2026-09-03"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "Директен чартър от Пловдив до Анталия и 7 нощувки в луксозния Лара.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Greenwood Suites Resort",
        "board": "All Inclusive",
        "price_bgn": 1351,
        "price_eur": 691,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-lara-turtsiya-s-polet-ot-plovdiv-do-antaliya-1_17659772491062.jpg"
      },
      {
        "name": "Grand Park Lara Hotel",
        "board": "All Inclusive",
        "price_bgn": 1365,
        "price_eur": 698,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-lara-turtsiya-s-polet-ot-plovdiv-do-antaliya-1_17659772491062.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 112,
    "refNum": "П1052",
    "title": "Ранни записвания в Белек, Анталия (полет от Пловдив)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive",
      "luxury"
    ],
    "destination": "Белек, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1129,
    "price_eur": 577,
    "dates": [
      "2026-06-11",
      "2026-06-18",
      "2026-06-25",
      "2026-09-03"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "All Inclusive ранни записвания в Белек с директен полет от Пловдив.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Sensitive Premium Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1084,
        "price_eur": 554,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ranni-zapisvaniya-v-belek-antaliya-samoletna-programa-2-1_17659631671052.png"
      },
      {
        "name": "Maya World Park Belek",
        "board": "All Inclusive",
        "price_bgn": 1150,
        "price_eur": 588,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ranni-zapisvaniya-v-belek-antaliya-samoletna-programa-2-1_17659631671052.png"
      }
    ],
    "featured": false
  },
  {
    "id": 113,
    "refNum": "П1143",
    "title": "Почивка в Лара, Турция (самолет от Пловдив, петък)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family",
      "allInclusive",
      "luxury"
    ],
    "destination": "Лара, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1456,
    "price_eur": 745,
    "dates": [
      "2026-06-12",
      "2026-06-19",
      "2026-08-28",
      "2026-09-04"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Петъчен чартър от Пловдив до Анталия и 7 нощувки в Лара.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Wyndham Garden Lara",
        "board": "All Inclusive",
        "price_bgn": 1456,
        "price_eur": 745,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-istanbul-samoletna-4-dni-1_1765900946585.jpg"
      },
      {
        "name": "Grand Park Lara",
        "board": "All Inclusive",
        "price_bgn": 1482,
        "price_eur": 758,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-do-istanbul-samoletna-4-dni-1_1765900946585.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 115,
    "refNum": "П1050",
    "title": "Тунис 2026 – 8 дни All Inclusive (полет от София)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Тунис",
    "country": "tunisia",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 759,
    "price_eur": 388,
    "dates": [
      "2026-06-12",
      "2026-06-15",
      "2026-06-19",
      "2026-06-22"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "All Inclusive почивка с дъх на екзотика в Тунис, полет от София.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки All Inclusive",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Samira Club",
        "board": "All Inclusive",
        "price_bgn": 924,
        "price_eur": 472,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_tunis-2026-8-dni-all-inclusive-pochivka-s-dah-na-ekzoti-1_17659020981050.jpg"
      },
      {
        "name": "Iberostar Averroes",
        "board": "All Inclusive",
        "price_bgn": 1001,
        "price_eur": 512,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_tunis-2026-8-dni-all-inclusive-pochivka-s-dah-na-ekzoti-1_17659020981050.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 116,
    "refNum": "П1051",
    "title": "Почивка в Албания 2026 – Шенгин на Адриатическо море",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "family"
    ],
    "destination": "Шенгин, Албания",
    "country": "albania",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 724,
    "price_eur": 370,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "bus",
    "description": "Плажна почивка на албанското Адриатическо крайбрежие в курорта Шенгин, до Черна гора.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки",
      "Хранене по програма",
      "Медицинска застраховка",
      "Водач"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Hotel President 4★",
        "board": "Закуска и вечеря",
        "price_bgn": 724,
        "price_eur": 370,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-albaniya-2026-na-adriatichesko-more-v-shengi-1_17659022201051.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 120,
    "refNum": "П1131",
    "title": "Почивка в Италия – Римини (хотел Vittoria 4★)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Римини, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1348,
    "price_eur": 689,
    "dates": [
      "2026-06-11",
      "2026-08-20",
      "2026-08-27",
      "2026-09-03"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "All Inclusive плажна почивка в Римини с директен полет и обслужване на български.",
    "includes": [
      "Директен полет (Wizz Air)",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Туристически такси",
      "Факултативни екскурзии",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Hotel Vittoria 4★",
        "board": "All Inclusive",
        "price_bgn": 1348,
        "price_eur": 689,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-italiya-rimini-hotel-vittoria-4-s-direkten--1_17766746411131.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 121,
    "refNum": "Е518",
    "title": "Най-доброто от Италия – Милано, Пиза, Флоренция, Рим",
    "category": "excursion",
    "tags": [
      "ranni-zapisvaniya",
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Италия – обиколен тур",
    "country": "italy",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 2198,
    "price_eur": 1124,
    "dates": [
      "2026-07-16",
      "2026-08-06",
      "2026-08-27",
      "2026-09-03"
    ],
    "next_date": "2026-07-16",
    "transport": "plane",
    "description": "Обиколка на Милано, Генуа, Пиза, Флоренция, Сиена, Орвието и Рим с водач на български.",
    "includes": [
      "Полет с летищни такси",
      "6 нощувки със закуска",
      "Трансфери и автобус",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Единична стая (495 лв.)"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване от летище София с директен полет на „Wizz Air\" или „Ryanair\" до Милано. Кацане на летище Бергамо. Трансфер до центъра на Милано. Пешеходна разходка: Замъкът на фамилията Сфорца; Миланската катедрала – най-красивата готическа катедрала на юг от Алпите; пасажът „Виторио Емануеле\"; Музикалният театър „Ла Скала\". Свободно време. Настаняване в хотел в района на Милано / Генуа. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Закуска. Отпътуване в 8.00 ч. за Генуа. Пешеходна разходка (1 ч.): Старото пристанище; катедралата „Сан Лоренцо\"; Дворецът на дожите; площад „Ферари\". Свободно време по улица „Гарибалди\". Отпътуване за Пиза – туристическа програма на Площада на чудесата: катедралата „Успение Богородично\"; Наклонената кула; баптистерията „Св. Йоан\". Свободно време с възможност за изкачване на Наклонената кула. Настаняване в района на Флоренция късно вечерта. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Закуска. Отпътуване в 8.00 ч. за Флоренция. Туристическа програма с местен екскурзовод (минимум 1½ ч.): катедралата „Санта Мария дел Фиоре\" с купола на Брунелески и кулата на Джото; площад „Синьория\" с „Палацо Векио\"; църквата „Санта Кроче\". Свободно време – Понте Векио, двореца „Пити\" и градините „Боболи\". По желание: галерия „Уфици\" с местен екскурзовод. 18.00 ч. връщане до хотела. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Закуска. Отпътуване в 8.00 ч. за Сиена. Пешеходна разходка: площад „Дей Кампо\"; Палацо Публико и Катедралата. Отпътуване за Рим. По пътя посещение на Орвието – средновековен град, наследник на етруско селище. Настаняване в района на Рим късно вечерта. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Закуска. Панорамна обиколка с местен екскурзовод на български език в историческия център на Рим (минимум 2½ ч.): Върховният касационен съд; площад „Кавур\"; замъка „Сант Анджело\"; храмът на Херкулес; църквата „Санта Мария ин Козмедин\" с „Устата на истината\"; Авентинския хълм, Циркус Максимус, Палатинския хълм, арката на Константин, Колизеума (фотопауза). Посещение на църквата „Сан Клементе\" с гроба на Константин-Кирил Философ. Площад „Венеция\", колоната на Траян, Капитолийския хълм. Свободно време във Ватикана. По желание: Ватиканските музеи и Сикстинската капела. Включено посещение на базиликата „Св. Петър\" с местен екскурзовод. Нощувка в района на Рим."
      },
      {
        "day": "Ден 6",
        "text": "Закуска. Пешеходна разходка до площад „Навона\" с Фонтана на четирите реки, църквата „Света Агнезия\", двореца „Памфили\", Пантеона с гробовете на Виктор Емануил II и Рафаело, виа дел Корсо, фонтана „Ди Треви\", площад „Испания\" с църквата „Санта Тринита дей Монти\". По желание екскурзия „Имперският Рим\": Римските форуми, Палатинския хълм и Колизеума. Свободно време. Нощувка."
      },
      {
        "day": "Ден 7",
        "text": "Закуска (сух пакет). Трансфер до летище в Рим. Отпътуване за България с полет на авиокомпания „Wizz Air\" или „Ryanair\" за София. Пристигане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "3★ хотели по маршрута",
        "board": "Закуска",
        "price_bgn": 2198,
        "price_eur": 1124,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_nay-dobroto-ot-italiya-gt-milano-%E2%80%93-genua-%E2%80%93-piza-%E2%80%93-1_1755763834518.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 123,
    "refNum": "П1041",
    "title": "Йордания от А до Я – Петра и пустинята Уади Рум",
    "category": "excursion",
    "tags": [
      "ranni-zapisvaniya",
      "culture",
      "adventure",
      "nature"
    ],
    "destination": "Йордания",
    "country": "jordan",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1499,
    "price_eur": 766,
    "dates": [
      "2026-11-10",
      "2026-11-17",
      "2026-11-24",
      "2026-12-01"
    ],
    "next_date": "2026-11-10",
    "transport": "plane",
    "description": "Йордания – UNESCO Петра, Мъртво море, Аман и пустинята Уади Рум. 4★ хотели, полет от София.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Виза Йордания",
      "Входни такси",
      "Бакшиши",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "СОФИЯ – АКАБА. Отпътуване от България за Акаба. Кацане на летището в Акаба и посрещане от фирмата партньор – трансфер и настаняване в хотел. Нощувка в района на Акаба."
      },
      {
        "day": "Ден 2",
        "text": "АКАБА. Закуска. Свободно време в Акаба или по желание допълнителна екскурзия – морска разходка и шнорхелинг в Червено море. Нощувка в района Акаба."
      },
      {
        "day": "Ден 3",
        "text": "АКАБА – ПЕТРА. Закуска. Посещение на Петра – едно от седемте чудеса на света, включена в списъка на ЮНЕСКО за Световното културно и природно наследство. Уникален град, изсечен в скалите, свещен град на набатейците, заселили се тук преди повече от 2000 години и превърнали го в център на всички търговски пътища, свързващи Изтока със Запада. Към града ни отвежда един километров проход между две надвиснали 80-метрови скали. Посещение на самия град с неговите изваяни в скалите гробници, храмове, олтари и улици. Нощувка в района на Петра."
      },
      {
        "day": "Ден 4",
        "text": "ПЕТРА – МАДАБА – НЕБО – АМАН. Закуска. Посещение на Мадаба, известен като „градът на мозайките\" заради прочутата си колекция от византийски и омаядски мозайки. Разходка до православната църква „Свети Георги\" (не се влиза), където се пази уникална географска мозаечна карта на Йерусалим и Светите земи, изработена от повече от два милиона малки квадратни цветни камъчета. Следваща спирка е планината Небо, спомената в библията като мястото, където Мойсей вижда за първи път Обетованата земя. Гледката към долината на река Йордан, Мъртво море, Йерусалим и Витлеем е величествена. Отпътуване за Аман. Нощувка в Аман."
      },
      {
        "day": "Ден 5",
        "text": "АМАН (Сити тур) – ДЖЕРАШ – АЖЛУН – АМАН. Закуска. Обиколка на централната част на Аман (2 часа) – Археологическия музей, Фолклорния музей, Цитаделата и Амфитеатъра. Отправяме се към древния римски град Джераш – един от най-добре запазените римски градове в Близкия изток: Триумфалната арка на Адриан, Хиподрумът, театърът от I в., църквата на епископ Марианос, светилището на Артемида и Овалния площад. Продължаваме към Ажлун – замъкът Qal’at Ar-Rabad, построен от пълководец на Саладин през 1184 г. Нощувка в Аман."
      },
      {
        "day": "Ден 6",
        "text": "АМАН – МЪРТВО МОРЕ – УАДИ РУМ. Закуска. Отпътуване към Мъртво море – най-ниската точка на планетата и един от най-солените водни обекти в света. Свободно време за плаж на Мъртво море. Трансфер до пустинята. Вечеря и нощувка в Уади Рум."
      },
      {
        "day": "Ден 7",
        "text": "УАДИ РУМ – АКАБА. Закуска. Свободно време или допълнителна екскурзия до Уади Рум – двучасово пътуване с джип в Йорданската пустиня, известна като Лунната пустиня. Защитен природен резерват с приказни пейзажи от червени пясъци и дюни, причудливи скални форми и гигантски каменни стени – снимачна площадка за редица холивудски продукции. Отпътуване за Акаба. Нощувка в района на Акаба."
      },
      {
        "day": "Ден 8",
        "text": "АКАБА. Закуска. Трансфер от Акаба до летището. Отпътуване за България. Пристигане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "Baity Boutique 4★ (Акаба) + Hassan Zawaydeh Camp 4★ (Уади Рум)",
        "board": "Закуска (+ вечеря в лагера)",
        "price_bgn": 1499,
        "price_eur": 766,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_yordaniya-ot-a-do-ya-petra-i-pustinyata-uadi-rum-bestse-1_17659015681041.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 124,
    "refNum": "Е519",
    "title": "Екскурзия в Мароко – имперските градове",
    "category": "excursion",
    "tags": [
      "ranni-zapisvaniya",
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Мароко – Фес, Маракеш",
    "country": "morocco",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2247,
    "price_eur": 1149,
    "dates": [
      "2026-09-22",
      "2026-10-06"
    ],
    "next_date": "2026-09-22",
    "transport": "plane",
    "description": "Имперските градове на Мароко – Фес, Мекнес, Маракеш и Рабат, с водач на български.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Единична стая (204 €)",
      "Бакшиши"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване от летище София с полет на авиокомпания „Wizz Air\" за Малага. Пристигане на летището в Малага. Трансфер до хотела. Настаняване в хотел 4* в района на Коста дел Сол. Вечеря (сух пакет). Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Закуска (рано сутринта или сух пакет). Трансфер до пристанището в Алхесирас. Прекосяване с ферибот на Гибралтарския проток (при неблагоприятни метеорологични условия е възможно часовете на отпътуване и пристигане на фериботите в двете посоки да са различни, както и да се ползват други пристанища). Пристигане в Африка. Среща с представител на обслужващата агенция на пристанището „Танжер Мед\". Отпътуване за Шефшауен – популярна туристическа дестинация поради близостта си до Танжер и испанския анклав Сеута. Името на града произлиза от берберската дума за рог и е свързано с планинските върхове, извисяващи се над града, които приличат на два кози рога. Характерни за Шефшауен са сградите в син цвят. Туристическа програма в Шефшауен. Свободно време за обяд. Отпътуване за Фес – най-старият и величествен от четирите имперски града на Мароко. Пристигане във Фес. Настаняване. Вечеря в хотела. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Закуска. Туристическа програма във Фес, който и днес се гордее със своите традиции и култура. Фес се счита за религиозна столица на Мароко. Посещение на старата медина – един от трите най-свещени за мюсюлманския свят градове, истински лабиринт с повече от 9400 улици и криволичещи тесни пътечки, до които трудно прониква слънчевата светлина. Време за обяд (заплаща се на място). Следобед свободно време за разходка по улиците на Фес. Вечеря в хотела. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Закуска. Отпътуване за Мекнес – един от четирите имперски града на Мароко и някогашна столица по време на управлението на Мулай Исмаил. Заради многобройните добре запазени джамии Мекнес е известен с прозвището „град на 100-те минарета\". Туристическа програма в имперския град, ограден от крепостна стена: главната градска порта „Баб ел Мансур\"; джамията-мавзолей на султан Мулай Исмаил, построена през 1703 г., и Кралския дворец. Отпътуване за Маракеш – червената перла в южната част на Мароко. Настаняване. Вечеря в хотела. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Закуска. Туристическа програма в историческата част на старинния имперски град Маракеш: джамията „Котубия\" (отвън), кулата близнак на севилската „Хиралда\", градините „Менара\", дворецът „Бахия\", гробницата на Саади (отвън), джамията „Касба\" (отвън). Обиколката приключва на площад „Джемаа Ел Фна\". Свободно време на площада. Трансфер до хотела. Обяд в хотела. Следобед свободно време за разходка из арабския пазар. По желание и предварителна заявка – вечеря с фолклорна програма в ресторант „Chez Ali\". Нощувка."
      },
      {
        "day": "Ден 6",
        "text": "Закуска. Отпътуване за Казабланка – икономическа столица на кралството. Основни забележителности са Площадът на Обединените нации, туристическият комплекс „Корниш\" и джамията „Хасан II\" – една от най-големите в света. Панорамна обиколка на Казабланка. По желание посещение на джамията „Хасан II\". Свободно време за обяд (заплаща се на място). Отпътуване за Рабат (85 км) – столица на кралството, разположена на Атлантическия бряг. Панорамна обиколка с местен екскурзовод. Настаняване. Вечеря в хотела. Нощувка."
      },
      {
        "day": "Ден 7",
        "text": "Закуска (сух пакет). Отпътуване за Танжер – град на контрастите, разположен в залив с изглед към Гибралтарския проток и испанското южно крайбрежие. Туристическа програма в Танжер. Трансфер до пристанището за отпътуване с ферибот за Испания. Пристигане в Алхесирас/Тарифа. Трансфер до хотела в района на Алхесирас / Коста дел Сол. Настаняване. Вечеря. Нощувка."
      },
      {
        "day": "Ден 8",
        "text": "Закуска. Отпътуване за Малага – родно място на Пабло Пикасо. Пешеходна разходка в историческия център на Малага. Трансфер до летището. Полет на авиокомпания „Wizz Air\" за България. Пристигане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "4★ хотели (Коста дел Сол, Фес, Маракеш, Рабат)",
        "board": "Закуска и вечеря",
        "price_bgn": 2247,
        "price_eur": 1149,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-maroko-imperskite-gradove-sas-samolet-voda-1_1773134577519.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 128,
    "refNum": "П1039",
    "title": "Мечтана Сицилия + бонус 6 екскурзии (Athena Resort 4★)",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "culture"
    ],
    "destination": "Сицилия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1512,
    "price_eur": 773,
    "dates": [
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "next_date": "2026-09-21",
    "transport": "plane",
    "description": "All Inclusive Сицилия с 6 включени екскурзии – Етна, Таормина, Сиракуза, Рагуза и Калтаджироне.",
    "includes": [
      "Чартър до Катания",
      "7 нощувки All Inclusive",
      "6 екскурзии",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Входни такси",
      "Лични разходи",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Athena Resort Village 4★ Superior",
        "board": "All Inclusive",
        "price_bgn": 1512,
        "price_eur": 773,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_mechtana-sitsiliya--bonus-6-ekskurzii-athena-resort-vil-1_17659014781039.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 129,
    "refNum": "П1038",
    "title": "Автентична Сицилия (Torre Normanna 4★) + 6 екскурзии",
    "category": "vacation",
    "tags": [
      "ranni-zapisvaniya",
      "beach",
      "culture"
    ],
    "destination": "Сицилия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1998,
    "price_eur": 1022,
    "dates": [
      "2026-06-22",
      "2026-06-29",
      "2026-08-31",
      "2026-09-07"
    ],
    "next_date": "2026-06-22",
    "transport": "plane",
    "description": "Сицилия с хотел Torre Normanna 4★ и 6 включени екскурзии до UNESCO обекти и средновековни градове.",
    "includes": [
      "Чартър до Катания",
      "7 нощувки",
      "6 екскурзии",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Входни такси",
      "Лични разходи",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Torre Normanna 4★ Superior",
        "board": "Закуска и вечеря",
        "price_bgn": 1998,
        "price_eur": 1022,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_avtentichna-sitsiliya-torre-normanna-4--bonus-6-vklyuc-1_17659014081038.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 131,
    "refNum": "П1035",
    "title": "Ексклузивно Мароко 2026 – имперските столици (кацане във Фес)",
    "category": "excursion",
    "tags": [
      "ranni-zapisvaniya",
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Мароко – имперски столици",
    "country": "morocco",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2200,
    "price_eur": 1125,
    "dates": [
      "2026-04-17",
      "2026-10-09",
      "2026-10-23"
    ],
    "next_date": "2026-10-09",
    "transport": "plane",
    "description": "Четирите имперски столици на Мароко с кацане във Фес – медини, UNESCO обекти, Мекнес, Рабат, Казабланка и Маракеш.",
    "includes": [
      "Полет до Фес с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Бакшиши",
      "Единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "София – Фес. Директен полет от София до Фес. Кацане на летище Фес. Посрещане и трансфер (около 30 мин). Настаняване в хотел Royal Mirage 4* или подобен. Туристическа програма в очарователния Фес – най-старият от четирите имперски града с над 12 века история и медина от 9500 улици, оградени от древни крепостни стени (ЮНЕСКО). Тук се намира най-старият религиозен университет. Вечеря. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Фес – Шефшауен. Закуска. Допълнителна екскурзия до Шефшауен – синият град на Мароко, сгушен в склоновете на планинската верига Риф, където всичко наоколо е синьо. Връщане във Фес. Вечеря. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Фес – Мекнес – Рабат – Казабланка (преход 300 км, около 4 часа). Закуска. Отпътуване към Мекнес (ЮНЕСКО), наричан Мароканския Версай – портата Баб Мансур и площада Ел Хедим. Пристигане в Рабат – панорамна обиколка: Кулата Хасан, мавзолеят на Мохамед V и Кралския дворец (отвън). Отпътуване за Казабланка – разходка по Булевард де ла Корниш, джамията Hassan II (при възможност посещение с допълнителен вход), луксозния квартал Анфа, площада на Обединените нации и парка Арабска лига. Настаняване в Казабланка. Вечеря. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Казабланка – Маракеш (преход 250 км, около 3 часа). Закуска. Отпътуване за Маракеш. Тур включващ джамията Кутубия (отвън) и площад „Джема Ел Фна\" с уличните артисти. Възможност за допълнителна екскурзия: градините Мажорел. Настаняване. Вечеря. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Маракеш – Водопадите Узуд. Закуска. Свободно време или възможност за допълнителна екскурзия: водопадите Узуд (на 150 км североизток от Маракеш) – едно от природните чудеса на Мароко със зелени долини, овощни градини и проломите на река Ел Абид. Екскурзията има тежък пешеходен преход – препоръчва се подходящо облекло и обувки. Вечеря. Нощувка в Маракеш."
      },
      {
        "day": "Ден 6",
        "text": "Маракеш – Ессауира. Закуска. Свободно време или възможност за допълнителна екскурзия: Ессауира – Африканската перла на Атлантика, едно от малкото места, където расте аргановото дърво, с белосани къщи със сини капаци и арабска крепост от XVIII в. Свободно време за обяд или разходка в Медината (ЮНЕСКО). Вечеря. Нощувка в Маракеш."
      },
      {
        "day": "Ден 7",
        "text": "Маракеш – Анима гардън и долината Урика. Закуска. Свободно време или възможност за допълнителна екскурзия: градината Anima Garden на Андре Хелър – най-красивата градина в Мароко, и долината Урика с включен берберски обяд, разкриваща бита и кухнята на берберите сред Атласките планини. Мароканска вечер „Фантазия\" с шоу програма. Вечеря. Нощувка в Маракеш."
      },
      {
        "day": "Ден 8",
        "text": "Маракеш – София. Закуска. Трансфер до летище Маракеш (около 20 мин) за полет до България. Кацане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "Royal Mirage 4★ (Фес) + Zalagh Kasbah 4★ (Маракеш)",
        "board": "Закуска и вечеря",
        "price_bgn": 2200,
        "price_eur": 1125,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ekskluzivno-maroko-2026-imperskite-stolitsi-katsane-vav-1_17659012711035.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 132,
    "refNum": "Е411",
    "title": "Париж – любов и романтика (самолет, на български)",
    "category": "excursion",
    "tags": [
      "ranni-zapisvaniya",
      "city",
      "culture"
    ],
    "destination": "Париж, Франция",
    "country": "france",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 1563,
    "price_eur": 799,
    "dates": [
      "2026-07-06",
      "2026-08-17",
      "2026-09-07",
      "2026-09-21",
      "2026-10-12"
    ],
    "next_date": "2026-07-06",
    "transport": "plane",
    "description": "Париж с панорамна обиколка, Версай, Барбизон и Живерни, с водач на български.",
    "includes": [
      "Полет с летищни такси",
      "4 нощувки",
      "Трансфери",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Единична стая (317 €)"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване от летище София с полет на авиокомпания „Wizz Air\" или „Ryanair\" за Париж. Пристигане на летище Бове. Трансфер до хотела. Настаняване. Свободно време – необходимо е ползване на градски транспорт. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Закуска. Панорамна обиколка с местен екскурзовод на български език: Парижката „Света Богородица\" – едно от най-великолепните постижения на готическата архитектура; Латинският квартал и Сорбоната; Пантеонът; Домът на инвалидите; Люксембургската градина с Люксембургския дворец, където заседава Сенатът; площад „Конкорд\"; Мадлената; Гранд Опера; площад „Вандом\"; булевард „Шан-з-Елизе\"; Триумфалната арка; площад „Трокадеро\" и Айфеловата кула. Свободно време или туристическа програма по желание: полудневна екскурзия до двореца „Версай\" – Големите апартаменти и огледалната зала, разходка в градините. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Закуска. Свободно време в Париж с възможност за индивидуално посещение на Айфеловата кула или туристическа програма по желание: 1. Разходка с панорамно корабче по Сена около историческите острови Ла Сите и Сен Луи. 2. Индивидуално посещение на кабаре „Мулен Руж\" (спектакъл с начало 21:00 ч. или 23:00 ч., продължителност 2 часа, с изисквания към облеклото). Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Закуска. Свободно време или туристическа програма по желание (избира се една от двете екскурзии): 1. Екскурзия до Барбизон и замъка „Фонтенбло\" – градчето на художниците и „най-уютният\" замък във Франция, пазещ спомени за крале като Анри II, Анри IV, Франсоа I и Филип IV Хубавия. 2. Екскурзия до Живерни – нормандско градче, придобило световна слава, след като Клод Моне се установява там през 1883 г.; възможност за посещение на музея на импресионизма или къщата на Клод Моне и градините. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Закуска. Освобождаване на стаите (багажът се оставя в стая за багаж в хотела). Свободно време в Париж – необходимо е ползване на градски транспорт. Трансфер до летище Бове. Отпътуване за България с полет на авиокомпания „Wizz Air\" или „Ryanair\". Пристигане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "Ibis Paris La Defense 3★",
        "board": "Закуска",
        "price_bgn": 1563,
        "price_eur": 799,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_parizh-lyubov-i-romantika-sas-samolet-obsluzhvane-na-ba-1_1767869753411.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 139,
    "refNum": "П980",
    "title": "Малдиви – райско приключение",
    "category": "exotic",
    "tags": [
      "avtorski",
      "beach",
      "luxury",
      "allInclusive"
    ],
    "destination": "Малдиви",
    "country": "maldives",
    "duration": "9 дни / 7 нощувки",
    "days": 9,
    "nights": 7,
    "price_bgn": 4450,
    "price_eur": 2275,
    "dates": [
      "2026-10-31",
      "2026-11-09",
      "2027-01-13",
      "2027-02-20"
    ],
    "next_date": "2026-10-31",
    "transport": "plane",
    "description": "Авторска програма до Малдивите – 7 нощи на бели плажове, водни спортове, спа и гмуркане.",
    "includes": [
      "Полет София–Истанбул–Мале с летищни такси",
      "7 нощувки",
      "Трансфери (спийдбоут/хидроплан)",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Лични разходи",
      "Доплащане за единична стая"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "София – Истанбул. Началото на екзотичното приключение. Отпътуване от летище София и кацане в Истанбул, където следва кратък престой преди следващия полет."
      },
      {
        "day": "Ден 2",
        "text": "Истанбул – Мале. Кацане на летище в Мале. Трансфер до избрания хотел (с лодка, вътрешен полет или хидроплан – в зависимост от локацията на хотела). Настаняване и първа среща с тропическия рай. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Свободен ден. Време за плаж, почивка или първи активности – гмуркане, шнорхелинг, СПА, разходки из острова или просто безвремие под палмите. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Свободен ден. Насладете се на тюркоазените води и мекия пясък. Възможност за допълнителни екскурзии или водни спортове. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Свободен ден. Потопете се в подводния свят или изберете романтична вечеря на плажа. Денят е ваш – за пълен релакс или приключения. Нощувка."
      },
      {
        "day": "Ден 6",
        "text": "Свободен ден. Още един ден в рая – идеален за СПА процедури, слънчеви бани и кулинарни изкушения. Нощувка."
      },
      {
        "day": "Ден 7",
        "text": "Свободен ден. Опитайте нещо ново – падълборд, каяк или сафари с джет. Или просто се насладете на спокойствието и природата. Нощувка."
      },
      {
        "day": "Ден 8",
        "text": "Свободен ден. Последен пълен ден за наслада от островния живот. Време за почивка, снимки и събиране на последни незабравими спомени. Нощувка."
      },
      {
        "day": "Ден 9",
        "text": "Мале – Истанбул. След закуска – свободно време и подготовка за трансфер обратно до летището. Полет до Истанбул и престой преди свързващия полет за София."
      },
      {
        "day": "Ден 10",
        "text": "Истанбул – София. Пристигаме обратно на летище София."
      }
    ],
    "hotels": [
      {
        "name": "Ellaidhoo Maldives by Cinnamon 4★",
        "board": "Според хотела",
        "price_bgn": 4448,
        "price_eur": 2274,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1780492126165.jpg"
      },
      {
        "name": "Malahini Kuda Bandos 5★",
        "board": "Според хотела",
        "price_bgn": 4460,
        "price_eur": 2280,
        "image": "https://www.marveltourbg.com/img/OBEKTI/363332171_1780492747166.jpg"
      },
      {
        "name": "Bandos Maldives 4★",
        "board": "Според хотела",
        "price_bgn": 4598,
        "price_eur": 2351,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1757658983140.jpg"
      },
      {
        "name": "Kuredu Island Resort & Spa 4★",
        "board": "Според хотела",
        "price_bgn": 4753,
        "price_eur": 2430,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1757593952139.jpg"
      },
      {
        "name": "Kurumba Maldives 5★",
        "board": "Според хотела",
        "price_bgn": 5535,
        "price_eur": 2830,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1757663262141.jpg"
      },
      {
        "name": "Sheraton Maldives Full Moon Resort & Spa 5★",
        "board": "Според хотела",
        "price_bgn": 5635,
        "price_eur": 2881,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1111_1774605719158.jpg"
      },
      {
        "name": "Sun Siyam Olhuveli Maldives 4★",
        "board": "Според хотела",
        "price_bgn": 7208,
        "price_eur": 3685,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1774614127160.jpg"
      },
      {
        "name": "Varu by Atmosphere 5★",
        "board": "Според хотела",
        "price_bgn": 7395,
        "price_eur": 3781,
        "image": "https://www.marveltourbg.com/img/OBEKTI/1_1757593641138.jpg"
      }
    ],
    "gallery": [
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_1_1757595034980.png",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_2_1757595034980.png",
      "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_3_1757595034980.png"
    ],
    "featured": false
  },
  {
    "id": 143,
    "refNum": "П953",
    "title": "Нова година 2026 в Рованиеми, Лапландия",
    "category": "excursion",
    "tags": [
      "nature",
      "adventure",
      "family",
      "luxury"
    ],
    "destination": "Рованиеми, Финландия",
    "country": "finland",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 4495,
    "price_eur": 2298,
    "dates": [
      "2025-12-28"
    ],
    "next_date": "2025-12-28",
    "transport": "plane",
    "description": "Нова година в Лапландия – директен чартър, Селото на Дядо Коледа, Северно сияние и факулт. сафари със северни елени.",
    "includes": [
      "Директен чартър от София",
      "5 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни активности",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1 – 28.12.2025",
        "text": "София – Рованиеми. Излитане с полет от София за Рованиеми. Кацане в Рованиеми и трансфер до хотелите. Настаняване. Информационна среща в хотелите около 14:00–15:00 часа. Нощувка."
      },
      {
        "day": "Ден 2 – 29.12.2025",
        "text": "Рованиеми. 08:00–09:30 закуска. 10:00–13:00 екскурзия в „Селцето на Дядо Коледа и Санта Парк\" (включена в цената): селото и пощата на Дядо Коледа, среща с истинския Дядо Коледа, прекосяване на Северния полярен кръг със сертификат, пещерата на елфите с „магическо влакче\", елфски танци и дискотека. Трансфер до хотела. Възможност за допълнителна екскурзия – посещение на Arctic Snow Hotel с вечеря. Нощувка."
      },
      {
        "day": "Ден 3 – 30.12.2025",
        "text": "Рованиеми. 08:00–10:00 закуска. 11:00–13:00 допълнителна екскурзия до еленска ферма с 500 м возене в шейна с еленски впряг. 18:30–21:30 допълнителна екскурзия „Ледено плуване под Северното сияние\" (3 ч., безопасно, с непромокаеми костюми, минимална височина 120 см). Опция: сафари с моторна шейна (3 ч.). Нощувка."
      },
      {
        "day": "Ден 4 – 31.12.2025",
        "text": "Рованиеми. 08:00–10:00 закуска. 11:00–16:00 допълнителна екскурзия до арктическия зоопарк Рануа (80 км от Рованиеми) с обяд. 17:00–19:00 празнична Новогодишна вечеря в хотела. 20:00–24:00 посрещане на Нова година 2026 – снежно парти на открито, финландски кулинарни традиции и Северно сияние. Нощувка."
      },
      {
        "day": "Ден 5 – 01.01.2026",
        "text": "Рованиеми. 08:00–10:00 закуска. 12:00–14:30 допълнителна екскурзия „Посещение на ферма за кучета\" – сафари с кучешки впряг в лапландската гора и топли напитки. 17:00–20:00 допълнителна екскурзия „Семейна работилница за еленски рога\" (3–4 ч.) с интерактивна програма, чай и домашни печива в дома на финландско семейство. Нощувка."
      },
      {
        "day": "Ден 6 – 02.01.2026",
        "text": "Рованиеми – София. Закуска. Освобождаване на хотела. Трансфер до летището в Рованиеми и излитане за София. Кацане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "Hotelli Aakenus 3★",
        "board": "Закуска",
        "price_bgn": 4495,
        "price_eur": 2298,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_nova-godina-2026-v-rovaniemi-laplandiya-28122025-020120-1._1753869780953.jpeg"
      }
    ],
    "featured": false
  },
  {
    "id": 147,
    "refNum": "П549",
    "title": "Халкидики – Касандра, почивки на море (автобус)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "family"
    ],
    "destination": "Халкидики – Касандра, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 467,
    "price_eur": 239,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04",
      "2026-07-11"
    ],
    "next_date": "2026-06-13",
    "transport": "bus",
    "description": "Автобусна почивка на полуостров Касандра с богат избор от хотели на брега на Егейско море.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки",
      "Медицинска застраховка",
      "Представител"
    ],
    "excludes": [
      "Туристически такси",
      "Хранене (по хотел)",
      "Факултативни екскурзии"
    ],
    "departures": [
      "София",
      "Пловдив",
      "Пазарджик"
    ],
    "hotels": [
      {
        "name": "Hotel Samel",
        "board": "По избор",
        "price_bgn": 467,
        "price_eur": 239,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_halkidiki-kasandra-pochivki-na-more-dati-vsyaka-sabota--1_1770382550549.jpg"
      },
      {
        "name": "Hotel Olympic Kozma",
        "board": "По избор",
        "price_bgn": 542,
        "price_eur": 277,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_halkidiki-kasandra-pochivki-na-more-dati-vsyaka-sabota--1_1770382550549.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 150,
    "refNum": "П945",
    "title": "Халкидики – Ситония, почивки на море (автобус)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "family"
    ],
    "destination": "Халкидики – Ситония, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 753,
    "price_eur": 385,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04",
      "2026-07-11"
    ],
    "next_date": "2026-06-13",
    "transport": "bus",
    "description": "Плажна почивка на полуостров Ситония с богата история и култура и избор от хотели.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки",
      "Медицинска застраховка",
      "Представител"
    ],
    "excludes": [
      "Туристически такси",
      "Хранене (по хотел)",
      "Факултативни екскурзии"
    ],
    "departures": [
      "София (06:00)",
      "Пловдив",
      "Пазарджик"
    ],
    "hotels": [
      {
        "name": "Olympion Beach",
        "board": "По избор",
        "price_bgn": 753,
        "price_eur": 385,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_halkidiki-sitoniya-pochivki-na-more-dati-vsyaka-sabota--1_1751544544945.jpg"
      },
      {
        "name": "Marthas Haus",
        "board": "По избор",
        "price_bgn": 837,
        "price_eur": 428,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_halkidiki-sitoniya-pochivki-na-more-dati-vsyaka-sabota--1_1751544544945.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 151,
    "refNum": "П938",
    "title": "Почивка на остров Тасос – 5 нощувки (Ntinas Filoxenia 4★)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "nature"
    ],
    "destination": "о-в Тасос, Гърция",
    "country": "greece",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 769,
    "price_eur": 393,
    "dates": [
      "2026-06-09",
      "2026-09-07",
      "2026-09-12",
      "2026-09-17"
    ],
    "next_date": "2026-06-09",
    "transport": "bus",
    "description": "5 нощи на „най-красивия остров в Егейско море\" Тасос, с екскурзия до Кавала.",
    "includes": [
      "Автобусен транспорт",
      "Ферибот",
      "5 нощувки със закуска и вечеря",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (06:30)",
      "Дупница",
      "Благоевград"
    ],
    "hotels": [
      {
        "name": "Ntinas Filoxenia 4★",
        "board": "Закуска и вечеря",
        "price_bgn": 769,
        "price_eur": 393,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-tasos-5-noshtuvki-sas-zakuski-i-vech-1_1750755497938.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 152,
    "refNum": "П556",
    "title": "Почивка в Гърция – остров Корфу (4 нощувки, полет)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "family"
    ],
    "destination": "о-в Корфу, Гърция",
    "country": "greece",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 782,
    "price_eur": 400,
    "dates": [
      "2026-06-12",
      "2026-06-19",
      "2026-09-04",
      "2026-09-11",
      "2026-09-18"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Директен полет до Корфу с плажен релакс и факултативни екскурзии до манастири и острови.",
    "includes": [
      "Полет с летищни такси",
      "4 нощувки със закуска и вечеря",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Potamaki Beach 3★",
        "board": "Закуска и вечеря",
        "price_bgn": 782,
        "price_eur": 400,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-4-noshtuvki-polet-ot-s-1_1682330842556.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 154,
    "refNum": "П455",
    "title": "Остров Крит – Лято 2026 (7 нощувки, самолет)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "family"
    ],
    "destination": "о-в Крит, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 876,
    "price_eur": 448,
    "dates": [
      "2026-06-14",
      "2026-06-21",
      "2026-06-28",
      "2026-07-05",
      "2026-07-12"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "Седмица на Крит – слънце, средиземноморски плажове и факултативни екскурзии до древни дворци.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Happy Days Studios & Apartments",
        "board": "Според хотела",
        "price_bgn": 876,
        "price_eur": 448,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ostrov-krit-lyato-2025-7-noshtuvki-dati-vsyaka-nedelya--1_1744709063455.jpg"
      },
      {
        "name": "Kri Kri Village Holiday Apartments",
        "board": "Според хотела",
        "price_bgn": 952,
        "price_eur": 487,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ostrov-krit-lyato-2025-7-noshtuvki-dati-vsyaka-nedelya--1_1744709063455.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 155,
    "refNum": "П917",
    "title": "Почивка на остров Закинтос – 7 нощувки (с транспорт)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "nature"
    ],
    "destination": "о-в Закинтос, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 992,
    "price_eur": 507,
    "dates": [
      "2026-08-22",
      "2026-08-31"
    ],
    "next_date": "2026-08-22",
    "transport": "bus",
    "description": "Закинтос с включен транспорт – плаж, Сините пещери и наблюдение на морски костенурки в залива Лаганас.",
    "includes": [
      "Автобусен транспорт и феrибот",
      "7 нощувки със закуска",
      "Медицинска застраховка",
      "Водач"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (04:00)",
      "Дупница",
      "Благоевград"
    ],
    "hotels": [
      {
        "name": "Varres 3★",
        "board": "Закуска",
        "price_bgn": 992,
        "price_eur": 507,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-zakintos-7-noshtuvki-s-vklyuchen-tra-1_1747213280917.jpg"
      },
      {
        "name": "Strada Marina 4★",
        "board": "Закуска",
        "price_bgn": 1363,
        "price_eur": 697,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-zakintos-7-noshtuvki-s-vklyuchen-tra-1_1747213280917.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 156,
    "refNum": "П940",
    "title": "Почивка в Гърция – остров Корфу (7 нощувки, полет)",
    "category": "vacation",
    "tags": [
      "lyato-gartsia",
      "beach",
      "family"
    ],
    "destination": "о-в Корфу, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1111,
    "price_eur": 568,
    "dates": [
      "2026-06-12",
      "2026-06-26",
      "2026-07-03",
      "2026-07-10",
      "2026-07-17"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Директен полет до Корфу и 7 нощувки с факултативни екскурзии до културните и природни забележителности.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки със закуска и вечеря",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Potamaki Beach 3★",
        "board": "Закуска и вечеря",
        "price_bgn": 1111,
        "price_eur": 568,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-7-noshtuvki-polet-ot-s-1_1750852554940.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 161,
    "refNum": "П723",
    "title": "Почивка в Тунис (самолет от София, сряда, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Тунис",
    "country": "tunisia",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 716,
    "price_eur": 366,
    "dates": [
      "2026-06-10",
      "2026-06-17",
      "2026-06-24",
      "2026-07-01"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "All Inclusive почивка в Тунис със сряден полет от София и факулт. UNESCO екскурзии.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Residence Mahmoud",
        "board": "All Inclusive",
        "price_bgn": 716,
        "price_eur": 366,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-tunis-sas-samolet-ot-sofiya-v-sryada-7-nosht-1_1744379326723.png"
      },
      {
        "name": "Le Zenith Hotel",
        "board": "All Inclusive",
        "price_bgn": 753,
        "price_eur": 385,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-tunis-sas-samolet-ot-sofiya-v-sryada-7-nosht-1_1744379326723.png"
      }
    ],
    "featured": false
  },
  {
    "id": 165,
    "refNum": "П1142",
    "title": "Ексклузивни отстъпки – Почивка на о-в Джерба, Тунис",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "о-в Джерба, Тунис",
    "country": "tunisia",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 960,
    "price_eur": 491,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-06-27",
      "2026-07-04"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Джерба с ексклузивни отстъпки – чартър от София, плаж и медицинска застраховка.",
    "includes": [
      "Чартърен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Такса гориво",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Dar Jerba Zahra",
        "board": "All Inclusive",
        "price_bgn": 980,
        "price_eur": 501,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ekskluzivni-otstapki-pochivka-na-odzherba-tunis-sas-sam-1_17781411751142.jpg"
      },
      {
        "name": "Les Quatre Saisons",
        "board": "All Inclusive",
        "price_bgn": 991,
        "price_eur": 506,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ekskluzivni-otstapki-pochivka-na-odzherba-tunis-sas-sam-1_17781411751142.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 166,
    "refNum": "П554",
    "title": "Луксозна почивка в Албания",
    "category": "vacation",
    "tags": [
      "beach",
      "luxury",
      "allInclusive"
    ],
    "destination": "Дуръс Ривиера, Албания",
    "country": "albania",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1281,
    "price_eur": 655,
    "dates": [
      "2026-06-14",
      "2026-06-21",
      "2026-06-28",
      "2026-07-05"
    ],
    "next_date": "2026-06-14",
    "transport": "bus",
    "description": "All Inclusive на брега на Дуръс с обиколки на Елбасан, Дуръс и факулт. Круя, Тирана и Берат.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки All Inclusive",
      "Обиколки",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (06:00)"
    ],
    "hotels": [
      {
        "name": "Sunrise Premium 5★ / Grand Blue Fafa 5★",
        "board": "All Inclusive",
        "price_bgn": 1281,
        "price_eur": 655,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_luksozna-pochivka-v-albaniya-2023-1_1682328444554.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 169,
    "refNum": "П1144",
    "title": "Мароко – цветове, аромати и приключения (7 нощувки в Маракеш)",
    "category": "vacation",
    "tags": [
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Маракеш, Мароко",
    "country": "morocco",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1013,
    "price_eur": 518,
    "dates": [
      "2026-06-12",
      "2026-06-19",
      "2026-06-26",
      "2026-07-03"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Маракеш – пъстри медини, градини, водопади и берберска култура с екскурзии.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки със закуска и вечеря",
      "Трансфери",
      "Медицинска застраховка",
      "Водач"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Hotel Gomassine 3★",
        "board": "Закуска и вечеря",
        "price_bgn": 1013,
        "price_eur": 518,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_maroko%E2%80%93tsvetove-aromati-i-priklyucheniya-7-noshtuvk-1_17790848221144.jpg"
      },
      {
        "name": "Zalagh Kasbah Hotel and Spa",
        "board": "Закуска и вечеря",
        "price_bgn": 1367,
        "price_eur": 699,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_maroko%E2%80%93tsvetove-aromati-i-priklyucheniya-7-noshtuvk-1_17790848221144.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 171,
    "refNum": "П1156",
    "title": "Мароко от А до Я (от Фес до Маракеш, хотели 3*/4*)",
    "category": "excursion",
    "tags": [
      "culture",
      "city",
      "adventure"
    ],
    "destination": "Мароко – имперски столици",
    "country": "morocco",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2140,
    "price_eur": 1094,
    "dates": [
      "2026-10-09",
      "2026-10-23"
    ],
    "next_date": "2026-10-09",
    "transport": "plane",
    "description": "Цяло Мароко – имперски градове, пустинни пейзажи и културни забележителности.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки със закуска и вечеря",
      "Трансфери",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "София – Фес. Директен полет от София до Фес. Кацане, посрещане и трансфер (около 30 мин). Настаняване в хотел във Фес. Туристическа програма във Фес – най-старият от четирите имперски града с над 12 века история и медина от 9500 улици (ЮНЕСКО), най-старият религиозен университет и добре запазени занаятчийски квартали. Вечеря. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Фес – Шефшауен. Закуска. Допълнителна екскурзия до Шефшауен – синият град на Мароко, сгушен в склоновете на планинската верига Риф, където всичко наоколо е синьо. Връщане във Фес. Вечеря. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Фес – Мекнес – Рабат – Казабланка (преход 300 км, 4 часа). Закуска. Мекнес (ЮНЕСКО) – портата Баб Мансур и площада Ел Хедим. Рабат – Кулата Хасан, мавзолеят на Мохамед V и Кралския дворец (отвън). Казабланка – Булевард де ла Корниш, джамията Hassan II (при възможност с допълнителен вход), квартала Анфа, площада на Обединените нации и парка Арабска лига. Настаняване. Вечеря. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Казабланка – Маракеш (преход 250 км, 3 часа). Закуска. Тур на Маракеш: джамията Кутубия (отвън) и площад „Джема Ел Фна\" с уличните артисти. Възможност за допълнителна екскурзия: градините Мажорел. Настаняване. Вечеря. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Маракеш – Бен Хаду – Уарзазат (преход 200 км, 4 часа). Закуска. Потегляне към Уарзазат през каньона на река Тичка и Високите Атласи. Спиране в Айт Бен Хаду – берберска укрепена крепост (ЮНЕСКО), снимачна площадка на „Мумията\", „Гладиатор\" и „Принцът на Персия\". Продължаване по „Пътя на хилядата казби\" до Уарзазат – оазис в Атласките планини, известен с килимите „Ouazguita\". Настаняване. Вечеря. Нощувка."
      },
      {
        "day": "Ден 6",
        "text": "Уарзазат – Каньонът Тодра и Тинхир – Мерзуга – Ерфуд (преход около 430 км, 6,5 часа). Закуска. Каньонът на река Тодра край Тинерхир (стени на 10 м една от друга, висок 160 м). Оазисът „Ел Джорф\". Ерфуд – „Портата на пустинята\". По пътя на ралито Париж–Дакар до Мерзуга и дюните Ерг Чеби с берберски племена. Настаняване в пустинята. Нощувка. (Препоръчва се багаж за една вечер; основният багаж остава в автобуса.)"
      },
      {
        "day": "Ден 7",
        "text": "Ерфуд – Маракеш (преход около 420 км, 6,5 часа). Рано сутринта възможност за допълнителна екскурзия – дюните Ерг Чеби с джип. След закуска отпътуване за Маракеш. Привечер настаняване в хотел в Маракеш. Вечеря. Нощувка."
      },
      {
        "day": "Ден 8",
        "text": "Маракеш – София. Закуска. Трансфер до летище Маракеш за полет до България. Кацане на летище София."
      }
    ],
    "hotels": [
      {
        "name": "Royal Mirage 4★ (Фес) + хотели по маршрута",
        "board": "Закуска и вечеря",
        "price_bgn": 2140,
        "price_eur": 1094,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_maroko-ot-a-do-ya-ot-fes-do-marakesh-hoteli-3-4-0910--1_17799617231156.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 175,
    "refNum": "П1059",
    "title": "Почивка в Коста Брава (редовен полет)",
    "category": "vacation",
    "tags": [
      "beach",
      "family"
    ],
    "destination": "Коста Брава, Испания",
    "country": "spain",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1082,
    "price_eur": 553,
    "dates": [
      "2026-06-09",
      "2026-06-13",
      "2026-06-16",
      "2026-06-20"
    ],
    "next_date": "2026-06-09",
    "transport": "plane",
    "description": "Директни полети до Барселона и почивка в Коста Брава със свободно време и факулт. екскурзии.",
    "includes": [
      "Редовен полет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище Т2)"
    ],
    "hotels": [
      {
        "name": "Htop Olympic",
        "board": "Закуска",
        "price_bgn": 1082,
        "price_eur": 553,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kosta-brava-s-redoven-polet-1_17659756291059.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 177,
    "refNum": "П1132",
    "title": "Почивка в Испания – Мурсия, Ла Манга дел Мар Менор",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Ла Манга / Мурсия, Испания",
    "country": "spain",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1211,
    "price_eur": 619,
    "dates": [
      "2026-06-21",
      "2026-06-28",
      "2026-08-23",
      "2026-08-30"
    ],
    "next_date": "2026-06-21",
    "transport": "plane",
    "description": "All Inclusive почивка в Ла Манга с факулт. екскурзии до Картахена, Мурсия, Лорка и Валенсия.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки с хранене",
      "Трансфери",
      "Медицинска застраховка",
      "Обслужване на български"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Cavanna 4★",
        "board": "All Inclusive",
        "price_bgn": 1211,
        "price_eur": 619,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-ispaniya-mursiya-la-manga-del-mar-menor-sas--1_17766749531132.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 178,
    "refNum": "П862",
    "title": "Почивка в Испания – Коста дел Сол (хотел Fuengirola Park 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "family"
    ],
    "destination": "Коста дел Сол, Испания",
    "country": "spain",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1328,
    "price_eur": 679,
    "dates": [
      "2026-06-18",
      "2026-06-25",
      "2026-07-02",
      "2026-08-27"
    ],
    "next_date": "2026-06-18",
    "transport": "plane",
    "description": "Андалусия с полупансион, обзорни обиколки и обслужване на български.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки полупансион",
      "Трансфери",
      "Обиколки",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Fuengirola Park 4★",
        "board": "Полупансион",
        "price_bgn": 1328,
        "price_eur": 679,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-ispaniya-kosta-del-sol-hotel-quot-fuengirola-1_1740053939862.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 180,
    "refNum": "П898",
    "title": "Почивка в Испания – Тенерифе (директни чартъри)",
    "category": "vacation",
    "tags": [
      "beach",
      "nature",
      "family",
      "allInclusive"
    ],
    "destination": "Тенерифе, Испания",
    "country": "spain",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 1484,
    "price_eur": 759,
    "dates": [
      "2026-09-18",
      "2026-09-25",
      "2026-10-02",
      "2026-10-08"
    ],
    "next_date": "2026-09-18",
    "transport": "plane",
    "description": "All Inclusive Тенерифе с директни чартъри и факулт. екскурзии до Тейде и аквапаркове.",
    "includes": [
      "Чартърен полет с летищни такси",
      "6 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Globales Acuario",
        "board": "All Inclusive",
        "price_bgn": 1484,
        "price_eur": 759,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-ispaniya-ostrov-tenerife-direktni-chartari-o-1_1747980507898.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 181,
    "refNum": "П1073",
    "title": "Скритите съкровища на Тенерифе (чартър от София 2026)",
    "category": "vacation",
    "tags": [
      "beach",
      "nature",
      "adventure"
    ],
    "destination": "Тенерифе, Испания",
    "country": "spain",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 1721,
    "price_eur": 880,
    "dates": [
      "2026-10-14",
      "2026-10-21",
      "2026-10-28",
      "2026-11-04"
    ],
    "next_date": "2026-10-14",
    "transport": "plane",
    "description": "Тенерифе с разнообразни пейзажи и факулт. екскурзии до Лоро Парк, Тейде и Ла Лагуна.",
    "includes": [
      "Чартърен полет с летищни такси",
      "6 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Be Live Experience Orotava",
        "board": "Закуска",
        "price_bgn": 1721,
        "price_eur": 880,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_skritite-sakrovishta-na-tenerife-chartaren-polet-ot-sof-1_17679481231073.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 184,
    "refNum": "П1072",
    "title": "Почивка в Тенерифе (Checkin Concordia Playa 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "nature",
      "family"
    ],
    "destination": "Тенерифе, Испания",
    "country": "spain",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 1882,
    "price_eur": 962,
    "dates": [
      "2026-09-18",
      "2026-09-25",
      "2026-10-02",
      "2026-10-08"
    ],
    "next_date": "2026-09-18",
    "transport": "plane",
    "description": "Тенерифе с директни чартъри и факулт. екскурзии до вулканични паркове и аквапаркове.",
    "includes": [
      "Чартърен полет с летищни такси",
      "6 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Alua Tenerife",
        "board": "Закуска",
        "price_bgn": 1880,
        "price_eur": 961,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-ispaniya-ostrov-tenerife-direktni-chartari-o-1_17679480651072.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 185,
    "refNum": "П1070",
    "title": "Почивка в Тенерифе (Alexandre Hotel Gala 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "nature",
      "family"
    ],
    "destination": "Тенерифе, Испания",
    "country": "spain",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 2115,
    "price_eur": 1081,
    "dates": [
      "2026-09-18",
      "2026-09-25",
      "2026-10-02",
      "2026-10-08"
    ],
    "next_date": "2026-09-18",
    "transport": "plane",
    "description": "Тенерифе с чартър София–Тенерифе, багаж и медицинска застраховка.",
    "includes": [
      "Чартърен полет с летищни такси и багаж",
      "6 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Туристически такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Alexandre Hotel Gala 4★",
        "board": "Закуска",
        "price_bgn": 2115,
        "price_eur": 1081,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-ispaniya-ostrov-tenerife-direktni-chartari-o-1_17679479311070.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 187,
    "refNum": "П1074",
    "title": "Рим – Вечният град 2026 (3 нощувки)",
    "category": "excursion",
    "tags": [
      "city",
      "culture"
    ],
    "destination": "Рим, Италия",
    "country": "italy",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1026,
    "price_eur": 525,
    "dates": [
      "2026-06-10",
      "2026-07-08",
      "2026-07-15"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Рим – антични паметници, Ватикана със Сикстинската капела и емблематичните площади.",
    "includes": [
      "Полет с летищни такси",
      "3 нощувки",
      "Трансфери",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "Събиране на летище София. Отпътуване за Рим с директен полет. Кацане на летището и трансфер. Свободно време или екскурзия по желание: обиколен тур на Рим с екскурзовод на български език. Настаняване. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Закуска. Свободно време или екскурзия по желание: сутрин – посещение на град-държава Ватикана (Ватикански музеи със Сикстинската капела и базиликата „Св. Петър\"); следобяд – Римските площади, пешеходна обиколка с екскурзовод на български език. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Закуска. Свободно време или екскурзия по желание: допълнителна екскурзия Колизеум и Римски форуми. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Закуска. Освобождаване на хотела. Трансфер до летището. Полет за София."
      }
    ],
    "hotels": [
      {
        "name": "Raeli Hotel 3★",
        "board": "Закуска",
        "price_bgn": 1026,
        "price_eur": 525,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_rim-vechniyat-grad-2026-3-noshtuvki-polet-ot-sofiya-1_17682000651074.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 188,
    "refNum": "П1123",
    "title": "Приказна почивка в Пулия (с екскурзия до Бари)",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "family"
    ],
    "destination": "Пулия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1038,
    "price_eur": 531,
    "dates": [
      "2026-06-13",
      "2026-06-20",
      "2026-08-29"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Пулия с включена обиколка на Бари и факулт. Алберобело, Матера и Саленто.",
    "includes": [
      "Директен полет до Бари",
      "7 нощувки",
      "Обиколка на Бари",
      "Трансфери"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Akiris Resort Premium",
        "board": "Закуска",
        "price_bgn": 1038,
        "price_eur": 531,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_prikazna-pochivka-v-puliya-s-vklyuchena-ekskurziya-na-b-1_17761767611123.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 190,
    "refNum": "П1108",
    "title": "Почивка във Венеция – магията на Северна Италия",
    "category": "vacation",
    "tags": [
      "culture",
      "city",
      "family"
    ],
    "destination": "Венеция / Северна Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1253,
    "price_eur": 641,
    "dates": [
      "2026-06-10",
      "2026-06-17",
      "2026-06-24"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Северна Италия с целодневна екскурзия до Венеция и факулт. острови, Алпи и винени региони.",
    "includes": [
      "Полет с летищни такси",
      "7 нощувки",
      "Екскурзия до Венеция",
      "Трансфери"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Hotel La Fenice 3★",
        "board": "Закуска",
        "price_bgn": 1208,
        "price_eur": 618,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3017/hotel/9575/gallery/7ATHULQY.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 191,
    "refNum": "П908",
    "title": "Почивка в Италия – Пулия (Grand Hotel dei Cavalieri 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "family"
    ],
    "destination": "Пулия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1348,
    "price_eur": 689,
    "dates": [
      "2026-06-09",
      "2026-06-16",
      "2026-06-23"
    ],
    "next_date": "2026-06-09",
    "transport": "plane",
    "description": "Южна Италия – Пулия, с директни полети, обслужване на български и екскурзии.",
    "includes": [
      "Директен полет до Бари",
      "7 нощувки",
      "Трансфери",
      "Обслужване на български"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Grand Hotel dei Cavalieri 4★",
        "board": "Закуска",
        "price_bgn": 1348,
        "price_eur": 689,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-italiya-puliya-hotel-grand-hotel-dei-cavalie-1_1750318947908.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 192,
    "refNum": "П934",
    "title": "Почивка в Италия – Сицилия (хотел Orizzonte 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "family"
    ],
    "destination": "Сицилия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1348,
    "price_eur": 689,
    "dates": [
      "2026-06-14",
      "2026-06-21",
      "2026-06-28"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "Сицилия с екскурзии до Етна, Таормина, Сиракуза и Палермо.",
    "includes": [
      "Директен полет",
      "7 нощувки със закуска",
      "Трансфери",
      "Обслужване на български"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Orizzonte 4★ (Летояни)",
        "board": "Закуска",
        "price_bgn": 1348,
        "price_eur": 689,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-italiya-sitsiliya-hotel-orizzonte-4-sas-sam-1_1750334948934.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 193,
    "refNum": "П935",
    "title": "Почивка в Италия – Сицилия (хотел Sporting Baia 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "family"
    ],
    "destination": "Сицилия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1348,
    "price_eur": 689,
    "dates": [
      "2026-06-14",
      "2026-06-21",
      "2026-06-28"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "Сицилия с директен полет до Катания и факулт. екскурзии до основните забележителности.",
    "includes": [
      "Директен полет",
      "7 нощувки",
      "Трансфери",
      "Обслужване на български"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Sporting Baia 4★",
        "board": "Закуска",
        "price_bgn": 1348,
        "price_eur": 689,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-italiya-sitsiliya-hotel-sporting-baia-4-sas-1_1750335675935.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 194,
    "refNum": "П1130",
    "title": "Сицилия – Athena Resort Village 4★ Superior",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "allInclusive"
    ],
    "destination": "Сицилия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1352,
    "price_eur": 691,
    "dates": [
      "2026-09-21",
      "2026-09-28",
      "2026-10-05"
    ],
    "next_date": "2026-09-21",
    "transport": "plane",
    "description": "Разкошен плаж в Сицилия и факулт. UNESCO екскурзии – Етна, бароковите градове и кулинарни традиции.",
    "includes": [
      "Директен чартър",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Входни такси",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Athena Resort Village 4★ Superior",
        "board": "All Inclusive",
        "price_bgn": 1352,
        "price_eur": 691,
        "image": "https://store.abax.bg/book.abax.bg/img_tour/3238/hotel/8773/gallery/HE1J7YT6.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 197,
    "refNum": "П1116",
    "title": "Екскурзия в Южна Италия – Амалфи, Позитано, Неапол",
    "category": "excursion",
    "tags": [
      "culture",
      "nature",
      "adventure"
    ],
    "destination": "Амалфийско крайбрежие, Италия",
    "country": "italy",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 1534,
    "price_eur": 784,
    "dates": [
      "2026-09-17",
      "2026-10-13"
    ],
    "next_date": "2026-09-17",
    "transport": "plane",
    "description": "Южна Италия – UNESCO Амалфийско крайбрежие с Помпей, Везувий и Неапол.",
    "includes": [
      "Директен чартър до Салерно",
      "5 нощувки",
      "Трансфери",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "Отпътуване за Южна Италия с директен чартърен полет. Кацане на летището в Салерно. Трансфер до хотела. Настаняване след 14.00 ч. Свободно време за плаж. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Закуска. Свободно време за плаж или туристическа програма по желание: целодневна програма „Везувий и Помпей\". Програмата обединява величествения Везувий и археологическия комплекс на Помпей. Посещението на Везувий включва изкачване до ръба на кратера с панорамни гледки към Неаполитанския залив и разказ за изригването от 79 г. Следва обиколка на Помпей с лицензиран местен екскурзовод: Римският форум, храмове и обществени сгради, частни домове с автентични фрески и мозайки. Връщане в хотела. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Закуска. Свободно време за плаж или туристическа програма по желание: целодневна панорамна обиколка на Амалфийското крайбрежие (ЮНЕСКО). Панорамният маршрут преминава през живописния Позитано (фотопауза), следва пешеходна разходка в историческия център на Амалфи – някогашна морска република, и посещение на Катедралата „Св. Андрей\" с арабо-норманска фасада. Свободно време за обяд и индивидуални разходки. Връщане в хотела. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Закуска. Свободно време за плаж или туристическа програма по желание: целодневна програма до Неапол. Пешеходна разходка от Кастел Нуово (Анжуйския замък), легендарния Театро Сан Карло, монументалния Площад Плебишито с Кралския дворец и базиликата Сан Франческо ди Паола, оживената Виа Толедо и Галерия Умберто I. Следобед – свободно време. Връщане в хотела. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Закуска. Свободно време за плаж или туристическа програма по желание. Нощувка."
      },
      {
        "day": "Ден 6",
        "text": "Закуска. Освобождаване на стаите до 11.00 ч. Свободно време. Трансфер до летището в Салерно за полет до София."
      }
    ],
    "hotels": [
      {
        "name": "Olimpia Cilento Resort & Spa",
        "board": "Закуска",
        "price_bgn": 1534,
        "price_eur": 784,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ekskurziya-v-yuzhna-italiya-amalfi-pozitano-neapol-sas--1_17749436011116.png"
      }
    ],
    "featured": false
  },
  {
    "id": 199,
    "refNum": "П1124",
    "title": "Загадъчна Сицилия + бонус 3 екскурзии (Athena Resort 4★)",
    "category": "vacation",
    "tags": [
      "beach",
      "culture",
      "adventure"
    ],
    "destination": "Сицилия, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1801,
    "price_eur": 921,
    "dates": [
      "2026-06-15",
      "2026-06-22",
      "2026-06-29"
    ],
    "next_date": "2026-06-15",
    "transport": "plane",
    "description": "Сицилия с 3 включени екскурзии – барокови градове и археологически обекти.",
    "includes": [
      "Директен чартър",
      "7 нощувки All Inclusive",
      "3 екскурзии",
      "Трансфери"
    ],
    "excludes": [
      "Входни такси",
      "Лични разходи",
      "Туристически такси"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Athena Resort Village 4★ Superior",
        "board": "All Inclusive",
        "price_bgn": 1801,
        "price_eur": 921,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_zagadachna-sitsiliya--bonus-3-ekskurzii-athena-resort-v-1_17762422401124.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 201,
    "refNum": "П1105",
    "title": "Перлите на Пулия и Кампания (полет от Варна до Бари)",
    "category": "excursion",
    "tags": [
      "culture",
      "beach",
      "adventure"
    ],
    "destination": "Пулия / Кампания, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1897,
    "price_eur": 970,
    "dates": [
      "2026-10-12",
      "2026-10-26"
    ],
    "next_date": "2026-10-12",
    "transport": "plane",
    "description": "Пулия и Кампания – обиколка на исторически обекти и крайбрежни градове, полет от Варна.",
    "includes": [
      "Полет Варна–Бари",
      "7 нощувки",
      "Екскурзии",
      "Трансфери"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Варна (Летище)"
    ],
    "program": [
      {
        "day": "Ден 1",
        "text": "Събиране на летище за директен полет Варна – Бари с авиокомпания Bulgaria Air. Трансфер до историческата част на Бари – столицата на област Пулия. Туристическа обиколка. Свободно време. Отпътуване към хотела (трансфер около 1 час и 30 минути). Настаняване. Информационна среща. Вечеря. Нощувка."
      },
      {
        "day": "Ден 2",
        "text": "Закуска. Целодневна екскурзия до Алберобело и Локоротондо (включена в цената). Връщане в хотела. Вечеря. Нощувка."
      },
      {
        "day": "Ден 3",
        "text": "Закуска. Целодневна екскурзия до Лече и Отранто (включена в цената). Връщане в хотела. Вечеря. Нощувка."
      },
      {
        "day": "Ден 4",
        "text": "Закуска. Екскурзия до Матера (включена в цената). Връщане в хотела. Свободно време. Вечеря. Нощувка."
      },
      {
        "day": "Ден 5",
        "text": "Закуска. Напускане на хотела. Трансфер до Бая Домиция. Туристическа обиколка на Неапол. Настаняване в избрания хотел. Вечеря. Нощувка."
      },
      {
        "day": "Ден 6",
        "text": "Закуска. Целодневна екскурзия до Позитано и Амалфи (включена в цената). Връщане в хотела. Вечеря. Нощувка."
      },
      {
        "day": "Ден 7",
        "text": "Закуска. Целодневна екскурзия до Помпей (включена в цената). Връщане в хотела. Вечеря. Нощувка."
      },
      {
        "day": "Ден 8",
        "text": "Закуска. Напускане на хотела. Трансфер до летището за полет Неапол – Варна с авиокомпания Bulgaria Air (трансфер около 1 час и 30 минути)."
      }
    ],
    "hotels": [
      {
        "name": "Akiris Resort 4★",
        "board": "Закуска",
        "price_bgn": 1897,
        "price_eur": 970,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_perlite-na-puliya-i-kampaniya-polet-ot-varna-do-bari-bu-1_17724507231105.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 206,
    "refNum": "П726",
    "title": "Почивка в Алания (автобус от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "9 дни / 7 нощувки",
    "days": 9,
    "nights": 7,
    "price_bgn": 473,
    "price_eur": 242,
    "dates": [
      "2026-08-21"
    ],
    "next_date": "2026-08-21",
    "transport": "bus",
    "description": "Автобусна почивка в Алания на турската ривиера с избор от хотели.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки",
      "Медицинска застраховка",
      "Представител"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София",
      "Пловдив",
      "Пазарджик"
    ],
    "hotels": [
      {
        "name": "Bieno Club SVS",
        "board": "All Inclusive",
        "price_bgn": 473,
        "price_eur": 242,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-s-avtobus-ot-sofiya-7-nosht-1_1755259808726.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 207,
    "refNum": "П1057",
    "title": "Почивка в Кушадасъ (автобус от София, 12 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "family"
    ],
    "destination": "Кушадасъ, Турция",
    "country": "turkey",
    "duration": "14 дни / 12 нощувки",
    "days": 14,
    "nights": 12,
    "price_bgn": 487,
    "price_eur": 249,
    "dates": [
      "2026-06-09"
    ],
    "next_date": "2026-06-09",
    "transport": "bus",
    "description": "Дълга почивка в Кушадасъ – 12 нощувки с автобусен транспорт.",
    "includes": [
      "Автобусен транспорт",
      "12 нощувки",
      "Медицинска застраховка",
      "Представител"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Soleil Hotel",
        "board": "По избор",
        "price_bgn": 487,
        "price_eur": 249,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kushadasa-turtsiya-s-avtobus-ot-sofiya-12-no-1_17659663271057.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 208,
    "refNum": "П1090",
    "title": "Почивка в Кушадасъ 2026 (самолет от София до Измир)",
    "category": "vacation",
    "tags": [
      "beach",
      "family"
    ],
    "destination": "Кушадасъ, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 573,
    "price_eur": 293,
    "dates": [
      "2026-06-10"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Кушадасъ със самолетна програма (полет до Измир) и 7 нощувки.",
    "includes": [
      "Чартърен полет до Измир",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Melike Hotel 2★",
        "board": "По избор",
        "price_bgn": 573,
        "price_eur": 293,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kushadasa-2026-samoletna-programa-sas-7-nosh-1_17719432101090.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 209,
    "refNum": "П936",
    "title": "Почивка в Кемер 2025 (самолет от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Кемер, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 583,
    "price_eur": 298,
    "dates": [
      "2026-06-09"
    ],
    "next_date": "2026-06-09",
    "transport": "plane",
    "description": "Кемер със самолетна програма и 7 нощувки в избран хотел.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Ares Blue Hotel 3★",
        "board": "All Inclusive",
        "price_bgn": 583,
        "price_eur": 298,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kemer-2025-samoletna-programa-sas-7-noshtuvk-1_1750406625936.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 210,
    "refNum": "П758",
    "title": "Почивка в Дидим (автобус от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "family"
    ],
    "destination": "Дидим, Турция",
    "country": "turkey",
    "duration": "9 дни / 7 нощувки",
    "days": 9,
    "nights": 7,
    "price_bgn": 626,
    "price_eur": 320,
    "dates": [
      "2026-06-09"
    ],
    "next_date": "2026-06-09",
    "transport": "bus",
    "description": "Дидим с автобусен транспорт и 7 нощувки на егейския бряг.",
    "includes": [
      "Автобусен транспорт",
      "7 нощувки",
      "Медицинска застраховка",
      "Представител"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София",
      "Пловдив",
      "Пазарджик"
    ],
    "hotels": [
      {
        "name": "Garden of Sun",
        "board": "All Inclusive",
        "price_bgn": 626,
        "price_eur": 320,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-didim-turtsiya-s-avtobus-ot-sofiya-7-noshtuv-1_1710845771758.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 211,
    "refNum": "П1120",
    "title": "Почивка в Кушадасъ (самолет от София до Измир, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "family"
    ],
    "destination": "Кушадасъ, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 635,
    "price_eur": 325,
    "dates": [
      "2026-06-10"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Кушадасъ с чартър до Измир и 7 нощувки в избран хотел.",
    "includes": [
      "Чартър до Измир",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Soleil Hotel",
        "board": "По избор",
        "price_bgn": 635,
        "price_eur": 325,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kushadasa-turtsiya-sas-samolet-ot-sofiya-do--1_17755571821120.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 213,
    "refNum": "П763",
    "title": "Почивка в Алания (полет от Пловдив до Анталия)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 720,
    "price_eur": 368,
    "dates": [
      "2026-06-11"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "Алания с директен чартър от Пловдив до Анталия и 7 нощувки.",
    "includes": [
      "Чартър от Пловдив",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Green Life Hotel",
        "board": "All Inclusive",
        "price_bgn": 720,
        "price_eur": 368,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-s-polet-ot-plovdiv-do-antal-1_1711563824763.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 214,
    "refNum": "П733",
    "title": "Почивка в Алания (самолет от Пловдив, петък, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 787,
    "price_eur": 403,
    "dates": [
      "2026-06-12"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Петъчен чартър от Пловдив за Алания и 7 нощувки в избран хотел.",
    "includes": [
      "Чартър от Пловдив",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Bieno Club SVS",
        "board": "All Inclusive",
        "price_bgn": 787,
        "price_eur": 403,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-sas-samolet-ot-plovdiv-v-pe-1_1756794499733.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 215,
    "refNum": "П1088",
    "title": "Почивка в Кушадасъ (полет от София до Бодрум)",
    "category": "vacation",
    "tags": [
      "beach",
      "family"
    ],
    "destination": "Кушадасъ, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 726,
    "price_eur": 371,
    "dates": [
      "2026-06-13"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Кушадасъ с чартър до Бодрум и 7 нощувки в избран хотел.",
    "includes": [
      "Чартър до Бодрум",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Tuntas Family Suites Kusadasi",
        "board": "По избор",
        "price_bgn": 726,
        "price_eur": 371,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kushadasa-turtsiya-s-polet-ot-sofiya-do-bodr-1_17719348781088.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 216,
    "refNum": "П1117",
    "title": "Почивка в Алания (самолет от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 730,
    "price_eur": 373,
    "dates": [
      "2026-06-10"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Алания с чартър от София (Corendon/Bulgaria Air) и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Bieno Club SVS",
        "board": "All Inclusive",
        "price_bgn": 730,
        "price_eur": 373,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-sas-samolet-ot-sofiya-7-nos-1_17750421111117.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 217,
    "refNum": "П552",
    "title": "Почивка в Бодрум (самолет от София, събота, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Бодрум, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 743,
    "price_eur": 380,
    "dates": [
      "2026-06-13"
    ],
    "next_date": "2026-06-13",
    "transport": "plane",
    "description": "Бодрум със съботна самолетна програма и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Bodrum Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 743,
        "price_eur": 380,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-bodrum-turtsiya-sas-samolet-ot-sofiya-v-sabo-1_1753684167552.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 218,
    "refNum": "П988",
    "title": "Почивка в Алания (самолет от София, неделя, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 790,
    "price_eur": 404,
    "dates": [
      "2026-06-14"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "Алания с неделна самолетна програма и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Bieno Club SVS",
        "board": "All Inclusive",
        "price_bgn": 741,
        "price_eur": 379,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-sas-samolet-ot-sofiya-v-ned-1_1776855433988.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 219,
    "refNum": "П1056",
    "title": "Почивка в Кемер (самолет от София, петък, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Кемер, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 794,
    "price_eur": 406,
    "dates": [
      "2026-06-12"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Кемер с петъчен чартър от София и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Kaftans City Hotel",
        "board": "All Inclusive",
        "price_bgn": 794,
        "price_eur": 406,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-kemer-turtsiya-sas-samolet-ot-sofiya-v-petak-1_17659660801056.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 220,
    "refNum": "П1055",
    "title": "Почивка в Сиде (самолет от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Сиде, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 825,
    "price_eur": 422,
    "dates": [
      "2026-06-10"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Сиде с чартър от София до Анталия и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Orfeus Queen Hotel Side",
        "board": "All Inclusive",
        "price_bgn": 813,
        "price_eur": 416,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-side-turtsiya-sas-samolet-ot-sofiya-7-noshtu-1_17659660101055.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 221,
    "refNum": "П1134",
    "title": "Почивка в Сиде (самолет от София, неделя, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Сиде, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 825,
    "price_eur": 422,
    "dates": [
      "2026-06-14"
    ],
    "next_date": "2026-06-14",
    "transport": "plane",
    "description": "Сиде с неделна самолетна програма и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Clover Magic Park Side",
        "board": "All Inclusive",
        "price_bgn": 819,
        "price_eur": 420,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-side-turtsiya-sas-samolet-ot-sofiya-v-nedely-1_17768558281134.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 222,
    "refNum": "П922",
    "title": "Почивка в Бодрум (самолет от София, четвъртък, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Бодрум, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 836,
    "price_eur": 428,
    "dates": [
      "2026-09-03"
    ],
    "next_date": "2026-09-03",
    "transport": "plane",
    "description": "Бодрум с четвъртъчна самолетна програма и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Bodrum Beach Resort",
        "board": "All Inclusive",
        "price_bgn": 836,
        "price_eur": 428,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-bodrum-turtsiya-sas-samolet-ot-sofiya-v-chet-1_1748506651922.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 224,
    "refNum": "П926",
    "title": "Почивка в Алания (самолет от София, 5 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "family"
    ],
    "destination": "Алания, Турция",
    "country": "turkey",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 930,
    "price_eur": 475,
    "dates": [
      "2026-06-12"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Кратка почивка в Алания с чартър от София и 5 нощувки.",
    "includes": [
      "Чартърен полет",
      "5 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Bieno Club SVS",
        "board": "All Inclusive",
        "price_bgn": 895,
        "price_eur": 457,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-sas-samolet-ot-sofiya-5-nos-1_1748946384926.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 225,
    "refNum": "П925",
    "title": "Почивка в Анталия (полет от София)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "luxury"
    ],
    "destination": "Анталия, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1011,
    "price_eur": 517,
    "dates": [
      "2026-06-11"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "Анталия с директен чартър от София и 7 нощувки.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Ramada Resort Lara",
        "board": "All Inclusive",
        "price_bgn": 1011,
        "price_eur": 517,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-antaliya-turtsiya-s-polet-ot-sofiya-1_1748936849925.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 226,
    "refNum": "П735",
    "title": "Почивка в Белек (самолет от Пловдив, петък)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "luxury"
    ],
    "destination": "Белек, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1031,
    "price_eur": 527,
    "dates": [
      "2026-06-12"
    ],
    "next_date": "2026-06-12",
    "transport": "plane",
    "description": "Луксозният Белек с петъчен чартър от Пловдив и 7 нощувки.",
    "includes": [
      "Чартър от Пловдив",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Armas Life Belek",
        "board": "All Inclusive",
        "price_bgn": 1031,
        "price_eur": 527,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-belek-turtsiya-sas-samolet-ot-plovdiv-v-peta-1_1706031288735.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 227,
    "refNum": "П943",
    "title": "Почивка в Белек (самолет от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "luxury"
    ],
    "destination": "Белек, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1105,
    "price_eur": 565,
    "dates": [
      "2026-06-10"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Белек с чартър от София и 7 нощувки в луксозни хотели.",
    "includes": [
      "Чартърен полет",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Sensitive Premium Resort & Spa",
        "board": "All Inclusive",
        "price_bgn": 1105,
        "price_eur": 565,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-belek-turtsiya-sas-samolet-ot-sofiya-7-nosht-1_1751350384943.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 228,
    "refNum": "П1121",
    "title": "Почивка в Чешме (самолет от София, 7 нощувки)",
    "category": "vacation",
    "tags": [
      "beach",
      "luxury",
      "family"
    ],
    "destination": "Чешме, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1120,
    "price_eur": 573,
    "dates": [
      "2026-06-10"
    ],
    "next_date": "2026-06-10",
    "transport": "plane",
    "description": "Чешме на егейския бряг с чартър до Измир и 7 нощувки.",
    "includes": [
      "Чартър до Измир",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Design Plus Seya Beach",
        "board": "По избор",
        "price_bgn": 1120,
        "price_eur": 573,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-cheshme-turtsiya-sas-samolet-ot-sofiya-7-nos-1_17755578851121.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 230,
    "refNum": "П829",
    "title": "Почивка в Анталия (полет от Пловдив)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "luxury"
    ],
    "destination": "Анталия, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1361,
    "price_eur": 696,
    "dates": [
      "2026-06-11"
    ],
    "next_date": "2026-06-11",
    "transport": "plane",
    "description": "Анталия с директен чартър от Пловдив и 7 нощувки.",
    "includes": [
      "Чартър от Пловдив",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Пловдив (Летище)"
    ],
    "hotels": [
      {
        "name": "Sea Life Family Resort Hotel",
        "board": "All Inclusive",
        "price_bgn": 1361,
        "price_eur": 696,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-antaliya-turtsiya-s-polet-ot-plovdiv-1_1732273168829.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 231,
    "refNum": "П924",
    "title": "Почивка в Анталия (полет от Бургас)",
    "category": "vacation",
    "tags": [
      "beach",
      "allInclusive",
      "luxury"
    ],
    "destination": "Анталия, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1443,
    "price_eur": 738,
    "dates": [
      "2026-09-03"
    ],
    "next_date": "2026-09-03",
    "transport": "plane",
    "description": "Анталия с директен чартър от Бургас и 7 нощувки.",
    "includes": [
      "Чартър от Бургас",
      "7 нощувки",
      "Трансфери",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Туристически такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Бургас (Летище)"
    ],
    "hotels": [
      {
        "name": "Ramada Resort Lara",
        "board": "All Inclusive",
        "price_bgn": 1443,
        "price_eur": 738,
        "image": "https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-antaliya-turtsiya-s-polet-ot-burgas-1_1748845016924.jpg"
      }
    ],
    "featured": false
  },
  {
    "id": 235,
    "refNum": "Е235",
    "title": "Екскурзия в Италия – Бари, Пулия (3 нощувки в хотел 3★)",
    "category": "excursion",
    "tags": [
      "culture",
      "beach"
    ],
    "destination": "Бари (Пулия), Италия",
    "country": "italy",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 702,
    "price_eur": 359,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Бари и областта Пулия – самолетна програма на български език с 3 нощувки в хотел 3★.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки със закуска",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 702,
        "price_eur": 359,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-italiya-bari-puliya-3-noshtuvki-v-hotel-3-1_1776329046235.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1558271736-cd043ef2e855?w=1200&q=80",
    "featured": false
  },
  {
    "id": 239,
    "refNum": "Е688",
    "title": "Екскурзия в Италия – Перуджа, Умбрия (4 нощувки в хотел 3★)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Перуджа (Умбрия), Италия",
    "country": "italy",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 927,
    "price_eur": 474,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Перуджа и зелената Умбрия – средновековни градчета, Асизи и кулинарни традиции.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки със закуска",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 927,
        "price_eur": 474,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-italiya-perudzha-umbriya-4-noshtuvki-v-hot-1_1774272926688.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1533676802871-eca1ae998cd8?w=1200&q=80",
    "featured": false
  },
  {
    "id": 242,
    "refNum": "Е593",
    "title": "Самолетна екскурзия до Рим (3 нощувки, панорамна обиколка с екскурзовод)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Рим, Италия",
    "country": "italy",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1027,
    "price_eur": 525,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Рим с включена панорамна обиколка на града с екскурзовод на български език.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки със закуска",
      "Панорамна обиколка",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1027,
        "price_eur": 525,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_samoletna-ekskurziya-do-rim-s-tri-noshtuvki-s-vklyuchen-1_1765962617593.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    "featured": false
  },
  {
    "id": 244,
    "refNum": "Е559",
    "title": "Милано и италианските езера",
    "category": "excursion",
    "tags": [
      "culture",
      "nature"
    ],
    "destination": "Милано / Езерата, Италия",
    "country": "italy",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1037,
    "price_eur": 530,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Милано и приказните италиански езера Комо и Маджоре.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки със закуска",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1037,
        "price_eur": 530,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_milano-i-italianski-ezera-1_1762770475559.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=1200&q=80",
    "featured": false
  },
  {
    "id": 245,
    "refNum": "Е560",
    "title": "Милано и италианските езера (втора програма)",
    "category": "excursion",
    "tags": [
      "culture",
      "nature"
    ],
    "destination": "Милано / Езерата, Италия",
    "country": "italy",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1037,
    "price_eur": 530,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Милано и италианските езера – алтернативна дата на популярната програма.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки със закуска",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1037,
        "price_eur": 530,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_milano-i-italianski-ezera-1_1762770487560.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1520440229-6469a149ac59?w=1200&q=80",
    "featured": false
  },
  {
    "id": 249,
    "refNum": "Е173",
    "title": "Амалфийска ривиера – Амалфи и крайбрежие",
    "category": "excursion",
    "tags": [
      "culture",
      "beach"
    ],
    "destination": "Амалфийско крайбрежие, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1208,
    "price_eur": 618,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Амалфийското крайбрежие (ЮНЕСКО) – Позитано, Амалфи, Соренто и Капри.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1208,
        "price_eur": 618,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_amalfiyska-riviera-1_1774943742173.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1200&q=80",
    "featured": false
  },
  {
    "id": 251,
    "refNum": "Е676",
    "title": "Екскурзия в Италия – Рим, магията на Империята (4 нощувки, втора програма)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Рим, Италия",
    "country": "italy",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 1211,
    "price_eur": 619,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Рим за 4 нощувки – алтернативна дата на популярната програма.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки със закуска",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1211,
        "price_eur": 619,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-italiya-rim-magiyata-na-imperiyata-4-nosht-1_1772450989676.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&q=80",
    "featured": false
  },
  {
    "id": 252,
    "refNum": "Е196",
    "title": "Лазурен бряг и Италианска ривиера",
    "category": "excursion",
    "tags": [
      "culture",
      "beach"
    ],
    "destination": "Италианска ривиера / Лазурен бряг",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1299,
    "price_eur": 664,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Лазурният бряг и Италианската ривиера – Ница, Монако, Сан Ремо и Портофино.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1299,
        "price_eur": 664,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_lazuren-bryag-i-italianska-riviera-1_1779787441196.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=1200&q=80",
    "featured": false
  },
  {
    "id": 255,
    "refNum": "Е197",
    "title": "Тоскана – романтична въздишка",
    "category": "excursion",
    "tags": [
      "culture",
      "nature"
    ],
    "destination": "Тоскана, Италия",
    "country": "italy",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1399,
    "price_eur": 715,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Романтична Тоскана – Флоренция, Сиена, Пиза и винените хълмове на Кианти.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1399,
        "price_eur": 715,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_toskana-%E2%80%93-romantichna-vazdishka-1_1774442606197.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1200&q=80",
    "featured": false
  },
  {
    "id": 265,
    "refNum": "Е704",
    "title": "Почивка на остров Тасос",
    "category": "excursion",
    "tags": [
      "beach",
      "nature"
    ],
    "destination": "о-в Тасос, Гърция",
    "country": "greece",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 429,
    "price_eur": 219,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Зеленият остров Тасос – близо до България, с борови гори и кристални плажове.",
    "includes": [
      "Автобусен транспорт и ферибот",
      "3 нощувки",
      "Медицинска застраховка",
      "Водач"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 429,
        "price_eur": 219,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-na-ostrov-tasos-1_1776245412704.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1503152394-c571994fd383?w=1200&q=80",
    "featured": false
  },
  {
    "id": 267,
    "refNum": "Е638",
    "title": "Корфу – островът на нимфите (Potamaki Beach)",
    "category": "excursion",
    "tags": [
      "beach",
      "nature"
    ],
    "destination": "о-в Корфу, Гърция",
    "country": "greece",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 548,
    "price_eur": 280,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Корфу – най-зеленият йонийски остров, с венецианско наследство и прекрасни плажове.",
    "includes": [
      "Автобусен транспорт и ферибот",
      "4 нощувки",
      "Медицинска застраховка",
      "Водач"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 548,
        "price_eur": 280,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_korfu-ostrovat-na-nimfite-hotel-quot-potamaki-beachquot-1_1765982767638.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1503152394-c571994fd383?w=1200&q=80",
    "featured": false
  },
  {
    "id": 268,
    "refNum": "Е252",
    "title": "Почивка на остров Закинтос – перлата на Йонийските острови",
    "category": "excursion",
    "tags": [
      "beach",
      "nature"
    ],
    "destination": "о-в Закинтос, Гърция",
    "country": "greece",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1021,
    "price_eur": 522,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Закинтос с прочутия Навагио, Сините пещери и възможност за посещение на Кефалония.",
    "includes": [
      "Автобусен транспорт и ферибот",
      "7 нощувки",
      "Медицинска застраховка",
      "Водач"
    ],
    "excludes": [
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1021,
        "price_eur": 522,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_pochivka-na-ostrov-zakintos-perlata-na-yoniyskite-ostro-1_1680090755252.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1503152394-c571994fd383?w=1200&q=80",
    "featured": false
  },
  {
    "id": 269,
    "refNum": "Е737",
    "title": "Ница – „Le beau voyage\" (самолет, на български)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Ница, Франция",
    "country": "france",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1054,
    "price_eur": 539,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Ница – столицата на Лазурния бряг, с Английския булевард и стария град.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1054,
        "price_eur": 539,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_nitsa-quot-le-beau-voyagequot-sas-samolet-i-obsluzhvane-1_1779787761737.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=1200&q=80",
    "featured": false
  },
  {
    "id": 272,
    "refNum": "Е412",
    "title": "Париж – градът на светлината",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Париж, Франция",
    "country": "france",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 1367,
    "price_eur": 699,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Париж – Айфеловата кула, Лувъра, Монмартър и Шанз-Елизе.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1367,
        "price_eur": 699,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_parizh-gradat-na-svetlinata-1_1741095440412.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80",
    "featured": false
  },
  {
    "id": 279,
    "refNum": "Е501",
    "title": "Европейските столици – Будапеща, Братислава, Прага и Виена",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Прага / Виена / Будапеща",
    "country": "austria",
    "duration": "7 дни / 4 нощувки",
    "days": 7,
    "nights": 4,
    "price_bgn": 695,
    "price_eur": 355,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Голяма обиколка на четирите централноевропейски столици.",
    "includes": [
      "Автобусен транспорт",
      "4 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 695,
        "price_eur": 355,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_evropeyskite-stolitsi-budapeshta-bratislava-praga-i-vie-1_1752653303501.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 287,
    "refNum": "Е396",
    "title": "Страната на баските (самолет, на български)",
    "category": "excursion",
    "tags": [
      "culture",
      "nature"
    ],
    "destination": "Страната на баските, Испания",
    "country": "spain",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2498,
    "price_eur": 1277,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Билбао с музея Гугенхайм, Сан Себастиан и зелената баска природа.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2498,
        "price_eur": 1277,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_stranata-na-baskite-sas-samolet-na-balgarski-ezik-gara-1_1737985341396.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80",
    "featured": false
  },
  {
    "id": 295,
    "refNum": "Е437",
    "title": "Истанбул и Кападокия – запомнящо преживяване",
    "category": "excursion",
    "tags": [
      "culture",
      "nature"
    ],
    "destination": "Истанбул / Кападокия, Турция",
    "country": "turkey",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 639,
    "price_eur": 327,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Истанбул и приказната Кападокия с балоните над скалните образувания.",
    "includes": [
      "Транспорт по програма",
      "7 нощувки",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Балонно изживяване",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 639,
        "price_eur": 327,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_istanbul-i-kapadokiya-%E2%80%93-zapomnyashto-prezhivyavane-1_1743425519437.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    "featured": false
  },
  {
    "id": 298,
    "refNum": "Е689",
    "title": "Кападокия – Бурса – Ескишехир – Анкара",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Кападокия / Анкара, Турция",
    "country": "turkey",
    "duration": "7 дни / 5 нощувки",
    "days": 7,
    "nights": 5,
    "price_bgn": 892,
    "price_eur": 456,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Голяма обиколка на Анадола – Кападокия, Бурса, Ескишехир и столицата Анкара.",
    "includes": [
      "Транспорт по програма",
      "5 нощувки",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 892,
        "price_eur": 456,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_kapadokiya-bursa-eskishehir-ankara-1_1774280192689.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    "featured": false
  },
  {
    "id": 304,
    "refNum": "Е717",
    "title": "Лисабон и остров Мадейра",
    "category": "excursion",
    "tags": [
      "culture",
      "nature"
    ],
    "destination": "Лисабон / Мадейра, Португалия",
    "country": "portugal",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 3680,
    "price_eur": 1882,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Комбинация от столицата Лисабон и цветния остров Мадейра.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 3680,
        "price_eur": 1882,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_lisabon-i-o-v-madeyra-1_1777539679717.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1200&q=80",
    "featured": false
  },
  {
    "id": 305,
    "refNum": "Е736",
    "title": "Дъхът на Краков",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Краков, Полша",
    "country": "poland",
    "duration": "3 дни / 2 нощувки",
    "days": 3,
    "nights": 2,
    "price_bgn": 780,
    "price_eur": 399,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Краков – Вавел, Старият град и солните мини Величка наблизо.",
    "includes": [
      "Самолетен билет с летищни такси",
      "2 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 780,
        "price_eur": 399,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-polsha-krakov-na-edin-dah-1_1779782222736.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 306,
    "refNum": "Е735",
    "title": "Магичният свят на Вроцлав и Краков",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Вроцлав / Краков, Полша",
    "country": "poland",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 1046,
    "price_eur": 535,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Вроцлав – градът на 100-те моста, и кралският Краков.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1046,
        "price_eur": 535,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-polsha-valshebniyat-svyat-na-vrotslav-i-kr-1_1779782120735.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 307,
    "refNum": "Е734",
    "title": "Най-доброто от Полша",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Полша",
    "country": "poland",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1797,
    "price_eur": 919,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Голяма обиколка на Полша – Варшава, Краков, Вроцлав и Гданск.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1797,
        "price_eur": 919,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-quot-nay-dobroto-ot-polshaquot-vrotslav-pozn-1_1779782051734.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 308,
    "refNum": "Е692",
    "title": "Екскурзия в Унгария – Будапеща (специална ваканционна програма)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Будапеща, Унгария",
    "country": "hungary",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 761,
    "price_eur": 389,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Будапеща – перлата на Дунав, с Парламента, Рибарския бастион и термалните бани.",
    "includes": [
      "Автобусен транспорт",
      "3 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 761,
        "price_eur": 389,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-ungariya-budapeshta-spetsialna-vakantsionn-1_1775032504692.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 309,
    "refNum": "Е247",
    "title": "Плитвички езера, Постойна яма, езерото Блед – магията на Балканите",
    "category": "excursion",
    "tags": [
      "nature",
      "culture"
    ],
    "destination": "Плитвице / Блед, Хърватия",
    "country": "croatia",
    "duration": "5 дни / 3 нощувки",
    "days": 5,
    "nights": 3,
    "price_bgn": 673,
    "price_eur": 344,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Природни чудеса – Плитвичките езера, пещерата Постойна и приказното езеро Блед.",
    "includes": [
      "Автобусен транспорт",
      "3 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 673,
        "price_eur": 344,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_plitvichki-ezera-postoyna-yama-ezeroto-bled-magiyata-na-1_1744372949247.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&q=80",
    "featured": false
  },
  {
    "id": 310,
    "refNum": "Е455",
    "title": "Легенди от Румъния – Букурещ, Синая, Бран и Брашов",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Букурещ / Брашов, Румъния",
    "country": "romania",
    "duration": "3 дни / 2 нощувки",
    "days": 3,
    "nights": 2,
    "price_bgn": 321,
    "price_eur": 164,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Трансилвания – замъкът на Дракула в Бран, кралският дворец Пелеш в Синая и Брашов.",
    "includes": [
      "Автобусен транспорт",
      "2 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 321,
        "price_eur": 164,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_legendi-ot-rumaniya-%E2%9C%94%EF%B8%8F-bukuresht-sinaya-bran-i-bras-1_1746707486455.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 311,
    "refNum": "Е456",
    "title": "Легенди от Румъния – Букурещ, Синая, Бран и Брашов (втора програма)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Букурещ / Брашов, Румъния",
    "country": "romania",
    "duration": "3 дни / 2 нощувки",
    "days": 3,
    "nights": 2,
    "price_bgn": 321,
    "price_eur": 164,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Трансилвания – Бран, Пелеш и Брашов, алтернативна дата на популярната програма.",
    "includes": [
      "Автобусен транспорт",
      "2 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 321,
        "price_eur": 164,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_legendi-ot-rumaniya-%E2%9C%94%EF%B8%8F-bukuresht-sinaya-bran-i-bras-1_1746707758456.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 313,
    "refNum": "Е531",
    "title": "Солна мина Униреа – Букурещ – СПА Терме",
    "category": "excursion",
    "tags": [
      "nature",
      "culture"
    ],
    "destination": "Букурещ, Румъния",
    "country": "romania",
    "duration": "3 дни / 2 нощувки",
    "days": 3,
    "nights": 2,
    "price_bgn": 342,
    "price_eur": 175,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Соленaта мина Униреа, Букурещ и релакс в аквапарка Therme край столицата.",
    "includes": [
      "Автобусен транспорт",
      "2 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 342,
        "price_eur": 175,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_solna-mina-unirea-%E2%80%93-bukuresht-%E2%80%93-spa-terme-1_1758882835531.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 316,
    "refNum": "Е485",
    "title": "Коледа в Белград",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Белград, Сърбия",
    "country": "serbia",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 643,
    "price_eur": 329,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Празнична Коледа в Белград – украсени улици, базари и сръбско гостоприемство.",
    "includes": [
      "Автобусен транспорт",
      "3 нощувки със закуска",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 643,
        "price_eur": 329,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_koleda-belgrad-1_1751633479485.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 322,
    "refNum": "Е474",
    "title": "Екскурзия в Дания – Копенхаген, градът на приказките",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Копенхаген, Дания",
    "country": "denmark",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 1269,
    "price_eur": 649,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Копенхаген – Малката русалка, Нюхавн, Тиволи и скандинавски чар.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1269,
        "price_eur": 649,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-daniya-kopenhagen-gradat-na-prikazkite-i-s-1_1750236483474.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=1200&q=80",
    "featured": false
  },
  {
    "id": 324,
    "refNum": "Е624",
    "title": "Екскурзия в Швеция, Финландия и Естония – Стокхолм, Хелзинки, Талин",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Стокхолм / Хелзинки / Талин",
    "country": "sweden",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 1817,
    "price_eur": 929,
    "dates": [
      "2026-09-12"
    ],
    "next_date": "2026-09-12",
    "transport": "plane",
    "description": "Скандинавска обиколка – Стокхолм, Хелзинки и средновековният Талин, с круиз по Балтийско море.",
    "includes": [
      "Самолетен билет с летищни такси",
      "Балтийски круиз",
      "5 нощувки",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1817,
        "price_eur": 929,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-shvetsiya-finlandiya-i-estoniya-%E2%80%93-stokho-1_1765977306624.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80",
    "featured": false
  },
  {
    "id": 325,
    "refNum": "Е575",
    "title": "Дубай – вълнуваща обиколка на града за 6 дни",
    "category": "excursion",
    "tags": [
      "city",
      "luxury"
    ],
    "destination": "Дубай, ОАЕ",
    "country": "uae",
    "duration": "6 дни / 5 нощувки",
    "days": 6,
    "nights": 5,
    "price_bgn": 1449,
    "price_eur": 741,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Обзорна обиколка на Дубай за 6 дни – Бурж Халифа, Палмата, старият град и пустинно сафари.",
    "includes": [
      "Самолетен билет с летищни такси",
      "5 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1449,
        "price_eur": 741,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_dubay-%E2%80%93-valnuvasht-gradski-tur-v-6-dni-1_1763986766575.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    "featured": false
  },
  {
    "id": 330,
    "refNum": "Е700",
    "title": "Коледа в ОАЕ – Най-доброто от Дубай и Абу Даби (8 дни)",
    "category": "excursion",
    "tags": [
      "city",
      "luxury"
    ],
    "destination": "Дубай / Абу Даби, ОАЕ",
    "country": "uae",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2572,
    "price_eur": 1315,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Празнична Коледа в Емирствата – Дубай и Абу Даби за 8 дни.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2572,
        "price_eur": 1315,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_koleda-v-oae-nay-dobroto-ot-dubay-i-abu-dabi-8-dni-s-po-1_1776163725700.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    "featured": false
  },
  {
    "id": 331,
    "refNum": "Е666",
    "title": "Формула 1 Гран При в Абу Даби 2026 (от София)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Абу Даби, ОАЕ",
    "country": "uae",
    "duration": "5 дни / 3 нощувки",
    "days": 5,
    "nights": 3,
    "price_bgn": 2738,
    "price_eur": 1400,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Уикендът на Формула 1 в Абу Даби – пистата Яс Марина и блясъкът на ОАЕ.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2738,
        "price_eur": 1400,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_formula-1-grand-prix-v-abu-dabi-2026-ot-sofiya-1_1771856514666.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
    "featured": false
  },
  {
    "id": 335,
    "refNum": "Е326",
    "title": "Прибалтика – новото лице на Европа",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Прибалтика (Литва, Латвия, Естония)",
    "country": "estonia",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 1849,
    "price_eur": 945,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Вилнюс, Рига и Талин – трите балтийски столици с уникален средновековен чар.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 1849,
        "price_eur": 945,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_pribaltika-novoto-litse-na-evropa-1_1697618995326.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=1200&q=80",
    "featured": false
  },
  {
    "id": 336,
    "refNum": "Е226",
    "title": "Ирландия – 40 нюанса зелено",
    "category": "excursion",
    "tags": [
      "nature",
      "culture"
    ],
    "destination": "Ирландия",
    "country": "ireland",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 3401,
    "price_eur": 1739,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Изумрудения остров – Дъблин, скалите Мохер, замъци и зелени пейзажи.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 3401,
        "price_eur": 1739,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_irlandiya-40-nyuansa-zeleno-1_1676644256226.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 339,
    "refNum": "Е507",
    "title": "Исландия – страната на елфите, троловете и северното сияние",
    "category": "excursion",
    "tags": [
      "nature",
      "adventure"
    ],
    "destination": "Исландия",
    "country": "iceland",
    "duration": "7 дни / 5 нощувки",
    "days": 7,
    "nights": 5,
    "price_bgn": 4635,
    "price_eur": 2370,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Лов на северно сияние, ледникови лагуни и приказни исландски легенди.",
    "includes": [
      "Самолетен билет с летищни такси",
      "5 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 4635,
        "price_eur": 2370,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_islandiya-stranata-na-elfite-trolovete-i-severnoto-siya-1_1756454947507.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80",
    "featured": false
  },
  {
    "id": 340,
    "refNum": "Е612",
    "title": "10 дни Исландия – земя на огън и лед",
    "category": "excursion",
    "tags": [
      "nature",
      "adventure"
    ],
    "destination": "Исландия",
    "country": "iceland",
    "duration": "10 дни / 9 нощувки",
    "days": 10,
    "nights": 9,
    "price_bgn": 5783,
    "price_eur": 2957,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Пълна обиколка на Исландия за 10 дни – фиорди, водопади, ледници и вулкани.",
    "includes": [
      "Самолетен билет с летищни такси",
      "9 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 5783,
        "price_eur": 2957,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_10-dni-islandiya-zemya-na-ogan-i-led-1_1765966468612.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1200&q=80",
    "featured": false
  },
  {
    "id": 342,
    "refNum": "Е663",
    "title": "Катар 2026 – Формула 1 Гран При (7 нощувки, хотел 4★)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2306,
    "price_eur": 1179,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Формула 1 в Доха – 7 нощувки в хотел 4★ и блясъкът на Катар.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2306,
        "price_eur": 1179,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-7-noshtuvki-hotel-4-no-1_1771853477663.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 343,
    "refNum": "Е667",
    "title": "Катар 2026 – Формула 1 Гран При (от Варна, 3 нощувки)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 2440,
    "price_eur": 1248,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Уикенд за Формула 1 в Доха с полет от Варна – 3 нощувки.",
    "includes": [
      "Самолетен билет с летищни такси",
      "3 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Варна (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2440,
        "price_eur": 1248,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-ot-varna-3-noshtuvki-ho-1_1771923846667.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 344,
    "refNum": "Е662",
    "title": "Катар 2026 – Формула 1 Гран При (7 нощувки, хотел 4★, вариант 2)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2500,
    "price_eur": 1278,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Формула 1 в Доха – 7 нощувки в хотел 4★, алтернативен пакет.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2500,
        "price_eur": 1278,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-7-noshtuvki-hotel-4-ma-1_1771853002662.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 345,
    "refNum": "Е731",
    "title": "Катар 2026 – Формула 1 Гран При (от Варна, 3 нощувки, вариант 2)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "7 дни / 6 нощувки",
    "days": 7,
    "nights": 6,
    "price_bgn": 2920,
    "price_eur": 1493,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Формула 1 в Доха с полет от Варна – разширен пакет.",
    "includes": [
      "Самолетен билет с летищни такси",
      "6 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "Варна (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2920,
        "price_eur": 1493,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-ot-varna-3-noshtuvki-ho-1_1779365668731.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 346,
    "refNum": "Е661",
    "title": "Катар 2026 – Формула 1 Гран При (4 нощувки, хотел 4★)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 3149,
    "price_eur": 1610,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Формула 1 в Доха – 4 нощувки в хотел 4★.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 3149,
        "price_eur": 1610,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-4-noshtuvki-hotel-4-t1-1_1771852394661.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 347,
    "refNum": "Е660",
    "title": "Катар 2026 – Формула 1 Гран При (4 нощувки, хотел 4★, вариант 2)",
    "category": "excursion",
    "tags": [
      "city",
      "adventure"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 3661,
    "price_eur": 1872,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Формула 1 в Доха – 4 нощувки в хотел 4★, по-висока категория настаняване.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 3661,
        "price_eur": 1872,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-4-noshtuvki-hotel-4-no-1_1771852360660.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 348,
    "refNum": "Е595",
    "title": "Катар 2026 – Формула 1 Гран При (4 нощувки, хотел 4★, премиум)",
    "category": "excursion",
    "tags": [
      "city",
      "luxury"
    ],
    "destination": "Доха, Катар",
    "country": "qatar",
    "duration": "5 дни / 4 нощувки",
    "days": 5,
    "nights": 4,
    "price_bgn": 3906,
    "price_eur": 1997,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Формула 1 в Доха – премиум пакет с 4 нощувки в хотел 4★.",
    "includes": [
      "Самолетен билет с летищни такси",
      "4 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Билет за Формула 1",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 3906,
        "price_eur": 1997,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_qatar-2026-formula-1-grand-prix-4-noshtuvki-hotel-4-ma-1_1771852235595.png"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=1200&q=80",
    "featured": false
  },
  {
    "id": 349,
    "refNum": "Е655",
    "title": "Косово – новородената държава (22 септември)",
    "category": "excursion",
    "tags": [
      "culture",
      "city"
    ],
    "destination": "Косово",
    "country": "kosovo",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 479,
    "price_eur": 245,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Прищина, Призрен и младата държава Косово – автобусна обиколка за празника.",
    "includes": [
      "Автобусен транспорт",
      "3 нощувки",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 479,
        "price_eur": 245,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_22-septemvri-ekskurziya-kosovo-%E2%80%93-novorodenata-darzhav-1_1770991514655.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80",
    "featured": false
  },
  {
    "id": 353,
    "refNum": "Е617",
    "title": "Екскурзия в Етиопия – незабравимо пътуване по Северния маршрут",
    "category": "exotic",
    "tags": [
      "culture",
      "adventure",
      "nature"
    ],
    "destination": "Етиопия",
    "country": "ethiopia",
    "duration": "9 дни / 6 нощувки",
    "days": 9,
    "nights": 6,
    "price_bgn": 6607,
    "price_eur": 3378,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Северна Етиопия – скалните църкви на Лалибела, Гондар и древната Аксумска цивилизация.",
    "includes": [
      "Международни полети с летищни такси",
      "6 нощувки",
      "Трансфери",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 6607,
        "price_eur": 3378,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_ekskurziya-v-etiopiya-%E2%80%93-nezabravimo-patuvane-po-sever-1_1765975423617.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&q=80",
    "featured": false
  },
  {
    "id": 354,
    "refNum": "Е738",
    "title": "Мароко – Южна магия (8 дни)",
    "category": "excursion",
    "tags": [
      "culture",
      "adventure"
    ],
    "destination": "Южно Мароко",
    "country": "morocco",
    "duration": "8 дни / 7 нощувки",
    "days": 8,
    "nights": 7,
    "price_bgn": 2071,
    "price_eur": 1059,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "Южно Мароко – Маракеш, високите Атласи, каньоните и портата на Сахара.",
    "includes": [
      "Самолетен билет с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач на български"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 2071,
        "price_eur": 1059,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_maroko-%E2%80%93-magiyata-na-yuga-1_1779961769738.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=1200&q=80",
    "featured": false
  },
  {
    "id": 355,
    "refNum": "Е672",
    "title": "Най-доброто от Южна Африка – от Кейптаун до сафари",
    "category": "exotic",
    "tags": [
      "nature",
      "adventure",
      "culture"
    ],
    "destination": "Южна Африка",
    "country": "south-africa",
    "duration": "10 дни / 7 нощувки",
    "days": 10,
    "nights": 7,
    "price_bgn": 6894,
    "price_eur": 3525,
    "dates": [],
    "next_date": "",
    "transport": "plane",
    "description": "ЮАР – космополитният Кейптаун, нос Добра Надежда, винарските райони и сафари.",
    "includes": [
      "Международни полети с летищни такси",
      "7 нощувки",
      "Трансфери",
      "Водач"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София (Летище)"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 6894,
        "price_eur": 3525,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_nay-dobroto-ot-yuzhna-afrika-ot-ozhiveniya-grad-keyptau-1_1772374081672.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=80",
    "featured": false
  },
  {
    "id": 356,
    "refNum": "Е569",
    "title": "Перлите на Адриатика – екскурзия с автобус (Черна Гора)",
    "category": "excursion",
    "tags": [
      "beach",
      "culture",
      "nature"
    ],
    "destination": "Черна Гора",
    "country": "montenegro",
    "duration": "4 дни / 3 нощувки",
    "days": 4,
    "nights": 3,
    "price_bgn": 643,
    "price_eur": 329,
    "dates": [],
    "next_date": "",
    "transport": "bus",
    "description": "Адриатическите перли – Котор, Будва, Свети Стефан и фиордът на Бока Которска.",
    "includes": [
      "Автобусен транспорт",
      "3 нощувки",
      "Водач на български",
      "Медицинска застраховка"
    ],
    "excludes": [
      "Входни такси",
      "Факултативни екскурзии",
      "Лични разходи"
    ],
    "departures": [
      "София"
    ],
    "hotels": [
      {
        "name": "Хотел по програма",
        "board": "Закуска",
        "price_bgn": 643,
        "price_eur": 329,
        "image": "https://www.marveltourbg.com/img/PROGRAMI/BIG_perlite-na-adriatika-ekskurziya-s-avtobus-1_1769782470569.jpg"
      }
    ],
    "image": "https://images.unsplash.com/photo-1592394533824-9440e5d68530?w=1200&q=80",
    "featured": false
  }
];
