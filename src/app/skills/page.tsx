import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";
import { learnedSkillsCount, skillCategories, softSkills } from "@/data/skills";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technology skills grouped by category — frontend, backend, databases and tools — plus the soft skills I bring to a team.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="Skills, grouped honestly by area"
        description="I split skills into what I use regularly and what I'm actively learning. I deliberately avoid numerical proficiency bars — they don't mean much without context."
      />

      <section
        aria-labelledby="tech-heading"
        className="border-b border-line/70 py-16 sm:py-20"
      >
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="tech-heading"
              eyebrow="Technology"
              title="Technical skills"
              description={`${learnedSkillsCount} skills across ${skillCategories.length} categories, with learning items clearly marked.`}
            />
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
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <article
                key={category.id}
                className="flex flex-col gap-4 rounded-card border border-line bg-card/50 p-6"
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <span className="font-mono text-xs text-muted">
                      {category.skills.length}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {category.description}
                  </p>
                </div>

                <ul className="flex flex-wrap gap-2">
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
                        <span className="sr-only">
                          {skill.status === "learned"
                            ? " — learned"
                            : " — currently learning"}
                        </span>
                      </Badge>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        aria-labelledby="soft-heading"
        className="border-b border-line/70 py-16 sm:py-20"
      >
        <Container className="flex flex-col gap-10">
          <SectionHeading
            id="soft-heading"
            eyebrow="Beyond code"
            title="How I work with people"
            description="The habits that matter when a project needs to move forward."
          />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {softSkills.map((skill) => (
              <li
                key={skill.name}
                className="rounded-card border border-line bg-card/50 p-6"
              >
                <h3 className="text-base font-semibold text-foreground">
                  {skill.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {skill.description}
                </p>
              </li>
            ))}
          </ul>

          <div>
            <Link href="/projects" className={buttonClasses("secondary", "md")}>
              See these skills in practice
              <ArrowRight />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
