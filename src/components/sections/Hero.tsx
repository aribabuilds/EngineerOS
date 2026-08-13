import { getDictionary } from "@/i18n";
import ForestScene from "@/components/hero/ForestScene";
import LanguageToggle from "@/components/hero/LanguageToggle";

const hero = getDictionary("en").hero;

// Brief-locked hero contact address. NOTE: this differs from the site-wide
// EMAIL (ariba.anjum.se@gmail.com) used by the Header and Contact section.
// The round-5 brief locks hello@aribaanjum.com for the hero CTAs; kept in one
// place so it's a one-line change if the site later unifies on one address.
const HERO_EMAIL = "hello@aribaanjum.com";
const MAILTO = `mailto:${HERO_EMAIL}`;
// TODO(owner): swap for the real Google Meet scheduling URL when available (brief §9).
const MAILTO_CALL = `mailto:${HERO_EMAIL}?subject=Book%20a%2020-min%20call`;

/**
 * Forest-scene hero (round 5). One continuous canvas scene fills the hero as
 * a full-bleed background; a soft gradient scrim (not a box) keeps the text
 * legible. The headline and both CTAs are real server-rendered HTML that read
 * with zero JS; only the animated scene and the language toggle are client.
 * Scope is the hero only, nothing else on the site changes.
 */
export default function Hero() {
  return (
    <section
      className="hero-forest relative min-h-[100svh] overflow-hidden border-b border-line"
      aria-labelledby="hero-h1"
    >
      {/* Scene: full-bleed, decorative, non-interactive. Pointer parallax is
          read off this section (which keeps its events), not the canvas. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ForestScene />
      </div>
      <div className="hero-forest__scrim" aria-hidden="true" />

      {/* Language toggle, top-right. Offset down on desktop so it clears the
          site Header's fixed top-right utility cluster (CV + theme). */}
      <div className="absolute right-4 top-4 z-20 lg:top-[4.5rem]">
        <LanguageToggle label={hero.languageToggleLabel} />
      </div>

      {/* Text, left-aligned, vertically centered on desktop, top on mobile. */}
      <div className="relative z-10 flex min-h-[100svh] max-w-[640px] flex-col justify-start px-6 py-16 sm:px-12 lg:justify-center lg:py-12">
        <p className="hero-forest__eyebrow mb-6">
          <b>{hero.eyebrowName}</b> &nbsp;·&nbsp; {hero.eyebrowRole}
        </p>

        <h1 id="hero-h1" className="hero-forest__display hero-forest__h1 mb-5">
          {hero.h1}
        </h1>

        <p className="hero-forest__subline mb-6">
          {hero.subline.map((seg, i) => (seg.strong ? <b key={i}>{seg.text}</b> : <span key={i}>{seg.text}</span>))}
        </p>

        <span className="hero-forest__pill mb-8">{hero.pill}</span>

        <div className="mb-8 flex flex-wrap gap-3">
          <a className="hero-forest__btn hero-forest__btn--primary" href={MAILTO}>
            {hero.ctaPrimaryLabel}
          </a>
          <a className="hero-forest__btn hero-forest__btn--ghost" href={MAILTO_CALL}>
            {hero.ctaSecondaryLabel}
          </a>
        </div>

        {/* Quick facts: always revealed, no interaction (brief §7). */}
        <div className="mb-8 flex flex-wrap gap-2">
          {hero.slabs.map((slab) => (
            <div key={slab.label} className="hero-forest__slab">
              <span className="lab">{slab.label}</span>
              <span className="val">{slab.value}</span>
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
