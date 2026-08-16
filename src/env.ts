import { z } from "zod";

const optionalUrl = z
  .string()
  .url("must be an absolute URL")
  .optional()
  .or(z.literal(""));

const publicEnvironmentSchema = z.object({
  NEXT_PUBLIC_SITE_URL: optionalUrl,
  NEXT_PUBLIC_RELEASES_API_URL: optionalUrl,
});

const serverEnvironmentSchema = z.object({
  PLATFORM_API_URL: optionalUrl,
});

export type PublicEnvironment = {
  releasesApiUrl?: string;
  siteUrl: string;
};

export type ServerEnvironment = {
  platformApiUrl?: string;
};

export function getPublicEnvironment(
  environment: Record<string, string | undefined> = process.env,
): PublicEnvironment {
  const result = publicEnvironmentSchema.safeParse({
    NEXT_PUBLIC_RELEASES_API_URL: environment.NEXT_PUBLIC_RELEASES_API_URL,
    NEXT_PUBLIC_SITE_URL: environment.NEXT_PUBLIC_SITE_URL,
  });

  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => `${issue.path.join(".")} ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid public environment configuration: ${messages}`);
  }

  return {
    releasesApiUrl: result.data.NEXT_PUBLIC_RELEASES_API_URL || undefined,
    siteUrl: result.data.NEXT_PUBLIC_SITE_URL || "https://clawclient.net",
  };
}

export function getServerEnvironment(
  environment: Record<string, string | undefined> = process.env,
): ServerEnvironment {
  const result = serverEnvironmentSchema.safeParse({
    PLATFORM_API_URL: environment.PLATFORM_API_URL,
  });

  if (!result.success) {
    const messages = result.error.issues
      .map((issue) => `${issue.path.join(".")} ${issue.message}`)
      .join("; ");
    throw new Error(`Invalid server environment configuration: ${messages}`);
  }

  return {
    platformApiUrl: result.data.PLATFORM_API_URL || undefined,
  };
}

export const publicEnvironment = getPublicEnvironment();
export const serverEnvironment = getServerEnvironment();
