"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/download", label: "Download" },
  { href: "/trust", label: "Trust" },
];

function isActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function Brand() {
  return (
    <Link aria-label="ClawClient home" className="brand" href="/">
      <Image alt="" className="brand__mark" height={34} priority src="/claw-logo.webp" width={34} />
      <span>ClawClient</span>
    </Link>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = isActive(href, pathname);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={active ? "is-current" : undefined}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand />
        <nav aria-label="Primary" className="site-nav">
          {navigation.map((item) => (
            <NavLink href={item.href} key={item.href} label={item.label} />
          ))}
        </nav>
        <Link className="button button--primary site-header__action" href="/download">
          Get ClawClient
        </Link>
        <details className="site-menu">
          <summary aria-label="Open navigation menu">
            <span aria-hidden="true">Menu</span>
          </summary>
          <nav aria-label="Mobile">
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
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__inner">
        <Brand />
        <p>Built for a more focused Minecraft desktop experience.</p>
        <nav aria-label="Footer">
          <Link href="/download">Download</Link>
          <Link href="/features">Features</Link>
          <Link href="/trust">Trust &amp; Safety</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/docs">Documentation</Link>
          <Link href="/changelog">Changelog</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a
            href="https://discord.com"
            rel="noreferrer"
            target="_blank"
            aria-label="Discord (opens in new tab)"
          >
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
