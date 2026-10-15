import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { site } from "@/data/site";
import type { ContactRegion } from "@/data/contact-regions";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import ContactRegionSwitch from "@/components/sections/ContactRegionSwitch";

export default function ContactPageView({ region }: { region: ContactRegion }) {
  const mapQuery = encodeURIComponent(region.location);
  const mapEmbedSrc = `https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`;
  const mapLinkHref = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  return (
    <section className="pb-24 pt-40 md:pb-32 md:pt-48">
      <Container className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Badge>Contact</Badge>
          <Reveal onMount delay={0.08}>
            <h1 className="mt-6 text-balance font-display text-display-lg font-semibold text-ink">
              Let&apos;s find the friction in your business
            </h1>
          </Reveal>
          <Reveal onMount delay={0.16}>
            <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink-muted">
              Tell us a bit about what&apos;s slow, manual, or getting missed. We
              read every message and reply within one business day.
            </p>
          </Reveal>

          <Reveal onMount delay={0.24} className="mt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
              {region.detailsLabel}
            </p>
            <div className="mt-5 space-y-5">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 text-ink-muted transition-colors hover:text-ink"
              >
                <Mail className="h-5 w-5 shrink-0 text-accent-soft" />
                {site.email}
              </a>
              {region.phone && region.phoneHref ? (
                <a
                  href={region.phoneHref}
                  className="flex items-center gap-3 text-ink-muted transition-colors hover:text-ink"
                >
                  <Phone className="h-5 w-5 shrink-0 text-accent-soft" />
                  {region.phone}
                </a>
              ) : null}
              <div className="flex items-start gap-3 text-ink-muted">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent-soft" />
                <span>{region.location}</span>
              </div>
            </div>
            <ContactRegionSwitch active={region.id} />
          </Reveal>

          <Reveal onMount delay={0.32} className="group relative mt-6 overflow-hidden rounded-2xl border border-canvas-border">
            <iframe
              src={mapEmbedSrc}
              title={region.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
              className="h-52 w-full invert-[0.92] hue-rotate-180 transition-[filter] duration-500 group-hover:invert-0 group-hover:hue-rotate-0"
            />
            <a
              href={mapLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-canvas-border bg-canvas/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-muted backdrop-blur-sm transition-colors hover:text-ink"
            >
              Open in Maps
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </Reveal>
        </div>

        <Reveal onMount delay={0.12} className="relative rounded-3xl border border-canvas-border bg-canvas-surface/40 p-8 md:p-10">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
