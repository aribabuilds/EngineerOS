"use client";

import { getDictionary } from "@/i18n";
import GrowthFrame from "@/components/shipped/GrowthFrame";
import StopCard from "@/components/shipped/StopCard";
import AmbientLeaves from "@/components/shipped/AmbientLeaves";
import { useLocale } from "@/lib/LocaleContext";

/**
 * Forest-path redesign (round 6): the path continuing deeper from the Hero.
 * Three project "stops," each a fine-line growth animation beside a
 * Problem/Decision/Outcome/Adoption card. Bespoke section shell (not the
 * generic Section.tsx), since this continues the Hero's forest world rather
 * than the site's default theme. Client component (round 16: reads the
 * locale from context so the EN/DE toggle can switch its copy); only
 * GrowthFrame and StopCard were already client, for the scroll-triggered
 * draw/reveal.
 */
export default function Shipped() {
  const { locale } = useLocale();
  const shipped = getDictionary(locale).shipped;

  return (
    <section
      id="shipped"
      className="shipped-forest relative overflow-hidden"
      aria-labelledby="shipped-heading"
    >
      <AmbientLeaves />

      <div className="relative z-10 mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="shipped-forest__eyebrow mb-3">{shipped.eyebrow}</p>
        <h2 id="shipped-heading" className="shipped-forest__display shipped-forest__heading mb-4">
          {shipped.heading}
        </h2>
        <p className="shipped-forest__supporting mb-12 sm:mb-16">{shipped.supportingLine}</p>

        <ol className="grid gap-14 sm:gap-20">
          {shipped.items.map((item, i) => (
            <li key={i} className="shipped-forest__stop">
              <GrowthFrame index={i + 1} form={item.growthForm} />
              <StopCard
                title={item.title}
                subtitle={item.subtitle}
                problem={item.problem}
                decision={item.decision}
                microFlows={item.microFlows}
                outcome={item.outcome}
                adoption={item.adoption}
                statusLine={item.statusLine}
                growthForm={item.growthForm}
              />
            </li>
          ))}
        </ol>

        <p className="shipped-forest__closing mt-16 sm:mt-20">{shipped.closingLine}</p>
      </div>
    </section>
  );
}
