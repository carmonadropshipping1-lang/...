(function () {
  'use strict';

  function initReveal() {
    var els = document.querySelectorAll('.ol-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('ol-visible'); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('ol-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach(function (el) { observer.observe(el); });
  }

  function initCifras() {
    var els = document.querySelectorAll('[data-ol-cifra]');
    if (!els.length) return;
    var animated = new WeakSet();
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || animated.has(entry.target)) return;
          animated.add(entry.target);
          var el = entry.target;
          var target = parseFloat(el.getAttribute('data-ol-cifra')) || 0;
          var suffix = el.getAttribute('data-ol-sufijo') || '';
          var duration = 1400;
          var start = null;
          function step(ts) {
            if (start === null) start = ts;
            var progress = Math.min((ts - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var value = target * eased;
            el.textContent = (Number.isInteger(target) ? Math.round(value) : value.toFixed(1)) + suffix;
            if (progress < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4 }
    );
    els.forEach(function (el) { observer.observe(el); });
  }

  function initComparadores() {
    var comparadores = document.querySelectorAll('.ol-comparador');
    comparadores.forEach(function (comp) {
      var despues = comp.querySelector('.ol-comparador-despues');
      var linea = comp.querySelector('.ol-comparador-linea');
      var asa = comp.querySelector('.ol-comparador-asa');
      if (!despues || !linea || !asa) return;
      var dragging = false;

      function setPos(clientX) {
        var rect = comp.getBoundingClientRect();
        var pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1) * 100;
        despues.style.width = pct + '%';
        linea.style.left = pct + '%';
        asa.style.left = pct + '%';
      }

      setPos(comp.getBoundingClientRect().left + comp.getBoundingClientRect().width / 2);

      comp.addEventListener('pointerdown', function (e) { dragging = true; setPos(e.clientX); });
      window.addEventListener('pointermove', function (e) { if (dragging) setPos(e.clientX); });
      window.addEventListener('pointerup', function () { dragging = false; });
      comp.addEventListener('touchmove', function (e) {
        if (e.touches && e.touches[0]) setPos(e.touches[0].clientX);
      }, { passive: true });
    });
  }

  function initFaq() {
    var items = document.querySelectorAll('.ol-faq-item');
    items.forEach(function (item) {
      var btn = item.querySelector('.ol-faq-pregunta');
      var respuesta = item.querySelector('.ol-faq-respuesta');
      if (!btn || !respuesta) return;
      btn.addEventListener('click', function () {
        var abierto = item.getAttribute('data-abierto') === 'true';
        item.setAttribute('data-abierto', abierto ? 'false' : 'true');
        respuesta.style.maxHeight = abierto ? '0px' : respuesta.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', abierto ? 'false' : 'true');
      });
    });
  }

  function initMarquesinas() {
    var tracks = document.querySelectorAll('.ol-marquesina-track');
    tracks.forEach(function (track) {
      if (track.dataset.olDuplicated) return;
      track.dataset.olDuplicated = 'true';
      var original = track.innerHTML;
      track.innerHTML = original + original;
      var duration = track.getAttribute('data-ol-duracion') || '32s';
      track.style.animationDuration = duration;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCifras();
    initComparadores();
    initFaq();
    initMarquesinas();
  });
})();
