"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoFigure from "./DemoFigure";
import { MODE_STAGE, useDemoTimeline, type ModeDemoProps } from "./useDemoTimeline";

/**
 * AI Solutions → "Chatbot" mode.
 *
 * A chat assistant embedded in a fictional trades business's OWN website
 * (Northside Cooling & Electrical), collecting an AC-repair enquiry and
 * turning it into a service request. Illustrative only: the business,
 * customer and result card are invented, and the caption says so.
 */

const MSG = [
  "Hi, I need an AC repair.",
  "Sunshine North.",
  "It's running but not cooling.",
] as const;
const REPLY = [
  "I can help with that. Which suburb is the property in?",
  "Thanks. Is the unit not cooling, or is there another issue?",
  "Got it. I can prepare a service request for the team.",
] as const;

const TYPE_MS = 32;

const S = {
  site: 0,
  open: 1,
  type1: 2,
  sent1: 3,
  think1: 4,
  reply1: 5,
  type2: 6,
  sent2: 7,
  think2: 8,
  reply2: 9,
  type3: 10,
  sent3: 11,
  think3: 12,
  reply3: 13,
  preparing: 14,
  ready: 15,
  hold: 16,
} as const;

const DURATIONS = [
  900, // site
  650, // open
  MSG[0].length * TYPE_MS + 380,
  280,
  850,
  1400,
  MSG[1].length * TYPE_MS + 380,
  280,
  850,
  1500,
  MSG[2].length * TYPE_MS + 380,
  280,
  850,
  1300,
  900, // preparing
  900, // ready
  6500, // hold — also the first thing a visitor sees
] as const;

const TYPE_STEPS: Record<number, string> = { [S.type1]: MSG[0], [S.type2]: MSG[1], [S.type3]: MSG[2] };

const enter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
} as const;

function composerTail(text: string, max = 28) {
  return text.length > max ? `…${text.slice(-(max - 1))}` : text;
}

function Bubble({ from, children }: { from: "customer" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", from === "customer" ? "justify-end" : "justify-start")}>
      <p
        className={cn(
          "max-w-[86%] rounded-2xl px-3 py-2 text-[12.5px] leading-relaxed",
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
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-canvas-surface px-3.5 py-3">
        <span className="demo-dot h-1.5 w-1.5 rounded-full bg-ink-faint" />
        <span className="demo-dot h-1.5 w-1.5 rounded-full bg-ink-faint [animation-delay:0.15s]" />
        <span className="demo-dot h-1.5 w-1.5 rounded-full bg-ink-faint [animation-delay:0.3s]" />
      </div>
    </div>
  );
}

function RequestCard({ ready }: { ready: boolean }) {
  return (
    <div className="rounded-xl border border-canvas-border bg-canvas p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[12.5px] font-medium text-ink">
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ink text-canvas">
            <Check className="h-2.5 w-2.5" strokeWidth={3} />
          </span>
          Service request
        </p>
        <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">For the team</span>
      </div>
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-[11.5px]">
        {[
          ["Service", "AC repair"],
          ["Location", "Sunshine North"],
          ["Issue", "Not cooling"],
        ].map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="font-mono text-[9px] uppercase leading-[17px] tracking-[0.12em] text-ink-faint">{k}</dt>
            <dd className="text-ink-muted">{v}</dd>
          </div>
        ))}
        <dt className="font-mono text-[9px] uppercase leading-[17px] tracking-[0.12em] text-ink-faint">Status</dt>
        <dd>
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-px text-[10.5px] transition-colors duration-500",
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
        </dd>
      </dl>
    </div>
  );
}

