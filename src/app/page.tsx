import { Button, FeatureCard, ScreenshotFrame, Section, TrustCallout } from "@/components/ui";

export default function Home() {
  return (
    <main id="main-content">
      <Section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow">ClawClient</p>
          <h1>A sharper Minecraft experience is taking shape.</h1>
          <p className="hero__lede">
            A focused desktop client for performance, PvP utility, mods, and profiles.
          </p>
          <div className="button-row">
            <Button href="/download">Get launch updates</Button>
            <Button href="/features" tone="quiet">
              Explore the client
            </Button>
          </div>
        </div>
        <ScreenshotFrame>
          <div aria-hidden="true" className="concept-screen">
            <div className="concept-screen__rail">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="concept-screen__main">
              <div className="concept-screen__label">Ready to play</div>
              <div className="concept-screen__title">CrabbyMC</div>
              <div className="concept-screen__meta">Fabric · 1.21.1 · 42 mods</div>
              <div className="concept-screen__line" />
              <div className="concept-screen__line concept-screen__line--short" />
              <div className="concept-screen__play">Launch</div>
            </div>
          </div>
        </ScreenshotFrame>
      </Section>

      <Section className="foundation" id="features">
        <div className="section-heading">
          <p className="eyebrow">Designed to stay out of your way</p>
          <h2>Every session starts with a clear next move.</h2>
        </div>
        <div className="feature-list">
          <FeatureCard eyebrow="01 / Play" title="Your setup, ready when you are">
            Profiles and game versions stay easy to scan, so launching never feels like
            configuration work.
          </FeatureCard>
          <FeatureCard eyebrow="02 / Discover" title="Mods without the noise">
            Browse and search with the context you need before changing a profile.
          </FeatureCard>
          <FeatureCard eyebrow="03 / Connect" title="Servers in the same flow">
            Move from a compatible profile to a server without losing your place.
          </FeatureCard>
        </div>
      </Section>

      <Section className="trust-section" id="trust">
        <TrustCallout>
          <p className="eyebrow">Built with intent</p>
          <h2>ClawClient is being shaped as a reliable desktop companion, not a dashboard.</h2>
          <p>
            The experience favors clear states, deliberate controls, and the information
            players need at the moment they need it.
          </p>
        </TrustCallout>
      </Section>
    </main>
  );
}
