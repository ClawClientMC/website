import Link from "next/link";

import { Button, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p>
            The page you are looking for does not exist or has been moved. Check
            the URL or return to the homepage.
          </p>
          <div className="button-row">
            <Button href="/">Go to homepage</Button>
            <Button href="/docs" tone="quiet">
              Help &amp; Documentation
            </Button>
          </div>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Where to go</p>
          <h2>Popular pages.</h2>
        </div>
        <div className="feature-details__list">
          <article className="feature-detail">
            <div className="feature-detail__index">01</div>
            <div className="feature-detail__content">
              <h2>
                <Link href="/">Homepage</Link>
              </h2>
              <p>Learn about ClawClient and its product direction.</p>
            </div>
          </article>
          <article className="feature-detail">
            <div className="feature-detail__index">02</div>
            <div className="feature-detail__content">
              <h2>
                <Link href="/download">Download</Link>
              </h2>
              <p>Get the launcher for your platform.</p>
            </div>
          </article>
          <article className="feature-detail">
            <div className="feature-detail__index">03</div>
            <div className="feature-detail__content">
              <h2>
                <Link href="/features">Features</Link>
              </h2>
              <p>Explore the client stack behind ClawClient.</p>
            </div>
          </article>
          <article className="feature-detail">
            <div className="feature-detail__index">04</div>
            <div className="feature-detail__content">
              <h2>
                <Link href="/docs">Documentation</Link>
              </h2>
              <p>Guides for installation, profiles, mods, and more.</p>
            </div>
          </article>
        </div>
      </Section>
    </main>
  );
}
