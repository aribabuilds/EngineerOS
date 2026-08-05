import type { Metadata, Viewport } from "next";
import "./globals.css";
import { themeBootScript } from "@/lib/theme";
import { getDictionary } from "@/i18n";
import {
  SITE_URL,
  OG_IMAGE,
  AUTHOR_NAME,
  EMAIL,
  LINKEDIN_URL,
  GITHUB_URL,
} from "@/lib/site";

const dict = getDictionary("en");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: dict.meta.title,
    template: "%s",
  },
  description: dict.meta.description,
  authors: [{ name: AUTHOR_NAME }],
  creator: AUTHOR_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: dict.meta.title,
    title: dict.meta.title,
    description: dict.meta.description,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: dict.meta.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: dict.meta.title,
    description: dict.meta.description,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#c1bdb5" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0b09" },
  ],
  width: "device-width",
  initialScale: 1,
};

/** Site-wide Person structured data (build brief §9). */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: AUTHOR_NAME,
  jobTitle: "Junior AI / software engineer",
  email: `mailto:${EMAIL}`,
  url: SITE_URL,
  worksFor: { "@type": "Organization", name: "vountain" },
  knowsLanguage: ["en", "de"],
  sameAs: [LINKEDIN_URL, GITHUB_URL],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Sets data-theme before paint, preventing a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          {dict.nav.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
