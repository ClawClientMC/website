import type { ReactNode } from "react";

export type SessionIdentity = {
  user_id: string;
  minecraft_uuid: string;
  minecraft_username: string;
  email: string | null;
  created_at: string;
  expires_at: string;
};

export type MinecraftIdentity = {
  minecraft_uuid: string;
  minecraft_username: string;
  linked: boolean;
};

export type AuthError =
  | "not_configured"
  | "not_authenticated"
  | "session_expired"
  | "backend_unavailable"
  | "unknown";

const SESSION_COOKIE = "claw_session";

function platformApiUrl(): string | undefined {
  return process.env.PLATFORM_API_URL;
}

export async function getSessionFromApi(
  cookieHeader: string | null,
): Promise<{ identity: SessionIdentity | null; error: AuthError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { identity: null, error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/auth/session`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { identity: null, error: "not_authenticated" };
    }

    if (!response.ok) {
      return { identity: null, error: "backend_unavailable" };
    }

    const data = await response.json();
    return { identity: data as SessionIdentity, error: "not_authenticated" };
  } catch {
    return { identity: null, error: "backend_unavailable" };
  }
}

export async function getIdentitiesFromApi(
  cookieHeader: string | null,
): Promise<{ identities: MinecraftIdentity[]; error: AuthError }> {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return { identities: [], error: "not_configured" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/auth/identities`, {
      headers: cookieHeader ? { Cookie: cookieHeader } : {},
      cache: "no-store",
    });

    if (response.status === 401) {
      return { identities: [], error: "not_authenticated" };
    }

    if (!response.ok) {
      return { identities: [], error: "backend_unavailable" };
    }

    const data = await response.json();
    return { identities: data.identities as MinecraftIdentity[], error: "not_authenticated" };
  } catch {
    return { identities: [], error: "backend_unavailable" };
  }
}

export function getLoginUrl(): string {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return "/account?error=not_configured";
  }
  return `${apiUrl}/v1/auth/login`;
}

export function getLogoutUrl(): string {
  const apiUrl = platformApiUrl();
  if (!apiUrl) {
    return "/";
  }
  return `${apiUrl}/v1/auth/logout`;
}

export function getSessionCookieName(): string {
  return SESSION_COOKIE;
}

export function isAuthConfigured(): boolean {
  return !!platformApiUrl();
}
