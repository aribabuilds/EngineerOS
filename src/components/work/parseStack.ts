/**
 * Render-time derivation only, not content. Some `detail` strings end with a
 * bare tech list ("...are shipped. Next.js · FastAPI · Postgres · Docker · CI.")
 * folded into the prose rather than stored as a separate field. This pulls
 * that trailing clause out for the stack chips without touching the source
 * string, which stays intact and still reads in full underneath.
 */
export function parseStack(detail: string): string[] | undefined {
  const sentences = detail.split(". ").map((s) => s.trim());
  const last = sentences[sentences.length - 1];
  if (!last || !last.includes(" · ")) return undefined;

  return last
    .replace(/\.$/, "")
    .split(" · ")
    .map((token) => token.trim())
    .filter(Boolean);
}
