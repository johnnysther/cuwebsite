/* ── CU Leisure Common JS ── */

/* Mobile Nav Toggle */
(function () {
  function initNav() {
    const navInner = document.querySelector('.nav-inner');
    if (!navInner) return;
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', '메뉴 열기');
    toggle.innerHTML = '<span></span><span></span><span></span>';
    navInner.appendChild(toggle);

    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', open);
    });

    document.addEventListener('click', (e) => {
      if (!navInner.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();

/* Scroll Reveal */
(function () {
  const css = `
    .reveal { opacity: 0; transform: translateY(30px); transition: opacity .8s ease, transform .8s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const selectors = [
    '.pain-card', '.case-card', '.solution-card', '.cycle-step',
    '.portfolio-card', '.client-logo', '.insight-card', '.card',
    '.stat-card', '.stage-item', '.side-item', '.tl-item',
    '.section-head', '.cta'
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  function applyReveal() {
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * 0.08) + 's';
        observer.observe(el);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyReveal);
  } else {
    applyReveal();
  }
})();

/* Count-up animation */
(function () {
  function countUp(el) {
    const raw = el.dataset.target || el.textContent.replace(/[^0-9]/g, '');
    const target = parseInt(raw, 10);
    if (!target) return;
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      el.textContent = current.toLocaleString('ko-KR') + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function applyCountUp() {
    document.querySelectorAll('.count-up').forEach(el => {
      countObserver.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyCountUp);
  } else {
    applyCountUp();
  }
})();
