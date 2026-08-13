import {
  Button,
  FaqAccordion,
  FeatureCard,
  ScreenshotFrame,
  Section,
  TrustCallout,
} from "@/components/ui";

const previewQuestions = [
  {
    question: "What is ClawClient?",
    answer:
      "ClawClient is a desktop Minecraft client in development, focused on a clearer launch experience, optimized profiles, PvP utility, mods, and servers.",
  },
  {
    question: "Can I download it on my phone?",
    answer:
      "ClawClient is a desktop launcher. This site remains useful on mobile so you can explore the product and return to download it on your computer.",
  },
  {
    question: "Are performance benchmarks available?",
    answer:
      "Not yet. We will only publish performance numbers with a reproducible benchmark and clear test conditions.",
  },
];

function Status({ children }: Readonly<{ children: string }>) {
  return <span className="status">{children}</span>;
}

export default function Home() {
  return (
    <main id="main-content">
      <Section className="hero" id="top">
        <div className="hero__copy">
          <p className="eyebrow">ClawClient / In development</p>
          <h1>Minecraft, optimized.</h1>
          <p className="hero__lede">
            A focused desktop client for better setup, useful PvP tools, and the profiles
            you actually want to play.
          </p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/features" tone="quiet">
              Explore features
            </Button>
          </div>
          <p className="hero__note">
            Built for desktop. Explore the client here, then download when you are at your PC.
          </p>
        </div>
        <ScreenshotFrame label="Conceptual launcher interface — product UI in progress">
          <div aria-hidden="true" className="concept-screen">
            <div className="concept-screen__rail">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="concept-screen__main">
              <div className="concept-screen__label">Your next session</div>
              <div className="concept-screen__title">Ready when you are.</div>
              <div className="concept-screen__meta">Profile selection · Mod context · Clear play state</div>
              <div className="concept-screen__line" />
              <div className="concept-screen__line concept-screen__line--short" />
              <div className="concept-screen__play">Play</div>
            </div>
          </div>
        </ScreenshotFrame>
      </Section>

      <Section className="proof-section">
        <div className="proof-intro">
          <p className="eyebrow">One client, a clearer start</p>
          <h2>Less time tuning. More time in-game.</h2>
          <p>
            ClawClient brings the choices around a Minecraft session into one deliberate
            desktop flow. The work is still in progress, and each area is being built with
            the same goal: make the next useful action obvious.
          </p>
        </div>
        <dl className="proof-list">
          <div>
            <dt>Performance</dt>
            <dd>Optimized profile direction without published benchmark claims.</dd>
          </div>
          <div>
            <dt>PvP utility</dt>
            <dd>Competitive HUD and client features, designed for useful play.</dd>
          </div>
          <div>
            <dt>Profiles</dt>
            <dd>Clearer ways to move between the setups that fit your session.</dd>
          </div>
        </dl>
      </Section>

      <Section className="feature-section" id="features">
        <div className="section-heading">
          <p className="eyebrow">Performance / In development</p>
          <h2>Start with an optimized profile, not a pile of settings.</h2>
        </div>
        <div className="feature-split">
          <div className="feature-statement">
            <Status>Planned capability</Status>
            <p>
              ClawClient is being built to make performance-oriented setups easier to
              understand and choose. Any published FPS, memory, or startup comparison will
              come with its test conditions.
            </p>
          </div>
          <div className="signal-grid" aria-label="Performance product direction">
            <div>
              <span>01</span>
              <strong>Clear profile context</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Deliberate version choices</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Less manual tuning</strong>
            </div>
          </div>
        </div>
      </Section>

      <Section className="foundation">
        <div className="section-heading">
          <p className="eyebrow">Made for the way you play</p>
          <h2>Useful client features, without losing the thread.</h2>
        </div>
        <div className="feature-list">
          <FeatureCard eyebrow="PvP / In development" title="Keep the important information close">
            Competitive HUD and client utilities are planned as clear, intentional tools—not
            automation or noise.
          </FeatureCard>
          <FeatureCard eyebrow="Mods / In development" title="Give every change its context">
            Mod discovery, compatibility, and install choices are being designed around the
            profile they affect.
          </FeatureCard>
          <FeatureCard eyebrow="Profiles / In development" title="Make each setup easy to recognize">
            Move between optimized, custom, and game-version setups with fewer unclear states.
          </FeatureCard>
        </div>
      </Section>

      <Section className="servers-section">
        <div className="servers-copy">
          <p className="eyebrow">Servers / Planned</p>
          <h2>Discover compatible servers from the same flow.</h2>
          <p>
            Server discovery is planned for ClawClient. We will show featured experiences only
            when their compatibility and connection flow are ready to support them.
          </p>
          <Button href="/features" tone="quiet">
            See the product direction
          </Button>
        </div>
        <div aria-hidden="true" className="server-grid">
          <div className="server-grid__header">
            <span>Server discovery</span>
            <span>Planned</span>
          </div>
          <div className="server-grid__row">
            <span />
            <span />
            <span />
          </div>
          <div className="server-grid__row">
            <span />
            <span />
            <span />
          </div>
          <div className="server-grid__row">
            <span />
            <span />
            <span />
          </div>
        </div>
      </Section>

      <Section className="trust-section" id="trust">
        <TrustCallout>
          <p className="eyebrow">Trust is part of the product</p>
          <h2>Clear download, update, and account information should never be an afterthought.</h2>
          <p>
            We will explain what the client does, what a download contains, and which product
            states are ready. Read the direction behind ClawClient as the launch surface grows.
          </p>
          <Button href="/trust" tone="quiet">
            Visit Trust &amp; Safety
          </Button>
        </TrustCallout>
      </Section>

      <Section className="final-section">
        <div className="final-cta">
          <p className="eyebrow">Follow the launch</p>
          <h2>Ready to see a sharper Minecraft start?</h2>
          <p>
            Explore what ClawClient is building now, then return to download on desktop when
            the release is ready.
          </p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/features" tone="quiet">
              View features
            </Button>
          </div>
        </div>
        <div className="faq-preview">
          <p className="eyebrow">Quick answers</p>
          <FaqAccordion items={previewQuestions} />
          <Button href="/faq" tone="quiet">
            View all questions
          </Button>
        </div>
      </Section>
    </main>
  );
}
