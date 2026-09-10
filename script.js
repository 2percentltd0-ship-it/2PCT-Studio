const config = window.SITE_CONTENT;
// Use the embedded copy for CSS masks so the header and footer logo also work
// when the source is opened directly from disk (file://). Keep the file path as
// a fallback in case the generated logo-data script is intentionally omitted.
const sharedLogoSource = window.STUDIO_LOGO_SVG
  ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(window.STUDIO_LOGO_SVG)}`
  : config.brand.logo;
document.documentElement.style.setProperty('--studio-logo', `url(${JSON.stringify(sharedLogoSource)})`);
const categories = config.categories;
const order = Object.keys(categories);
const grid = document.querySelector('.project-grid');
const dialog = document.querySelector('.case-dialog');
const caseShell = dialog.querySelector('.case-shell');
let activeCategory = order[0];
let activeProject = null;
let pointerOpenedProject = null;
let swipeStart = null;
let closingFromRoute = false;

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

function slugify(value) {
  return String(value || 'project')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function projectSlug(project, index) {
  return project.slug || `${slugify(project.title || project.company || 'project')}-${index + 1}`;
}

function projectTitle(project, index) {
  return project.title || project.company || `Project ${index + 1}`;
}

function categoryRoute(key) {
  return `#work/${key}`;
}

function projectRoute(key, project, index) {
  return `${categoryRoute(key)}/${projectSlug(project, index)}`;
}

function setRoute(hash, replace = false) {
  if (window.location.hash === hash) return;
  window.history[replace ? 'replaceState' : 'pushState'](null, '', hash);
}

function renderProjects() {
  grid.innerHTML = order.map(key => {
    const category = categories[key];
    const cover = category.cover;
    return `<a class="project reveal" data-category="${key}" href="${categoryRoute(key)}">
      <span class="project-art">${imageMarkup(cover, category)}<span class="view-project">View category ↗</span></span>
      <span class="project-meta"><span><b>${category.title}</b><small>${category.companies.join(' · ')}</small></span><i>Open ↗</i></span>
    </a>`;
  }).join('');

  grid.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('pointerdown', () => { pointerOpenedProject = button; });
    button.addEventListener('click', event => {
      if (event.detail === 0) pointerOpenedProject = null;
      event.preventDefault();
      openCategory(button.dataset.category, true);
    });
  });
}

function projectCard(image, item, key, index, hero = false) {
  const title = projectTitle(image, index);
  const label = image.title ? `${title} · ${image.company || ''}` : (image.company || title);
  return `<a class="visual-project${hero ? ' visual-hero' : ''}" href="${projectRoute(key, image, index)}" data-project-index="${index}" aria-label="View ${escapeAttribute(title)} case study"><figure>${imageMarkup(image, item, hero ? 'eager' : 'lazy')}<span>${escapeAttribute(label.replace(/ · $/, ''))}</span></figure></a>`;
}

function renderGallery(item, key) {
  const [hero, ...details] = item.images;
  let cursor = 0;
  const rows = item.rows.map(imageCount => {
    const rowImages = details.slice(cursor, cursor + imageCount);
    const rowStart = cursor + 1;
    cursor += imageCount;
    const figures = rowImages.map((image, rowIndex) => projectCard(image, item, key, rowStart + rowIndex)).join('');
    return `<div class="visual-row">${figures}</div>`;
  }).join('');
  return `${projectCard(hero, item, key, 0, true)}${rows}`;
}

function justifyGallery(gallery) {
  gallery.querySelectorAll('.visual-row .visual-project').forEach(project => {
    const image = project.querySelector('img');
    const applyRatio = () => {
      if (!image.naturalWidth || !image.naturalHeight) return;
      project.style.setProperty('--image-ratio', String(image.naturalWidth / image.naturalHeight));
    };
    if (image.complete) applyRatio();
    else image.addEventListener('load', applyRatio, { once: true });
  });
}

