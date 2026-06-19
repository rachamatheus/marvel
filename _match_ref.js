const fs = require('fs');
const cust = JSON.parse(fs.readFileSync('_cust.json', 'utf8')).filter(o => o.refNum);
global.window = {}; eval(fs.readFileSync('data/peakview.js', 'utf8')); const PV = window.PEAKVIEW_OFFERS;
const OPS = {}; { const a = fs.readFileSync('admin/admin.js', 'utf8'); const m = a.match(/const PV_OPERATORS = \{([\s\S]*?)\};/); if (m) eval('Object.assign(OPS,{' + m[1] + '})'); }
function norm(s) { return (s || '').toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9★]+/gi, ' ').replace(/\s+/g, ' ').trim(); }
const STOP = new Set('почивка почивки екскурзия екскурзии в на с от до и дни нощувки нощ самолет автобус полет със за хотел хотели обслужване език групов тур български водач българия програма ден'.split(/\s+/));
function toks(s) { return norm(s).split(' ').filter(w => w.length > 2 && !STOP.has(w)); }
function jac(a, b) { const A = new Set(a), B = new Set(b); if (!A.size || !B.size) return 0; let i = 0; A.forEach(x => { if (B.has(x)) i++; }); return i / (A.size + B.size - i); }
function ps(a, b) { if (!a || !b) return 0; const r = Math.abs(a - b) / Math.max(a, b); return r <= 0.02 ? 1 : r <= 0.08 ? 0.6 : r <= 0.15 ? 0.3 : 0; }
const pvX = PV.map(p => ({ p, t: toks(p.title), eur: parseFloat(p.eur) || 0, n: parseInt(p.nights) || 0 }));
let rows = [];
cust.forEach(o => {
  const st = toks(o.title), eur = o.price_eur || 0, n = o.nights || 0;
  let bs = 0, best = null;
  for (const x of pvX) {
    const sc = jac(st, x.t) * 0.62 + ps(eur, x.eur) * 0.26 + ((n && x.n) ? (n === x.n ? 1 : Math.abs(n - x.n) <= 1 ? 0.5 : 0) : 0) * 0.12;
    if (sc > bs) { bs = sc; best = x.p; }
  }
  const sp = best ? String(best.id).split('-') : ['', ''];
  rows.push({ ref: o.refNum, oldId: o.id, title: o.title, score: +bs.toFixed(2), pvId: best ? best.id : '', op: best ? (OPS[+sp[0]] || ('#' + sp[0])) : '', spo: sp[1], pvTitle: best ? best.title : '' });
});
rows.sort((a, b) => b.score - a.score);
const esc = s => '"' + String(s).replace(/"/g, '""') + '"';
let csv = ['refNum', 'oldId', 'Стара оферта', 'Score', 'Оператор', 'spo', 'PV id', 'PV заглавие'].map(esc).join(',') + '\n';
rows.forEach(r => csv += [r.ref, r.oldId, r.title, r.score, r.op, r.spo, r.pvId, r.pvTitle].map(esc).join(',') + '\n');
fs.writeFileSync('ref-matches.csv', '﻿' + csv);
fs.writeFileSync('ref-matches.json', JSON.stringify(rows));
const strong = rows.filter(r => r.score >= 0.6), mid = rows.filter(r => r.score >= 0.45 && r.score < 0.6), weak = rows.filter(r => r.score < 0.45);
console.log('с refNum:', rows.length, '| силни(≥0.6):', strong.length, '| средни(0.45-0.6):', mid.length, '| без(< 0.45, вероятно ръчни):', weak.length);
console.log('\nСИЛНИ съвпадения:');
strong.forEach(r => console.log('  [' + r.ref + '] ' + r.title.slice(0, 38) + '  →  ' + r.op + '/' + r.spo + ' (' + r.score + ')'));
