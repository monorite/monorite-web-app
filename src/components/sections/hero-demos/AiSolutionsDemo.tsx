"use client";

import { useCallback, useId, useRef, useState } from "react";
import { MessageSquare, Phone, Workflow } from "lucide-react";
import { cn } from "@/lib/utils";
import AiChatDemo from "./AiChatDemo";
import AiVoiceDemo from "./AiVoiceDemo";
import AiAutomationDemo from "./AiAutomationDemo";
import type { DemoControl, DemoEntry } from "./useDemoTimeline";

/**
 * AI Solutions hero: one fictional trades business, one kind of enquiry
 * (an AC repair in Sunshine North), shown three ways — a website chatbot, a
 * voice agent, and the automation that organises the follow-up. Each mode is
 * a separate illustrative path, not one customer using all three channels.
 *
 * Only the selected mode is mounted, so two animations never run at once.
 * Switching modes:
 *  - the page loads on Chatbot, server-rendered in its finished state
 *    (readable without JS or with reduced motion), then plays as before;
 *  - choosing a mode plays it once and rests on its finished state;
 *  - if the visitor had paused, the chosen mode opens finished, with Replay,
 *    so a pause is never undone by switching tabs;
 *  - re-selecting the current mode does nothing.
 *
 * Tabs follow the WAI-ARIA tabs pattern with automatic activation:
 * Left/Right (and Up/Down) move between modes, Home/End jump to the ends.
 */

const MODES = [
  { id: "chatbot", label: "Chatbot", icon: MessageSquare, Demo: AiChatDemo },
  { id: "voice", label: "Voice Agent", icon: Phone, Demo: AiVoiceDemo },
  { id: "automation", label: "Automation", icon: Workflow, Demo: AiAutomationDemo },
] as const;

type ModeId = (typeof MODES)[number]["id"];

export default function AiSolutionsDemo() {
  const baseId = useId();
  const [active, setActive] = useState<ModeId>("chatbot");
  const [entry, setEntry] = useState<DemoEntry>("auto");
  const controlRef = useRef<DemoControl>("pause");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onControlChange = useCallback((c: DemoControl) => {
    controlRef.current = c;
  }, []);

  const select = (id: ModeId) => {
    if (id === active) return;
    setEntry(controlRef.current === "play" ? "static" : "play");
    setActive(id);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = MODES.findIndex((m) => m.id === active);
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % MODES.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + MODES.length) % MODES.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = MODES.length - 1;
    const target = MODES[next];
    if (!target) return;
    e.preventDefault();
    select(target.id);
    tabRefs.current[next]?.focus();
  };

  const current = MODES.find((m) => m.id === active) ?? MODES[0];
  const ActiveDemo = current.Demo;

  return (
    <div className="w-full min-w-0">
      <div
        role="tablist"
        aria-label="AI service demos"
        onKeyDown={onKeyDown}
        className="mb-4 grid w-full grid-cols-3 gap-1 rounded-full border border-canvas-border bg-white/[0.03] p-1 sm:inline-grid sm:w-auto"
      >
        {MODES.map((m, i) => {
          const selected = m.id === active;
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${m.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(m.id)}
              className={cn(
                "inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-3 text-[13px] font-medium transition-colors duration-300 ease-premium sm:px-4",
                selected ? "bg-ink text-canvas" : "text-ink-muted hover:bg-white/5 hover:text-ink",
              )}
            >
              <Icon className="hidden h-3.5 w-3.5 sm:block" aria-hidden="true" />
              {m.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="demo-mode-enter"
        key={active}
      >
        <ActiveDemo entry={entry} onControlChange={onControlChange} />
      </div>
    </div>
  );
}
