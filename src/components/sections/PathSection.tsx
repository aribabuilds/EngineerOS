"use client";

import Section from "@/components/Section";
import { useInView } from "@/lib/useInView";
import { getDictionary } from "@/i18n";

const path = getDictionary("en").path;

/** Dated rows: the order carries meaning (spec to build). The connecting
 * line draws as the section scrolls into view; each dot activates as its
 * own row individually crosses the viewport. */
export default function PathSection() {
  const { ref: lineRef, inView: lineVisible } = useInView<HTMLOListElement>();

  return (
    <Section id="path" eyebrow="path" heading={path.heading}>
      <ol ref={lineRef} className="relative mt-8 border-t border-line pl-5">
        <span
          aria-hidden="true"
          className={`timeline-line absolute left-[7px] top-0 ${lineVisible ? "timeline-line--visible" : ""}`}
        />
        {path.rows.map((row, i) => (
          <TimelineRow key={i} row={row} />
        ))}
      </ol>

      <p className="reading mt-8 font-display text-xl italic leading-snug text-text">
        {path.closing}
      </p>
    </Section>
  );
}

function TimelineRow({ row }: { row: { year: string; role: string; note: string } }) {
  const { ref, inView } = useInView<HTMLLIElement>(0.5);
  return (
    <li
      ref={ref}
      className="relative grid grid-cols-[4rem_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[6rem_1fr]"
    >
      <span
        aria-hidden="true"
        className={`timeline-dot absolute -left-[13px] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-primary ${
          inView ? "timeline-dot--active" : ""
        }`}
      />
      <span className="u-mono text-sm text-primary-strong">{row.year}</span>
      <div>
        <p className="font-medium text-text">{row.role}</p>
        <p className="text-muted">{row.note}</p>
      </div>
    </li>
  );
}
