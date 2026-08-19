import Section from "@/components/Section";
import OwnerTodo from "@/components/OwnerTodo";
import BlobAccent from "@/components/BlobAccent";
import { getDictionary } from "@/i18n";

const achievements = getDictionary("en").achievements;

/** New section, placeholder for now. Owner will add real qualifications
 * and certifications here later; nothing is invented in the meantime. A
 * quiet background blob gives this otherwise-empty placeholder some visual
 * weight without implying any content that isn't there yet. */
export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="achievements" heading={achievements.heading} className="relative overflow-hidden">
      <BlobAccent
        seed="achievements-accent"
        color="var(--primary)"
        size={560}
        className="-right-32 -top-24 opacity-[0.07] blur-3xl"
      />
      <div className="relative mt-5 max-w-2xl">
        <OwnerTodo>{achievements.placeholderNote}</OwnerTodo>
      </div>
    </Section>
  );
}
