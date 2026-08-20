"use client";

import { getDictionary } from "@/i18n";
import { useInView } from "@/lib/useInView";
import { useLocale } from "@/lib/LocaleContext";
import StaircaseAtmosphere from "@/components/path/StaircaseAtmosphere";
import StaircaseStep from "@/components/path/StaircaseStep";

/**
 * "My Path" (round 11): a descending staircase, one step per role, replacing
 * the old dated-row timeline. Same forest world as Shipped/Featured Work
 * (bespoke shell, not the generic Section.tsx), continued with its own
 * atmosphere via StaircaseAtmosphere. Keeps id="path" so Header.tsx's nav
 * link and anchor keep working unchanged. Uses the `myPath` i18n key, kept
 * fully separate from `path` (still read directly by the About page).
 * Round 16: reads locale from context (EN/DE toggle).
 */
export default function MyPathSection() {
  const { locale } = useLocale();
  const myPath = getDictionary(locale).myPath;
  const { ref: listRef, inView: spineVisible } = useInView<HTMLOListElement>(0.1);

  return (
    <section id="path" className="staircase relative overflow-hidden" aria-labelledby="path-heading">
      <StaircaseAtmosphere />

      <div className="staircase__content mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="staircase__eyebrow">{myPath.eyebrow}</p>
        <h2 id="path-heading" className="staircase__display staircase__hook">
          {myPath.hook}
        </h2>
        <p className="staircase__intro">{myPath.intro}</p>

        <ol ref={listRef} className="staircase__list">
          <span
            aria-hidden="true"
            className={`staircase__spine ${spineVisible ? "staircase__spine--visible" : ""}`}
          />
          {myPath.steps.map((step, i) => (
            <StaircaseStep
              key={i}
              role={step.role}
              year={step.year}
              side={step.side}
              label={i === myPath.steps.length - 1 ? myPath.labelFinal : myPath.labelDefault}
              detail={step.detail}
              isPlaceholderRole={step.role.toLowerCase().includes("todo")}
            />
          ))}
        </ol>

        <p className="staircase__closing">
          {myPath.closing}
          <span className="staircase__closing-punchline">{myPath.closingPunchline}</span>
        </p>
      </div>
    </section>
  );
}
