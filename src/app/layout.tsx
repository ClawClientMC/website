import type { Metadata } from "next";

import { publicEnvironment } from "@/env";
import { SiteShell } from "@/components/site-shell";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(publicEnvironment.siteUrl),
  title: {
    default: "ClawClient | Performance and PvP for Minecraft",
    template: "%s | ClawClient",
  },
  description:
    "ClawClient is a Minecraft client focused on performance, PvP utility, mods, and an easier launch experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ClawClient",
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
