/** Consistent section shell: id anchor, max width, and a mono-eyebrow heading. */
export default function Section({
  id,
  heading,
  children,
  className = "",
}: {
  id?: string;
  heading?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`border-b border-line ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-18">
        {heading ? (
          <h2 id={id ? `${id}-heading` : undefined} className="font-display text-2xl font-semibold text-text sm:text-3xl">
            {heading}
          </h2>
        ) : null}
        {children}
      </div>
    </section>
  );
}
