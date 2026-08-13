import type { Metadata } from "next";

import {
  Button,
  FaqAccordion,
  LauncherPreview,
  Section,
  StatusBadge,
  TrustCallout,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "ClawClient | Performance and PvP for Minecraft",
  description:
    "ClawClient keeps performance-focused profiles, PvP utility, mods, versions, and accounts in a focused desktop launcher built for the next time you play Minecraft.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ClawClient | Performance and PvP for Minecraft",
    description:
      "ClawClient keeps performance-focused profiles, PvP utility, mods, versions, and accounts in a focused desktop launcher built for the next time you play Minecraft.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient | Performance and PvP for Minecraft",
    description:
      "ClawClient keeps performance-focused profiles, PvP utility, mods, versions, and accounts in a focused desktop launcher built for the next time you play Minecraft.",
  },
};

const capabilities = [
  {
    label: "Claw Optimized",
    status: "In development",
    tone: "development" as const,
    title: "Profiles tuned for the way you play",
    body: "Choose a clear performance-focused setup without losing sight of its Minecraft and loader context.",
    wide: true,
  },
  {
    label: "Performance",
    status: "In development",
    tone: "development" as const,
    title: "Less manual tuning",
    body: "Performance direction is built into the profile experience. Benchmark claims will arrive only with reproducible tests.",
  },
  {
    label: "PvP client",
    status: "Planned",
    tone: "planned" as const,
    title: "Useful HUD, not noise",
    body: "Competitive HUD and client utilities are being designed as readable, intentional tools.",
  },
  {
    label: "Mods",
    status: "In development",
    tone: "development" as const,
    title: "Modrinth in context",
    body: "Browse compatible content with the profile, version, and loader choices it will affect.",
  },
  {
    label: "Profiles & versions",
    status: "Available",
    tone: "available" as const,
    title: "Your setup stays recognizable",
    body: "Keep local profiles, Minecraft versions, and launch choices in one focused desktop flow.",
    wide: true,
  },
  {
    label: "Server discovery",
    status: "Planned",
    tone: "planned" as const,
    title: "Find compatible places to play",
    body: "Server discovery will show a connection path only when the compatible profile is truly ready.",
  },
  {
    label: "Accounts",
    status: "Available",
    tone: "available" as const,
    title: "Microsoft and local profiles",
    body: "Choose the identity that fits your session without burying it in launcher settings.",
  },
];

const previewQuestions = [
  {
    question: "What is ClawClient?",
    answer:
      "ClawClient is a desktop Minecraft launcher and client direction focused on performance, PvP utility, profiles, mods, and a clearer start to every session.",
  },
  {
    question: "Can I use a Microsoft or local profile?",
    answer:
      "The launcher supports Microsoft account selection and local profiles. Server acceptance still depends on each server's own authentication rules.",
  },
  {
    question: "Are performance benchmarks available?",
    answer:
      "Not yet. Performance numbers will only be published with their hardware, game version, settings, profile, and comparison method.",
  },
];

export default function Home() {
  return (
    <main id="main-content">
      <Section className="hero">
        <div className="hero__copy">
          <p className="eyebrow">Minecraft performance / PvP launcher</p>
          <h1>Your Minecraft setup, optimized.</h1>
          <p className="hero__lede">
            ClawClient keeps performance-focused profiles, PvP utility, mods, versions, and
            accounts in a focused desktop launcher built for the next time you play.
          </p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/features" tone="quiet">
              Explore features
            </Button>
          </div>
          <p className="hero__note">
            Desktop launcher for Minecraft players. Product capabilities are labelled by their
            current release state below.
          </p>
        </div>
        <LauncherPreview />
      </Section>

      <Section className="product-brief">
        <div className="product-brief__copy">
          <p className="eyebrow">Built around the session</p>
          <h2>Everything important stays close to Play.</h2>
          <p>
            ClawClient is designed as a premium gaming client, not a busy dashboard. The
            launcher keeps the next useful choice visible: account, profile, compatible content,
            and the game you want to start.
          </p>
        </div>
        <dl className="product-brief__rail">
          <div>
            <dt>Claw Optimized</dt>
            <dd>Performance-focused profile family with explicit channel and compatibility state.</dd>
          </div>
          <div>
            <dt>Play context</dt>
            <dd>Profile, Minecraft version, mods, and identity stay understandable before launch.</dd>
          </div>
          <div>
            <dt>Product direction</dt>
            <dd>Every capability is shown as Available, In development, or Planned.</dd>
          </div>
        </dl>
      </Section>

      <Section className="capability-section" id="features">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Launcher capabilities</p>
            <h2>A focused client stack for Minecraft players.</h2>
          </div>
          <p>
            Performance, PvP, mods, profiles, servers, and accounts all belong in the same
            player-first flow.
          </p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article
              className={"capability-card" + (capability.wide ? " capability-card--wide" : "")}
              key={capability.label}
            >
              <div className="capability-card__top">
                <span>{capability.label}</span>
                <StatusBadge tone={capability.tone}>{capability.status}</StatusBadge>
              </div>
              <h3>{capability.title}</h3>
              <p>{capability.body}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="trust-section" id="trust">
        <TrustCallout>
          <p className="eyebrow">Trust is part of the launcher</p>
          <h2>Clear profile, account, update, and download states are part of a better start.</h2>
          <p>
            ClawClient will only claim a security, release, or performance capability when the
            product implementation supports it. No invented benchmarks, player counts, or
            product promises.
          </p>
          <Button href="/trust" tone="quiet">
            Visit Trust &amp; Safety
          </Button>
        </TrustCallout>
      </Section>

      <Section className="final-section">
        <div className="final-cta">
          <p className="eyebrow">Get ready to play</p>
          <h2>Make your next Minecraft setup a clear one.</h2>
          <p>
            Explore the ClawClient product direction now, then download from your desktop when
            the release is ready.
          </p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/features" tone="quiet">
              Explore features
            </Button>
          </div>
        </div>
        <div className="faq-preview">
          <p className="eyebrow">Quick answers</p>
          <FaqAccordion items={previewQuestions} />
          <Button href="/faq" tone="quiet">
            View all questions
          </Button>
        </div>
      </Section>
    </main>
  );
}
