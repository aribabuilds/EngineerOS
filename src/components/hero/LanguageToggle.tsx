"use client";

import { useLocale } from "@/lib/LocaleContext";

/**
 * EN/DE toggle (round 16: now real — de.ts has full homepage copy).
 * Reads/writes the site-wide locale via LocaleContext.
 */
export default function LanguageToggle({ label }: { label: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div className="hero-forest__lang" role="group" aria-label={label}>
      <button type="button" aria-pressed={locale === "en"} aria-label="English" onClick={() => setLocale("en")}>
        <span aria-hidden="true">🇬🇧</span>
      </button>
      <button type="button" aria-pressed={locale === "de"} aria-label="Deutsch" onClick={() => setLocale("de")}>
        <span aria-hidden="true">🇩🇪</span>
      </button>
    </div>
  );
}
