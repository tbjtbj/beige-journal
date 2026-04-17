/* Beige Journal — Hero Parallax */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var hero = document.querySelector('.bj-hero');
    var img  = hero ? hero.querySelector('.bj-hero__image') : null;
    if (!hero || !img) return;

    var heroHeight = hero.offsetHeight;

    function onScroll() {
      var scrolled = window.scrollY;
      if (scrolled < heroHeight * 1.5) {
        img.style.transform = 'scale(1.05) translateY(' + (scrolled * 0.18) + 'px)';
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // Update heroHeight on resize
    window.addEventListener('resize', function () {
      heroHeight = hero.offsetHeight;
    }, { passive: true });
  });
}());
