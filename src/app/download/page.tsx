import type { Metadata } from "next";
import { headers } from "next/headers";

import { Button, Section, StatusBadge } from "@/components/ui";
import {
  getLatestRelease,
  getDownloadForPlatform,
  type Platform,
} from "@/lib/releases";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download ClawClient for Windows, macOS, and Linux. The performance-focused Minecraft launcher.",
  alternates: {
    canonical: "/download",
  },
  openGraph: {
    title: "Download ClawClient",
    description:
      "Download the ClawClient Minecraft launcher for your platform.",
    url: "/download",
  },
  twitter: {
    card: "summary_large_image",
    title: "Download ClawClient",
    description:
      "Download the ClawClient Minecraft launcher for your platform.",
  },
};

function detectPlatform(userAgent: string): Platform {
  const ua = userAgent.toLowerCase();
  if (ua.includes("mac")) return "macos";
  if (ua.includes("linux")) return "linux";
  return "windows";
}

const platformLabels: Record<Platform, string> = {
  windows: "Windows",
  macos: "macOS",
  linux: "Linux",
};

export default async function DownloadPage() {
  const release = await getLatestRelease();
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") ?? "";
  const detectedPlatform = detectPlatform(userAgent);

  if (!release) {
    return (
      <main id="main-content">
        <Section className="features-hero">
          <div className="features-hero__copy">
            <p className="eyebrow">Download</p>
            <h1>Downloads are not available yet.</h1>
            <p>
              ClawClient is not yet available for public download. Check back
              soon or join the Discord for updates.
            </p>
            <Button href="/" tone="quiet">
              Return to homepage
            </Button>
          </div>
        </Section>
      </main>
    );
  }

  const primaryDownload = getDownloadForPlatform(release, detectedPlatform);

  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">Download ClawClient</p>
          <h1>Get the launcher for your platform.</h1>
          <p>
            Version {release.version} &middot; {release.channel} channel
            &middot; Released {release.date}
          </p>
          {primaryDownload ? (
            <div className="button-row">
              <Button href={primaryDownload.url}>
                Download for {platformLabels[detectedPlatform]}
              </Button>
              <Button href={`/changelog/${release.version}`} tone="quiet">
                Release notes
              </Button>
            </div>
          ) : (
            <div className="button-row">
              <Button href="#all-downloads">View all downloads</Button>
              <Button href={`/changelog/${release.version}`} tone="quiet">
                Release notes
              </Button>
            </div>
          )}
          {primaryDownload && (
            <p className="download-meta">
              {primaryDownload.filename}
              {primaryDownload.sha256 && (
                <span> &middot; SHA-256: {primaryDownload.sha256}</span>
              )}
            </p>
          )}
        </div>
      </Section>

      <Section className="feature-details" id="all-downloads">
        <div className="feature-details__intro">
          <p className="eyebrow">All platforms</p>
          <h2>Choose your operating system.</h2>
          <p>
            Downloads are served from the official release pipeline. Each
            artifact corresponds to a verified release — no unsigned mirrors.
          </p>
        </div>
        <div className="feature-details__list">
          {(["windows", "macos", "linux"] as const).map((platform, index) => {
            const artifact = getDownloadForPlatform(release, platform);
            return (
              <article className="feature-detail" key={platform}>
                <div className="feature-detail__index">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="feature-detail__content">
                  <div className="feature-detail__meta">
                    <p className="eyebrow">{platformLabels[platform]}</p>
                    <StatusBadge
                      tone={
                        platform === detectedPlatform ? "available" : "development"
                      }
                    >
                      {platform === detectedPlatform ? "Detected" : "Other"}
                    </StatusBadge>
                  </div>
                  <h2>{platformLabels[platform]}</h2>
                  {artifact ? (
                    <>
                      <p>
                        {artifact.filename} &middot; {artifact.architecture}
                      </p>
                      <div className="button-row">
                        <Button href={artifact.url}>
                          Download {platformLabels[platform]}
                        </Button>
                      </div>
                      {artifact.sha256 && (
                        <p className="download-meta">
                          SHA-256: {artifact.sha256}
                        </p>
                      )}
                      {artifact.signature && (
                        <p className="download-meta">
                          Signature: {artifact.signature}
                        </p>
                      )}
                    </>
                  ) : (
                    <p>
                      No download available for {platformLabels[platform]} in
                      this release.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      <Section className="features-trust">
        <div className="trust-callout">
          <span aria-hidden="true" className="trust-callout__mark">
            {"///"}
          </span>
          <div>
            <p className="eyebrow">Integrity</p>
            <h2>Downloads are verified by the release pipeline.</h2>
            <p>
              Each download artifact is built and signed by the official release
              pipeline. SHA-256 hashes and signatures are published alongside
              each release. No unsigned mirrors or third-party download sources
              are used.
            </p>
            <Button href="/trust" tone="quiet">
              Read Trust &amp; Safety
            </Button>
          </div>
        </div>
      </Section>

      <Section className="final-section">
        <div className="final-cta">
          <p className="eyebrow">Next steps</p>
          <h2>Make your next Minecraft setup a clear one.</h2>
          <p>
            After downloading, follow the installation guide for your platform.
          </p>
          <div className="button-row">
            <Button href="/docs/installation">Installation guide</Button>
            <Button href="/features" tone="quiet">
              Explore features
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
