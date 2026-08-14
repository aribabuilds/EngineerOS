"use client";

import type { ReactNode } from "react";
import { useInView } from "@/lib/useInView";
import { useMounted } from "@/lib/useMounted";
import WorkWindow from "./WorkWindow";
import { parseStack } from "./parseStack";

/**
 * One grid cell: window + full content card. The only reason this is a
 * client component is the scroll reveal. No-JS default is fully visible (see
 * useMounted): JS only adds "is-pending" after mount, and only until this
 * item scrolls into view, so nothing here is ever gated behind JS to read.
 */
export default function WorkItem({
  statusVariant,
  status,
  title,
  summary,
  detail,
  children,
}: {
  statusVariant: "dev" | "live";
  status: string;
  title: string;
  summary: string;
  detail: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLLIElement>(0.2);
  const mounted = useMounted();
  const pending = mounted && !inView;
  const stack = parseStack(detail);

  return (
    <li ref={ref} className={`work-forest__item ${pending ? "is-pending" : ""}`}>
      <WorkWindow status={statusVariant} title={title} statusLabel={status} />
      <div className="work-forest__card">
        <h3 className="work-forest__display work-forest__title">{title}</h3>
        <p className={`work-forest__status work-forest__status--${statusVariant}`}>{status}</p>
        <p className="work-forest__summary">{summary}</p>
        <p className="work-forest__detail">{detail}</p>
        {stack ? (
          <div className="work-forest__stack">
            {stack.map((tech) => (
              <span key={tech} className="work-forest__chip">
                {tech}
              </span>
            ))}
          </div>
        ) : null}
        <div className="work-forest__links">{children}</div>
      </div>
    </li>
  );
}
