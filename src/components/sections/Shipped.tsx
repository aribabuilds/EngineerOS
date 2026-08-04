import Section from "@/components/Section";
import { getDictionary } from "@/i18n";

const shipped = getDictionary("en").shipped;

/** Leads each item with the adoption, not the build (brief §5). */
export default function Shipped() {
  return (
    <Section id="shipped" eyebrow="shipped" heading={shipped.heading}>
      <ol className="mt-8 grid gap-6 sm:gap-7">
        {shipped.items.map((item, i) => (
          <li key={i} className="grid grid-cols-[2rem_1fr] gap-4 sm:grid-cols-[3rem_1fr]">
            <span className="u-mono pt-1 text-sm text-primary" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="reading text-lg text-text">{item}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
