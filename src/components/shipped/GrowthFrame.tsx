"use client";

import type { CSSProperties } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useMounted } from "@/lib/useMounted";

type GrowthForm = "roots" | "fork";

/** Fine-line growth geometry, hand-authored per variant. `pathLength={1}` on
 * every path lets the draw-in use a 0..1 stroke-dashoffset regardless of the
 * path's real length, so no getTotalLength() measuring is needed. */
const GEOMETRY: Record<GrowthForm, { stem: string; leaves: string[]; extra: string[] }> = {
  roots: {
    stem: "M36,95 C34,75 38,50 36,18",
    leaves: ["M36,80 C28,76 22,68 20,60", "M36,60 C44,56 50,48 52,40", "M36,40 C29,36 24,29 22,22"],
    // Roots draw down into the soil line: adopted, holding.
    extra: ["M36,95 C30,110 22,118 16,132", "M36,95 C36,112 36,122 36,138", "M36,95 C42,110 50,118 56,132"],
  },
  fork: {
    stem: "M36,95 C34,78 38,55 36,32",
    leaves: ["M36,82 C28,78 22,70 20,62", "M36,64 C44,60 50,52 52,44", "M36,46 C29,42 24,36 22,30"],
    // Stem forks upward instead of rooting down: promoted, still growing.
    extra: ["M36,32 C28,22 20,16 14,5", "M36,32 C44,22 52,16 58,5"],
  },
};

// Staggered stem -> leaves -> roots/fork, ~1.5-2s total, cubic-bezier (set in globals.css).
const STEM_DELAY = 0;
const LEAF_DELAY = 0.55;
const LEAF_STAGGER = 0.12;
const EXTRA_DELAY = 1.0;
const EXTRA_STAGGER = 0.12;

export default function GrowthFrame({ index, form }: { index: number; form: GrowthForm }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const reduced = usePrefersReducedMotion();
  const mounted = useMounted();
  const geometry = GEOMETRY[form];
  // No JS: never mounts, so this stays fully drawn and static (readable,
  // just without the reveal). With JS: hidden until scrolled into view, then draws.
  const drawn = !mounted || inView;

  const dashStyle = (delaySeconds: number): CSSProperties => ({
    strokeDasharray: 1,
    strokeDashoffset: drawn ? 0 : 1,
    transitionDelay: reduced || !mounted ? "0ms" : `${delaySeconds}s`,
  });

  return (
    <div ref={ref} className="shipped-forest__frame-wrap">
      <span className="u-mono text-xs text-[var(--forest-green)]" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      <svg
        viewBox="0 0 72 150"
        className="h-auto w-full max-w-[72px]"
        aria-hidden="true"
        focusable="false"
      >
        <line x1="8" y1="95" x2="64" y2="95" className="shipped-forest__growth-soil" />
        <path
          d={geometry.stem}
          pathLength={1}
          className="shipped-forest__growth-stem"
          style={dashStyle(STEM_DELAY)}
        />
        {geometry.leaves.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className="shipped-forest__growth-leaf"
            style={dashStyle(LEAF_DELAY + i * LEAF_STAGGER)}
          />
        ))}
        {geometry.extra.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            className={form === "fork" ? "shipped-forest__growth-fork" : "shipped-forest__growth-root"}
            style={dashStyle(EXTRA_DELAY + i * EXTRA_STAGGER)}
          />
        ))}
      </svg>
    </div>
  );
}
