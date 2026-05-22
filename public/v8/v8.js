/* ============================================================
   Nelly's v8 — "Cuisine ouverte"
   - header sticky qui se compresse / change de mode au-dessus du hero
   - reveals au scroll via IntersectionObserver
   - parallax doux sur la photo storefront (scroll-driven)
   - indicateur "ouvert maintenant" calculé sur les horaires (12-22h)
   - curseur custom doré (desktop only)
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------------- header sticky compress + mode hero ---------------- */
  function setupHeader() {
    var header = document.querySelector('[data-header]');
    var hero = document.querySelector('.hero');
    if (!header) return;

    var heroBottom = hero ? hero.offsetHeight : 0;
    var ticking = false;

    function update() {
      var y = window.scrollY || window.pageYOffset;
      // au-dessus du hero (vidéo) : mode translucide sombre
      var onHero = y < heroBottom - 80;
      header.classList.toggle('is-on-hero', onHero);
      // compress quand on scrolle (hors du tout début)
      header.classList.toggle('is-scrolled', y > 24 && !onHero);
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    function onResize() {
      heroBottom = hero ? hero.offsetHeight : 0;
      update();
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    update();
  }

  /* ---------------- statut "ouvert maintenant" ---------------- */
  function setupStatus() {
    var node = document.querySelector('[data-status]');
    if (!node) return;
    var now = new Date();
    var h = now.getHours();
    var isOpen = h >= 12 && h < 22;
    if (!isOpen) {
      node.setAttribute('data-status', 'closed');
      var text = node.querySelector('.status-text');
      if (text) text.textContent = 'fermé · ouvre à 12h';
    }
  }

  /* ---------------- reveals au scroll ---------------- */
  function setupReveals() {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- parallax doux sur le storefront ---------------- */
  function setupParallax() {
    if (prefersReducedMotion) return;
    var fig = document.querySelector('[data-parallax]');
    var img = fig && fig.querySelector('img');
    if (!fig || !img) return;

    var ticking = false;
    function update() {
      var rect = fig.getBoundingClientRect();
      var vh = window.innerHeight;
      // -1 quand au-dessus, +1 quand en-dessous, 0 au centre
      var center = (rect.top + rect.height / 2 - vh / 2) / vh;
      var clamped = Math.max(-1, Math.min(1, center));
      // 24px de déplacement vertical max
      img.style.transform = 'scale(1.08) translateY(' + (clamped * 24) + 'px)';
      ticking = false;
    }
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---------------- curseur doré (desktop seulement) ---------------- */
  function setupCursor() {
    if (!isFinePointer || prefersReducedMotion) return;
    var dot = document.querySelector('.cursor-dot');
    if (!dot) return;

    var x = 0, y = 0, tx = 0, ty = 0;
    function tick() {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = 'translate3d(' + (x - 5) + 'px,' + (y - 5) + 'px,0)';
      requestAnimationFrame(tick);
    }
    window.addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      dot.classList.add('is-active');
    }, { passive: true });
    window.addEventListener('mouseleave', function () { dot.classList.remove('is-active'); });

    // hover state sur éléments cliquables
    var hoverables = document.querySelectorAll('a, button, [role="button"]');
    hoverables.forEach(function (el) {
      el.addEventListener('mouseenter', function () { dot.classList.add('is-hovering'); });
      el.addEventListener('mouseleave', function () { dot.classList.remove('is-hovering'); });
    });

    requestAnimationFrame(tick);
  }

  /* ---------------- relance vidéo si autoplay bloqué ---------------- */
  function setupHeroVideo() {
    var v = document.querySelector('.hero-video');
    if (!v) return;
    var tryPlay = function () {
      var p = v.play();
      if (p && typeof p.catch === 'function') p.catch(function () { /* silencieux */ });
    };
    // certains navigateurs mobiles bloquent jusqu'à la première interaction
    document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
    document.addEventListener('click',      tryPlay, { once: true });
  }

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    setupHeader();
    setupStatus();
    setupReveals();
    setupParallax();
    setupCursor();
    setupHeroVideo();
  });
})();
