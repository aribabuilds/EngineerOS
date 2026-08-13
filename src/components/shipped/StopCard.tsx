"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useMounted } from "@/lib/useMounted";
import MicroFlow from "./MicroFlow";

// Card fades/lifts in shortly after the growth animation starts (which begins at delay 0).
const CARD_DELAY = 0.4;

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="shipped-forest__row">
      <span className="shipped-forest__row-label">{label}</span>
      <div className="shipped-forest__row-value">{children}</div>
    </div>
  );
}

export default function StopCard({
  title,
  subtitle,
  problem,
  decision,
  microFlows,
  outcome,
  adoption,
  statusLine,
  growthForm,
}: {
  title: string;
  subtitle: string;
  problem: string;
  decision: string;
  microFlows?: string[][];
  outcome: string;
  adoption?: string;
  statusLine: string;
  growthForm: "roots" | "fork";
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const reduced = usePrefersReducedMotion();
  const mounted = useMounted();
  // No JS: never mounts, so "is-pending" never applies and the card is always
  // visible. With JS: pending (hidden) until scrolled into view, then reveals.
  const pending = mounted && !inView;

  return (
    <div
      ref={ref}
      className={`shipped-forest__card ${pending ? "is-pending" : ""}`}
      style={{ transitionDelay: reduced || !mounted ? "0ms" : `${CARD_DELAY}s` }}
    >
      <h3 className="shipped-forest__display shipped-forest__card-title">{title}</h3>
      <p className="shipped-forest__card-subtitle">{subtitle}</p>

      <div className="reading mt-4 grid gap-2.5">
        <Row label="Problem">{problem}</Row>
        <Row label="Decision">
          {decision}
          {microFlows ? <MicroFlow flows={microFlows} /> : null}
        </Row>
        <Row label="Outcome">{outcome}</Row>
        {adoption ? <Row label="Adoption">{adoption}</Row> : null}
      </div>

      <p className={`shipped-forest__status ${growthForm === "fork" ? "shipped-forest__status--fork" : ""}`}>
        {statusLine}
      </p>
    </div>
  );
}
