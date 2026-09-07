import type { MetadataRoute } from "next";
import { SITE_URL, NOINDEX } from "@/lib/site";

// Required by output: "export" — these are emitted as files at build time.
export const dynamic = "force-static";

/**
 * Generated at build time rather than kept as a static file, so the staging
 * copy on GitHub Pages can disallow crawlers while production allows them
 * from the same source.
 */
export default function robots(): MetadataRoute.Robots {
  if (NOINDEX) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