export default function AiChatDemo({ entry, onControlChange }: ModeDemoProps) {
  const { ref, step, running, reduced, control, toggle } = useDemoTimeline<HTMLElement>(DURATIONS, {
    maxPlays: 2,
    entry,
  });
  useEffect(() => onControlChange?.(control), [control, onControlChange]);

  // Progressive typing in the composer during the "type" steps.
  const typingText = TYPE_STEPS[step] ?? null;
  const [typed, setTyped] = useState(0);
  useEffect(() => setTyped(0), [step]);
  useEffect(() => {
    if (!typingText || !running) return;
    const id = window.setInterval(() => {
      setTyped((n) => (n >= typingText.length ? n : n + 1));
    }, TYPE_MS);
    return () => window.clearInterval(id);
  }, [typingText, running]);

  const open = step >= S.open;
  const items: { key: string; node: React.ReactNode }[] = [];
  const pushPair = (i: 0 | 1 | 2, sent: number, think: number, reply: number) => {
    if (step >= sent) items.push({ key: `m${i}`, node: <Bubble from="customer">{MSG[i]}</Bubble> });
    if (step === think) items.push({ key: `t${i}`, node: <Thinking /> });
    if (step >= reply) items.push({ key: `r${i}`, node: <Bubble from="assistant">{REPLY[i]}</Bubble> });
  };
  pushPair(0, S.sent1, S.think1, S.reply1);
  pushPair(1, S.sent2, S.think2, S.reply2);
  pushPair(2, S.sent3, S.think3, S.reply3);
  if (step >= S.preparing) items.push({ key: "card", node: <RequestCard ready={step >= S.ready} /> });

  return (
    <DemoFigure
      ref={ref}
      caption="Illustrative demo · not a live integration"
      captionShort="Illustrative demo"
      note={
        <>
          Concept for your own website. A working example runs on{" "}
          <Link href="/" className="text-ink underline decoration-canvas-border underline-offset-4 hover:decoration-ink">
            our homepage
          </Link>
          .
        </>
      }
      description="Illustrative demo of an AI chatbot on a fictional trades business website, Northside Cooling and Electrical. A customer asks for an AC repair. The chatbot asks which suburb the property is in; the customer says Sunshine North. It asks whether the unit is not cooling or has another issue; the customer says it is running but not cooling. The chatbot prepares a service request for the team: service, AC repair; location, Sunshine North; issue, not cooling; status, ready for follow-up."
      control={control}
      onToggle={toggle}
      reduced={reduced}
    >
      <div className={MODE_STAGE}>
        {/* The client's own website */}
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-canvas-border bg-canvas shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]">
          <div className="flex h-7 items-center gap-1 border-b border-canvas-border px-3">
            <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
            <span className="ml-2 truncate rounded-full bg-ink/[0.05] px-2 py-0.5 font-mono text-[9px] text-ink-faint">
              northsidecooling.example
            </span>
          </div>
          <div className="flex items-center justify-between px-4 py-2.5">
            <span className="text-[12px] font-semibold text-ink">Northside</span>
            <span className="hidden gap-4 text-[10.5px] text-ink-faint sm:flex">
              <span>Services</span>
              <span>Areas</span>
              <span>Contact</span>
            </span>
            <span className="rounded-full border border-canvas-border px-2.5 py-1 text-[10px] text-ink-muted">
              Book a service
            </span>
          </div>
          <div className="px-4 pt-5 sm:max-w-[46%]">
            <p className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">
              Air-con &amp; electrical · Northern suburbs
            </p>
            <p className="mt-2 font-display text-[19px] font-semibold leading-tight text-ink sm:text-[21px]">
              AC repairs and electrical work, done properly.
            </p>
            <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
              Tell us what is wrong and the team will call you back.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["AC repair", "Split systems", "Electrical"].map((c) => (
                <span key={c} className="rounded-full bg-canvas-surface px-2 py-0.5 text-[10px] text-ink-faint">
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-5 hidden space-y-2 sm:block">
              <span className="block h-2 w-4/5 rounded-full bg-ink/[0.06]" />
              <span className="block h-2 w-3/5 rounded-full bg-ink/[0.06]" />
              <span className="block h-2 w-2/3 rounded-full bg-ink/[0.06]" />
            </div>
          </div>
        </div>

        {/* Chat launcher (before the chat opens) */}
        <span
          className={cn(
            "absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[11px] font-medium text-canvas shadow-[0_12px_30px_-12px_rgba(0,0,0,0.7)] transition-[opacity,transform] duration-300 ease-premium",
            open ? "pointer-events-none scale-90 opacity-0" : "opacity-100",
          )}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Chat with us
        </span>

        {/* Embedded chat widget */}
        <div
          className={cn(
            "absolute bottom-3 right-3 top-[76px] flex w-[calc(100%-24px)] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-canvas-border bg-canvas-soft shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] transition-[opacity,transform] duration-500 ease-premium sm:top-[68px] sm:w-[300px]",
            open ? "scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-95 opacity-0",
          )}
        >
          <div className="flex items-center gap-2.5 border-b border-canvas-border px-3.5 py-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink font-mono text-[10px] font-bold text-canvas">
              N
            </span>
            <div className="min-w-0">
              <p className="truncate text-[12.5px] font-medium text-ink">Northside assistant</p>
              <p className="text-[10px] text-ink-faint">AI assistant · a person follows up</p>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col justify-end gap-2.5 overflow-hidden px-3 pb-3 pt-3 [mask-image:linear-gradient(to_bottom,transparent,black_16%)]">
            {items.length === 0 && (
              <p className="pb-4 text-center font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink-faint">
                Ask about a repair or a booking
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

          <div className="border-t border-canvas-border p-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 min-w-0 flex-1 items-center overflow-hidden rounded-full border border-canvas-border bg-canvas px-3.5 text-[12px]">
                {typingText ? (
                  <span className="whitespace-nowrap text-ink">
                    {composerTail(typingText.slice(0, typed))}
                    <span className="demo-caret ml-px inline-block h-3.5 w-px translate-y-[2px] bg-ink" />
                  </span>
                ) : (
                  <span className="truncate text-ink-faint">Type a message…</span>
                )}
              </div>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-canvas transition-opacity duration-300",
                  typingText && typed > 0 ? "opacity-100" : "opacity-30",
                )}
              >
                <ArrowUp className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </DemoFigure>
  );
}
