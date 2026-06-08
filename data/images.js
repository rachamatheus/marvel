// Marvel Tour — Destination-specific offer images
// Each entry maps offer ID → curated Unsplash travel photo

const OFFER_IMAGES = {
  // ── ГЪРЦИЯ ──────────────────────────────────────────────────────────
  1:   'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',  // Halkidiki Sithonia Blue Dream
  2:   'https://images.unsplash.com/photo-1490604668309-21f739b64f16?w=800&q=80',  // Halkidiki Sithonia Akti
  3:   'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',  // Halkidiki Kassandra family
  4:   'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',  // Thassos Golden Beach
  5:   'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',     // Corfu Mayor Mon Repos
  6:   'https://images.unsplash.com/photo-1602002418082-a4443978a769?w=800&q=80',  // Corfu Kontokali 5*
  7:   'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',     // Rhodes Atlantica
  8:   'https://images.unsplash.com/photo-1551882547-ff40c4a49f5e?w=800&q=80',     // Olympic Riviera
  9:   'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',  // Halkidiki Sani 5*
  100: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',  // Athens + Santorini
  101: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',     // Thessaloniki
  102: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&q=80',  // Ionian Islands
  103: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',  // Lefkada
  104: 'https://images.unsplash.com/photo-1533103747547-b4a26a20f9fd?w=800&q=80',  // Zakynthos Navagio
  105: 'https://images.unsplash.com/photo-1490604668309-21f739b64f16?w=800&q=80',  // Nea Iraklitsa
  106: 'https://images.unsplash.com/photo-1609152242697-ef55bb7ea4c9?w=800&q=80',  // Corfu Potamaki
  151: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&q=80',     // Thessaloniki weekend

  // ── ИТАЛИЯ ──────────────────────────────────────────────────────────
  20:  'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&q=80',  // Rimini Gambrinus
  21:  'https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&q=80',     // Rimini Derby
  22:  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',  // Puglia Alberobello
  23:  'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80',  // Sicily Taormina
  24:  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80',     // Rome Colosseum
  25:  'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=800&q=80',  // Venice canals
  26:  'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80',  // Sardinia
  27:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',  // Amalfi coast

  // ── ТУРЦИЯ — ПОЧИВКИ ─────────────────────────────────────────────────
  40:  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80',     // Antalya Nirvana 5*
  41:  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',  // Antalya Sherwood 5*
  42:  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',  // Antalya Selectum Family
  43:  'https://images.unsplash.com/photo-1564166174574-bc89cf22e6c7?w=800&q=80',  // Side Crystal Admiral
  44:  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',  // Belek Regnum Carya
  45:  'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',  // Kemer Magic Life
  46:  'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',     // Alanya Dobedan
  47:  'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80',  // Bodrum Voyage Torba
  48:  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',  // Marmaris Grand Yazici
  49:  'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80',  // Fethiye blue lagoon
  50:  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',  // Kusadasi Pine Bay
  51:  'https://images.unsplash.com/photo-1517170967834-81af0a5e5f71?w=800&q=80',  // Belek Maxx Royal 5*

  // ── ТУРЦИЯ — ЕКСКУРЗИИ ───────────────────────────────────────────────
  110: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',  // Istanbul flight
  111: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=800&q=80',  // Istanbul bus
  112: 'https://images.unsplash.com/photo-1565793976595-57e44ab32abe?w=800&q=80',  // Cappadocia balloon
  113: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=800&q=80',  // Lycia coast
  114: 'https://images.unsplash.com/photo-1584953535861-209ff3e23e89?w=800&q=80',  // Ephesus ruins
  150: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80',  // Istanbul weekend

  // ── ЕГИПЕТ ──────────────────────────────────────────────────────────
  60:  'https://images.unsplash.com/photo-1539768942893-daf53e448371?w=800&q=80',  // Hurghada Steigenberger
  61:  'https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?w=800&q=80',  // Hurghada Coral Beach
  62:  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',     // Sharm Baron Palms
  63:  'https://images.unsplash.com/photo-1487922604998-bbe0a4011f81?w=800&q=80',  // Sharm el Sheikh
  64:  'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=800&q=80',     // Egypt Nile cruise
  65:  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',     // Marsa Matruh

  // ── ИСПАНИЯ ─────────────────────────────────────────────────────────
  70:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',     // Costa del Sol Marbella
  71:  'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',  // Costa Brava Lloret
  72:  'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80',     // Mallorca
  73:  'https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?w=800&q=80',  // Tenerife
  74:  'https://images.unsplash.com/photo-1583417267826-aebc4d1537e7?w=800&q=80',  // Gran Canaria
  75:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',     // Benidorm Costa Blanca
  120: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80',  // Barcelona + Madrid
  121: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80',     // Andalusia Alhambra
  122: 'https://images.unsplash.com/photo-1543051932-6ef9fecfbc80?w=800&q=80',     // Madrid
  123: 'https://images.unsplash.com/photo-1499678329028-101435549a4e?w=800&q=80',  // Barcelona Gaudi
  124: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',     // Costa Dorada

  // ── ФРАНЦИЯ ─────────────────────────────────────────────────────────
  80:  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',  // Paris Eiffel
  81:  'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80',  // Cote d'Azur Nice

  // ── ОАЕ / ДУБАЙ ─────────────────────────────────────────────────────
  85:  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',  // Dubai Atlantis Palm
  86:  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',     // Dubai city + beach
  87:  'https://images.unsplash.com/photo-1490402494295-7bb09cd1f3c1?w=800&q=80',  // Dubai New Year fireworks

  // ── МАРОКО ──────────────────────────────────────────────────────────
  90:  'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80',  // Marrakech
  91:  'https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80',     // Agadir beach
  92:  'https://images.unsplash.com/photo-1524482853369-7dd3bde4dbce?w=800&q=80',  // Morocco imperial cities
  93:  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',     // Casablanca + Fes
  94:  'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80',  // Morocco Sahara desert

  // ── ЙОРДАНИЯ ────────────────────────────────────────────────────────
  95:  'https://images.unsplash.com/photo-1580834341580-8c17a3a630ca?w=800&q=80',  // Petra + Wadi Rum

  // ── АЛБАНИЯ ─────────────────────────────────────────────────────────
  97:  'https://images.unsplash.com/photo-1584388911553-c0f83a16e26c?w=800&q=80',  // Saranda Albania Riviera
  98:  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',  // Albania luxury

  // ── АВСТРИЯ / ЦЕНТРАЛНА ЕВРОПА ───────────────────────────────────────
  130: 'https://images.unsplash.com/photo-1516550893885-985c836c5c5e?w=800&q=80',  // Vienna + Budapest
  131: 'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=800&q=80',     // Danube cruise
  132: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',  // European capitals
  133: 'https://images.unsplash.com/photo-1516550893885-985c836c5c5e?w=800&q=80',  // Vienna art + culture
  134: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',  // Prague + Krakow
  135: 'https://images.unsplash.com/photo-1540541338537-1220059af2f7?w=800&q=80',  // Warsaw + Gdansk
  152: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&q=80',  // Bucharest weekend
  153: 'https://images.unsplash.com/photo-1516550893885-985c836c5c5e?w=800&q=80',  // Vienna weekend
  154: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80',     // Budapest weekend
  155: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',  // Prague weekend

  // ── ТАЙЛАНД ─────────────────────────────────────────────────────────
  140: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',  // Thailand Bangkok + Phuket
  141: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&q=80',  // Chiang Mai north
  142: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80',     // SE Asia multi-country

  // ── ВИЕТНАМ / ИНДОКИТАЙ ─────────────────────────────────────────────
  143: 'https://images.unsplash.com/photo-1557640726-c4b1a0ea6f02?w=800&q=80',     // Indochina Vietnam Halong

  // ── НОВИ ОФЕРТИ — РЕАЛНИ ХОТЕЛИ 2026 ─────────────────────────────────
  // Касандра П549 (IDs 200-207)
  200: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  201: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  202: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  203: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
  204: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  205: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  206: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
  207: 'https://images.unsplash.com/photo-1602002418082-a4443978a769?w=800&q=80',
  // Касандра П944 (IDs 208-212)
  208: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  209: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
  210: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80',
  211: 'https://images.unsplash.com/photo-1609152242697-ef55bb7ea4c9?w=800&q=80',
  212: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  // Касандра П1078 (IDs 213-217)
  213: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  214: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  215: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
  216: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  217: 'https://images.unsplash.com/photo-1609152242697-ef55bb7ea4c9?w=800&q=80',
  // Ситония П945 (IDs 218-222)
  218: 'https://images.unsplash.com/photo-1490604668309-21f739b64f16?w=800&q=80',
  219: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  220: 'https://images.unsplash.com/photo-1490604668309-21f739b64f16?w=800&q=80',
  221: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  222: 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80',
  // Ситония П946 (IDs 223-225)
  223: 'https://images.unsplash.com/photo-1490604668309-21f739b64f16?w=800&q=80',
  224: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  225: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  // Олимпийска Ривиера П771 (IDs 226-229)
  226: 'https://images.unsplash.com/photo-1551882547-ff40c4a49f5e?w=800&q=80',
  227: 'https://images.unsplash.com/photo-1551882547-ff40c4a49f5e?w=800&q=80',
  228: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  229: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  // Олимпийска Ривиера П1127 (IDs 230-231)
  230: 'https://images.unsplash.com/photo-1551882547-ff40c4a49f5e?w=800&q=80',
  231: 'https://images.unsplash.com/photo-1551882547-ff40c4a49f5e?w=800&q=80',
  // Корфу П940 (IDs 232-234)
  232: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  233: 'https://images.unsplash.com/photo-1602002418082-a4443978a769?w=800&q=80',
  234: 'https://images.unsplash.com/photo-1609152242697-ef55bb7ea4c9?w=800&q=80',
  // Корфу П556 (IDs 235-236)
  235: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800&q=80',
  236: 'https://images.unsplash.com/photo-1609152242697-ef55bb7ea4c9?w=800&q=80',
  // Родос П756 (IDs 237-239)
  237: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
  238: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80',
  239: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  // Закинтос П917, П456 (IDs 240-242)
  240: 'https://images.unsplash.com/photo-1533103747547-b4a26a20f9fd?w=800&q=80',
  241: 'https://images.unsplash.com/photo-1533103747547-b4a26a20f9fd?w=800&q=80',
  242: 'https://images.unsplash.com/photo-1533103747547-b4a26a20f9fd?w=800&q=80',
  // Лефкада П576 (IDs 243-244)
  243: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  244: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
  // Тасос П938 (ID 245)
  245: 'https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=800&q=80',
  // Бодрум П696 (IDs 246-248)
  246: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80',
  247: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80',
  248: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
  // Алания П726, П999 (IDs 249-253)
  249: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  250: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  251: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  252: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  253: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
  // Албания П1051 (ID 254)
  254: 'https://images.unsplash.com/photo-1584388911553-c0f83a16e26c?w=800&q=80',
};
