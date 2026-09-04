/**
 * Public-folder assets are referenced with a raw <img src="/...">, and Next's
 * `basePath` does not rewrite those — it only touches framework assets. When
 * the site is served from a subpath rather than a domain root (a GitHub Pages
 * project site, for example) the raw paths resolve against the wrong root and
 * every product image 404s.
 *
 * Routing through `asset()` keeps them correct on both. NEXT_PUBLIC_ is
 * required for the value to survive into the client bundle, which matters
 * because React re-renders from these paths after hydration.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (p: string) => `${BASE_PATH}${p}`;
