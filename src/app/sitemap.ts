import type { MetadataRoute } from "next";

import { publicEnvironment } from "@/env";
import { getReleases } from "@/lib/releases";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const releases = await getReleases();

  const releaseEntries: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${publicEnvironment.siteUrl}/changelog/${release.version}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

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
    {
      url: `${publicEnvironment.siteUrl}/changelog`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...releaseEntries,
  ];
}
