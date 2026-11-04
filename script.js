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
    }
  });
});
