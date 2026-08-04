import Link from "next/link";
import Section from "@/components/Section";
import { getDictionary } from "@/i18n";
import { REPOS, QUANTUM_LIVE } from "@/lib/site";

const f = getDictionary("en").featured;

export default function FeaturedWork() {
  return (
    <Section id="work" eyebrow="work" heading={f.heading}>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {/* Card A - BriefPilot (in development). No live-demo link, by design. */}
        <WorkCard
          status={f.cards.briefpilot.status}
          statusVariant="dev"
          title={f.cards.briefpilot.title}
          summary={f.cards.briefpilot.summary}
          detail={f.cards.briefpilot.detail}
        >
          <Link href="/work/briefpilot" className="u-mono text-sm font-medium text-primary">
            {f.readDecisions} <span aria-hidden="true">→</span>
          </Link>
          <ExternalLink href={REPOS.briefpilot}>{f.repo}</ExternalLink>
        </WorkCard>

        {/* Card B - Quantum Playground (live). */}
        <WorkCard
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
  status,
  statusVariant,
  title,
  summary,
  detail,
  children,
}: {
  status: string;
  statusVariant: "dev" | "live";
  title: string;
  summary: string;
  detail: string;
  children: React.ReactNode;
}) {
  return (
    <article className="flex flex-col rounded-card border border-line bg-surface p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-semibold text-text">{title}</h3>
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
      className={`u-mono text-sm ${strong ? "font-medium text-primary" : "text-muted hover:text-primary"}`}
    >
      {children}
    </a>
  );
}
