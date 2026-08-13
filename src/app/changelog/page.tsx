import type { Metadata } from "next";
import Link from "next/link";

import { Button, Section, StatusBadge } from "@/components/ui";
import { getReleases } from "@/lib/releases";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "Release history for the ClawClient Minecraft launcher. Version, date, channel, and user-facing changes for each release.",
  alternates: {
    canonical: "/changelog",
  },
  openGraph: {
    title: "ClawClient Changelog",
    description:
      "Release history for the ClawClient Minecraft launcher.",
    url: "/changelog",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient Changelog",
    description:
      "Release history for the ClawClient Minecraft launcher.",
  },
};

const channelTone: Record<string, "available" | "development" | "planned"> = {
  stable: "available",
  beta: "development",
  alpha: "planned",
};

export default async function ChangelogPage() {
  const releases = await getReleases();

  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">Changelog</p>
          <h1>What changed in each release.</h1>
          <p>
            Human-readable release history tied to ClawClient versions. Each entry
            shows the version, release date, channel, and user-facing changes.
          </p>
          <Button href="/download">Download ClawClient</Button>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Release history</p>
          <h2>All releases, newest first.</h2>
          <p>
            Binary and hash authority remains the release pipeline. This page
            provides editorial release notes only.
          </p>
        </div>
        <div className="feature-details__list">
          {releases.map((release, index) => (
            <Link
              className="feature-detail"
              href={`/changelog/${release.version}`}
              key={release.version}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="feature-detail__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">{release.date}</p>
                  <StatusBadge tone={channelTone[release.channel] ?? "development"}>
                    {release.channel}
                  </StatusBadge>
                </div>
                <h2>
                  {release.title} <span>v{release.version}</span>
                </h2>
                <p>{release.summary}</p>
              </div>
            </Link>
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
            <h2>Binary verification stays in the release pipeline.</h2>
            <p>
              This changelog provides editorial context for each release. Download
              hashes and binary verification are handled by the release pipeline,
              not this page.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
