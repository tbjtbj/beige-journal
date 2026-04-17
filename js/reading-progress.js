/* Beige Journal — Reading Progress Bar */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var content = document.querySelector('.bj-post-content');
    if (!content) return;

    // Create and inject progress bar
    var bar = document.createElement('div');
    bar.className = 'bj-progress';
    bar.setAttribute('role', 'progressbar');
    bar.setAttribute('aria-valuemin', '0');
    bar.setAttribute('aria-valuemax', '100');
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    function updateProgress() {
      var rect        = content.getBoundingClientRect();
      var scrollTop   = window.scrollY;
      var articleTop  = content.offsetTop;
      var articleH    = content.offsetHeight;
      var windowH     = window.innerHeight;
      var scrolled    = scrollTop - articleTop + windowH * 0.5;
      var pct         = Math.min(Math.max((scrolled / articleH) * 100, 0), 100);
      bar.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // initial call
  });
}());
