import { ALLOWED_UTM_KEYS, type Attribution } from "./campaigns";

const PROHIBITED_EVENT_FIELDS = [
  "microsoft_id",
  "minecraft_uuid",
  "minecraft_username",
  "xbox_id",
  "xbox_gamertag",
  "launcher_token",
  "launcher_log",
  "access_token",
  "refresh_token",
  "session_token",
  "client_secret",
  "password",
  "fingerprint",
  "canvas_hash",
  "webgl_hash",
  "audio_hash",
  "screen_resolution",
  "installed_fonts",
  "browser_plugins",
  "user_agent_full",
  "ip_address",
  "cookie_id",
] as const;

const PROHIBITED_URL_PARAMS = [
  "code",
  "state",
  "token",
  "access_token",
  "refresh_token",
  "session",
  "auth",
  "key",
  "secret",
  "password",
  "sid",
  "jwt",
] as const;

const VALID_EVENT_TYPES = [
  "page_view",
  "download_intent",
  "download_click",
  "campaign_view",
] as const;

const VALID_PLATFORMS = ["windows", "macos", "linux"] as const;

type BaseAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  ref?: string;
};

export type PageViewEvent = {
  type: "page_view";
  path: string;
} & BaseAttribution;

export type DownloadIntentEvent = {
  type: "download_intent";
  path: string;
} & BaseAttribution;

export type DownloadClickEvent = {
  type: "download_click";
  platform: "windows" | "macos" | "linux";
  path: string;
} & BaseAttribution;

export type CampaignViewEvent = {
  type: "campaign_view";
  campaign: string;
  path: string;
} & BaseAttribution;

export type AnalyticsEvent =
  | PageViewEvent
  | DownloadIntentEvent
  | DownloadClickEvent
  | CampaignViewEvent;

export type AnalyticsConfig = {
  enabled: boolean;
  measurementId?: string;
};

export type AnalyticsProviderAdapter = {
  track: (event: AnalyticsEvent) => void;
};

const NULL_ADAPTER: AnalyticsProviderAdapter = {
  track: () => {},
};

let currentAdapter: AnalyticsProviderAdapter = NULL_ADAPTER;
let currentConfig: AnalyticsConfig = { enabled: false };

export function initializeAnalytics(
  config: AnalyticsConfig,
  adapter?: AnalyticsProviderAdapter,
): void {
  currentConfig = config;
  currentAdapter = config.enabled && adapter ? adapter : NULL_ADAPTER;
}

export function getAnalyticsConfig(): AnalyticsConfig {
  return { ...currentConfig };
}

export function isAnalyticsEnabled(): boolean {
  return currentConfig.enabled;
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!currentConfig.enabled) {
    return;
  }

  const validated = validateEventPayload(event);
  if (!validated.valid) {
    return;
  }

  try {
    currentAdapter.track(validated.event);
  } catch {
    // Adapter errors must not crash the site.
  }
}

export function trackPageView(path: string, attribution?: Attribution): void {
  trackEvent({
    type: "page_view",
    path: sanitizePath(path),
    ...sanitizeAttribution(attribution),
  });
}

export function trackDownloadIntent(
  path: string,
  attribution?: Attribution,
): void {
  trackEvent({
    type: "download_intent",
    path: sanitizePath(path),
    ...sanitizeAttribution(attribution),
  });
}

export function trackDownloadClick(
  platform: "windows" | "macos" | "linux",
  path: string,
  attribution?: Attribution,
): void {
  trackEvent({
    type: "download_click",
    platform,
    path: sanitizePath(path),
    ...sanitizeAttribution(attribution),
  });
}

export function trackCampaignView(
  campaign: string,
  path: string,
  attribution?: Attribution,
): void {
  trackEvent({
    type: "campaign_view",
    campaign: sanitizeCampaign(campaign),
    path: sanitizePath(path),
    ...sanitizeAttribution(attribution),
  });
}

function sanitizePath(path: string): string {
  const url = new URL(path, "https://placeholder.invalid");
  url.search = "";
  url.hash = "";
  let sanitized = url.pathname;
  if (sanitized.length > 500) {
    sanitized = sanitized.slice(0, 500);
  }
  return sanitized;
}

function sanitizeCampaign(campaign: string): string {
  const sanitized = campaign.replace(/[^a-zA-Z0-9_-]/g, "");
  return sanitized.slice(0, 100);
}

