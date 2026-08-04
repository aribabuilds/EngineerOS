import Section from "@/components/Section";
import { getDictionary } from "@/i18n";

const path = getDictionary("en").path;

/** Dated rows - the order carries meaning (spec → build). */
export default function PathSection() {
  return (
    <Section id="path" eyebrow="path" heading={path.heading}>
      <ol className="mt-8 border-t border-line">
        {path.rows.map((row, i) => (
          <li
            key={i}
            className="grid grid-cols-[4rem_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[6rem_1fr]"
          >
            <span className="u-mono text-sm text-primary">{row.year}</span>
            <div>
              <p className="font-medium text-text">{row.role}</p>
              <p className="text-muted">{row.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <p className="reading mt-8 font-display text-xl italic leading-snug text-text">
        {path.closing}
      </p>
    </Section>
  );
}
