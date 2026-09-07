# PP Engineering Works — website bundle

## Just want to look at it?

Open **`preview/index.html`** in Chrome. Double-click it. No install, no server,
no terminal. Filtering, part-number search and the enquiry basket all work.

Two things behave as expected rather than as bugs: the email and WhatsApp
buttons open your mail client and WhatsApp Web, because they are real links.

## Want to work on it?

```bash
cd source
npm install
npm run dev             # http://localhost:3000
```

Other scripts:

```bash
npm run build           # static export into ./out  — this is what you deploy
npm run preview:local   # regenerates ./local-preview (the double-click version)
```

## Want to put it online?

Upload the contents of **`deploy/`** to any host — Vercel, Netlify, Cloudflare
Pages, Hostinger, cPanel, anything that serves files. There is no server-side
code and no Node runtime needed in production.

Deploy `deploy/`, not `preview/`. See "Why there are two builds" below.

### Live site — Cloudflare Pages

Production is <https://ppengineeringworks.com>, a Cloudflare Pages project
(`ppengineeringworks`) served from the domain root. Deployment is a direct
upload of `deploy/`, from the repository root:

```bash
npx wrangler pages deploy deploy --project-name=ppengineeringworks --branch=main
```

Rebuild before deploying: `cd source && npm run build`, then copy `source/out`
over `deploy/`.

> **Use Wrangler, not the dashboard uploader.** Cloudflare's drag-and-drop zip
> upload reported "140/140 files uploaded" and then served only the six
> root-level files — every nested directory (`_next/`, `products/`, `img/`) was
> dropped, leaving the site as unstyled HTML with no images. The zip was
> verified correct. Wrangler handles the directory properly.

`www` redirects to the apex with a 301 (Cloudflare Redirect Rule, query string
preserved), so the canonical tag in `app/layout.tsx` points at the apex.

### Serving from a subpath instead

`deploy/` uses root-absolute paths. To host under a subpath rather than a domain
root, set the prefix at build time:

```bash
NEXT_PUBLIC_BASE_PATH=/<subpath> npm run build
```

Next's `basePath` rewrites framework assets but *not* raw `<img src="/...">`, so
those go through `asset()` in `lib/asset.ts`. Leave it unset for a root domain.

### Keeping a copy out of search results

`NEXT_PUBLIC_NOINDEX=1` at build time emits `noindex` plus a disallowing
`robots.txt` (see `lib/site.ts`, `app/robots.ts`). Any second deployment of this
content should set it, or it competes with the production domain for the same
pages. Production must **not** set it.

---

## What is in this bundle

```
README.md              you are here
HANDOVER.md            full project context — read this before making changes
docs/
  brochure.pdf         the original source document
  contact-sheet.png    every image extracted from the brochure, labelled
  preview-desktop.png  full-page render at 1440px
  preview-mobile.png   full-page render at 390px
source/                the Next.js project
preview/               open index.html directly from disk
deploy/                upload this folder to your host
assets/
  extracted-raw/       full-resolution PNGs pulled from the brochure
  optimised/           the WebP cut-outs the site actually uses
```

`assets/extracted-raw/` is the better source material for any future work — the
WebP files in the site are downscaled from these.

---

## Why there are two builds

`deploy/` uses absolute asset paths (`/_next/...`). That is correct for hosting,
but such a page renders blank when opened as a `file://` URL, because those
paths resolve against your drive root instead of the site folder.

`preview/` is the same build with paths rewritten to be relative. Three things
need handling, and each fails in its own way if missed:

- **Framework assets** (`_next/...`) — handled by Next's `assetPrefix`, which
  the preview build sets to `.`. This also fixes webpack's runtime publicPath so
  lazily-loaded chunks resolve.
- **Our own `<img src="/products/...">` paths** — `assetPrefix` does not touch
  these, and they must be rewritten in the JS bundles as well as the HTML. The
  prerendered HTML is only what shows *before* React hydrates; once it does,
  React re-renders from the paths compiled into the bundle. Patching the HTML
  alone gives a page that looks correct for a moment and then loses its images.
- **`url()` inside CSS** — these resolve against the stylesheet's own folder,
  not the site root, so the self-hosted fonts need `../media/`. Miss this and
  the page silently falls back to system fonts while otherwise looking fine.

All three are handled by `source/scripts/make-local-preview.mjs`, so you can
regenerate the preview after any change with `npm run preview:local`.

---

## Status

The homepage is complete. Catalogue detail pages, per-platform pages, a facility
page and a certifications page are planned but not built — see section 8 of
`HANDOVER.md`.

One thing needs the client before launch: there is no certifications section
because no certification details were available. Section 7 of `HANDOVER.md`
lists exactly what to ask for.
