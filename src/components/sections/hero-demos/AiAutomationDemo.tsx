"use client";

import { useEffect } from "react";
import { ArrowDown, Bell, Check, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoFigure from "./DemoFigure";
import { MODE_STAGE, useDemoTimeline, type ModeDemoProps } from "./useDemoTimeline";

/**
 * AI Solutions → "Automation" mode.
 *
 * The next stage of the same kind of enquiry: an unstructured message is
 * organised into a job record, a follow-up task is prepared and the team is
 * notified, with no details re-typed by hand. Conceptual: no CRM, messaging
 * or scheduling product is connected; every record shown is fictional.
 * Only opacity and transform animate inside a fixed-height stage.
 */

const S = { enquiry: 0, record: 1, fields: 2, task: 3, notify: 4, ready: 5, hold: 6 } as const;
const DURATIONS = [1300, 900, 1500, 1300, 1300, 1000, 6500] as const;

const ease = "transition-[opacity,transform] duration-500 ease-premium";

const FIELDS = [
  ["Customer", "Dana K."],
  ["Service", "AC repair"],
  ["Location", "Sunshine North"],
  ["Issue", "Not cooling"],
] as const;

function StatusPill({ step }: { step: number }) {
  const label = step >= S.ready ? "Ready for follow-up" : step >= S.fields ? "Organised" : "New";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-[10.5px] transition-colors duration-500",
        step >= S.ready ? "bg-ink text-canvas" : "border border-canvas-border text-ink-muted",
      )}
    >
      {step >= S.ready && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
      {label}
    </span>
  );
}

export default function AiAutomationDemo({ entry, onControlChange }: ModeDemoProps) {
  const { ref, step, reduced, control, toggle } = useDemoTimeline<HTMLElement>(DURATIONS, {
    maxPlays: 2,
    entry,
  });
  useEffect(() => onControlChange?.(control), [control, onControlChange]);

  const recorded = step >= S.record;
  const filled = step >= S.fields;
  const tasked = step >= S.task;
  const notified = step >= S.notify;

  const automated = [
    { label: "Details copied", done: filled },
    { label: "Task created", done: tasked },
    { label: "Team notified", done: notified },
  ];

  return (
    <DemoFigure
      ref={ref}
      caption="Illustrative demo · not a live integration"
      captionShort="Illustrative demo"
      note="Concept of a workflow we build around the tools you already use."
      description="Illustrative demo of workflow automation for a fictional trades business. A new website enquiry arrives as a plain message: the air-con is running but not cooling, in Sunshine North, from Dana. The details are organised into a job record: customer, Dana K.; service, AC repair; location, Sunshine North; issue, not cooling. A follow-up task is prepared to call Dana today, the team is notified, and the record status changes to ready for follow-up, without the details being typed in again by hand."
      control={control}
      onToggle={toggle}
      reduced={reduced}
    >
      <div className={cn(MODE_STAGE, "flex flex-col gap-2 sm:gap-2.5")}>
        {/* 1. Unstructured enquiry */}
        <div className="rounded-xl border border-canvas-border bg-canvas-soft p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-faint">
              <Inbox className="h-3 w-3" />
              New enquiry · Website form
            </p>
            <span className="font-mono text-[9px] tabular-nums text-ink-faint">2:41 pm</span>
          </div>
          <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink-muted">
            “Hi, our aircon is running but not cooling. We’re in Sunshine North. Can someone call me? – Dana”
          </p>
        </div>

        <p
          className={cn(
            "flex items-center justify-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.14em] transition-colors duration-500",
            recorded ? "text-ink-muted" : "text-ink-faint/60",
          )}
        >
          <ArrowDown className="h-3 w-3" />
          Details organised automatically
        </p>

        {/* 2. Structured job record */}
        <div
          className={cn(
            "rounded-xl border border-canvas-border bg-canvas-soft p-3 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.8)]",
            ease,
            recorded ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-[12.5px] font-medium text-ink">
              Job record <span className="font-mono text-[10px] text-ink-faint">#1042</span>
            </p>
            <StatusPill step={step} />
          </div>
          <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-2">
            {FIELDS.map(([k, v], i) => (
              <div key={k} className="min-w-0">
                <dt className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">{k}</dt>
                <dd className="relative mt-0.5 h-[18px] text-[12px]">
                  <span
                    className={cn("absolute inset-y-[4px] left-0 w-3/4 rounded-full bg-ink/[0.07]", ease, filled && "opacity-0")}
                  />
                  <span
                    className={cn("absolute inset-0 truncate text-ink-muted", ease, filled ? "opacity-100" : "opacity-0")}
                    style={{ transitionDelay: filled ? `${i * 160}ms` : "0ms" }}
                  >
                    {v}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* 3. Follow-up task + team notification */}
        <div className="grid gap-2 sm:grid-cols-2 sm:gap-2.5">
          <div
            className={cn(
              "flex items-start gap-2.5 rounded-xl border border-canvas-border bg-canvas p-3",
              ease,
              tasked ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <span className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[4px] border border-ink/40" />
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">Follow-up task</p>
              <p className="mt-0.5 truncate text-[12.5px] text-ink">Call Dana about the AC repair</p>
              <p className="mt-0.5 truncate text-[10.5px] text-ink-faint">Due today, 4:00 pm · Office team</p>
            </div>
          </div>
          <div
            className={cn(
              "rounded-xl border border-canvas-border bg-canvas-surface p-3",
              ease,
              notified ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            )}
          >
            <p className="flex items-center gap-1.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-ink-faint">
              <Bell className="h-3 w-3" />
              Team notified
            </p>
            <p className="mt-0.5 truncate text-[12.5px] text-ink">New AC repair job · Sunshine North</p>
            <p className="mt-0.5 truncate text-[10.5px] text-ink-faint">Follow-up task due today</p>
          </div>
        </div>

        {/* 4. What no one had to do by hand */}
        <ul className="mt-auto grid grid-cols-3 gap-2">
          {automated.map((a) => (
            <li
              key={a.label}
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-[10.5px] transition-colors duration-500",
                a.done ? "border-ink/20 text-ink-muted" : "border-canvas-border text-ink-faint",
              )}
            >
              <span
                className={cn(
                  "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                  a.done ? "bg-ink text-canvas" : "border border-canvas-border",
                )}
              >
                {a.done && <Check className="h-2 w-2" strokeWidth={3.5} />}
              </span>
              <span className="truncate">{a.label}</span>
            </li>
          ))}
        </ul>

      </div>
    </DemoFigure>
  );
}