function sanitizeAttribution(
  attribution?: Attribution,
): Partial<Attribution> {
  if (!attribution) {
    return {};
  }

  const sanitized: Partial<Attribution> = {};
  for (const key of ALLOWED_UTM_KEYS) {
    const value = attribution[key as keyof Attribution];
    if (typeof value === "string" && value.length > 0 && value.length <= 100) {
      (sanitized as Record<string, string | undefined>)[key] = value;
    }
  }

  if (
    typeof attribution.ref === "string" &&
    attribution.ref.length > 0 &&
    attribution.ref.length <= 100 &&
    /^[a-zA-Z0-9_-]+$/.test(attribution.ref)
  ) {
    sanitized.ref = attribution.ref;
  }

  return sanitized;
}

export function validateEventPayload(
  event: unknown,
): { valid: true; event: AnalyticsEvent } | { valid: false; error: string } {
  if (typeof event !== "object" || event === null) {
    return { valid: false, error: "Event must be an object" };
  }

  const raw = event as Record<string, unknown>;
  for (const field of PROHIBITED_EVENT_FIELDS) {
    if (field in raw) {
      return {
        valid: false,
        error: `Analytics event contains prohibited field: ${field}`,
      };
    }
  }

  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") {
      try {
        assertNoProhibitedUrlParams(key, value);
      } catch (error) {
        return {
          valid: false,
          error: error instanceof Error ? error.message : "Validation failed",
        };
      }
    }
  }

  return validateEventShape(raw);
}

function validateEventShape(
  raw: Record<string, unknown>,
):
  | { valid: true; event: AnalyticsEvent }
  | { valid: false; error: string } {
  const type = raw.type;
  if (
    typeof type !== "string" ||
    !VALID_EVENT_TYPES.includes(
      type as (typeof VALID_EVENT_TYPES)[number],
    )
  ) {
    return { valid: false, error: `Unknown event type: ${String(type)}` };
  }

  if (typeof raw.path !== "string" || raw.path.length > 500) {
    return {
      valid: false,
      error: "path: must be a string with max 500 characters",
    };
  }

  const attribution = validateAttribution(raw);
  if ("error" in attribution) {
    return attribution;
  }

  switch (type) {
    case "page_view":
      return {
        valid: true,
        event: { type: "page_view", path: raw.path, ...attribution },
      };
    case "download_intent":
      return {
        valid: true,
        event: { type: "download_intent", path: raw.path, ...attribution },
      };
    case "download_click": {
      const platform = raw.platform;
      if (
        typeof platform !== "string" ||
        !VALID_PLATFORMS.includes(platform as (typeof VALID_PLATFORMS)[number])
      ) {
        return {
          valid: false,
          error: "platform: must be windows, macos, or linux",
        };
      }
      return {
        valid: true,
        event: {
          type: "download_click",
          platform: platform as "windows" | "macos" | "linux",
          path: raw.path,
          ...attribution,
        },
      };
    }
    case "campaign_view": {
      const campaign = raw.campaign;
      if (typeof campaign !== "string" || campaign.length > 100) {
        return {
          valid: false,
          error: "campaign: must be a string with max 100 characters",
        };
      }
      return {
        valid: true,
        event: {
          type: "campaign_view",
          campaign,
          path: raw.path,
          ...attribution,
        },
      };
    }
    default:
      return { valid: false, error: `Unknown event type: ${type}` };
  }
}

function validateAttribution(
  raw: Record<string, unknown>,
): BaseAttribution | { valid: false; error: string } {
  const result: BaseAttribution = {};
  const utmKeys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
  ] as const;

  for (const key of utmKeys) {
    const value = raw[key];
    if (value !== undefined) {
      if (typeof value !== "string" || value.length > 100) {
        return {
          valid: false,
          error: `${key}: must be a string with max 100 characters`,
        };
      }
      result[key] = value;
    }
  }

  if (raw.ref !== undefined) {
    const ref = raw.ref;
    if (
      typeof ref !== "string" ||
      ref.length > 100 ||
      !/^[a-zA-Z0-9_-]+$/.test(ref)
    ) {
      return {
        valid: false,
        error:
          "ref: must be alphanumeric with hyphens/underscores, max 100 chars",
      };
    }
    result.ref = ref;
  }

  return result;
}

function assertNoProhibitedUrlParams(key: string, value: string): void {
  if (key === "path") {
    return;
  }

  const lowerValue = value.toLowerCase();
  for (const param of PROHIBITED_URL_PARAMS) {
    if (lowerValue.includes(`${param}=`) || lowerValue.includes(`${param}:`)) {
      throw new Error(
        `Analytics event value contains prohibited URL parameter: ${param}`,
      );
    }
  }
}

export { ALLOWED_UTM_KEYS, PROHIBITED_EVENT_FIELDS, PROHIBITED_URL_PARAMS };
