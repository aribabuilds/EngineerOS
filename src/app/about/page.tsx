import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ExtractionTag from "@/components/ExtractionTag";
import OwnerTodo from "@/components/OwnerTodo";
import HtmlComment from "@/components/HtmlComment";
import { getDictionary } from "@/i18n";

const dict = getDictionary("en");
const about = dict.about;

export const metadata: Metadata = {
  title: dict.meta.aboutTitle,
  description: dict.meta.aboutDescription,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
            <p className="mb-4">
              <Link href="/" className="u-mono text-sm text-muted hover:text-primary">
                <span aria-hidden="true">←</span> {dict.common.backToHome}
              </Link>
            </p>
            <h1 className="font-display text-4xl font-semibold text-text">{about.title}</h1>
            <p className="reading mt-4 font-display text-xl italic leading-snug text-text">
              {about.intro}
            </p>
          </div>
        </section>

        {/* Facts block - verbatim, machine-readable. */}
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <h2 className="font-display text-2xl font-semibold text-text">{about.factsHeading}</h2>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {about.facts.map((fact) => (
                <ExtractionTag key={fact.label} label={fact.label} value={fact.value} />
              ))}
            </div>
            {/* German level shown as B1; the CV's text layer still reads A2 in two spots. */}
            <HtmlComment text="OWNER: confirm A2 vs B1 and align site + CV" />
          </div>
        </section>

        {/* The person - owner narrative TODO. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <h2 className="font-display text-2xl font-semibold text-text">{about.personHeading}</h2>
            <div className="mt-5">
              <OwnerTodo>The personal narrative - owner to write. Do not fabricate.</OwnerTodo>
            </div>
          </div>
        </section>

        {/* AI philosophy - reuse verbatim homepage copy. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <h2 className="font-display text-2xl font-semibold text-text">{about.philosophyHeading}</h2>
            <p className="reading mt-5 text-lg text-muted">{dict.ai.intro}</p>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {dict.ai.columns.map((col) => (
                <div key={col.label} className="rounded-card border border-line bg-surface p-5">
                  <h3 className="u-mono text-sm font-medium text-primary">{col.label}</h3>
                  <p className="mt-3 text-text">{col.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The path - reuse verbatim dated rows. */}
        <section className="border-b border-line">
          <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
            <h2 className="font-display text-2xl font-semibold text-text">{about.pathHeading}</h2>
            <ol className="mt-6 border-t border-line">
              {dict.path.rows.map((row, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[4rem_1fr] items-baseline gap-4 border-b border-line py-4 sm:grid-cols-[6rem_1fr]"
                >
                  <span className="u-mono text-sm text-primary">{row.year}</span>
                  <div>
                    <p className="font-medium text-text">{row.role}</p>
                    <p className="text-muted">{row.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="reading mt-8 font-display text-xl italic leading-snug text-text">
              {dict.path.closing}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
