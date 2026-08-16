import type { ReactNode } from "react";

export type SessionIdentity = {
  user_id: string;
  minecraft_uuid: string;
  minecraft_username: string;
  email: string | null;
  created_at: string;
  expires_at: string;
};

export type MinecraftIdentity = {
  minecraft_uuid: string;
  minecraft_username: string;
  linked: boolean;
};

export type AuthError =
  | "not_configured"
  | "not_authenticated"
  | "session_expired"
  | "backend_unavailable"
  | "unknown";

const SESSION_COOKIE = "claw_session";

function platformApiUrl(): string | undefined {
  return process.env.PLATFORM_API_URL;
}

export async function getSessionFromApi(
  cookieHeader: string | null,
): Promise<{ identity: SessionIdentity | null; error: AuthError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { identity: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/auth/session`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { identity: null, error: "not_authenticated" };
    }

    if (!response.ok) {
      return { identity: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { identity: data as SessionIdentity, error: "not_authenticated" };
  } catch {
    return { identity: null, error: "backend_unavailable" };
  }
}

export async function getIdentitiesFromApi(
  cookieHeader: string | null,
): Promise<{ identities: MinecraftIdentity[]; error: AuthError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { identities: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/auth/identities`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { identities: [], error: "not_authenticated" };
    }

    if (!response.ok) {
      return { identities: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return { identities: data.identities as MinecraftIdentity[], error: "not_authenticated" };
  } catch {
    return { identities: [], error: "backend_unavailable" };
  }
}

export function getLoginUrl(): string {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return "/account?error=not_configured";
  }
  return `${apiUrl}/v1/auth/login`;
}

export function getLogoutUrl(): string {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return "/";
  }
  return `${apiUrl}/v1/auth/logout`;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function isAuthConfigured(): boolean {
  return !!platformApiUrl();
}

// --- Partner Dashboard Types ---

export type PartnerProfile = {
  partnerId: string;
  name: string;
  slug: string;
  status: "pending" | "active" | "suspended" | "revoked";
  createdAt: string;
  updatedAt: string;
};

export type PartnerServer = {
  serverId: string;
  displayName: string;
  description: string;
  tags: string[];
  status: string;
  placement: "organic" | "featured" | "sponsored";
  placementRank: number | null;
  sponsorLabel: string | null;
  playerCount: number | null;
  maxPlayerCount: number | null;
  statusCheckedAt: string | null;
};

export type PartnerAnalytics = {
  totalServers: number;
  totalImpressions: number;
  totalClicks: number;
  totalConversions: number;
  periodStart: string;
  periodEnd: string;
};

export type PartnerError =
  | "not_configured"
  | "not_authenticated"
  | "not_partner"
  | "partner_inactive"
  | "backend_unavailable"
  | "unknown";

// --- Creator Dashboard Types ---

export type CreatorProfile = {
  creatorId: string;
  name: string;
  referralCode: string;
  status: "active" | "suspended" | "revoked";
  createdAt: string;
  updatedAt: string;
};

export type CreatorCampaign = {
  campaignId: string;
  campaignName: string;
  campaignSlug: string;
  campaignStatus: "active" | "paused" | "ended";
  referralCode: string;
  status: "active" | "expired" | "revoked";
  startDate: string | null;
  endDate: string | null;
  totalClicks: number;
  totalConversions: number;
};

export type CreatorReferralCode = {
  referralCode: string;
  referralLink: string;
  campaignCount: number;
};

export type CreatorAnalytics = {
  totalClicks: number;
  totalConversions: number;
  totalCampaigns: number;
  periodStart: string;
  periodEnd: string;
};

export type CreatorReward = {
  rewardId: number;
  campaignId: string;
  amountCents: number;
  status: "pending" | "paid" | "cancelled";
  periodStart: string;
  periodEnd: string;
};

export type CreatorRewards = {
  rewards: CreatorReward[];
  totalPendingCents: number;
  totalPaidCents: number;
};

export type CreatorError =
  | "not_configured"
  | "not_authenticated"
  | "not_creator"
  | "creator_inactive"
  | "backend_unavailable"
  | "unknown";

// --- Partner Dashboard API Functions ---

