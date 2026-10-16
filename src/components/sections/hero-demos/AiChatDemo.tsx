"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoFigure from "./DemoFigure";
import { useDemoTimeline } from "./useDemoTimeline";

/**
 * AI Solutions hero: a customer asks, the assistant understands, and a
 * useful next step (a prepared lead) lands in a CRM-style card.
 *
 * Illustrative only — the scenario, names and CRM card are a concept of
 * what we build, not a live Monorite integration. The figure caption says so.
 */

const MSG_1 = "Hi, I need to book a website consultation for my business.";
const REPLY_1 = "Of course! I can help you get started. What type of business do you run?";
const MSG_2 = "I'm running a local dental clinic.";
const REPLY_2 =
  "We can help you build a professional website with appointment enquiries. I'll prepare a project enquiry for the team.";

const TYPE_MS = 30;

/** Keep the caret in view while typing, like a real single-line input. */
function composerTail(text: string, max = 30) {
  return text.length > max ? `…${text.slice(-(max - 1))}` : text;
}

// Step index → what is on screen.
const S = {
  open: 0,
  type1: 1,
  sent1: 2,
  think1: 3,
  reply1: 4,
  type2: 5,
  sent2: 6,
  think2: 7,
  reply2: 8,
  preparing: 9,
  ready: 10,
  hold: 11,
} as const;

const DURATIONS = [
  700, // open
  MSG_1.length * TYPE_MS + 420, // type1
  320, // sent1
  950, // think1
  1500, // reply1
  MSG_2.length * TYPE_MS + 380, // type2
  320, // sent2
  1000, // think2
  1500, // reply2
  1000, // preparing
  900, // ready
  6500, // hold (also the first thing a visitor sees)
] as const;

const enter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" } },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
} as const;

function Bubble({ from, children }: { from: "customer" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", from === "customer" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed sm:text-sm",
          from === "customer"
            ? "rounded-tr-sm bg-ink text-canvas"
            : "rounded-tl-sm bg-canvas-surface text-ink-muted",
        )}
      >
        {children}
      </p>
    </div>
  );
}

function Thinking() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-canvas-surface px-4 py-3.5">
        <span className="demo-dot h-1.5 w-1.5 rounded-full bg-ink-faint" />
        <span className="demo-dot h-1.5 w-1.5 rounded-full bg-ink-faint [animation-delay:0.15s]" />
        <span className="demo-dot h-1.5 w-1.5 rounded-full bg-ink-faint [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