function enableGalleryFocus(gallery) {
  gallery.querySelectorAll('figure').forEach(figure => {
    figure.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const bounds = figure.getBoundingClientRect();
      figure.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
      figure.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
    });
    figure.addEventListener('pointerleave', () => {
      figure.style.setProperty('--mouse-x', '50%');
      figure.style.setProperty('--mouse-y', '50%');
    });
  });
}

function bindProjectLinks(gallery, key) {
  gallery.querySelectorAll('[data-project-index]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      openProject(key, Number(link.dataset.projectIndex), true);
    });
  });
}

function openCategory(key, updateRoute = false) {
  const item = categories[key];
  if (!item) return;
  activeCategory = key;
  activeProject = null;
  dialog.querySelector('.project-back').hidden = true;
  dialog.querySelector('.case-index').textContent = item.index;
  dialog.querySelector('.case-category').textContent = 'Design focus';
  dialog.querySelector('#case-title').textContent = item.title;
  dialog.querySelector('.case-lead').textContent = item.lead;
  dialog.querySelector('.case-details-label').textContent = 'Selected projects';
  dialog.querySelector('.case-capabilities-label').textContent = 'What this can include';
  dialog.querySelector('.case-companies').innerHTML = item.companies.map(company => `<li>${company}</li>`).join('');
  dialog.querySelector('.case-capabilities').innerHTML = item.capabilities.map(capability => `<li>${capability}</li>`).join('');
  const gallery = dialog.querySelector('.case-visuals');
  gallery.innerHTML = renderGallery(item, key);
  justifyGallery(gallery);
  enableGalleryFocus(gallery);
  bindProjectLinks(gallery, key);
  dialog.querySelector('.next-project').hidden = false;
  dialog.querySelector('.swipe-hint').hidden = false;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('.case-info').scrollTop = 0;
  dialog.querySelector('.case-visuals').scrollTop = 0;
  caseShell.scrollTop = 0;
  document.title = `${item.title} — 2 Percent`;
  if (updateRoute) setRoute(categoryRoute(key));
}

function openProject(key, index, updateRoute = false) {
  const item = categories[key];
  const project = item?.images[index];
  if (!project) return;
  activeCategory = key;
  activeProject = index;
  const title = projectTitle(project, index);
  const details = [
    project.company && `Client: ${project.company}`,
    project.industry && `Industry: ${project.industry}`,
    project.market && `Market: ${project.market}`
  ].filter(Boolean);
  const services = project.services?.length ? project.services : item.capabilities;
  const projectImages = project.gallery?.length ? project.gallery : [project];
  dialog.querySelector('.project-back').hidden = false;
  dialog.querySelector('.case-index').textContent = `${String(index + 1).padStart(2, '0')} / ${String(item.images.length).padStart(2, '0')}`;
  dialog.querySelector('.case-category').textContent = item.title;
  dialog.querySelector('#case-title').textContent = title;
  dialog.querySelector('.case-lead').textContent = project.summary || 'Add a short explanation of the challenge, the thinking behind the design and the final solution in content.js.';
  dialog.querySelector('.case-details-label').textContent = 'Project details';
  dialog.querySelector('.case-capabilities-label').textContent = 'Services';
  dialog.querySelector('.case-companies').innerHTML = (details.length ? details : [`Client: ${project.company || 'Client name'}`]).map(detail => `<li>${escapeAttribute(detail)}</li>`).join('');
  dialog.querySelector('.case-capabilities').innerHTML = services.map(service => `<li>${escapeAttribute(service)}</li>`).join('');
  const gallery = dialog.querySelector('.case-visuals');
  gallery.innerHTML = projectImages.map((image, imageIndex) => `<figure class="${imageIndex === 0 ? 'visual-hero' : ''}">${imageMarkup(image, item, imageIndex === 0 ? 'eager' : 'lazy')}</figure>`).join('');
  enableGalleryFocus(gallery);
  dialog.querySelector('.next-project').hidden = true;
  dialog.querySelector('.swipe-hint').hidden = true;
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('modal-open');
  dialog.querySelector('.case-info').scrollTop = 0;
  gallery.scrollTop = 0;
  caseShell.scrollTop = 0;
  document.title = `${title} — ${item.title} — 2 Percent`;
  if (updateRoute) setRoute(projectRoute(key, project, index));
}

