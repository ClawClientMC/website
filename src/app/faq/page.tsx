import type { Metadata } from "next";

import { Button, FaqAccordion, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about the ClawClient Minecraft launcher. Accounts, performance, mods, profiles, and troubleshooting.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "ClawClient FAQ",
    description:
      "Frequently asked questions about the ClawClient Minecraft launcher.",
    url: "/faq",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient FAQ",
    description:
      "Frequently asked questions about the ClawClient Minecraft launcher.",
  },
};

const faqItems = [
  {
    question: "What is ClawClient?",
    answer:
      "ClawClient is a desktop Minecraft launcher and client focused on performance, PvP utility, mods, profiles, and a clearer start to every session. It is available for Windows, macOS, and Linux.",
  },
  {
    question: "Is ClawClient free?",
    answer:
      "Yes. ClawClient is free to download and use. You still need a valid Minecraft account to play.",
  },
  {
    question: "Can I use a Microsoft or local profile?",
    answer:
      "The launcher supports Microsoft account selection and local profiles. Server acceptance still depends on each server's own authentication rules.",
  },
  {
    question: "What Minecraft versions are supported?",
    answer:
      "ClawClient supports Minecraft Java Edition versions available through the official launcher, including release, snapshot, and legacy versions. Bedrock Edition is not supported.",
  },
  {
    question: "What mod loaders are supported?",
    answer:
      "ClawClient supports Fabric and Forge mod loaders. Loader availability depends on the Minecraft version. The launcher shows compatible loaders when you create or edit a profile.",
  },
  {
    question: "Where do mods come from?",
    answer:
      "ClawClient uses Modrinth as its primary mod discovery source. Mods are filtered by your profile's Minecraft version and loader compatibility.",
  },
  {
    question: "Are performance benchmarks available?",
    answer:
      "Not yet. Performance numbers will only be published with their hardware, game version, settings, profile, and comparison method. ClawClient does not make unsupported FPS claims.",
  },
  {
    question: "Does ClawClient collect telemetry?",
    answer:
      "No. ClawClient does not collect usage analytics, crash reports, or behavioural telemetry by default. If optional telemetry is introduced in the future, it will be opt-in and clearly explained.",
  },
  {
    question: "How do I report a bug?",
    answer:
      "Report bugs through the ClawClient Discord server or the GitHub repository. Include your operating system, Minecraft version, loader, installed mods, and steps to reproduce the issue.",
  },
  {
    question: "How do I report a security vulnerability?",
    answer:
      "Use the GitHub security advisory channel or contact the team through Discord. Do not disclose security issues publicly until a fix is available.",
  },
  {
    question: "Is ClawClient open source?",
    answer:
      "Open-sourcing key launcher components is planned but not yet complete. Until open-source and reproducible builds are available, ClawClient does not claim to be independently verifiable.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "ClawClient supports Windows 10+, macOS 12+, and most major Linux distributions. The launcher is a native desktop application.",
  },
];

export default function FaqPage() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">FAQ</p>
          <h1>Common questions about ClawClient.</h1>
          <p>
            Answers about accounts, performance, mods, profiles, privacy, and
            troubleshooting. Each answer reflects the current release state.
          </p>
          <Button href="/download">Download ClawClient</Button>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Questions &amp; answers</p>
          <h2>Frequently asked questions.</h2>
          <p>
            Each answer is based on the current product state. Capabilities
            marked as Planned or In development are clearly labelled.
          </p>
        </div>
        <div className="faq-list">
          <FaqAccordion items={faqItems} />
        </div>
      </Section>

      <Section className="features-trust">
        <div className="trust-callout">
          <span aria-hidden="true" className="trust-callout__mark">
            {"///"}
          </span>
          <div>
            <p className="eyebrow">Need more help?</p>
            <h2>Check the documentation.</h2>
            <p>
              For detailed guides on installation, profiles, mods, and
              troubleshooting, visit the help center.
            </p>
            <div className="button-row">
              <Button href="/docs" tone="quiet">
                Help &amp; Documentation
              </Button>
              <Button href="/trust" tone="quiet">
                Trust &amp; Safety
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
