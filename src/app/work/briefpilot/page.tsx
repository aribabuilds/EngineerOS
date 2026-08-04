import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DecisionCard from "@/components/DecisionCard";
import HtmlComment from "@/components/HtmlComment";
import PipelineWalkthrough from "@/components/briefpilot/PipelineWalkthrough";
import ArchitectureDiagram from "@/components/briefpilot/ArchitectureDiagram";
import { getDictionary } from "@/i18n";
import { REPOS } from "@/lib/site";

const dict = getDictionary("en");
const cs = dict.caseStudy;
const decisions = dict.decisions;

export const metadata: Metadata = {
  title: dict.meta.workTitle,
  description: dict.meta.workDescription,
  alternates: { canonical: "/work/briefpilot" },
};

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

            {/* 2. Above the fold: repo, role, stack */}
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

        {/* 6. The decision log, given visual weight. */}
        <CaseSection eyebrow="decisions" heading={cs.sections.decisions} emphasis>
          <div className="grid gap-6">
            {decisions.items.map((it) => (
              <DecisionCard
                key={it.header + it.title}
                header={it.header}
                title={it.title}
                chose={it.chose}
                rejected={it.rejected}
                cost={it.cost}
                why={it.why}
                labels={decisions.labels}
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

        {/* 8. Evidence (no accuracy numbers) */}
        <CaseSection eyebrow="evidence" heading={cs.sections.evidence} emphasis>
          <p className="text-text">{cs.evidenceBody}</p>
          <ul className="mt-4 grid gap-2">
            {cs.evidenceItems.map((item) => (
              <li key={item} className="u-mono text-sm text-text">
                <span className="text-primary">✓</span> {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{cs.evidenceNote}</p>
        </CaseSection>

        {/* 9. What's wrong, what's next */}
        <CaseSection eyebrow="next" heading={cs.sections.whatsNext} emphasis>
          <p className="text-text">{cs.whatsNextBody}</p>
          <ul className="mt-4 grid list-disc gap-2 pl-5">
            {cs.whatsNextItems.map((item) => (
              <li key={item} className="text-muted">
                {item}
              </li>
            ))}
          </ul>
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

function CaseSection({
  eyebrow,
  heading,
  children,
  emphasis = false,
}: {
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <section className={`reveal border-b border-line ${emphasis ? "bg-surface" : ""}`}>
      <div className={`mx-auto max-w-3xl px-5 sm:px-8 ${emphasis ? "py-14 sm:py-16" : "py-11 sm:py-12"}`}>
        <p className="u-mono mb-2 text-xs tracking-wide text-muted">field: {eyebrow}</p>
        <h2 className="font-display text-2xl font-semibold text-text">{heading}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
