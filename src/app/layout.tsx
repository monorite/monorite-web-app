import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import { buildMetadata, buildOrganizationJsonLd, buildWebSiteJsonLd } from "@/lib/seo";
import { ReactLenis } from "lenis/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { ChatProvider } from "@/components/chat/ChatProvider";
import ChatWidget from "@/components/chat/ChatWidget";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

// The root layout's metadata is inherited by every route, so two fields are
// deliberately stripped from it. Every real page sets both itself via
// buildMetadata, so in practice this only changes /_not-found.
//
// `alternates`: buildMetadata defaults `path` to "", so keeping it here made
// the layout hand a *homepage* canonical to any route that doesn't set its
// own — i.e. the 404 page was canonicalising itself to the homepage.
//
// `robots`: buildMetadata emits "index, follow" for non-noIndex pages. Next
// renders its own "noindex" tag on the not-found boundary, so inheriting
// this one put two contradictory robots tags on the same 404 response
// ("noindex" + "index, follow"). Google resolves that to the most
// restrictive, so noindex won either way — but emitting a directive that
// says the opposite of the one beside it is not something to leave in place.
const {
  alternates: _rootCanonical,
  robots: _rootRobots,
  ...rootMetadataDefaults
} = buildMetadata({
  title: site.name,
  description: site.description,
});

export const metadata: Metadata = {
  ...rootMetadataDefaults,
  metadataBase: new URL(site.url),
  // Empty until GOOGLE_SITE_VERIFICATION / BING_SITE_VERIFICATION are set —
  // Next omits a verification meta tag entirely when its value is
  // undefined, so this is a no-op until the env vars are added. See
  // README.md "Getting indexed" for how to get these values.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
};

// Sets the theme attribute on <html> before first paint, so the page
// never flashes the wrong theme while React hydrates. Must run as a
// blocking inline script (not next/script, which defers) — reading
// localStorage after paint is what causes the flash in the first place.
// Also stamps data-preloader="seen" for repeat visits in the same tab
// session, which is why this runs before first paint too: the preloader is
// now server-rendered (see Preloader.tsx), so the decision to hide it has to
// be made before the browser paints, not in a React effect afterwards. Both
// storage reads are individually try/caught — a browser with storage blocked
// should still get a correct theme and a working page.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    document.documentElement.dataset.theme = stored === "light" ? "light" : "dark";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
  try {
    if (sessionStorage.getItem("monorite-preloader-seen")) {
      document.documentElement.dataset.preloader = "seen";
    } else {
      sessionStorage.setItem("monorite-preloader-seen", "1");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-canvas">
        <script
          type="application/ld+json"
          // Internally-defined, non-user-supplied data — safe to serialize directly.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteJsonLd()) }}
        />
        <ReactLenis root options={{ anchors: true }} />
        <Preloader />
        <div className="noise-overlay" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas"
        >
          Skip to content
        </a>
        <ChatProvider>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
        </ChatProvider>
        {/* Only in production — running `next dev` shouldn't send test
         * traffic into real analytics data. */}
        {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics gaId={site.googleAnalyticsId} />
        )}
      </body>
    </html>
  );
}
