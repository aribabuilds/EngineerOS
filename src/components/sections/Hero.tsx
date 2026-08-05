import HeroCanvasLazy from "@/components/hero/HeroCanvasLazy";
import ScrollIndicator from "@/components/hero/ScrollIndicator";
import ExtractionTag from "@/components/ExtractionTag";
import HtmlComment from "@/components/HtmlComment";
import { getDictionary } from "@/i18n";
import { MAILTO } from "@/lib/site";
import { currentStatus } from "@/content/status";

const hero = getDictionary("en").hero;

export default function Hero() {
  return (
    <section className="relative overflow-x-hidden border-b border-line" aria-labelledby="hero-h1">
      {/* Content in DOM order first, canvas second: this alone gives the
          right result at both breakpoints (stacked, text-first on mobile;
          content-left canvas-right on desktop) with no order-* overrides. */}
      <div className="relative flex flex-col lg:min-h-screen lg:flex-row lg:items-center">
        {/* Zone 2: content column. Real DOM, paints immediately; the canvas
            is progressive enhancement layered in afterward. */}
        <div className="relative z-10 px-5 py-6 sm:px-8 sm:py-20 lg:w-[45%] lg:max-w-[560px] lg:shrink-0 lg:py-0 lg:pl-16">
          <p className="u-mono text-sm text-primary-strong">{hero.eyebrow}</p>

          <h1
            id="hero-h1"
            className="mt-2 font-display text-4xl font-semibold leading-[1.08] text-text sm:mt-4 sm:text-5xl"
          >
            {hero.h1}
          </h1>

          <p className="reading mt-3 text-lg text-muted sm:mt-5">{hero.lede}</p>

          {/* Two columns on the smallest phones so all three tags fit the
              first viewport without scrolling; three from sm: up. */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-7 sm:grid-cols-3 sm:gap-2.5 lg:grid-cols-1 lg:max-w-xs">
            {hero.tags.map((tag) => (
              <ExtractionTag key={tag.label} label={tag.label} value={tag.value} />
            ))}
          </div>
          {/* German level shown as B1; the CV's text layer still reads A2 in two spots. */}
          <HtmlComment text="OWNER: confirm A2 vs B1 and align site + CV" />

          {/* Owner-maintained live status, edited in src/content/status.ts. */}
          <p className="u-mono mt-2 text-xs text-muted sm:mt-4">{currentStatus}</p>

          <div className="mt-5 flex flex-wrap gap-3 sm:mt-8">
            <a href={MAILTO} className="btn btn--primary">
              {hero.emailMe}
            </a>
            <a href="#contact" className="btn btn--ghost">
              {hero.bookACall}
            </a>
          </div>

          <ScrollIndicator />
        </div>

        {/* Zone 3: the canvas. Bleeds slightly past the viewport's right
            edge on desktop, per the reference composition; the outer
            section's overflow-x-hidden keeps that from causing a scrollbar. */}
        <div className="relative h-[280px] w-full sm:h-[360px] lg:h-screen lg:min-w-0 lg:flex-1">
          <div className="h-full w-full lg:absolute lg:inset-y-0 lg:left-0 lg:w-auto lg:right-[-3rem]">
            <HeroCanvasLazy />
          </div>
        </div>
      </div>
    </section>
  );
}
