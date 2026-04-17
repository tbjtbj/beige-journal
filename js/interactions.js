/* Beige Journal — Micro-interactions */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    // ── Save / Bookmark toggle ────────────────────────────────────
    document.querySelectorAll('.bj-card__save').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var saved = btn.classList.toggle('is-saved');
        btn.setAttribute('aria-pressed', String(saved));
        btn.textContent = saved ? '♥' : '♡';
        btn.title = saved ? 'Unsave' : 'Save for later';

        // Ripple effect
        var ripple = document.createElement('span');
        ripple.className = 'bj-ripple';
        ripple.setAttribute('aria-hidden', 'true');
        btn.appendChild(ripple);
        setTimeout(function () {
          if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
        }, 600);
      });
    });

    // ── Copy link button ──────────────────────────────────────────
    document.querySelectorAll('.bj-copy-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var url = btn.dataset.url || location.href;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function () {
            showCopied(btn);
          }).catch(function () {
            fallbackCopy(url, btn);
          });
        } else {
          fallbackCopy(url, btn);
        }
      });
    });

    function showCopied(btn) {
      var svg = btn.innerHTML;
      btn.textContent = '✓';
      btn.title = 'Copied!';
      setTimeout(function () {
        btn.innerHTML = svg;
        btn.title = 'Copy link';
      }, 2200);
    }

    function fallbackCopy(text, btn) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand('copy');
        showCopied(btn);
      } catch (err) {}
      document.body.removeChild(ta);
    }

  });
}());
