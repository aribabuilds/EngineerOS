import Section from "@/components/Section";
import CountUpText from "@/components/CountUpText";
import { getDictionary } from "@/i18n";

const shipped = getDictionary("en").shipped;

/** Each field-labeled row, e.g. "problem" / "decision". CountUpText animates
 * a real number in the value (only "outcome" currently has one). */
function Field({ label, value }: { label: string; value: string }) {
  return (
    <p className="grid grid-cols-[5.5rem_1fr] gap-3 sm:grid-cols-[6.5rem_1fr]">
      <span className="u-mono text-xs uppercase tracking-wide text-primary">{label}:</span>
      <CountUpText text={value} className="text-text" />
    </p>
  );
}

/** Structured problem/decision/outcome/adoption, so the reader remembers the
 * decision, not the tool (round 2 restructure of the original paragraphs). */
export default function Shipped() {
  return (
    <Section id="shipped" eyebrow="shipped" heading={shipped.heading}>
      <ol className="mt-8 grid gap-8 sm:gap-9">
        {shipped.items.map((item, i) => (
          <li key={i} className="grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-[3rem_1fr]">
            <span className="u-mono pt-0.5 text-sm text-primary" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="reading grid gap-1.5">
              <Field label="problem" value={item.problem} />
              <Field label="decision" value={item.decision} />
              <Field label="outcome" value={item.outcome} />
              {item.adoption ? <Field label="adoption" value={item.adoption} /> : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
