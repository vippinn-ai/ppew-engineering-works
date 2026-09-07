/**
 * Where this build is served, and whether search engines should index it.
 *
 * Production is Cloudflare Pages on ppengineeringworks.com, and it is the only
 * build that should reach search engines. The GitHub Pages copy serves the same
 * content on a different URL, so its workflow sets NEXT_PUBLIC_NOINDEX=1 —
 * otherwise the two would compete for the same pages and split the ranking.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ppengineeringworks.com";

export const NOINDEX = process.env.NEXT_PUBLIC_NOINDEX === "1";
