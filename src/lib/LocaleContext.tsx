"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n";

const LOCALE_STORAGE_KEY = "locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  setLocale: () => {},
});

/** Persist a locale choice; silently no-op if storage is unavailable —
 * same try/catch-guarded convention as lib/theme.ts's persistTheme. */
function persistLocale(locale: Locale): void {
  try {
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* in-memory only for this session */
  }
}

function readStoredLocale(): Locale | null {
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    return stored === "en" || stored === "de" ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Site-wide locale state for the EN/DE toggle (round 16). Defaults to "en"
 * on the server and on first client render — no hydration mismatch — then
 * syncs to a stored preference right after mount, same pattern as the
 * theme boot: no-JS and the initial paint are always English.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = readStoredLocale();
    if (stored) setLocaleState(stored);
  }, []);

  function setLocale(next: Locale) {
    setLocaleState(next);
    persistLocale(next);
  }

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext);
}
