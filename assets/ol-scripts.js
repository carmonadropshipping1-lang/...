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

  function initGaleriaProducto() {
    document.querySelectorAll('.ol-prod-miniaturas').forEach(function (wrap) {
      var botones = wrap.querySelectorAll('.ol-prod-miniatura');
      var principal = wrap.parentElement.querySelector('.ol-prod-imagen-principal img');
      if (!principal) return;
      botones.forEach(function (boton) {
        boton.addEventListener('click', function () {
          var url = boton.getAttribute('data-ol-imagen-grande');
          if (!url) return;
          principal.src = url;
          botones.forEach(function (b) { b.classList.remove('ol-prod-miniatura-activa'); });
          boton.classList.add('ol-prod-miniatura-activa');
        });
      });
    });
  }

  function initSelectorVariantes() {
    document.querySelectorAll('.ol-prod-opciones').forEach(function (contenedor) {
      var raw = contenedor.getAttribute('data-product-json');
      if (!raw) return;
      var variantes;
      try {
        variantes = JSON.parse(raw);
      } catch (e) {
        return;
      }
      var form = contenedor.closest('form');
      if (!form) return;
      var inputId = form.querySelector('input[name="id"]');
      var boton = form.querySelector('button[name="add"]');
      var precioId = contenedor.getAttribute('data-precio-id');
      var precioEl = precioId ? document.getElementById(precioId) : null;
      var grupos = contenedor.querySelectorAll('.ol-prod-opcion-valores');
      var seleccion = [];
      grupos.forEach(function (grupo) {
        var activa = grupo.querySelector('.ol-prod-pastilla-activa');
        seleccion.push(activa ? activa.getAttribute('data-ol-valor') : null);
      });

      var claves = ['option1', 'option2', 'option3'];

      function actualizar() {
        var encontrada = variantes.filter(function (v) {
          return seleccion.every(function (val, i) { return v[claves[i]] === val; });
        })[0];
        if (!encontrada) return;
        inputId.value = encontrada.id;
        if (precioEl && encontrada.price) precioEl.textContent = encontrada.price;
        if (boton) {
          if (encontrada.available === false) {
            boton.setAttribute('disabled', 'disabled');
            boton.textContent = boton.getAttribute('data-texto-agotado') || boton.textContent;
          } else {
            boton.removeAttribute('disabled');
            boton.textContent = boton.getAttribute('data-texto-disponible') || boton.textContent;
          }
        }
      }

      grupos.forEach(function (grupo, indice) {
        grupo.querySelectorAll('.ol-prod-pastilla').forEach(function (pastilla) {
          pastilla.addEventListener('click', function () {
            grupo.querySelectorAll('.ol-prod-pastilla').forEach(function (p) { p.classList.remove('ol-prod-pastilla-activa'); });
            pastilla.classList.add('ol-prod-pastilla-activa');
            seleccion[indice] = pastilla.getAttribute('data-ol-valor');
            actualizar();
          });
        });
      });
    });
  }

  function initBarraEnvioGratis() {
    var UMBRAL = 60; // free shipping threshold, in shop currency major units
    var header = document.querySelector('#CartDrawer .drawer__header');
    if (!header) return;
    var barra = document.getElementById('ol-barra-envio');
    if (!barra) {
      barra = document.createElement('div');
      barra.id = 'ol-barra-envio';
      barra.className = 'ol-barra-envio';
      barra.innerHTML = '<p class="ol-barra-envio-texto"></p><div class="ol-barra-envio-pista"><div class="ol-barra-envio-relleno"></div></div>';
      header.insertAdjacentElement('afterend', barra);
    }
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        var total = cart.total_price / 100;
        var texto = barra.querySelector('.ol-barra-envio-texto');
        var relleno = barra.querySelector('.ol-barra-envio-relleno');
        if (total >= UMBRAL) {
          texto.textContent = "You've unlocked free shipping!";
          relleno.style.width = '100%';
        } else {
          var restante = (UMBRAL - total).toFixed(2);
          texto.textContent = "You're $" + restante + ' away from free shipping';
          relleno.style.width = Math.min((total / UMBRAL) * 100, 100) + '%';
        }
      })
      .catch(function () {});
  }

  function initEventosCarrito() {
    var disparadores = ['#cart-icon-bubble', '.ol-prod-boton', '[name="add"]'];
    disparadores.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) {
        el.addEventListener('click', function () {
          setTimeout(initBarraEnvioGratis, 500);
        });
      });
    });
    var cartDrawerEl = document.querySelector('cart-drawer');
    if (cartDrawerEl) {
      new MutationObserver(function () { initBarraEnvioGratis(); }).observe(cartDrawerEl, { attributes: true, attributeFilter: ['class'] });
    }
    initBarraEnvioGratis();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initCifras();
    initComparadores();
    initFaq();
    initMarquesinas();
    initGaleriaProducto();
    initSelectorVariantes();
    initEventosCarrito();
  });
})();
