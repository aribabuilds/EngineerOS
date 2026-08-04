"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";
import { useThemeColors } from "./useThemeColors";
import { useInView } from "@/lib/useInView";
import { getDictionary } from "@/i18n";

const hero = getDictionary("en").hero;

// The hero's own timeline settles around 5s (see HeroScene's T.trust[1]).
// The caption reveal waits until then so it never runs alongside the WebGL
// sequence, then plays once as a quiet second beat of the same thesis.
const CAPTION_REVEAL_DELAY_MS = 5200;

function detectReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

/**
 * Constrained = likely mobile or low-power. These devices get the final
 * composed frame, never the full simulation (build brief §7).
 */
function detectConstrained(): boolean {
  try {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const small = window.innerWidth < 768;
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    return small || coarse || cores <= 4 || mem <= 4;
  } catch {
    return false;
  }
}

function detectFinePointer(): boolean {
  try {
    return window.matchMedia("(pointer: fine)").matches;
  } catch {
    return false;
  }
}

export default function HeroCanvas() {
  // Decided once on mount (component is client-only via dynamic import).
  const [animate] = useState(() => !detectReducedMotion() && !detectConstrained());
  const [pointerParallax] = useState(() => animate && detectFinePointer());
  const [visible, setVisible] = useState(true);
  const [beat, setBeat] = useState(animate ? 0 : 3);
  const colors = useThemeColors();
  const wrapRef = useRef<HTMLDivElement>(null);

  // Pause the render loop when the hero scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The caption's one-time reveal: hidden until the hero has settled and the
  // caption itself has scrolled into view. Instant under reduced motion /
  // constrained devices, since the hero itself is already static there.
  const { ref: captionRef, inView: captionInView } = useInView<HTMLParagraphElement>(0.3);
  const [revealed, setRevealed] = useState(!animate);

  useEffect(() => {
    if (!animate || revealed || !captionInView) return;
    const timer = setTimeout(() => setRevealed(true), CAPTION_REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, [animate, revealed, captionInView]);

  const beats = hero.canvasBeats;

  return (
    <div ref={wrapRef} className="relative h-full w-full">
      <Canvas
        frameloop={animate && visible ? "always" : "demand"}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 9], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <HeroScene
          colors={colors}
          animate={animate}
          pointerParallax={pointerParallax}
          onBeat={setBeat}
        />
      </Canvas>

      {/* Mono caption: a one-time word reveal once the hero has settled, then
          a quiet, permanent highlight tracking the active beat. Decorative;
          the real headline is DOM text elsewhere. */}
      <p
        ref={captionRef}
        aria-hidden="true"
        className="u-mono pointer-events-none absolute bottom-2 left-2 flex flex-wrap gap-x-1.5 text-[0.68rem] text-muted lg:bottom-6 lg:left-6"
      >
        {beats.map((b, i) => (
          <span
            key={b}
            className="flex items-center gap-1.5 transition-all duration-300 ease-out"
            style={{
              opacity: revealed ? 1 : 0,
              transform: revealed ? "translateY(0)" : "translateY(4px)",
              transitionDelay: revealed ? `${i * 90}ms` : "0ms",
            }}
          >
            <span className={i === beat ? "text-primary" : ""}>{b}</span>
            {i < beats.length - 1 ? <span className="opacity-50">→</span> : null}
          </span>
        ))}
      </p>
    </div>
  );
}
