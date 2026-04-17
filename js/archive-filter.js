/* Beige Journal — Archive Filter */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var filterBtns = document.querySelectorAll('.bj-filter-btn');
    var cards      = document.querySelectorAll('.bj-card');

    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {

        // Update active state
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        var filter = btn.dataset.filter || 'all';

        cards.forEach(function (card) {
          var rt   = parseInt(card.dataset.readtime || '5', 10);
          var show = true;

          if (filter === 'long')  show = rt >= 8;
          if (filter === 'quick') show = rt <= 4;

          card.style.transition = 'opacity 280ms ease, transform 280ms ease';

          if (!show) {
            card.style.opacity       = '0';
            card.style.transform     = 'scale(0.97)';
            card.style.pointerEvents = 'none';
            card.setAttribute('aria-hidden', 'true');
          } else {
            card.style.opacity       = '1';
            card.style.transform     = 'scale(1)';
            card.style.pointerEvents = 'auto';
            card.removeAttribute('aria-hidden');
          }
        });
      });
    });
  });
}());
