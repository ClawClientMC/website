import type { Metadata } from "next";

import { Button, Section, StatusBadge, TrustCallout } from "@/components/ui";

export const metadata: Metadata = {
  title: "Trust & Safety",
  description:
    "How ClawClient handles authentication, privacy, downloads, mods, and security. Plain-language trust practices for a transparent Minecraft launcher.",
  alternates: {
    canonical: "/trust",
  },
  openGraph: {
    title: "ClawClient Trust & Safety",
    description:
      "Transparent security and privacy practices for the ClawClient Minecraft launcher.",
    url: "/trust",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient Trust & Safety",
    description:
      "Transparent security and privacy practices for the ClawClient Minecraft launcher.",
  },
};

const trustTopics = [
  {
    id: "authentication",
    number: "01",
    eyebrow: "Authentication",
    status: "Available",
    tone: "available" as const,
    title: "Microsoft authentication stays on your device.",
    body: "ClawClient uses the standard Microsoft device-code flow for account login. Your Microsoft credentials are entered directly in the official Microsoft sign-in window — ClawClient never sees or stores your password. The launcher receives only the session token needed to start Minecraft. Token storage follows the operating system credential model and never leaves your local machine.",
    points: [
      "Microsoft device-code authentication flow",
      "Credentials entered in the official Microsoft window",
      "Session token stored locally, not on Claw servers",
    ],
  },
  {
    id: "local-profiles",
    number: "02",
    eyebrow: "Local profiles",
    status: "Available",
    tone: "available" as const,
    title: "Offline and local profiles work without a server connection.",
    body: "ClawClient supports local Minecraft profiles that do not require a Microsoft account. Local profile data — including game settings, mod lists, and launch configurations — stays entirely on your device. No profile data is sent to Claw servers unless you explicitly use a feature that requires cloud sync, and that feature will be clearly labelled when available.",
    points: [
      "Local profiles work fully offline",
      "Profile data stored on your device only",
      "Cloud sync will be opt-in and clearly labelled",
    ],
  },
  {
    id: "download-verification",
    number: "03",
    eyebrow: "Download integrity",
    status: "In development",
    tone: "development" as const,
    title: "Downloads are verified before they reach your launcher.",
    body: "ClawClient downloads Minecraft JARs, libraries, and assets from the official Mojang/Microsoft distribution endpoints. Each download is checked against the official checksum manifest before it is considered valid. Launcher updates follow the same model: the update package is verified against a signed hash before installation begins.",
    points: [
      "Official Mojang/Microsoft download sources",
      "Checksum verification for game files",
      "Signed hash verification for launcher updates",
    ],
  },
  {
    id: "mod-sources",
    number: "04",
    eyebrow: "Mod integrity",
    status: "In development",
    tone: "development" as const,
    title: "Mod sources are explicit and verifiable.",
    body: "ClawClient uses Modrinth as its primary mod discovery source. Each mod shown in the launcher carries its source, version, and compatibility metadata. The launcher does not silently inject or replace mod files. Installed mods are tracked per-profile so you can see exactly what is in each Minecraft setup. Integrity checks for mod packages are in development.",
    points: [
      "Modrinth as primary mod source",
      "Explicit mod version and compatibility metadata",
      "Per-profile mod tracking",
      "Package integrity checks in development",
    ],
  },
  {
    id: "telemetry",
    number: "05",
    eyebrow: "Telemetry & privacy",
    status: "Available",
    tone: "available" as const,
    title: "No telemetry is collected without your knowledge.",
    body: "ClawClient does not collect usage analytics, crash reports, or behavioural telemetry by default. If optional telemetry is introduced in the future, it will be opt-in, clearly explained, and independently toggleable. The launcher does not track which servers you join, which mods you install, or how long you play.",
    points: [
      "No default telemetry or analytics",
      "Future telemetry would be opt-in and explained",
      "No server, mod, or playtime tracking",
    ],
  },
  {
    id: "security-contact",
    number: "06",
    eyebrow: "Security contact",
    status: "Available",
    tone: "available" as const,
    title: "Responsible disclosure is taken seriously.",
    body: "If you discover a security vulnerability in ClawClient, please report it through the Discord server or the GitHub repository's security advisory channel. ClawClient will acknowledge receipt and provide a timeline for resolution. We ask that reporters give reasonable time for a fix before public disclosure.",
    points: [
      "Report via Discord or GitHub security advisory",
      "Acknowledgement and timeline provided",
      "Coordinated disclosure requested",
    ],
  },
  {
    id: "open-source",
    number: "07",
    eyebrow: "Verifiability",
    status: "Planned",
    tone: "planned" as const,
    title: "Open-source and reproducible builds are a stated goal.",
    body: "ClawClient intends to open-source key launcher components and provide reproducible build instructions so that anyone can verify the distributed binary matches the published source. This work is planned but not yet complete. Until reproducible builds are available, we will not claim that the launcher is independently verifiable.",
    points: [
      "Open-source launcher components planned",
      "Reproducible build verification planned",
      "No verifiability claims until implemented",
    ],
  },
];

export default function TrustPage() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">Trust &amp; Safety</p>
          <h1>Transparent practices, not marketing promises.</h1>
          <p>
            ClawClient handles your Minecraft account, mods, and game files. This page explains
            exactly what happens with your data, how downloads are verified, and where the product
            is still building toward its goals. Every claim below maps to implemented behaviour or
            is clearly marked as planned.
          </p>
          <Button href="/download">Download ClawClient</Button>
        </div>
        <nav aria-label="Trust topics" className="feature-nav">
          {trustTopics.map((item, index) => (
            <a href={`#${item.id}`} key={item.id}>
              <span>0{index + 1}</span>
              {item.eyebrow}
            </a>
          ))}
        </nav>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Security &amp; privacy</p>
          <h2>What ClawClient does and does not do.</h2>
          <p>
            Each section below describes a specific trust practice. Capabilities are labelled as
            Available, In development, or Planned — the same status model used across the rest of
            the product.
          </p>
        </div>
        <div className="feature-details__list">
          {trustTopics.map((topic) => (
            <article className="feature-detail" id={topic.id} key={topic.id}>
              <div className="feature-detail__index">{topic.number}</div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">{topic.eyebrow}</p>
                  <StatusBadge tone={topic.tone}>{topic.status}</StatusBadge>
                </div>
                <h2>{topic.title}</h2>
                <p>{topic.body}</p>
                <ul>
                  {topic.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="features-trust" id="disclosure">
        <TrustCallout>
          <p className="eyebrow">Responsible disclosure</p>
          <h2>Found a security issue? Report it.</h2>
          <p>
            Use the Discord server or GitHub security advisory to report vulnerabilities. ClawClient
            will acknowledge receipt and work toward a fix before any public disclosure.
          </p>
          <div className="button-row">
            <Button href="https://discord.com" tone="quiet">
              Report via Discord
            </Button>
            <Button
              href="https://github.com/ClawClientMC/website/security/advisories"
              tone="quiet"
            >
              GitHub security advisory
            </Button>
          </div>
        </TrustCallout>
      </Section>

      <Section className="final-section">
        <div className="final-cta">
          <p className="eyebrow">Ready to play</p>
          <h2>A launcher that earns your trust.</h2>
          <p>
            Download ClawClient and see the product direction for yourself. Trust is built through
            transparent behaviour, not claims.
          </p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/features" tone="quiet">
              Explore features
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