function moveCategory(step, direction) {
  const currentIndex = order.indexOf(activeCategory);
  const nextIndex = (currentIndex + step + order.length) % order.length;
  openCategory(order[nextIndex], true);

  caseShell.classList.remove('swipe-from-left', 'swipe-from-right');
  // Restart the short transition even when the user swipes repeatedly.
  void caseShell.offsetWidth;
  caseShell.classList.add(direction === 'left' ? 'swipe-from-right' : 'swipe-from-left');
}

renderProjects();

function syncRoute() {
  const match = window.location.hash.match(/^#work\/([^/]+)(?:\/([^/]+))?$/);
  if (!match) {
    if (dialog.open) {
      closingFromRoute = true;
      dialog.close();
    }
    document.title = '2 Percent — Independent Design Studio';
    return;
  }
  const key = match[1];
  const item = categories[key];
  if (!item) return;
  if (!match[2]) {
    openCategory(key, false);
    return;
  }
  const index = item.images.findIndex((project, projectIndex) => projectSlug(project, projectIndex) === match[2]);
  if (index >= 0) openProject(key, index, false);
  else openCategory(key, false);
}

window.addEventListener('popstate', syncRoute);
window.addEventListener('hashchange', syncRoute);
syncRoute();

document.querySelectorAll('img[src="logo-2percent.png"]').forEach(image => {
  image.src = config.brand.logo;
  image.alt = config.brand.name;
});
document.querySelectorAll('[data-image-slot]').forEach(image => {
  const asset = config.assets?.[image.dataset.imageSlot];
  if (!asset) return;
  image.src = asset.src;
  image.alt = asset.alt || '';
});
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.href = `mailto:${config.brand.email}?subject=New%20project%20inquiry`;
  if (link.classList.contains('contact-link')) link.textContent = config.brand.email;
});

const copyEmailButton = document.querySelector('.copy-email');
if (copyEmailButton) {
  const status = document.querySelector('.copy-email-status');
  let resetCopyIcon;

  copyEmailButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(config.brand.email);
    } catch {
      const input = document.createElement('textarea');
      input.value = config.brand.email;
      input.setAttribute('readonly', '');
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }

    window.clearTimeout(resetCopyIcon);
    status.textContent = `${config.brand.email} copied to clipboard`;
    copyEmailButton.classList.add('copied');
    resetCopyIcon = window.setTimeout(() => {
      status.textContent = '';
      copyEmailButton.classList.remove('copied');
    }, 1800);
  });
}

