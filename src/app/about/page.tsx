import type { Metadata } from "next";
import Image from "next/image";
import hero from "../../../public/images/hero.png";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { HeroVisual } from "@/components/ui/HeroVisual";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight, MapPin, Sparkle } from "@/components/ui/icons";
import { Process } from "@/components/sections/process";
import { Education } from "@/components/sections/education";
import { aboutCards, site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} - a practical, user-focused web developer working with React, Next.js, TypeScript, Node.js and MongoDB.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Container className="flex flex-col lg:flex-row justify-between py-8 gap-6">
        <PageHeader
          eyebrow="About"
          title={`Hi, I'm ${site.name}, an AI-driven web application engineer`}
          description={site.shortBio}
        >
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              {site.location}
            </span>
            <span className="inline-flex items-center gap-2">
              <Sparkle className="h-4 w-4 text-accent" />
              {site.availability}
            </span>
          </div>
        </PageHeader>

        <HeroVisual />
      </Container>

      <section
        aria-labelledby="story-heading"
        className="border-b border-line/70 py-16 sm:py-20"
      >
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="overflow-hidden rounded-card border border-line bg-card/60">
              <Image
                src={hero}
                alt={`Portrait of ${site.name}`}
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 24rem, 20rem"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div className="mt-3 flex items-center justify-between gap-3 rounded-card border border-line bg-surface px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {site.name}
                </p>
                <p className="font-mono text-xs text-muted">{site.role}</p>
              </div>
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <SectionHeading
              id="story-heading"
              eyebrow="My story"
              title="Learning by building real, usable things"
              description="I started with HTML and CSS, moved into JavaScript, then React and Next.js, and kept going into Node, Express and MongoDB so I could own a feature end to end."
            />

            <div className="grid gap-4 sm:grid-cols-1">
              {aboutCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-card border border-line bg-card/50 p-5"
                >
                  <h3 className="text-base font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {card.body}
                  </p>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/projects" className={buttonClasses("primary", "md")}>
                See my projects
                <ArrowRight />
              </Link>
              <Link
                href="/contact"
                className={buttonClasses("secondary", "md")}
              >
                Get in touch
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Process />
      <Education />
    </>
  );
}
