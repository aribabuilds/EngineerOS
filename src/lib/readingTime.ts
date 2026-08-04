const WORDS_PER_MINUTE = 220;

/** Estimates reading time from real copy, never a hand-set number. */
export function estimateReadingMinutes(...texts: (string | string[])[]): number {
  const words = texts
    .flat()
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}
