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
    eyebrow: string;
    h1: string;
    lede: string;
    tags: { label: string; value: string }[];
    emailMe: string;
    bookACall: string;
    canvasCaption: string;
    canvasBeats: string[];
  };
  shipped: {
    heading: string;
    items: {
      problem: string;
      decision: string;
      outcome: string;
      /** Omitted (not just empty) when there is no honest adoption claim for this item. */
      adoption?: string;
    }[];
  };
  featured: {
    heading: string;
    readDecisions: string;
    repo: string;
    openLiveDemo: string;
    cards: {
      briefpilot: { status: string; title: string; summary: string; detail: string };
      quantum: { status: string; title: string; summary: string; detail: string };
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
}

/** A locale may fill in as much or as little as it wants; missing keys fall back. */
export type PartialDictionary = DeepPartial<Dictionary>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
