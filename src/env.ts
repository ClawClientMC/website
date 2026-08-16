function parseOptionalUrl(
  value: string | undefined,
): string | undefined {
  if (!value || value === "") return undefined;
  try {
    new URL(value);
    return value;
  } catch {
    throw new Error(`must be an absolute URL, got: ${value}`);
  }
}

export type PublicEnvironment = {
  releasesApiUrl?: string;
  siteUrl: string;
  analyticsMeasurementId?: string;
};

export type ServerEnvironment = {
  platformApiUrl?: string;
};

export function getPublicEnvironment(
  environment: Record<string, string | undefined> = process.env,
): PublicEnvironment {
  const siteUrlRaw = environment.NEXT_PUBLIC_SITE_URL;
  const releasesApiUrlRaw = environment.NEXT_PUBLIC_RELEASES_API_URL;
  const analyticsId = environment.NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID;

  let siteUrl: string | undefined;
  let releasesApiUrl: string | undefined;

  try {
    siteUrl = parseOptionalUrl(siteUrlRaw);
    releasesApiUrl = parseOptionalUrl(releasesApiUrlRaw);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Invalid public environment configuration: ${message}`);
  }

  return {
    releasesApiUrl: releasesApiUrl || undefined,
    siteUrl: siteUrl || "https://clawclient.net",
    analyticsMeasurementId: analyticsId || undefined,
  };
}

export function getServerEnvironment(
  environment: Record<string, string | undefined> = process.env,
): ServerEnvironment {
  const platformApiUrlRaw = environment.PLATFORM_API_URL;

  let platformApiUrl: string | undefined;

  try {
    platformApiUrl = parseOptionalUrl(platformApiUrlRaw);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Invalid server environment configuration: ${message}`);
  }

  return {
    platformApiUrl: platformApiUrl || undefined,
  };
}

export const publicEnvironment = getPublicEnvironment();
export const serverEnvironment = getServerEnvironment();
