import { describe, expect, it } from "vitest";

import { getPublicEnvironment } from "./env";

describe("getPublicEnvironment", () => {
  it("uses secure defaults when no optional public configuration is set", () => {
    expect(getPublicEnvironment({})).toEqual({
      releasesApiUrl: undefined,
      siteUrl: "https://clawclient.net",
    });
  });

  it("accepts absolute public endpoints", () => {
    expect(
      getPublicEnvironment({
        NEXT_PUBLIC_RELEASES_API_URL: "https://releases.clawclient.net/v1",
        NEXT_PUBLIC_SITE_URL: "https://preview.clawclient.net",
      }),
    ).toEqual({
      releasesApiUrl: "https://releases.clawclient.net/v1",
      siteUrl: "https://preview.clawclient.net",
    });
  });

  it("rejects malformed public URLs", () => {
    expect(() =>
      getPublicEnvironment({ NEXT_PUBLIC_SITE_URL: "not-a-url" }),
    ).toThrow("Invalid public environment configuration");
  });
});
