import type { MetadataRoute } from "next";

import { publicEnvironment } from "@/env";

export default function robots(): MetadataRoute.Robots {
  return {
    host: publicEnvironment.siteUrl,
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${publicEnvironment.siteUrl}/sitemap.xml`,
  };
}
