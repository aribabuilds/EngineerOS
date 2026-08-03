import { getDictionary } from "@/i18n";
import { HOSTED_IN_EU } from "@/lib/site";

const footer = getDictionary("en").footer;

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="u-mono">{footer.copyright}</p>
        {/* "hosted in the EU" only renders when actually EU-hosted (brief §5). */}
        <p className="u-mono">
          {HOSTED_IN_EU ? footer.built : "Built by hand"}
        </p>
      </div>
    </footer>
  );
}
