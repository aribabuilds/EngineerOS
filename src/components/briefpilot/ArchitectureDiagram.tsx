"use client";

import { getDictionary } from "@/i18n";
import { useInView } from "@/lib/useInView";

const a = getDictionary("en").caseStudy.architecture;

/** A short connector between two stages: a line with an arrowhead that draws
 * itself once via stroke-dashoffset when the diagram scrolls into view.
 * Rotates between horizontal (desktop, stages in a row) and vertical
 * (mobile, stages stacked) via a CSS class, so no position math is needed. */
function Connector({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 40 16"
      className="h-4 w-10 shrink-0 rotate-90 text-primary sm:rotate-0"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="8"
        x2="30"
        y2="8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="30"
        strokeDashoffset={animate ? 0 : 30}
        style={{ transition: "stroke-dashoffset 700ms ease-out" }}
      />
      <path d="M26 3 L34 8 L26 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function StageBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-card border border-line bg-bg px-3 py-2.5 text-center text-sm text-text">
      {children}
    </div>
  );
}

export default function ArchitectureDiagram() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <div ref={ref} className="overflow-x-auto">
      <div className="flex min-w-[280px] flex-col items-stretch gap-0 sm:flex-row sm:items-center sm:gap-0">
        {a.stages.map((stage, i) => (
          <div key={stage} className="flex flex-col items-center sm:flex-row">
            <StageBox>{stage}</StageBox>
            {i < a.stages.length - 1 && <Connector animate={inView} />}
          </div>
        ))}
      </div>

      {/* CI side rail: a dashed lane noting every stage runs under CI. */}
      <div className="mt-4 flex items-center gap-2 border-t border-dashed border-line pt-3">
        <span className="u-mono text-xs text-muted">{a.ciLabel}</span>
      </div>

      {/* AI adapter layer: visually distinct, explicitly not wired in yet. */}
      <div className="mt-4 inline-flex flex-col gap-1 rounded-card border border-dashed border-primary/50 bg-accent-tint px-3 py-2.5">
        <span className="text-sm text-text">{a.aiAdapterLabel}</span>
        <span className="extraction inline-block w-fit">
          <span className="extraction__label">{a.aiAdapterStatusLabel}</span>
          <span className="u-mono block text-sm text-text">{a.aiAdapterStatusValue}</span>
        </span>
      </div>
    </div>
  );
}
