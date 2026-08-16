import Link from "next/link";
import type { ReactNode } from "react";

import { isAuthConfigured } from "@/lib/auth";

const accountNav = [
  { href: "/account", label: "Overview" },
  { href: "/account/identities", label: "Minecraft Identities" },
  { href: "/account/security", label: "Privacy & Security" },
];

export function AccountNav({ currentPath }: { currentPath: string }) {
  return (
    <nav aria-label="Account navigation" className="account-nav">
      {accountNav.map((item) => (
        <Link
          aria-current={currentPath === item.href ? "page" : undefined}
          className={
            "account-nav__link" +
            (currentPath === item.href ? " account-nav__link--active" : "")
          }
          href={item.href}
          key={item.href}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function AccountShell({
  children,
  currentPath,
}: Readonly<{ children: ReactNode; currentPath: string }>) {
  return (
    <div className="account-shell">
      <aside className="account-shell__sidebar">
        <AccountNav currentPath={currentPath} />
      </aside>
      <main className="account-shell__content" id="main-content">
        {children}
      </main>
    </div>
  );
}

export function AuthNotConfigured() {
  return (
    <section className="section">
      <div className="container">
        <p className="eyebrow">Account</p>
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
