import type { MetadataRoute } from "next";

import { publicEnvironment } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicEnvironment.siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
