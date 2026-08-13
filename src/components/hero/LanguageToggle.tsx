"use client";

import { useState } from "react";

/**
 * Visual-only EN/DE toggle. German copy is a fast-follow (round-5 brief), so
 * this only tracks the pressed state for now; it does not swap any text.
 * When German lands, this is where the real locale switch gets wired in.
 */
export default function LanguageToggle({ label }: { label: string }) {
  const [lang, setLang] = useState<"en" | "de">("en");

  return (
    <div className="hero-forest__lang" role="group" aria-label={label}>
      <button type="button" aria-pressed={lang === "en"} onClick={() => setLang("en")}>
        🇬🇧 EN
      </button>
      <button
        type="button"
        aria-pressed={lang === "de"}
        onClick={() => setLang("de")}
        title="German version coming soon"
      >
        🇩🇪 DE
      </button>
    </div>
  );
}
