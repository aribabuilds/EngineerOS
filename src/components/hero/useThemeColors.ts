"use client";

import { useEffect, useState } from "react";

export interface ThemeColors {
  primary: string;
  periwinkle: string;
  bg: string;
}

function readColors(): ThemeColors {
  if (typeof window === "undefined") {
    return { primary: "#a8431f", periwinkle: "#8a611e", bg: "#fbf8f4" };
  }
  const cs = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => {
    const v = cs.getPropertyValue(name).trim();
    return v || fallback;
  };
  return {
    primary: get("--primary", "#a8431f"),
    periwinkle: get("--periwinkle", "#8a611e"),
    bg: get("--bg", "#fbf8f4"),
  };
}

/**
 * Reads the theme colour tokens from CSS variables and re-reads them whenever
 * the theme flips (data-theme mutates on <html>), so the 3D scene recolours
 * to match light/dark without a reload.
 */
export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(readColors);

  useEffect(() => {
    setColors(readColors());
    const observer = new MutationObserver(() => setColors(readColors()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
