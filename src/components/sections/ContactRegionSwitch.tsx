"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CONTACT_REGION_COOKIE,
  CONTACT_REGION_MAX_AGE,
  contactRegionList,
  type ContactRegionId,
} from "@/data/contact-regions";
import { cn } from "@/lib/utils";

function rememberContactRegion(region: ContactRegionId) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONTACT_REGION_COOKIE}=${region}; Path=/; Max-Age=${CONTACT_REGION_MAX_AGE}; SameSite=Lax${secure}`;
}

/** Crawlable links to both contact URLs. Choosing one stores the
 * selection so a later visit to /contact keeps that country. */
export default function ContactRegionSwitch({ active }: { active: ContactRegionId }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Contact country" className="mt-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        Contact details for
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {contactRegionList.map((region) => {
          const selected = region.id === active;
          return (
            <Link
              key={region.id}
              href={region.path}
              onClick={() => rememberContactRegion(region.id)}
              aria-current={pathname === region.path ? "page" : undefined}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors",
                selected
                  ? "border-ink/40 bg-canvas-surface text-ink"
                  : "border-canvas-border text-ink-muted hover:text-ink",
              )}
            >
              {region.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
