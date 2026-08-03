/**
 * Signature motif A - "extraction annotation".
 * A thin primary-outlined box with a tiny uppercase mono label above the value,
 * echoing how an OCR overlay tags a field on a scanned letter. Sharp corners
 * are intentional (they mimic a bounding box) - keep it quiet.
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
      <span className="u-mono block text-sm text-text">{value}</span>
    </div>
  );
}
