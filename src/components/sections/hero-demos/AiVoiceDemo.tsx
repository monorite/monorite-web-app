"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoFigure from "./DemoFigure";
import { MODE_STAGE, useDemoTimeline, type ModeDemoProps } from "./useDemoTimeline";

/**
 * AI Solutions → "Voice Agent" mode.
 *
 * A simulated phone-call interface for the same fictional trades business:
 * the AI receptionist greets the caller, asks for the suburb and the fault,
 * takes a callback preference and prepares a callback request for a person.
 *
 * This is an interface simulation, not a call: there is no audio, speech
 * recognition or telephony. Call times are the script's own timestamps, not
 * a running clock, so the duration shown is accurate to what is on screen.
 */

type Line = { who: "ai" | "caller"; at: string; text: string; ms: number };

const LINES: Line[] = [
  {
    who: "ai",
    at: "0:01",
    text: "Hi, you've reached Northside Cooling & Electrical. I'm the AI assistant. How can I help?",
    ms: 1900,
  },
  { who: "caller", at: "0:07", text: "My air-con needs a repair.", ms: 1200 },
  { who: "ai", at: "0:10", text: "Sure. Which suburb is the property in?", ms: 1400 },
  { who: "caller", at: "0:13", text: "Sunshine North.", ms: 1000 },
  { who: "ai", at: "0:15", text: "What's happening with the unit?", ms: 1300 },
  { who: "caller", at: "0:18", text: "It's running, but it's not cooling.", ms: 1300 },
  { who: "ai", at: "0:22", text: "Thanks. What's the best time for the team to call you back?", ms: 1600 },
  { who: "caller", at: "0:27", text: "This number, after 3 pm today.", ms: 1300 },
  { who: "ai", at: "0:31", text: "Got it. I'll pass this to the team for a callback.", ms: 1500 },
];
const ENDED_AT = "0:35";

// step 0 = connecting, 1..9 = transcript lines, then preparing, ready, hold.
const CONNECTING = 0;
const PREPARING = LINES.length + 1;
const READY = LINES.length + 2;
const DURATIONS = [900, ...LINES.map((l) => l.ms), 900, 900, 6500] as const;

const enter = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
} as const;

function Wave({ active }: { active: boolean }) {
  return (
    <span className="flex h-4 items-center gap-[3px]" data-active={active ? "" : undefined}>
      {[0.55, 1, 0.7, 0.9, 0.5].map((h, i) => (
        <span
          key={i}
          className={cn("demo-wave block w-[3px] rounded-full bg-ink-muted", !active && "opacity-40")}
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </span>
  );
}

export default function AiVoiceDemo({ entry, onControlChange }: ModeDemoProps) {
  const { ref, step, running, reduced, control, toggle } = useDemoTimeline<HTMLElement>(DURATIONS, {
    maxPlays: 2,
    entry,
  });
  useEffect(() => onControlChange?.(control), [control, onControlChange]);

  const shown = LINES.slice(0, Math.min(Math.max(step, 0), LINES.length));
  const inCall = step > CONNECTING && step <= LINES.length;
  const ended = step >= PREPARING;
  const cardVisible = step >= PREPARING;
  const ready = step >= READY;
  const current = shown[shown.length - 1];
  const status = step === CONNECTING ? "Connecting…" : ended ? `Call ended · ${ENDED_AT}` : `In call · ${current?.at}`;

  return (
    <DemoFigure
      ref={ref}
      caption="Illustrative demo · not a live call"
      captionShort="Illustrative demo"
      note={
        <>
          Simulated interface. Our{" "}
          <Link
            href="/ai-receptionist"
            className="text-ink underline decoration-canvas-border underline-offset-4 hover:decoration-ink"
          >
            phone receptionist for trades
          </Link>{" "}
          is in pilot.
        </>
      }
      description="Illustrative simulation of an AI voice agent answering a phone call for a fictional trades business, Northside Cooling and Electrical. The assistant says it is an AI assistant, asks which suburb the property is in, Sunshine North, and what is wrong with the unit: it is running but not cooling. It asks for a callback time, after 3 pm today, then prepares a callback request for the team: service, AC repair; location, Sunshine North; issue, not cooling; next step, a person from the team calls back."
      control={control}
      onToggle={toggle}
      reduced={reduced}
    >
      <div className={MODE_STAGE}>
        <div className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-canvas-border bg-canvas-soft shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
          {/* Call header */}
          <div className="flex items-center gap-3 border-b border-canvas-border px-4 py-3">
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                ended ? "bg-canvas-surface text-ink-faint" : "bg-ink text-canvas",
              )}
            >
              <Phone className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-ink">Incoming call · Mobile</p>
              <p className="truncate text-[10.5px] text-ink-faint">Answered by the AI receptionist · Northside</p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <span className="font-mono text-[10px] tabular-nums tracking-[0.06em] text-ink-muted">{status}</span>
              <span className={cn("transition-opacity duration-500", ended && "opacity-0")}>
                <Wave active={inCall && running} />
              </span>
            </div>
          </div>

          {/* Transcript */}
          <div className="flex items-center justify-between px-4 pt-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-faint">Transcript</span>
          </div>
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-4 pt-2 transition-[padding] duration-500 ease-premium [mask-image:linear-gradient(to_bottom,transparent,black_16%)]",
              cardVisible ? "pb-[184px] sm:pb-[150px]" : "pb-4",
            )}
          >
            {step === CONNECTING && (
              <p className="pb-6 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                Connecting the call
              </p>
            )}
            <AnimatePresence initial={false} mode="popLayout">
              {shown.map((line, i) => (
                <motion.div
                  key={i}
                  layout="position"
                  {...enter}
                  className="grid grid-cols-[46px_1fr] gap-2.5"
                >
                  <span className="pt-0.5">
                    <span
                      className={cn(
                        "block font-mono text-[9px] uppercase tracking-[0.12em]",
                        line.who === "ai" ? "text-ink-muted" : "text-ink",
                      )}
                    >
                      {line.who === "ai" ? "AI" : "Caller"}
                    </span>
                    <span className="block font-mono text-[9px] tabular-nums text-ink-faint">{line.at}</span>
                  </span>
                  <p
                    className={cn(
                      "rounded-xl px-3 py-2 text-[12.5px] leading-relaxed",
                      line.who === "ai"
                        ? "bg-canvas-surface text-ink-muted"
                        : "border border-canvas-border text-ink",
                    )}
                  >
                    {line.text}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Handoff summary */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-3 rounded-xl border border-canvas-border bg-canvas-surface p-3.5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.75)] transition-[opacity,transform] duration-500 ease-premium",
            cardVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-canvas">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              Callback request prepared
            </p>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">For the team</span>
          </div>
          <dl className="mt-2.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[12px] sm:grid-cols-[auto_1fr_auto_1fr]">
            {[
              ["Service", "AC repair"],
              ["Location", "Sunshine North"],
              ["Issue", "Not cooling"],
              ["Callback", "After 3 pm today"],
            ].map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-mono text-[9.5px] uppercase leading-[18px] tracking-[0.12em] text-ink-faint">{k}</dt>
                <dd className="text-ink-muted">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 border-t border-canvas-border pt-2.5">
            <span className="text-[11.5px] text-ink-muted">Next: a person from the team calls back</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] transition-colors duration-500",
                ready ? "bg-ink text-canvas" : "border border-canvas-border text-ink-faint",
              )}
            >
              {ready ? (
                <>
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  Ready for follow-up
                </>
              ) : (
                <>
                  <span className="demo-dot h-1 w-1 rounded-full bg-ink-faint" />
                  Preparing
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </DemoFigure>
  );
}
