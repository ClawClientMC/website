import Link from "next/link";

import { AccountShell, AuthNotConfigured } from "@/components/account-shell";
import { getServerSession } from "@/app/actions/auth";
import { getIdentitiesFromApi, isAuthConfigured } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function IdentitiesPage() {
  if (!isAuthConfigured()) {
    return <AuthNotConfigured />;
  }

  const { identity, error } = await getServerSession();

  if (!identity) {
    return (
      <section className="section">
        <div className="container">
          <p className="eyebrow">Minecraft Identities</p>
          <h2>Sign in required</h2>
          <p>
            {error === "backend_unavailable"
              ? "The account service is temporarily unavailable. Please try again later."
              : "Please sign in to view your connected identities."}
          </p>
          <Link className="button button--primary" href="/login">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("claw_session");
  const cookieHeader = sessionCookie
    ? `claw_session=${sessionCookie.value}`
    : null;
  const { identities } = await getIdentitiesFromApi(cookieHeader);

  return (
    <AccountShell currentPath="/account/identities">
      <section className="account-section">
        <p className="eyebrow">Minecraft Identities</p>
        <h2>Connected accounts</h2>
        <p>
          Minecraft accounts linked to your Claw account. These are used for
          launching the game and accessing server features.
        </p>

        {identities.length === 0 ? (
          <div className="account-card">
            <p>
              No Minecraft identities are currently connected. Sign in with
              Microsoft to link your Minecraft account.
            </p>
          </div>
        ) : (
          <div className="account-card">
            {identities.map((mcIdentity) => (
              <div className="account-card__row" key={mcIdentity.minecraft_uuid}>
                <div>
                  <span className="account-card__label">
                    {mcIdentity.minecraft_username}
                  </span>
                  <span className="account-card__value account-card__value--mono">
                    {mcIdentity.minecraft_uuid}
                  </span>
                </div>
                <span
                  className={
                    "status " +
                    (mcIdentity.linked
                      ? "status--available"
                      : "status--planned")
                  }
                >
                  {mcIdentity.linked ? "Linked" : "Unlinked"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </AccountShell>
  );
}
