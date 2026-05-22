/* ============================================================
   Nelly's v7 — Édition du Soir
   - portail magique d'apparition du burger (cloné v6)
   - mouse tracking sur le burger 3D (desktop only)
   - fallback PNG si prefers-reduced-motion
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isCoarsePointer = window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches;

  /* ---------------- portail magique d'apparition du burger ----------------
     Séquence orchestrée :
       - phase 1-2 (CSS seul) : naissance du dot doré (0.3→1.0s) + halo
         qui s'expand (0.6→2.2s) + ring qui s'expand (0.8→2.2s)
       - phase 3 done = ring atteint 100% (t = 2200ms après DOMContentLoaded)
       - phase 4 (reveal) = si glb prêt → on ajoute .revealed sur
         .burger-stage qui : fait fade-in / scale-up le model-viewer +
         flash doré + fade-out portal
       - waiting state : si phase 3 done mais glb pas prêt → on ajoute
         .waiting sur .portal qui maintient ring + halo et pulse
     Cleanup DOM 1.2s après reveal. onReady appelé après le cleanup. */
  function setupPortalReveal(onReady) {
    var stage = document.querySelector('.burger-stage');
    var portal = stage && stage.querySelector('.portal');
    var mv = stage && stage.querySelector('model-viewer.burger-3d');

    if (!stage || !mv) {
      if (portal && portal.parentNode) portal.parentNode.removeChild(portal);
      if (onReady) onReady();
      return;
    }

    if (prefersReducedMotion) {
      if (portal && portal.parentNode) portal.parentNode.removeChild(portal);
      mv.addEventListener('load', function () {
        stage.classList.add('revealed');
        if (onReady) onReady();
      }, { once: true });
      return;
    }

    var PHASE3_END_MS = 2200;
    var phase3Done = false;
    var glbReady = false;
    var revealed = false;

    function reveal() {
      if (revealed) return;
      revealed = true;
      portal.classList.remove('waiting');
      stage.classList.add('revealed');
      setTimeout(function () {
        if (portal.parentNode) portal.parentNode.removeChild(portal);
        if (onReady) onReady();
      }, 1200);
    }

    function check() {
      if (phase3Done && glbReady) reveal();
      else if (phase3Done && !glbReady) portal.classList.add('waiting');
    }

    setTimeout(function () { phase3Done = true; check(); }, PHASE3_END_MS);

    mv.addEventListener('load', function () {
      glbReady = true;
      check();
    }, { once: true });

    // garde-fou : si le glb met plus de 12s à charger, on lance la
    // reveal quand même
    setTimeout(function () {
      if (!revealed) { glbReady = true; check(); }
    }, 12000);
  }

  /* ---------------- 3D burger : suivi souris (desktop) ---------------- */
  function attachBurgerMouse() {
    if (prefersReducedMotion || isCoarsePointer) return;

    var mv = document.querySelector('model-viewer.burger-3d');
    if (!mv) return;

    var IDLE_MS = 1500;
    var MAX_YAW = 32;
    var MAX_PITCH = 14;
    var BASE_RADIUS = '8m';
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
        raf = requestAnimationFrame(tick);
        return;
      }
      if (now - lastMove > IDLE_MS) {
        auto = true;
        mv.setAttribute('auto-rotate', '');
        raf = requestAnimationFrame(tick);
        return;
      }
      curYaw   += (targetYaw   - curYaw)   * LERP;
      curPitch += (targetPitch - curPitch) * LERP;
      setOrbit(curYaw, curPitch);
      raf = requestAnimationFrame(tick);
    }

    function onMove(e) {
      var nx = (e.clientX / window.innerWidth) * 2 - 1;
      var ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetYaw = nx * MAX_YAW;
      targetPitch = -ny * MAX_PITCH;
      lastMove = performance.now();
      if (auto) {
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

  /* ---------------- fallback PNG si prefers-reduced-motion ---------------- */
  function swapToFallback() {
    if (!prefersReducedMotion) return;
    var mv = document.querySelector('model-viewer.burger-3d');
    if (!mv) return;

    var fallback = mv.dataset.fallback;
    var alt = mv.getAttribute('alt') || "Nelly's burger";
    if (!fallback) return;

    var img = document.createElement('img');
    img.className = 'burger-fallback';
    img.src = fallback;
    img.alt = alt;
    img.loading = 'eager';
    img.decoding = 'async';
    mv.replaceWith(img);
  }

  /* ---------------- pause du ticker au hover (atmosphère) ---------------- */
  function attachTickerPause() {
    if (prefersReducedMotion) return;
    var ticker = document.querySelector('.ticker');
    var track = ticker && ticker.querySelector('.ticker-track');
    if (!track) return;

    ticker.addEventListener('mouseenter', function () {
      track.style.animationPlayState = 'paused';
    });
    ticker.addEventListener('mouseleave', function () {
      track.style.animationPlayState = 'running';
    });
  }

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    swapToFallback();
    attachTickerPause();
    setupPortalReveal(function () {
      attachBurgerMouse();
    });
  });
})();
