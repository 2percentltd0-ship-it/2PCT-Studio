const config = window.SITE_CONTENT;
const categories = config.categories;
const order = Object.keys(categories);
const grid = document.querySelector('.project-grid');
const dialog = document.querySelector('.case-dialog');
let activeCategory = order[0];

function escapeAttribute(value) {
  return String(value).replace(/[&"'<>]/g, character => ({ '&': '&amp;', '"': '&quot;', "'": '&#39;', '<': '&lt;', '>': '&gt;' }[character]));
}

function imageMarkup(image, item, loading = 'lazy') {
  const company = image.company || item.companies.join(' · ');
  const alt = image.alt || `${item.title} — ${company}`;
  const fit = image.fit || 'contain';
  const position = image.position || 'center';
  return `<img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(alt)}" loading="${loading}" style="object-fit:${escapeAttribute(fit)};object-position:${escapeAttribute(position)}">`;
}

function renderProjects() {
  grid.innerHTML = order.map(key => {
    const category = categories[key];
    const cover = category.cover;
    return `<button class="project reveal" data-category="${key}" type="button">
      <span class="project-art">${imageMarkup(cover, category)}<span class="project-number">${category.index.split(' / ')[0]}</span><span class="view-project">View category ↗</span></span>
      <span class="project-meta"><span><b>${category.title}</b><small>${category.companies.join(' · ')}</small></span><i>Open ↗</i></span>
    </button>`;
  }).join('');

  grid.querySelectorAll('[data-category]').forEach(button => button.addEventListener('click', () => openCategory(button.dataset.category)));
}

function renderGallery(item) {
  const [hero, ...details] = item.images;
  let cursor = 0;
  const rows = item.rows.map(row => {
    const rowImages = details.slice(cursor, cursor + row.columns.length);
    cursor += row.columns.length;
    const figures = rowImages.map((image, index) => `<figure style="--column:${row.columns[index]}">${imageMarkup(image, item)}<span>${image.company || item.companies.join(' · ')}</span></figure>`).join('');
    return `<div class="visual-row ${row.height}">${figures}</div>`;
  }).join('');
  return `<figure class="visual-hero">${imageMarkup(hero, item, 'eager')}<span>${hero.company || item.companies.join(' · ')}</span></figure>${rows}`;
}

function openCategory(key) {
  const item = categories[key];
  if (!item) return;
  activeCategory = key;
  dialog.querySelector('.case-index').textContent = item.index;
  dialog.querySelector('#case-title').textContent = item.title;
  dialog.querySelector('.case-lead').textContent = item.lead;
  dialog.querySelector('.case-companies').innerHTML = item.companies.map(company => `<li>${company}</li>`).join('');
  dialog.querySelector('.case-capabilities').innerHTML = item.capabilities.map(capability => `<li>${capability}</li>`).join('');
  dialog.querySelector('.case-visuals').innerHTML = renderGallery(item);
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('.case-info').scrollTop = 0;
  dialog.querySelector('.case-visuals').scrollTop = 0;
}

renderProjects();

document.querySelectorAll('img[src="logo-2percent.png"]').forEach(image => {
  image.src = config.brand.logo;
  image.alt = config.brand.name;
});
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = `mailto:${config.brand.email}?subject=New%20project%20inquiry`;
  if (link.classList.contains('contact-link')) link.childNodes[0].textContent = `${config.brand.email} `;
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.querySelector('.next-project').addEventListener('click', () => openCategory(order[(order.indexOf(activeCategory) + 1) % order.length]));
dialog.querySelector('.case-actions a').addEventListener('click', () => dialog.close());

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const header = document.querySelector('.site-header');
let lastScroll = 0;
toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('active');
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
}));
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('hidden', current > lastScroll && current > 120);
  lastScroll = current;
}, { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .08 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();
