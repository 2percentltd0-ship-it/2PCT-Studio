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
let activeCategory = order[0];
let pointerOpenedProject = null;

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
      <span class="project-art">${imageMarkup(cover, category)}<span class="view-project">View category ↗</span></span>
      <span class="project-meta"><span><b>${category.title}</b><small>${category.companies.join(' · ')}</small></span><i>Open ↗</i></span>
    </button>`;
  }).join('');

  grid.querySelectorAll('[data-category]').forEach(button => {
    button.addEventListener('pointerdown', () => { pointerOpenedProject = button; });
    button.addEventListener('click', event => {
      if (event.detail === 0) pointerOpenedProject = null;
      openCategory(button.dataset.category);
    });
  });
}

function renderGallery(item) {
  const [hero, ...details] = item.images;
  let cursor = 0;
  const rows = item.rows.map(imageCount => {
    const rowImages = details.slice(cursor, cursor + imageCount);
    cursor += imageCount;
    const figures = rowImages.map(image => `<figure>${imageMarkup(image, item)}<span>${image.company || item.companies.join(' · ')}</span></figure>`).join('');
    return `<div class="visual-row">${figures}</div>`;
  }).join('');
  return `<figure class="visual-hero">${imageMarkup(hero, item, 'eager')}<span>${hero.company || item.companies.join(' · ')}</span></figure>${rows}`;
}

function justifyGallery(gallery) {
  gallery.querySelectorAll('.visual-row figure').forEach(figure => {
    const image = figure.querySelector('img');
    const applyRatio = () => {
      if (!image.naturalWidth || !image.naturalHeight) return;
      figure.style.setProperty('--image-ratio', String(image.naturalWidth / image.naturalHeight));
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

function openCategory(key) {
  const item = categories[key];
  if (!item) return;
  activeCategory = key;
  dialog.querySelector('.case-index').textContent = item.index;
  dialog.querySelector('#case-title').textContent = item.title;
  dialog.querySelector('.case-lead').textContent = item.lead;
  dialog.querySelector('.case-companies').innerHTML = item.companies.map(company => `<li>${company}</li>`).join('');
  dialog.querySelector('.case-capabilities').innerHTML = item.capabilities.map(capability => `<li>${capability}</li>`).join('');
  const gallery = dialog.querySelector('.case-visuals');
  gallery.innerHTML = renderGallery(item);
  justifyGallery(gallery);
  enableGalleryFocus(gallery);
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

dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  if (!pointerOpenedProject) return;
  const project = pointerOpenedProject;
  pointerOpenedProject = null;
  requestAnimationFrame(() => project.blur());
});
dialog.querySelector('.next-project').addEventListener('click', () => openCategory(order[(order.indexOf(activeCategory) + 1) % order.length]));
dialog.querySelector('.case-actions a').addEventListener('click', () => dialog.close());

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
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

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
