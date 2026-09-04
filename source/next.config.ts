import type { NextConfig } from "next";

// `npm run preview:local` sets this so the export can be opened from disk.
// Normal builds keep absolute paths, which is what you want when hosting.
const localPreview = process.env.LOCAL_PREVIEW === "1";

// Set when the site is served from a subpath rather than a domain root, e.g.
// NEXT_PUBLIC_BASE_PATH=/ppew-engineering-works for a GitHub Pages project
// site. Left empty for a root domain, which is the normal case.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  ...(localPreview ? { assetPrefix: "." } : {}),
};

export default nextConfig;
