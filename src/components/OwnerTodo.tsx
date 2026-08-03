import { getDictionary } from "@/i18n";

const common = getDictionary("en").common;

/**
 * A visible "owner to provide" placeholder (build brief §8/§10: insert a
 * visible TODO block where content is missing; never pad with fiction).
 */
export default function OwnerTodo({ children }: { children?: React.ReactNode }) {
  return (
    <div className="rounded-card border border-dashed border-primary/60 bg-accent-tint p-4">
      <p className="u-mono text-xs uppercase tracking-wide text-primary-strong dark:text-primary">
        {common.ownerTodo}
      </p>
      {children ? <p className="mt-1.5 text-sm text-muted">{children}</p> : null}
    </div>
  );
}
