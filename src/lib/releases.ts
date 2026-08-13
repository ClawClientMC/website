import { publicEnvironment } from "@/env";

export type ReleaseChannel = "stable" | "beta" | "alpha";

export type ReleaseEntry = {
  version: string;
  date: string;
  channel: ReleaseChannel;
  title: string;
  summary: string;
  changes: ReadonlyArray<{
    category: string;
    items: ReadonlyArray<string>;
  }>;
};

const fallbackReleases: ReadonlyArray<ReleaseEntry> = [
  {
    version: "0.1.0",
    date: "2026-08-01",
    channel: "stable",
    title: "Initial public release",
    summary:
      "First public release of the ClawClient desktop launcher for Minecraft.",
    changes: [
      {
        category: "Launcher",
        items: [
          "Profile management with Minecraft version and loader context",
          "Microsoft account and local profile support",
          "Modrinth mod discovery and installation",
          "Claw Optimized profile direction",
          "Dark launcher interface with near-black theme",
        ],
      },
      {
        category: "Platform",
        items: [
          "Windows, macOS, and Linux desktop support",
          "Automatic launcher update checks",
          "Download integrity verification",
        ],
      },
    ],
  },
];

export async function getReleases(): Promise<ReadonlyArray<ReleaseEntry>> {
  if (!publicEnvironment.releasesApiUrl) {
    return fallbackReleases;
  }

  try {
    const response = await fetch(publicEnvironment.releasesApiUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallbackReleases;
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return fallbackReleases;
    }

    return data as ReadonlyArray<ReleaseEntry>;
  } catch {
    return fallbackReleases;
  }
}

export async function getRelease(
  version: string,
): Promise<ReleaseEntry | null> {
  const releases = await getReleases();
  return releases.find((r) => r.version === version) ?? null;
}
