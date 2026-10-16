import Link from "next/link";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildServiceJsonLd } from "@/lib/seo";
import type { ServiceLanding } from "@/data/service-landings";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import FaqAccordion from "@/components/ui/FaqAccordion";
import CTASection from "@/components/sections/CTASection";
import AiChatDemo from "@/components/sections/hero-demos/AiChatDemo";
import ConnectedSoftwareDemo from "@/components/sections/hero-demos/ConnectedSoftwareDemo";
import { cn } from "@/lib/utils";

const textLink =
  "text-sm font-medium text-ink-muted underline decoration-canvas-border underline-offset-4 transition-colors hover:text-ink";

const heroDemos = {
  "ai-conversation": AiChatDemo,
  "connected-software": ConnectedSoftwareDemo,
} as const;

export default function ServiceLandingPage({ landing }: { landing: ServiceLanding }) {
  const HeroDemo = landing.heroDemo ? heroDemos[landing.heroDemo] : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildServiceJsonLd({
              name: landing.schemaName,
              description: landing.description,
              slug: landing.slug,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqJsonLd(landing.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildBreadcrumbJsonLd([{ name: landing.schemaName, path: landing.path }]),
          ),
        }}
      />

      <section className={cn("pb-20 pt-40 md:pb-28 md:pt-48", HeroDemo && "overflow-x-clip lg:pt-44")}>
        <Container
          className={cn(
            HeroDemo &&
              "grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12 xl:gap-20",
          )}
        >
          <div className="min-w-0">
            <Link href="/#services" className={textLink}>
              Services
            </Link>
            <div className="mt-6">
              <Badge>{landing.badge}</Badge>
            </div>
            <Reveal onMount delay={0.08}>
              <h1
                className={cn(
                  "mt-6 max-w-3xl text-balance font-display text-display-lg font-semibold text-ink",
                  HeroDemo && "lg:text-[clamp(2.75rem,3.6vw,4.25rem)]",
                )}
              >
                {landing.h1}
              </h1>
            </Reveal>
            <Reveal onMount delay={0.16}>
              <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">
                {landing.description}
              </p>
            </Reveal>
            <Reveal onMount delay={0.24} className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href="/contact">{landing.primaryCta}</MagneticButton>
              <Button href={landing.secondaryHref} variant="secondary">
                {landing.secondaryCta}
              </Button>
            </Reveal>
          </div>

          {HeroDemo && (
            <Reveal onMount delay={0.3} className="min-w-0">
              <HeroDemo />
            </Reveal>
          )}
        </Container>
      </section>

      <section className="border-t border-canvas-border py-20 md:py-28">
        <Container>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-soft">Services</p>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl text-balance font-display text-display-md font-semibold text-ink">
              {landing.servicesTitle}
            </h2>
          </Reveal>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-muted">
            {landing.servicesIntro}
          </p>
          <div className="mt-12 divide-y divide-canvas-border border-t border-canvas-border">
            {landing.services.map((service, i) => (
              <Reveal key={service.title} delay={Math.min(i * 0.04, 0.2)}>
                <article className="grid gap-6 py-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-12">
                  <h3 className="text-balance font-display text-2xl font-semibold text-ink">
                    <span className="mb-3 block font-mono text-sm font-normal text-ink-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {service.title}
                  </h3>
                  <div className="space-y-5">
                    <p className="text-balance leading-relaxed text-ink-muted">
                      <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        Problem
                      </span>
                      {service.problem}
                    </p>
                    <p className="text-balance leading-relaxed text-ink-muted">
                      <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        Solution
                      </span>
                      {service.solution}
                    </p>
                    <p className="text-balance leading-relaxed text-ink-muted">
                      <span className="mb-1 block font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                        Benefit
                      </span>
                      {service.benefit}
                    </p>
                    {service.href && service.hrefLabel && (
                      <Link href={service.href} className={textLink}>
                        {service.hrefLabel}
                      </Link>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-canvas-border py-20 md:py-28">
        <Container>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-soft">In practice</p>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl text-balance font-display text-display-md font-semibold text-ink">
              {landing.examplesTitle}
            </h2>
          </Reveal>
          <p className="mt-6 max-w-2xl text-balance leading-relaxed text-ink-muted">
            {landing.examplesIntro}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {landing.examples.map((example) => (
              <article
                key={example.title}
                className="rounded-2xl border border-canvas-border bg-canvas-surface/30 p-6 md:p-8"
              >
                <h3 className="font-display text-xl font-semibold text-ink">{example.title}</h3>
                <p className="mt-3 text-balance leading-relaxed text-ink-muted">{example.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-canvas-border py-20 md:py-28">
        <Container>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-soft">Process</p>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl text-balance font-display text-display-md font-semibold text-ink">
              {landing.processTitle}
            </h2>
          </Reveal>
          <p className="mt-6 max-w-2xl text-balance leading-relaxed text-ink-muted">
            {landing.processIntro}
          </p>
          <ol className="mt-10 divide-y divide-canvas-border border-t border-canvas-border">
            {landing.process.map((step, i) => (
              <li key={step.title} className="grid gap-3 py-8 md:grid-cols-[4rem_1fr] md:gap-8">
                <p className="font-mono text-sm text-ink-faint">{String(i + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-balance leading-relaxed text-ink-muted">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-canvas-border py-20 md:py-28">
        <Container>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-soft">Work</p>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-3xl text-balance font-display text-display-md font-semibold text-ink">
              {landing.workTitle}
            </h2>
          </Reveal>
          <p className="mt-6 max-w-2xl text-balance leading-relaxed text-ink-muted">{landing.workIntro}</p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {landing.projects.map((project) => (
              <article
                key={project.name}
                className="flex flex-col rounded-2xl border border-canvas-border bg-canvas-surface/30 p-6 md:p-8"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-soft">
                  {project.status}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">{project.name}</h3>
                <p className="mt-3 flex-1 text-balance leading-relaxed text-ink-muted">{project.summary}</p>
                <Link href={project.href} className={`mt-6 w-fit ${textLink}`}>
                  {project.linkLabel}
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-canvas-border py-20 md:py-28">
        <Container>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-accent-soft">FAQ</p>
          <h2 className="mt-6 font-display text-display-md font-semibold text-ink">Questions worth answering first</h2>
          <FaqAccordion items={landing.faqs} />
        </Container>
      </section>

      <section className="border-t border-canvas-border py-20 md:py-28">
        <Container>
          <h2 className="font-mono text-sm uppercase tracking-[0.2em] text-accent-soft">Related</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {landing.related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-canvas-border bg-canvas-surface/30 p-6 transition-colors duration-300 hover:border-accent/40"
              >
                <h3 className="font-medium text-ink">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title={landing.finalTitle}
        description={landing.finalDescription}
        cta={landing.primaryCta}
        href="/contact"
      />
    </>
  );
}
