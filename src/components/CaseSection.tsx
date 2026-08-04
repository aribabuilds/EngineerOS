"use client";

import { useInView } from "@/lib/useInView";

/** Case-study section shell: field: eyebrow, heading, and the same one-shot
 * fade-and-rise reveal used by the homepage's Section component. */
export default function CaseSection({
  eyebrow,
  heading,
  children,
  emphasis = false,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`reveal ${inView ? "reveal--visible" : ""} border-b border-line ${emphasis ? "bg-surface" : ""}`}
    >
      <div className={`mx-auto max-w-3xl px-5 sm:px-8 ${emphasis ? "py-14 sm:py-16" : "py-11 sm:py-12"}`}>
        <p className="u-mono mb-2 text-xs tracking-wide text-muted">field: {eyebrow}</p>
        <h2 className="font-display text-2xl font-semibold text-text">{heading}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
