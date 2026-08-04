import Link from "next/link";

export interface DecisionCardProps {
  /** Header text, e.g. "Decision · BriefPilot · ADR-0003" */
  header: string;
  /** Optional descriptive title shown under the header bar. */
  title?: string;
  chose: string;
  rejected: string;
  cost: string;
  why: string;
  labels: { chose: string; rejected: string; cost: string; why: string };
  /** Optional link rendered under the card. */
  link?: { href: string; label: string };
}

/**
 * Signature motif B: the "Decision Card".
 * A bordered card with a dark header bar (mono, small accent dot), then rows
 * labelled Chose / Rejected / Cost / Why. Labels are mono; values are body;
 * the "Why" value is in italic display face. This is the intellectual
 * signature, rendered with care.
 */
export default function DecisionCard({
  header,
  title,
  chose,
  rejected,
  cost,
  why,
  labels,
  link,
}: DecisionCardProps) {
  return (
    <div>
      <div className="adr-hover overflow-hidden rounded-card border border-line bg-surface">
        <div className="flex items-center gap-2 bg-[#14202e] px-4 py-2.5 dark:bg-raised">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
          <span className="u-mono text-xs tracking-wide text-white/90">{header}</span>
        </div>

        {title ? (
          <p className="border-b border-line px-4 py-3 font-display text-lg font-semibold leading-snug text-text">
            {title}
          </p>
        ) : null}

        <dl className="divide-y divide-line">
          <Row label={labels.chose}>{chose}</Row>
          <Row label={labels.rejected}>{rejected}</Row>
          <Row label={labels.cost}>{cost}</Row>
          <Row label={labels.why}>
            <span className="font-display text-lg italic leading-snug text-text">“{why}”</span>
          </Row>
        </dl>
      </div>

      {link ? (
        <p className="mt-3">
          <Link href={link.href} className="u-mono text-sm font-medium text-primary">
            {link.label} <span aria-hidden="true">→</span>
          </Link>
        </p>
      ) : null}
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 px-4 py-3 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <dt className="u-mono pt-0.5 text-xs uppercase tracking-wide text-muted">{label}</dt>
      <dd className="text-text">{children}</dd>
    </div>
  );
}
