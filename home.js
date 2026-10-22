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
      <span class="h-m">See all projects <span aria-hidden="true">→</span></span>
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
  // ── Hero: 100 squares, two of them burgundy ("the final 2%") ──────────
  // Loop: a wave rolls across the grid towards the two burgundy squares,
  // they pulse, then move to a new spot and the next wave finds them there.
  // On desktop the pointer leaves a short burgundy trail. Hidden on phones.
  const grid = document.querySelector('.pct-grid');
  if (grid) {
    grid.innerHTML = Array.from({ length: 100 }, (_, i) =>
      `<i style="--d:${(Math.floor(i / 10) + i % 10) * 28}ms"></i>`).join('');
    const cells = [...grid.children];
    let pair = 98;                                   // left square of the pair (same row)
    const setPair = p => {
      cells[pair].classList.remove('is-pct'); cells[pair + 1].classList.remove('is-pct');
      pair = p;
      cells[pair].classList.remove('wave'); cells[pair + 1].classList.remove('wave');
      cells[pair].classList.add('is-pct'); cells[pair + 1].classList.add('is-pct');
    };
    setPair(98);
    // clear finished animations so colours return to the stylesheet
    cells.forEach(c => c.addEventListener('animationend', e => c.classList.remove(e.animationName === 'pct-wave' ? 'wave' : 'pulse')));
    requestAnimationFrame(() => grid.classList.add('in'));

    if (!reduced) {
      const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };
      const wave = () => {
        const tr = Math.floor(pair / 10), tc = pair % 10 + .5;
        const dist = cells.map((_, i) => Math.hypot(Math.floor(i / 10) - tr, i % 10 - tc));
        const max = Math.max(...dist);
        cells.forEach((c, i) => {
          if (c.classList.contains('is-pct')) return;
          c.style.setProperty('--wd', `${Math.round((max - dist[i]) * 85)}ms`);
          restart(c, 'wave');
        });
        return Math.round(max * 85) + 450;          // when the wave reaches the pair
      };
      const pulse = () => { restart(cells[pair], 'pulse'); restart(cells[pair + 1], 'pulse'); };
      const move = () => {
        let next;
        do { next = Math.floor(Math.random() * 100); } while (next % 10 === 9 || Math.abs(next - pair) < 12);
        setPair(next);
      };

      let timer = 0, running = false;
      const cycle = () => {
        const arrive = wave();
        timer = setTimeout(() => {
          pulse();
          timer = setTimeout(() => {
            move();
            timer = setTimeout(cycle, 1600);
          }, 2200);
        }, arrive);
      };
      const start = () => { if (!running) { running = true; timer = setTimeout(cycle, 1800); } };
      const stop = () => { running = false; clearTimeout(timer); };
      // only run while the hero is on screen and the tab is visible
      new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? start() : stop())).observe(grid);
      document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

      // pointer trail
      if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
        grid.addEventListener('pointermove', e => {
          const cell = e.target.closest('i');
          if (!cell || cell.classList.contains('is-pct')) return;
          cell.classList.add('hot');
          requestAnimationFrame(() => requestAnimationFrame(() => cell.classList.remove('hot')));
        });
      }
    }
  }

  observe();
})();
