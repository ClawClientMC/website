import type { MetadataRoute } from "next";

import { publicEnvironment } from "@/env";
import { getAllCampaigns } from "@/lib/campaigns";
import { getAllDocs } from "@/lib/docs";
import { getReleases } from "@/lib/releases";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const releases = await getReleases();
  const docs = getAllDocs();
  const campaigns = getAllCampaigns();

  const releaseEntries: MetadataRoute.Sitemap = releases.map((release) => ({
    url: `${publicEnvironment.siteUrl}/changelog/${release.version}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const docEntries: MetadataRoute.Sitemap = docs.map((doc) => ({
    url: `${publicEnvironment.siteUrl}/docs/${doc.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const campaignEntries: MetadataRoute.Sitemap = campaigns.map(
    (campaign) => ({
      url: `${publicEnvironment.siteUrl}/campaign/${campaign.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }),
  );

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
    {
      url: `${publicEnvironment.siteUrl}/docs`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...releaseEntries,
    ...docEntries,
    ...campaignEntries,
  ];
}
