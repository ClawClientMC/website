import Link from "next/link";
import type { ReactNode } from "react";

import { isAuthConfigured } from "@/lib/auth";

const accountNav = [
  { href: "/account", label: "Overview" },
  { href: "/account/cosmetics", label: "Cosmetics" },
  { href: "/account/identities", label: "Minecraft Identities" },
  { href: "/account/security", label: "Privacy & Security" },
];

export function AccountNav({
  currentPath,
  hasPartner = false,
  hasCreator = false,
}: {
  currentPath: string;
  hasPartner?: boolean;
  hasCreator?: boolean;
}) {
  const navItems = [...accountNav];

  if (hasPartner) {
    navItems.push({ href: "/account/partner", label: "Partner" });
  }

  if (hasCreator) {
    navItems.push({ href: "/account/creator", label: "Creator" });
  }

  return (
    <nav aria-label="Account navigation" className="account-nav">
      {navItems.map((item) => (
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
  hasPartner = false,
  hasCreator = false,
}: Readonly<{
  children: ReactNode;
  currentPath: string;
  hasPartner?: boolean;
  hasCreator?: boolean;
}>) {
  return (
    <div className="account-shell">
      <aside className="account-shell__sidebar">
        <AccountNav
          currentPath={currentPath}
          hasPartner={hasPartner}
          hasCreator={hasCreator}
        />
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
