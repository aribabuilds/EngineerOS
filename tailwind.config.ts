import type { Config } from "tailwindcss";

/**
 * Colours are driven by CSS custom properties defined in globals.css so that
 * the light/dark themes (toggled via `data-theme` on <html>) stay the single
 * source of truth. Tailwind utilities reference those variables.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        raised: "var(--raised)",
        text: "var(--text)",
        muted: "var(--muted)",
        line: "var(--line)",
        primary: "var(--primary)",
        "primary-strong": "var(--primary-strong)",
        periwinkle: "var(--periwinkle)",
        "accent-tint": "var(--accent-tint)",
        "on-primary": "var(--on-primary)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // ~1.2 modular scale, body 17px, line-height 1.6–1.65
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.8125rem", { lineHeight: "1.55" }],
        base: ["1.0625rem", { lineHeight: "1.62" }], // 17px
        lg: ["1.25rem", { lineHeight: "1.55" }],
        xl: ["1.5rem", { lineHeight: "1.4" }],
        "2xl": ["1.8rem", { lineHeight: "1.3" }],
        "3xl": ["2.15rem", { lineHeight: "1.2" }],
        "4xl": ["2.6rem", { lineHeight: "1.12" }],
        "5xl": ["3.25rem", { lineHeight: "1.05" }],
      },
      maxWidth: {
        prose: "65ch",
      },
      borderRadius: {
        card: "7px",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
