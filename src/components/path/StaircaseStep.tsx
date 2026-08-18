"use client";

import { useInView } from "@/lib/useInView";
import { useMounted } from "@/lib/useMounted";

/**
 * One staircase step: a 3D brown tread with a diagonal leaf marker, the
 * role + year, and a detail box connected by a short line capped with a
 * glowing dot. `side` alternates which column the box sits in on desktop;
 * on mobile everything collapses to a single left rail (see the
 * `.staircase-step` media query in globals.css) and the connector line
 * disappears entirely, per spec. Reveals on scroll via useInView, but
 * defaults to fully visible (useMounted) so this reads with JS off exactly
 * like every other section on the site.
 */
export default function StaircaseStep({
  role,
  year,
  side,
  label,
  detail,
  isPlaceholderRole = false,
}: {
  role: string;
  year: string;
  side: "left" | "right";
  label: string;
  detail: string;
  isPlaceholderRole?: boolean;
}) {
  const { ref, inView } = useInView<HTMLLIElement>(0.25);
  const mounted = useMounted();
  const pending = mounted && !inView;

  const roleYear = (variant: "desktop" | "mobile") => (
    <p className={`staircase-step__roleyear staircase-step__roleyear--${variant}`}>
      <span className={`staircase-step__role ${isPlaceholderRole ? "staircase-step__role--todo" : ""}`}>
        {role}
      </span>
      <span className="staircase-step__year">{year}</span>
    </p>
  );

  return (
    <li ref={ref} data-side={side} className={`staircase-step ${pending ? "is-pending" : ""}`}>
      <div className="staircase-step__centre">
        <div className="staircase-step__tread">
          <svg className="staircase-step__leaf" viewBox="0 0 20 28" aria-hidden="true">
            <path d="M10,2 C16,8 18,16 10,26 C2,16 4,8 10,2 Z" />
            <line x1="10" y1="5" x2="10" y2="23" />
          </svg>
        </div>
        {roleYear("desktop")}
      </div>

      <div className="staircase-step__box">
        {roleYear("mobile")}
        <p className="staircase-step__label">{label}</p>
        <p className="staircase-step__detail">{detail}</p>
      </div>
    </li>
  );
}
