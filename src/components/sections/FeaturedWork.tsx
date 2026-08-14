import Link from "next/link";
import { getDictionary } from "@/i18n";
import { REPOS, QUANTUM_LIVE } from "@/lib/site";
import WorkItem from "@/components/work/WorkItem";

const f = getDictionary("en").featured;

/**
 * "Windows in the clearing" (round 7): restyle only, same content sources as
 * before. Bespoke forest-world shell (not Section.tsx), continuing the Hero /
 * Shipped visual language. The grid (`.work-forest__grid`, in globals.css) is
 * auto-fit, not a hardcoded column count, so a third project is one more
 * <WorkItem> with zero grid/CSS changes.
 */
export default function FeaturedWork() {
  return (
    <section id="work" className="work-forest border-b border-line" aria-labelledby="work-heading">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="work-forest__eyebrow mb-3">work</p>
        <h2 id="work-heading" className="work-forest__display work-forest__heading mb-10 sm:mb-14">
          {f.heading}
        </h2>

        <ul className="work-forest__grid">
          {/* BriefPilot: in development, no live-demo link, by design. */}
          <WorkItem
            statusVariant="dev"
            status={f.cards.briefpilot.status}
            title={f.cards.briefpilot.title}
            summary={f.cards.briefpilot.summary}
            detail={f.cards.briefpilot.detail}
          >
            <Link href="/work/briefpilot" className="work-forest__link work-forest__link--strong">
              {f.readDecisions} <span aria-hidden="true">&rarr;</span>
            </Link>
            <a href={REPOS.briefpilot} target="_blank" rel="noopener noreferrer" className="work-forest__link">
              {f.repo}
            </a>
          </WorkItem>

          {/* Quantum Playground: live. */}
          <WorkItem
            statusVariant="live"
            status={f.cards.quantum.status}
            title={f.cards.quantum.title}
            summary={f.cards.quantum.summary}
            detail={f.cards.quantum.detail}
          >
            <a
              href={QUANTUM_LIVE}
              target="_blank"
              rel="noopener noreferrer"
              className="work-forest__link work-forest__link--strong"
            >
              {f.openLiveDemo} <span aria-hidden="true">&rarr;</span>
            </a>
            <a href={REPOS.quantum} target="_blank" rel="noopener noreferrer" className="work-forest__link">
              {f.repo}
            </a>
          </WorkItem>
        </ul>
      </div>
    </section>
  );
}
