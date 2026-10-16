"use client";

import { forwardRef } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared shell for the service-page hero demos: the animated mockup itself
 * is aria-hidden (a looping, changing UI is noise to a screen reader), and a
 * plain-language description stands in for it. The caption states plainly
 * that this is an illustration, and the pause control satisfies WCAG 2.2.2
 * for auto-playing motion longer than five seconds.
 */
const DemoFigure = forwardRef<
  HTMLElement,
  {
    children: React.ReactNode;
    description: string;
    caption: string;
    /** Shorter caption for narrow screens, so it stays on one line. */
    captionShort?: string;
    /** Optional one-line status note under the caption (may contain links). */
    note?: React.ReactNode;
    control: "pause" | "play" | "replay";
    onToggle: () => void;
    reduced: boolean;
    className?: string;
  }
>(function DemoFigure({ children, description, caption, captionShort, note, control, onToggle, reduced, className }, ref) {
  const label =
    control === "pause" ? "Pause demo" : control === "play" ? "Play demo" : "Replay demo";
  const Icon = control === "pause" ? Pause : control === "play" ? Play : RotateCcw;

  return (
    <figure
      ref={ref}
      className={cn("relative w-full min-w-0", className)}
      // Freezes the decorative CSS loops (typing dots, caret) while paused.
      data-demo-paused={control === "play" ? "" : undefined}
    >
      <p className="sr-only">{description}</p>
      <div aria-hidden="true">{children}</div>
      <figcaption className="mt-5 flex min-h-[28px] items-center justify-between gap-4">
        <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-faint">
          {captionShort ? (
            <>
              <span className="sm:hidden">{captionShort}</span>
              <span className="hidden sm:inline">{caption}</span>
            </>
          ) : (
            caption
          )}
        </span>
        <button
          type="button"
          onClick={onToggle}
          aria-label={label}
          className={cn(
            "inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border border-canvas-border px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint transition-colors duration-300 hover:border-ink/30 hover:text-ink",
            reduced && "invisible",
          )}
        >
          <Icon className="h-3 w-3" aria-hidden="true" />
          {control}
        </button>
      </figcaption>
      {note && (
        // Reserve two lines so switching between demos with different notes
        // never shifts the content below.
        <p className="mt-2 min-h-[42px] text-[13px] leading-relaxed text-ink-muted">{note}</p>
      )}
    </figure>
  );
});

export default DemoFigure;
