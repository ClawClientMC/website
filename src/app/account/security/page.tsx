import Link from "next/link";

import { AccountShell, AuthNotConfigured } from "@/components/account-shell";
import { getServerSession, logout } from "@/app/actions/auth";
import { isAuthConfigured } from "@/lib/auth";

export default async function SecurityPage() {
  if (!isAuthConfigured()) {
    return <AuthNotConfigured />;
  }

  const { identity, error } = await getServerSession();

  if (!identity) {
    return (
      <section className="section">
        <div className="container">
          <p className="eyebrow">Privacy & Security</p>
          <h2>Sign in required</h2>
          <p>
            {error === "backend_unavailable"
              ? "The account service is temporarily unavailable. Please try again later."
              : "Please sign in to manage your privacy and security settings."}
          </p>
          <Link className="button button--primary" href="/login">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <AccountShell currentPath="/account/security">
      <section className="account-section">
        <p className="eyebrow">Privacy & Security</p>
        <h2>Security settings</h2>

        <div className="account-card">
          <div className="account-card__row">
            <div>
              <span className="account-card__label">Session</span>
              <span className="account-card__value">
                Active until{" "}
                {new Date(identity.expires_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="account-card">
          <h3>Sign out</h3>
          <p>
            Sign out of your Claw account on this device. You will need to sign
            in again to access account features.
          </p>
          <form action={logout}>
            <button className="button button--quiet" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </section>
    </AccountShell>
  );
}
