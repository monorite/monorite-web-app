"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Drives a hero product demo as a list of timed steps.
 *
 * Design constraints (see ServiceLandingPage hero):
 *  - The server renders the LAST step, i.e. the complete demonstration. A
 *    visitor without JS, a reduced-motion visitor, and the first paint for
 *    everyone all show a finished, understandable state. Nothing is ever
 *    hidden waiting for an animation to complete, and there is no SSR/
 *    hydration mismatch because the initial client state is identical.
 *  - After hydration, if motion is allowed and the demo is on screen, the
 *    final state holds for its duration and then the story replays from
 *    step 0. It replays `maxPlays` times and then rests on the final state,
 *    so the loop is bounded.
 *  - Timers only run while the demo is in the viewport, the tab is visible,
 *    and the visitor hasn't paused it (WCAG 2.2.2 pause control).
 */
/**
 * How a demo begins when it mounts:
 *  - "auto"   (default): server-rendered on page load. Starts on the finished
 *             state, holds, then replays up to `maxPlays` times.
 *  - "play":  mounted because the visitor chose it (e.g. a mode tab). Plays
 *             one cycle from step 0, then rests on the finished state.
 *  - "static": mounted while the visitor had motion paused. Shows the
 *             finished state with Replay available; nothing auto-plays.
 * "play" and "static" are only ever mounted on the client, after hydration,
 * so reading matchMedia during initial state is safe there.
 */
export type DemoEntry = "auto" | "play" | "static";

function prefersReducedMotion() {
  return (
    typeof window === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useDemoTimeline<T extends HTMLElement>(
  durations: readonly number[],
  { maxPlays = 3, entry = "auto" }: { maxPlays?: number; entry?: DemoEntry } = {},
) {
  const last = durations.length - 1;
  const ref = useRef<T>(null);
  const [step, setStep] = useState(() =>
    entry === "play" && !prefersReducedMotion() ? 0 : last,
  );
  // "play"/"static" start at the play limit, so they never auto-replay.
  const [plays, setPlays] = useState(entry === "auto" ? 0 : maxPlays);
  // Assume reduced motion until the media query has been read on the client,
  // so nothing can start before we know it is allowed. Client-only entries
  // can read it immediately.
  const [reduced, setReduced] = useState(() =>
    entry === "auto" ? true : prefersReducedMotion(),
  );
  const [inView, setInView] = useState(false);
  const [docVisible, setDocVisible] = useState(true);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Reduced motion switched on mid-play: settle on the complete state.
  useEffect(() => {
    if (reduced) setStep(last);
  }, [reduced, last]);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), {
      threshold: 0.35,
    });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const sync = () => setDocVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const finished = step === last && plays >= maxPlays;
  const running = !reduced && inView && docVisible && !userPaused && !finished;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => {
      if (step < last) {
        setStep(step + 1);
      } else {
        setPlays((p) => p + 1);
        setStep(0);
      }
    }, durations[step]);
    return () => window.clearTimeout(t);
  }, [running, step, last, durations]);

  const toggle = useCallback(() => {
    if (finished) {
      // Already at the play limit, so the cycle runs once from step 0 and
      // stops when it reaches the final step again (no extra hold/replay).
      setPlays(maxPlays);
      setUserPaused(false);
      setStep(0);
      return;
    }
    setUserPaused((p) => !p);
  }, [finished, maxPlays]);

  return {
    ref,
    step,
    running,
    reduced,
    control: finished ? ("replay" as const) : userPaused ? ("play" as const) : ("pause" as const),
    toggle,
  };
}

export type DemoControl = "pause" | "play" | "replay";

/** Props shared by the AI Solutions mode demos (see AiSolutionsDemo). */
export type ModeDemoProps = {
  entry?: DemoEntry;
  onControlChange?: (control: DemoControl) => void;
};

/** Fixed stage height shared by the AI Solutions modes, so switching modes never shifts layout. */
export const MODE_STAGE = "relative h-[440px] sm:h-[480px]";
