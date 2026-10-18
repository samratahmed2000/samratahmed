import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";
import { skillCategories } from "@/data/skills";
import { cn } from "@/lib/utils";

export function SkillsPreview() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="border-b border-line/70 py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="skills-heading"
            eyebrow="Skills"
            title="Technology I work with"
            description="Grouped by area, with a clear split between skills I use regularly and the ones I'm actively learning. No invented proficiency scores."
          />
          <Link
            href="/skills"
            className={buttonClasses("secondary", "md", "shrink-0")}
          >
            Full skills
            <ArrowRight />
          </Link>
        </div>

        <ul className="flex flex-wrap items-center gap-4 text-xs text-muted">
          <li className="inline-flex items-center gap-2">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            In use / learned
          </li>
          <li className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full border border-muted/70"
            />
            Currently learning
          </li>
        </ul>

        <div className="grid gap-5 sm:grid-cols-2">
          {skillCategories.map((category) => (
            <article
              key={category.id}
              className="rounded-card border border-line bg-card/50 p-6"
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground">
                  {category.title}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {category.skills.length}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted">{category.description}</p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <Badge
                      tone={skill.status === "learned" ? "accent" : "muted"}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          skill.status === "learned"
                            ? "bg-accent"
                            : "border border-muted/70",
                        )}
                      />
                      {skill.name}
                    </Badge>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
