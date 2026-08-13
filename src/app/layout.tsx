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
    title: "ClawClient | Performance and PvP for Minecraft",
    description:
      "ClawClient is a Minecraft client focused on performance, PvP utility, mods, and an easier launch experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawClient | Performance and PvP for Minecraft",
    description:
      "ClawClient is a Minecraft client focused on performance, PvP utility, mods, and an easier launch experience.",
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: {
    icon: "/claw-logo.webp",
    apple: "/claw-logo.webp",
  },
  other: {
    "theme-color": "#0f0f0f",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: "ClawClient",
                  url: publicEnvironment.siteUrl,
                  description:
                    "ClawClient is a Minecraft client focused on performance, PvP utility, mods, and an easier launch experience.",
                  inLanguage: "en",
                  publisher: {
                    "@type": "Organization",
                    name: "ClawClient",
                    url: publicEnvironment.siteUrl,
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  name: "ClawClient",
                  applicationCategory: "GameApplication",
                  operatingSystem: "Windows, macOS, Linux",
                  description:
                    "Desktop Minecraft launcher focused on performance, PvP utility, mods, profiles, and a clearer launch experience.",
                  url: publicEnvironment.siteUrl,
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
