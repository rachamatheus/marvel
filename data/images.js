// Marvel Tour — Real hotel images from marveltourbg.com sources

const OFFER_IMAGES = {

  // ── П549 КАСАНДРА БУС ────────────────────────────────
  1: 'https://www.solvex.bg/img/OBEKTI/4261/BIG_hotel_17642514974261.jpg',           // Samel
  2: 'https://www.solvex.bg/img/OBEKTI/1652/BIG_hotel_1._15797794541652.jpeg',        // Olympic Kozma
  3: 'https://www.solvex.bg/img/OBEKTI/6510/BIG_hotel_11_17520519716510.jpg',         // Litus Oliva
  4: 'https://www.solvex.bg/img/OBEKTI/1658/BIG_hotel_15524827531658.jpg',            // Grandotel Hanioti
  5: 'https://www.solvex.bg/img/OBEKTI/1641/BIG__14927610791641.jpg',                 // Dolphin Beach
  6: 'https://www.solvex.bg/img/OBEKTI/1620/BIG_hotel_1_17748820371620.jpg',          // Chrousso Village
  7: 'https://www.solvex.bg/img/OBEKTI/1671/BIG_hotel_1_16395748311671.jpg',          // Possidi Paradise
  8: 'https://www.solvex.bg/img/OBEKTI/1673/BIG_hotel_15802211381673.jpg',            // Portes Beach

  // ── П944 КАСАНДРА ЛЯТО (совалков) ───────────────────
  9:  'https://static.peakview.bg/img/data2/116/hoteli/5/BIG_Kassandra%20Bay%20VIllage_15796022065.jpeg',
  10: 'https://static.peakview.bg/img/data2/116/hoteli/58/BIG_panorama_hanioti_GrandOtel_hotel_filos_travel_1742_Gallery_160379359358.jpg',
  11: 'https://static.peakview.bg/img/data2/116/hoteli/123/BIG_possidi%20paradisee_1730299142123.jpg',
  12: 'https://static.peakview.bg/img/data2/116/hoteli/57/BIG_kassandra%20palace%201_160379339557.jpg',
  13: 'https://static.peakview.bg/img/data2/116/hoteli/110/BIG_apolamare6_1699613334110.jpg',

  // ── П1078 КАСАНДРА ОТ ПЛОВДИВ ───────────────────────
  14: 'https://xml.emerald.bg/web/files/hotels/Hotel/1959/images/661944262e858467309642.jpg',  // Olympic Kosma
  15: 'https://xml.emerald.bg/web/files/hotels/Hotel/707/images/BIG_IMG12_15181709848493.jpg',  // Chrousso Village
  16: 'https://xml.emerald.bg/web/files/hotels/Hotel/1233/images/66194ce5cb41d037088182.jpg',   // Hanioti Grand
  17: 'https://xml.emerald.bg/web/files/hotels/Hotel/61/images/66195baa46936493973452.jpg',     // Aegean Melathron
  18: 'https://xml.emerald.bg/web/files/hotels/Hotel/1453/images/66195de6c0ce7715926628.jpg',   // Kassandra Palace

  // ── П945 СИТОНИЯ БУС ─────────────────────────────────
  19: 'https://static.peakview.bg/img/data2/116/hoteli/100/BIG_olympionbeach9_1677751058100.jpg',  // Olympion Beach
  20: 'https://static.peakview.bg/img/data2/116/hoteli/60/BIG_LilyAnnVillage4_160388264060.jpg',   // Lily Ann Village
  21: 'https://static.peakview.bg/img/data2/116/hoteli/13/BIG_Blue%20Dolphin10_164441077913.jpg',  // Blue Dolphin
  22: 'https://static.peakview.bg/img/data2/116/hoteli/109/BIG_sgrelin_0_1699537477109.jpg',        // Elinotel Sermilia
  23: 'https://static.peakview.bg/img/data2/116/hoteli/21/BIG_Village%20Mare%201_157960986721.jpg', // Village Mare

  // ── П946 СИТОНИЯ ЛЯТО ────────────────────────────────
  24: 'https://static.peakview.bg/img/data2/116/hoteli/127/BIG_283974045_1732614824127.jpg',      // Porfi Beach
  25: 'https://static.peakview.bg/img/data2/116/hoteli/18/BIG_Philoxenia%203_157960437518.jpeg',  // Philoxenia
  26: 'https://static.peakview.bg/img/data2/116/hoteli/109/BIG_sgrelin_0_1699537477109.jpg',      // Elinotel Sermilia

  // ── П771 ОЛИМПИЙСКА РИВИЕРА 7Н ──────────────────────
  27: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-olimpiyska-riviera-gartsiya-s-avtobus-ot-pl-1_1711692276771.png',
  28: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-olimpiyska-riviera-gartsiya-s-avtobus-ot-pl-1_1711692276771.png',
  29: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-olimpiyska-riviera-gartsiya-s-avtobus-ot-pl-1_1711692276771.png',
  30: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-olimpiyska-riviera-gartsiya-s-avtobus-ot-pl-1_1711692276771.png',

  // ── П1127 ОЛИМПИЙСКА РИВИЕРА 5Н ─────────────────────
  31: 'https://xml.emerald.bg/web/files/hotels/Hotel/6226/images/photo-philippos-hotel-paralia-katerinis-13.jpg',
  32: 'https://xml.emerald.bg/web/files/hotels/Hotel/6198/images/BIG_na-20m-ot-plaja-v-paraliya-katerini-noshtuvka-na-chovek-sas-zakuska-i-vecherya-490249_174281715284.jpg',

  // ── П940 КОРФУ 7Н ─────────────────────────────────────
  33: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-7-noshtuvki-polet-ot-s-1_1750852554940.jpg',
  34: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-7-noshtuvki-polet-ot-s-3_1750852554940.jpg',
  35: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-7-noshtuvki-polet-ot-s-5_1750852554940.jpg',

  // ── П556 КОРФУ 4Н ─────────────────────────────────────
  36: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-4-noshtuvki-polet-ot-s-1_1682330842556.jpg',
  37: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-4-noshtuvki-polet-ot-s-2_1682330842556.jpg',
  38: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-korfu-4-noshtuvki-polet-ot-s-3_1682330842556.jpg',

  // ── П756 РОДОС 7Н ─────────────────────────────────────
  39: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_beach-6354498_1280_1710858943756.jpg',
  40: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-gartsiya-ostrov-rodos-7-noshtuvki-polet-ot-s-2_1710775746756.jpg',
  41: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_beach-6354498_1280_1710858943756.jpg',

  // ── П917 ЗАКИНТОС 7Н ──────────────────────────────────
  42: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-zakintos-7-noshtuvki-s-vklyuchen-tra-1_1747213280917.jpg',
  43: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-zakintos-7-noshtuvki-s-vklyuchen-tra-3_1747213280917.jpg',

  // ── П456 ЗАКИНТОС 6Н ──────────────────────────────────
  44: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivki-na-o-v-zakintos-lyato-2026-1_1776245698456.jpg',

  // ── П576 ЛЕФКАДА ──────────────────────────────────────
  45: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-lefkada-7-noshtuvki-s-vklyuchen-tran-1_1685701206576.jpg',
  46: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-lefkada-7-noshtuvki-s-vklyuchen-tran-3_1685701206576.jpg',

  // ── П938 ТАСОС ────────────────────────────────────────
  47: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-na-ostrov-tasos-5-noshtuvki-sas-zakuski-i-vech-1_1750755497938.jpg',

  // ── П696 БОДРУМ ───────────────────────────────────────
  48: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-bodrum-turtsiya-s-avtobus-ot-sofiya-7-noshtu-1_1699354470696.jpg',
  49: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-bodrum-turtsiya-s-avtobus-ot-sofiya-7-noshtu-1_1699354470696.jpg',
  50: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-bodrum-turtsiya-s-avtobus-ot-sofiya-7-noshtu-1_1699354470696.jpg',

  // ── П726 АЛАНИЯ БУС ───────────────────────────────────
  51: 'https://xml.emerald.bg/web/files/hotels/Hotel/1072/images/_DSC3306-HDR.jpg',  // Galaxy Beach
  52: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-s-avtobus-ot-sofiya-7-nosht-1_1755259808726.jpg',
  53: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-alaniya-turtsiya-s-avtobus-ot-sofiya-7-nosht-1_1755259808726.jpg',

  // ── П999 АЛАНИЯ РАННИ ЗАПИСВАНИЯ ─────────────────────
  54: 'https://static.peakview.bg/img/data2/121/hoteli/652/BIG_IMG_1610192631652.jpg',    // Galaxy Beach
  55: 'https://static.peakview.bg/img/data2/121/hoteli/1221/BIG_0_17593209551221.jpg',    // Kleopatra Ada
  56: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_ranni-zapisvaniya-alaniya-lyato-2026-avtobusna-programa-1_1759318891999.png',

  // ── П1051 АЛБАНИЯ ─────────────────────────────────────
  57: 'https://www.marveltourbg.com/img/PROGRAMI_POC/BIG_pochivka-v-albaniya-2026-na-adriatichesko-more-v-shengi-1_17659022201051.jpg',

};
