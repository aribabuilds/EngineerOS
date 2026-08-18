import type { Dictionary } from "./types";

/**
 * English strings. This is the shipping locale.
 * All user-facing copy lives here behind keys so a `de` namespace can be
 * added later without touching components.
 */
export const en: Dictionary = {
  meta: {
    title: "Ariba Anjum · Junior AI / software engineer",
    description:
      "I ship AI and automation systems that teams actually adopt. Junior AI / software engineer relocating to Germany, open to Werkstudent and junior roles.",
    workTitle: "BriefPilot · Decisions log · Ariba Anjum",
    workDescription:
      "BriefPilot: reading German official letters aloud, local-first. The decisions behind an in-development OCR pipeline.",
    aboutTitle: "About · Ariba Anjum",
    aboutDescription:
      "The path from writing specifications to building the systems those specifications described.",
  },

  nav: {
    work: "Work",
    path: "Path",
    decisions: "Decisions",
    contact: "Contact",
    cv: "CV",
    wordmarkFirst: "ARIBA",
    wordmarkAccent: "ANJUM",
    skipToContent: "Skip to content",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
  },

  // Forest-scene hero (round 5), from ariba-hero-final.html. Locked copy used
  // as written, with two project-standard adjustments: the sub-line's em dash
  // is converted to a comma (no-em-dash rule), and the copy marked below as a
  // stand-in is flagged TODO(owner) per brief §9.
  hero: {
    eyebrowName: "Ariba Anjum",
    eyebrowRole: "AI and Automation Engineer",
    h1: "I ship AI and automation that teams actually adopt",
    // TODO(owner): stand-in sub-line. Swap for the final H7 string before
    // launch (brief §9: "do not ship this wording as final").
    subline: [
      {
        text: "Software engineer in AI & automation with a project-management edge, I scope the problem, talk to the stakeholders, and drive it to adoption. At ",
      },
      { text: "vountain", strong: true },
      {
        text: " I proposed and led an LLM document pipeline handling 100+ onboarding docs a week; automations I built at Grayhat and Webmedia were adopted company-wide.",
      },
    ],
    pill: "Open to Werkstudent and AI/automation roles · Remote → On-site",
    ctaPrimaryLabel: "Email me",
    ctaSecondaryLabel: "Book a 20-min call",
    slabs: [
      // TODO(owner): confirm exact availability wording (brief §9).
      { label: "Availability", value: "Open now · interviewing" },
      { label: "Location", value: "Germany" },
      {
        label: "Languages",
        value: "English (fluent) · German (conversational) · Arabic (fluent) · Turkish (conversational)",
      },
    ],
    // Rendered as "Inside this" + a separately-bobbing arrow in the hero.
    scrollCue: "Inside this",
    languageToggleLabel: "Language",

    // Still read by the retained-but-unused WebGL hero files.
    canvasCaption: "raw inputs → structured data → validated system → trusted outcome",
    canvasBeats: ["raw inputs", "structured data", "validated system", "trusted outcome"],
  },

  // Forest-path redesign (round 6): the section directly after the Hero,
  // continuing its forest world. Locked copy from the owner's brief, used
  // verbatim with one standing adjustment: em dashes converted to commas
  // (no-em-dash rule) with zero meaning change. See growthFrame components
  // for how growthForm ("roots" | "fork") and microFlows are rendered.
  shipped: {
    eyebrow: "The path so far",
    heading: "What I've shipped",
    supportingLine:
      "Three times something manual or broken needed fixing. Each time I scoped it, built it, and it stayed.",
    closingLine: "and it all stayed rooted.",
    items: [
      {
        title: "GenAI document pipeline",
        subtitle: "vountain · fintech, Hanover",
        problem: "Asset onboarding ran on manual data entry.",
        decision:
          "Proposed and now lead a GenAI pipeline: automated extraction, validation, and a human check before anything is trusted.",
        microFlows: [["doc", "extract", "validate", "human check", "adopted"]],
        outcome: "Automated extraction across 100+ documents a week.",
        adoption: "Running in production, replacing manual entry.",
        statusLine: "In production",
        growthForm: "roots",
      },
      {
        title: "Automations that stuck",
        subtitle: "Grayhat & Webmedia · internal + client ops",
        problem: "Untracked async standups, and client Slack requests turned into tickets by hand.",
        decision:
          "n8n + LLM automations: a standup summariser reporting to leadership, and a Slack-to-ClickUp intake with deadlines.",
        microFlows: [
          ["standup", "LLM summary", "leadership"],
          ["Slack req", "LLM", "ClickUp task"],
        ],
        outcome: "Daily progress visibility without meetings; client messages become tracked tasks automatically.",
        adoption: "Company-wide at two teams.",
        statusLine: "Company-wide",
        growthForm: "roots",
      },
      {
        title: "Learning platform, then the PR queue",
        subtitle: "Dubai school · six-month freelance",
        problem: "A Dubai school needed a learning platform built.",
        decision: "Delivered it over a six-month freelance engagement.",
        // No micro-flow for this one; the brief specifies it only for stops 1 and 2.
        outcome: "Promoted mid-project, from building it to reviewing the junior developers' pull requests.",
        // No adoption claim exists for this one; the label is omitted, not invented.
        statusLine: "Promoted mid-project",
        growthForm: "fork",
      },
    ],
  },

  featured: {
    heading: "Featured work",
    readDecisions: "Read the decisions",
    repo: "Repo",
    openLiveDemo: "Open the live demo",
    watchDemo: "Watch demo",
    cards: {
      // BriefPilot has shipped (round 8): status flips to Live. Description
      // is left exactly as-is, pending Ariba's updated copy (owner TODO,
      // not to be edited without her explicit new text — see the video
      // pipeline's OWNER note in FeaturedWork.tsx for the same flag on the
      // primary live link).
      briefpilot: {
        status: "Live",
        marker: "Live · in the light",
        title: "BriefPilot",
        summary:
          "Photograph a German official letter and it reads the text back to you. That is the first step toward telling you, in plain language, what it means and what to do.",
        detail:
          "The OCR pipeline and a photo quality-gate (it asks you to retake an unreadable scan instead of showing garbled text) are shipped. Classification and the plain-English explanation come next. Next.js · FastAPI · Postgres · Docker · CI.",
      },
      quantum: {
        status: "live",
        marker: "Live · in the light",
        title: "Quantum Playground",
        // Round 2: lead with why the visualization exists, not what it looks like.
        summary:
          "Quantum states are hard to reason about as vectors of complex numbers. This is a visual, interactive representation that makes gate effects and entanglement observable: build qubits, apply gates, and watch a Bell pair and a teleportation protocol play out in real time.",
        detail:
          "The state engine is fully typed and separated from the rendering layer. Every push builds and deploys automatically to the live site.",
      },
      // Multiverse Machine (round 10): summary/detail/stack are drafted by
      // Claude from Ariba's SRD, given to Claude verbatim to add — pending
      // her approval, not final copy. Em dash converted to a comma, same
      // no-meaning-change treatment as everywhere else on this site.
      multiverse: {
        status: "Live",
        marker: "Live · in the light",
        title: "Multiverse Machine",
        summary:
          "Type a sentence and watch an AI write it word by word, with every word it almost chose branching off as a faded parallel timeline you can click into and follow instead.",
        detail: "The whole model runs in your browser: no sign-in, no API key, nothing you type ever leaves your device.",
        stack: ["React", "TypeScript", "Transformers.js", "WebGPU", "D3.js"],
      },
    },
  },

  ai: {
    heading: "How I work with AI",
    intro:
      "It's my job title, so I'll be specific about it. Generating code is the easy part now; knowing what not to hand over is the job.",
    columns: [
      {
        label: "I delegate",
        body: "Boilerplate, first-draft tests, and mechanical refactors: work where I already know the answer and just need it typed out.",
      },
      {
        label: "I don't delegate",
        body: "Architecture, and the boundaries between parts. In BriefPilot the AI provider sits behind one interface I designed, so a model can be swapped without touching anything else.",
      },
      {
        label: "I review everything",
        body: "I read every diff, and mypy --strict plus CI catch what I miss. When the model wasn't sure what a document was, I made it return nothing rather than a confident guess.",
      },
    ],
  },

  // The decision log. The homepage features items[0]; the case study shows all
  // three. Long dashes removed throughout.
  decisions: {
    heading: "One decision, from the log",
    seeRest: "See the rest of the decision log",
    labels: { chose: "Chose", rejected: "Rejected", cost: "Cost", why: "Why" },
    items: [
      {
        header: "Decision · BriefPilot · ADR-0003",
        title: "Provider-Agnostic LLM Architecture Under a Zero-Budget Constraint",
        chose:
          "Designed a provider-agnostic AIService interface (dependency-inversion pattern) with three interchangeable adapters (Gemini, OpenAI, Azure OpenAI), and set the free-tier provider (Gemini Flash) as the hard default. No paid API is ever called unless a developer explicitly opts in.",
        rejected:
          "Defaulting to the paid OpenAI adapter with the free tier as opt-in (the original scaffolding); renaming the interface to llm_client to match the spec literally.",
        cost:
          'Every future AI provider (Anthropic, a self-hosted model) must now implement three abstract methods (extract_document, classify_document, summarize). That is a stricter integration bar per provider, accepted in exchange for one single contract that defines what an AI provider means across the whole app.',
        why:
          'A missing API key should never break the product. It degrades one feature (classification returns null, never a guess), not the whole pipeline. Cloning the repo and running it locally should carry zero risk of an unexpected bill. This is cost-aware architecture: the safe default has to be the free one, engineered so the failure mode of "no key configured" is invisible to the user rather than a crash.',
      },
      {
        header: "Decision · BriefPilot · OCR Quality Gate",
        title: "Terminal-State Modeling Over Boolean Flags",
        chose:
          "Modeled OCR quality as a third distinct terminal job state (low_quality), sitting alongside done and failed, each with its own frontend render path (TypeScript discriminated union). When quality fails, the app withholds the raw OCR text entirely instead of displaying it behind a confidence-score disclaimer.",
        rejected:
          'A quality_ok: boolean flag bolted onto the existing done result; a "show anyway" toggle that surfaces low-confidence text with a warning label.',
        cost:
          "Three terminal states to model instead of two, and more frontend branches to maintain. Each one is exhaustive by construction, since a discriminated union cannot be silently half-handled the way a boolean flag can.",
        why:
          'failed means the pipeline broke (an engineering problem); low_quality means the pipeline worked exactly as designed and still produced output too unreliable to act on (a user problem, retake the photo). Conflating the two blurs two different remediations into one ambiguous signal. Showing "confidence: 20%, here\'s what we think it says" trains users to trust unverified output. That directly undermines the product\'s core trust claim that everything shown is provably grounded in the source document.',
      },
      {
        header: "Decision · BriefPilot · Extraction Provenance",
        title: "Confidence Capping Over Zeroing or Silent Pass",
        chose:
          "Built a source-span linking layer that matches every LLM-extracted field back to its literal word-level bounding box in the original OCR output. When a value cannot be matched to any source span, its confidence score is capped at a fixed ceiling. It is never raised, never zeroed, and never left untouched.",
        rejected:
          "Zeroing confidence on an unlinkable value (overclaims it's wrong, when it may simply be paraphrased); leaving the model's original confidence untouched (lets an unverified 0.9-confidence claim look exactly as trustworthy as a verified, bounding-box-linked one).",
        cost:
          'Introduces a third confidence state to design and test against: "wrong," "right but unproven," and "verified." It also needs a placeholder threshold value that requires real-data tuning once production fixtures exist, rather than a clean binary pass or fail.',
        why:
          'This extends the project\'s existing deterministic-validator rule, that failures downgrade confidence and get flagged instead of silently passing, to a new failure mode: "we could not verify this." In a product whose single differentiator is click-to-highlight provenance, letting an ungrounded claim wear the same confidence badge as a verified one would quietly break the entire trust story the UI is built to tell.',
      },
    ],
  },

  path: {
    heading: "The path",
    rows: [
      { year: "2024", role: "Freelance developer", note: "Shipping real things for real clients" },
      { year: "2025", role: "Business analyst", note: "Learning to scope a system before building it" },
      { year: "2025", role: "Project coordinator", note: "Shipping with a team, on deadlines" },
      { year: "2026", role: "PM & automation", note: "Building the tools I used to spec" },
      { year: "2026", role: "Data & GenAI engineer, vountain", note: "Where I am now" },
    ],
    closing:
      "Every step added the next skill. I went from writing the specifications to building the systems those specifications described.",
  },

  // The staircase section (round 11). Locked copy, used verbatim — no em
  // dashes were present in the brief, so nothing needed converting this
  // round. Step 4's role is intentionally a short, visibly-flagged
  // placeholder: OWNER TODO, Ariba to supply the exact title as it appears
  // on her CV/LinkedIn. Do not invent or paraphrase it — the on-site title
  // must match her documented history exactly.
  myPath: {
    eyebrow: "My path",
    hook: "Every step lifted the next",
    intro:
      "I did not take the shortest road into engineering. I took the one that kept handing me something to carry forward. Here is what each step gave me.",
    labelDefault: "What I took from here",
    labelFinal: "Where it all arrives",
    steps: [
      {
        role: "Freelance developer",
        year: "2022–2025",
        side: "left",
        detail:
          "Where I learned to ship. I built web and mobile apps for real clients around the world, in Java, JavaScript, Python and Flutter. Real clients mean real deadlines, so I learned early that working software is the only thing that counts.",
      },
      {
        role: "Business analyst",
        year: "2025",
        side: "right",
        detail:
          "Where I learned to see the product before the code. I stopped jumping straight to building and started with one question: why does this need to exist, and what problem does it solve. Then market analysis, competitors, the angle that stands out, and a user story behind every feature. Build with intent, never by reflex.",
      },
      {
        role: "Project coordinator",
        year: "2025",
        side: "left",
        detail:
          "Where I learned how things actually get delivered. Over seven months: keeping many moving pieces shipping on deadline without letting anything slip through the gaps, stakeholders informed, the team aligned, the project moving when it would rather stall. The discipline of delivery.",
      },
      {
        // OWNER TODO: exact title as it appears on Ariba's CV/LinkedIn. Not
        // invented or paraphrased on purpose.
        role: "TODO: exact CV/LinkedIn title",
        year: "2026",
        side: "right",
        detail:
          "Curiosity pulled me up a level, to see a whole project from the very top. I could see how every role's quality rolls up into whether the finished thing is excellent or just fine. And it let me use the part of me that works best with people: I read a gap not as a problem but as a place where value is waiting to be added, and I get people delivering in a way they genuinely enjoy.",
      },
      {
        role: "GenAI engineer · vountain",
        year: "2026",
        side: "left",
        detail:
          "And then it came together. My genuine passion has always been engineering, and here I do it with everything the journey handed me. The real work is quieter than the code: the product thinking, the delivery discipline, and the communication that make what I build actually get adopted and trusted.",
      },
    ],
    closing:
      "None of it was a detour. Every step handed me something I still carry, and it all shows up in how I build.",
    closingPunchline: "I went from writing the specifications to building the systems they describe.",
  },

  contact: {
    heading: "Contact",
    lede:
      "I'm looking for a Werkstudent or junior AI / software engineering role in Germany, remote now and on-site once I relocate.",
    emailMe: "Email me",
    bookACall: "Book a call",
    linkedin: "LinkedIn",
    github: "GitHub",
    downloadCv: "Download CV",
  },

  footer: {
    copyright: "© 2026 Ariba Anjum",
    built: "Built by hand · hosted in the EU",
  },

  common: {
    ownerTodo: "TODO: owner to provide",
    backToHome: "Back to home",
  },

  // Case study scaffold (brief §10). Structural copy + the verbatim facts that
  // exist today; everything not yet known is a visible owner-TODO. Nothing here
  // invents metrics, and no accuracy numbers are printed (none exist yet).
  caseStudy: {
    status: "in development",
    title: "BriefPilot",
    oneLiner:
      "Photograph a German official letter and it reads the text back to you. That is the first step toward telling you, in plain language, what it means and what to do.",
    dateRange: "since 07.2026",
    roleTag: "Solo",
    stack: ["Next.js", "FastAPI", "Postgres", "Docker", "CI"],
    repoLabel: "Repo",
    sections: {
      problem: "The problem",
      constraints: "Constraints",
      architecture: "Architecture",
      decisions: "Three decisions",
      hardPart: "The hard part",
      testing: "Testing and guarantees",
      roadmap: "Roadmap",
      roleAI: "My role, and where AI assisted",
    },
    problemBody:
      "German official letters are stressful and easy to miss deadlines on.",
    constraints: [
      "Solo",
      "Zero-budget",
      "Privacy of personal mail",
      "No GPU",
    ],
    // Testing and guarantees: only what's real. No extraction, validation, or
    // human-review claim appears here or anywhere else on the page, since
    // none of those are built yet.
    testingItems: [
      "CI runs lint, type-check, test, and build on every push.",
      "mypy --strict across the backend.",
      "Typed contracts between frontend and backend (TypeScript discriminated unions on job states).",
      "The quality gate is the first trust guarantee: unreadable input is rejected with retake guidance rather than rendered as unreliable text.",
    ],
    testingNote: "No accuracy numbers exist yet. None are claimed here.",

    // Roadmap: planned engineering, not missing features. Each item is
    // already scoped by a real, shipped contract (the adapter interface, the
    // bounding boxes), which is why it's sequenced next rather than someday.
    roadmapItems: [
      {
        item: "LLM structured extraction behind the existing adapter.",
        why: "The adapter contract already defines it.",
      },
      {
        item: "Deterministic validators on extracted fields.",
        why: "Hallucinated deadlines are the worst failure mode in this product.",
      },
      {
        item: "Click-to-verify source highlighting.",
        why: "The word-level bounding boxes already shipped exist to power it.",
      },
    ],

    lastUpdatedLabel: "Last updated",
    readingTimeSuffix: "min read",
    ciStatusLabel: "CI",

    // Owner-drafted, pending verification. See the OWNER VERIFY comment
    // rendered around both blocks in work/briefpilot/page.tsx.
    hardPartBody: [
      "The hard part so far has been coordinate integrity. Tesseract returns word positions in the coordinate space of the preprocessed image. The browser shows the original photo, scaled to whatever viewport the user has. Every bounding box has to survive that round trip: preprocessing transforms, OCR, JSON serialization, and CSS scaling, and still land on the right word. Getting this wrong by a few pixels quietly breaks the product's core promise, because a highlight pointing at the wrong word is worse than no highlight.",
      'The second hard part was the quality gate threshold. Too strict, and usable phone photos get rejected. Too loose, and garbled text reaches the user with a straight face. Tuning it meant deliberately taking bad photos and deciding, case by case, where "readable" ends.',
    ],
    roleAIBody: [
      "I designed the architecture and made every decision in the ADR log. Claude Code works as a pair programmer under a rule I enforce: it posts a plan and waits for my approval before writing code. No plan, no code.",
      "I review every diff before it merges. Each sprint, I implement at least one component fully by hand, because reading generated code is not the same as being able to write it. mypy --strict and CI catch what my review misses. Where the model was uncertain about a value, I made the system return nothing rather than a confident guess. That decision was mine, not the model's.",
    ],

    // The interactive walkthrough replacing the recording slot until a real
    // screen recording exists. The fake letter content below is invented
    // placeholder text, styled to look German, never a real document.
    walkthrough: {
      caption:
        "Interactive walkthrough of the shipped pipeline. A real screen recording replaces this at the next milestone.",
      steps: [
        { key: "upload", label: "Upload" },
        { key: "preprocess", label: "Preprocessing" },
        { key: "ocr", label: "OCR" },
        { key: "gate", label: "Quality gate" },
      ],
      playLabel: "Play",
      pauseLabel: "Pause",
      backLabel: "Back",
      nextLabel: "Next",
      outcomeLabel: "Outcome",
      passLabel: "Pass",
      failLabel: "Fail",
      retakeHeading: "Retake the photo",
      retakeTips: [
        "Flatten the letter on a table before shooting.",
        "Use natural light and avoid glare on the paper.",
        "Fill the frame with the page, held steady.",
      ],
      letter: {
        aktenzeichen: "Aktenzeichen: XX/000000",
        behorde: "Musterbehörde",
        address: "Musterstraße 1, 00000 Musterstadt",
        subject: "Betreff: Musterschreiben (Platzhaltertext)",
        bodyLines: [
          "Sehr geehrte Frau Musterfrau,",
          "dies ist ein Platzhaltertext zu Demonstrationszwecken.",
          "Bitte antworten Sie bis zum XX.XX.XXXX.",
        ],
      },
    },

    // Only real, current components. No LLM extraction stage, no Caddy, no
    // Sentry, no Hetzner: none of those exist in the pipeline yet.
    architecture: {
      stages: [
        "Browser (Next.js + TypeScript)",
        "FastAPI backend (Pydantic, mypy --strict)",
        "Preprocessing (OpenCV: deskew, contrast, downscale)",
        "Tesseract OCR (word-level bounding boxes)",
        "Quality gate (pass / low_quality terminal states)",
        "PostgreSQL (Docker)",
      ],
      ciLabel: "GitHub Actions CI, on every push",
      aiAdapterLabel: "AI adapter layer (Gemini free-tier default, provider-agnostic interface)",
      aiAdapterStatusLabel: "status",
      aiAdapterStatusValue: "not wired in",
    },
  },

  // About page scaffold (brief §4). Reuses the verbatim path + AI philosophy
  // from the homepage; the personal narrative is a visible owner-TODO.
  about: {
    title: "About",
    intro:
      "I went from writing the specifications to building the systems those specifications described.",
    factsHeading: "Facts",
    facts: [
      { label: "availability", value: "20 h / week now" },
      { label: "location", value: "Germany · on-site ok" },
      { label: "languages", value: "English C1 · German B1" },
      { label: "looking for", value: "Werkstudent / junior AI · software eng" },
      { label: "status", value: "relocating to Germany" },
    ],
    personHeading: "The person",
    philosophyHeading: "How I work with AI",
    pathHeading: "The path",
  },

  // New section (round 3), linked from the hero's index block. Placeholder
  // by owner's explicit request: qualifications and certifications go here
  // later. Not pre-filled, even though real ones exist on file.
  achievements: {
    heading: "Achievements",
    placeholderNote: "Qualifications and certifications. Owner to add.",
  },
};
