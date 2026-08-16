"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  getLoginUrl,
  getLogoutUrl,
  getSessionFromApi,
  isAuthConfigured,
  type AuthError,
  type SessionIdentity,
} from "@/lib/auth";

export async function getServerSession(): Promise<{
  identity: SessionIdentity | null;
  error: AuthError;
}> {
  if (!isAuthConfigured()) {
    return { identity: null, error: "not_configured" };
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("claw_session");
  const cookieHeader = sessionCookie
    ? `claw_session=${sessionCookie.value}`
    : null;

  return getSessionFromApi(cookieHeader);
}

export async function login() {
  const url = getLoginUrl();
  redirect(url);
}

export async function logout() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("claw_session");

  if (sessionCookie) {
    const apiUrl = process.env.PLATFORM_API_URL;
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/v1/auth/logout`, {
          method: "POST",
          headers: { Cookie: `claw_session=${sessionCookie.value}` },
        });
      } catch {
        // Logout is best-effort; clear local cookie regardless
      }
    }
  }

  cookieStore.delete("claw_session");
  redirect("/");
}
