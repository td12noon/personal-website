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
1. Drop a transparent logo (PNG or SVG) in `images/logos/` (any reasonable size; it renders ~60px tall)
2. Add an entry with `company`, `role`, `title`, `logo`, `description`, and a `theme`:
   - `theme.bg` — any CSS background (solid color or gradient) for the tile
   - `theme.ink` — `"light"` or `"dark"` text on that background
3. Optional flags: `confidential: true` (veils the tile), `hidden: true` (keeps the entry without rendering it)

**Projects and interests** are image cards in the same file — add an object with `image`, and optionally `title`, `subtitle`, `href`. Use `alt` instead of `title` for a linked card that shouldn't show a visible caption (e.g. when the artwork already contains the title). An `href` starting with `http` opens in a new tab; a relative `href` (like `projects/forage/`) opens in place.

Modal descriptions may contain trusted HTML (links). Card names/roles are rendered as plain text.

`llms.txt` (served at trevornoon.com/llms.txt for AI assistants) is a hand-written plain-text mirror of the hero copy and `js/data.js`. When you change experience, projects, links, or the headline, update it too. Leave out `hidden` entries.

### Project pages

Every project card opens its own static page at `projects/<slug>/index.html`, styled by the shared `projects/project.css`:
- **Builds** (Forage, Form, SitterBot, E Source) are one-pagers: a colored band with the title, one-line summary and facts, two screenshots, then *The problem / Why I built it / What it does / What it's changed for me*. Copy is written in Trevor's voice (no em dashes). Each page sets its look with `<body class="project project-<slug>">`; add a matching theme block (band colors, display font, link color, dark-mode link color) near the top of `project.css`.
- **Guides** (OpenAI Model Selection Guide, Securing MCPs) are reader views (`<body class="reader">`) with the full text and a "Read the original" link at the top and bottom.
- Screenshots live in `images/projects/<slug>/` as WebP (desktop ~2000px wide or less, phone ~780px). Use sample data, never real people's details. Each build page also has a 1200×630 `og.jpg` for link previews.
- Pages use relative links (`../../`, `../project.css`) so they work from the file system and on any host.
- Project pages follow the homepage theme picker: each page has the same inline pre-paint script in `<head>`, and every dark block in `project.css` exists twice (OS setting and `:root[data-theme="dark"]`), same rule as `styles.css`.

**Interests → favorites** cards link to the public Forage lists (`https://forage.trevornoon.com/favorites?kind=<kind>`). The site shows Films, Books and Newsletters (`film`, `book`, `newsletter`); Forage also has `album`, `series`, `podcast`, `article` and `channel` lists. Card artwork is in `images/interests/favorites/`, cut from Forage's orchard engraving (cards for the other kinds are in git history at commit c0e220a).

### Image Organization
```
images/
├── logos/          # Transparent logo marks used by code-generated cards
├── experience/     # LEGACY full-tile PNGs (source material for scripts/extract-logos.py)
├── links/          # LEGACY full-tile PNGs (same)
├── projects/       # Project card thumbnails; <slug>/ folders hold each project page's screenshots
├── interests/      # Personal photos (keep ≤1000px, compressed); favorites/ holds the Forage favorites cards
└── headshot.png    # Profile photo / favicon / og:image
```

New photos should be resized to ≤1000px on the long edge and saved as progressive JPEG (~80 quality) before committing — big camera originals were the main performance problem historically.

### Portal (separate feature)
`portal.html`, `portal-apps.html`, `css/portal*.css`, `js/portal-*.js`, and `api/` are an independent password-gated area deployed on Vercel. Don't touch them when working on the main site.

## Styling Architecture

- All colors/spacing/motion come from CSS custom properties in `:root`. Dark tokens are defined twice and must stay identical: under `@media (prefers-color-scheme: dark)` (follows the OS) and under `:root[data-theme="dark"]` (set by the sidebar light/dark picker, saved in `localStorage.theme` only when it differs from the OS, applied before first paint by an inline script in `<head>`)
- Fonts: Space Grotesk (display) + Inter (body), loaded from Google Fonts
- Tiles use per-item `--tile-bg` custom property set from `data.js` themes
- Animations respect `prefers-reduced-motion`

## Deployment

Static hosting (GitHub Pages custom domain trevornoon.com; `vercel.json` exists for the portal's serverless functions). No build process — pushed files are served as-is.

## Development Notes

- Performance matters: keep JavaScript minimal, images compressed, no new dependencies
- All external links use `target="_blank" rel="noopener"`
- Keyboard accessibility: experience tiles are `<button>`s, the modal is a native `<dialog>` (ESC/backdrop close for free)
