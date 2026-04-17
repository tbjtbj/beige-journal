/* Beige Journal — Binge Mechanics (Next Post Takeover + Share Bar) */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── Next Post Takeover ───────────────────────────────────────
    var sentinel = document.querySelector('.bj-post-end-sentinel');
    var takeover = document.getElementById('bj-next-takeover');
    var closeBtn = document.getElementById('bj-next-takeover-close');

    if (sentinel && takeover && 'IntersectionObserver' in window) {
      var dismissed = false;
      var revealTimeout;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (dismissed) return;

          if (entry.isIntersecting) {
            revealTimeout = setTimeout(function () {
              if (!dismissed) {
                takeover.classList.add('bj-next-takeover--visible');
                takeover.removeAttribute('aria-hidden');
                takeover.removeAttribute('tabindex');
              }
            }, 700);
          } else {
            clearTimeout(revealTimeout);
            // Only hide if scrolling back above sentinel
            if (window.scrollY < sentinel.offsetTop - 200) {
              takeover.classList.remove('bj-next-takeover--visible');
            }
          }
        });
      }, { threshold: 0 });

      observer.observe(sentinel);

      // Close button
      if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          dismissed = true;
          clearTimeout(revealTimeout);
          takeover.classList.remove('bj-next-takeover--visible');
          takeover.setAttribute('aria-hidden', 'true');
          takeover.setAttribute('tabindex', '-1');
        });
      }
    }

    // ── Share Bar Visibility ─────────────────────────────────────
    var shareBar = document.getElementById('bj-share-bar');
    if (shareBar) {
      function toggleShareBar() {
        shareBar.classList.toggle('bj-share-bar--visible', window.scrollY > 400);
      }
      window.addEventListener('scroll', toggleShareBar, { passive: true });
    }

  });
}());
