/* Beige Journal — Page Transitions */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    function shouldTransition(link) {
      return (
        link.hostname === location.hostname &&
        !link.href.includes('#') &&
        !link.href.includes('/wp-admin') &&
        !link.href.includes('/wp-login') &&
        link.href !== location.href &&
        link.target !== '_blank' &&
        !link.hasAttribute('download')
      );
    }

    if (typeof document.startViewTransition === 'function') {
      // View Transitions API
      document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link || !shouldTransition(link)) return;
        var href = link.href;
        e.preventDefault();
        document.startViewTransition(function () {
          return new Promise(function (resolve) {
            location.href = href;
            // Resolve will happen on next page load
            window.addEventListener('load', resolve, { once: true });
          });
        });
      });
    } else {
      // Fallback: manual fade out
      document.addEventListener('click', function (e) {
        var link = e.target.closest('a[href]');
        if (!link || !shouldTransition(link)) return;
        var href = link.href;
        e.preventDefault();
        document.body.style.transition = 'opacity 200ms ease';
        document.body.style.opacity = '0';
        setTimeout(function () { location.href = href; }, 210);
      });
      // Fade in on load
      document.body.style.opacity = '0';
      window.addEventListener('load', function () {
        document.body.style.transition = 'opacity 300ms ease';
        document.body.style.opacity = '1';
      });
    }

  });
}());
