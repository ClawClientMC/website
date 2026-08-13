import { z } from "zod";

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

const ALLOWED_UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

const attributionSchema = z.object({
  utm_source: z.string().max(100).optional(),
  utm_medium: z.string().max(100).optional(),
  utm_campaign: z.string().max(100).optional(),
  utm_content: z.string().max(100).optional(),
  ref: z
    .string()
    .max(100)
    .regex(/^[a-zA-Z0-9_-]+$/)
    .optional(),
});

export type Attribution = z.infer<typeof attributionSchema>;

export function parseAttribution(
  searchParams: Record<string, string | string[] | undefined>,
): Attribution {
  const sanitized: Record<string, string | undefined> = {};

  for (const key of ALLOWED_UTM_PARAMS) {
    const value = searchParams[key];
    if (typeof value === "string") {
      sanitized[key] = value;
    }
  }

  if (typeof searchParams.ref === "string") {
    sanitized.ref = searchParams.ref;
  }

  const result = attributionSchema.safeParse(sanitized);
  return result.success ? result.data : {};
}

export function getAllCampaigns(): ReadonlyArray<CampaignEntry> {
  return campaigns;
}

export function getCampaignBySlug(slug: string): CampaignEntry | null {
  return campaigns.find((c) => c.slug === slug) ?? null;
}
