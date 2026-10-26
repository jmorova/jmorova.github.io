# Juliana Morozowski — portfolio

A single-page portfolio. Next.js App Router, Tailwind v4, deployed on Vercel.

**To change the text, see [EDITING.md](./EDITING.md).** Everything user-facing
lives in `content/`; no copy is hardcoded in components.

## Running it

```bash
pnpm install
pnpm dev
```

## Structure

```
app/          layout, the single page, fonts.ts, colour tokens in globals.css
components/   section, filmstrip, expandable project rows, theme toggle
content/      all copy and project data  ← edit here
lib/types.ts  the shape of a Project / Experience
public/work/  project images
fonts/        Larsseit woff2 + its licence notice (deliberately not in public/)
```

## Notes on the design

- One centered column, `--col` in `globals.css` sets its width.
- The work strip escapes that column to run full-bleed, and its track is padded
  so the first tile still lines up with the text.
- Tiles share a height and take whatever width their aspect ratio implies, so
  portrait phone screens and wide artboards can sit in the same strip.
- Light only, by choice. Colours are CSS variables on `:root` in `globals.css`;
  there is no theme toggle and no dark palette to keep in sync.

## The typeface

The site is set in **Larsseit** (Type Dynamic), carried over from juliana.pro,
where it was installed as a MyFonts webfont kit licensed to Juliana. Only
weights 400 and 700 exist in that build — don't reference others or the browser
will fake them.

The files live in `fonts/` rather than `public/` so `next/font` serves them
hashed from `/_next/static/media` instead of a guessable URL. **Before pointing
a new domain at this site, read `fonts/LICENSE.txt`** — the build is capped at
20,000 pageviews and MyFonts webfont licences are normally tied to specific
domains.
