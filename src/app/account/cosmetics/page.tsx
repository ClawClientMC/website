import Link from "next/link";

import { AccountShell, AuthNotConfigured } from "@/components/account-shell";
import { CosmeticsClient } from "@/components/cosmetics-client";
import { getServerSession } from "@/app/actions/auth";
import {
  getOwnedCosmetics,
  getEquippedCosmetics,
} from "@/app/actions/cosmetics";
import { checkPartnerAccess, checkCreatorAccess } from "@/app/actions/partner-creator";
import { isAuthConfigured } from "@/lib/auth";

export default async function CosmeticsPage() {
  if (!isAuthConfigured()) {
    return <AuthNotConfigured />;
  }

  const { identity, error } = await getServerSession();

  if (!identity) {
    return (
      <section className="section">
        <div className="container">
          <p className="eyebrow">Cosmetics</p>
          <h2>Sign in required</h2>
          <p>
            {error === "backend_unavailable"
              ? "The account service is temporarily unavailable. Please try again later."
              : "Please sign in to manage your cosmetics."}
          </p>
          <Link className="button button--primary" href="/login">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const [ownedResult, equippedResult, partnerAccess, creatorAccess] =
    await Promise.all([
      getOwnedCosmetics(),
      getEquippedCosmetics(),
      checkPartnerAccess(),
      checkCreatorAccess(),
    ]);

  if (
    ownedResult.error === "backend_unavailable" ||
    equippedResult.error === "backend_unavailable"
  ) {
    return (
      <AccountShell
        currentPath="/account/cosmetics"
        hasPartner={partnerAccess.hasAccess}
        hasCreator={creatorAccess.hasAccess}
      >
        <section className="account-section">
          <p className="eyebrow">Cosmetics</p>
          <h2>Manage your cosmetics</h2>
          <div className="account-card">
            <p>
              The cosmetics service is temporarily unavailable. Please try again
              later.
            </p>
          </div>
        </section>
      </AccountShell>
    );
  }

  return (
    <AccountShell
      currentPath="/account/cosmetics"
      hasPartner={partnerAccess.hasAccess}
      hasCreator={creatorAccess.hasAccess}
    >
      <section className="account-section">
        <p className="eyebrow">Cosmetics</p>
        <h2>Manage your Claw cosmetics</h2>
        <p className="account-section__description">
          Manage your capes, badges, and profile appearance.
        </p>

        <CosmeticsClient
          owned={ownedResult.cosmetics}
          equipped={equippedResult.equipped}
        />
      </section>
    </AccountShell>
  );
}
