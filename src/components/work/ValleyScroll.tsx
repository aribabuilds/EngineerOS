"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMounted } from "@/lib/useMounted";
import ValleyAtmosphere from "./ValleyAtmosphere";

export type ValleyStation = {
  variant: "misty" | "lit";
  marker: string;
  title: string;
  summary: string;
  detail: string;
  stack?: string[];
  links: ReactNode;
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/**
 * The valley panorama's scroll mechanics. No-JS / pre-mount default: plain
 * stacked flow, everything visible, no pin (see .work-valley__driver's base
 * CSS) — this is what makes the section "fully readable with JS disabled"
 * while still getting the full pinned crossfade once React mounts (reusing
 * the useMounted pattern from Shipped/the previous Featured Work build).
 * Scroll progress is read in a rAF-throttled scroll listener and written
 * straight to refs' inline styles, never through React state, so scrolling
 * doesn't trigger re-renders (same performance discipline as ForestScene's
 * animation loop).
 */
export default function ValleyScroll({
  eyebrow,
  heading,
  stations,
}: {
  eyebrow: string;
  heading: string;
  stations: ValleyStation[];
}) {
  const mounted = useMounted();
  const driverRef = useRef<HTMLDivElement>(null);
  const stationRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const mistyWashRef = useRef<HTMLDivElement>(null);
  const litWashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) return;
    const n = stations.length;
    let rafId = 0;
    let ticking = false;

    function update() {
      ticking = false;
      const driver = driverRef.current;
      if (!driver) return;
      const rect = driver.getBoundingClientRect();
      const scrollable = driver.offsetHeight - window.innerHeight;
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0;

      let misty = 0;
      let lit = 0;
      stationRefs.current.forEach((el, i) => {
        if (!el) return;
        const center = (i + 0.5) / n;
        const band = 1 / n;
        const dist = Math.abs(progress - center);
        const t = clamp(1 - dist / (band * 0.65), 0, 1);
        el.style.opacity = String(t);
        el.style.transform = `translateY(${(1 - t) * 14}px)`;
        el.style.pointerEvents = t > 0.5 ? "auto" : "none";
        if (stations[i].variant === "misty") misty = Math.max(misty, t);
        else lit = Math.max(lit, t);
        railRefs.current[i]?.classList.toggle("is-active", t > 0.5);
      });
      if (mistyWashRef.current) mistyWashRef.current.style.opacity = String(misty * 0.55);
      if (litWashRef.current) litWashRef.current.style.opacity = String(lit * 0.55);
    }

    function onScrollOrResize() {
      if (ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [mounted, stations]);

  return (
    <div
      ref={driverRef}
      className={`work-valley__driver ${mounted ? "work-valley__driver--enhanced" : ""}`}
      style={{ "--station-count": stations.length } as React.CSSProperties}
    >
      <div className="work-valley__pin">
        {mounted ? <ValleyAtmosphere /> : null}
        <div ref={mistyWashRef} className="work-valley__wash work-valley__wash--misty" aria-hidden="true" />
        <div ref={litWashRef} className="work-valley__wash work-valley__wash--lit" aria-hidden="true" />

        <div className="work-valley__intro">
          <p className="work-valley__eyebrow">{eyebrow}</p>
          <h2 id="work-heading" className="work-valley__display work-valley__heading">
            {heading}
          </h2>
        </div>

        <div className="work-valley__stations">
          {stations.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => {
                stationRefs.current[i] = el;
              }}
              className="work-valley__station"
            >
              <p className="work-valley__marker">{s.marker}</p>
              <h3 className="work-valley__display work-valley__title">{s.title}</h3>
              <p className="work-valley__summary">{s.summary}</p>
              <p className="work-valley__detail">{s.detail}</p>
              {s.stack ? (
                <div className="work-valley__stack">
                  {s.stack.map((tech) => (
                    <span key={tech} className="work-valley__chip">
                      {tech}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className="work-valley__links">{s.links}</div>
            </div>
          ))}
        </div>

        <div className="work-valley__rail" aria-hidden="true">
          {stations.map((s, i) => (
            <span
              key={s.title}
              ref={(el) => {
                railRefs.current[i] = el;
              }}
              className="work-valley__rail-tick"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
