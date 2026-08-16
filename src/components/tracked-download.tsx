"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

import { trackDownloadClick, trackDownloadIntent } from "@/lib/analytics";
import type { Attribution } from "@/lib/campaigns";
import type { Platform } from "@/lib/releases";

export function TrackedDownloadButton({
  href,
  platform,
  attribution,
  className,
  children,
}: {
  href: string;
  platform?: Platform;
  attribution?: Attribution;
  className?: string;
  children: ReactNode;
}) {
  const hasTrackedIntent = useRef(false);

  useEffect(() => {
    if (!hasTrackedIntent.current) {
      hasTrackedIntent.current = true;
      trackDownloadIntent(window.location.pathname, attribution);
    }
  }, [attribution]);

  const handleClick = useCallback(() => {
    if (platform) {
      trackDownloadClick(platform, window.location.pathname, attribution);
    }
  }, [platform, attribution]);

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
