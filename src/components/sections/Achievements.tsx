import Section from "@/components/Section";
import OwnerTodo from "@/components/OwnerTodo";
import { getDictionary } from "@/i18n";

const achievements = getDictionary("en").achievements;

/** New section, placeholder for now. Owner will add real qualifications
 * and certifications here later; nothing is invented in the meantime. */
export default function Achievements() {
  return (
    <Section id="achievements" eyebrow="achievements" heading={achievements.heading}>
      <div className="mt-5 max-w-2xl">
        <OwnerTodo>{achievements.placeholderNote}</OwnerTodo>
      </div>
    </Section>
  );
}
