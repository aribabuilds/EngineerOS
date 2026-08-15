import Link from "next/link";
import { getDictionary } from "@/i18n";
import {
  REPOS,
  QUANTUM_LIVE,
  BRIEFPILOT_LIVE_URL,
  briefpilotLiveIsConfigured,
  BRIEFPILOT_DEMO_VIDEO,
  BRIEFPILOT_DEMO_VIDEO_WEBM,
  BRIEFPILOT_DEMO_POSTER,
} from "@/lib/site";
import WorkCard from "@/components/work/WorkCard";
import VideoModal from "@/components/work/VideoModal";
import { parseStack } from "@/components/work/parseStack";

const f = getDictionary("en").featured;

/**
 * "The valley," boxed (round 9): two elevated cards side by side, each
 * carrying the forest atmosphere as its own background rather than the
 * whole section — replaces the earlier full-bleed sticky-scroll panorama,
 * which read as too much for the whole page. Section background is the
 * plain light gray the cards sit on top of. Same content sources as before,
 * same VideoModal wiring, no copy changes.
 *
 * OWNER TODO: BriefPilot's summary/detail copy is unchanged on purpose —
 * pending Ariba's updated text now that the project has shipped. Do not
 * edit without her explicit new copy. Same for BRIEFPILOT_LIVE_URL in
 * src/lib/site.ts: left as a placeholder, no link renders until she
 * supplies the real URL.
 */
export default function FeaturedWork() {
  const briefpilotStack = parseStack(f.cards.briefpilot.detail);
  const quantumStack = parseStack(f.cards.quantum.detail);

  return (
    <section id="work" className="work-valley" aria-labelledby="work-heading">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="work-valley__intro">
          <p className="work-valley__eyebrow">work</p>
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
            stack={briefpilotStack}
            links={
              <>
                <Link href="/work/briefpilot" className="work-valley__link">
                  {f.readDecisions} <span aria-hidden="true">&rarr;</span>
                </Link>
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
                <a href={REPOS.briefpilot} target="_blank" rel="noopener noreferrer" className="work-valley__link">
                  {f.repo}
                </a>
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
            stack={quantumStack}
            links={
              <>
                <a href={QUANTUM_LIVE} target="_blank" rel="noopener noreferrer" className="work-valley__link">
                  {f.openLiveDemo} <span aria-hidden="true">&rarr;</span>
                </a>
                <a href={REPOS.quantum} target="_blank" rel="noopener noreferrer" className="work-valley__link">
                  {f.repo}
                </a>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
