# InsightCTRL Website

Marketing site and diagnostic tool for InsightCTRL, an operational advisory firm based in Port Harcourt, Nigeria.

## Stack

- Vite + React 19
- Tailwind CSS v3 (pinned — do not upgrade to v4, it drops `tailwind.config.js`)
- Framer Motion for all animation and transitions
- React Router v6

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint` (oxlint).

## Structure

- `src/pages/` — one file per route: Home, About, Diagnostic, Projects, Thinking, Book
- `src/components/` — shared UI, including the five animated visuals (`HeroArc`, `ChaosToArc`, `DiagnosticGauge`, `BlueprintGrid`, `ThinkPieceSkeletons`)
- `src/data/diagnosticStages.js` — the seven-stage diagnostic content (questions, scoring, result copy)
- `src/hooks/useTheme.jsx` — dark/light mode, persisted to `localStorage`, defaults to dark
- `src/hooks/useSubstackFeed.js` — fetches and parses the Substack RSS feed for the Thinking page via `/api/substack-feed`, with an 8s timeout that falls through to the empty state
- `netlify/functions/substack-feed.mjs` — Netlify function (served at `/api/substack-feed` via `public/_redirects`) that fetches the Substack feed server-side, since Substack's feed endpoint doesn't send CORS headers and can't be fetched directly from the browser
- `src/constants/links.js` — Tally form URLs, social links, Substack RSS URL, contact email
- `scripts/shot.mjs` — Puppeteer screenshot utility for visual QA; see flags at the top of the file (`SHOT_WIDTH`, `SHOT_HEIGHT`, `SHOT_THEME`, `SHOT_MOCK_FEED`, `SHOT_HANG_FEED`)

## Theming

Colors, borders, and other design tokens are CSS custom properties in `src/index.css`, keyed on `[data-theme="dark"]` / `[data-theme="light"]` and mapped to Tailwind color names in `tailwind.config.js`. A pre-paint script in `index.html` reads the stored theme before first render so there's no flash.

## Fonts

Satoshi (variable weight) is self-hosted at `public/fonts/Satoshi-Variable.woff2` and preloaded in `index.html`. No other font should be introduced.

## Pre-launch checklist

- [x] Tally form URL wired into `IntakeButton` via `constants/links.js`
- [x] Social links verified (X, LinkedIn, Substack)
- [x] Substack RSS confirmed working, with proxy fallback for CORS failures
- [x] Mobile nav tested at 375px
- [x] Logo renders correctly in nav (both themes) and favicon
- [ ] Chibueze to review and approve final copy on all pages
- [ ] Deploy: hosted on Netlify from the GitHub repo

## Post-launch (not in scope yet)

- Custom domain (insightctrlhq.com)
- Google Workspace email aligned to the domain
- Rereandco full case study
- SEO meta tags / Open Graph images per page
- Privacy-first analytics (Plausible or similar)
