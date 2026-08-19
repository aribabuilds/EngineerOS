/**
 * Single source of truth for links, contact details, and the placeholders the
 * owner still needs to fill (see build brief §11). Grep for "PLACEHOLDER" to
 * find everything that must be replaced before launch.
 */

// TODO(owner): replace with the real production domain (used in metadata + JSON-LD).
export const SITE_URL = "https://aribaanjum.com";

export const EMAIL = "ariba.anjum.se@gmail.com";
export const MAILTO = `mailto:${EMAIL}`;

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

// Round 10: no repo link given for this one, so only the live demo renders —
// don't fabricate a github.com/aribabuilds/Multiverse-Machine URL.
export const MULTIVERSE_LIVE = "https://aribabuilds.github.io/Multiverse-Machine/";

// TODO(owner): BriefPilot has shipped (round 8); replace with the real live
// URL. Left unconfigured on purpose: no link renders until this is set, same
// convention as BOOKING_URL above. Do not fabricate a URL.
export const BRIEFPILOT_LIVE_URL = "PLACEHOLDER_BRIEFPILOT_LIVE_URL";
export const briefpilotLiveIsConfigured = BRIEFPILOT_LIVE_URL !== "PLACEHOLDER_BRIEFPILOT_LIVE_URL";

// Compressed demo video + poster (round 8), generated from the raw source at
// assets/video/briefpilot-demo-source.webm via the ffmpeg pipeline noted in
// FeaturedWork.tsx. Never referenced until the "Watch demo" modal is opened.
export const BRIEFPILOT_DEMO_VIDEO = "/video/briefpilot-demo.mp4";
export const BRIEFPILOT_DEMO_VIDEO_WEBM = "/video/briefpilot-demo.webm";
export const BRIEFPILOT_DEMO_POSTER = "/video/briefpilot-demo-poster.jpg";

export const AUTHOR_NAME = "Ariba Anjum";

/**
 * Whether the site is actually hosted in the EU. The footer's "hosted in the
 * EU" line must only appear when this is true (build brief §5). Set to false
 * if you deploy outside the EU.
 */
export const HOSTED_IN_EU = true;
