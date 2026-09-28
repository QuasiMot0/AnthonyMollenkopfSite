# anthony-portfolio

My personal site: a computer-vision-themed portfolio built with React and Vite.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Where things live

| What | File |
| --- | --- |
| All text, links, skills, projects, interests | `src/data.js` |
| Project artwork (edge view / rgb view SVGs) and hover animations | `src/components/Art.jsx` |
| Hero, About, Contact, header | `src/components/Sections.jsx` |
| Project cards | `src/components/Projects.jsx` |
| Interest cards (wave + cube hover animations) | `src/components/Interests.jsx` |
| Cursor detection box (set `JITTER` to turn the wobble off) | `src/components/CursorTracker.jsx` |
| Colors, layout, responsive rules | `src/styles.css` |
| Resume PDF | `public/resume.pdf` |

## To do

- Replace the placeholder project drawings with real screenshots.
- Make the GDRankingGame repo public so its link works.

## Deploy

**Vercel (easiest):** push this folder to a GitHub repo, then import it at vercel.com/new.
Vite is detected automatically (build: `npm run build`, output: `dist`).

**GitHub Pages:** set `base: '/<repo-name>/'` in `vite.config.js`, run `npm run build`,
and publish `dist/` (for example with the `gh-pages` package).
