import type { Metadata } from "next";

import { Button, Section, TrustCallout } from "@/components/ui";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore the ClawClient product direction for optimized profiles, PvP utilities, mods, profiles, server discovery, accounts, and trust.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "ClawClient features",
    description:
      "A clear, status-labelled overview of the Minecraft client features ClawClient is building.",
    url: "/features",
  },
};

const featureLinks = [
  { href: "#performance", label: "Performance" },
  { href: "#pvp", label: "PvP" },
  { href: "#mods", label: "Mods" },
  { href: "#profiles", label: "Profiles" },
  { href: "#servers", label: "Servers" },
  { href: "#accounts", label: "Accounts" },
  { href: "#trust", label: "Trust" },
];

const details = [
  {
    id: "performance",
    number: "01",
    eyebrow: "Performance",
    status: "In development",
    title: "An optimized start, with the setup explained.",
    body:
      "ClawClient is being built around performance-oriented profile choices, so the important context is available before you launch. We will publish measurable performance results only when a reproducible benchmark is ready.",
    points: ["Optimized profile direction", "Clear profile context", "No unsupported benchmark claims"],
  },
  {
    id: "pvp",
    number: "02",
    eyebrow: "PvP utilities",
    status: "In development",
    title: "Useful competitive information, kept readable.",
    body:
      "The PvP direction focuses on HUD and client utilities that help players understand their session. The goal is useful presentation and control, not automation or cheatware.",
    points: ["Competitive HUD direction", "Intentional client utilities", "Clearer in-session information"],
  },
  {
    id: "mods",
    number: "03",
    eyebrow: "Mods",
    status: "Planned",
    title: "Discover changes with their profile in view.",
    body:
      "Mod discovery and compatibility work are planned around the profile they affect. Modrinth integration will be described as available only after the underlying launcher contract is ready.",
    points: ["Profile-aware discovery", "Compatibility context", "Modrinth status shown honestly"],
  },
  {
    id: "profiles",
    number: "04",
    eyebrow: "Profiles & versions",
    status: "In development",
    title: "Recognize each Minecraft setup at a glance.",
    body:
      "Profiles are intended to make version, loader, and mod context easier to scan. The product direction includes optimized, custom, and game-version setups without turning normal play into configuration work.",
    points: ["Version and loader context", "Custom setup clarity", "Explicit readiness states"],
  },
  {
    id: "servers",
    number: "05",
    eyebrow: "Server discovery",
    status: "Planned",
    title: "Find compatible servers from the same flow.",
    body:
      "Server discovery is planned as a reusable launcher experience. A featured server will only appear with a real compatibility and connection path; this page does not imply that any particular server is ready.",
    points: ["Compatibility-first direction", "No implied endorsements", "Real connection state before launch"],
  },
  {
    id: "accounts",
    number: "06",
    eyebrow: "Accounts & local profiles",
    status: "Planned",
    title: "Make identity choices understandable.",
    body:
      "Future account and offline/local profile support will follow the platform and launcher contracts. The website will describe those flows plainly when the authoritative implementation is ready.",
    points: ["Platform-backed account state", "Offline/local profile explanation", "No parallel identity system"],
  },
];

export default function FeaturesPage() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">ClawClient features</p>
          <h1>Built around a better way to start Minecraft.</h1>
          <p>
            This is the detailed product direction for ClawClient. Each area is labelled by
            its current state so you can see what is in development, what is planned, and what
            still depends on a real product contract.
          </p>
          <Button href="/download">Download ClawClient</Button>
        </div>
        <nav aria-label="Feature sections" className="feature-nav">
          {featureLinks.map((item, index) => (
            <a href={item.href} key={item.href}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
        </nav>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Product direction</p>
          <h2>Clear capability, clear status.</h2>
          <p>
            ClawClient is not presenting a finished feature list before the product is ready.
            The detail below explains the intended player benefit without making unverified
            performance, security, or availability claims.
          </p>
        </div>
        <div className="feature-details__list">
          {details.map((feature) => (
            <article className="feature-detail" id={feature.id} key={feature.id}>
              <div className="feature-detail__index">{feature.number}</div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">{feature.eyebrow}</p>
                  <span className="status">{feature.status}</span>
                </div>
                <h2>{feature.title}</h2>
                <p>{feature.body}</p>
                <ul>
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="features-trust" id="trust">
        <TrustCallout>
          <p className="eyebrow">Trust &amp; transparency</p>
          <h2>Product claims should be as clear as product controls.</h2>
          <p>
            ClawClient will only make a security, release, account, or performance claim when
            the shipped implementation supports it. Until then, the page keeps the status clear.
          </p>
          <Button href="/trust" tone="quiet">
            Read Trust &amp; Safety
          </Button>
        </TrustCallout>
      </Section>
    </main>
  );
}
