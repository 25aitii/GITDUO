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
