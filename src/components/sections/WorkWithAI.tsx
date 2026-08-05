"use client";

import Section from "@/components/Section";
import { useInView } from "@/lib/useInView";
import { getDictionary } from "@/i18n";

const ai = getDictionary("en").ai;

export default function WorkWithAI() {
  return (
    <Section id="ai" eyebrow="how_i_work_with_ai" heading={ai.heading}>
      <p className="reading mt-5 text-lg text-muted">{ai.intro}</p>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {ai.columns.map((col, i) => (
          <AiColumn key={col.label} label={col.label} body={col.body} index={i} />
        ))}
      </div>
    </Section>
  );
}

function AiColumn({ label, body, index }: { label: string; body: string; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
      className={`reveal ${inView ? "reveal--visible" : ""} rounded-card border border-line bg-surface p-5`}
    >
      <h3 className="u-mono text-sm font-medium text-primary-strong">{label}</h3>
      <p className="mt-3 text-text">{body}</p>
    </div>
  );
}
