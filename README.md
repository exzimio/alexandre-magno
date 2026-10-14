# alexandre-magno.vercel.app

My personal site: one page with the three products I build (DocOps, TenderOS, MeasureX), a playable game (Órbita, embedded from itch.io), and a short background. English at `/`, Portuguese (pt-PT) at `/pt/`.

Built with Astro and TypeScript as a static site. No tracking, no cookies, and it works without JavaScript; the only script loads the game when the visitor presses Play.

## Data from GitHub

The strip with the last commit, the DocOps CI status, its test count and the commits in the last 90 days is read from the public GitHub API at build time, without a token. If the API fails or the anonymous rate limit is spent, the build uses the last reading saved in `src/data/github-cache.json` and the page shows that reading's date.

## Running it

Requires Node 22.12 or newer.

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # type check
npm run build    # static output in dist/
npm run preview
```

## Content

Texts for both languages, the product list and the links are in `src/data/content.ts`. Screenshots are in `src/assets/` and are converted to AVIF and WebP at build time.

---

© 2026 Alexandre Magno. All rights reserved.
