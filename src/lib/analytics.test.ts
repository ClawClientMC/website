import { describe, expect, it, beforeEach } from "vitest";

import {
  trackEvent,
  trackPageView,
  trackDownloadIntent,
  trackDownloadClick,
  trackCampaignView,
  initializeAnalytics,
  isAnalyticsEnabled,
  getAnalyticsConfig,
  validateEventPayload,
  PROHIBITED_EVENT_FIELDS,
  PROHIBITED_URL_PARAMS,
  type AnalyticsEvent,
  type AnalyticsProviderAdapter,
} from "./analytics";
import type { Attribution } from "./campaigns";

function createTestAdapter(): AnalyticsProviderAdapter & {
  events: AnalyticsEvent[];
} {
  const events: AnalyticsEvent[] = [];
  return {
    events,
    track: (event) => events.push(event),
  };
}

describe("analytics event schemas", () => {
  it("validates a page_view event", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/features",
    });
    expect(result.valid).toBe(true);
  });

  it("validates a download_click event with platform", () => {
    const result = validateEventPayload({
      type: "download_click",
      platform: "windows",
      path: "/download",
    });
    expect(result.valid).toBe(true);
  });

  it("validates a campaign_view event", () => {
    const result = validateEventPayload({
      type: "campaign_view",
      campaign: "tiktok-creators",
      path: "/campaign/tiktok-creators",
    });
    expect(result.valid).toBe(true);
  });

  it("validates a download_intent event", () => {
    const result = validateEventPayload({
      type: "download_intent",
      path: "/download",
    });
    expect(result.valid).toBe(true);
  });

  it("rejects unknown event types", () => {
    const result = validateEventPayload({
      type: "unknown_event",
      path: "/",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects events with missing required fields", () => {
    const result = validateEventPayload({
      type: "download_click",
      path: "/download",
    });
    expect(result.valid).toBe(false);
  });

  it("accepts valid attribution fields", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      utm_source: "twitter",
      utm_medium: "social",
      utm_campaign: "launch",
      utm_content: "hero",
      ref: "creator-123",
    });
    expect(result.valid).toBe(true);
  });

  it("rejects attribution fields that exceed max length", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      utm_source: "x".repeat(101),
    });
    expect(result.valid).toBe(false);
  });

  it("rejects ref with invalid characters", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      ref: "invalid ref with spaces",
    });
    expect(result.valid).toBe(false);
  });
});

describe("prohibited identifiers", () => {
  for (const field of PROHIBITED_EVENT_FIELDS) {
    it(`rejects events containing prohibited field: ${field}`, () => {
      const result = validateEventPayload({
        type: "page_view",
        path: "/",
        [field]: "some-value",
      });
      expect(result.valid).toBe(false);
    });
  }

  it("rejects microsoft_id in event payload", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      microsoft_id: "00000000-0000-0000-0000-000000000000",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects minecraft_uuid in event payload", () => {
    const result = validateEventPayload({
      type: "download_click",
      platform: "windows",
      path: "/download",
      minecraft_uuid: "00000000-0000-0000-0000-000000000000",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects launcher_token in event payload", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      launcher_token: "secret-token",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects access_token in event payload", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      access_token: "ya29.secret",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects fingerprint in event payload", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      fingerprint: "canvas-hash-123",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects password in event payload", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      password: "hunter2",
    });
    expect(result.valid).toBe(false);
  });
});

describe("prohibited URL parameters", () => {
  for (const param of PROHIBITED_URL_PARAMS) {
    it(`rejects event values containing prohibited URL param: ${param}`, () => {
      const result = validateEventPayload({
        type: "page_view",
        path: "/",
        utm_source: `${param}=secret-value`,
      });
      expect(result.valid).toBe(false);
    });
  }

  it("rejects utm_source containing code parameter", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      utm_source: "code=authorization-code-here",
    });
    expect(result.valid).toBe(false);
  });

  it("rejects utm_content containing token parameter", () => {
    const result = validateEventPayload({
      type: "page_view",
      path: "/",
      utm_content: "token=secret",
    });
    expect(result.valid).toBe(false);
  });
});

describe("consent and opt-out", () => {
  beforeEach(() => {
    initializeAnalytics({ enabled: false });
  });

  it("tracks nothing when analytics is disabled", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: false }, adapter);

    trackPageView("/");

    expect(adapter.events).toHaveLength(0);
  });

  it("tracks events when analytics is enabled", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackPageView("/features");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].type).toBe("page_view");
  });

  it("reports analytics as disabled when initialized off", () => {
    initializeAnalytics({ enabled: false });
    expect(isAnalyticsEnabled()).toBe(false);
  });

  it("reports analytics as enabled when initialized on", () => {
    initializeAnalytics({ enabled: true });
    expect(isAnalyticsEnabled()).toBe(true);
  });

  it("returns current config", () => {
    initializeAnalytics({ enabled: true, measurementId: "test-123" });
    const config = getAnalyticsConfig();
    expect(config.enabled).toBe(true);
    expect(config.measurementId).toBe("test-123");
  });
});

