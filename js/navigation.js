/* Beige Journal — Navigation */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── Sticky nav ──────────────────────────────────────────────
    var nav = document.getElementById('bj-nav');
    if (nav) {
      function handleNavScroll() {
        nav.classList.toggle('bj-nav--scrolled', window.scrollY > 80);
      }
      window.addEventListener('scroll', handleNavScroll, { passive: true });
      handleNavScroll(); // run immediately on load
    }

    // ── Mobile hamburger ─────────────────────────────────────────
    var toggle = document.getElementById('bj-menu-toggle');
    var menu   = document.getElementById('bj-primary-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.classList.toggle('bj-menu-open', isOpen);
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });
      // Close on Escape
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('bj-menu-open');
          toggle.focus();
        }
      });
      // Close on outside click
      document.addEventListener('click', function (e) {
        if (nav && !nav.contains(e.target) && menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('bj-menu-open');
        }
      });
    }

  });
}());
