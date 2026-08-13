import type { MetadataRoute } from "next";

import { publicEnvironment } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: publicEnvironment.siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${publicEnvironment.siteUrl}/features`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${publicEnvironment.siteUrl}/trust`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
