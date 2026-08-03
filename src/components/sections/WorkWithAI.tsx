import Section from "@/components/Section";
import { getDictionary } from "@/i18n";

const ai = getDictionary("en").ai;

export default function WorkWithAI() {
  return (
    <Section id="ai" heading={ai.heading}>
      <p className="reading mt-5 text-lg text-muted">{ai.intro}</p>

      <div className="mt-9 grid gap-5 md:grid-cols-3">
        {ai.columns.map((col) => (
          <div key={col.label} className="rounded-card border border-line bg-surface p-5">
            <h3 className="u-mono text-sm font-medium text-primary">{col.label}</h3>
            <p className="mt-3 text-text">{col.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
