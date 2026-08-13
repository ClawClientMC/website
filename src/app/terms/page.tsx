import type { Metadata } from "next";

import { Button, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for the ClawClient Minecraft launcher and clawclient.net website.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "ClawClient Terms of Service",
    description: "Terms of Service for the ClawClient Minecraft launcher.",
    url: "/terms",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient Terms of Service",
    description: "Terms of Service for the ClawClient Minecraft launcher.",
  },
};

export default function TermsPage() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">Terms of Service</p>
          <h1>Terms for using ClawClient.</h1>
          <p>
            These terms govern your use of the ClawClient launcher and the
            clawclient.net website. Sections marked for legal review are pending
            final approval.
          </p>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Terms</p>
          <h2>What you agree to when using ClawClient.</h2>
          <p>
            These terms cover the launcher software and website. Where exact
            legal language is pending final review, sections are clearly marked.
          </p>
        </div>
        <div className="feature-details__list">
          <article className="feature-detail">
            <div className="feature-detail__index">01</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Acceptance</p>
              </div>
              <h2>By using ClawClient, you accept these terms.</h2>
              <p>
                Downloading, installing, or using the ClawClient launcher or
                accessing clawclient.net constitutes acceptance of these terms.
                If you do not agree, do not use the launcher or website.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">02</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Launcher</p>
              </div>
              <h2>The launcher is provided as-is.</h2>
              <p>
                ClawClient is provided without warranty. The launcher is
                software that helps you manage and launch Minecraft. It does not
                guarantee specific performance outcomes, server compatibility, or
                mod functionality. Use at your own risk.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">03</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Minecraft</p>
              </div>
              <h2>Minecraft is owned by Mojang Studios and Microsoft.</h2>
              <p>
                ClawClient is not affiliated with, endorsed by, or connected to
                Mojang Studios or Microsoft. Minecraft is a trademark of
                Mojang Studios. You must have a valid Minecraft license to play.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">04</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Mods</p>
              </div>
              <h2>Mods are third-party content.</h2>
              <p>
                Mods discovered through ClawClient are third-party software.
                ClawClient does not warranty mod functionality, compatibility,
                or safety. Installing mods is at your own risk. Always review
                mod permissions and source before installing.
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">05</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Limitation</p>
              </div>
              <h2>Liability is limited.</h2>
              <p>
                ClawClient and its contributors are not liable for damages
                arising from use of the launcher, including but not limited to
                data loss, account issues, or server bans. This is standard for
                free software.
              </p>
              <p>
                <em>
                  Note: This section is pending final legal review for
                  jurisdiction-specific enforceability.
                </em>
              </p>
            </div>
          </article>

          <article className="feature-detail">
            <div className="feature-detail__index">06</div>
            <div className="feature-detail__content">
              <div className="feature-detail__meta">
                <p className="eyebrow">Changes</p>
              </div>
              <h2>Terms may be updated.</h2>
              <p>
                These terms may be updated. Changes will be published on this
                page with a revision date. Continued use after changes
                constitutes acceptance of the updated terms.
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
            <p className="eyebrow">Legal questions?</p>
            <h2>Contact the team.</h2>
            <p>
              For questions about these terms, contact the team through Discord
              or the GitHub repository.
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
