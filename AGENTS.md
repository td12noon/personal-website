# AGENTS.md

## Cursor Cloud specific instructions

This repo has two independent parts:

1. **Main static site** (the primary product): vanilla HTML/CSS/JS in `index.html`, `styles.css`, and `js/` — no build step. Content lives in `js/data.js`; rendering/interactions in `js/site.js`.
2. **Portal** (separate, password-gated feature): `portal*.html`, `css/portal*.css`, `js/portal-*.js`, and the Vercel serverless function in `api/auth/portal-login.js`.

### Running

- Serve the static site from the repo root: `python3 -m http.server 8000`, then open `http://localhost:8000/`. There is no bundler/build; files are served as-is. Core interaction: clicking an Experience tile opens a native `<dialog>` modal.
- The portal's documented dev command is `npm run dev` (`vercel dev`). Note: the plain `python3 -m http.server` static server does NOT execute the `/api/*` serverless functions, so the portal login form will fail against it — use `vercel dev` for the portal.
- `vercel dev` requires the Vercel CLI (not preinstalled here) and Vercel account login/project link, plus the env vars `PORTAL_PASSWORD_HASH` (a bcrypt hash from `scripts/generate-portal-hash.js`) and `JWT_SECRET`. Without these it returns `SYSTEM NOT CONFIGURED` / `SYSTEM ERROR`.

### Testing / linting

- There are no automated test or lint frameworks configured (the only npm script is `dev`).
- The npm dependencies (`bcryptjs`, `jsonwebtoken`) are used only by the portal serverless function, not by the main static site.
