import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { site } from "@/data/site";

const stackPrimary = ["Next.js", "React", "TypeScript"];
const stackSecondary = ["Node.js", "Express", "MongoDB"];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-line/70"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-accent/10 blur-3xl"
      />

      <Container className="relative py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-6">
            <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-card/70 px-3.5 py-1.5 font-mono text-xs tracking-[0.15em] text-accent uppercase">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              {site.role}
            </span>

            <h1
              id="hero-title"
              className="text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Building thoughtful web experiences with{" "}
              <span className="text-accent">modern technology</span>
            </h1>

            <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              I&apos;m {site.name}. {site.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects" className={buttonClasses("primary", "lg")}>
                Explore Projects
                <ArrowRight />
              </Link>
              <Link href="/contact" className={buttonClasses("secondary", "lg")}>
                Get in Touch
              </Link>
            </div>

            <div className="flex flex-col gap-4 pt-2">
              <p className="inline-flex items-center gap-2 text-xs text-muted">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </p>
              <SocialLinks />
            </div>
          </div>

          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}

/** Typographic/technical visual — no profile photo is required. */
function HeroVisual() {
  return (
    <div className="relative">
      <div className="rounded-card border border-line bg-card/80 p-5 shadow-2xl shadow-black/30 sm:p-6">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <span aria-hidden className="h-3 w-3 rounded-full bg-accent/70" />
          <span aria-hidden className="h-3 w-3 rounded-full bg-line" />
          <span aria-hidden className="h-3 w-3 rounded-full bg-line" />
          <span className="ml-2 font-mono text-xs text-muted">
            samrat@portfolio
          </span>
        </div>

        <dl className="mt-5 space-y-5 font-mono text-xs leading-relaxed sm:text-sm">
          <div>
            <dt className="text-muted">
              <span className="text-accent">$</span> whoami
            </dt>
            <dd className="mt-1 text-foreground">
              {site.name} — {site.role}
            </dd>
          </div>

          <div>
            <dt className="text-muted">
              <span className="text-accent">$</span> stack --primary
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {stackPrimary.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-accent"
                >
                  {item}
                </span>
              ))}
            </dd>
            <dd className="mt-2 flex flex-wrap gap-2">
              {stackSecondary.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line px-2 py-1 text-muted"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="text-muted">
              <span className="text-accent">$</span> status
            </dt>
            <dd className="mt-1 text-foreground">{site.availability}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
