import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import {
  getCosmeticsCatalogFromApi,
  getOwnedCosmeticsFromApi,
  getEquippedCosmeticsFromApi,
} from "./auth";

const mockCosmetics = [
  {
    id: "cape-1",
    name: "Test Cape",
    description: "A test cape",
    type: "cape",
    rarity: "common",
    asset_url: "https://assets.test/cape.png",
    preview_url: "https://assets.test/cape-preview.png",
    active: true,
  },
  {
    id: "badge-1",
    name: "Supporter Badge",
    description: null,
    type: "badge",
    rarity: "rare",
    asset_url: null,
    preview_url: null,
    active: true,
  },
];

const mockOwned = [
  {
    id: "cape-1",
    name: "Test Cape",
    description: "A test cape",
    type: "cape",
    rarity: "common",
    asset_url: "https://assets.test/cape.png",
    preview_url: null,
    granted_at: "2026-08-16T12:00:00Z",
  },
];

const mockEquipped = [
  {
    cosmetic_id: "cape-1",
    cosmetic_type: "cape",
    name: "Test Cape",
    asset_url: "https://assets.test/cape.png",
    preview_url: null,
    equipped_at: "2026-08-16T12:00:00Z",
  },
];

describe("getCosmeticsCatalogFromApi", () => {
  const originalEnv = process.env.PLATFORM_API_URL;

  beforeEach(() => {
    vi.stubEnv("PLATFORM_API_URL", "https://api.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns mapped cosmetics on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ cosmetics: mockCosmetics }),
      }),
    );

    const result = await getCosmeticsCatalogFromApi();
    expect(result.error).toBe("not_authenticated");
    expect(result.cosmetics).toHaveLength(2);
    expect(result.cosmetics[0].id).toBe("cape-1");
    expect(result.cosmetics[0].assetUrl).toBe("https://assets.test/cape.png");
    expect(result.cosmetics[1].assetUrl).toBeNull();
  });

  it("returns empty list when not configured", async () => {
    vi.stubEnv("PLATFORM_API_URL", "");
    const result = await getCosmeticsCatalogFromApi();
    expect(result.error).toBe("not_configured");
    expect(result.cosmetics).toEqual([]);
  });

  it("returns backend_unavailable on fetch failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    const result = await getCosmeticsCatalogFromApi();
    expect(result.error).toBe("backend_unavailable");
    expect(result.cosmetics).toEqual([]);
  });

  it("returns backend_unavailable on non-ok response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 500 }),
    );
    const result = await getCosmeticsCatalogFromApi();
    expect(result.error).toBe("backend_unavailable");
  });
});

describe("getOwnedCosmeticsFromApi", () => {
  beforeEach(() => {
    vi.stubEnv("PLATFORM_API_URL", "https://api.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns mapped owned cosmetics on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ cosmetics: mockOwned }),
      }),
    );

    const result = await getOwnedCosmeticsFromApi("claw_session=test");
    expect(result.cosmetics).toHaveLength(1);
    expect(result.cosmetics[0].id).toBe("cape-1");
    expect(result.cosmetics[0].grantedAt).toBe("2026-08-16T12:00:00Z");
    expect(result.cosmetics[0].assetUrl).toBe("https://assets.test/cape.png");
  });

  it("returns not_authenticated on 401", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401 }),
    );

    const result = await getOwnedCosmeticsFromApi("claw_session=bad");
    expect(result.error).toBe("not_authenticated");
    expect(result.cosmetics).toEqual([]);
  });

  it("returns empty when not configured", async () => {
    vi.stubEnv("PLATFORM_API_URL", "");
    const result = await getOwnedCosmeticsFromApi(null);
    expect(result.error).toBe("not_configured");
    expect(result.cosmetics).toEqual([]);
  });
});

describe("getEquippedCosmeticsFromApi", () => {
  beforeEach(() => {
    vi.stubEnv("PLATFORM_API_URL", "https://api.test");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns mapped equipped items on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ equipped: mockEquipped }),
      }),
    );

    const result = await getEquippedCosmeticsFromApi("claw_session=test");
    expect(result.equipped).toHaveLength(1);
    expect(result.equipped[0].cosmeticId).toBe("cape-1");
    expect(result.equipped[0].cosmeticType).toBe("cape");
    expect(result.equipped[0].name).toBe("Test Cape");
    expect(result.equipped[0].assetUrl).toBe("https://assets.test/cape.png");
  });

  it("returns not_authenticated on 401", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: false, status: 401 }),
    );

    const result = await getEquippedCosmeticsFromApi("claw_session=bad");
    expect(result.error).toBe("not_authenticated");
    expect(result.equipped).toEqual([]);
  });

  it("returns backend_unavailable on fetch error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("timeout")));
    const result = await getEquippedCosmeticsFromApi("claw_session=test");
    expect(result.error).toBe("backend_unavailable");
    expect(result.equipped).toEqual([]);
  });

  it("handles null asset_url and preview_url", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve({
            equipped: [
              {
                cosmetic_id: "badge-1",
                cosmetic_type: "badge",
                name: "Badge",
                asset_url: null,
                preview_url: null,
                equipped_at: "2026-08-16T12:00:00Z",
              },
            ],
          }),
      }),
    );

    const result = await getEquippedCosmeticsFromApi("claw_session=test");
    expect(result.equipped[0].assetUrl).toBeNull();
    expect(result.equipped[0].previewUrl).toBeNull();
  });
});
