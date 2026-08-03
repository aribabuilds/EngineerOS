# Ariba Anjum - portfolio

Personal portfolio site. One job: convert a cold profile view into a first-round
interview for a Werkstudent / junior AI-or-software engineering role in Germany.

**Homepage is complete.** `/work/briefpilot` and `/about` are scaffolded - they
render real structure with verbatim facts, and mark every missing piece with a
visible `TODO: owner to provide` block rather than inventing content.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- **3D hero** - `@react-three/fiber` + `@react-three/drei` (Three.js),
  dynamically imported (`ssr: false`) so it never blocks first paint
- **Self-hosted fonts** via `@fontsource` - Newsreader (headings, serif with
  a real italic) / Manrope (body/UI) / Geist Mono (code). No Google Fonts
  hotlinking.
- **Theming** - light + dark via `data-theme` on `<html>` + CSS variables.
  Respects `prefers-color-scheme` on first load; manual toggle in the header.
  Falls back to in-memory + system preference if `localStorage` is unavailable.
- **i18n-ready** - all copy lives behind keys in `src/i18n`. English ships now;
  `de` is a stub that deep-merges over English (missing keys fall back).
- **No analytics.** If you want it later, use cookieless only (Plausible / Umami).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

Requires Node 18.18+ (developed on Node 22).

## Deploy

Static-friendly Next.js app. Deploy to any Node host or a platform with Next.js
support (Vercel, Netlify, a self-hosted Node server, etc.).

- The footer reads **"Built by hand · hosted in the EU."** The "hosted in the EU"
  clause only renders when `HOSTED_IN_EU` is `true` in `src/lib/site.ts`. If you
  deploy **outside** the EU, set it to `false` - the line must be honest.
- Set the real production domain in `SITE_URL` (`src/lib/site.ts`). It drives
  `<title>`/OpenGraph metadata, `sitemap.xml`, `robots.txt`, and JSON-LD.

Git: the default branch is **`main`**.

```bash
git init
git add .
git commit -m "Initial portfolio build"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Before launch - placeholders to fill (build brief §11)

Grep the repo for `PLACEHOLDER` and `TODO(owner)` / `TODO: owner`. The list:

| What | Where | Notes |
| --- | --- | --- |
| **Booking URL** | `BOOKING_URL` in `src/lib/site.ts` | Real Cal.com / Calendly link. Until set, the "Book a call" button is **hidden** (not broken). |
| **CV PDF** | `public/ariba-anjum-cv.pdf` | Served at `/ariba-anjum-cv.pdf`. Until added, the CV links 404 - expected. |
| **OG image** | `public/og.png` | Exactly 1200×630. |
| **Site domain** | `SITE_URL` in `src/lib/site.ts` | Replaces the placeholder domain everywhere. |
| **German copy** | `src/i18n/de.ts` | Currently an empty stub; fill keys to translate. |
| **Case study detail** | `/work/briefpilot` | Architecture diagram, screen-recording, the "hard part", ADR-0003 + photo quality-gate decision bodies, role/AI section. |
| **About narrative** | `/about` | "The person" section. |

Optional: a favicon - drop `src/app/icon.png` (or `icon.svg`) and Next.js picks
it up automatically.

## Design notes

### Two signature motifs

- **Extraction annotation** (`ExtractionTag`) - a thin blue-outlined box with a
  tiny uppercase mono label, echoing an OCR bounding box on a scanned letter.
  **Sharp corners are intentional** - do not round them.
- **Decision Card** (`DecisionCard`) - dark header bar (mono, accent dot) reading
  `Decision · <project> · <ADR>`, then Chose / Rejected / Cost / Why rows. The
  "Why" value is in italic display face. One on the homepage; the full set lives
  on the case study.

### The 3D hero

`src/components/hero/`. Four beats - **variables → functions → a system →
adopted** - then a calm idle. Guardrails, per brief §7:

- The H1 / lede / buttons are server-rendered DOM, readable in < 1s. The canvas
  is progressive enhancement, lazy-loaded in its own JS chunk (**not** in the
  homepage's First Load JS).
- `prefers-reduced-motion: reduce` → renders the final composed frame only.
- Mobile / coarse-pointer / low-core / low-memory devices → final frame, no
  simulation.
- Instanced nodes, capped DPR, `powerPreference: "low-power"`, and the render
  loop **pauses when the hero scrolls offscreen** (IntersectionObserver).
- Recolours live when the theme flips (reads CSS variables via a
  MutationObserver on `data-theme`).
- No real copy is baked into the canvas - the headline stays crawlable in the DOM.

### Contrast

Colour tokens are taken directly from the build brief's specified palettes,
which are AA-targeted. Key pairs, both themes:

- Light - text `#14202E` on `#FFFFFF` (~14:1), muted `#556575` (~4.9:1),
  primary `#1B54C0` on white (~6:1).
- Dark - text `#E8EDF5` on `#121319` (~14:1), muted `#9FB0C9` (~7:1),
  primary `#6E9BEC` on `#121319` (~7:1).

Re-verify with a contrast checker if you change any token.

## Project structure

```
src/
  app/
    layout.tsx            root layout, metadata, Person JSON-LD, theme boot script
    page.tsx              homepage (complete) + SoftwareSourceCode JSON-LD
    globals.css           design tokens (both themes), base type, a11y primitives
    robots.ts, sitemap.ts
    work/briefpilot/      case study scaffold
    about/                about scaffold
  components/
    Header, Footer, Section, ThemeToggle
    ExtractionTag, DecisionCard, OwnerTodo   ← the motifs + TODO block
    hero/                 the WebGL hero (lazy) + scene + theme-colour hook
    sections/             homepage sections
  i18n/                   en (shipped) · de (stub) · types · deep-merge loader
  lib/
    site.ts               links, contact, and the PLACEHOLDERs to fill
    theme.ts              boot script + persistence helpers
```

## Accessibility & quality

- Semantic HTML, correct heading order, landmarks, a skip link.
- Keyboard navigable with visible focus rings; `prefers-reduced-motion` respected.
- Responsive from 320px.
- Real `<title>` + meta description per page; OpenGraph tags; `sitemap.xml`;
  `robots.txt`; JSON-LD `Person` (site-wide) + `SoftwareSourceCode` (both repos).
