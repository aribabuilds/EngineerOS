import Section from "@/components/Section";
import { getDictionary } from "@/i18n";
import { MAILTO, EMAIL } from "@/lib/site";

const outro = getDictionary("en").outro;

/**
 * The site's closing line (round 12), replacing the standalone Contact
 * section — the nav rail already carries GitHub/LinkedIn/email icons, so a
 * full repeat section at the bottom was redundant. No eyebrow or heading,
 * just the sign-off and a mailto link.
 */
export default function Outro() {
  return (
    <Section className="text-center">
      <p className="reading mx-auto text-lg text-muted">
        {outro.line}{" "}
        <a href={MAILTO} className="text-primary-strong underline underline-offset-2 hover:text-primary">
          {EMAIL}
        </a>
        .
      </p>
    </Section>
  );
}
