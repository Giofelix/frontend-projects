# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Watch SCSS and compile to build/css (raw sass CLI)
npm run sass

# Compile CSS once via Gulp
npm run css

# Watch SCSS and JS for changes via Gulp
npm run dev

# Run full Gulp pipeline: JS copy → CSS compile → watch
npm run allTools
```

The compiled output goes to `build/css/app.css` and `build/js/app.js`. The `index.html` references both paths.

## Architecture

This is a static music festival landing page. There is no bundler or framework — just SCSS compiled to CSS and vanilla JS copied to the build folder.

**Entry points:**
- `index.html` — single HTML file; loads `build/css/app.css` and `src/js/app.js` directly (note: JS is referenced from `src/`, not `build/`)
- `src/scss/app.scss` — SCSS root; uses `@forward` to pull in `base/` and `layout/`
- `src/js/app.js` — all JavaScript; no modules

**SCSS structure (`src/scss/`):**
- `base/_variables.scss` — color palette, font, and breakpoint variables (`$telefono`, `$tablet`, `$desktop`, `$desktopXL`)
- `base/_mixins.scss` — responsive mixins (`@include m.tablet { ... }`) and layout helpers (`grid`, `contenedor`, `resetear-lista`)
- `base/_globales.scss` — global resets and base element styles
- `layout/_*.scss` — one file per page section (header, footer, video, lineup, galeria, boletos, festival)

**JS behavior (`src/js/app.js`):**
- `navegacionFija()` — adds `.fixed` class to `.header` once `.sobre-festival` scrolls past viewport
- `resaltarEnlace()` — adds `.active` to nav links based on current scroll position
- `crearGaleria()` — dynamically creates 16 `<img>` elements in `.galeria-imagenes` from `src/img/gallery/full/`
- `mostrarImagen(i)` / `cerrarModal()` — lightbox modal with fade-out animation on close
- `scrollNav()` — smooth scroll on nav link clicks

**Responsive approach:** mobile-first via mixins. All breakpoints are defined in `_variables.scss` and exposed through mixins in `_mixins.scss`. Always use the mixins, not raw `@media` queries.
