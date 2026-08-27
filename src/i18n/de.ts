import type { PartialDictionary } from "./types";

/**
 * German namespace (round 16): the homepage is now fully translated —
 * nav, hero, shipped, featured, myPath, outro — sourced from Ariba's own
 * translation pass, mapped onto the same keys `en.ts` defines (no
 * structural changes, per her explicit instruction). Anything not listed
 * below (about, case study, decisions, contact, footer, etc.) still falls
 * back to English via the deep-merge in index.ts — those pages don't have
 * a locale toggle yet, so this is intentional, not an oversight.
 *
 * Company/product names (vountain, Grayhat, Webmedia, BriefPilot, Quantum
 * Playground, Multiverse Machine) and every tech-stack chip (Next.js,
 * FastAPI, Postgres, Docker, CI, React, TypeScript, Three.js, React Three
 * Fiber, GLSL, Vite, Transformers.js, WebGPU, D3.js) are left untranslated
 * on purpose, per Ariba's instruction.
 */
export const de: PartialDictionary = {
  nav: {
    work: "Projekte",
    path: "Weg",
  },

  hero: {
    eyebrowName: "Ariba Anjum",
    eyebrowRole: "KI- und Automatisierungsingenieurin",
    h1: "Ich entwickle KI- und Automatisierungslösungen, die Teams wirklich einsetzen",
    subline: [
      {
        text: "Als Softwareentwicklerin für KI und Automatisierung mit Projektmanagement-Hintergrund grenze ich das Problem ein, spreche mit den Stakeholdern und sorge dafür, dass die Lösung tatsächlich eingesetzt wird. Bei ",
      },
      { text: "vountain", strong: true },
      {
        text: " habe ich eine LLM-Dokumentenpipeline vorgeschlagen und geleitet, die über 100 Onboarding-Dokumente pro Woche verarbeitet. Automatisierungen, die ich bei Grayhat und Webmedia gebaut habe, wurden unternehmensweit eingeführt.",
      },
    ],
    ctaPrimaryLabel: "E-Mail schreiben",
    ctaSecondaryLabel: "20-Minuten-Gespräch buchen",
    quickFacts: {
      rows: [
        {
          label: "Verfügbarkeit",
          value: "Aktuell verfügbar · im Bewerbungsprozess · vor Ort, hybrid oder remote, ich bin für alles offen",
          live: true,
        },
        { label: "Standort", value: "Deutschland" },
        {
          label: "Sprachen",
          value: "Englisch (fließend) · Deutsch (Konversationsniveau) · Arabisch (fließend) · Türkisch (Konversationsniveau)",
        },
      ],
    },
    scrollCue: "Auf dieser Seite",
    languageToggleLabel: "Sprache",
  },

  shipped: {
    eyebrow: "Gebaut und eingesetzt",
    heading: "Was Teams weiter genutzt haben",
    supportingLine:
      "Dinge, die ich gebaut habe und die ganze Teams übernommen und langfristig genutzt haben, weit über den Launch hinaus.",
    closingLine: "und alles davon ist verwurzelt geblieben.",
    items: [
      {
        title: "GenAI-Dokumentenpipeline",
        subtitle: "vountain · Fintech, Hannover",
        problem: "Das Onboarding von Assets lief über manuelle Dateneingabe.",
        decision:
          "Ich habe eine GenAI-Pipeline vorgeschlagen und leite sie: automatisierte Extraktion, Validierung und eine menschliche Prüfung, bevor etwas als gesichert gilt.",
        microFlows: [["Dokument", "extrahieren", "validieren", "menschliche Prüfung", "im Einsatz"]],
        outcome: "Automatisierte Extraktion bei über 100 Dokumenten pro Woche.",
        adoption: "Im produktiven Einsatz, ersetzt manuelle Eingabe.",
        statusLine: "Im produktiven Einsatz",
        growthForm: "roots",
      },
      {
        title: "Automatisierungen, die geblieben sind",
        subtitle: "Grayhat & Webmedia · interner Betrieb + Kundenprozesse",
        problem:
          "Asynchrone Standups ohne Nachverfolgung, und Kundenanfragen aus Slack wurden manuell in Tickets umgewandelt.",
        decision:
          "n8n- und LLM-Automatisierungen: eine Standup-Zusammenfassung für die Führungsebene und eine Slack-zu-ClickUp-Aufnahme mit Deadlines.",
        microFlows: [
          ["Standup", "LLM-Zusammenfassung", "Führungsebene"],
          ["Slack-Anfrage", "LLM", "ClickUp-Aufgabe"],
        ],
        outcome:
          "Täglicher Fortschrittsüberblick ohne Meetings; Kundennachrichten werden automatisch zu nachverfolgbaren Aufgaben.",
        adoption: "Unternehmensweit bei zwei Teams.",
        statusLine: "Unternehmensweit",
        growthForm: "roots",
      },
      {
        title: "Lernplattform, danach die Pull-Request-Warteschlange",
        subtitle: "Schule in Dubai · sechsmonatiges Freelance-Projekt",
        problem: "Eine Schule in Dubai brauchte eine Lernplattform.",
        decision: "Ich habe sie im Rahmen eines sechsmonatigen Freelance-Projekts umgesetzt.",
        outcome:
          "Mitten im Projekt befördert, vom Entwickeln zur Prüfung der Pull Requests der Junior-Entwickler.",
        statusLine: "Mitten im Projekt befördert",
        growthForm: "fork",
      },
    ],
  },

  featured: {
    eyebrow: "Arbeiten",
    heading: "Ausgewählte Projekte",
    openLiveDemo: "Live-Demo öffnen",
    watchDemo: "Demo ansehen",
    cards: {
      briefpilot: {
        marker: "Live · im Licht",
        summary:
          "Ein Foto eines deutschen Behördenbriefs genügt, und der Text wird vorgelesen. Das ist der erste Schritt dahin, in einfacher Sprache zu erklären, was der Brief bedeutet und was zu tun ist.",
        detail:
          "Die OCR-Pipeline und eine Qualitätsprüfung fürs Foto (bei einem unlesbaren Scan wird ein neues Foto angefordert, statt verstümmelten Text anzuzeigen) sind bereits umgesetzt. Als Nächstes folgen Klassifizierung und die Erklärung in einfacher Sprache.",
      },
      quantum: {
        marker: "Live · im Licht",
        summary:
          "Quantenzustände als Vektoren komplexer Zahlen zu verstehen, ist schwer. Diese visuelle, interaktive Darstellung macht Gatter-Effekte und Verschränkung sichtbar: Qubits aufbauen, Gatter anwenden und ein Bell-Paar sowie ein Teleportationsprotokoll in Echtzeit beobachten.",
        detail:
          "Die State-Engine ist vollständig typisiert und von der Rendering-Schicht getrennt. Jeder Push wird automatisch gebaut und live veröffentlicht.",
      },
      multiverse: {
        marker: "Live · im Licht",
        summary:
          "Einen Satz eingeben und zusehen, wie eine KI ihn Wort für Wort schreibt. Jedes Wort, das fast gewählt wurde, zweigt als blasse Parallel-Zeitlinie ab, die sich anklicken und weiterverfolgen lässt.",
        detail:
          "Das gesamte Modell läuft direkt im Browser: keine Anmeldung, kein API-Key, nichts von dem, was eingegeben wird, verlässt jemals das Gerät.",
      },
    },
  },

  myPath: {
    eyebrow: "Mein Weg",
    hook: "Jeder Schritt hat den nächsten getragen",
    intro:
      "Ich bin nicht den kürzesten Weg in die Softwareentwicklung gegangen. Ich bin den Weg gegangen, der mir bei jedem Schritt etwas mitgegeben hat, das ich weitertragen konnte. Hier ist, was mir jede Station gebracht hat.",
    labelDefault: "Was ich hier mitgenommen habe",
    labelFinal: "Wo alles zusammenkommt",
    steps: [
      {
        role: "Freiberufliche Entwicklerin",
        year: "2022–2025",
        side: "left",
        detail:
          "Hier habe ich gelernt, tatsächlich zu liefern. Ich habe Web- und Mobile-Apps für echte Kunden weltweit gebaut, in Java, JavaScript, Python und Flutter. Echte Kunden bedeuten echte Deadlines, deshalb habe ich früh gelernt: Am Ende zählt nur funktionierende Software.",
      },
      {
        role: "Business-Analystin",
        year: "2025",
        side: "right",
        detail:
          "Hier habe ich gelernt, das Produkt zu sehen, bevor der Code entsteht. Ich habe aufgehört, direkt mit dem Bauen zu beginnen, und stattdessen mit einer Frage angefangen: Warum muss das existieren, und welches Problem löst es? Danach Marktanalyse, Wettbewerber, der Aspekt, der heraussticht, und hinter jedem Feature eine User Story. Mit Absicht bauen, nie aus Reflex.",
      },
      {
        role: "Projektkoordinatorin",
        year: "2025",
        side: "left",
        detail:
          "Hier habe ich gelernt, wie Dinge wirklich geliefert werden. Über sieben Monate: viele bewegliche Teile termingerecht am Laufen halten, ohne dass etwas durchs Raster fällt, Stakeholder informiert, das Team im Gleichklang, das Projekt in Bewegung halten, wenn es lieber stillstehen würde. Die Disziplin der Umsetzung.",
      },
      {
        role: "Praktikum im Projektmanagement",
        year: "2026",
        side: "right",
        detail:
          "Neugier hat mich eine Ebene höher gezogen, um ein ganzes Projekt von oben zu sehen. Ich konnte erkennen, wie die Qualität jeder einzelnen Rolle darüber entscheidet, ob das Ergebnis am Ende herausragend oder nur solide ist. Und es hat mir erlaubt, die Seite in mir zu nutzen, die am besten mit Menschen arbeitet: Eine Lücke lese ich nicht als Problem, sondern als Stelle, an der noch Wert entstehen kann, und ich bringe Menschen dazu, auf eine Art zu liefern, die ihnen wirklich Freude macht.",
      },
      {
        role: "GenAI-Engineerin · vountain",
        year: "2026",
        side: "left",
        detail:
          "Und dann ist alles zusammengekommen. Meine eigentliche Leidenschaft war immer die Softwareentwicklung, und hier mache ich sie mit allem, was mir dieser Weg mitgegeben hat. Die eigentliche Arbeit ist leiser als der Code: das Produktdenken, die Umsetzungsdisziplin und die Kommunikation, die dafür sorgen, dass das, was ich baue, auch wirklich eingesetzt und ihm vertraut wird.",
      },
    ],
    closing:
      "Nichts davon war ein Umweg. Jeder Schritt hat mir etwas mitgegeben, das ich bis heute trage, und all das zeigt sich darin, wie ich baue.",
    closingPunchline: "Ich bin vom Schreiben der Spezifikationen zum Bauen der Systeme gekommen, die sie beschreiben.",
  },

  // The email link itself stays the real EMAIL constant (Outro.tsx) — see
  // the note in this task's plan: Ariba's own translation flagged that the
  // pasted mailto address was stale, so only this lead-in sentence is used.
  outro: {
    line: "Das ist die Geschichte bis jetzt. Den nächsten Teil baue ich lieber gemeinsam mit dir. Meld dich unter",
  },
};
