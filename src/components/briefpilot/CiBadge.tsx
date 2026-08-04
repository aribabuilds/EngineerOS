"use client";

import { useState } from "react";

const BADGE_SRC = "https://github.com/aribabuilds/Briefpilot/workflows/CI/badge.svg";
const ACTIONS_URL = "https://github.com/aribabuilds/Briefpilot/actions";

/**
 * Real GitHub Actions CI badge for the public repo. Verified at
 * implementation time (repo public, workflow exists, badge resolves with a
 * 200). If the image ever fails to load, it's removed entirely rather than
 * showing a broken-image icon.
 */
export default function CiBadge({ label }: { label: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
      <span className="u-mono text-xs text-muted">{label}:</span>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={BADGE_SRC}
        alt="GitHub Actions CI status for the BriefPilot repository"
        height={20}
        onError={() => setFailed(true)}
      />
    </a>
  );
}
