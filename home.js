/* Homepage: Selected work slider, built from the `featured` projects in content.js.
   Wide screens: the section pins and the cards move sideways while you scroll.
   Phones and reduced motion: a normal swipeable row. */
(() => {
  const { esc, real, observe, reduced, local } = window.Site;

  const featured = real.filter(p => p.project.featured).sort((a, b) => a.project.featured - b.project.featured);
  const track = document.querySelector('.slider-track');
  track.innerHTML = featured.map((p, i) => `
    <a class="slide" href="${p.url}">
      <figure><img src="${esc(p.cover)}" alt="${esc(p.title)}" loading="${i < 3 ? 'eager' : 'lazy'}"></figure>
      <div class="slide-cap">
        <h3>${esc(p.project.company && p.project.company !== p.title ? p.project.company : p.title)}</h3>
        <p>${esc([p.category.title, p.project.country].filter(Boolean).join(' · '))}</p>
      </div>
    </a>`).join('') + `
    <a class="slide slide-end" href="${local('work/index.html')}">
      <span class="h-m">All projects <span aria-hidden="true">→</span></span>
      <p>Packaging, brand identity, websites, print and events.</p>
    </a>`;

  const slider = document.querySelector('.slider');
  const bar = document.querySelector('.slider-bar i');
  const wide = matchMedia('(min-width: 861px)');
  const state = { pinned: false, travel: 0, x: 0 };

  function layout() {
    state.pinned = !reduced && wide.matches;
    slider.classList.toggle('is-pinned', state.pinned);
    if (state.pinned) {
      state.travel = Math.max(0, track.scrollWidth - innerWidth);
      slider.style.height = `${innerHeight + state.travel}px`;
    } else {
      slider.style.height = '';
      track.style.transform = '';
      state.x = 0;
    }
  }

  let last = performance.now();
  function frame(now) {
    const dt = Math.min((now - last) / 1000, .1); last = now;
    if (state.pinned) {
      const r = slider.getBoundingClientRect();
      const p = state.travel ? Math.min(1, Math.max(0, -r.top / state.travel)) : 0;
      state.x += (-p * state.travel - state.x) * (1 - Math.pow(1 - .12, dt * 60));
      track.style.transform = `translate3d(${state.x.toFixed(2)}px, 0, 0)`;
      bar.style.width = `${p * 100}%`;
      for (const img of track.querySelectorAll('img')) {
        const c = img.parentElement.getBoundingClientRect();
        const d = (c.left + c.width / 2 - innerWidth / 2) / innerWidth;
        img.style.transform = `scale(1.12) translate3d(${(-d * 5).toFixed(2)}%, 0, 0)`;
      }
    }
    requestAnimationFrame(frame);
  }

  // native swipe row: keep the progress bar in sync
  track.addEventListener('scroll', () => {
    if (state.pinned) return;
    const max = track.scrollWidth - track.clientWidth;
    bar.style.width = `${max ? track.scrollLeft / max * 100 : 0}%`;
  }, { passive: true });

  layout();
  addEventListener('resize', layout);
  addEventListener('load', layout);
  wide.addEventListener?.('change', layout);
  track.querySelectorAll('img').forEach(img => img.complete || img.addEventListener('load', layout, { once: true }));
  requestAnimationFrame(frame);
  observe();
})();
