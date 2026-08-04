import type { MetadataRoute } from "next";

import { getDetailRoutes } from "@/lib/navigation";
import { absoluteUrl } from "@/lib/seo";

/**
 * Routes are derived from the `SECTIONS` registry rather than listed by hand,
 * so adding a detail page can't leave the sitemap behind.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...getDetailRoutes().map((route) => ({
      url: absoluteUrl(route.href),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
