# PP Engineering Works — website

Homepage build. Next.js 15 (App Router) + Tailwind v4 + TypeScript, exported as
a fully static site.

## Run it

```bash
npm install
npm run dev             # http://localhost:3000
npm run build           # static export into ./out  (what you deploy)
npm run preview:local   # ./local-preview — opens straight from disk, no server
```

`out/` is plain HTML/CSS/JS and can be dropped on Vercel, Netlify, Cloudflare
Pages, or any shared host. No Node runtime is needed in production.

### Why there are two builds

`out/` uses absolute asset paths (`/_next/...`), which is correct for hosting
but renders blank when opened as a `file://` URL. `npm run preview:local`
copies that build and rewrites the paths to be relative, so `index.html` works
by double-clicking. Two details matter there, both handled by
`scripts/make-local-preview.mjs`:

- `<img src>` is not touched by Next's `assetPrefix`, so those need rewriting
  separately from the framework's own assets.
- `url()` inside CSS resolves against the stylesheet's folder, not the site
  root, so the self-hosted fonts need `../media/` rather than
  `/_next/static/media/`. Miss this and the page loads with fallback fonts.

Deploy `out/`, not `local-preview/`.

## Brand

Colours are sampled from the logo artwork and brochure, not approximated:

| Token | Hex | Where it came from |
|---|---|---|
| `navy` | `#071C39` | logo background |
| `cyan` | `#009EE3` | brochure footer bar |
| `indigo` | `#2F2483` | brochure footer bar, "Introduction" heading |
| `gse` | `#E9A21B` | the yellow on the company's own jacks and trolleys |
| `titanium` / `paper` / `rule` | — | supporting greys |

Type is Archivo (variable, width axis used for display sizes) with IBM Plex Sans
for body and IBM Plex Mono for part numbers. All three are self-hosted via npm,
so there are no Google Fonts requests.

### Logo

`public/img/monogram.png` is cropped from the brochure cover. Its background is
exactly `#071C39`, so it sits on any navy surface with no visible plate. The
wordmark is set as live Archivo text rather than reusing the raster artwork,
which keeps it crisp at every size.

**This is the one asset that should be replaced.** A vector original (AI, EPS or
SVG) would let the monogram be used on light backgrounds, in the favicon, and in
print. Ask whoever produced the brochure for the CorelDRAW source.

## Structure

```
app/
  layout.tsx        metadata + Organization JSON-LD
  page.tsx          holds shared platform filter + RFQ state
  globals.css       design tokens, type scale, drawing-sheet grid
components/
  Header.tsx        sticky bar, RFQ counter, mobile menu
  Hero.tsx          headline + aircraft recognition chart
  Planform.tsx      hand-drawn top-view silhouettes (SVG)
  Catalogue.tsx     search, filters, product grid, RFQ toggles
  Capabilities.tsx  capability index + facility section
  Enquiry.tsx       sticky RFQ bar, enquiry panel, footer
lib/
  catalog.ts        52 items with part numbers, platforms, categories
public/
  products/         53 WebP cut-outs extracted from the brochure PDF
  img/              monogram, Chinook
```

## Notable behaviour

- **Part-number search strips separators.** Typing `8AT9420180` finds
  `8AT-9420-180-01A`. Procurement staff rarely type the dashes.
- **The hero filters the catalogue.** Selecting an airframe sets state shared by
  both sections; selecting it again clears it.
- **The RFQ basket is real.** Selected items are written into a pre-filled
  `mailto:` body and a WhatsApp deep link, so nothing is retyped.
- **Nine brochure photos were shot in situ** rather than cut out. Those are
  framed as photographs; the other 44 are transparent and multiply onto the cell.
- Reduced motion is respected, focus is visible, and there is one page-load
  reveal rather than scroll animations on every section.

## Still to decide

1. **Certifications.** There is no quality section yet because there is nothing
   confirmed to put in it. ISO 9001 / AS9100 status, DGAQA or DGQA registration,
   Udyam and GST numbers, and GeM seller ID all belong on the site — this is the
   single biggest credibility gain available.
2. **Named customers.** If any supply references can be disclosed, they should
   go above the catalogue.
3. **Form handling.** The enquiry currently opens the user's mail client or
   WhatsApp, which works with zero backend. A proper form post (Resend,
   Formspree or similar) is better once a domain and inbox exist.
4. **Remaining pages.** Catalogue detail pages, per-platform landing pages, a
   facility page and a vendor-information page are all planned but not built.
   Per-platform pages are the high-value SEO work.

## Known gaps

- Product photography is brochure-resolution. Re-shooting the top 10 items
  against a consistent background would lift the catalogue noticeably.
- No favicon yet — needs the vector logo first.
- Copy is written from the brochure and public information about the company's
  work. Every claim should be checked by the client before launch.
