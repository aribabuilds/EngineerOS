"use client";

import dynamic from "next/dynamic";

/** Lightweight poster shown before the WebGL bundle loads (and if it never does). */
function Poster() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <svg viewBox="0 0 200 140" className="h-full w-full max-h-[320px]" role="presentation">
        <g fill="var(--primary)" opacity="0.85">
          {Array.from({ length: 21 }).map((_, i) => {
            const col = i % 7;
            const row = Math.floor(i / 7);
            return (
              <circle
                key={i}
                cx={70 + col * 12}
                cy={45 + row * 12}
                r={2.6}
                opacity={i % 3 === 0 ? 0.6 : 0.9}
              />
            );
          })}
        </g>
        <rect
          x="60"
          y="34"
          width="86"
          height="48"
          rx="2"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <path
          d="M78 104 l10 10 l22 -24"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * The WebGL hero is dynamically imported (ssr:false) so it never blocks first
 * paint or TTI. The H1/lede/buttons are real DOM rendered by the server; this
 * is pure progressive enhancement.
 */
const HeroCanvas = dynamic(() => import("./HeroCanvas"), {
  ssr: false,
  loading: () => <Poster />,
});

export default function HeroCanvasLazy() {
  return <HeroCanvas />;
}
