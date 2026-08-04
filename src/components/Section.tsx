"use client";

import { useInView } from "@/lib/useInView";

/**
 * Consistent section shell: id anchor, max width, a mono field: eyebrow, and
 * the heading. The eyebrow is the one place the extraction motif's field:
 * label convention is used outside BriefPilot's own case study. Fades and
 * rises into view once, the same reveal style used everywhere on the site.
 */
export default function Section({
  id,
  eyebrow,
  heading,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      className={`reveal ${inView ? "reveal--visible" : ""} border-b border-line ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-18">
        {eyebrow ? <p className="u-mono mb-2 text-xs tracking-wide text-muted">field: {eyebrow}</p> : null}
        {heading ? (
          <h2 id={id ? `${id}-heading` : undefined} className="font-display text-2xl font-semibold text-text sm:text-3xl">
            {heading}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
