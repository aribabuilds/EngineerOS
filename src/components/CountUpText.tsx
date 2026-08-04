"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

// \b before the digit means it won't match a number embedded in a code like
// "C1" or "ADR-0003" (no word-boundary transition right before that digit).
const NUMBER_RE = /\b\d[\d,]*/;
const DURATION_MS = 600;
const STEP_MS = 24;

/**
 * Renders text as-is, except the first real number in it counts up from 0
 * once, when it scrolls into view. Never loops. Static under reduced motion.
 * If the string has no number, it just renders the text unchanged.
 */
export default function CountUpText({ text, className }: { text: string; className?: string }) {
  const match = text.match(NUMBER_RE);
  const target = match ? parseInt(match[0].replace(/,/g, ""), 10) : 0;
  const hasMatch = match !== null;
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  const reducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);
  const played = useRef(false);
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    if (!hasMatch) return;
    if (reducedMotion) {
      setDisplay(targetRef.current);
      return;
    }
    if (!inView || played.current) return;
    played.current = true;

    const steps = Math.max(1, Math.round(DURATION_MS / STEP_MS));
    let step = 0;
    const id = setInterval(() => {
      step++;
      const p = Math.min(1, step / steps);
      setDisplay(Math.round(p * targetRef.current));
      if (p >= 1) clearInterval(id);
    }, STEP_MS);

    return () => clearInterval(id);
    // `text`/`hasMatch` are stable for this component's lifetime; `match` itself
    // is a new object every render and must not be a dependency here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reducedMotion, hasMatch]);

  if (!match) {
    return <span className={className}>{text}</span>;
  }

  const before = text.slice(0, match.index);
  const after = text.slice((match.index ?? 0) + match[0].length);

  return (
    <span ref={ref} className={className}>
      {before}
      {display.toLocaleString()}
      {after}
    </span>
  );
}
