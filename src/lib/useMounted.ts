"use client";

import { useEffect, useState } from "react";

/**
 * False on the server and on the client's first render (so SSR markup
 * matches, no hydration mismatch), true after mount. Lets a component ship a
 * fully-visible/static no-JS default and only switch to a JS-gated state
 * (e.g. hidden-until-scrolled-into-view) once React has actually taken over.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
