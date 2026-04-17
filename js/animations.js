/* Beige Journal — Scroll Animations */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── Card entrance animations ────────────────────────────────
    var cards = Array.from(document.querySelectorAll('.bj-card'));
    if (cards.length && 'IntersectionObserver' in window) {
      var cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var idx = cards.indexOf(entry.target) % 3;
            entry.target.style.transitionDelay = (idx * 80) + 'ms';
            entry.target.classList.add('bj-card--visible');
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

      cards.forEach(function (card) {
        cardObserver.observe(card);
      });
    } else {
      // Fallback: show all cards immediately
      cards.forEach(function (card) {
        card.classList.add('bj-card--visible');
      });
    }

    // ── Section reveal animations ────────────────────────────────
    var reveals = document.querySelectorAll('.bj-reveal');
    if (reveals.length && 'IntersectionObserver' in window) {
      var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('bj-reveal--visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });

      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });
    } else {
      reveals.forEach(function (el) { el.classList.add('bj-reveal--visible'); });
    }

    // ── Lazy image blur-in ───────────────────────────────────────
    document.querySelectorAll('img[loading="lazy"]').forEach(function (img) {
      img.style.filter = 'blur(8px)';
      img.style.transition = 'filter 500ms ease';

      function clearBlur() { img.style.filter = 'blur(0)'; }

      if (img.complete && img.naturalWidth > 0) {
        clearBlur();
      } else {
        img.addEventListener('load', clearBlur, { once: true });
        // Fallback if load event already fired
        setTimeout(function () {
          if (img.complete) clearBlur();
        }, 100);
      }
    });

  });
}());
