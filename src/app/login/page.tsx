import Link from "next/link";

import { isAuthConfigured } from "@/lib/auth";
import { getLoginUrl } from "@/lib/auth";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string; error?: string }>;
}) {
  const params = await searchParams;
  const returnTo = params.returnTo || "/account";
  const error = params.error;

  if (!isAuthConfigured()) {
    return (
      <section className="section">
        <div className="container">
          <p className="eyebrow">Sign in</p>
          <h2>Authentication not available</h2>
          <p>
            The Claw account system is not yet configured for this environment.
            Please check back later.
          </p>
          <Link className="button button--quiet" href="/">
            Return home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="login-card">
          <p className="eyebrow">Claw Account</p>
          <h2>Sign in</h2>
          <p>
            Sign in with your Microsoft account to access your Claw profile,
            connected identities, and account settings.
          </p>

          {error && (
            <div className="login-card__error">
              {error === "provider_denied" &&
                "Sign-in was cancelled. Please try again."}
              {error === "state_invalid" &&
                "Your sign-in session expired. Please try again."}
              {error === "exchange_failed" &&
                "There was a problem completing sign-in. Please try again."}
              {error === "not_configured" &&
                "Authentication is not available in this environment."}
              {![
                "provider_denied",
                "state_invalid",
                "exchange_failed",
                "not_configured",
              ].includes(error) &&
                "An unexpected error occurred. Please try again."}
            </div>
          )}

          <a className="button button--primary login-card__action" href={getLoginUrl()}>
            Sign in with Microsoft
          </a>

          <p className="login-card__note">
            By signing in, you agree to the Claw{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
