import { svgPath } from "blobs/v2";

/**
 * A soft organic background shape, via github.com/g-harel/blobs (v2's
 * deterministic path generator). The seed is a fixed string per call site,
 * not Math.random(), so the exact same path renders on the server and the
 * client — no hydration mismatch, no client JS needed. Purely decorative:
 * aria-hidden, no pointer events. Positioning, size, blur and opacity are
 * left to the caller's className so each section places it to fit.
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
  const d = svgPath({ seed, extraPoints: 7, randomness: 5, size });
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
