import type { PartialDictionary } from "./types";

/**
 * German namespace: STUB.
 *
 * Deliberately empty for now. The hero's EN/DE toggle is visual-only this
 * build (German copy is a fast-follow, per the round-5 brief), so nothing
 * reads this at runtime yet. When translations are ready, fill keys here;
 * anything omitted falls back to English via the deep-merge in index.ts.
 *
 * Example, once translated:
 *   hero: { h1: "Ich baue KI- und Automatisierungssysteme, …" }
 */
export const de: PartialDictionary = {
  // TODO: German translations to be added later.
  // TODO: shipped (round 6 forest-path redesign): eyebrow, supportingLine,
  // closingLine, and per-item title/subtitle/problem/decision/outcome/
  // adoption/statusLine all need German copy. Not read at runtime yet.
  // TODO: featured (round 8 valley redesign): watchDemo, and each card's new
  // marker line, need German copy. Not read at runtime yet.
  // TODO: featured.cards.multiverse (round 10): new card, needs German copy
  // once Ariba approves the English draft. Not read at runtime yet.
};