describe("attribution handling", () => {
  beforeEach(() => {
    initializeAnalytics({ enabled: true });
  });

  it("includes attribution in tracked events", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    const attribution: Attribution = {
      utm_source: "twitter",
      utm_campaign: "launch",
    };

    trackPageView("/features", attribution);

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0]).toMatchObject({
      type: "page_view",
      path: "/features",
      utm_source: "twitter",
      utm_campaign: "launch",
    });
  });

  it("includes ref in tracked events", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackDownloadClick("windows", "/download", { ref: "creator-abc" });

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0]).toMatchObject({
      type: "download_click",
      platform: "windows",
      ref: "creator-abc",
    });
  });

  it("omits undefined attribution fields", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackPageView("/", { utm_source: "discord" });

    expect(adapter.events).toHaveLength(1);
    const event = adapter.events[0] as Record<string, unknown>;
    expect(event.utm_source).toBe("discord");
    expect(event.utm_medium).toBeUndefined();
    expect(event.utm_campaign).toBeUndefined();
    expect(event.utm_content).toBeUndefined();
    expect(event.ref).toBeUndefined();
  });
});

describe("path sanitization", () => {
  beforeEach(() => {
    initializeAnalytics({ enabled: true });
  });

  it("strips query parameters from paths", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackPageView("/download?token=secret&code=abc");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].path).toBe("/download");
  });

  it("strips hash from paths", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackPageView("/features#section");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].path).toBe("/features");
  });

  it("truncates long paths", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    const longPath = "/" + "a".repeat(600);
    trackPageView(longPath);

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].path.length).toBeLessThanOrEqual(500);
  });
});

describe("campaign sanitization", () => {
  beforeEach(() => {
    initializeAnalytics({ enabled: true });
  });

  it("strips non-alphanumeric characters from campaign names", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackCampaignView("tiktok-creators<script>", "/campaign/tiktok-creators");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].type).toBe("campaign_view");
    if (adapter.events[0].type === "campaign_view") {
      expect(adapter.events[0].campaign).toBe("tiktok-creatorsscript");
    }
  });

  it("truncates long campaign names", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    const longCampaign = "a".repeat(200);
    trackCampaignView(longCampaign, "/campaign/test");

    expect(adapter.events).toHaveLength(1);
    if (adapter.events[0].type === "campaign_view") {
      expect(adapter.events[0].campaign.length).toBeLessThanOrEqual(100);
    }
  });
});

describe("event tracking functions", () => {
  beforeEach(() => {
    initializeAnalytics({ enabled: true });
  });

  it("trackEvent dispatches validated events", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackEvent({ type: "page_view", path: "/" });

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].type).toBe("page_view");
  });

  it("trackEvent rejects invalid events silently", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackEvent({ type: "invalid" } as unknown as AnalyticsEvent);

    expect(adapter.events).toHaveLength(0);
  });

  it("trackDownloadIntent fires download_intent event", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackDownloadIntent("/download");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0].type).toBe("download_intent");
  });

  it("trackDownloadClick fires download_click event with platform", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackDownloadClick("macos", "/download");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0]).toMatchObject({
      type: "download_click",
      platform: "macos",
      path: "/download",
    });
  });

  it("trackCampaignView fires campaign_view event", () => {
    const adapter = createTestAdapter();
    initializeAnalytics({ enabled: true }, adapter);

    trackCampaignView("discord-community", "/campaign/discord-community");

    expect(adapter.events).toHaveLength(1);
    expect(adapter.events[0]).toMatchObject({
      type: "campaign_view",
      campaign: "discord-community",
      path: "/campaign/discord-community",
    });
  });
});

describe("analytics-disabled mode", () => {
  it("site functions normally when analytics is disabled", () => {
    initializeAnalytics({ enabled: false });

    expect(isAnalyticsEnabled()).toBe(false);

    trackPageView("/features");
    trackDownloadIntent("/download");
    trackDownloadClick("windows", "/download");
    trackCampaignView("test", "/campaign/test");
  });

  it("site functions normally when adapter throws", () => {
    const throwingAdapter: AnalyticsProviderAdapter = {
      track: () => {
        throw new Error("Provider unavailable");
      },
    };
    initializeAnalytics({ enabled: true }, throwingAdapter);

    expect(() => trackPageView("/")).not.toThrow();
  });
});
