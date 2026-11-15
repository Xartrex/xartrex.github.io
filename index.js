// Loaded in <head>: marks the page as scripted before first paint so the room
// can start dark. Everything else waits for the DOM.
(function () {
    'use strict';
    var root = document.documentElement;
    root.classList.add('js');

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Lights on, once the photo is decoded (or after 2.5 s, whatever happens).
    var lit = false;
    function lightsOn() {
        if (lit) return;
        lit = true;
        root.classList.add('lit');
    }
    if (reduceMotion) {
        lightsOn();
    } else {
        var img = new Image();
        img.src = 'assets/hacker-room.avif';
        (img.decode ? img.decode() : Promise.reject()).then(lightsOn, function () {
            img.onload = img.onerror = lightsOn;
        });
        setTimeout(lightsOn, 2500);
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Years of experience, counted from the year in data-years-since.
        // The number in the HTML is the fallback for visitors without JS.
        document.querySelectorAll('[data-years-since]').forEach(function (el) {
            var since = parseInt(el.getAttribute('data-years-since'), 10);
            var years = new Date().getFullYear() - since;
            if (since && years > 0) el.textContent = years;
        });

        var room = document.querySelector('.room');
        var bar = document.getElementById('bar');

        // 2. A torch that follows the pointer (mouse/trackpad only).
        if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
            var frame = 0, px = 0, py = 0;
            room.addEventListener('pointermove', function (e) {
                var r = room.getBoundingClientRect();
                px = e.clientX - r.left;
                py = e.clientY - r.top;
                if (frame) return;
                frame = requestAnimationFrame(function () {
                    frame = 0;
                    room.style.setProperty('--x', px + 'px');
                    room.style.setProperty('--y', py + 'px');
                    room.classList.add('torch-on');
                });
            });
            room.addEventListener('pointerleave', function () { room.classList.remove('torch-on'); });
        }

        // 3. Sticky bar once the room has scrolled away, and the current section in it.
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                bar.classList.toggle('show', !entries[0].isIntersecting);
            }, { rootMargin: '-35% 0px 0px 0px' }).observe(room);

            var links = {};
            bar.querySelectorAll('nav a').forEach(function (a) { links[a.hash.slice(1)] = a; });
            var sections = document.querySelectorAll('main .block');
            var spy = new IntersectionObserver(function (entries) {
                entries.forEach(function (e) {
                    if (!e.isIntersecting) return;
                    Object.keys(links).forEach(function (id) { links[id].removeAttribute('aria-current'); });
                    if (links[e.target.id]) links[e.target.id].setAttribute('aria-current', 'true');
                });
            }, { rootMargin: '-45% 0px -50% 0px' });
            sections.forEach(function (s) { spy.observe(s); });
        } else {
            bar.classList.add('show');
        }

        // 4. Contact form: send in place, say clearly what happened.
        var form = document.getElementById('contact-form');
        var status = document.getElementById('form-status');
        var button = form.querySelector('button[type="submit"]');
        form.addEventListener('submit', function (e) {
            if (!window.fetch) return; // old browsers: normal form post
            e.preventDefault();
            button.disabled = true;
            button.textContent = 'Sending…';
            status.className = 'form-status';
            status.textContent = '';
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            }).then(function (res) {
                return res.json().catch(function () { return {}; }).then(function (data) {
                    if (!res.ok || (data.code && data.code !== 200)) throw new Error(data.message || res.status);
                });
            }).then(function () {
                form.reset();
                status.className = 'form-status ok';
                status.textContent = 'Message sent. I\'ll reply to the email you gave.';
            }).catch(function () {
                status.className = 'form-status error';
                status.textContent = 'The message didn\'t send. Check your connection and try again, or reach me on LinkedIn.';
            }).then(function () {
                button.disabled = false;
                button.textContent = 'Send message';
            });
        });
    });
})();
