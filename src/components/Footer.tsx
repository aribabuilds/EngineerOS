import { getDictionary } from "@/i18n";
import { HOSTED_IN_EU } from "@/lib/site";
import { buildInfo } from "@/lib/buildInfo.generated";

const footer = getDictionary("en").footer;

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="u-mono">{footer.copyright}</p>
        <div className="flex flex-col gap-1 sm:items-end">
          {/* "hosted in the EU" only renders when actually EU-hosted (brief §5). */}
          <p className="u-mono">{HOSTED_IN_EU ? footer.built : "Built by hand"}</p>
          {/* Real commit hash + build date, generated at build time. No hash
              means git wasn't available in this environment; the line is
              dropped rather than showing a fake value. */}
          {buildInfo.commitHash ? (
            <p className="u-mono text-xs opacity-70">
              built at {buildInfo.commitHash} · {buildInfo.buildDate}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
