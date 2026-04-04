# Astro Portfolio — Spider‑Verse Themed

This folder contains the initial scaffold for a static portfolio built with Astro, Tailwind CSS and a Spider‑Verse inspired theme. It includes a `Layout.astro` with global styles and placeholder pages/sections.

Quick start

```bash
cd astro-portfolio
npm install
npm run dev
```

Notes
- The project uses Tailwind; configuration is in `tailwind.config.cjs`.
- Global styles are at `src/styles/global.css` and include halftone and glitch effects.
- `src/layouts/Layout.astro` is the main layout. `src/pages/index.astro` contains placeholder sections (Hero, Tech stack, Projects, Certifications).
- Next step: integrate Angular islands for the interactive Project Filter (will require `@astrojs/renderer-angular` and a small Angular build setup).
