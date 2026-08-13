import type { Metadata } from "next";
import Link from "next/link";

import { Button, Section } from "@/components/ui";
import { getDocsByCategory } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Help & Documentation",
  description:
    "Installation, login, profiles, mods, troubleshooting, and reference guides for the ClawClient Minecraft launcher.",
  alternates: {
    canonical: "/docs",
  },
  openGraph: {
    title: "ClawClient Help & Documentation",
    description:
      "Guides and reference for the ClawClient Minecraft launcher.",
    url: "/docs",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient Help & Documentation",
    description:
      "Guides and reference for the ClawClient Minecraft launcher.",
  },
};

export default function DocsPage() {
  const categories = getDocsByCategory();

  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">Help &amp; Documentation</p>
          <h1>Guides for every part of ClawClient.</h1>
          <p>
            Installation, login, profiles, mods, settings, troubleshooting, and
            platform reference. Find answers for the most common questions.
          </p>
          <Button href="/download">Download ClawClient</Button>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Documentation</p>
          <h2>Browse by category.</h2>
          <p>
            Each guide covers a specific topic. Content is plain text — no
            arbitrary scripts or embedded code execution.
          </p>
        </div>
        <div className="feature-details__list">
          {Array.from(categories.entries()).map(
            ([category, categoryDocs], catIndex) => (
              <article className="feature-detail" key={category}>
                <div className="feature-detail__index">
                  {String(catIndex + 1).padStart(2, "0")}
                </div>
                <div className="feature-detail__content">
                  <div className="feature-detail__meta">
                    <p className="eyebrow">{category}</p>
                  </div>
                  <h2>{category}</h2>
                  <ul>
                    {categoryDocs.map((doc) => (
                      <li key={doc.slug}>
                        <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
                        <span> — {doc.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ),
          )}
        </div>
      </Section>

      <Section className="features-trust">
        <div className="trust-callout">
          <span aria-hidden="true" className="trust-callout__mark">
            {"///"}
          </span>
          <div>
            <p className="eyebrow">Need more help?</p>
            <h2>Join the community.</h2>
            <p>
              If the docs do not answer your question, join the Discord server
              for community support. Report bugs and security issues through the
              appropriate channels.
            </p>
            <Button href="https://discord.com" tone="quiet">
              Join Discord
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
