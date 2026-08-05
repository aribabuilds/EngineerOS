"use client";

import Link from "next/link";
import Section from "@/components/Section";
import { useInView } from "@/lib/useInView";
import { getDictionary } from "@/i18n";
import { REPOS, QUANTUM_LIVE } from "@/lib/site";

const f = getDictionary("en").featured;

export default function FeaturedWork() {
  return (
    <Section id="work" eyebrow="work" heading={f.heading}>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {/* Card A: BriefPilot (in development). No live-demo link, by design.
            Gets the one-shot scan-line sweep, since it's the featured card. */}
        <WorkCard
          index={0}
          sweep
          status={f.cards.briefpilot.status}
          statusVariant="dev"
          title={f.cards.briefpilot.title}
          summary={f.cards.briefpilot.summary}
          detail={f.cards.briefpilot.detail}
        >
          <Link href="/work/briefpilot" className="u-mono text-sm font-medium text-primary-strong">
            {f.readDecisions} <span aria-hidden="true">→</span>
          </Link>
          <ExternalLink href={REPOS.briefpilot}>{f.repo}</ExternalLink>
        </WorkCard>

        {/* Card B: Quantum Playground (live). */}
        <WorkCard
          index={1}
          status={f.cards.quantum.status}
          statusVariant="live"
          title={f.cards.quantum.title}
          summary={f.cards.quantum.summary}
          detail={f.cards.quantum.detail}
        >
          <ExternalLink href={QUANTUM_LIVE} strong>
            {f.openLiveDemo} <span aria-hidden="true">→</span>
          </ExternalLink>
          <ExternalLink href={REPOS.quantum}>{f.repo}</ExternalLink>
        </WorkCard>
      </div>
    </Section>
  );
}

function WorkCard({
  index,
  status,
  statusVariant,
  title,
  summary,
  detail,
  children,
  sweep = false,
}: {
  index: number;
  status: string;
  statusVariant: "dev" | "live";
  title: string;
  summary: string;
  detail: string;
  children: React.ReactNode;
  sweep?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <article
      ref={ref}
      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
      className={`card-hover-trigger reveal ${inView ? "reveal--visible" : ""} ${
        sweep && inView ? "scan-sweep scan-sweep--play" : ""
      } flex flex-col rounded-card border border-line bg-surface p-6`}
    >
      <div className="flex items-center justify-between">
        <span className="card-hover-box">
          <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
          <span className="card-hover-box__tag u-mono text-[0.65rem] text-primary-strong" aria-hidden="true">
            field: title
          </span>
        </span>
        <span className={`status-tag ${statusVariant === "live" ? "status-tag--live" : ""}`}>
          <span className="status-tag__dot" aria-hidden="true" />
          {status}
        </span>
      </div>

      <p className="mt-3 text-text">{summary}</p>
      <p className="mt-3 text-sm text-muted">{detail}</p>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">{children}</div>
    </article>
  );
}

function ExternalLink({
  href,
  children,
  strong = false,
}: {
  href: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`u-mono text-sm ${strong ? "font-medium text-primary-strong" : "text-muted hover:text-primary-strong"}`}
    >
      {children}
    </a>
  );
}
