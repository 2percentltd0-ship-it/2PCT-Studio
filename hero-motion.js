/* One-shot outline animation of the exact SVG configured in content.js.
   The same geometry draws and fills, so the logo never changes size. */
(() => {
  const host = document.querySelector('.hero-mark');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width: 801px)');
  if (!host || reduced.matches || !desktop.matches) return;

  const NS = 'http://www.w3.org/2000/svg';
  const DRAW_SECONDS = 3.8;
  const FILL_SECONDS = .75;
  const make = (tag, attributes = {}) => {
    const element = document.createElementNS(NS, tag);
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    return element;
  };
  const clamp = value => Math.max(0, Math.min(1, value));
  const ease = value => {
    const t = clamp(value);
    return t * t * (3 - 2 * t);
  };

  async function start() {
    const fallback = host.firstElementChild;
    let frame = 0;
    let observer;
    try {
      let logoText = '';
      try {
        const response = await fetch(window.SITE_CONTENT.brand.logo);
        if (response.ok) logoText = await response.text();
      } catch (error) {
        // Browsers normally block fetch() when index.html is opened via file://.
      }
      logoText ||= window.STUDIO_LOGO_SVG || '';
      if (!logoText) throw new Error('Logo unavailable');
      const source = new DOMParser().parseFromString(logoText, 'image/svg+xml');
      if (source.querySelector('parsererror')) throw new Error('Invalid logo SVG');

      const sourceRoot = source.documentElement;
      const svg = make('svg', {
        viewBox: sourceRoot.getAttribute('viewBox') || '0 0 512 512',
        'aria-hidden': 'true',
        class: 'logo-draw-svg'
      });
      const logo = make('g', { class: 'hero-logo-geometry' });
      const entries = [];

      // Copy only safe vector geometry from the uploaded logo.
      sourceRoot.querySelectorAll('path,polygon,polyline,circle,ellipse,rect,line').forEach(shape => {
        if (shape.closest('defs,clipPath,mask')) return;
        const copy = make(shape.localName);
        ['d','points','cx','cy','r','rx','ry','x','y','width','height','x1','x2','y1','y2','fill-rule']
          .forEach(name => {
            if (shape.hasAttribute(name)) copy.setAttribute(name, shape.getAttribute(name));
          });
        const transforms = [];
        for (let node = shape; node && node !== sourceRoot; node = node.parentElement) {
          if (node.hasAttribute('transform')) transforms.unshift(node.getAttribute('transform'));
        }
        const group = make('g');
        if (transforms.length) group.setAttribute('transform', transforms.join(' '));
        group.append(copy);
        logo.append(group);
        entries.push({ group, shape: copy });
      });
      if (!entries.length) throw new Error('No logo geometry');

      svg.append(logo);
      host.replaceChildren(svg);

      // Draw the large mark first; then write PERCENT from left to right.
      entries.forEach(entry => {
        const box = entry.group.getBBox();
        entry.box = box;
        entry.isWord = box.y > 390;
      });
      entries.sort((a, b) => {
        if (a.isWord !== b.isWord) return a.isWord ? 1 : -1;
        return a.isWord
          ? a.box.x - b.box.x
          : a.box.y - b.box.y || a.box.x - b.box.x;
      });
      entries.forEach(entry => logo.append(entry.group));

      const lengths = entries.map(entry => Math.max(1, entry.shape.getTotalLength()));
      const totalLength = lengths.reduce((sum, length) => sum + length, 0);
      let accumulated = 0;
      entries.forEach((entry, index) => {
        entry.shape.setAttribute('pathLength', '1');
        entry.shape.style.strokeDasharray = '1';
        entry.shape.style.strokeDashoffset = '1';
        entry.start = accumulated / totalLength;
        accumulated += lengths[index];
        entry.end = accumulated / totalLength;
      });

      logo.style.fillOpacity = '0';
      logo.style.strokeOpacity = '1';
      let elapsed = 0;
      let last;
      let complete = false;
      let inView = true;

      const finish = () => {
        complete = true;
        cancelAnimationFrame(frame);
        entries.forEach(entry => { entry.shape.style.strokeDashoffset = '0'; });
        logo.style.fillOpacity = '1';
        logo.style.strokeOpacity = '0';
        observer?.disconnect();
        reduced.removeEventListener('change', preference);
        desktop.removeEventListener('change', preference);
        document.removeEventListener('visibilitychange', visibility);
      };
      const preference = () => {
        if (reduced.matches || !desktop.matches) finish();
      };
      const resume = () => {
        cancelAnimationFrame(frame);
        if (!complete && !document.hidden && inView) {
          last = undefined;
          frame = requestAnimationFrame(tick);
        }
      };
      const visibility = () => resume();

      function tick(now) {
        elapsed += last === undefined ? 0 : Math.min(now - last, 80) / 1000;
        last = now;
        const drawProgress = ease(elapsed / DRAW_SECONDS);
        entries.forEach(entry => {
          const local = clamp((drawProgress - entry.start) / Math.max(.001, entry.end - entry.start));
          entry.shape.style.strokeDashoffset = String(1 - ease(local));
        });
        const fillProgress = ease((elapsed - DRAW_SECONDS) / FILL_SECONDS);
        logo.style.fillOpacity = String(fillProgress);
        logo.style.strokeOpacity = String(1 - fillProgress);
        if (elapsed >= DRAW_SECONDS + FILL_SECONDS) finish();
        else frame = requestAnimationFrame(tick);
      }

      reduced.addEventListener('change', preference);
      desktop.addEventListener('change', preference);
      document.addEventListener('visibilitychange', visibility);
      if ('IntersectionObserver' in window) {
        inView = false;
        observer = new IntersectionObserver(items => {
          inView = items[0].isIntersecting;
          resume();
        }, { threshold: .15 });
        observer.observe(host);
      }
      if (reduced.matches || !desktop.matches) finish();
      else resume();
    } catch (error) {
      cancelAnimationFrame(frame);
      observer?.disconnect();
      if (fallback) host.replaceChildren(fallback);
      console.warn('Using static studio logo:', error.message);
    }
  }

  start();
})();
