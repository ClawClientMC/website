import type { Metadata } from "next";

import { Button, Section, StatusBadge, TrustCallout } from "@/components/ui";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Explore ClawClient's Minecraft performance, PvP, mods, profiles, server discovery, account, and trust product direction.",
  alternates: {
    canonical: "/features",
  },
  openGraph: {
    title: "ClawClient features",
    description:
      "A clear overview of the Minecraft launcher and client capabilities ClawClient is building.",
    url: "/features",
  },
};

const featureLinks = [
  { href: "#performance", label: "Performance" },
  { href: "#pvp", label: "PvP utility" },
  { href: "#mods", label: "Mods" },
  { href: "#profiles", label: "Profiles" },
  { href: "#servers", label: "Servers" },
  { href: "#accounts", label: "Accounts" },
];

const details = [
  {
    id: "performance",
    number: "01",
    eyebrow: "Performance",
    status: "In development",
    tone: "development" as const,
    title: "Start from a performance-focused profile.",
    body:
      "ClawClient is being built around optimized profile choices, with the Minecraft, loader, and channel context visible before launch. We will publish measurable performance results only with a reproducible benchmark.",
    points: ["Claw Optimized profile direction", "Explicit channel context", "No unsupported FPS claims"],
  },
  {
    id: "pvp",
    number: "02",
    eyebrow: "PvP utility",
    status: "Planned",
    tone: "planned" as const,
    title: "Useful competitive information, kept readable.",
    body:
      "The PvP direction focuses on HUD and client utilities that help players understand their session. The intent is useful presentation and control, not automation or cheatware.",
    points: ["Competitive HUD direction", "Intentional client utilities", "Clear in-session information"],
  },
  {
    id: "mods",
    number: "03",
    eyebrow: "Mods",
    status: "In development",
    tone: "development" as const,
    title: "Browse compatible content with the right context.",
    body:
      "Mod discovery is designed around the profile it will change. Modrinth search and compatibility presentation stay separate from the trusted install and profile flow.",
    points: ["Modrinth discovery", "Version and loader context", "Profile-aware decisions"],
  },
  {
    id: "profiles",
    number: "04",
    eyebrow: "Profiles & versions",
    status: "Available",
    tone: "available" as const,
    title: "Recognize each Minecraft setup at a glance.",
    body:
      "Profiles are the center of the launcher experience: a clear place to understand Minecraft version, loader, account, and local game setup before you press Play.",
    points: ["Minecraft version context", "Local profile selection", "Explicit launch readiness"],
  },
  {
    id: "servers",
    number: "05",
    eyebrow: "Server discovery",
    status: "Planned",
    tone: "planned" as const,
    title: "Join only when the setup is truly compatible.",
    body:
      "Server discovery will use compatibility data to guide profile selection and preparation. A featured server is not presented as playable until its real profile and connection flow are ready.",
    points: ["Compatibility-first direction", "No implied endorsements", "Typed connection state"],
  },
  {
    id: "accounts",
    number: "06",
    eyebrow: "Accounts & local profiles",
    status: "Available",
    tone: "available" as const,
    title: "Keep your player identity clear.",
    body:
      "ClawClient supports Microsoft account selection and local profiles. The launcher keeps identity choices understandable while each server retains its own authentication policy.",
    points: ["Microsoft account selection", "Local profile support", "Clear authentication boundaries"],
  },
];

export default function FeaturesPage() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">ClawClient features</p>
          <h1>A sharper Minecraft launcher, built around your setup.</h1>
          <p>
            Explore the client stack behind ClawClient: performance-focused profiles, PvP
            utility, mods, versions, servers, and accounts. Each capability carries a clear
            release state.
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
          <p className="eyebrow">Product capability</p>
          <h2>Clear status. Concrete player value.</h2>
          <p>
            ClawClient does not present an unfinished wish list as a finished product. The
            detail below explains the benefit, current state, and boundaries for every area.
          </p>
        </div>
        <div className="feature-details__list">
          {details.map((feature) => (
            <article className="feature-detail" id={feature.id} key={feature.id}>
              <div className="feature-detail__index">{feature.number}</div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">{feature.eyebrow}</p>
                  <StatusBadge tone={feature.tone}>{feature.status}</StatusBadge>
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
            the shipped implementation supports it. Until then, the current state stays visible.
          </p>
          <Button href="/trust" tone="quiet">
            Read Trust &amp; Safety
          </Button>
        </TrustCallout>
      </Section>
    </main>
  );
}
