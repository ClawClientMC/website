import Link from "next/link";
import Image from "next/image";
import type { PropsWithChildren, ReactNode } from "react";

type ButtonProps = PropsWithChildren<{
  href?: string;
  tone?: "primary" | "quiet";
  disabled?: boolean;
  className?: string;
}>;

export function Button({
  children,
  href,
  tone = "primary",
  disabled = false,
  className = "",
}: Readonly<ButtonProps>) {
  const classes = "button button--" + tone + (className ? " " + className : "");

  if (href) {
    return (
      <Link
        aria-disabled={disabled || undefined}
        className={classes}
        href={disabled ? "/" : href}
        tabIndex={disabled ? -1 : undefined}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type="button">
      {children}
    </button>
  );
}

export function Section({
  children,
  className = "",
  id,
}: Readonly<PropsWithChildren<{ className?: string; id?: string }>>) {
  return (
    <section className={"section " + className} id={id}>
      <div className="container">{children}</div>
    </section>
  );
}

export function FeatureCard({
  eyebrow,
  title,
  children,
}: Readonly<{ eyebrow: string; title: string; children: ReactNode }>) {
  return (
    <article className="feature-card">
      <p className="eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

export function ScreenshotFrame({
  children,
  label = "Conceptual interface preview",
}: Readonly<{ children: ReactNode; label?: string }>) {
  return (
    <figure className="screenshot-frame">
      <div aria-hidden="true" className="screenshot-frame__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="screenshot-frame__content">{children}</div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}

export function DownloadCard({
  children,
  title = "Be ready for launch",
}: Readonly<{ children: ReactNode; title?: string }>) {
  return (
    <aside className="download-card">
      <p className="eyebrow">Desktop launcher</p>
      <h2>{title}</h2>
      <div className="download-card__content">{children}</div>
    </aside>
  );
}

export function FaqAccordion({
  items,
}: Readonly<{ items: ReadonlyArray<{ question: string; answer: string }> }>) {
  return (
    <div aria-label="Frequently asked questions" className="faq-list" role="list">
      {items.map((item) => (
        <details key={item.question} role="listitem">
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function TrustCallout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <aside className="trust-callout">
      <span aria-hidden="true" className="trust-callout__mark">
        {"///"}
      </span>
      <div>{children}</div>
    </aside>
  );
}

export function StatusBadge({
  children,
  tone = "development",
}: Readonly<{
  children: string;
  tone?: "available" | "development" | "planned";
}>) {
  return <span className={"status status--" + tone}>{children}</span>;
}

/**
 * A faithful presentation of the current launcher hierarchy. It is a product
 * interface reference, not a remote server response or a simulated metric.
 */
export function LauncherPreview({
  label = "Current ClawClient launcher interface",
}: Readonly<{ label?: string }>) {
  return (
    <figure className="launcher-preview">
      <div className="launcher-preview__topbar">
        <div className="launcher-preview__brand">
          <Image alt="" height={30} priority src="/claw-logo.webp" width={30} />
          <strong>ClawClient</strong>
        </div>
        <div aria-hidden="true" className="launcher-preview__nav">
          <span className="is-current">Home</span>
          <span>Profiles</span>
          <span>Mods</span>
        </div>
        <span className="launcher-preview__account">Guest</span>
      </div>
      <div className="launcher-preview__body">
        <div className="launcher-preview__main">
          <div className="launcher-preview__heading">
            <div>
              <span>ClawClient</span>
              <strong>Ready to play</strong>
            </div>
            <span>Desktop launcher</span>
          </div>
          <div className="launcher-preview__play-panel">
            <div className="launcher-preview__art">
              <Image alt="" fill sizes="(max-width: 700px) 42vw, 20vw" src="/claw-logo.webp" />
            </div>
            <div className="launcher-preview__play-copy">
              <span>Selected profile</span>
              <strong>Claw Optimized</strong>
              <p>Performance-focused Minecraft setup</p>
            </div>
            <div className="launcher-preview__play-action">Play</div>
          </div>
        </div>
        <aside className="launcher-preview__side">
          <span>Next step</span>
          <strong>Choose an account</strong>
          <p>Microsoft and local profiles stay in one place.</p>
          <div className="launcher-preview__side-line" />
          <span>Profile tools</span>
          <strong>Mods, versions, settings</strong>
        </aside>
      </div>
      <figcaption>{label}</figcaption>
    </figure>
  );
}
