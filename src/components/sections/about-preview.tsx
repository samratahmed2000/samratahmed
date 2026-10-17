import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { aboutCards } from "@/data/site";

export function AboutPreview() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-b border-line/70 py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="about-heading"
          eyebrow="About"
          title="A practical, user-focused developer"
          description="I focus on responsive interfaces, maintainable code, and responsible AI-assisted workflows — planning, coding, debugging and testing in small, verifiable steps."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article
              key={card.title}
              className="rounded-card border border-line bg-card/50 p-6"
            >
              <h3 className="text-base font-semibold text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <div>
          <Link href="/about" className={buttonClasses("secondary", "md")}>
            More about me
            <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
