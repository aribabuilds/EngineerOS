"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getDictionary } from "@/i18n";

const w = getDictionary("en").caseStudy.walkthrough;

type Outcome = "pass" | "fail";

const STEP_MS = 1700;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    let mq: MediaQueryList;
    try {
      mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    } catch {
      return;
    }
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** A single laid-out word box, positioned by a simple character-width estimate. */
interface WordBox {
  text: string;
  x: number;
  y: number;
  width: number;
}

/**
 * Lays out words left to right using a fixed per-character width. This is a
 * stylized mockup, not real OCR, so an arithmetic estimate is honest and
 * keeps the layout in sync if the placeholder copy ever changes.
 */
function layoutLine(line: string, y: number, startX: number, charWidth: number): WordBox[] {
  const words = line.split(" ");
  let x = startX;
  const boxes: WordBox[] = [];
  for (const word of words) {
    const width = Math.max(word.length * charWidth, charWidth * 1.5);
    boxes.push({ text: word, x, y, width });
    x += width + charWidth * 0.9;
  }
  return boxes;
}

export default function PipelineWalkthrough() {
  const reducedMotion = usePrefersReducedMotion();
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>("pass");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const lastStep = w.steps.length - 1;

  useEffect(() => {
    if (!playing) return;
    timerRef.current = setInterval(() => {
      setStep((s) => {
        if (s >= lastStep) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [playing, lastStep]);

  function goTo(next: number) {
    setPlaying(false);
    setStep(Math.min(Math.max(next, 0), lastStep));
  }

  // Word-box layout for the OCR / quality-gate steps, derived from the fake
  // letter copy so it stays correct if the placeholder text ever changes.
  const fields = useMemo(() => {
    const rows: WordBox[][] = [
      layoutLine(w.letter.behorde, 46, 22, 5.4),
      layoutLine(w.letter.address, 62, 22, 4.6),
      layoutLine(w.letter.aktenzeichen, 46, 170, 4.4),
      layoutLine(w.letter.subject, 108, 22, 4.8),
      ...w.letter.bodyLines.map((line, i) => layoutLine(line, 140 + i * 20, 22, 4.4)),
    ];
    return rows;
  }, []);

  const showOcrBoxes = step >= 2;
  const isGateStep = step === 3;
  const gateFailed = isGateStep && outcome === "fail";

  const transitionClass = reducedMotion ? "" : "transition-all duration-500 ease-out";

  // Preprocessing: rotate to level, boost contrast, slightly downscale.
  const letterTransform =
    step === 0
      ? "rotate(-3deg) scale(0.97)"
      : gateFailed
        ? "rotate(2deg) scale(0.99)"
        : "rotate(0deg) scale(1)";
  const letterFilter =
    step === 0
      ? "contrast(0.85) blur(0.4px)"
      : gateFailed
        ? "contrast(0.7) blur(1.6px)"
        : "contrast(1.05) blur(0px)";

  return (
    <div>
      <div className="rounded-card border border-line bg-surface p-4 sm:p-6">
        {/* Step indicator */}
        <ol className="flex flex-wrap gap-x-4 gap-y-1">
          {w.steps.map((s, i) => (
            <li
              key={s.key}
              className={`u-mono text-xs tracking-wide ${
                i === step ? "text-primary" : i < step ? "text-muted" : "text-muted/50"
              }`}
            >
              {String(i + 1).padStart(2, "0")} {s.label}
            </li>
          ))}
        </ol>

        {/* The mockup letter */}
        <div className="mt-5 flex justify-center">
          <svg
            viewBox="0 0 320 400"
            role="img"
            aria-label="Stylized placeholder letter used to demonstrate the pipeline"
            className="h-[280px] w-full max-w-[260px] sm:h-[320px]"
          >
            <g
              style={{
                transformOrigin: "160px 200px",
                transform: letterTransform,
                filter: letterFilter,
              }}
              className={transitionClass}
            >
              <rect
                x="10"
                y="10"
                width="300"
                height="380"
                rx="4"
                className="fill-bg"
                stroke="var(--line)"
                strokeWidth="1.5"
              />
              <text x="22" y="34" fontSize="11" fontWeight="600" fill="var(--text)">
                {w.letter.behorde}
              </text>
              <text x="22" y="66" fontSize="9" fill="var(--muted)">
                {w.letter.address}
              </text>
              <text x="170" y="34" fontSize="8" fill="var(--muted)">
                {w.letter.aktenzeichen}
              </text>
              <text x="22" y="112" fontSize="10" fontWeight="600" fill="var(--text)">
                {w.letter.subject}
              </text>
              {w.letter.bodyLines.map((line, i) => (
                <text key={line} x="22" y={140 + i * 20} fontSize="9" fill="var(--muted)">
                  {line}
                </text>
              ))}
            </g>

            {/* OCR / quality-gate overlay boxes, drawn on top of the letter */}
            {showOcrBoxes &&
              fields.flat().map((box, i) => {
                const highConfidence = i % 3 !== 0;
                const visible = !gateFailed;
                const strokeColor = isGateStep
                  ? highConfidence
                    ? "var(--primary)"
                    : "var(--muted)"
                  : "var(--primary)";
                return (
                  <rect
                    key={`${box.text}-${i}`}
                    x={box.x - 2}
                    y={box.y - 9}
                    width={box.width + 4}
                    height="12"
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isGateStep && !highConfidence ? 1}
                    strokeDasharray={isGateStep && !highConfidence ? "2 2" : undefined}
                    opacity={visible ? (isGateStep && !highConfidence ? 0.55 : 0.85) : 0}
                    className={transitionClass}
                  />
                );
              })}
          </svg>
        </div>

        {/* Quality gate outcome */}
        {isGateStep && (
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2">
              <span className="u-mono text-xs text-muted">{w.outcomeLabel}:</span>
              <div className="inline-flex overflow-hidden rounded-md border border-line">
                <button
                  type="button"
                  onClick={() => setOutcome("pass")}
                  aria-pressed={outcome === "pass"}
                  className={`u-mono px-2.5 py-1 text-xs ${outcome === "pass" ? "bg-primary text-on-primary" : "text-muted"}`}
                >
                  {w.passLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setOutcome("fail")}
                  aria-pressed={outcome === "fail"}
                  className={`u-mono px-2.5 py-1 text-xs ${outcome === "fail" ? "bg-primary text-on-primary" : "text-muted"}`}
                >
                  {w.failLabel}
                </button>
              </div>
            </div>

            {gateFailed && (
              <div className="mx-auto mt-4 max-w-sm rounded-card border border-line bg-bg p-4 text-center">
                <p className="font-display text-base font-semibold text-text">{w.retakeHeading}</p>
                <ul className="mt-2 grid gap-1 text-left">
                  {w.retakeTips.map((tip) => (
                    <li key={tip} className="text-sm text-muted">
                      · {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className="btn btn--ghost px-3 py-1.5 text-sm disabled:opacity-40"
          >
            {w.backLabel}
          </button>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="btn btn--primary px-3 py-1.5 text-sm"
            aria-pressed={playing}
          >
            {playing ? w.pauseLabel : w.playLabel}
          </button>
          <button
            type="button"
            onClick={() => goTo(step + 1)}
            disabled={step === lastStep}
            className="btn btn--ghost px-3 py-1.5 text-sm disabled:opacity-40"
          >
            {w.nextLabel}
          </button>
        </div>
      </div>

      <p className="mt-3 text-center text-sm text-muted">{w.caption}</p>

      {/*
        MILESTONE: once the owner records a real walkthrough, replace
        <PipelineWalkthrough /> above with:
        <video src="/briefpilot-demo.mp4" controls playsInline className="w-full rounded-card" />
      */}
    </div>
  );
}
