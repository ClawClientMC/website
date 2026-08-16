"use client";

import { useEffect, useRef } from "react";

import { trackCampaignView } from "@/lib/analytics";
import type { Attribution } from "@/lib/campaigns";

export function CampaignViewTracker({
  campaign,
  attribution,
}: {
  campaign: string;
  attribution?: Attribution;
}) {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackCampaignView(campaign, window.location.pathname, attribution);
    }
  }, [campaign, attribution]);

  return null;
}
