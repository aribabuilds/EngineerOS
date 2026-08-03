import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DecisionCard from "@/components/DecisionCard";
import OwnerTodo from "@/components/OwnerTodo";
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
        {/* 1 - Title + one-liner + status + date range */}
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

            {/* 2 - Above the fold: repo · recording · role · stack */}
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
            <div className="mt-4">
              <OwnerTodo>{cs.recordingTodo}</OwnerTodo>
            </div>
          </div>
        </section>

        {/* 3 - Problem */}
        <CaseSection heading={cs.sections.problem}>
          <p className="reading text-lg text-text">{cs.problemBody}</p>
        </CaseSection>

        {/* 4 - Constraints */}
        <CaseSection heading={cs.sections.constraints}>
          <ul className="flex flex-wrap gap-2">
            {cs.constraints.map((con) => (
              <li key={con} className="extraction">
                <span className="u-mono text-sm text-text">{con}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 5 - Architecture (owner supplies the diagram) */}
        <CaseSection heading={cs.sections.architecture}>
          <OwnerTodo>Readable architecture diagram - owner to supply / approve.</OwnerTodo>
        </CaseSection>

        {/* 6 - Three decisions as Decision Cards (given visual weight) */}
        <CaseSection heading={cs.sections.decisions} emphasis>
          <div className="grid gap-6">
            {/* ADR-0003 - null-not-guess. Values TODO (not yet provided verbatim). */}
            <DecisionCard
              header={cs.adr03Header}
              chose={dict.common.ownerTodo}
              rejected={dict.common.ownerTodo}
              cost={dict.common.ownerTodo}
              why="Owner to provide the decision log entry for null-not-guess."
              labels={d.labels}
            />

            {/* Photo quality-gate. Values TODO. */}
            <DecisionCard
              header={cs.qualityGateHeader}
              chose={dict.common.ownerTodo}
              rejected={dict.common.ownerTodo}
              cost={dict.common.ownerTodo}
              why="Owner to provide the decision log entry for the photo quality-gate."
              labels={d.labels}
            />

            {/* ADR-0001 - no hosted deployment. Full verbatim content exists. */}
            <DecisionCard
              header={d.header}
              chose={d.chose}
              rejected={d.rejected}
              cost={d.cost}
              why={d.why}
              labels={d.labels}
            />
          </div>
        </CaseSection>

        {/* 7 - The hard part */}
        <CaseSection heading={cs.sections.hardPart}>
          <OwnerTodo>The hard part - owner to write. Do not fabricate.</OwnerTodo>
        </CaseSection>

        {/* 8 - Evidence (no accuracy numbers) */}
        <CaseSection heading={cs.sections.evidence} emphasis>
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

        {/* 9 - What's wrong / what's next */}
        <CaseSection heading={cs.sections.whatsNext} emphasis>
          <p className="text-text">{cs.whatsNextBody}</p>
          <ul className="mt-4 grid gap-2">
            {cs.whatsNextItems.map((item) => (
              <li key={item} className="text-muted">
                - {item}
              </li>
            ))}
          </ul>
        </CaseSection>

        {/* 10 - Role + where AI assisted */}
        <CaseSection heading={cs.sections.roleAI}>
          <OwnerTodo>
            Owner to detail their role and exactly where AI assisted (see the homepage
            &ldquo;How I work with AI&rdquo; for the philosophy).
          </OwnerTodo>
        </CaseSection>
      </main>
      <Footer />
    </>
  );
}

function CaseSection({
  heading,
  children,
  emphasis = false,
}: {
  heading: string;
  children: React.ReactNode;
  emphasis?: boolean;
}) {
  return (
    <section className={`border-b border-line ${emphasis ? "bg-surface" : ""}`}>
      <div className={`mx-auto max-w-3xl px-5 sm:px-8 ${emphasis ? "py-14 sm:py-16" : "py-11 sm:py-12"}`}>
        <h2 className="font-display text-2xl font-semibold text-text">{heading}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </section>
  );
}
