import Image from "next/image";
import Link from "next/link";
import hero from "../../../public/images/hero.png";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { SocialLinks } from "@/components/ui/social-links";
import { ArrowRight, MapPin } from "@/components/ui/icons";
import { site } from "@/data/site";

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

      <Container className="relative py-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-line bg-card/70 px-3.5 py-1.5 font-mono text-xs tracking-[0.15em] text-accent uppercase">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-accent"
              />
              {site.role}
            </span>

            <h1
              id="hero-title"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Building thoughtful Web experiences with{" "}
              <span className="text-accent">Modern technology</span>
            </h1>

            <p className="max-w-xl text-sm text-muted sm:text-base">
              I&apos;m {site.name}. {site.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects" className={buttonClasses("primary", "lg")}>
                Projects
                <ArrowRight />
              </Link>
              <Link
                href="/contact"
                className={buttonClasses("secondary", "lg")}
              >
                Get in Touch
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <p className="inline-flex items-center gap-2 text-xs text-muted">
                <MapPin className="h-4 w-4 text-accent" />
                {site.location}
              </p>
              <SocialLinks />
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="overflow-hidden rounded-card border border-line bg-card/60">
              <Image
                src={hero}
                alt={`Portrait of ${site.name}`}
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 24rem, 32rem"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
