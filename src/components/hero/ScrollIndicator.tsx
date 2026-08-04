"use client";

import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * A thin line under the hero CTAs with a dot that descends once on load.
 * Plays once, never loops. Under reduced motion, only the static line
 * renders, no dot, no animation.
 */
export default function ScrollIndicator() {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div aria-hidden="true" className="relative mt-8 h-[70px] w-px bg-line">
      {!reducedMotion ? (
        <span className="scroll-indicator__dot absolute left-1/2 top-0 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      ) : null}
    </div>
  );
}
