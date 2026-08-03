import { en } from "./en";
import { de } from "./de";
import type { Dictionary, PartialDictionary } from "./types";

export type Locale = "en" | "de";

/** The default (and, for now, only fully-shipped) locale. */
export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "de"];

const partials: Record<Locale, PartialDictionary> = { en, de };

/** Deep-merge a partial locale over the complete English base. */
function merge<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base;
  if (typeof base !== "object" || base === null || Array.isArray(base)) {
    return (override as T) ?? base;
  }
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override as Record<string, unknown>)) {
    out[key] = merge((base as Record<string, unknown>)[key], (override as Record<string, unknown>)[key]);
  }
  return out as T;
}

/**
 * Resolve a full dictionary for a locale. Missing keys fall back to English,
 * so a partially-translated `de` never renders a blank string.
 */
export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  if (locale === "en") return en;
  return merge<Dictionary>(en, partials[locale]);
}

export type { Dictionary } from "./types";
