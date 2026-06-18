/* Внимателно прегряване на PeakView кеша през Worker-а — оферта по оферта, с паузи.
   Спира веднага щом усети блок (празен отговор), за да не ни ограничат пак.
   Старт: node _rewarm.js            (цял цикъл)
          node _rewarm.js probe      (само проверка дали PeakView ни е пуснал)
*/
const fs = require('fs');
const EP = 'https://marveltour-push.marveltour.workers.dev';
global.window = {}; eval(fs.readFileSync('data/peakview.js', 'utf8'));
const PV = window.PEAKVIEW_OFFERS, byId = {}; PV.forEach(p => byId[String(p.id)] = p);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const enc = encodeURIComponent;
const txtLen = s => (s ? String(s).replace(/<[^>]+>/g, '').trim().length : 0);
async function gj(u) { try { return await (await fetch(u)).json(); } catch (e) { return null; } }
// пълнота на детайл: има поне програма ИЛИ хотели-панел ИЛИ някоя дата
function detailOk(d) { return d && (txtLen(d.program) > 30 || txtLen(d.hotels) > 30 || txtLen(d.includes) > 10); }

async function probe() {
  const cat = await gj(EP + '/catalog'); const ids = (cat.ids || []).map(String).filter(id => byId[id]);
  const p = byId[ids[0]];
  const d = await gj(EP + '/detail?fresh=1&url=' + enc(p.detail));
  return detailOk(d);
}

(async () => {
  if (process.argv[2] === 'probe') { console.log((await probe()) ? 'UNBLOCKED' : 'BLOCKED'); return; }
  const cat = await gj(EP + '/catalog'); const ids = (cat.ids || []).map(String).filter(id => byId[id]);
  console.log('Публикувани за прегряване:', ids.length);
  // първо пробваме дали сме пуснати
  if (!(await probe())) { console.log('STILL_BLOCKED — спирам, ще опитам пак по-късно.'); process.exit(2); }
  let ok = 0, empty = 0;
  for (let i = 0; i < ids.length; i++) {
    const p = byId[ids[i]];
    const d = await gj(EP + '/detail?fresh=1&url=' + enc(p.detail));
    await sleep(1500);
    const h = await gj(EP + '/hotels?fresh=1&url=' + enc(p.detail));
    await sleep(1500);
    if (!detailOk(d) && !(h && h.hotels && h.hotels.length)) {
      empty++;
      if (empty >= 3) { console.log('REBLOCKED около ' + i + '/' + ids.length + ' — спирам, за да не ни ограничат. Прегрети досега: ' + ok); process.exit(3); }
    } else { ok++; empty = 0; }
    if (i % 20 === 0) console.log('  ' + i + '/' + ids.length + ' (ок:' + ok + ')');
  }
  console.log('ГОТОВО. прегрети оферти:', ok, '/', ids.length);
})();
