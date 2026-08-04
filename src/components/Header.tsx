"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { getDictionary } from "@/i18n";
import { CV_PATH, GITHUB_URL, LINKEDIN_URL, MAILTO } from "@/lib/site";

const nav = getDictionary("en").nav;
const contact = getDictionary("en").contact;

const NAV_ITEMS = [
  { id: "work", href: "/#work", label: nav.work },
  { id: "path", href: "/#path", label: nav.path },
  { id: "decision", href: "/#decision", label: nav.decisions },
  { id: "contact", href: "/#contact", label: nav.contact },
] as const;

const monogram = `${nav.wordmarkFirst.charAt(0)}${nav.wordmarkAccent.charAt(0)}`;
const homeLabel = `${nav.wordmarkFirst} ${nav.wordmarkAccent}: home`;

/**
 * Site-wide header. A fixed vertical rail on desktop (>=1024px): monogram,
 * nav, a static rule, then socials. Below that, a horizontal top bar, same
 * as before. Both are always in the DOM and toggled with Tailwind's
 * responsive display classes, so only one is ever focusable at a time
 * (display: none removes an element from the tab order and a11y tree).
 */
export default function Header() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Desktop rail, >=1024px. overflow is never hidden here, so rotated
          links' focus rings are never clipped. */}
      <header className="fixed inset-y-0 left-0 z-40 hidden w-[72px] flex-col items-center bg-bg py-6 lg:flex">
        <Link
          href="/"
          aria-label={homeLabel}
          className="font-display text-lg font-semibold text-text no-underline"
        >
          {monogram}
        </Link>

        <nav aria-label="Primary" className="flex flex-1 flex-col items-center justify-center">
          <ul className="flex flex-col items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`rail-link u-mono text-xs ${activeId === item.id ? "rail-link--active" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div aria-hidden="true" className="h-14 w-px bg-line" />

        <div className="flex flex-col items-center gap-4 pt-6">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.github}
            className="text-muted transition-colors hover:text-primary"
          >
            <GithubIcon />
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={contact.linkedin}
            className="text-muted transition-colors hover:text-primary"
          >
            <LinkedinIcon />
          </a>
          <a href={MAILTO} aria-label={contact.emailMe} className="text-muted transition-colors hover:text-primary">
            <MailIcon />
          </a>
        </div>
      </header>

      {/* Top-right utility cluster: CV + theme toggle. The rail spec doesn't
          cover these, so they get the otherwise-empty top-right corner. */}
      <div className="fixed right-5 top-5 z-40 hidden items-center gap-1 rounded-md bg-bg/85 backdrop-blur-sm lg:flex">
        <a
          href={CV_PATH}
          download
          className="u-mono rounded-md px-2.5 py-1.5 text-sm text-text no-underline transition-colors hover:text-primary"
        >
          {nav.cv} <span aria-hidden="true">↓</span>
        </a>
        <ThemeToggle />
      </div>

      {/* Horizontal top bar, <1024px. */}
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-line bg-bg/85 px-5 backdrop-blur-sm sm:px-8 lg:hidden">
        <Link
          href="/"
          className="u-mono text-sm font-medium tracking-[0.18em] text-text no-underline"
          aria-label={homeLabel}
        >
          {nav.wordmarkFirst} <span className="text-primary">{nav.wordmarkAccent}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="rounded-md px-2.5 py-1.5 text-sm text-muted no-underline transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={CV_PATH}
            download
            className="u-mono rounded-md px-2.5 py-1.5 text-sm text-text no-underline transition-colors hover:text-primary"
          >
            {nav.cv} <span aria-hidden="true">↓</span>
          </a>
          <ThemeToggle />
        </nav>
      </header>
    </>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.4c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.4 1.3a11.5 11.5 0 0 0-6 0C6.9 3 5.9 3.3 5.9 3.3a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.5 9.6c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.1-.5 2V21"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M7.7 10v6.3M7.7 7.6v.01M11.5 16.3V10M11.5 12.6c0-1.5 1-2.6 2.4-2.6 1.3 0 2.1.9 2.1 2.5v3.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
