"use client";

import Section from "@/components/Section";
import { getDictionary } from "@/i18n";
import { useLocale } from "@/lib/LocaleContext";
import { MAILTO, EMAIL } from "@/lib/site";

/**
 * The site's closing line (round 12), replacing the standalone Contact
 * section — the nav rail already carries GitHub/LinkedIn/email icons, so a
 * full repeat section at the bottom was redundant. No eyebrow or heading,
 * just the sign-off and a mailto link. Same forest green as the left nav
 * rail (round 14), so the site's last note lands on the same surface as
 * the always-present nav, rather than a stray beige panel. Round 16: reads
 * locale from context (EN/DE toggle) — the link always stays the real
 * EMAIL constant regardless of language, only the sentence around it
 * translates.
 */
export default function Outro() {
  const { locale } = useLocale();
  const outro = getDictionary(locale).outro;

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