export default function AiChatDemo() {
  const { ref, step, running, reduced, control, toggle } = useDemoTimeline<HTMLElement>(DURATIONS);

  // Progressive typing in the composer during the two "type" steps.
  const typingText = step === S.type1 ? MSG_1 : step === S.type2 ? MSG_2 : null;
  const [typed, setTyped] = useState(0);
  useEffect(() => setTyped(0), [step]);
  useEffect(() => {
    if (!typingText || !running) return;
    const id = window.setInterval(() => {
      setTyped((n) => (n >= typingText.length ? n : n + 1));
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [typingText, running]);

  const cardVisible = step >= S.preparing;
  const ready = step >= S.ready;

  const items: { key: string; node: React.ReactNode }[] = [];
  if (step >= S.sent1) items.push({ key: "m1", node: <Bubble from="customer">{MSG_1}</Bubble> });
  if (step === S.think1) items.push({ key: "t1", node: <Thinking /> });
  if (step >= S.reply1) items.push({ key: "r1", node: <Bubble from="assistant">{REPLY_1}</Bubble> });
  if (step >= S.sent2) items.push({ key: "m2", node: <Bubble from="customer">{MSG_2}</Bubble> });
  if (step === S.think2) items.push({ key: "t2", node: <Thinking /> });
  if (step >= S.reply2) items.push({ key: "r2", node: <Bubble from="assistant">{REPLY_2}</Bubble> });

  return (
    <DemoFigure
      ref={ref}
      caption="Illustrative demo · not a live integration"
      captionShort="Illustrative demo"
      description="Illustrative demo of an AI website assistant. A customer asks to book a website consultation for their dental clinic. The assistant asks what type of business they run, explains it can help with a website that takes appointment enquiries, and prepares a project enquiry. A CRM card then shows a new lead: service, website development; business, dental clinic; status, ready for follow-up."
      control={control}
      onToggle={toggle}
      reduced={reduced}
    >
      {/* pb reserves the space the CRM card hangs into, so nothing below shifts. */}
      <div className="relative pb-12">
        <div className="flex h-[400px] flex-col overflow-hidden rounded-2xl border border-canvas-border bg-canvas-soft shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:h-[440px]">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-canvas-border px-4 py-3.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-bold text-canvas">
              AI
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">Website assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-ink-faint">
                <span className="h-1.5 w-1.5 rounded-full bg-ink-muted" />
                Online · replies in seconds
              </p>
            </div>
            <span className="rounded-full border border-canvas-border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
              Example
            </span>
          </div>

          {/* Messages: bottom-anchored like a real chat; older messages slide up. */}
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col justify-end gap-3 overflow-hidden px-4 pt-4 transition-[padding] duration-500 ease-premium [mask-image:linear-gradient(to_bottom,transparent,black_18%)]",
              cardVisible ? "pb-[72px]" : "pb-4",
            )}
          >
            {items.length === 0 && (
              <p className="pb-6 text-center font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-faint">
                Ask about services, bookings, or hours
              </p>
            )}
            <AnimatePresence initial={false} mode="popLayout">
              {items.map((item) => (
                <motion.div key={item.key} layout="position" {...enter}>
                  {item.node}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Composer */}
          <div
            className={cn(
              "border-t border-canvas-border p-3 transition-opacity duration-500",
              cardVisible && "opacity-40",
            )}
          >
            <div className="flex items-center gap-2">
              <div className="flex h-10 min-w-0 flex-1 items-center overflow-hidden rounded-full border border-canvas-border bg-canvas px-4 text-[13px]">
                {typingText ? (
                  <span className="whitespace-nowrap text-ink">
                    {composerTail(typingText.slice(0, typed))}
                    <span className="demo-caret ml-px inline-block h-4 w-px translate-y-[3px] bg-ink" />
                  </span>
                ) : (
                  <span className="truncate text-ink-faint">Type a message…</span>
                )}
              </div>
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-opacity duration-300",
                  typingText && typed > 0 ? "opacity-100" : "opacity-30",
                )}
              >
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>

        {/* CRM / workflow card — the "useful action" the conversation produced. */}
        <div
          className={cn(
            "absolute inset-x-3 bottom-0 rounded-xl border border-canvas-border bg-canvas-surface p-4 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.75)] transition-[opacity,transform] duration-500 ease-premium sm:inset-x-auto sm:right-5 sm:w-[300px]",
            cardVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-sm font-medium text-ink">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-canvas">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              New lead captured
            </p>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">CRM</span>
          </div>
          <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[12px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] leading-[18px] text-ink-faint">Service</dt>
            <dd className="text-ink-muted">Website development</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] leading-[18px] text-ink-faint">Business</dt>
            <dd className="text-ink-muted">Dental clinic</dd>
            <dt className="font-mono text-[10px] uppercase tracking-[0.12em] leading-[18px] text-ink-faint">Status</dt>
            <dd>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] transition-colors duration-500",
                  ready ? "bg-ink text-canvas" : "border border-canvas-border text-ink-faint",
                )}
              >
                {ready ? (
                  <>
                    <Check className="h-3 w-3" strokeWidth={3} />
                    Ready for follow-up
                  </>
                ) : (
                  <>
                    <span className="demo-dot h-1 w-1 rounded-full bg-ink-faint" />
                    Preparing enquiry
                  </>
                )}
              </span>
            </dd>
          </dl>
        </div>
      </div>
    </DemoFigure>
  );
}
