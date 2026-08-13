import Link from "next/link";
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
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
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
