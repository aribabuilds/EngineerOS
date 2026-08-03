import Section from "@/components/Section";
import DecisionCard from "@/components/DecisionCard";
import { getDictionary } from "@/i18n";

const d = getDictionary("en").decisions;
// The homepage features the first entry in the log; the full set lives on the
// case study page.
const featured = d.items[0];

export default function DecisionSection() {
  return (
    <Section id="decision" heading={d.heading}>
      <div className="mt-8 max-w-2xl">
        <DecisionCard
          header={featured.header}
          title={featured.title}
          chose={featured.chose}
          rejected={featured.rejected}
          cost={featured.cost}
          why={featured.why}
          labels={d.labels}
          link={{ href: "/work/briefpilot", label: d.seeRest }}
        />
      </div>
    </Section>
  );
}
