import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DecisionCard from "@/components/DecisionCard";
import CaseSection from "@/components/CaseSection";
import HtmlComment from "@/components/HtmlComment";
import PipelineWalkthrough from "@/components/briefpilot/PipelineWalkthrough";
import ArchitectureDiagram from "@/components/briefpilot/ArchitectureDiagram";
import CiBadge from "@/components/briefpilot/CiBadge";
import { getDictionary } from "@/i18n";
import { REPOS } from "@/lib/site";
import { buildInfo } from "@/lib/buildInfo.generated";
import { estimateReadingMinutes } from "@/lib/readingTime";

const dict = getDictionary("en");
const cs = dict.caseStudy;
const decisions = dict.decisions;

export const metadata: Metadata = {
  title: dict.meta.workTitle,
  description: dict.meta.workDescription,
  alternates: { canonical: "/work/briefpilot" },
};

// Computed from the page's real copy, never hand-set.
const readingMinutes = estimateReadingMinutes(
  cs.oneLiner,
  cs.problemBody,
  cs.constraints,
  cs.hardPartBody,
  cs.roleAIBody,
  cs.testingItems,
  cs.testingNote,
  cs.roadmapItems.flatMap((r) => [r.item, r.why]),
  decisions.items.flatMap((d) => [d.chose, d.rejected, d.cost, d.why]),
);

export default function BriefPilotCaseStudy() {
  return (
    <>
      <Header />
      <main id="main">
        {/* 1. Title, one-liner, status, date range */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
            <p className="mb-4">
              <Link href="/" className="u-mono text-sm text-muted hover:text-primary">
                <span aria-hidden="true">←</span> {dict.common.backToHome}
              </Link>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-4xl font-semibold text-text">{cs.title}</h1>
              <span className="status-tag">
                <span className="status-tag__dot" aria-hidden="true" />
                {cs.status}
              </span>
              <span className="u-mono text-sm text-muted">{cs.dateRange}</span>
            </div>
            <p className="reading mt-4 text-lg text-muted">{cs.oneLiner}</p>

            {/* Real, git-derived metadata: last updated + reading time. No
                fabricated value renders if git couldn't resolve one. */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
              {buildInfo.briefpilotLastUpdated ? (
                <span className="u-mono">
                  {cs.lastUpdatedLabel}: {buildInfo.briefpilotLastUpdated}
                </span>
              ) : null}
              <span className="u-mono">
                {readingMinutes} {cs.readingTimeSuffix}
              </span>
            </div>

            {/* 2. Above the fold: repo, role, stack, CI status */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <a
                href={REPOS.briefpilot}
                target="_blank"
                rel="noopener noreferrer"
                className="u-mono text-sm font-medium text-primary"
              >
                {cs.repoLabel} <span aria-hidden="true">→</span>
              </a>
              <span className="u-mono text-sm text-muted">{cs.roleTag}</span>
              <ul className="flex flex-wrap gap-2">
                {cs.stack.map((tech) => (
                  <li key={tech} className="u-mono rounded border border-line px-2 py-0.5 text-xs text-muted">
                    {tech}
                  </li>
                ))}
              </ul>
              <CiBadge label={cs.ciStatusLabel} />
            </div>

            {/* Interactive pipeline walkthrough, standing in for a future screen recording. */}
            <div className="mt-6">
              <PipelineWalkthrough />
            </div>
          </div>
        </section>

        {/* 3. Problem */}
        <CaseSection eyebrow="problem" heading={cs.sections.problem}>
          <p className="reading text-lg text-text">{cs.problemBody}</p>
        </CaseSection>

        {/* 4. Constraints */}
        <CaseSection eyebrow="constraints" heading={cs.sections.constraints}>
          <ul className="flex flex-wrap gap-2">
            {cs.constraints.map((con) => (
              <li key={con} className="extraction">
                <span className="u-mono text-sm text-text">{con}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 5. Architecture */}
        <CaseSection eyebrow="architecture" heading={cs.sections.architecture}>
          <ArchitectureDiagram />
        </CaseSection>

        {/* 6. The decision log, given visual weight. First entry defaults expanded. */}
        <CaseSection eyebrow="decisions" heading={cs.sections.decisions} emphasis>
          <div className="grid gap-6">
            {decisions.items.map((it, i) => (
              <DecisionCard
                key={it.header + it.title}
                header={it.header}
                title={it.title}
                chose={it.chose}
                rejected={it.rejected}
                cost={it.cost}
                why={it.why}
                labels={decisions.labels}
                defaultExpanded={i === 0}
              />
            ))}
          </div>
        </CaseSection>

        {/* 7. The hard part. Owner-drafted, pending verification. */}
        <CaseSection eyebrow="hard_part" heading={cs.sections.hardPart}>
          <HtmlComment text="OWNER VERIFY" />
          <div className="reading grid gap-4 text-text">
            {cs.hardPartBody.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <HtmlComment text="/OWNER VERIFY" />
        </CaseSection>

        {/* 8. Testing and guarantees: only what's real. No extraction,
            validation, or human-review claim appears here. */}
        <CaseSection eyebrow="testing" heading={cs.sections.testing} emphasis>
          <ul className="grid gap-2">
            {cs.testingItems.map((item) => (
              <li key={item} className="u-mono text-sm text-text">
                <span className="text-primary">✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{cs.testingNote}</p>
        </CaseSection>

        {/* 9. Roadmap: planned engineering, each scoped by something already shipped. */}
        <CaseSection eyebrow="roadmap" heading={cs.sections.roadmap} emphasis>
          <ol className="grid gap-4">
            {cs.roadmapItems.map((r, i) => (
              <li key={r.item} className="grid grid-cols-[1.5rem_1fr] gap-3">
                <span className="u-mono text-sm text-primary" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-text">{r.item}</p>
                  <p className="u-mono mt-1 text-xs text-muted">why: {r.why}</p>
                </div>
              </li>
            ))}
          </ol>
        </CaseSection>

        {/* 10. Role and where AI assisted. Owner-drafted, pending verification. */}
        <CaseSection eyebrow="role" heading={cs.sections.roleAI}>
          <HtmlComment text="OWNER VERIFY" />
          <div className="reading grid gap-4 text-text">
            {cs.roleAIBody.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <HtmlComment text="/OWNER VERIFY" />
        </CaseSection>
      </main>
      <Footer />
    </>
  );
}
