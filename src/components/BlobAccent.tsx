"use client";

import { useEffect, useState } from "react";
import { svgPath } from "blobs/v2";

/**
 * A soft organic background shape, via github.com/g-harel/blobs (v2's
 * path generator). The seed is fixed per call site, but the library's
 * trig-heavy generation still produces float64 results that differ in
 * their last couple of decimal digits between Node (SSR) and the browser
 * (observed as a real React hydration-mismatch warning on the `d`
 * attribute) — so the path is generated client-side only, in an effect
 * after mount, rather than during render. Nothing renders on the server
 * or during hydration; the blob fades in a moment after, same as this
 * site's other purely-decorative, client-only visuals (the canvas
 * atmospheres). Purely decorative: aria-hidden, no pointer events.
 * Positioning, size, blur and opacity are left to the caller's className.
 */
export default function BlobAccent({
  seed,
  color,
  size = 520,
  className = "",
}: {
  seed: string | number;
  color: string;
  size?: number;
  className?: string;
}) {
  const [d, setD] = useState<string | null>(null);

  useEffect(() => {
    setD(svgPath({ seed, extraPoints: 7, randomness: 5, size }));
  }, [seed, size]);

  if (!d) return null;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={`pointer-events-none absolute ${className}`}
    >
      <path d={d} fill={color} />
    </svg>
  );
}
