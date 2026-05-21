/* ============================================================
   Nelly's v6 — runtime y2k lumineux
   - étoiles dorées (spawn random, scintillement)
   - burger 3D : suivi souris doux avec lerp + retour auto-rotate
   - fallback PNG si touch / reduced-motion / no model-viewer
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarsePointer = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---------------- stars dots (fond, layer fixed) ---------------- */
  function spawnStars(layer, count) {
    if (!layer) return;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('div');
      s.className = 'star' + (Math.random() > 0.7 ? ' dim' : '');
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 100) + '%';
      s.style.animationDelay = (Math.random() * 3.5) + 's';
      s.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      var size = 1 + Math.random() * 2;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      layer.appendChild(s);
    }
  }

  /* ---------------- sparkles ✦ dorées dans le hero ---------------- */
  function spawnSparkles(host, count) {
    if (!host) return;
    // positions précalées en zones (4 quadrants) pour éviter qu'elles se
    // superposent au burger central. On évite la zone centrale 35-65 % x/y.
    function rand(min, max) { return min + Math.random() * (max - min); }
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.className = 'sparkle-y';
      // tirage en croix : on choisit une zone parmi haut/bas/gauche/droite
      var zone = i % 4;
      var x, y;
      if (zone === 0) { x = rand(5, 95); y = rand(5, 28); }       // haut
      else if (zone === 1) { x = rand(5, 95); y = rand(72, 95); } // bas
      else if (zone === 2) { x = rand(2, 22); y = rand(20, 80); } // gauche
      else { x = rand(78, 98); y = rand(20, 80); }                // droite
      s.style.left = x + '%';
      s.style.top = y + '%';
      var size = 10 + Math.random() * 10;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      s.style.animationDelay = (Math.random() * 1.2) + 's, ' + (1 + Math.random() * 2) + 's';
      host.appendChild(s);
    }
  }

  /* ---------------- 3D burger : suivi souris ----------------
     desktop only. On lit la position de la souris dans le viewport,
     on convertit en orbite cible (theta yaw, phi pitch), et on lerp
     vers cette cible via rAF. Inactivité 1.5s → reprise auto-rotate.
     ------------------------------------------------------------- */
  function attachBurgerMouse() {
    if (prefersReducedMotion || isCoarsePointer) return;

    var mv = document.querySelector('model-viewer.burger-3d');
    if (!mv) return;

    var IDLE_MS = 1500;
    var MAX_YAW = 35;        // degrés
    var MAX_PITCH = 15;      // degrés
    var BASE_RADIUS = '2.2m';
    var LERP = 0.08;

    var targetYaw = 0, targetPitch = 0;
    var curYaw = 0, curPitch = 0;
    var lastMove = 0;
    var auto = true;
    var raf = null;

    function setOrbit(yaw, pitch) {
      mv.cameraOrbit = (yaw.toFixed(2)) + 'deg ' + (90 - pitch).toFixed(2) + 'deg ' + BASE_RADIUS;
    }

    function tick() {
      var now = performance.now();
      if (auto) {
        // auto-rotate géré par model-viewer en interne (auto-rotate attribute)
        raf = requestAnimationFrame(tick);
        return;
      }
      if (now - lastMove > IDLE_MS) {
        // reprise auto-rotate après inactivité
        auto = true;
        mv.setAttribute('auto-rotate', '');
        raf = requestAnimationFrame(tick);
        return;
      }
      curYaw += (targetYaw - curYaw) * LERP;
      curPitch += (targetPitch - curPitch) * LERP;
      setOrbit(curYaw, curPitch);
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      var nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1..1
      var ny = (e.clientY / window.innerHeight) * 2 - 1;  // -1..1
      targetYaw = nx * MAX_YAW;
      targetPitch = -ny * MAX_PITCH;
      lastMove = performance.now();
      if (auto) {
        // synchroniser curYaw avec l'orbite courante avant de prendre la main
        // pour éviter un saut visuel
        var theta = parseFloat(mv.getCameraOrbit().theta) * 180 / Math.PI;
        curYaw = theta;
        curPitch = 0;
        auto = false;
        mv.removeAttribute('auto-rotate');
        if (raf === null) raf = requestAnimationFrame(tick);
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
  }

  /* ---------------- swap 3D → PNG sur touch/mobile ---------------- */
  function swapToFallback() {
    if (!isCoarsePointer && !prefersReducedMotion) return;

    var mv = document.querySelector('model-viewer.burger-3d');
    if (!mv) return;

    var fallback = mv.dataset.fallback;
    var alt = mv.getAttribute('alt') || "Nelly's burger 3D";
    if (!fallback) return;

    var img = document.createElement('img');
    img.className = 'burger-fallback';
    img.src = fallback;
    img.alt = alt;
    img.loading = 'eager';
    img.decoding = 'async';
    mv.replaceWith(img);
  }

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    spawnStars(document.querySelector('.stars'), 70);
    spawnSparkles(document.querySelector('[data-sparkles]'), 12);
    swapToFallback();
    attachBurgerMouse();
  });
})();
