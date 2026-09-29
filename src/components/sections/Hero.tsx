"use client";

import { useState } from "react";
import { getDictionary } from "@/i18n";
import ForestScene from "@/components/hero/ForestScene";
import LanguageToggle from "@/components/hero/LanguageToggle";
import { useLocale } from "@/lib/LocaleContext";
import { EMAIL, MAILTO } from "@/lib/site";

// Round 17: both hero CTAs now use the one real address (ariba.anjum.se@
// gmail.com, the site-wide EMAIL/MAILTO from lib/site.ts); the separate
// "brief-locked" hello@aribaanjum.com address this used to point to is
// retired.

// "Book a call": Google Calendar's public quick-add URL. Opens a new-event
// compose screen with Ariba pre-added as a guest, no API key or backend
// needed. Note: this can pre-fill the guest list but can't force-attach a
// Google Meet link (that needs the Calendar API with OAuth); Calendar's own
// compose screen offers a one-click "Add Google Meet video conferencing"
// button once it opens, so the visitor adds it there before sending.
const CALL_EVENT_TITLE = "20-min call with Ariba Anjum";
const CALL_EVENT_DETAILS = "Booked from Ariba Anjum's portfolio site.";
const BOOK_A_CALL_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  `&text=${encodeURIComponent(CALL_EVENT_TITLE)}` +
  `&add=${encodeURIComponent(EMAIL)}` +
  `&details=${encodeURIComponent(CALL_EVENT_DETAILS)}`;

/**
 * Forest-scene hero (round 5). One continuous canvas scene fills the hero as
 * a full-bleed background; a soft gradient scrim (not a box) keeps the text
 * legible. The headline and both CTAs are real server-rendered HTML that read
 * with zero JS; only the animated scene and the language toggle are client.
 * Scope is the hero only, nothing else on the site changes.
 */
export default function Hero() {
  const { locale } = useLocale();
  const hero = getDictionary(locale).hero;
  // Mobile-only subhead toggle: paragraphs 2+ stay in the HTML and are only
  // hidden by CSS below the 640px breakpoint while collapsed.
  const [sublineOpen, setSublineOpen] = useState(false);
  const [firstPara, ...morePara] = hero.subline;

  return (
    <section
      className="hero-forest relative min-h-[100svh] overflow-hidden"
      aria-labelledby="hero-h1"
    >
      {/* Scene: full-bleed, decorative, non-interactive. Pointer parallax is
          read off this section (which keeps its events), not the canvas. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ForestScene />
      </div>
      <div className="hero-forest__scrim" aria-hidden="true" />

      {/* Language toggle, top-right. */}
      <div className="absolute right-4 top-4 z-20">
        <LanguageToggle label={hero.languageToggleLabel} />
      </div>

      {/* Text, horizontally centered like every other section's content
          column (round 18, was flush-left before), vertically centered on
          desktop, top on mobile. */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[640px] flex-col justify-start px-6 py-16 sm:px-12 lg:justify-center lg:py-12">
        <p className="hero-forest__eyebrow mb-6">
          <b>{hero.eyebrowName}</b> &nbsp;·&nbsp; {hero.eyebrowRole}
        </p>

        <h1 id="hero-h1" className="hero-forest__display hero-forest__h1 mb-5">
          {hero.h1}
        </h1>

        <div className="hero-forest__subline mb-6">
          <p>{firstPara}</p>
          <div
            id="hero-subline-more"
            className="hero-forest__subline-more"
            data-expanded={sublineOpen ? "true" : "false"}
          >
            {morePara.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
          <button
            type="button"
            className="hero-forest__more"
            aria-expanded={sublineOpen}
            aria-controls="hero-subline-more"
            onClick={() => setSublineOpen((open) => !open)}
          >
            {sublineOpen ? hero.showLess : hero.readMore}
          </button>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          <a className="hero-forest__btn hero-forest__btn--primary" href={MAILTO}>
            {hero.ctaPrimaryLabel}
          </a>
          <a
            className="hero-forest__btn hero-forest__btn--ghost"
            href={BOOK_A_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {hero.ctaSecondaryLabel}
          </a>
        </div>

        {/* Quick facts: always revealed, no interaction (brief §7). One
            unified card of label/value rows (round 15), replacing the old
            standalone pill + three separate boxes. */}
        <div className="hero-forest__quickcard mb-8">
          {hero.quickFacts.rows.map((row) => (
            <div key={row.label} className="hero-forest__quickrow">
              <span className="hero-forest__quickrow-label">{row.label}</span>
              <span
                className={`hero-forest__quickrow-value ${row.live ? "hero-forest__quickrow-value--live" : ""}`}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <span className="hero-forest__cue">
          {hero.scrollCue} <span className="hero-forest__arrow">↓</span>
        </span>
      </div>
    </section>
  );
}
