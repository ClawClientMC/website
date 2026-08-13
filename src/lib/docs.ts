export type DocSection = {
  heading: string;
  body: string;
  list?: ReadonlyArray<string>;
};

export type DocEntry = {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: ReadonlyArray<DocSection>;
};

const docs: ReadonlyArray<DocEntry> = [
  {
    slug: "installation",
    title: "Installation",
    description:
      "How to download and install ClawClient on Windows, macOS, and Linux.",
    category: "Getting started",
    sections: [
      {
        heading: "Download ClawClient",
        body: "Download the installer for your operating system from the official ClawClient download page. Always use the official source — third-party mirrors are not verified.",
      },
      {
        heading: "Windows",
        body: "Run the downloaded installer. Windows SmartScreen may show a warning for new publishers — click More info, then Run anyway. ClawClient installs to your user profile by default and does not require administrator access.",
        list: [
          "Download the Windows installer from clawclient.net/download",
          "Run the .exe installer",
          "Follow the on-screen setup prompts",
          "Launch ClawClient from the Start menu or desktop shortcut",
        ],
      },
      {
        heading: "macOS",
        body: "Open the downloaded .dmg file and drag ClawClient to your Applications folder. macOS Gatekeeper may warn about an unidentified developer — right-click the app and select Open to bypass the first time.",
        list: [
          "Download the macOS .dmg from clawclient.net/download",
          "Open the .dmg and drag to Applications",
          "Right-click and select Open on first launch",
        ],
      },
      {
        heading: "Linux",
        body: "Make the downloaded AppImage or .deb package executable and run it. Package availability varies by distribution.",
        list: [
          "Download the Linux package from clawclient.net/download",
          "For AppImage: chmod +x and run",
          "For .deb: install with dpkg -i",
        ],
      },
    ],
  },
  {
    slug: "microsoft-login",
    title: "Microsoft login",
    description:
      "How to sign in with your Microsoft account to access multiplayer and skins.",
    category: "Getting started",
    sections: [
      {
        heading: "Why Microsoft login is needed",
        body: "Minecraft requires a Microsoft account for multiplayer, skins, and marketplace access. ClawClient uses the standard Microsoft device-code authentication flow — your credentials are entered in the official Microsoft window, not in ClawClient.",
      },
      {
        heading: "Signing in",
        body: "When you first launch ClawClient, you will be prompted to add a Microsoft account. The launcher will open a browser window or show a device code for you to enter at microsoft.com/link. Once authenticated, the session token is stored locally on your device.",
        list: [
          "Click Add Account in the launcher",
          "A device code or browser window will appear",
          "Enter the code at microsoft.com/link or complete the browser flow",
          "The launcher will confirm your account once authenticated",
        ],
      },
      {
        heading: "Session and token storage",
        body: "Your Microsoft session token is stored in your operating system's credential manager. ClawClient does not send your token to Claw servers. If your session expires, you will be prompted to re-authenticate.",
      },
    ],
  },
  {
    slug: "local-profiles",
    title: "Offline and local profiles",
    description:
      "How to use local Minecraft profiles without a Microsoft account.",
    category: "Getting started",
    sections: [
      {
        heading: "What are local profiles",
        body: "Local profiles let you use ClawClient without signing in to a Microsoft account. This is useful for single-player, modded setups, or offline play. Local profiles do not have access to multiplayer servers that require Microsoft authentication.",
      },
      {
        heading: "Creating a local profile",
        body: "In the launcher, select Add Profile and choose Local profile. Enter a display name and select your Minecraft version and loader. The profile will be stored entirely on your device.",
        list: [
          "Open the launcher and go to Profiles",
          "Click Add Profile, then choose Local",
          "Set a display name, Minecraft version, and loader",
          "The profile is stored locally and works offline",
        ],
      },
      {
        heading: "Limitations",
        body: "Local profiles cannot join servers that require Microsoft authentication. Skins and marketplace content are not available without a Microsoft account. These are Minecraft platform restrictions, not ClawClient limitations.",
      },
    ],
  },
  {
    slug: "java-ram-settings",
    title: "Java, RAM, and profile settings",
    description:
      "How to configure Java version, memory allocation, and profile settings in ClawClient.",
    category: "Configuration",
    sections: [
      {
        heading: "Java version",
        body: "ClawClient detects the Java installation on your system. Minecraft 1.17+ requires Java 17 or later. If no compatible Java is found, the launcher will offer to download a compatible version.",
      },
      {
        heading: "Memory allocation",
        body: "You can set the maximum RAM allocation per profile in the profile settings. The default is 2 GB, which is sufficient for vanilla Minecraft. Modded setups may need 4–8 GB depending on the modpack.",
        list: [
          "Go to Profiles and select the profile to configure",
          "Open Profile Settings",
          "Set the Maximum Memory value",
          "Save and launch to apply",
        ],
      },
      {
        heading: "Profile settings",
        body: "Each profile has its own Minecraft version, loader, Java path, memory allocation, and game directory. Profiles are independent — changing settings in one profile does not affect others.",
      },
    ],
  },
  {
    slug: "mods-and-profiles",
    title: "Mods and profiles",
    description:
      "How to browse, install, and manage mods through ClawClient using Modrinth.",
    category: "Configuration",
    sections: [
      {
        heading: "Mod discovery",
        body: "ClawClient uses Modrinth as its primary mod source. When you browse mods in the launcher, results are filtered by your profile's Minecraft version and loader compatibility.",
      },
      {
        heading: "Installing mods",
        body: "Select a mod from the browse view and click Install. The mod will be added to the currently selected profile. You can see all installed mods in the profile's Mods tab.",
        list: [
          "Select the profile you want to add mods to",
          "Open the Mods section",
          "Browse or search for mods on Modrinth",
          "Click Install on the mod you want",
          "The mod is added to the selected profile only",
        ],
      },
      {
        heading: "Mod management",
        body: "Each profile tracks its installed mods independently. You can enable, disable, or remove mods per profile. Mod updates are shown when available and can be installed individually.",
      },
    ],
  },
  {
    slug: "repair-and-update",
    title: "Repair and update flows",
    description:
      "How to repair a broken installation and keep ClawClient up to date.",
    category: "Troubleshooting",
    sections: [
      {
        heading: "Launcher updates",
        body: "ClawClient checks for updates automatically when it starts. If an update is available, you will be prompted to install it. Update packages are verified against a signed hash before installation.",
      },
      {
        heading: "Repairing a profile",
        body: "If a profile is not working correctly, you can repair it from the profile settings. This will re-verify game files against the official Mojang checksums and replace any corrupted or missing files.",
        list: [
          "Go to Profiles and select the affected profile",
          "Open Profile Settings",
          "Click Repair Installation",
          "The launcher will verify and re-download files as needed",
        ],
      },
      {
        heading: "Reinstalling ClawClient",
        body: "If the launcher itself is corrupted, uninstall ClawClient through your operating system's application manager and reinstall from the official download. Your profiles and settings are stored separately and will be preserved.",
      },
    ],
  },
  {
    slug: "troubleshooting",
    title: "Crash and log troubleshooting",
    description:
      "How to diagnose and fix common Minecraft crashes using ClawClient logs.",
    category: "Troubleshooting",
    sections: [
      {
        heading: "Finding logs",
        body: "ClawClient stores launch logs in the profile's game directory. You can access logs from the launcher by selecting a profile and clicking View Logs. The most recent log file is usually the one you need.",
      },
      {
        heading: "Common crash causes",
        body: "Most crashes are caused by mod incompatibilities, incorrect Java versions, or insufficient memory. The log file will usually show the specific error.",
        list: [
          "Mod conflicts: check for incompatible mod versions",
          "Java version: ensure you are using Java 17+ for Minecraft 1.17+",
          "Memory: increase RAM allocation in profile settings",
          "Corrupted files: use Repair Installation in profile settings",
        ],
      },
      {
        heading: "Reporting issues",
        body: "If you cannot resolve a crash, report it through the Discord server with the log file attached. Include your Minecraft version, loader, installed mods, and what you were doing when the crash occurred.",
      },
    ],
  },
  {
    slug: "supported-platforms",
    title: "Supported platforms, versions, and loaders",
    description:
      "Which operating systems, Minecraft versions, and mod loaders ClawClient supports.",
    category: "Reference",
    sections: [
      {
        heading: "Operating systems",
        body: "ClawClient supports Windows 10+, macOS 12+, and most major Linux distributions. The launcher is a native desktop application and is not available as a web app or mobile app.",
        list: [
          "Windows 10 and later",
          "macOS 12 (Monterey) and later",
          "Linux (Ubuntu, Fedora, Arch, and derivatives)",
        ],
      },
      {
        heading: "Minecraft versions",
        body: "ClawClient supports Minecraft Java Edition versions available through the official launcher. This includes release, snapshot, and legacy versions. Bedrock Edition is not supported.",
      },
      {
        heading: "Mod loaders",
        body: "ClawClient supports Fabric and Forge mod loaders. Loader availability depends on the Minecraft version. The launcher shows compatible loaders when you create or edit a profile.",
        list: [
          "Fabric — available for most modern Minecraft versions",
          "Forge — available for most Minecraft versions",
          "Loader compatibility is shown per Minecraft version",
        ],
      },
    ],
  },
  {
    slug: "privacy-settings",
    title: "Privacy and telemetry settings",
    description:
      "How ClawClient handles telemetry, analytics, and privacy controls.",
    category: "Reference",
    sections: [
      {
        heading: "Default privacy",
        body: "ClawClient does not collect telemetry, analytics, or crash reports by default. No usage data is sent to Claw servers unless you explicitly opt in to a feature that requires it.",
      },
      {
        heading: "What is not tracked",
        body: "ClawClient does not track which servers you join, which mods you install, how long you play, or any other usage behaviour. This is a product choice, not a configuration option.",
        list: [
          "No server join tracking",
          "No mod installation tracking",
          "No playtime tracking",
          "No crash report collection",
        ],
      },
      {
        heading: "Future telemetry",
        body: "If optional telemetry is introduced in the future, it will be opt-in, clearly explained, and independently toggleable. You will always know what data is collected and why.",
      },
    ],
  },
  {
    slug: "bug-reporting",
    title: "Bug and security reporting",
    description:
      "How to report bugs and security vulnerabilities in ClawClient.",
    category: "Reference",
    sections: [
      {
        heading: "Bug reports",
        body: "Report bugs through the ClawClient Discord server or the GitHub repository. Include your operating system, Minecraft version, loader, installed mods, and steps to reproduce the issue.",
        list: [
          "Join the ClawClient Discord server",
          "Post in the bug reports channel with full details",
          "Include log files if available",
          "Alternatively, open an issue on the GitHub repository",
        ],
      },
      {
        heading: "Security vulnerabilities",
        body: "If you discover a security vulnerability, use the GitHub security advisory channel or contact the team through Discord. Do not disclose security issues publicly until a fix is available.",
        list: [
          "Use GitHub security advisories for responsible disclosure",
          "Or contact the team through Discord",
          "Provide details and reproduction steps",
          "Allow time for a fix before public disclosure",
        ],
      },
    ],
  },
];

export function getAllDocs(): ReadonlyArray<DocEntry> {
  return docs;
}

export function getDocBySlug(slug: string): DocEntry | null {
  return docs.find((doc) => doc.slug === slug) ?? null;
}

export function getDocsByCategory(): ReadonlyMap<
  string,
  ReadonlyArray<DocEntry>
> {
  const categories = new Map<string, DocEntry[]>();

  for (const doc of docs) {
    const existing = categories.get(doc.category);
    if (existing) {
      existing.push(doc);
    } else {
      categories.set(doc.category, [doc]);
    }
  }

  return categories;
}
