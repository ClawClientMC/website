"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  initializeAnalytics,
  type AnalyticsConfig,
  type AnalyticsProviderAdapter,
  type AnalyticsEvent,
} from "@/lib/analytics";

const CONSENT_STORAGE_KEY = "clawclient-analytics-consent";

type ConsentState = "pending" | "granted" | "denied";

type AnalyticsContextValue = {
  consent: ConsentState;
  grantConsent: () => void;
  denyConsent: () => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue>({
  consent: "pending",
  grantConsent: () => {},
  denyConsent: () => {},
});

export function useAnalyticsConsent(): AnalyticsContextValue {
  return useContext(AnalyticsContext);
}

function readStoredConsent(): ConsentState {
  if (typeof window === "undefined") {
    return "pending";
  }

  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored === "granted") return "granted";
  if (stored === "denied") return "denied";
  return "pending";
}

function createConsoleAdapter(): AnalyticsProviderAdapter {
  return {
    track: (event: AnalyticsEvent) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[analytics]", event.type, event);
      }
    },
  };
}

export function AnalyticsProvider({
  children,
  config,
  adapter,
}: {
  children: ReactNode;
  config: AnalyticsConfig;
  adapter?: AnalyticsProviderAdapter;
}) {
  const [consent, setConsent] = useState<ConsentState>(() =>
    readStoredConsent(),
  );
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }
    hasInitialized.current = true;

    const effectiveAdapter = adapter ?? createConsoleAdapter();

    if (consent === "granted" && config.enabled) {
      initializeAnalytics(config, effectiveAdapter);
    } else {
      initializeAnalytics({ enabled: false });
    }
  }, [consent, config, adapter]);

  const grantConsent = useCallback(() => {
    setConsent("granted");
    localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
  }, []);

  const denyConsent = useCallback(() => {
    setConsent("denied");
    localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
  }, []);

  const contextValue = useMemo(
    () => ({ consent, grantConsent, denyConsent }),
    [consent, grantConsent, denyConsent],
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
}
