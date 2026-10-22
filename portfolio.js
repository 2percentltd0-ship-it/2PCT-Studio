/* Projects page, discipline pages and project pages — built from content.js.
   Projects whose cover is still a placeholder SVG are left out. */
(() => {
  const { config, esc, local, real, projects, observe } = window.Site;
  const main = document.querySelector('#portfolio-content');
  const categories = config.categories;
  const isPlaceholder = src => !src || /\/0[1-6]\.svg$/i.test(src);
  const label = p => [p.category.title, p.project.country].filter(Boolean).join(' · ');

  const card = p => `
    <a class="work-card reveal" href="${p.url}">
      <figure><img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="lazy"></figure>
      <h2>${esc(p.title)}</h2>
      <p>${esc(label(p))}</p>
    </a>`;

  // ── Projects list (all, or one discipline) ──────────────────────────
  function listPage(key, { push = false } = {}) {
    const keepScroll = main.querySelector('.filters')?.scrollLeft || 0;
    const category = categories[key];
    const list = category ? real.filter(p => p.key === key)
      : [...real.filter(p => p.project.featured).sort((a, b) => a.project.featured - b.project.featured), ...real.filter(p => !p.project.featured)];
    const counts = Object.fromEntries(Object.keys(categories).map(k => [k, real.filter(p => p.key === k).length]));
    const tab = (k, title, count) => `<a href="${local(k ? `work/${k}/index.html` : 'work/index.html')}" data-key="${k}" class="${(k || '') === (key || '') ? 'is-active' : ''}">${esc(title)} <small>${count}</small></a>`;
    const tabs = [tab('', 'All', real.length),
      ...Object.entries(categories).filter(([k]) => counts[k] > 0 || k === key).map(([k, c]) => tab(k, c.title, counts[k]))];
    document.title = category ? `${category.title} — 2 Percent` : 'Projects — 2 Percent';
    document.body.classList.add('has-filters');
    main.innerHTML = `
      <section class="page-head">
        <div class="page-head-grid">
          <div>
            <h1 class="h-l">${category ? esc(category.title) : 'Projects'}</h1>
            <p class="lede">${category ? esc(category.lead) : 'Brand identity, packaging, websites, print and events for clients across Europe, the Middle East, Australia and the United States.'}</p>
          </div>
          ${category ? `<ul class="capabilities">${category.capabilities.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : ''}
        </div>
      </section>
      <nav class="filters" aria-label="Filter by discipline">${tabs.join('')}</nav>
      <section class="work-grid" aria-label="Projects">
        ${list.length ? list.map(card).join('') : `<p class="empty-note">We're adding projects to this discipline. <a class="arrow-link" href="${local('work/index.html')}" data-key="">See all projects <span>→</span></a></p>`}
      </section>`;
    // instant filtering: no reload, jump to the top, keep a shareable address
    main.querySelectorAll('a[data-key]').forEach(a => a.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      listPage(a.dataset.key, { push: true });
      history.pushState({ key: a.dataset.key }, '', a.href);
      scrollTo({ top: 0, behavior: 'instant' });
    }));
    // keep the tab row where it was, and make sure the chosen tab is fully visible
    const row = main.querySelector('.filters');
    const active = row.querySelector('.is-active');
    row.scrollLeft = keepScroll;
    if (active) {
      const pad = 16;
      if (active.offsetLeft - pad < row.scrollLeft) row.scrollLeft = active.offsetLeft - pad;
      else if (active.offsetLeft + active.offsetWidth + pad > row.scrollLeft + row.clientWidth) row.scrollLeft = active.offsetLeft + active.offsetWidth + pad - row.clientWidth;
    }
    observe(main);
    if (push) main.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  // ── Project page ────────────────────────────────────────────────────
  function projectPage(entry) {
    const { project, category, key } = entry;
    const back = `<a class="back-link" href="${local(`work/${key}/index.html`)}"><span>←</span> ${esc(category.title)}</a>`;
    document.title = `${entry.title} — ${category.title} — 2 Percent`;
    if (!entry.real) {
      main.innerHTML = `<section class="page-head">${back}<h1 class="h-l" style="margin-top:2rem">${esc(entry.title)}</h1><p class="lede">Images for this project are on their way. <a class="arrow-link" href="${local(`work/${key}/index.html`)}">See ${esc(category.title)} <span>→</span></a></p></section>`;
      return;
    }
    const meta = [
      project.company && project.company !== entry.title && ['Client', project.company],
      ['Discipline', category.title],
      project.sector && ['Sector', project.sector],
      project.country && ['Country', project.country],
      project.year && ['Year', project.year],
    ].filter(Boolean);
    const images = [{ src: project.src, alt: entry.title }, ...(project.gallery || [])].filter(img => !isPlaceholder(img.src));

    // previous / next inside the discipline, and three more projects (same discipline first)
    const same = real.filter(p => p.key === key);
    const i = same.indexOf(entry);
    const prev = same.length > 1 ? same[(i - 1 + same.length) % same.length] : null;
    const next = same.length > 1 ? same[(i + 1) % same.length] : null;
    const more = [...same.slice(i + 1), ...same.slice(0, i), ...real.filter(p => p.key !== key)].filter(p => p !== entry).slice(0, 3);

    main.innerHTML = `
      <article class="case">
        <aside class="case-info">
          ${back}
          <h1 class="h-l">${esc(entry.title)}</h1>
          <p class="case-summary">${esc(project.summary || category.lead)}</p>
          <dl class="case-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}</dl>
        </aside>
        <div class="case-images">
          ${images.map((img, n) => `<figure class="reveal"><img src="${esc(local(img.src))}" alt="${esc(img.alt || entry.title)}" loading="${n ? 'lazy' : 'eager'}"></figure>`).join('')}
        </div>
      </article>
      <div class="after-case">
      ${more.length ? `
      <section class="more">
        <div class="more-head"><h2 class="h-m">${more.every(p => p.key === key) ? `More ${esc(category.title)}` : 'More projects'}</h2><a class="arrow-link" href="${local('work/index.html')}">All projects <span>→</span></a></div>
        <div class="more-grid">${more.map(card).join('')}</div>
        ${prev ? `<nav class="pager" aria-label="Project navigation">
          <a href="${prev.url}"><span>← Previous</span><b>${esc(prev.title)}</b></a>
          <a href="${next.url}"><span>Next →</span><b>${esc(next.title)}</b></a>
        </nav>` : ''}
      </section>` : ''}
      <section class="cta-band">
        <p>Have a similar project in mind?</p>
        <a class="button" href="${local('index.html#contact')}"><span>Start a project</span></a>
      </section>
      </div>`;
    observe(main);
  }

  // ── route ───────────────────────────────────────────────────────────
  const categoryKey = document.body.dataset.category || '';
  const projectSlug = document.body.dataset.project || '';
  if (categoryKey && projectSlug) {
    const entry = projects.find(p => p.key === categoryKey && p.slug === projectSlug);
    if (entry) projectPage(entry); else listPage(categoryKey);
  } else {
    listPage(categoryKey);
    addEventListener('popstate', () => {
      const m = location.pathname.match(/\/work\/([^/]+)\/(?:index\.html)?$/);
      listPage(m && categories[m[1]] ? m[1] : '', { push: true });
    });
  }
})();
