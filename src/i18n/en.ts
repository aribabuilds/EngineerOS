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
    contact: "Contact",
    cv: "CV",
    wordmarkFirst: "ARIBA",
    wordmarkAccent: "ANJUM",
    skipToContent: "Skip to content",
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
  },

  hero: {
    eyebrow: "Junior AI / software engineer · relocating to Germany",
    h1: "I ship AI and automation systems that teams actually adopt.",
    lede:
      "I scope the problem, build it, and talk to the people who'll use it while I do. Right now I'm building and leading a GenAI document pipeline at a German fintech.",
    tags: [
      { label: "availability", value: "20 h / week now" },
      { label: "location", value: "Germany · on-site ok" },
      { label: "languages", value: "English C1 · German B1" },
    ],
    emailMe: "Email me",
    bookACall: "Book a call",
    canvasCaption: "variables → functions → a system → adopted",
    canvasBeats: ["variables", "functions", "a system", "adopted"],
  },

  shipped: {
    heading: "What I've shipped",
    items: [
      "A GenAI document pipeline I proposed and now lead. It takes asset onboarding at vountain (a fintech in Hanover) from manual data entry to automated extraction across 100+ documents a week, with validation and a human check before anything is trusted.",
      "Automation I built that got adopted company-wide at two teams: an n8n + LLM standup summariser that reported progress to leadership, and a Slack-to-ClickUp intake that turned client messages into tracked tasks with deadlines.",
      "A learning platform I delivered for a school in Dubai over six months. I was moved mid-project from building it to reviewing the junior developers' pull requests.",
    ],
  },

  featured: {
    heading: "Featured work",
    readDecisions: "Read the decisions",
    repo: "Repo",
    openLiveDemo: "Open the live demo",
    cards: {
      briefpilot: {
        status: "in development",
        title: "BriefPilot",
        summary:
          "Photograph a German official letter and it reads the text back to you. That is the first step toward telling you, in plain language, what it means and what to do.",
        detail:
          "The OCR pipeline and a photo quality-gate (it asks you to retake an unreadable scan instead of showing garbled text) are shipped. Classification and the plain-English explanation come next. Next.js · FastAPI · Postgres · Docker · CI.",
      },
      quantum: {
        status: "live",
        title: "Quantum Playground",
        summary:
          "An interactive 3D playground for quantum states: build qubits, apply gates, and watch a Bell pair and a teleportation protocol play out in real time.",
        detail:
          "A fully typed quantum-state engine under a Three.js / GLSL visual layer. Every push builds and ships itself to the live site.",
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
      evidence: "Evidence it works",
      whatsNext: "What it gets wrong · what's next",
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
    evidenceBody: "What's checked on the way in:",
    evidenceItems: [
      "CI runs on every push.",
      "mypy --strict across the codebase.",
      "Typed contracts between components.",
    ],
    evidenceNote: "No accuracy numbers exist yet. None are claimed here.",
    whatsNextBody: "Honest about what isn't built:",
    whatsNextItems: [
      "Extraction is not built yet.",
      "The plain-English explanation is not built yet.",
      "The deadline-overlay feature is not built yet.",
    ],

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
};
