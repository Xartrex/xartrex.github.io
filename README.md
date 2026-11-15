# xartrex.github.io

Personal portfolio of **Alejandro de la Torre**, Cybersecurity & SecDevOps Engineer (Madrid, Spain).

🌐 **Live:** https://xartrex.github.io

## Stack

Plain static site served by GitHub Pages from `main`. No build step.

| File | Purpose |
|---|---|
| `index.html` | Single scrolling page: the room (hero), about, work, projects, contact |
| `index.css` | Styles (colours as CSS variables in `:root`) |
| `index.js` | Lights-on intro, pointer torch, sticky section bar, in-place contact form (vanilla JS, loaded in `<head>`) |
| `404.html`, `404.css`, `404.js` | Custom "lost in space" 404 page ([tsParticles](https://github.com/tsparticles/404-templates)) |
| `assets/` | CV (PDF), `hacker-room.avif` hero photo, favicon, 404 artwork |

External: Google Fonts (Big Shoulders, IBM Plex Sans) and [Formcarry](https://formcarry.com) for the contact form. No JS libraries; icons are inline SVG.

Palette (CSS variables in `index.css`) is taken from the hero photo: night `#07141d`, wall `#0e2431`, lamp `#62d3e6`, ember `#e8894a`, screen `#d8ebf0`, haze `#86a2ad`.

## Machine-readable résumé

For recruiting tools and AI assistants:

- `resume.json`: [JSON Resume](https://jsonresume.org/schema) format plus `meta.keypoints` and `meta.keywords`. **This is the source; edit it.**
- `resume.md`: generated from it. Run `python3 scripts/build_resume.py` after editing the JSON and commit both.
- `llms.txt`: tells AI agents where the résumé lives.
- `.nojekyll`: stops GitHub Pages turning `resume.md` into HTML, so it is served raw.

## Security

The pages ship a Content-Security-Policy (`<meta http-equiv>`): scripts only from this origin (plus jsDelivr on the 404 page), no inline scripts or inline styles, form posts and fetches only to Formcarry. If you add inline `style="…"` or `onclick="…"`, the browser will block it; use a CSS class or `index.js` instead.

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Updating content

- Text lives directly in `index.html`, one `<section class="block">` per section.
- Replace `assets/CV-Alejandro_de_la_Torre_Argota.pdf` to update the resume (keep the name or update the link in the *work* panel).

## Credits

The 404 page comes from [tsParticles' 404 templates](https://github.com/tsparticles/404-templates). An earlier version of the site was based on [fimbo](https://github.com/imfunniee/fimbo) by imfunniee (MIT).
