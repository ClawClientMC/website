import Link from "next/link";

import { AccountShell, AuthNotConfigured } from "@/components/account-shell";
import { getServerSession } from "@/app/actions/auth";
import { isAuthConfigured } from "@/lib/auth";

export default async function AccountPage() {
  if (!isAuthConfigured()) {
    return <AuthNotConfigured />;
  }

  const { identity, error } = await getServerSession();

  if (!identity) {
    return (
      <section className="section">
        <div className="container">
          <p className="eyebrow">Account</p>
          <h2>Sign in required</h2>
          <p>
            {error === "backend_unavailable"
              ? "The account service is temporarily unavailable. Please try again later."
              : "Please sign in to view your account."}
          </p>
          <Link className="button button--primary" href="/login">
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <AccountShell currentPath="/account">
      <section className="account-section">
        <p className="eyebrow">Account overview</p>
        <h2>Welcome, {identity.minecraft_username}</h2>
        <div className="account-card">
          <div className="account-card__row">
            <span className="account-card__label">Account ID</span>
            <span className="account-card__value">{identity.user_id}</span>
          </div>
          <div className="account-card__row">
            <span className="account-card__label">Minecraft UUID</span>
            <span className="account-card__value account-card__value--mono">
              {identity.minecraft_uuid}
            </span>
          </div>
          <div className="account-card__row">
            <span className="account-card__label">Minecraft Username</span>
            <span className="account-card__value">
              {identity.minecraft_username}
            </span>
          </div>
          {identity.email && (
            <div className="account-card__row">
              <span className="account-card__label">Email</span>
              <span className="account-card__value">{identity.email}</span>
            </div>
          )}
          <div className="account-card__row">
            <span className="account-card__label">Session expires</span>
            <span className="account-card__value">
              {new Date(identity.expires_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </section>
    </AccountShell>
  );
}
