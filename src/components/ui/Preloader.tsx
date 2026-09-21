import { site } from "@/data/site";
import Logo from "./Logo";

/**
 * A brief branded preloader shown on first paint, in the spirit of the
 * "wordmark reveal" intros common on creative-agency sites.
 *
 * This is a server component on purpose. The previous version was a client
 * component that mounted from a layout effect, so in practice it appeared
 * only once the JS bundle had hydrated — never on first paint, despite that
 * being its stated intent. Rendering it in the server HTML means it covers
 * the page from the real first paint, and the CSS in globals.css dismisses
 * it on a fixed ~700ms timeline (down from ~1600ms) with no dependency on
 * JavaScript running at all.
 *
 * Two behaviours that used to live in this component now live elsewhere,
 * unchanged in effect:
 *   - prefers-reduced-motion: handled by the global reduced-motion rule in
 *     globals.css, which collapses the animation so the overlay resolves to
 *     hidden immediately.
 *   - "already seen this tab session": handled by the blocking inline script
 *     in layout.tsx, which stamps data-preloader="seen" on <html> before
 *     first paint. Doing it there rather than in a React effect also removes
 *     the React 18 Strict Mode double-invoke hazard the old implementation
 *     had to work around.
 */
export default function Preloader() {
  return (
    <div
      className="preloader fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-canvas"
      aria-hidden="true"
    >
      <div className="preloader-mark relative">
        <div
          aria-hidden="true"
          className="preloader-glow absolute inset-0 -z-10 rounded-2xl bg-accent/40 blur-2xl"
        />
        <Logo size={56} />
      </div>

      <div className="overflow-hidden">
        <span className="preloader-word block font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
          {site.name}
        </span>
      </div>

      <div className="preloader-rule h-px w-24 origin-left bg-accent md:w-32" />
    </div>
  );
}
