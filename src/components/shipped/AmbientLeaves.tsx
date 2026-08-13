/** Very light drift continuity from the Hero's ambient particles: 3 low-density,
 * low-opacity leaves. Pure CSS (no JS, no client component needed): the
 * reduced-motion query in globals.css both stills and hides them, so there is
 * nothing to gate here even for no-JS visitors who prefer reduced motion. */
const LEAVES = [
  { top: "10%", left: "14%", size: 15, delay: "0s" },
  { top: "38%", left: "84%", size: 11, delay: "-4s" },
  { top: "72%", left: "22%", size: 13, delay: "-9s" },
];

export default function AmbientLeaves() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      {LEAVES.map((leaf, i) => (
        <svg
          key={i}
          className="shipped-forest__ambient-leaf"
          style={{
            top: leaf.top,
            left: leaf.left,
            width: leaf.size,
            height: leaf.size,
            animationDelay: leaf.delay,
          }}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2C7 6 4 11 4 15a8 8 0 0 0 16 0c0-4-3-9-8-13Z" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ))}
    </div>
  );
}
