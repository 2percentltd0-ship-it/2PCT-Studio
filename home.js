const config = window.SITE_CONTENT;
const categories = config.categories;
const grid = document.querySelector('.project-grid');
const logoSource = window.STUDIO_LOGO_SVG
  ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(window.STUDIO_LOGO_SVG)}`
  : config.brand.logo;
document.documentElement.style.setProperty('--studio-logo', `url(${JSON.stringify(logoSource)})`);

const esc = value => String(value).replace(/[&"'<>]/g, c => ({'&':'&amp;','"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;'}[c]));
const image = (asset, category) => `<img src="${esc(asset.src)}" alt="${esc(asset.alt || `${category.title} — ${asset.company || category.companies.join(' · ')}`)}" loading="lazy" style="object-fit:${esc(asset.fit || 'contain')};object-position:${esc(asset.position || 'center')}">`;

grid.innerHTML = Object.entries(categories).map(([key, category]) => `
  <a class="project reveal" href="/work/${key}/">
    <span class="project-art">${image(category.cover, category)}</span>
    <span class="project-meta"><span><b>${esc(category.title)}</b><small>${esc(category.companies.join(' · '))}</small></span></span>
  </a>`).join('');

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = `mailto:${config.brand.email}?subject=New%20project%20inquiry`;
  if (link.classList.contains('contact-link')) link.textContent = config.brand.email;
});

const copyButton = document.querySelector('.copy-email');
copyButton?.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(config.brand.email); }
  catch {
    const input = document.createElement('textarea'); input.value = config.brand.email;
    document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove();
  }
  const status = document.querySelector('.copy-email-status');
  status.textContent = `${config.brand.email} copied to clipboard`;
  copyButton.classList.add('copied');
  window.setTimeout(() => { status.textContent = ''; copyButton.classList.remove('copied'); }, 1800);
});

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const header = document.querySelector('.site-header');
let lastScroll = 0;
toggle?.addEventListener('click', () => {
  const open = toggle.classList.toggle('active'); nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', String(open));
});
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  header.classList.toggle('hidden', !toggle?.classList.contains('active') && current > lastScroll && current > 120);
  lastScroll = current;
}, {passive:true});

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.08});
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const timeline = document.querySelector('.process-timeline');
if (timeline) {
  const steps = [...timeline.querySelectorAll('.timeline-step')];
  const panels = [...timeline.querySelectorAll('.timeline-panel')];
  steps.forEach((step, index) => step.addEventListener('click', () => {
    steps.forEach((item, i) => { item.classList.toggle('active', i === index); item.setAttribute('aria-selected', String(i === index)); });
    panels.forEach((panel, i) => { panel.hidden = i !== index; });
    timeline.style.setProperty('--timeline-progress', `${index * 33.333}%`);
  }));
}
document.querySelector('#year').textContent = new Date().getFullYear();
