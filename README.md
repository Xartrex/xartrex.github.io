# xartrex.github.io

Personal portfolio of **Alejandro de la Torre**, Cybersecurity & SecDevOps Engineer (Madrid, Spain).

🌐 **Live:** https://xartrex.github.io

## Stack

Plain static site served by GitHub Pages from `main`. No build step.

| File | Purpose |
|---|---|
| `index.html` | Single page: landing, about / work / projects / contact panels |
| `index.css` | Styles (colours as CSS variables in `:root`) |
| `index.js` | Panel navigation and intro animation (vanilla JS, no jQuery) |
| `particles.js`, `app.js` | Background particles ([particles.js](https://vincentgarreau.com/particles.js/), MIT) |
| `404.html`, `404.css`, `404.js` | Custom "lost in space" 404 page ([tsParticles](https://github.com/tsparticles/404-templates)) |
| `assets/` | CV (PDF), background, favicon, 404 artwork |

External: [animate.css](https://animate.style/), [Font Awesome](https://fontawesome.com/), Google Fonts (Josefin Sans), [Formcarry](https://formcarry.com) for the contact form. All CDN stylesheets and scripts are pinned with Subresource Integrity hashes.

## Security

The pages ship a Content-Security-Policy (`<meta http-equiv>`): scripts only from this origin (plus jsDelivr on the 404 page), no inline scripts or inline styles, form posts only to Formcarry. If you add inline `style="…"` or `onclick="…"`, the browser will block it; use a CSS class or `index.js` instead.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Updating content

- Text lives directly in `index.html`, one `<section class="container">` per panel.
- Replace `assets/CV-Alejandro_de_la_Torre_Argota.pdf` to update the resume (keep the name or update the link in the *work* panel).

## Credits

Design based on [fimbo](https://github.com/imfunniee/fimbo) by imfunniee (MIT), via [TheKaushikGoswami's portfolio template](https://github.com/TheKaushikGoswami/thekaushikgoswami.github.io).
