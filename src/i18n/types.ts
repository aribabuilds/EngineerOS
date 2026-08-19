/**
 * The shape of a full locale dictionary. `en` implements this completely;
 * `de` is a partial stub for now (see de.ts) and is deep-merged over `en`
 * at read time, so untranslated keys fall back to English.
 */
export interface Dictionary {
  meta: {
    title: string;
    description: string;
    workTitle: string;
    workDescription: string;
    aboutTitle: string;
    aboutDescription: string;
  };
  nav: {
    work: string;
    path: string;
    decisions: string;
    contact: string;
    cv: string;
    wordmarkFirst: string;
    wordmarkAccent: string;
    skipToContent: string;
    themeToLight: string;
    themeToDark: string;
  };
  hero: {
    eyebrowName: string;
    eyebrowRole: string;
    h1: string;
    /** Sub-line as segments; `strong` gives weight (not color) to concrete
     * nouns. TODO(owner): this copy is a stand-in, swap for the final H7
     * string before launch (brief §9). */
    subline: { text: string; strong?: boolean }[];
    pill: string;
    ctaPrimaryLabel: string;
    ctaSecondaryLabel: string;
    /** Always-revealed quick facts (no interaction). The availability value
     * is a stand-in; TODO(owner) confirm exact wording (brief §9). */
    slabs: { label: string; value: string }[];
    scrollCue: string;
    languageToggleLabel: string;
    /** Still read by the retained-but-unused WebGL hero files (HeroCanvas.tsx
     * etc.); kept so those files keep typechecking even though nothing
     * imports them from Hero.tsx anymore. */
    canvasCaption: string;
    canvasBeats: string[];
  };
  shipped: {
    eyebrow: string;
    heading: string;
    supportingLine: string;
    /** Short italic closing line after the third stop. */
    closingLine: string;
    items: {
      title: string;
      subtitle: string;
      problem: string;
      decision: string;
      /** Each inner array is one flow's chip labels, joined with arrows in the UI.
       * Omitted (not just empty) on items with no literal pipeline to show. */
      microFlows?: string[][];
      outcome: string;
      /** Omitted (not just empty) when there is no honest adoption claim for this item. */
      adoption?: string;
      /** Quiet closing line on the card, e.g. "In production". */
      statusLine: string;
      /** "roots" = stem roots down (adopted/holding). "fork" = stem forks
       * upward (promotion/growth), used only where there is no Adoption row. */
      growthForm: "roots" | "fork";
    }[];
  };
  featured: {
    heading: string;
    readDecisions: string;
    repo: string;
    openLiveDemo: string;
    /** Label for the BriefPilot demo-video trigger. */
    watchDemo: string;
    cards: {
      briefpilot: {
        status: string;
        /** Short line under the title, e.g. "Live · in the light". */
        marker: string;
        title: string;
        summary: string;
        detail: string;
        /** Explicit chip list; kept out of the prose so it isn't duplicated
         * between the paragraph and the chip row underneath. */
        stack: string[];
      };
      quantum: {
        status: string;
        marker: string;
        title: string;
        summary: string;
        detail: string;
        stack: string[];
      };
      multiverse: {
        status: string;
        marker: string;
        title: string;
        summary: string;
        detail: string;
        stack: string[];
      };
    };
  };
  ai: {
    heading: string;
    intro: string;
    columns: { label: string; body: string }[];
  };
  decisions: {
    heading: string;
    seeRest: string;
    labels: { chose: string; rejected: string; cost: string; why: string };
    items: {
      header: string;
      title: string;
      chose: string;
      rejected: string;
      cost: string;
      why: string;
    }[];
  };
  path: {
    heading: string;
    rows: { year: string; role: string; note: string }[];
    closing: string;
  };
  /** The staircase section (round 11), fully separate from `path` above —
   * the About page reads `path` directly, so that key stays untouched. */
  myPath: {
    eyebrow: string;
    hook: string;
    intro: string;
    /** Detail-box label for steps 1-4. */
    labelDefault: string;
    /** Detail-box label for the final step. */
    labelFinal: string;
    steps: {
      role: string;
      year: string;
      side: "left" | "right";
      detail: string;
    }[];
    /** Renders italic, the standard pull-quote treatment. */
    closing: string;
    /** Renders upright (not italic) in the sky-blue accent, as the punchline. */
    closingPunchline: string;
  };
  /** The site's closing line (round 12), replacing the standalone Contact
   * section — the nav rail already carries the GitHub/LinkedIn/email icons.
   * The email itself renders from the site-wide EMAIL constant, not from
   * this string, so `line` should read naturally leading into an email
   * address appended right after it. */
  outro: {
    line: string;
  };
  contact: {
    heading: string;
    lede: string;
    emailMe: string;
    bookACall: string;
    linkedin: string;
    github: string;
    downloadCv: string;
  };
  footer: {
    copyright: string;
    built: string;
  };
  common: {
    ownerTodo: string;
    backToHome: string;
  };
  caseStudy: {
    status: string;
    title: string;
    oneLiner: string;
    dateRange: string;
    roleTag: string;
    stack: string[];
    repoLabel: string;
    sections: {
      problem: string;
      constraints: string;
      architecture: string;
      decisions: string;
      hardPart: string;
      testing: string;
      roadmap: string;
      roleAI: string;
    };
    problemBody: string;
    constraints: string[];
    testingItems: string[];
    testingNote: string;
    roadmapItems: { item: string; why: string }[];
    hardPartBody: string[];
    roleAIBody: string[];
    /** Real, git-derived last-updated date and computed reading time. */
    lastUpdatedLabel: string;
    readingTimeSuffix: string;
    ciStatusLabel: string;
    walkthrough: {
      caption: string;
      steps: { key: string; label: string }[];
      playLabel: string;
      pauseLabel: string;
      backLabel: string;
      nextLabel: string;
      outcomeLabel: string;
      passLabel: string;
      failLabel: string;
      retakeHeading: string;
      retakeTips: string[];
      letter: {
        aktenzeichen: string;
        behorde: string;
        address: string;
        subject: string;
        bodyLines: string[];
      };
    };
    architecture: {
      stages: string[];
      ciLabel: string;
      aiAdapterLabel: string;
      aiAdapterStatusLabel: string;
      aiAdapterStatusValue: string;
    };
  };
  about: {
    title: string;
    intro: string;
    factsHeading: string;
    facts: { label: string; value: string }[];
    personHeading: string;
    philosophyHeading: string;
    pathHeading: string;
  };
  achievements: {
    heading: string;
    placeholderNote: string;
  };
}

/** A locale may fill in as much or as little as it wants; missing keys fall back. */
export type PartialDictionary = DeepPartial<Dictionary>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
