/* ============================================================
   Nelly's v4 — runtime cyber-sigilism partagé
   sparkles random + micro-interaction souris sur sparkles (desktop)
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarsePointer = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---------------- sparkles ---------------- */
  function spawnSparkles(layer, count) {
    if (!layer) return;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('div');
      s.className = 'sp' + (Math.random() > 0.55 ? ' twinkle' : '');
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 100) + '%';
      var size = 6 + Math.random() * 8;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.animationDelay = (Math.random() * 1.4) + 's';
      layer.appendChild(s);
    }
  }

  /* ---------------- sparkle burst au hover sur burger cards ---------------- */
  function attachSparkleBurst() {
    document.querySelectorAll('[data-sparkle]').forEach(function (card) {
      card.addEventListener('mouseenter', function () {
        var r = card.getBoundingClientRect();
        for (var i = 0; i < 6; i++) {
          var s = document.createElement('div');
          s.className = 'sp';
          s.style.position = 'fixed';
          s.style.left = (r.left + Math.random() * r.width) + 'px';
          s.style.top = (r.top + Math.random() * r.height) + 'px';
          var size = 6 + Math.random() * 6;
          s.style.width = size + 'px';
          s.style.height = size + 'px';
          s.style.animationDelay = (i * 50) + 'ms';
          s.style.zIndex = '1000';
          document.body.appendChild(s);
          (function (el) {
            setTimeout(function () { el.remove(); }, 1500 + i * 50);
          })(s);
        }
      });
    });
  }

  /* ---------------- micro-interaction souris sur sparkles ----------------
     Desktop seulement, désactivée si prefers-reduced-motion.
     - rayon d'influence 50px
     - max 3px de déplacement opposite-to-cursor (effet fuite délicat)
     - scale max 1.15 (grossissement léger)
     - rAF throttle sur mousemove
     - positions mises en cache (sparkles fixed, recompute au resize seulement)
     ------------------------------------------------------------------- */
  function setupSigilProximity() {
    if (prefersReducedMotion || isCoarsePointer) return;

    var sky = document.querySelector('.sky');
    if (!sky) return;

    var RADIUS = 50;
    var MAX_OFFSET = 3;
    var MAX_SCALE = 1.15;

    var sigils = [];
    var raf = null;
    var mx = -9999, my = -9999;

    function refresh() {
      sigils = [];
      sky.querySelectorAll('.sp').forEach(function (el) {
        var r = el.getBoundingClientRect();
        sigils.push({
          el: el,
          cx: r.left + r.width / 2,
          cy: r.top + r.height / 2,
          active: false,
        });
      });
    }

    function update() {
      raf = null;
      for (var i = 0; i < sigils.length; i++) {
        var s = sigils[i];
        var dx = s.cx - mx;
        var dy = s.cy - my;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < RADIUS && dist > 0) {
          var t = 1 - dist / RADIUS;
          var ox = (dx / dist) * MAX_OFFSET * t;
          var oy = (dy / dist) * MAX_OFFSET * t;
          var sc = 1 + (MAX_SCALE - 1) * t;
          s.el.style.translate = ox.toFixed(2) + 'px ' + oy.toFixed(2) + 'px';
          s.el.style.scale = sc.toFixed(3);
          s.active = true;
        } else if (s.active) {
          s.el.style.translate = '';
          s.el.style.scale = '';
          s.active = false;
        }
      }
    }

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      if (raf === null) raf = requestAnimationFrame(update);
    }

    function onLeave() {
      mx = -9999;
      my = -9999;
      if (raf === null) raf = requestAnimationFrame(update);
    }

    // débounce léger sur resize
    var resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(refresh, 120);
    }

    // laisse les sparkles spawn et terminer leur entrée avant de mesurer
    setTimeout(refresh, 900);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', onResize);
  }

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (prefersReducedMotion) return;

    spawnSparkles(document.querySelector('.sky'), 38);
    attachSparkleBurst();
    setupSigilProximity();
  });
})();
