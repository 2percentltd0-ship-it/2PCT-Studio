const config = window.SITE_CONTENT;
const categories = config.categories;
const order = Object.keys(categories);
const root = document.querySelector('#portfolio-content');
const esc = value => String(value ?? '').replace(/[&"'<>]/g, c => ({'&':'&amp;','"':'&quot;',"'":'&#39;','<':'&lt;','>':'&gt;'}[c]));
const slugify = value => String(value || 'project').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const projectSlug = (project, index) => project.slug || `${slugify(project.title || project.company || 'project')}-${index + 1}`;
const projectTitle = (project, index) => project.title || project.company || `Project ${index + 1}`;
const image = (asset, category, loading='lazy') => `<img src="${esc(asset.src)}" alt="${esc(asset.alt || `${category.title} — ${asset.company || category.companies.join(' · ')}`)}" loading="${loading}" style="object-fit:${esc(asset.fit || 'contain')};object-position:${esc(asset.position || 'center')}">`;
const cardAsset = project => project.coverSrc ? {...project, src:project.coverSrc} : project;
const isTemporaryImage = asset => !asset || asset.placeholder || /\/0[1-6]\.svg$/i.test(asset.src || '');
const placeholder = number => `<span>Project image ${String(number).padStart(2,'0')}<small>1600 × 1200 px</small></span>`;
const projectImage = (asset, category, number, loading='lazy') => isTemporaryImage(asset) ? placeholder(number) : image(asset,category,loading);
const pathParts = decodeURIComponent(location.pathname).split('/').filter(Boolean);
const workIndex = pathParts.lastIndexOf('work');
const routeParts = workIndex >= 0 ? pathParts.slice(workIndex + 1).filter(part => part !== 'index.html') : [];
const categoryKey = routeParts[0];
const projectPath = routeParts[1];
const category = categories[categoryKey];

const logoSource = window.STUDIO_LOGO_SVG ? `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(window.STUDIO_LOGO_SVG)}` : config.brand.logo;
document.documentElement.style.setProperty('--studio-logo', `url(${JSON.stringify(logoSource)})`);

function workPage() {
  document.title = 'Selected work — 2 Percent';
  root.innerHTML = `<section class="category-hero work-hero page-reveal"><a class="text-back" href="index.html"><span>‹</span> Home</a><p class="eyebrow">Selected work</p><div class="category-intro"><h1>Different challenges.<br>Distinct visual answers.</h1><p>Explore our work by design focus.</p></div></section><section class="category-projects work-categories">${Object.entries(categories).map(([key,item])=>`<a class="category-card page-reveal" href="work/${key}/index.html"><figure>${image(item.cover,item)}</figure><div><h2>${esc(item.title)}</h2><p>${esc(item.companies.join(' · '))}</p></div></a>`).join('')}</section>`;
}

function categoryPage() {
  const categoryIndex = order.indexOf(categoryKey);
  const previous = order[(categoryIndex - 1 + order.length) % order.length];
  const next = order[(categoryIndex + 1) % order.length];
  document.title = `${category.title} — 2 Percent`;
  root.innerHTML = `<section class="category-hero page-reveal"><a class="text-back" href="index.html#work"><span>‹</span> All work</a><p class="eyebrow">${esc(category.index)} · Design focus</p><div class="category-intro"><div><h1>${esc(category.title)}</h1><p class="category-lead">${esc(category.lead)}</p></div><ul>${category.capabilities.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>
  <section class="category-projects" aria-label="${esc(category.title)} projects">${category.images.map((project,index)=>{const cover=cardAsset(project);return `<a class="category-card page-reveal" href="work/${categoryKey}/${projectSlug(project,index)}/index.html"><figure class="${isTemporaryImage(cover) ? 'image-placeholder' : ''}">${projectImage(cover,category,index+1)}</figure><div><h2>${esc(projectTitle(project,index))}</h2><p>${esc(project.sector || project.occupation || project.industry || category.title)}</p></div></a>`;}).join('')}</section>
  <nav class="section-pagination page-reveal" aria-label="Category navigation"><a href="work/${previous}/index.html"><span>‹</span>${esc(categories[previous].title)}</a><a href="work/${next}/index.html">${esc(categories[next].title)}<span>›</span></a></nav>`;
}

function projectPage(project, index) {
  const previousIndex = (index - 1 + category.images.length) % category.images.length;
  const nextIndex = (index + 1) % category.images.length;
  const previous = category.images[previousIndex], next = category.images[nextIndex];
  const title = projectTitle(project,index);
  const suppliedImages = [project, ...(project.gallery || [])];
  const firstThree = suppliedImages.slice(0,3);
  while (firstThree.length < 3) firstThree.push(null);
  const meta = [project.company && project.company !== title && ['Client',project.company], project.sector ? ['Sector',project.sector] : ['Discipline',project.occupation || project.industry || category.title], project.services?.length && ['Services',project.services.join(', ')], project.market && ['Market',project.market], project.year && ['Year',project.year]].filter(Boolean);
  document.title = `${title} — ${category.title} — 2 Percent`;
  root.innerHTML = `<article class="case-study"><header class="case-hero page-reveal"><a class="text-back" href="work/${categoryKey}/index.html"><span>‹</span> ${esc(category.title)}</a><p class="eyebrow">${esc(category.title)} · ${String(index+1).padStart(2,'0')} / ${String(category.images.length).padStart(2,'0')}</p><h1>${esc(title)}</h1><p class="case-intro">${esc(project.summary || category.lead)}</p>${meta.length ? `<dl class="case-meta">${meta.map(([label,value])=>`<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl>` : ''}</header>
  <figure class="case-image case-image-hero page-reveal ${isTemporaryImage(firstThree[0]) ? 'image-placeholder' : ''}">${projectImage(firstThree[0],category,1,'eager')}</figure>
  ${project.approach ? `<section class="case-copy"><p class="eyebrow">The solution</p><h2>${esc(project.approachTitle || 'The approach')}</h2><p>${esc(project.approach)}</p></section>` : ''}
  <div class="case-image-grid page-reveal">${firstThree.slice(1).map((asset,i)=>`<figure class="case-image ${isTemporaryImage(asset) ? 'image-placeholder' : ''}" ${isTemporaryImage(asset) ? 'aria-label="Project image placeholder"' : ''}>${projectImage(asset,category,i+2)}</figure>`).join('')}</div>
  ${project.presentation ? `<section class="case-copy case-presentation page-reveal"><p class="eyebrow">${esc(project.presentationLabel || 'Project in detail')}</p><h2>${esc(project.presentationTitle || 'The complete visual expression')}</h2><p>${esc(project.presentation)}</p></section>` : ''}
  ${suppliedImages.length > 3 ? `<div class="case-image-stack">${suppliedImages.slice(3).map(asset=>`<figure class="case-image">${image(asset,category)}</figure>`).join('')}</div>` : ''}
  ${project.outcome ? `<section class="case-copy case-outcome"><p class="eyebrow">Outcome</p><p>${esc(project.outcome)}</p></section>` : ''}
  <nav class="project-pagination page-reveal" aria-label="Project navigation"><a href="work/${categoryKey}/${projectSlug(previous,previousIndex)}/index.html"><b>‹</b><span>Previous project</span><strong>${esc(projectTitle(previous,previousIndex))}</strong></a><a href="work/${categoryKey}/${projectSlug(next,nextIndex)}/index.html"><span>Next project</span><strong>${esc(projectTitle(next,nextIndex))}</strong><b>›</b></a></nav><a class="case-contact header-cta" href="index.html#contact"><span>Start a project</span></a></article>`;

  let touchStart = null;
  root.addEventListener('touchstart', event => { if (event.touches.length === 1) touchStart = {x:event.touches[0].clientX,y:event.touches[0].clientY}; }, {passive:true});
  root.addEventListener('touchend', event => {
    if (!touchStart || event.changedTouches.length !== 1) return;
    const dx=event.changedTouches[0].clientX-touchStart.x, dy=event.changedTouches[0].clientY-touchStart.y; touchStart=null;
    if (Math.abs(dx)<90 || Math.abs(dx)<Math.abs(dy)*1.6) return;
    location.href = dx < 0 ? `work/${categoryKey}/${projectSlug(next,nextIndex)}/index.html` : `work/${categoryKey}/${projectSlug(previous,previousIndex)}/index.html`;
  }, {passive:true});
}

if (parts.length === 1) workPage();
else if (!category) { root.innerHTML='<section class="not-found"><h1>Project not found.</h1><a href="work/index.html">← All work</a></section>'; }
else if (!projectPath) categoryPage();
else {
  const index = category.images.findIndex((project,i)=>projectSlug(project,i)===projectPath);
  if (index < 0) categoryPage(); else projectPage(category.images[index],index);
}

const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('.site-header nav');
toggle?.addEventListener('click',()=>{const open=toggle.classList.toggle('active');nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));});
document.querySelector('#year').textContent=new Date().getFullYear();
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), {threshold:.08});
document.querySelectorAll('.page-reveal').forEach((element,index) => {
  element.style.setProperty('--page-delay', `${Math.min(index,6)*55}ms`);
  revealObserver.observe(element);
});
