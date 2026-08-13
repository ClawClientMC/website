import { publicEnvironment } from "@/env";

export type ReleaseChannel = "stable" | "beta" | "alpha";

export type Platform = "windows" | "macos" | "linux";

export type DownloadArtifact = {
  platform: Platform;
  architecture: string;
  url: string;
  filename: string;
  sha256?: string;
  signature?: string;
};

export type ReleaseEntry = {
  version: string;
  date: string;
  channel: ReleaseChannel;
  title: string;
  summary: string;
  downloads: ReadonlyArray<DownloadArtifact>;
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
    downloads: [
      {
        platform: "windows",
        architecture: "x64",
        url: "https://github.com/ClawClientMC/website/releases/download/v0.1.0/ClawClient-0.1.0-x64-setup.exe",
        filename: "ClawClient-0.1.0-x64-setup.exe",
      },
      {
        platform: "macos",
        architecture: "arm64",
        url: "https://github.com/ClawClientMC/website/releases/download/v0.1.0/ClawClient-0.1.0-arm64.dmg",
        filename: "ClawClient-0.1.0-arm64.dmg",
      },
      {
        platform: "linux",
        architecture: "x64",
        url: "https://github.com/ClawClientMC/website/releases/download/v0.1.0/ClawClient-0.1.0-x64.AppImage",
        filename: "ClawClient-0.1.0-x64.AppImage",
      },
    ],
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

export async function getLatestRelease(): Promise<ReleaseEntry | null> {
  const releases = await getReleases();
  return releases[0] ?? null;
}

export function getDownloadForPlatform(
  release: ReleaseEntry,
  platform: Platform,
): DownloadArtifact | null {
  return release.downloads.find((d) => d.platform === platform) ?? null;
}

export function getAllPlatforms(
  release: ReleaseEntry,
): ReadonlyArray<Platform> {
  const platforms = new Set<Platform>();
  for (const download of release.downloads) {
    platforms.add(download.platform);
  }
  return Array.from(platforms);
}
