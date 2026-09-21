"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { cn } from "@/lib/utils";

function useNearViewport(once: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const doneRef = useRef(false);
  const onceRef = useRef(once);
  onceRef.current = once;

  const checkRef = useRef(() => {});
  checkRef.current = () => {
    if (doneRef.current) return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    // Any overlap with the viewport counts — hash jumps (Lenis anchors)
    // land the section at the top before IntersectionObserver reliably
    // notices, which left whole sections stuck at opacity: 0.
    const visible = rect.bottom > 0 && rect.top < window.innerHeight;
    if (visible) {
      setInView(true);
      if (onceRef.current) doneRef.current = true;
    }
  };

  // Lenis drives scroll via its own RAF loop and does not always emit
  // native window "scroll" events, so hash-anchor settles must be read
  // from the Lenis callback or the reveal never flips to visible.
  useLenis(() => checkRef.current());

  useEffect(() => {
    const check = () => checkRef.current();
    check();
    const raf = requestAnimationFrame(check);
    const t = window.setTimeout(check, 120);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("hashchange", check);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.removeEventListener("hashchange", check);
    };
  }, []);

  return { ref, inView };
}

export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  once = true,
  onMount = false,
  blurIn = false,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  /**
   * Use for above-the-fold content (e.g. the hero) that should animate in
   * immediately on page load. Scroll-triggered reveals below the fold use
   * Framer Motion instead — see the branch below.
   */
  onMount?: boolean;
  /**
   * Adds a filter: blur() transition alongside the opacity/y move — a
   * slightly heavier, more editorial reveal for large single-item moments
   * (an editorial services row, a stat) rather than the plain fade used for
   * dense repeating grids. filter is its own CSS property, independent of
   * transform, so it composes safely with any transform-based classes on
   * this or a parent element.
   */
  blurIn?: boolean;
}) {
  const initial = blurIn ? { opacity: 0, y, filter: "blur(8px)" } : { opacity: 0, y };
  const animate = blurIn ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 };
  const { ref, inView } = useNearViewport(once);

  /**
   * On-mount reveals run in CSS, not Framer Motion.
   *
   * Framer Motion serialises `initial` into an inline style during SSR, so
   * this branch used to emit style="opacity:0" into the server HTML for
   * every above-the-fold element — the homepage <h1> included. That content
   * then stayed invisible until the full client bundle had downloaded and
   * hydrated, putting the LCP element behind the entire JS critical path.
   *
   * The CSS classes (see globals.css) reproduce the exact same 0.7s
   * cubic-bezier(0.16, 1, 0.3, 1) rise/fade/blur, so the animation is
   * visually unchanged — but the element is now present and unstyled-opaque
   * in the HTML, and the animation is driven by the stylesheet instead of
   * by hydration. prefers-reduced-motion is handled by the existing global
   * rule in globals.css, which collapses the duration so the element lands
   * on its visible end state immediately.
   *
   * Scroll-triggered reveals below keep using Framer Motion: they are below
   * the fold, never the LCP element, and need a viewport check anyway.
   */
  if (onMount) {
    return (
      <div
        className={cn(blurIn ? "reveal-on-mount-blur" : "reveal-on-mount", className)}
        style={
          {
            "--reveal-delay": `${delay}s`,
            "--reveal-y": `${y}px`,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