export async function getPartnerProfileFromApi(
  cookieHeader: string | null,
): Promise<{ profile: PartnerProfile | null; error: PartnerError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { profile: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/partner/profile`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { profile: null, error: "not_authenticated" };
    }

    if (response.status === 403) {
      const data = await response.json();
      if (data.detail?.includes("not active")) {
        return { profile: null, error: "partner_inactive" };
      }
      return { profile: null, error: "not_partner" };
    }

    if (!response.ok) {
      return { profile: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { profile: data as PartnerProfile, error: "not_authenticated" };
  } catch {
    return { profile: null, error: "backend_unavailable" };
  }
}

export async function getPartnerServersFromApi(
  cookieHeader: string | null,
): Promise<{ servers: PartnerServer[]; error: PartnerError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { servers: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/partner/servers`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { servers: [], error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { servers: [], error: "not_partner" };
    }

    if (!response.ok) {
      return { servers: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return { servers: data.servers as PartnerServer[], error: "not_authenticated" };
  } catch {
    return { servers: [], error: "backend_unavailable" };
  }
}

export async function getPartnerAnalyticsFromApi(
  cookieHeader: string | null,
): Promise<{ analytics: PartnerAnalytics | null; error: PartnerError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { analytics: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/partner/analytics`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { analytics: null, error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { analytics: null, error: "not_partner" };
    }

    if (!response.ok) {
      return { analytics: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { analytics: data as PartnerAnalytics, error: "not_authenticated" };
  } catch {
    return { analytics: null, error: "backend_unavailable" };
  }
}

// --- Creator Dashboard API Functions ---

export async function getCreatorProfileFromApi(
  cookieHeader: string | null,
): Promise<{ profile: CreatorProfile | null; error: CreatorError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { profile: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/creator/profile`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { profile: null, error: "not_authenticated" };
    }

    if (response.status === 403) {
      const data = await response.json();
      if (data.detail?.includes("not active")) {
        return { profile: null, error: "creator_inactive" };
      }
      return { profile: null, error: "not_creator" };
    }

    if (!response.ok) {
      return { profile: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { profile: data as CreatorProfile, error: "not_authenticated" };
  } catch {
    return { profile: null, error: "backend_unavailable" };
  }
}

export async function getCreatorCampaignsFromApi(
  cookieHeader: string | null,
): Promise<{ campaigns: CreatorCampaign[]; error: CreatorError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { campaigns: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/creator/campaigns`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { campaigns: [], error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { campaigns: [], error: "not_creator" };
    }

    if (!response.ok) {
      return { campaigns: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return { campaigns: data.campaigns as CreatorCampaign[], error: "not_authenticated" };
  } catch {
    return { campaigns: [], error: "backend_unavailable" };
  }
}

export async function getCreatorReferralCodeFromApi(
  cookieHeader: string | null,
): Promise<{ referral: CreatorReferralCode | null; error: CreatorError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { referral: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/creator/referral-code`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { referral: null, error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { referral: null, error: "not_creator" };
    }

    if (!response.ok) {
      return { referral: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { referral: data as CreatorReferralCode, error: "not_authenticated" };
  } catch {
    return { referral: null, error: "backend_unavailable" };
  }
}

export async function getCreatorAnalyticsFromApi(
  cookieHeader: string | null,
): Promise<{ analytics: CreatorAnalytics | null; error: CreatorError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { analytics: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/creator/analytics`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { analytics: null, error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { analytics: null, error: "not_creator" };
    }

    if (!response.ok) {
      return { analytics: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { analytics: data as CreatorAnalytics, error: "not_authenticated" };
  } catch {
    return { analytics: null, error: "backend_unavailable" };
  }
}

export async function getCreatorRewardsFromApi(
  cookieHeader: string | null,
): Promise<{ rewards: CreatorRewards | null; error: CreatorError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { rewards: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/creator/rewards`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { rewards: null, error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { rewards: null, error: "not_creator" };
    }

    if (!response.ok) {
      return { rewards: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { rewards: data as CreatorRewards, error: "not_authenticated" };
  } catch {
    return { rewards: null, error: "backend_unavailable" };
  }
}

// --- Cosmetics Types ---

export type CosmeticItem = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  rarity: string;
  assetUrl: string | null;
  previewUrl: string | null;
  active: boolean;
};

export type OwnedCosmetic = CosmeticItem & {
  grantedAt: string;
};

export type EquippedItem = {
  cosmeticId: string;
  cosmeticType: string;
  name: string;
  assetUrl: string | null;
  previewUrl: string | null;
  equippedAt: string;
};

export type CosmeticsError =
  | "not_configured"
  | "not_authenticated"
  | "backend_unavailable"
  | "unknown";

// --- Cosmetics API Functions ---

export async function getCosmeticsCatalogFromApi(): Promise<{
  cosmetics: CosmeticItem[];
  error: CosmeticsError;
}> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { cosmetics: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/cosmetics/catalog`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { cosmetics: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return {
      cosmetics: data.cosmetics.map((c: Record<string, unknown>) => ({
        id: c.id,
        name: c.name,
        description: c.description ?? null,
        type: c.type,
        rarity: c.rarity,
        assetUrl: c.asset_url ?? null,
        previewUrl: c.preview_url ?? null,
        active: c.active,
      })),
      error: "not_authenticated",
    };
  } catch {
    return { cosmetics: [], error: "backend_unavailable" };
  }
}

export async function getOwnedCosmeticsFromApi(
  cookieHeader: string | null,
): Promise<{ cosmetics: OwnedCosmetic[]; error: CosmeticsError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { cosmetics: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/cosmetics/owned`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { cosmetics: [], error: "not_authenticated" };
    }

    if (!response.ok) {
      return { cosmetics: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return {
      cosmetics: data.cosmetics.map((c: Record<string, unknown>) => ({
        id: c.id,
        name: c.name,
        description: c.description ?? null,
        type: c.type,
        rarity: c.rarity,
        assetUrl: c.asset_url ?? null,
        previewUrl: c.preview_url ?? null,
        grantedAt: c.granted_at,
      })),
      error: "not_authenticated",
    };
  } catch {
    return { cosmetics: [], error: "backend_unavailable" };
  }
}

export async function getEquippedCosmeticsFromApi(
  cookieHeader: string | null,
): Promise<{ equipped: EquippedItem[]; error: CosmeticsError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { equipped: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/cosmetics/equipped`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { equipped: [], error: "not_authenticated" };
    }

    if (!response.ok) {
      return { equipped: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return {
      equipped: data.equipped.map((e: Record<string, unknown>) => ({
        cosmeticId: e.cosmetic_id,
        cosmeticType: e.cosmetic_type,
        name: e.name,
        assetUrl: e.asset_url ?? null,
        previewUrl: e.preview_url ?? null,
        equippedAt: e.equipped_at,
      })),
      error: "not_authenticated",
    };
  } catch {
    return { equipped: [], error: "backend_unavailable" };
  }
}
