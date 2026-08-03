# Static assets - owner to add

These files are referenced by the site but are **not** committed yet. Drop them
here before launch (see build brief §11):

| File | Used by | Notes |
| --- | --- | --- |
| `ariba-anjum-cv.pdf` | Header "CV ↓", Contact "Download CV" | The CV, served at `/ariba-anjum-cv.pdf`. |
| `og.png` | OpenGraph / Twitter cards | Exactly **1200 × 630**. Referenced in metadata. |

Optional but recommended:

- `favicon.ico` (or `src/app/icon.png`) - a site icon. Next.js will pick up
  `src/app/icon.(png|svg)` automatically.

Until `ariba-anjum-cv.pdf` exists, the CV links will 404 - that's expected and
called out in the top-level README.
