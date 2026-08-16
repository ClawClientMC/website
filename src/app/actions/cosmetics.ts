"use server";

import { cookies } from "next/headers";

import {
  getOwnedCosmeticsFromApi,
  getEquippedCosmeticsFromApi,
  isAuthConfigured,
  type OwnedCosmetic,
  type EquippedItem,
  type CosmeticsError,
} from "@/lib/auth";

async function getCookieHeader(): Promise<string | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("claw_session");
  return sessionCookie ? `claw_session=${sessionCookie.value}` : null;
}

export async function getOwnedCosmetics(): Promise<{
  cosmetics: OwnedCosmetic[];
  error: CosmeticsError;
}> {
  if (!isAuthConfigured()) {
    return { cosmetics: [], error: "not_configured" };
  }

  const cookieHeader = await getCookieHeader();
  return getOwnedCosmeticsFromApi(cookieHeader);
}

export async function getEquippedCosmetics(): Promise<{
  equipped: EquippedItem[];
  error: CosmeticsError;
}> {
  if (!isAuthConfigured()) {
    return { equipped: [], error: "not_configured" };
  }

  const cookieHeader = await getCookieHeader();
  return getEquippedCosmeticsFromApi(cookieHeader);
}

export async function equipCosmetic(
  cosmeticId: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isAuthConfigured()) {
    return { success: false, error: "not_configured" };
  }

  const apiUrl = process.env.PLATFORM_API_URL;
  if (!apiUrl) {
    return { success: false, error: "not_configured" };
  }

  const cookieHeader = await getCookieHeader();
  if (!cookieHeader) {
    return { success: false, error: "not_authenticated" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/cosmetics/equip`, {
      method: "POST",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cosmetic_id: cosmeticId }),
    });

    if (response.status === 401) {
      return { success: false, error: "not_authenticated" };
    }

    if (response.status === 403) {
      return { success: false, error: "not_owned" };
    }

    if (response.status === 404) {
      return { success: false, error: "not_found" };
    }

    if (!response.ok) {
      return { success: false, error: "backend_unavailable" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "backend_unavailable" };
  }
}

export async function unequipCosmetic(
  cosmeticType: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isAuthConfigured()) {
    return { success: false, error: "not_configured" };
  }

  const apiUrl = process.env.PLATFORM_API_URL;
  if (!apiUrl) {
    return { success: false, error: "not_configured" };
  }

  const cookieHeader = await getCookieHeader();
  if (!cookieHeader) {
    return { success: false, error: "not_authenticated" };
  }

  try {
    const response = await fetch(`${apiUrl}/v1/cosmetics/unequip/${cosmeticType}`, {
      method: "POST",
      headers: { Cookie: cookieHeader },
    });

    if (response.status === 401) {
      return { success: false, error: "not_authenticated" };
    }

    if (response.status === 404) {
      return { success: false, error: "not_equipped" };
    }

    if (!response.ok) {
      return { success: false, error: "backend_unavailable" };
    }

    return { success: true };
  } catch {
    return { success: false, error: "backend_unavailable" };
  }
}
