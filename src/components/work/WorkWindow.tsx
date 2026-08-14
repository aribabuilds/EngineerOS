/**
 * The arch-shaped "window" atmosphere, matching the approved mockup: a large
 * arch with a hazy-vs-lit gradient, a soft canopy horizon line, two trunk
 * silhouettes at the base, motes on "live" only, and the title/status
 * overlaid directly on the window (bottom-left, on its own scrim). Purely
 * decorative except for that overlay text, which duplicates the plain-text
 * title/status already in the card below it, so nothing here is load-bearing
 * content on its own — the visible text still reads fine with JS off since
 * this is a plain server component, no client boundary.
 */
export default function WorkWindow({
  status,
  title,
  statusLabel,
}: {
  status: "dev" | "live";
  title: string;
  statusLabel: string;
}) {
  return (
    <div className={`work-forest__window work-forest__window--${status}`}>
      <div className="work-forest__window-atmosphere" aria-hidden="true" />

      <svg
        className="work-forest__window-horizon"
        viewBox="0 0 100 14"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,7 Q8,1 16,7 T32,7 T48,7 T64,7 T80,7 T96,7 L100,7 V14 H0 Z" />
      </svg>

      <div className="work-forest__window-trunk work-forest__window-trunk--left" aria-hidden="true" />
      <div className="work-forest__window-trunk work-forest__window-trunk--right" aria-hidden="true" />

      {status === "live" ? (
        <>
          <span className="work-forest__mote" style={{ top: "20%", left: "38%", animationDelay: "0s" }} aria-hidden="true" />
          <span className="work-forest__mote" style={{ top: "34%", left: "63%", animationDelay: "-1.6s" }} aria-hidden="true" />
          <span className="work-forest__mote" style={{ top: "48%", left: "28%", animationDelay: "-3.1s" }} aria-hidden="true" />
          <span className="work-forest__mote" style={{ top: "26%", left: "50%", animationDelay: "-4.4s" }} aria-hidden="true" />
        </>
      ) : null}

      {/* Duplicates the real title/status already in the card below (with
          proper heading semantics), so this copy is decorative/aria-hidden
          to avoid double-announcing it to screen readers. */}
      <div className="work-forest__window-overlay" aria-hidden="true">
        <p className="work-forest__window-overlay-title">{title}</p>
        <p className="work-forest__window-overlay-status">{statusLabel}</p>
      </div>
    </div>
  );
}
