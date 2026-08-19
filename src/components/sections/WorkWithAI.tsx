"use client";

import Section from "@/components/Section";
import BlobAccent from "@/components/BlobAccent";
import { useInView } from "@/lib/useInView";
import { getDictionary } from "@/i18n";

const ai = getDictionary("en").ai;

export default function WorkWithAI() {
  return (
    <Section id="ai" eyebrow="how_i_work_with_ai" heading={ai.heading} className="relative overflow-hidden">
      <BlobAccent
        seed="work-with-ai-accent"
        color="var(--primary)"
        size={600}
        className="-top-32 left-1/2 -translate-x-1/2 opacity-[0.06] blur-3xl"
      />
      <p className="reading relative mt-5 text-lg text-muted">{ai.intro}</p>

      <div className="relative mt-9 grid gap-5 md:grid-cols-3">
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
