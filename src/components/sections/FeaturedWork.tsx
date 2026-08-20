"use client";

import { getDictionary } from "@/i18n";
import {
  QUANTUM_LIVE,
  MULTIVERSE_LIVE,
  BRIEFPILOT_LIVE_URL,
  briefpilotLiveIsConfigured,
  BRIEFPILOT_DEMO_VIDEO,
  BRIEFPILOT_DEMO_VIDEO_WEBM,
  BRIEFPILOT_DEMO_POSTER,
} from "@/lib/site";
import WorkCard from "@/components/work/WorkCard";
import VideoModal from "@/components/work/VideoModal";
import { useLocale } from "@/lib/LocaleContext";

/**
 * "The valley," boxed (round 9), now three cards (round 10): elevated boxes
 * in a flex-wrap grid that centers a lone leftover card on its own row, each
 * carrying the forest atmosphere as its own background rather than the
 * whole section. Section background is the plain light gray the cards sit
 * on top of.
 *
 * OWNER TODO: BriefPilot's summary/detail copy is unchanged on purpose —
 * pending Ariba's updated text now that the project has shipped. Do not
 * edit without her explicit new copy. Same for BRIEFPILOT_LIVE_URL in
 * src/lib/site.ts: left as a placeholder, no link renders until she
 * supplies the real URL.
 *
 * OWNER TODO: Multiverse Machine's summary/detail/stack were drafted by
 * Claude from Ariba's SRD and handed over verbatim to add — pending her
 * approval, not final copy.
 *
 * Round 12: cards link out to a live demo (or, BriefPilot's case, a demo
 * video) only — no Repo links, no link into the old decisions/case-study
 * page. One clear way to see each thing working, nothing else competing
 * for the click.
 *
 * Round 13: every card's tech stack is now a plain explicit list (stored in
 * i18n, same as Multiverse always had it), not parsed out of the prose —
 * the stack sentence used to also print, duplicated, at the end of the
 * paragraph above the chips.
 *
 * Round 16: client component, reads locale from context (EN/DE toggle).
 */
export default function FeaturedWork() {
  const { locale } = useLocale();
  const f = getDictionary(locale).featured;

  return (
    <section id="work" className="work-valley" aria-labelledby="work-heading">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="work-valley__intro">
          <p className="work-valley__eyebrow">{f.eyebrow}</p>
          <h2 id="work-heading" className="work-valley__display work-valley__heading">
            {f.heading}
          </h2>
        </div>

        <div className="work-valley__grid mt-10 sm:mt-14">
          <WorkCard
            marker={f.cards.briefpilot.marker}
            title={f.cards.briefpilot.title}
            summary={f.cards.briefpilot.summary}
            detail={f.cards.briefpilot.detail}
            stack={f.cards.briefpilot.stack}
            links={
              <>
                {briefpilotLiveIsConfigured ? (
                  <a
                    href={BRIEFPILOT_LIVE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="work-valley__link"
                  >
                    {f.openLiveDemo}
                  </a>
                ) : null}
                <VideoModal
                  label={f.watchDemo}
                  ariaLabel="Watch BriefPilot demo"
                  videoSrc={BRIEFPILOT_DEMO_VIDEO}
                  videoSrcWebm={BRIEFPILOT_DEMO_VIDEO_WEBM}
                  posterSrc={BRIEFPILOT_DEMO_POSTER}
                />
              </>
            }
          />

          <WorkCard
            marker={f.cards.quantum.marker}
            title={f.cards.quantum.title}
            summary={f.cards.quantum.summary}
            detail={f.cards.quantum.detail}
            stack={f.cards.quantum.stack}
            links={
              <a href={QUANTUM_LIVE} target="_blank" rel="noopener noreferrer" className="work-valley__link">
                {f.openLiveDemo} <span aria-hidden="true">&rarr;</span>
              </a>
            }
          />

          <WorkCard
            marker={f.cards.multiverse.marker}
            title={f.cards.multiverse.title}
            summary={f.cards.multiverse.summary}
            detail={f.cards.multiverse.detail}
            stack={f.cards.multiverse.stack}
            links={
              <a href={MULTIVERSE_LIVE} target="_blank" rel="noopener noreferrer" className="work-valley__link">
                {f.openLiveDemo} <span aria-hidden="true">&rarr;</span>
              </a>
            }
          />
        </div>
      </div>
    </section>
  );
}
