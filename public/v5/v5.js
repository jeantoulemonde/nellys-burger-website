/* ============================================================
   Nelly's v5 — runtime y2k / frutiger aero
   - étoiles scintillantes (spawn random)
   - globe cliquable (zoom toggle) avec keyboard support
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- stars ---------------- */
  function spawnStars(layer, count) {
    if (!layer) return;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('div');
      s.className = 'star' + (Math.random() > 0.78 ? ' cyan' : '');
      s.style.left = (Math.random() * 100) + '%';
      s.style.top = (Math.random() * 100) + '%';
      s.style.animationDelay = (Math.random() * 3) + 's';
      s.style.animationDuration = (2 + Math.random() * 3) + 's';
      var size = 1 + Math.random() * 2;
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      layer.appendChild(s);
    }
  }

  /* ---------------- globe zoom ---------------- */
  function attachGlobeZoom() {
    var stage = document.getElementById('globeStage');
    if (!stage) return;

    function toggle() { stage.classList.toggle('zoom'); }
    stage.addEventListener('click', toggle);
    stage.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  }

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var skyCount = prefersReducedMotion ? 40 : 90;
    spawnStars(document.querySelector('.stars'), skyCount);
    attachGlobeZoom();
  });
})();
