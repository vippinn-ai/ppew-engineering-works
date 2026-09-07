import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Required by output: "export" — these are emitted as files at build time.
export const dynamic = "force-static";

// One page for now. Per-platform and per-item pages get added here when they
// are built — see "Still to decide" in README.md.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
