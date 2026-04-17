/* Beige Journal — Search Overlay */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var openBtns = document.querySelectorAll('.bj-nav-search-btn');
    var overlay  = document.getElementById('bj-search-overlay');
    var closeBtn = document.getElementById('bj-search-close');
    var input    = overlay ? overlay.querySelector('input[type="search"]') : null;

    if (!overlay) return;

    function openOverlay() {
      overlay.classList.add('bj-search-overlay--open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.querySelectorAll('.bj-nav-search-btn').forEach(function(b){
        b.setAttribute('aria-expanded', 'true');
      });
      setTimeout(function () { if (input) input.focus(); }, 60);
    }

    function closeOverlay() {
      overlay.classList.remove('bj-search-overlay--open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.querySelectorAll('.bj-nav-search-btn').forEach(function(b){
        b.setAttribute('aria-expanded', 'false');
      });
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', openOverlay);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('bj-search-overlay--open')) {
        closeOverlay();
      }
    });

    // Click backdrop to close
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeOverlay();
    });
  });
}());
