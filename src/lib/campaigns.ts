export type CampaignEntry = {
  slug: string;
  title: string;
  headline: string;
  description: string;
  creator?: {
    name: string;
    platform: "tiktok" | "youtube" | "discord" | "twitter";
    disclosure: string;
  };
  cta: {
    primary: string;
    secondary?: string;
  };
  features: ReadonlyArray<{
    title: string;
    body: string;
  }>;
};

const campaigns: ReadonlyArray<CampaignEntry> = [
  {
    slug: "tiktok-creators",
    title: "ClawClient for TikTok creators",
    headline: "A Minecraft launcher worth talking about.",
    description:
      "ClawClient is a performance-focused Minecraft launcher with profiles, mods, and a clean desktop experience. Built for players who care about their setup.",
    cta: {
      primary: "Download ClawClient",
      secondary: "Explore features",
    },
    features: [
      {
        title: "Performance profiles",
        body: "Claw Optimized profiles are designed around the way you play, not a generic benchmark number.",
      },
      {
        title: "Modrinth mods",
        body: "Browse and install mods filtered by your profile's Minecraft version and loader.",
      },
      {
        title: "Clean launcher",
        body: "A premium dark launcher that keeps your next session clear: account, profile, and Play.",
      },
    ],
  },
  {
    slug: "youtube-creators",
    title: "ClawClient for YouTube creators",
    headline: "The launcher your audience will actually use.",
    description:
      "ClawClient is a desktop Minecraft launcher focused on performance, PvP, mods, and profiles. A clear product for clear content.",
    cta: {
      primary: "Download ClawClient",
      secondary: "See what's inside",
    },
    features: [
      {
        title: "Profile management",
        body: "Keep Minecraft versions, loaders, mods, and accounts in one focused flow.",
      },
      {
        title: "PvP direction",
        body: "Competitive HUD and client utilities designed as readable, intentional tools.",
      },
      {
        title: "Trust & transparency",
        body: "Every capability is shown as Available, In development, or Planned. No fake benchmarks.",
      },
    ],
  },
  {
    slug: "discord-community",
    title: "ClawClient for Discord communities",
    headline: "A launcher your community can recommend with confidence.",
    description:
      "ClawClient is a Minecraft launcher that respects its users: transparent status labels, no telemetry, and a clear setup flow.",
    cta: {
      primary: "Download ClawClient",
      secondary: "Read Trust & Safety",
    },
    features: [
      {
        title: "Account clarity",
        body: "Microsoft and local profiles in one place. Identity choices stay understandable.",
      },
      {
        title: "No default telemetry",
        body: "ClawClient does not collect usage data, crash reports, or analytics by default.",
      },
      {
        title: "Community-friendly",
        body: "Profiles, mods, and servers are clearly labelled. No hidden behaviour.",
      },
    ],
  },
];

export const ALLOWED_UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export const ALLOWED_UTM_KEYS: ReadonlyArray<string> = ALLOWED_UTM_PARAMS;

const MAX_ATTRIBUTION_LENGTH = 100;
const REF_PATTERN = /^[a-zA-Z0-9_-]+$/;

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  ref?: string;
};

export function parseAttribution(
  searchParams: Record<string, string | string[] | undefined>,
): Attribution {
  const sanitized: Attribution = {};

  for (const key of ALLOWED_UTM_PARAMS) {
    const value = searchParams[key];
    if (
      typeof value === "string" &&
      value.length > 0 &&
      value.length <= MAX_ATTRIBUTION_LENGTH
    ) {
      sanitized[key] = value;
    }
  }

  if (typeof searchParams.ref === "string") {
    const ref = searchParams.ref;
    if (
      ref.length > 0 &&
      ref.length <= MAX_ATTRIBUTION_LENGTH &&
      REF_PATTERN.test(ref)
    ) {
      sanitized.ref = ref;
    }
  }

  return sanitized;
}

export function getAllCampaigns(): ReadonlyArray<CampaignEntry> {
  return campaigns;
}

export function getCampaignBySlug(slug: string): CampaignEntry | null {
  return campaigns.find((c) => c.slug === slug) ?? null;
}
