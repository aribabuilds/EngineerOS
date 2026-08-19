import Section from "@/components/Section";
import { getDictionary } from "@/i18n";
import { MAILTO, EMAIL } from "@/lib/site";

const outro = getDictionary("en").outro;

/**
 * The site's closing line (round 12), replacing the standalone Contact
 * section — the nav rail already carries GitHub/LinkedIn/email icons, so a
 * full repeat section at the bottom was redundant. No eyebrow or heading,
 * just the sign-off and a mailto link. Same forest green as the left nav
 * rail (round 14), so the site's last note lands on the same surface as
 * the always-present nav, rather than a stray beige panel.
 */
export default function Outro() {
  return (
    <Section className="outro-forest text-center">
      <p className="reading mx-auto text-lg">
        {outro.line}{" "}
        <a href={MAILTO} className="outro-forest__link underline underline-offset-2">
          {EMAIL}
        </a>
        .
      </p>
    </Section>
  );
}
