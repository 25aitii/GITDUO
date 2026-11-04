/* CANDELA STUDIO — navegación, tema y animaciones */
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

    if (themeToggle) {
      themeToggle.addEventListener('click', function () {
        var isDark = document.documentElement.classList.toggle('dark');
        themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', isDark ? '#111111' : '#ffffff');
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

  // jQuery is used when loaded; native fallback avoids breaking the page if its CDN is offline.
  if (window.jQuery) {
    window.jQuery(initCandela);
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCandela);
  } else {
    initCandela();
  }
})();
