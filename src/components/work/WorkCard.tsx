import type { ReactNode } from "react";
import ValleyAtmosphere from "./ValleyAtmosphere";

/**
 * One project as an elevated "3D" box: soft rounded corners, a layered
 * shadow to read as a card sitting above the page, the forest atmosphere
 * filling it as background, all text in light/white so it stays legible
 * over the dark-green canvas. Plain server component — the only client
 * pieces are ValleyAtmosphere (the canvas) and whatever's passed as
 * `links` (VideoModal, for BriefPilot), so this reads and works with JS
 * off exactly like everything else on the page.
 */
export default function WorkCard({
  marker,
  title,
  summary,
  detail,
  stack,
  links,
}: {
  marker: string;
  title: string;
  summary: string;
  detail: string;
  stack?: string[];
  links: ReactNode;
}) {
  return (
    <div className="work-valley__card">
      <ValleyAtmosphere />
      <div className="work-valley__card-content">
        <p className="work-valley__marker">{marker}</p>
        <h3 className="work-valley__display work-valley__title">{title}</h3>
        <p className="work-valley__summary">{summary}</p>
        <p className="work-valley__detail">{detail}</p>
        {stack ? (
          <div className="work-valley__stack">
            {stack.map((tech) => (
              <span key={tech} className="work-valley__chip">
                {tech}
              </span>
            ))}
          </div>
        ) : null}
        <div className="work-valley__links">{links}</div>
      </div>
    </div>
  );
}
