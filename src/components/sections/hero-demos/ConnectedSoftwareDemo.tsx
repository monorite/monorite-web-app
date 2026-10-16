"use client";

import { Bell, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import DemoFigure from "./DemoFigure";
import { useDemoTimeline } from "./useDemoTimeline";

/**
 * Business Software hero: one enquiry travels through connected software —
 * website form → management dashboard → staff mobile app → status update.
 *
 * Every screen is an original conceptual mockup for a fictional home-services
 * business ("Brightline"); none of it is a deployed Monorite product, and the
 * figure caption says so. Only transform and opacity animate; every element
 * keeps its box, so the composition never shifts layout.
 */

const S = {
  form: 0,
  sending: 1,
  sent: 2,
  record: 3,
  notify: 4,
  accept: 5,
  progress: 6,
  hold: 7,
} as const;

const DURATIONS = [1300, 800, 1000, 1500, 1400, 1000, 1200, 6500] as const;

const ease = "transition-[opacity,transform] duration-500 ease-premium";

const existingRows = [
  { name: "Kiran M.", service: "Plumbing", status: "Scheduled" },
  { name: "Sam T.", service: "Electrical", status: "Assigned" },
  { name: "Meera P.", service: "AC repair", status: "Completed" },
  { name: "Joseph D.", service: "Painting", status: "Quoted" },
];

const phases = ["Customer enquires", "Record created", "Team notified", "Job in progress"];

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex h-6 items-center gap-1 border-b border-canvas-border px-2.5 sm:h-7">
      <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
      <span className="h-1.5 w-1.5 rounded-full bg-ink/15" />
      <span className="ml-2 truncate rounded-full bg-ink/[0.05] px-2 py-0.5 font-mono text-[8.5px] text-ink-faint sm:text-[9px]">
        {label}
      </span>
    </div>
  );
}

function StatusPill({ children, strong }: { children: React.ReactNode; strong?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 whitespace-nowrap rounded-full px-1.5 py-px text-[9px] sm:px-2 sm:text-[10px]",
        strong ? "bg-ink text-canvas" : "border border-canvas-border text-ink-faint",
      )}
    >
      {children}
    </span>
  );
}

