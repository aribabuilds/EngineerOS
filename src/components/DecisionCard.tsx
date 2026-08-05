"use client";

import { useId, useState } from "react";
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
  /** Starts expanded. Used for the first ADR so the pattern is discoverable. */
  defaultExpanded?: boolean;
}

/**
 * Signature motif B: the "Decision Card".
 * A bordered card with a dark header bar (mono, small accent dot), then rows
 * labelled Chose / Rejected / Cost / Why. Labels are mono; values are body;
 * the "Why" value is in italic display face. This is the intellectual
 * signature, rendered with care.
 *
 * Collapsed by default (title + Chose only); expanding reveals Rejected /
 * Cost / Why with a smooth height transition. No flip animation.
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
  defaultExpanded = false,
}: DecisionCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const regionId = useId();

  return (
    <div>
      <div className="adr-hover overflow-hidden rounded-card border border-line bg-surface">
        <div className="flex items-center gap-2 bg-[#1e1b17] px-4 py-2.5 dark:bg-raised">
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
        </dl>

        <div
          id={regionId}
          className="grid transition-[grid-template-rows] duration-300 ease-out"
          style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <dl className="divide-y divide-line border-t border-line">
              <Row label={labels.rejected}>{rejected}</Row>
              <Row label={labels.cost}>{cost}</Row>
              <Row label={labels.why}>
                <span className="font-display text-lg italic leading-snug text-text">“{why}”</span>
              </Row>
            </dl>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
          aria-controls={regionId}
          className="u-mono flex w-full items-center justify-center gap-1.5 border-t border-line py-2 text-xs text-muted transition-colors hover:text-primary-strong"
        >
          {expanded ? "Show less" : "Show more"}
          <span aria-hidden="true" className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
      </div>

      {link ? (
        <p className="mt-3">
          <Link href={link.href} className="u-mono text-sm font-medium text-primary-strong">
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
