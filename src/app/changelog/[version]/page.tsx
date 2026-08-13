import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Section, StatusBadge } from "@/components/ui";
import { getRelease, getReleases } from "@/lib/releases";

type PageProps = {
  params: Promise<{ version: string }>;
};

export async function generateStaticParams() {
  const releases = await getReleases();
  return releases.map((release) => ({ version: release.version }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { version } = await params;
  const release = await getRelease(version);

  if (!release) {
    return { title: "Release not found" };
  }

  return {
    title: `v${release.version} — ${release.title}`,
    description: `ClawClient v${release.version} release notes. ${release.summary}`,
    alternates: {
      canonical: `/changelog/${release.version}`,
    },
    openGraph: {
      title: `ClawClient v${release.version} — ${release.title}`,
      description: release.summary,
      url: `/changelog/${release.version}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `ClawClient v${release.version} — ${release.title}`,
      description: release.summary,
    },
  };
}

const channelTone: Record<string, "available" | "development" | "planned"> = {
  stable: "available",
  beta: "development",
  alpha: "planned",
};

export default async function ReleaseDetailPage({ params }: PageProps) {
  const { version } = await params;
  const release = await getRelease(version);

  if (!release) {
    notFound();
  }

  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">
            {release.date} &middot; {release.channel} channel
          </p>
          <h1>
            {release.title} <span>v{release.version}</span>
          </h1>
          <p>{release.summary}</p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/changelog" tone="quiet">
              All releases
            </Button>
          </div>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Release details</p>
          <h2>What changed in v{release.version}</h2>
          <p>
            User-facing changes grouped by area. This is editorial content —
            binary verification is handled by the release pipeline.
          </p>
        </div>
        <div className="feature-details__list">
          {release.changes.map((group, index) => (
            <article className="feature-detail" key={group.category}>
              <div className="feature-detail__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">{group.category}</p>
                  <StatusBadge tone={channelTone[release.channel] ?? "development"}>
                    {release.channel}
                  </StatusBadge>
                </div>
                <h2>{group.category}</h2>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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
            <p className="eyebrow">Release authority</p>
            <h2>Download verification is in the release pipeline.</h2>
            <p>
              This page provides editorial release notes. Binary hashes and
              download verification are handled by the authoritative release
              pipeline, not this content.
            </p>
            <Link className="button button--quiet" href="/changelog">
              View all releases
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
