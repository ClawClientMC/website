import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button, Section } from "@/components/ui";
import { getDocBySlug, getAllDocs } from "@/lib/docs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    return { title: "Document not found" };
  }

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `/docs/${doc.slug}`,
    },
    openGraph: {
      title: `ClawClient — ${doc.title}`,
      description: doc.description,
      url: `/docs/${doc.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `ClawClient — ${doc.title}`,
      description: doc.description,
    },
  };
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <main id="main-content">
      <Section className="features-hero">
        <div className="features-hero__copy">
          <p className="eyebrow">{doc.category}</p>
          <h1>{doc.title}</h1>
          <p>{doc.description}</p>
          <div className="button-row">
            <Button href="/download">Download ClawClient</Button>
            <Button href="/docs" tone="quiet">
              All docs
            </Button>
          </div>
        </div>
      </Section>

      <Section className="feature-details">
        <div className="feature-details__intro">
          <p className="eyebrow">Guide</p>
          <h2>{doc.title}</h2>
        </div>
        <div className="feature-details__list">
          {doc.sections.map((section, index) => (
            <article className="feature-detail" key={section.heading}>
              <div className="feature-detail__index">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="feature-detail__content">
                <div className="feature-detail__meta">
                  <p className="eyebrow">{doc.category}</p>
                </div>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section className="features-trust">
        <div className="trust-callout">
          <span aria-hidden="true" className="trust-callout__mark">
            {"///"}
          </span>
          <div>
            <p className="eyebrow">More help</p>
            <h2>Need more information?</h2>
            <p>
              Browse other documentation pages or join the Discord server for
              community support.
            </p>
            <div className="button-row">
              <Link className="button button--quiet" href="/docs">
                All documentation
              </Link>
              <Link className="button button--quiet" href="/trust">
                Trust &amp; Safety
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
