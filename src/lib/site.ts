/**
 * Single source of truth for links, contact details, and the placeholders the
 * owner still needs to fill (see build brief §11). Grep for "PLACEHOLDER" to
 * find everything that must be replaced before launch.
 */

// TODO(owner): replace with the real production domain (used in metadata + JSON-LD).
export const SITE_URL = "https://aribaanjum.com";

export const EMAIL = "ariba.anjum.se@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

// TODO(owner): real Cal.com / Calendly link, or remove the "Book a call" button.
export const BOOKING_URL = "PLACEHOLDER_BOOKING_URL";
export const bookingIsConfigured = BOOKING_URL !== "PLACEHOLDER_BOOKING_URL";

export const LINKEDIN_URL = "https://www.linkedin.com/in/aribaa/";
export const GITHUB_URL = "https://github.com/aribabuilds";

// TODO(owner): drop the file at /public/ariba-anjum-cv.pdf
export const CV_PATH = "/ariba-anjum-cv.pdf";

// TODO(owner): drop a 1200×630 image at /public/og.png
export const OG_IMAGE = "/og.png";

export const REPOS = {
  briefpilot: "https://github.com/aribabuilds/Briefpilot",
  quantum: "https://github.com/aribabuilds/Quantum-Playground",
} as const;

export const QUANTUM_LIVE = "https://aribabuilds.github.io/Quantum-Playground/";

export const AUTHOR_NAME = "Ariba Anjum";

/**
 * Whether the site is actually hosted in the EU. The footer's "hosted in the
 * EU" line must only appear when this is true (build brief §5). Set to false
 * if you deploy outside the EU.
 */
export const HOSTED_IN_EU = true;