const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(contactForm);
  const subject = `Project inquiry from ${form.get('company') || form.get('name')}`;
  const body = [
    `Name: ${form.get('name')}`,
    `Company: ${form.get('company') || '—'}`,
    `Email: ${form.get('email')}`,
    '',
    String(form.get('brief'))
  ].join('\n');
  window.location.href = `mailto:${config.brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  document.title = '2 Percent — Independent Design Studio';
  if (closingFromRoute) closingFromRoute = false;
  else if (window.location.hash.startsWith('#work/')) setRoute('#work', true);
  if (!pointerOpenedProject) return;
  const project = pointerOpenedProject;
  pointerOpenedProject = null;
  requestAnimationFrame(() => project.blur());
});
dialog.querySelector('.project-back').addEventListener('click', () => openCategory(activeCategory, true));
dialog.querySelector('.next-project').addEventListener('click', () => moveCategory(1, 'left'));
dialog.querySelector('.case-actions a').addEventListener('click', () => dialog.close());

caseShell.addEventListener('touchstart', event => {
  if (event.touches.length !== 1) {
    swipeStart = null;
    return;
  }
  const touch = event.touches[0];
  swipeStart = { x: touch.clientX, y: touch.clientY };
}, { passive: true });

caseShell.addEventListener('touchend', event => {
  if (activeProject !== null) return;
  if (!swipeStart || event.changedTouches.length !== 1) return;
  const touch = event.changedTouches[0];
  const deltaX = touch.clientX - swipeStart.x;
  const deltaY = touch.clientY - swipeStart.y;
  swipeStart = null;

  // Require a deliberate horizontal gesture so normal gallery scrolling remains natural.
  if (Math.abs(deltaX) < 64 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
  if (deltaX < 0) moveCategory(1, 'left');
  else moveCategory(-1, 'right');
}, { passive: true });

caseShell.addEventListener('touchcancel', () => { swipeStart = null; }, { passive: true });

const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const header = document.querySelector('.site-header');
let lastScroll = 0;
toggle.addEventListener('click', () => {
  const open = toggle.classList.toggle('active');
  nav.classList.toggle('open', open);
  header.classList.remove('hidden');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !toggle.classList.contains('active')) return;
  nav.classList.remove('open');
  toggle.classList.remove('active');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
  toggle.focus();
});
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (toggle.classList.contains('active')) {
    header.classList.remove('hidden');
    lastScroll = current;
    return;
  }
  header.classList.toggle('hidden', current > lastScroll && current > 120);
  lastScroll = current;
}, { passive: true });

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: .08 });
document.querySelectorAll('main > section').forEach(section => {
  section.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${Math.min(index, 5) * 60}ms`);
    observer.observe(element);
  });
});

const timeline = document.querySelector('.process-timeline');
if (timeline) {
  const steps = [...timeline.querySelectorAll('.timeline-step')];
  const panels = [...timeline.querySelectorAll('.timeline-panel')];
  let lockedStep = 0;

  const positionTimeline = index => {
    if (window.matchMedia('(max-width: 760px)').matches) return;
    const track = timeline.querySelector('.timeline-track');
    const dots = steps.map(step => step.querySelector('span'));
    const trackBox = track.getBoundingClientRect();
    const centers = dots.map(dot => {
      const box = dot.getBoundingClientRect();
      return box.left - trackBox.left + box.width / 2;
    });
    timeline.style.setProperty('--timeline-start', `${centers[0]}px`);
    timeline.style.setProperty('--timeline-end', `${trackBox.width - centers[centers.length - 1]}px`);
    timeline.style.setProperty('--timeline-progress', `${Math.max(0, centers[index] - centers[0])}px`);
  };

  const activateStep = index => {
    const safeIndex = Math.max(0, Math.min(index, steps.length - 1));
    positionTimeline(safeIndex);
    steps.forEach((step, stepIndex) => {
      const active = stepIndex === safeIndex;
      step.classList.toggle('active', active);
      step.setAttribute('aria-selected', String(active));
      step.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel, panelIndex) => { panel.hidden = panelIndex !== safeIndex; });
  };

  steps.forEach((step, index) => {
    step.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse') activateStep(index);
    });
    step.addEventListener('focus', () => activateStep(index));
    step.addEventListener('click', () => {
      lockedStep = index;
      activateStep(index);
    });
    step.addEventListener('keydown', event => {
      if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % steps.length;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + steps.length) % steps.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = steps.length - 1;
      lockedStep = next;
      activateStep(next);
      steps[next].focus();
    });
  });
  timeline.addEventListener('pointerleave', event => {
    if (event.pointerType === 'mouse') activateStep(lockedStep);
  });
  window.addEventListener('resize', () => positionTimeline(lockedStep), { passive: true });
  activateStep(0);
}

document.getElementById('year').textContent = new Date().getFullYear();
