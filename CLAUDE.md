# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personal website/portfolio for Trevor Noon built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. It features a Bento-style grid layout and deploys as static files (custom domain: trevornoon.com).

## Development Commands

- **Preview**: Open `index.html` directly in a browser, or `python3 -m http.server`
- **Logo extraction** (rarely needed): `python3 scripts/extract-logos.py` regenerates transparent logo marks in `images/logos/` from the legacy tile PNGs (requires Pillow)

## Architecture

### Core Files
- `index.html` — page shell: head/meta, sidebar, section containers, experience dialog
- `styles.css` — complete design system (CSS custom properties, light/dark via `prefers-color-scheme`)
- `js/data.js` — **all site content lives here** (experience, projects, links, interests)
- `js/site.js` — renders the sections from `data.js` and wires interactions (dialog, shelves, scrollspy, scroll-reveal)

### Content Management — IMPORTANT

Cards are generated in code; there are no Figma-designed tile images anymore.

**To add/edit an experience or link card**, edit `js/data.js`:
1. Drop a transparent logo PNG in `images/logos/` (any reasonable size; it renders ~60px tall)
2. Add an entry with `company`, `role`, `title`, `logo`, `description`, and a `theme`:
   - `theme.bg` — any CSS background (solid color or gradient) for the tile
   - `theme.ink` — `"light"` or `"dark"` text on that background
3. Optional flags: `confidential: true` (veils the tile), `hidden: true` (keeps the entry without rendering it)

**Projects and interests** are image cards in the same file — add an object with `image`, and optionally `title`, `subtitle`, `href`.

Modal descriptions may contain trusted HTML (links). Card names/roles are rendered as plain text.

### Image Organization
```
images/
├── logos/          # Transparent logo marks used by code-generated cards
├── experience/     # LEGACY full-tile PNGs (source material for scripts/extract-logos.py)
├── links/          # LEGACY full-tile PNGs (same)
├── projects/       # Project/publication thumbnails
├── interests/      # Personal photos (keep ≤1000px, compressed)
└── headshot.png    # Profile photo / favicon / og:image
```

New photos should be resized to ≤1000px on the long edge and saved as progressive JPEG (~80 quality) before committing — big camera originals were the main performance problem historically.

### Portal (separate feature)
`portal.html`, `portal-apps.html`, `css/portal*.css`, `js/portal-*.js`, and `api/` are an independent password-gated area deployed on Vercel. Don't touch them when working on the main site.

## Styling Architecture

- All colors/spacing/motion come from CSS custom properties in `:root` (dark theme overrides under `@media (prefers-color-scheme: dark)`)
- Fonts: Space Grotesk (display) + Inter (body), loaded from Google Fonts
- Tiles use per-item `--tile-bg` custom property set from `data.js` themes
- Animations respect `prefers-reduced-motion`

## Deployment

Static hosting (GitHub Pages custom domain trevornoon.com; `vercel.json` exists for the portal's serverless functions). No build process — pushed files are served as-is.

## Development Notes

- Performance matters: keep JavaScript minimal, images compressed, no new dependencies
- All external links use `target="_blank" rel="noopener"`
- Keyboard accessibility: experience tiles are `<button>`s, the modal is a native `<dialog>` (ESC/backdrop close for free)
