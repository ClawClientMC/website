import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/trust", label: "Trust" },
];

function Brand() {
  return (
    <Link aria-label="ClawClient home" className="brand" href="/">
      <span aria-hidden="true" className="brand__mark">
        <span />
        <span />
        <span />
      </span>
      <span>ClawClient</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />
        <nav aria-label="Primary navigation" className="site-nav">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link className="button button--quiet site-header__action" href="/download">
          Get ClawClient
        </Link>
        <details className="site-menu">
          <summary>
            <span className="sr-only">Open navigation menu</span>
            <span aria-hidden="true">Menu</span>
          </summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link className="button button--primary" href="/download">
              Get ClawClient
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Brand />
        <p>Built for a more focused Minecraft desktop experience.</p>
        <nav aria-label="Footer navigation">
          <Link href="/trust">Trust</Link>
          <Link href="/download">Download</Link>
          <a href="https://discord.com" rel="noreferrer" target="_blank">
            Discord
          </a>
        </nav>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
