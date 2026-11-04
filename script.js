<<<<<<< HEAD
/* CANDELA STUDIO — navegación, tema y animaciones con fallback */
(function () {
  function init() {
    const menu = document.getElementById('mobileMenu');
    const menuToggle = document.getElementById('menuToggle');
    const themeToggle = document.getElementById('themeToggle');
    // AOS es una mejora progresiva: la web no depende de que el CDN responda.
    if (window.AOS && typeof window.AOS.init === 'function') {
      window.AOS.init({ duration: 750, once: true, offset: 65, easing: 'ease-out-cubic' });
      document.documentElement.classList.add('aos-ready');
=======
/* js */
$(function () {
  AOS.init({ duration: 750, once: true, offset: 65, easing: 'ease-out-cubic' });

  const $menu = $('#mobileMenu');
  const $menuToggle = $('#menuToggle');
  $menuToggle.on('click', function () {
    const isOpen = !$menu.hasClass('open');
    $menu.toggleClass('open', isOpen).attr('aria-hidden', String(!isOpen));
    $menuToggle.toggleClass('active', isOpen).attr('aria-expanded', String(isOpen));
    $menuToggle.attr('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });
  $menu.find('a').on('click', function () {
    $menu.removeClass('open').attr('aria-hidden', 'true');
    $menuToggle.removeClass('active').attr('aria-expanded', 'false').attr('aria-label', 'Abrir menú');
  });

  const $themeToggle = $('#themeToggle');
  $themeToggle.on('click', function () {
    const isDark = $('html').toggleClass('dark').hasClass('dark');
    $themeToggle.attr('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    $('meta[name="theme-color"]').attr('content', isDark ? '#24251f' : '#f3f0e9');
  });

  // Cierra el menú móvil //
  $(window).on('resize', function () {
    if (window.innerWidth >= 768) {
      $menu.removeClass('open').attr('aria-hidden', 'true');
      $menuToggle.removeClass('active').attr('aria-expanded', 'false');
>>>>>>> 2137f04a20d9a618e9e1c5db31000e65e87f4cab
    }
    if (menu && menuToggle) {
      menuToggle.addEventListener('click', function () {
        const open = !menu.classList.contains('open');
        menu.classList.toggle('open', open);
        menu.setAttribute('aria-hidden', String(!open));
        menuToggle.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      });
      menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', function () {
        menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true');
        menuToggle.classList.remove('active'); menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
      }); });
    }
    if (themeToggle) themeToggle.addEventListener('click', function () {
      const dark = document.documentElement.classList.toggle('dark');
      themeToggle.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', dark ? '#24251f' : '#f3f0e9');
    });
    window.addEventListener('resize', function () { if (window.innerWidth >= 768 && menu && menuToggle) {
      menu.classList.remove('open'); menu.setAttribute('aria-hidden', 'true');
      menuToggle.classList.remove('active'); menuToggle.setAttribute('aria-expanded', 'false');
    }});
  }
  // jQuery se usa si carga; si falla el CDN, hay fallback nativo.
  if (window.jQuery) window.jQuery(init);
  else if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
