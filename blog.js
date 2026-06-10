// Marvel Tour — Blog rendering (list + single article)
let blogCategory = 'all';

function getParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function formatBgDate(d) {
  if (!d) return '';
  const months = ['януари','февруари','март','април','май','юни','юли','август','септември','октомври','ноември','декември'];
  const dt = new Date(d + 'T00:00:00');
  if (isNaN(dt)) return d;
  return `${dt.getDate()} ${months[dt.getMonth()]} ${dt.getFullYear()}`;
}

function renderBlog() {
  const id = getParam('id');
  if (id) { renderArticle(parseInt(id, 10)); return; }
  renderList();
}

function renderList() {
  const root = document.getElementById('blogRoot');
  const cats = BLOG_CATEGORIES.map(c =>
    `<button class="filter-btn ${blogCategory === c.key ? 'active' : ''}" onclick="setBlogCategory('${c.key}')">${c.label}</button>`).join('');

  const posts = BLOG_POSTS
    .filter(p => blogCategory === 'all' || p.category === blogCategory)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const cards = posts.map(p => `
    <a class="blog-card" href="blog.html?id=${p.id}">
      <div class="blog-card-imgwrap">
        <img class="blog-card-img" src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'">
        <span class="blog-card-cat">${p.category}</span>
      </div>
      <div class="blog-card-body">
        <div class="blog-card-meta">${formatBgDate(p.date)} · ${p.read} четене</div>
        <h3 class="blog-card-title">${p.title}</h3>
        <p class="blog-card-excerpt">${p.excerpt}</p>
        <span class="blog-card-more">Прочети →</span>
      </div>
    </a>`).join('');

  root.innerHTML = `
    <section class="blog-hero">
      <div class="blog-hero-inner">
        <div class="section-badge">📖 Блог</div>
        <h1 class="blog-hero-title">Съвети, истории и вдъхновение за пътуване</h1>
        <p class="blog-hero-sub">Полезни насоки, препоръки и разкази от любимите ни дестинации.</p>
      </div>
    </section>
    <div class="blog-wrap">
      <div class="filter-group blog-filters">${cats}</div>
      <div class="blog-grid">${cards || '<p style="color:var(--gray-600);">Няма статии в тази категория.</p>'}</div>
    </div>`;
}

function setBlogCategory(key) {
  blogCategory = key;
  renderList();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderArticle(id) {
  const root = document.getElementById('blogRoot');
  const post = BLOG_POSTS.find(p => p.id === id);
  if (!post) {
    root.innerHTML = `<div class="blog-wrap" style="text-align:center;padding:6rem 1rem;">
      <h2 style="font-family:'Playfair Display',serif;color:var(--primary);">Статията не е намерена</h2>
      <a href="blog.html" class="form-submit" style="display:inline-block;text-decoration:none;width:auto;padding:12px 28px;margin-top:1rem;">← Към блога</a></div>`;
    return;
  }
  document.title = `${post.title} — Marvel Tour Блог`;

  const bodyHtml = post.body.map(s =>
    (s.h ? `<h2 class="article-h">${s.h}</h2>` : '') +
    (s.p ? `<p class="article-p">${s.p}</p>` : '') +
    (s.list ? `<ul class="article-list">${s.list.map(li => `<li>${li}</li>`).join('')}</ul>` : '') +
    (s.q ? `<blockquote class="article-quote">${s.q}</blockquote>` : '')
  ).join('');

  // Related posts (same category, excluding current)
  const related = BLOG_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);
  const relatedHtml = related.length ? `
    <div class="article-related">
      <h3 class="offer-section-title">Още от „${post.category}"</h3>
      <div class="blog-grid">
        ${related.map(p => `
          <a class="blog-card" href="blog.html?id=${p.id}">
            <div class="blog-card-imgwrap"><img class="blog-card-img" src="${p.cover}" alt="${p.title}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'"></div>
            <div class="blog-card-body">
              <h3 class="blog-card-title" style="font-size:1rem;">${p.title}</h3>
            </div>
          </a>`).join('')}
      </div>
    </div>` : '';

  root.innerHTML = `
    <article class="article">
      <a href="blog.html" class="offer-back">← Към блога</a>
      <span class="blog-card-cat article-cat">${post.category}</span>
      <h1 class="article-title">${post.title}</h1>
      <div class="article-meta">${post.author} · ${formatBgDate(post.date)} · ${post.read} четене</div>
      <img class="article-cover" src="${post.cover}" alt="${post.title}" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80'">
      <div class="article-body">${bodyHtml}</div>
      <div class="article-cta">
        <div>
          <div style="font-weight:700;font-size:1.05rem;color:var(--primary);">Готови за приключение?</div>
          <div style="color:var(--gray-600);font-size:0.9rem;">Разгледайте нашите оферти и намерете своето пътуване.</div>
        </div>
        <a href="index.html#offers" class="form-submit" style="text-decoration:none;width:auto;padding:12px 26px;white-space:nowrap;">Виж офертите →</a>
      </div>
      ${relatedHtml}
    </article>`;
}

document.addEventListener('DOMContentLoaded', renderBlog);
