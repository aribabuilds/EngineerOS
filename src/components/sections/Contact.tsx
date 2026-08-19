import Section from "@/components/Section";
import BlobAccent from "@/components/BlobAccent";
import { getDictionary } from "@/i18n";
import {
  MAILTO,
  BOOKING_URL,
  bookingIsConfigured,
  LINKEDIN_URL,
  GITHUB_URL,
  CV_PATH,
} from "@/lib/site";

const c = getDictionary("en").contact;

export default function Contact() {
  return (
    <Section id="contact" eyebrow="contact" heading={c.heading} className="relative overflow-hidden">
      <BlobAccent
        seed="contact-accent"
        color="var(--periwinkle)"
        size={640}
        className="-bottom-40 -left-40 opacity-[0.08] blur-3xl"
      />
      <p className="reading relative mt-5 text-lg text-muted">{c.lede}</p>

      <div className="relative mt-8 flex flex-wrap gap-3">
        <a href={MAILTO} className="btn btn--primary">
          {c.emailMe}
        </a>

        {/* "Book a call" only renders once a real booking URL is set (brief §11). */}
        {bookingIsConfigured ? (
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            {c.bookACall}
          </a>
        ) : null}

        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
          {c.linkedin}
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
          {c.github}
        </a>
        <a href={CV_PATH} download className="btn btn--ghost">
          {c.downloadCv} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </Section>
  );
}
