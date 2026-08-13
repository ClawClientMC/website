import type { Metadata } from "next";

import { Button, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ClawClient handles your data. No default telemetry, local-first storage, and transparent privacy practices.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "ClawClient Privacy Policy",
    description: "How ClawClient handles your data.",
    url: "/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient Privacy Policy",
    description: "How ClawClient handles your data.",
  },
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">Privacy Policy</p>
          <h1>How ClawClient handles your data.</h1>
          <p>
            ClawClient is built with a local-first approach. Your data stays on
            your device unless a feature explicitly requires a server connection.
          </p>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Data practices</p>
          <h2>What ClawClient does and does not collect.</h2>
          <p>
            This policy describes the current data handling practices. Where
            exact legal language is pending final review, sections are clearly
            marked.
          </p>
        </div>
        <div className="feature-details__list">
          <article className="feature-detail">
            <div className="feature-detail__index">01</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Telemetry</p>
              </div>
              <h2>No default telemetry or analytics.</h2>
              <p>
                ClawClient does not collect usage analytics, crash reports, or
                behavioural telemetry by default. No data is sent to Claw
                servers without your explicit knowledge.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">02</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Authentication</p>
              </div>
              <h2>Microsoft credentials stay with Microsoft.</h2>
              <p>
                ClawClient uses the standard Microsoft device-code flow. Your
                credentials are entered in the official Microsoft sign-in window.
                ClawClient never sees or stores your password. The session token
                is stored locally on your device.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">03</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Profiles</p>
              </div>
              <h2>Profile data is stored locally.</h2>
              <p>
                Minecraft profiles, game settings, mod lists, and launch
                configurations are stored on your device. No profile data is
                sent to Claw servers unless you use a feature that explicitly
                requires cloud sync.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">04</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Website</p>
              </div>
              <h2>Website analytics are privacy-aware.</h2>
              <p>
                The clawclient.net website may use privacy-aware analytics to
                understand page views and download conversion. No personal data,
                Microsoft identifiers, or launcher tokens are collected by the
                website. Analytics use allowlisted UTM parameters only.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">05</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Third parties</p>
              </div>
              <h2>No data is sold or shared with third parties.</h2>
              <p>
                ClawClient does not sell, rent, or share your personal data with
                third parties. Modrinth is used as a mod source, but mod
                browsing happens through the Modrinth API — ClawClient does not
                send your identity to Modrinth.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">06</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Changes</p>
              </div>
              <h2>Privacy changes will be communicated.</h2>
              <p>
                If the privacy policy changes, updates will be published on this
                page with a revision date. Material changes will be communicated
                through the launcher or Discord before taking effect.
              </p>
              <p>
                <strong>Last updated:</strong> August 2026
              </p>
            </div>
          </article>
        </div>
      </Section>

      <Section className="features-trust">
        <div className="trust-callout">
          <span aria-hidden="true" className="trust-callout__mark">
            {"///"}
          </span>
          <div>
            <p className="eyebrow">Questions?</p>
            <h2>Contact the team.</h2>
            <p>
              For privacy questions or data requests, contact the team through
              Discord or the GitHub repository.
            </p>
            <Button href="/trust" tone="quiet">
              Trust &amp; Safety
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
