import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { getDictionary } from "@/i18n";
import { CV_PATH } from "@/lib/site";

const nav = getDictionary("en").nav;

/**
 * Sticky site header: wordmark, primary nav, theme toggle.
 * Nav links jump to homepage sections; "CV ↓" downloads the PDF.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="u-mono text-sm font-medium tracking-[0.18em] text-text no-underline"
          aria-label={`${nav.wordmarkFirst} ${nav.wordmarkAccent} - home`}
        >
          {nav.wordmarkFirst} <span className="text-primary">{nav.wordmarkAccent}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            <NavItem href="/#work">{nav.work}</NavItem>
            <NavItem href="/#path">{nav.path}</NavItem>
            <NavItem href="/#contact">{nav.contact}</NavItem>
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
      </div>
    </header>
  );
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="rounded-md px-2.5 py-1.5 text-sm text-muted no-underline transition-colors hover:text-text"
      >
        {children}
      </Link>
    </li>
  );
}
