import type { Metadata } from "next";

import { Button, Section, StatusBadge } from "@/components/ui";
import {
  getCampaignBySlug,
  getAllCampaigns,
  parseAttribution,
} from "@/lib/campaigns";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateStaticParams() {
  const campaigns = getAllCampaigns();
  return campaigns.map((campaign) => ({ slug: campaign.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getCampaignBySlug(slug);

  if (!campaign) {
    return { title: "Campaign not found" };
  }

  return {
    title: campaign.title,
    description: campaign.description,
    alternates: {
      canonical: `/campaign/${campaign.slug}`,
    },
    openGraph: {
      title: campaign.title,
      description: campaign.description,
      url: `/campaign/${campaign.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: campaign.title,
      description: campaign.description,
    },
  };
}

export default async function CampaignPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const campaign = getCampaignBySlug(slug);
  const attribution = parseAttribution(query);

  if (!campaign) {
    return (
      <main id="main-content">
        <Section className="features-hero">
          <div className="features-hero__copy">
            <p className="eyebrow">Campaign</p>
            <h1>Campaign not found.</h1>
            <p>
              This campaign page does not exist or has been removed. Visit the
              main site to learn about ClawClient.
            </p>
            <Button href="/">Go to homepage</Button>
          </div>
        </Section>
      </main>
    );
  }

  const downloadHref = attribution.ref
    ? `/download?ref=${encodeURIComponent(attribution.ref)}`
    : attribution.utm_source
      ? `/download?utm_source=${encodeURIComponent(attribution.utm_source)}${attribution.utm_campaign ? `&utm_campaign=${encodeURIComponent(attribution.utm_campaign)}` : ""}`
      : "/download";

  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">
            {campaign.creator
              ? `${campaign.creator.platform} creator`
              : "Campaign"}
          </p>
          <h1>{campaign.headline}</h1>
          <p>{campaign.description}</p>
          <div className="button-row">
            <Button href={downloadHref}>{campaign.cta.primary}</Button>
            {campaign.cta.secondary && (
              <Button href="/features" tone="quiet">
                {campaign.cta.secondary}
              </Button>
            )}
          </div>
          {campaign.creator && (
            <p className="campaign-disclosure">{campaign.creator.disclosure}</p>
          )}
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Why ClawClient</p>
          <h2>Built for how you play.</h2>
          <p>
            Every capability below is shown with its current release state. No
            inflated claims, no fake metrics.
          </p>
        </div>
        <div className="feature-details__list">
          {campaign.features.map((feature, index) => (
            <article className="feature-detail" key={feature.title}>
              <div className="feature-detail__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">Feature</p>
                  <StatusBadge tone="available">Available</StatusBadge>
                </div>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="features-trust">
        <div className="trust-callout">
          <span aria-hidden="true" className="trust-callout__mark">
            {"///"}
          </span>
          <div>
            <p className="eyebrow">Transparency</p>
            <h2>No fake metrics, no countdowns, no scarcity.</h2>
            <p>
              ClawClient does not use fake download counts, artificial
              countdowns, or false scarcity to drive installs. The product earns
              its place through real capability.
            </p>
            <Button href="/trust" tone="quiet">
              Read Trust &amp; Safety
            </Button>
          </div>
        </div>
      </Section>

      <Section className="final-section">
        <div className="final-cta">
          <p className="eyebrow">Ready to try it</p>
          <h2>Make your next Minecraft setup a clear one.</h2>
          <p>
            Download ClawClient and see the product direction for yourself.
          </p>
          <div className="button-row">
            <Button href={downloadHref}>{campaign.cta.primary}</Button>
            <Button href="/features" tone="quiet">
              Explore features
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
