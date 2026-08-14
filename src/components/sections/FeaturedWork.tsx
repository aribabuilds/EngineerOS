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
import ValleyScroll, { type ValleyStation } from "@/components/work/ValleyScroll";
import VideoModal from "@/components/work/VideoModal";
import { parseStack } from "@/components/work/parseStack";

const f = getDictionary("en").featured;

/**
 * "The valley" (round 8): full-bleed sticky-scroll panorama, replacing the
 * arch/window design. Both projects are now live (BriefPilot shipped), so
 * both stations use the "lit" (brown) wash/accent; "misty" (blue) stays
 * fully built in the system for a future in-development project.
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

  const stations: ValleyStation[] = [
    {
      variant: "lit",
      marker: f.cards.briefpilot.marker,
      title: f.cards.briefpilot.title,
      summary: f.cards.briefpilot.summary,
      detail: f.cards.briefpilot.detail,
      stack: briefpilotStack,
      links: (
        <>
          <Link href="/work/briefpilot" className="work-valley__link">
            {f.readDecisions} <span aria-hidden="true">&rarr;</span>
          </Link>
          {briefpilotLiveIsConfigured ? (
            <a href={BRIEFPILOT_LIVE_URL} target="_blank" rel="noopener noreferrer" className="work-valley__link">
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
      ),
    },
    {
      variant: "lit",
      marker: f.cards.quantum.marker,
      title: f.cards.quantum.title,
      summary: f.cards.quantum.summary,
      detail: f.cards.quantum.detail,
      stack: quantumStack,
      links: (
        <>
          <a href={QUANTUM_LIVE} target="_blank" rel="noopener noreferrer" className="work-valley__link">
            {f.openLiveDemo} <span aria-hidden="true">&rarr;</span>
          </a>
          <a href={REPOS.quantum} target="_blank" rel="noopener noreferrer" className="work-valley__link">
            {f.repo}
          </a>
        </>
      ),
    },
  ];

  return (
    <section id="work" className="work-valley" aria-labelledby="work-heading">
      <ValleyScroll eyebrow="work" heading={f.heading} stations={stations} />
    </section>
  );
}
