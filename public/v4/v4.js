/* ============================================================
   Nelly's v4 — runtime cyber-sigilism partagé
   sparkles random + constellation par page (data-constellation)
   ============================================================ */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  /* ---------------- constellations ---------------- */
  var CONSTELLATIONS = {
    /* home : 8-pointed sigil star */
    home: {
      stars: [
        [50, 18], [82, 28], [86, 50], [82, 72], [50, 82], [18, 72], [14, 50], [18, 28],
        [50, 50], [62, 36], [38, 36], [62, 64], [38, 64]
      ],
      lines: [
        [0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],[7,8],
        [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
        [9,10],[10,11],[11,12],[12,9]
      ]
    },
    /* menu : burger silhouette */
    menu: {
      stars: [
        [50, 25], [30, 32], [70, 32],
        [22, 45], [50, 42], [78, 45],
        [20, 58], [50, 56], [80, 58],
        [22, 70], [50, 72], [78, 70],
        [30, 82], [50, 85], [70, 82]
      ],
      lines: [
        [0,1],[0,2],[1,3],[2,5],[3,4],[4,5],
        [3,6],[5,8],[6,7],[7,8],
        [6,9],[8,11],[9,10],[10,11],
        [9,12],[11,14],[12,13],[13,14]
      ]
    },
    /* lieu : geographic marker / pin */
    lieu: {
      stars: [
        [50, 18], [38, 32], [62, 32],
        [28, 50], [50, 50], [72, 50],
        [38, 68], [62, 68], [50, 82],
        [20, 70], [80, 70]
      ],
      lines: [
        [0,1],[0,2],[1,3],[2,5],[1,4],[2,4],[3,6],[5,7],[4,6],[4,7],[6,8],[7,8],
        [6,9],[7,10]
      ]
    },
    /* about : minimal radial */
    about: {
      stars: [
        [50, 30], [50, 50], [50, 70],
        [30, 50], [70, 50],
        [36, 36], [64, 36], [36, 64], [64, 64]
      ],
      lines: [
        [0,1],[1,2],[3,1],[1,4],
        [5,1],[6,1],[7,1],[8,1]
      ]
    },
    /* contact : simple X cross */
    contact: {
      stars: [
        [20, 20], [50, 50], [80, 80],
        [20, 80], [80, 20]
      ],
      lines: [
        [0,1],[1,2],[3,1],[1,4]
      ]
    }
  };

  function buildConstellation(svgEl, key) {
    if (!svgEl) return;
    var data = CONSTELLATIONS[key] || CONSTELLATIONS.home;
    var w = window.innerWidth, h = window.innerHeight;
    svgEl.setAttribute('viewBox', '0 0 100 100');
    svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    var ns = 'http://www.w3.org/2000/svg';

    // lignes (rendues d'abord pour être derrière)
    data.lines.forEach(function (l, idx) {
      var a = data.stars[l[0]], b = data.stars[l[1]];
      if (!a || !b) return;
      var line = document.createElementNS(ns, 'line');
      line.setAttribute('class', 'line');
      line.setAttribute('x1', a[0]);
      line.setAttribute('y1', a[1]);
      line.setAttribute('x2', b[0]);
      line.setAttribute('y2', b[1]);
      // longueur approx pour stroke-dasharray
      var dx = b[0] - a[0], dy = b[1] - a[1];
      var len = Math.sqrt(dx*dx + dy*dy);
      line.style.strokeDasharray = len + 'px';
      line.style.strokeDashoffset = len + 'px';
      line.style.animationDelay = (800 + idx * 120) + 'ms';
      svgEl.appendChild(line);
    });

    // étoiles
    data.stars.forEach(function (s, idx) {
      var c = document.createElementNS(ns, 'circle');
      c.setAttribute('class', 'star');
      c.setAttribute('cx', s[0]);
      c.setAttribute('cy', s[1]);
      c.setAttribute('r', 0.55);
      c.style.animationDelay = (idx * 80) + 'ms';
      svgEl.appendChild(c);
    });
  }

  /* ---------------- sigils au hover sur les burger cards ---------------- */
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

  /* ---------------- init ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (prefersReducedMotion) return;

    spawnSparkles(document.querySelector('.sky'), 38);

    var c = document.querySelector('.sky-constellation');
    if (c) {
      var key = document.body.getAttribute('data-page') || 'home';
      buildConstellation(c, key);
    }

    attachSparkleBurst();
  });
})();
