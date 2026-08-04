import CountUpText from "./CountUpText";

/**
 * Signature motif A: "extraction annotation".
 * A thin primary-outlined box with a tiny uppercase mono label above the value,
 * echoing how an OCR overlay tags a field on a scanned letter. Sharp corners
 * are intentional (they mimic a bounding box). Keep it quiet.
 */
export default function ExtractionTag({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`extraction ${className}`}>
      <span className="extraction__label">{label}</span>
      {/* CountUpText only animates a real standalone number (e.g. "20 h /
          week"); it passes codes like "C1" through unchanged. */}
      <CountUpText text={value} className="u-mono block text-sm text-text" />
    </div>
  );
}
