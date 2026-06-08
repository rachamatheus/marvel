// Marvel Tour — campaign page (promo.html?c=<tag>) with destination filters
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=70';

const _custom = JSON.parse(localStorage.getItem('mt_custom_offers') || '[]');
const _deleted = JSON.parse(localStorage.getItem('mt_deleted_offers') || '[]');
const ALL_OFFERS = [...OFFERS.filter(o => !_deleted.includes(o.id)), ..._custom];

const CAMPAIGNS = {
  'ranni-zapisvaniya': {
    title: '🌅 Ранни записвания',
    sub: 'Резервирайте отрано и спестете — най-добрите цени за лято 2026.',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80'
  },
  'lyato-gartsia': {
    title: '🇬🇷 Лято 2026 Гърция',
    sub: 'Острови, плажове и древна история — нашите гръцки оферти за лято 2026.',
    cover: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=80'
  }
};

let promoTag = 'ranni-zapisvaniya';
let promoCountry = 'all';

function getParam(n) { return new URLSearchParams(location.search).get(n); }
function coverOf(o) {
  return (typeof OFFER_IMAGES !== 'undefined' && OFFER_IMAGES[o.id]) ||
    (o.image && o.image.startsWith('http') ? o.image : '') || PLACEHOLDER_IMG;
}
function transportLabel(t) {
  const m = { flight:'✈️ Самолет', plane:'✈️ Самолет', bus:'🚌 Автобус', car:'🚗 Автомобил', ship:'🚢 Кораб', train:'🚆 Влак' };
  return m[t] || t || '✈️ Самолет';
}

function renderPromo() {
  promoTag = getParam('c') || 'ranni-zapisvaniya';
  const camp = CAMPAIGNS[promoTag] || CAMPAIGNS['ranni-zapisvaniya'];
  document.title = camp.title.replace(/^[^ ]+ /, '') + ' — Marvel Tour';

  const offers = ALL_OFFERS.filter(o => (o.tags || []).includes(promoTag));

  // Destination (country) chips from offers present
  const counts = {};
  offers.forEach(o => { counts[o.country] = (counts[o.country] || 0) + 1; });
  const countryChips = [`<button class="filter-btn ${promoCountry === 'all' ? 'active' : ''}" onclick="setPromoCountry('all')">Всички (${offers.length})</button>`]
    .concat(Object.keys(counts).sort((a, b) => counts[b] - counts[a]).map(key => {
      const c = (typeof COUNTRIES !== 'undefined') ? COUNTRIES.find(x => x.key === key) : null;
      return `<button class="filter-btn ${promoCountry === key ? 'active' : ''}" onclick="setPromoCountry('${key}')">${c ? c.label : key} (${counts[key]})</button>`;
    })).join('');

  const list = offers.filter(o => promoCountry === 'all' || o.country === promoCountry)
    .sort((a, b) => a.price_eur - b.price_eur);

  const cards = list.map(o => {
    const cat = o.category || '';
    const typeLabel = cat.includes('vacation') ? 'Почивка' : cat.includes('excursion') ? 'Екскурзия' : cat.includes('exotic') ? 'Екзотика' : 'Оферта';
    return `
      <div class="offer-card" onclick="location.href='oferta.html?id=${o.id}'">
        <div class="offer-card-img-wrap">
          <img class="offer-card-img" src="${coverOf(o)}" alt="${o.title}" loading="lazy" onerror="this.src='${PLACEHOLDER_IMG}'">
          <span class="offer-badge">${typeLabel}</span>
        </div>
        <div class="offer-card-body">
          <div class="offer-destination">📍 ${o.destination || ''}</div>
          <h3 class="offer-title" style="font-size:1.05rem;">${o.title}</h3>
          <div class="offer-meta" style="color:var(--gray-400);font-size:0.8rem;margin:6px 0;">${o.duration} · ${transportLabel(o.transport)}${o.refNum ? ' · ' + o.refNum : ''}</div>
          <div class="offer-card-footer">
            <div><div class="offer-price-label">Цена от</div><div><span class="offer-price">${o.price_eur} €</span> <span class="offer-price-eur">/ ${o.price_bgn} лв.</span></div></div>
            <button class="offer-btn" onclick="event.stopPropagation();location.href='oferta.html?id=${o.id}'">Детайли →</button>
          </div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('promoRoot').innerHTML = `
    <section class="blog-hero" style="background:linear-gradient(180deg,rgba(8,18,40,0.55),rgba(8,18,40,0.65)),url('${camp.cover}');background-size:cover;background-position:center;">
      <div class="blog-hero-inner">
        <h1 class="blog-hero-title">${camp.title}</h1>
        <p class="blog-hero-sub">${camp.sub}</p>
      </div>
    </section>
    <div class="blog-wrap">
      <div style="display:flex;gap:10px;justify-content:center;margin-bottom:1rem;flex-wrap:wrap;">
        <a class="filter-btn ${promoTag === 'ranni-zapisvaniya' ? 'active' : ''}" href="promo.html?c=ranni-zapisvaniya">🌅 Ранни записвания</a>
        <a class="filter-btn ${promoTag === 'lyato-gartsia' ? 'active' : ''}" href="promo.html?c=lyato-gartsia">🇬🇷 Лято 2026 Гърция</a>
      </div>
      <div style="text-align:center;color:var(--gray-600);font-size:0.85rem;margin-bottom:6px;">Филтър по дестинация:</div>
      <div class="filter-group blog-filters">${countryChips}</div>
      <div class="offers-grid">${cards || '<p style="color:var(--gray-600);text-align:center;">Няма оферти за тази дестинация.</p>'}</div>
    </div>`;
}

function setPromoCountry(key) {
  promoCountry = key;
  renderPromo();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', renderPromo);
