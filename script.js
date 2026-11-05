
(function () {
  'use strict';

  function initCandela() {
    var menu = document.getElementById('mobileMenu');
    var menuToggle = document.getElementById('menuToggle');
    var themeToggle = document.getElementById('themeToggle');

    // AOS only enhances the page. If unavailable, CSS keeps every section visible.
    if (window.AOS && typeof window.AOS.init === 'function') {
      try {
        window.AOS.init({
          duration: 750,
          once: true,
          offset: 65,
          easing: 'ease-out-cubic'
        });
        document.documentElement.classList.add('aos-ready');
      } catch (error) {
        document.documentElement.classList.remove('aos-ready');
      }
    }

    function closeMenu() {
      if (!menu || !menuToggle) return;
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menú');
    }

    if (menu && menuToggle) {
      menuToggle.addEventListener('click', function () {
        var open = !menu.classList.contains('open');
        menu.classList.toggle('open', open);
        menu.setAttribute('aria-hidden', String(!open));
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      });

      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) closeMenu();
      });
    }

    // Recuperar el tema que eligió anteriormente el usuario
var savedTheme = localStorage.getItem('candela-theme');

if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Actualizar el botón y el color del navegador
function updateTheme() {
  var isDark = document.documentElement.classList.contains('dark');

  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'
    );
  }

  var meta = document.querySelector('meta[name="theme-color"]');

  if (meta) {
    meta.setAttribute('content', isDark ? '#111111' : '#ffffff');
  }
}

updateTheme();

// Cambiar el tema únicamente cuando el usuario pulse el botón
if (themeToggle) {
  themeToggle.addEventListener('click', function () {
    var isDark = document.documentElement.classList.toggle('dark');

    // Guardar la elección
    localStorage.setItem('candela-theme', isDark ? 'dark' : 'light');

    updateTheme();
  });
}

    // Native in-page links: prevent the browser from leaving the page at a stale scroll position.
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href').slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#' + id);
        }
      });
    });
  }

  
  if (window.jQuery) {
    window.jQuery(initCandela);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCandela);
  } else {
    initCandela();
  }
})();





(function () {

  const form = document.getElementById('bookingForm');

  
  if (!form) return;

  const feedback = document.getElementById('formFeedback');
  const summary = document.getElementById('requestSummary');
  const copyButton = document.getElementById('copyRequest');
  const dateInput = document.getElementById('date');

  
  const today = new Date();

  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60000
  ).toISOString().slice(0, 10);

  dateInput.min = localToday;

  let requestText = '';

 
  form.addEventListener('submit', function (event) {

    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    requestText = [
      'SOLICITUD DE CITA — CANDELA STUDIO',
      'Nombre: ' + data.get('name'),
      'Email: ' + data.get('email'),
      'Tipo de tatuaje: ' + (data.get('tattooType') || 'No especificado'),
      'Zona del cuerpo: ' + (data.get('bodyZone') || 'No especificada'),
      'Fecha preferida: ' + data.get('date'),
      'Hora preferida: ' + data.get('time'),
      'Idea: ' + (data.get('details') || 'Pendiente de comentar')
    ].join('\n');

    summary.textContent = requestText;

    feedback.hidden = false;

    feedback.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest'
    });

  });

  
  copyButton.addEventListener('click', async function () {

    try {

      await navigator.clipboard.writeText(requestText);

      copyButton.textContent = 'Solicitud copiada ✓';

    } catch (error) {

      copyButton.textContent =
        'No se pudo copiar. Selecciona el texto.';

    }

  });

})();
