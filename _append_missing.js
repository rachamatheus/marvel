const fs = require('fs');
const rows = JSON.parse(fs.readFileSync('_missing.json', 'utf8')); // [id,type,cat,catlbl,title,days,nights,dates,bgn,eur,cover]
function esc(s) { return String(s == null ? '' : s).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]/g, ' '); }
global.window = {}; eval(fs.readFileSync('data/peakview.js', 'utf8'));
const have = new Set(window.PEAKVIEW_OFFERS.map(o => String(o.id)));
let lines = [], added = 0, skip = 0;
rows.forEach(r => {
  const id = r[0], type = r[1], cat = r[2], catlbl = r[3], title = r[4], days = r[5], nights = r[6], dates = r[7], bgn = r[8], eur = r[9], cover = r[10];
  if (have.has(String(id))) { skip++; return; }
  const sp = String(id).split('-'), toid = sp[0], spo = sp[1];
  const detail = 'https://iframe.peakview.bg/programa.php?cl=999&ifr_id=38117&spo_id=' + spo + '&type=' + type + '&toid=' + toid;
  lines.push('  {id:"' + esc(id) + '",company:"PeakView Оператор",ifr:38117,cat:"' + cat + '",catlbl:"' + esc(catlbl) + '",title:"' + esc(title) + '",dest:"",days:"' + esc(days) + '",nights:"' + esc(nights) + '",dates:"' + esc(dates) + '",bgn:"' + esc(bgn) + '",eur:"' + esc(eur) + '",cover:"' + esc(cover) + '",detail:"' + esc(detail) + '"},');
  added++;
});
let txt = fs.readFileSync('data/peakview.js', 'utf8');
const idx = txt.lastIndexOf('];');
txt = txt.slice(0, idx) + lines.join('\n') + '\n' + txt.slice(idx);
fs.writeFileSync('data/peakview.js', txt, 'utf8');
console.log('добавени:', added, '| пропуснати(дубъл):', skip);
