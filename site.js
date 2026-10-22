/* Shared behaviour for every page: data helpers, header, menu, reveals,
   colour blending between sections, image parallax, email copy.
   Plain JavaScript, no libraries — works when opened offline. */
(() => {
  const html = document.documentElement;
  html.classList.add('js');

  // Every newly opened page starts at the top (the back button still returns
  // to where you were). Also scrolls an embedding frame, e.g. a preview window.
  const navType = performance.getEntriesByType?.('navigation')[0]?.type;
  if (!location.hash && navType !== 'back_forward') {
    const toTop = () => {
      scrollTo({ top: 0, left: 0, behavior: 'instant' });
      try { html.scrollIntoView({ block: 'start', behavior: 'instant' }); } catch (e) {}
    };
    toTop();
    requestAnimationFrame(toTop);
    addEventListener('load', toTop, { once: true });
  }
  const config = window.SITE_CONTENT;
  const root = document.body.dataset.root || '';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── data helpers (used by home.js and portfolio.js) ─────────────────
  const esc = v => String(v ?? '').replace(/[&"'<>]/g, c => ({ '&': '&amp;', '"': '&quot;', "'": '&#39;', '<': '&lt;', '>': '&gt;' }[c]));
  const slugify = v => String(v || 'project').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const isPlaceholder = src => !src || /\/0[1-6]\.svg$/i.test(src);
  // absolute URLs from the site root, so links keep working after the Projects
  // page changes its address without reloading
  const base = new URL(root || './', location.href);
  const local = path => /^(?:[a-z]+:|\/\/|#)/i.test(path || '') ? path : new URL(path, base).href;
  const projects = Object.entries(config.categories).flatMap(([key, category]) =>
    category.images.map((project, index) => {
      const slug = project.slug || `${slugify(project.title || project.company)}-${index + 1}`;
      return {
        key, category, project, index, slug,
        title: project.title || project.company || `Project ${index + 1}`,
        real: !isPlaceholder(project.coverSrc),
        url: local(`work/${key}/${slug}/index.html`),
        cover: local(project.coverSrc),
      };
    }));
  window.Site = { config, root, esc, local, projects, real: projects.filter(p => p.real), reduced };

  // ── logo (mask image, works offline through studio-logo-data.js) ────
  const logo = window.STUDIO_LOGO_SVG ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(window.STUDIO_LOGO_SVG)}` : local(config.brand.logo);
  html.style.setProperty('--studio-logo', `url(${JSON.stringify(logo)})`);

  // ── header: transparent at the top of the homepage, hides on scroll down
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const transparentTop = document.body.classList.contains('home');
  const narrow = matchMedia('(max-width: 860px)'); // on phones the header always stays visible
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    const menuOpen = toggle?.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('at-top', transparentTop && y < 40);
    header.classList.toggle('hidden', transparentTop && !narrow.matches && !menuOpen && y > lastY && y > 240);
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    header.classList.remove('hidden');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') toggle.click(); });
  narrow.addEventListener?.('change', () => { if (!narrow.matches && toggle?.getAttribute('aria-expanded') === 'true') toggle.click(); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (toggle?.getAttribute('aria-expanded') === 'true') toggle.click();
  }));

  // active nav link follows the section in view (homepage anchors)
  const navTargets = [...(nav?.querySelectorAll('a[data-section]') || [])]
    .map(a => ({ a, el: document.getElementById(a.dataset.section) })).filter(t => t.el);

  // ── email: link + copy button ───────────────────────────────────────
  document.querySelectorAll('a[data-email]').forEach(a => {
    a.href = `mailto:${config.brand.email}?subject=New%20project%20inquiry`;
    if (a.dataset.email === 'text') a.textContent = config.brand.email;
  });
  const copy = document.querySelector('.copy-email');
  copy?.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(config.brand.email); }
    catch { const t = document.createElement('textarea'); t.value = config.brand.email; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove(); }
    const status = document.querySelector('.sr-status');
    if (status) status.textContent = `${config.brand.email} copied`;
    copy.classList.add('copied');
    setTimeout(() => { copy.classList.remove('copied'); if (status) status.textContent = ''; }, 1800);
  });
  document.querySelectorAll('.js-year').forEach(el => { el.textContent = new Date().getFullYear(); });

  // ── reveals (call Site.observe after rendering new content) ──────────
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  window.Site.observe = (scope = document) => scope.querySelectorAll('.reveal, .wipe, .steps').forEach(el => io.observe(el));

  // ── frame loop: colour tones + parallax + active nav ────────────────
  const TONES = {               // background, text, accent — keep in step with styles.css
    paper:  ['#ffffff', '#172126', '#8b2635'],
    deep:   ['#1d2b31', '#eef3f4', '#e7a3ae'],
    ice:    ['#e9f0f2', '#172126', '#8b2635'],
    signal: ['#8b2635', '#ffffff', '#f4c6cd'],
  };
  const hex = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const T = Object.fromEntries(Object.entries(TONES).map(([k, v]) => [k, v.map(hex)]));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const smooth = t => t * t * (3 - 2 * t);
  const rgb = c => `rgb(${c.map(Math.round).join(',')})`;
  let lastKey = '';

  function frame() {
    const vh = innerHeight;
    const toned = document.querySelectorAll('main > [data-tone]');
    if (toned.length) {
      let cur = T[toned[0].dataset.tone].map(c => c.slice());
      let dominant = toned[0].dataset.tone;
      for (let i = 1; i < toned.length; i++) {
        const top = toned[i].getBoundingClientRect().top;
        // on tall screens the next section can already be visible at the very top of
        // the page; start the blend point below it so colours only change once you scroll
        const start = Math.min(vh * 0.72, top + scrollY - 40);
        const t = smooth(clamp((start - top) / (vh * 0.4)));
        if (t <= 0) break;
        const next = T[toned[i].dataset.tone];
        cur = cur.map((c, k) => c.map((v, j) => v + (next[k][j] - v) * t));
        if (t > .5) dominant = toned[i].dataset.tone;
      }
      const key = cur.flat().map(Math.round).join();
      if (key !== lastKey) {
        html.style.setProperty('--tone-bg', rgb(cur[0]));
        html.style.setProperty('--tone-fg', rgb(cur[1]));
        html.style.setProperty('--tone-accent', rgb(cur[2]));
        html.dataset.tone = dominant;
        lastKey = key;
      }
    }
    if (!reduced) {
      document.querySelectorAll('[data-parallax]').forEach(img => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const d = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.transform = `translate3d(0, ${(-d * 5).toFixed(2)}%, 0)`;
      });
    }
    if (navTargets.length) {
      let active = null;
      navTargets.forEach(t => { const r = t.el.getBoundingClientRect(); if (r.top < vh * .45 && r.bottom > vh * .45) active = t.a; });
      navTargets.forEach(t => t.a.classList.toggle('is-active', t.a === active));
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Pages fade in on load (CSS animation on body). Links navigate normally.
})();
