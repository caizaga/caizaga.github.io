# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional portfolio for Carlos Aizaga (Quantitative Economist & Data Scientist), deployed via GitHub Pages at `carlosaizaga.com`. Pure static HTML/CSS/JS — no build step, no framework, no Jekyll processing.

## Architecture

```
caizaga.github.io/
├── index.html          ← Single-page portfolio (all 8 sections)
├── CNAME               ← Custom domain: carlosaizaga.com
├── .nojekyll           ← Disables Jekyll so GitHub Pages serves files as-is
├── Assets/
│   ├── css/style.css   ← Full design system (CSS variables, all section styles)
│   ├── js/main.js      ← AOS init, Typed.js, navbar, counters, skill bar animation
│   ├── CV_CARLOS_AIZAGA_.pdf
│   └── CV_CARLOS_AIZAGA_.pdf
└── README.md           ← GitHub display only (not the live site)
```

**CDN dependencies (loaded in index.html):**
- Google Fonts: Inter + Fira Code
- Font Awesome 6 Free
- AOS 2.3.4 (scroll animations)
- Typed.js 2.1.0 (hero typewriter)

## Design System

CSS custom properties defined in `:root` in `style.css`:
- `--bg: #0d1117` / `--surface: #161b22` / `--surface-2: #1c2333`
- `--accent: #00d4ff` (all highlights, CTAs, tags)
- `--font-sans: 'Inter'` / `--font-mono: 'Fira Code'`

## Content Updates

- **All site content**: Edit `index.html`
- **Styles**: Edit `Assets/css/style.css`
- **Animations/interactions**: Edit `Assets/js/main.js`
- **Profile photos**: `Assets/Foto_Logo (1).png` (476×476, current). Note: URL-encode as `Foto_Logo%20(1).png` in HTML src attributes.
- **CV file**: `Assets/CV_CARLOS_AIZAGA_.pdf`

## Custom Domain DNS (Namecheap)

A Records (Host: `@`): `185.199.108.153`, `.109.153`, `.110.153`, `.111.153`
CNAME (Host: `www`, Value: `caizaga.github.io`)

After DNS propagates: GitHub repo → Settings → Pages → Custom domain → enable HTTPS.
