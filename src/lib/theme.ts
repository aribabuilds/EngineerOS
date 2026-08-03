export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint (injected as an inline <script> in the root layout)
 * to set data-theme on <html>, preventing a flash of the wrong theme.
 * Reads a stored preference if localStorage is available, otherwise falls back
 * to the system preference. Wrapped in try/catch so a locked-down sandbox that
 * forbids localStorage/matchMedia can't break the page.
 */
export const themeBootScript = `(function(){
  try {
    var stored = null;
    try { stored = window.localStorage.getItem('${THEME_STORAGE_KEY}'); } catch (e) {}
    var prefersDark = false;
    try { prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches; } catch (e) {}
    var theme = (stored === 'light' || stored === 'dark') ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {}
})();`;

/** Persist a theme choice; silently no-op if storage is unavailable. */
export function persistTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* in-memory only - the attribute on <html> still holds for this session */
  }
}

export function readCurrentTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}
