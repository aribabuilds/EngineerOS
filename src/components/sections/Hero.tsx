import HeroCanvasLazy from "@/components/hero/HeroCanvasLazy";
import ExtractionTag from "@/components/ExtractionTag";
import HtmlComment from "@/components/HtmlComment";
import { getDictionary } from "@/i18n";
import { MAILTO } from "@/lib/site";

const hero = getDictionary("en").hero;

export default function Hero() {
  return (
    <section className="border-b border-line" aria-labelledby="hero-h1">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Text column - real DOM, paints immediately. */}
        <div className="order-2 lg:order-1">
          <p className="u-mono text-sm text-primary">{hero.eyebrow}</p>

          <h1
            id="hero-h1"
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] text-text sm:text-5xl"
          >
            {hero.h1}
          </h1>

          <p className="reading mt-5 text-lg text-muted">{hero.lede}</p>

          <div className="mt-7 grid gap-2.5 sm:grid-cols-3">
            {hero.tags.map((tag) => (
              <ExtractionTag key={tag.label} label={tag.label} value={tag.value} />
            ))}
          </div>
          {/* German level shown as B1; the CV's text layer still reads A2 in two spots. */}
          <HtmlComment text="OWNER: confirm A2 vs B1 and align site + CV" />

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={MAILTO} className="btn btn--primary">
              {hero.emailMe}
            </a>
            <a href="#contact" className="btn btn--ghost">
              {hero.bookACall}
            </a>
          </div>
        </div>

        {/* Visual column - the one bold element. */}
        <div className="order-1 h-[280px] w-full sm:h-[360px] lg:order-2 lg:h-[440px]">
          <HeroCanvasLazy />
        </div>
      </div>
    </section>
  );
}