export default function ConnectedSoftwareDemo() {
  const { ref, step, reduced, control, toggle } = useDemoTimeline<HTMLElement>(DURATIONS);

  const sending = step === S.sending;
  const sent = step >= S.sent;
  const recorded = step >= S.record;
  const notified = step >= S.notify;
  const accepted = step >= S.accept;
  const inProgress = step >= S.progress;
  const highlightRow = step >= S.record && step < S.hold;

  const phase = step <= S.sent ? 0 : step === S.record ? 1 : step <= S.accept ? 2 : 3;

  return (
    <DemoFigure
      ref={ref}
      caption="Illustrative mockup · fictional business"
      captionShort="Illustrative mockup"
      description="Illustrative mockup of connected business software for a fictional home-services company. A customer sends a service enquiry from the website. The enquiry appears as a new record in the management dashboard, a technician gets a notification on the mobile app and accepts the job, and the dashboard status changes to in progress."
      control={control}
      onToggle={toggle}
      reduced={reduced}
    >
      <div className="relative h-[380px] sm:h-[470px]">
        {/* ── Desktop management dashboard (anchor) ───────────────────── */}
        <div className="absolute right-0 top-0 w-[94%] overflow-hidden rounded-xl border border-canvas-border bg-canvas-soft shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:w-[88%]">
          <Chrome label="ops.brightline.example/enquiries" />
          <div className="flex">
            <div className="hidden w-[100px] shrink-0 flex-col gap-0.5 border-r border-canvas-border p-2.5 sm:flex">
              <p className="mb-2 px-1.5 text-[11px] font-semibold text-ink">Brightline</p>
              {["Enquiries", "Jobs", "Customers", "Team", "Invoices"].map((item, i) => (
                <span
                  key={item}
                  className={cn(
                    "rounded-md px-1.5 py-1 text-[10px]",
                    i === 0 ? "bg-canvas-surface text-ink" : "text-ink-faint",
                  )}
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="min-w-0 flex-1 p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-medium text-ink sm:text-[13px]">Enquiries</p>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.14em] text-ink-faint">Today</span>
              </div>

              <div className="mt-3 hidden grid-cols-3 gap-2 sm:grid">
                {[
                  { label: "Open", before: "8", after: "9", changes: recorded },
                  { label: "In progress", before: "5", after: "6", changes: inProgress },
                  { label: "First reply", before: "11 min", after: "11 min", changes: false },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-lg bg-canvas p-2">
                    <p className="truncate font-mono text-[8px] uppercase tracking-[0.12em] text-ink-faint">
                      {kpi.label}
                    </p>
                    <p className="relative mt-1 h-6 overflow-hidden font-display text-lg font-semibold leading-6 text-ink">
                      <span className={cn("absolute inset-0", ease, kpi.changes ? "-translate-y-full opacity-0" : "")}>
                        {kpi.before}
                      </span>
                      <span className={cn("absolute inset-0", ease, kpi.changes ? "" : "translate-y-full opacity-0")}>
                        {kpi.after}
                      </span>
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-2.5 grid grid-cols-[1.2fr_1fr_auto] gap-2 border-b border-canvas-border pb-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink-faint sm:mt-3">
                <span>Customer</span>
                <span>Service</span>
                <span className="w-[74px] text-right sm:w-[84px]">Status</span>
              </div>

              {/* Fixed-height clip: the list slides down one row to make room
                  for the new record, pushing the oldest row out of view. */}
              <div className="relative h-[128px] overflow-hidden sm:h-[144px]">
                <div className={cn(ease, "duration-700", recorded ? "translate-y-0" : "-translate-y-8 sm:-translate-y-9")}>
                  <div
                    className={cn(
                      "grid h-8 grid-cols-[1.2fr_1fr_auto] items-center gap-2 rounded-md border-b border-canvas-border text-[10.5px] transition-[opacity,background-color] duration-700 sm:h-9 sm:text-[11px]",
                      recorded ? "opacity-100" : "opacity-0",
                      highlightRow ? "bg-ink/[0.06]" : "bg-transparent",
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-1.5 truncate pl-1 text-ink">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full bg-ink transition-opacity duration-500",
                          inProgress ? "opacity-0" : "opacity-100",
                        )}
                      />
                      Ananya R.
                    </span>
                    <span className="truncate text-ink-muted">AC service</span>
                    <span className="flex w-[74px] justify-end sm:w-[84px]">
                      {inProgress ? (
                        <StatusPill strong>In progress</StatusPill>
                      ) : notified ? (
                        <StatusPill>Assigned</StatusPill>
                      ) : (
                        <StatusPill strong>New</StatusPill>
                      )}
                    </span>
                  </div>
                  {existingRows.map((row) => (
                    <div
                      key={row.name}
                      className="grid h-8 grid-cols-[1.2fr_1fr_auto] items-center gap-2 border-b border-canvas-border text-[10.5px] sm:h-9 sm:text-[11px]"
                    >
                      <span className="truncate pl-1 text-ink-muted">{row.name}</span>
                      <span className="truncate text-ink-faint">{row.service}</span>
                      <span className="flex w-[74px] justify-end sm:w-[84px]">
                        <StatusPill>{row.status}</StatusPill>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Customer-facing website form ────────────────────────────── */}
        <div className="absolute bottom-0 left-0 w-[60%] overflow-hidden rounded-xl border border-canvas-border bg-canvas shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] sm:w-[46%]">
          <Chrome label="brightline.example" />
          <div className="p-3 sm:p-3.5">
            <p className="text-[12px] font-medium text-ink sm:text-[13px]">Book a service</p>
            <div className="mt-2.5 grid">
              <div
                className={cn(
                  "[grid-area:1/1]",
                  ease,
                  sent ? "pointer-events-none -translate-y-1 opacity-0" : "opacity-100",
                )}
              >
                <div className="space-y-1.5">
                  {[
                    { label: "Name", value: "Ananya R." },
                    { label: "Service", value: "AC service" },
                    { label: "Preferred time", value: "Sat · 10:00 AM", desktopOnly: true },
                  ].map((f) => (
                    <div key={f.label} className={cn(f.desktopOnly && "hidden sm:block")}>
                      <p className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink-faint sm:text-[8px]">
                        {f.label}
                      </p>
                      <p className="mt-0.5 truncate rounded-md border border-canvas-border bg-canvas-soft px-2 py-1 text-[10.5px] text-ink-muted sm:text-[11px]">
                        {f.value}
                      </p>
                    </div>
                  ))}
                </div>
                <p
                  className={cn(
                    "mt-2.5 rounded-full bg-ink py-1.5 text-center text-[10.5px] font-medium text-canvas transition-transform duration-200 sm:text-[11px]",
                    sending && "scale-[0.97]",
                  )}
                >
                  {sending ? "Sending…" : "Send enquiry"}
                </p>
              </div>

              <div
                className={cn(
                  "flex flex-col items-start justify-center [grid-area:1/1]",
                  ease,
                  sent ? "opacity-100" : "translate-y-2 opacity-0",
                )}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-canvas">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <p className="mt-2.5 text-[12px] font-medium text-ink sm:text-[13px]">Enquiry received</p>
                <p className="mt-1 text-[10.5px] leading-relaxed text-ink-muted sm:text-[11px]">
                  Thanks, Ananya. The team will confirm your Saturday slot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Staff mobile app ────────────────────────────────────────── */}
        <div className="absolute bottom-0 right-0 w-[34%] max-w-[150px] rounded-[22px] border border-canvas-border bg-canvas p-1.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.8)] sm:right-[1%] sm:w-[22%] sm:min-w-[124px]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[17px] bg-canvas-soft">
            <div className="flex items-center justify-between px-3 pt-2 font-mono text-[7.5px] text-ink-faint">
              <span>9:41</span>
              <span className="h-1 w-6 rounded-full bg-ink/20" />
            </div>
            <div className="px-2.5 pt-2.5">
              <p className="text-[11px] font-semibold text-ink">My jobs</p>
              <p className="font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink-faint">Ravi · Technician</p>
            </div>
            <div className="mt-2 space-y-1.5 px-2">
              {[
                { t: "Plumbing", w: "Kiran M. · 2:30 PM" },
                { t: "Electrical", w: "Sam T. · 4:00 PM" },
                { t: "AC repair", w: "Meera P. · Done" },
              ].map((job) => (
                <div key={job.t} className="rounded-lg bg-canvas p-1.5">
                  <p className="text-[9px] font-medium text-ink-muted">{job.t}</p>
                  <p className="truncate text-[8px] text-ink-faint">{job.w}</p>
                </div>
              ))}
            </div>

            {/* Notification → accepted job */}
            <div
              className={cn(
                "absolute inset-x-1.5 top-6 rounded-xl border border-canvas-border bg-canvas-surface p-2 shadow-[0_12px_24px_-12px_rgba(0,0,0,0.7)]",
                ease,
                notified ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
              )}
            >
              <p className="flex items-center gap-1 font-mono text-[7.5px] uppercase tracking-[0.12em] text-ink-faint">
                <Bell className="h-2.5 w-2.5" />
                New job
              </p>
              <p className="mt-1 text-[10px] font-medium leading-tight text-ink">AC service</p>
              <p className="truncate text-[8.5px] text-ink-muted">Ananya R. · Sat 10:00</p>
              <p
                className={cn(
                  "mt-1.5 flex items-center justify-center gap-1 rounded-full py-1 text-[8.5px] font-medium transition-colors duration-300",
                  accepted ? "bg-ink text-canvas" : "border border-ink/30 text-ink",
                )}
              >
                {accepted ? (
                  <>
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    Accepted
                  </>
                ) : (
                  "Accept job"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Story rail: Customer experience → Connected application → Organized workflow */}
      <ol className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {phases.map((label, i) => {
          const done = i < phase || step === S.hold;
          const active = i === phase && step !== S.hold;
          return (
            <li key={label} className="min-w-0">
              <span className="block h-px w-full overflow-hidden bg-canvas-border">
                <span
                  className={cn(
                    "block h-full origin-left bg-ink transition-transform duration-700 ease-premium",
                    done || active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
              <span
                className={cn(
                  "mt-2 block truncate font-mono text-[9.5px] uppercase tracking-[0.12em] transition-colors duration-500",
                  active ? "text-ink" : done ? "text-ink-muted" : "text-ink-faint",
                )}
              >
                {String(i + 1).padStart(2, "0")} {label}
              </span>
            </li>
          );
        })}
      </ol>
    </DemoFigure>
  );
}
