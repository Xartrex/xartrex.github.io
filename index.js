// Panel navigation (no dependencies). Animations come from animate.css.
(function () {
    'use strict';

    var ANIM_MS = 800;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var PANELS = {
        about:    { show: 'slideInLeft',  hide: 'slideOutLeft' },
        work:     { show: 'slideInRight', hide: 'slideOutRight' },
        projects: { show: 'slideInDown',  hide: 'slideOutUp' },
        contact:  { show: 'slideInUp',    hide: 'slideOutDown' }
    };
    var openPanel = null;
    var opener = null;

    function panel(name) { return document.getElementById(name + '_container'); }

    function animate(el, cls, done) {
        if (reduceMotion) { if (done) done(); return; }
        el.classList.add('animated', cls);
        setTimeout(function () {
            el.classList.remove('animated', cls);
            if (done) done();
        }, ANIM_MS);
    }

    function show(name, trigger) {
        var el = panel(name);
        if (!el || !PANELS[name]) return;
        if (openPanel && openPanel !== name) panel(openPanel).hidden = true;
        opener = trigger || null;
        openPanel = name;
        el.hidden = false;
        el.scrollTop = 0;
        el.querySelector('.close').focus({ preventScroll: true });
        animate(el, PANELS[name].show);
    }

    function hide(name) {
        var el = panel(name);
        if (!el || el.hidden) return;
        openPanel = null;
        animate(el, PANELS[name].hide, function () { el.hidden = true; });
        if (opener && document.body.contains(opener) && opener.offsetParent !== null) opener.focus();
        opener = null;
    }

    document.addEventListener('click', function (e) {
        var o = e.target.closest('[data-open]');
        if (o) { show(o.getAttribute('data-open'), o); return; }
        var c = e.target.closest('[data-close]');
        if (c) hide(c.getAttribute('data-close'));
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openPanel) hide(openPanel);
    });

    // Intro: loader, then the sliding boxes, then the name.
    var loading = document.getElementById('loading');
    var box = document.getElementById('box');
    if (reduceMotion) {
        loading.style.display = 'none';
        box.style.display = 'none';
        document.body.classList.add('no-intro');
        return;
    }
    setTimeout(function () {
        loading.classList.add('animated', 'fadeOut');
        setTimeout(function () { loading.style.display = 'none'; }, 500);
    }, 600);
    setTimeout(function () {
        box.style.display = 'none';
        document.querySelectorAll('.edge').forEach(function (b) { b.classList.remove('animated', 'fadeIn'); });
    }, 2100);
})();
