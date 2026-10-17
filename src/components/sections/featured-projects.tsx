import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight } from "@/components/ui/icons";
import { ProjectCard } from "@/components/projects/project-card";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  const featured = featuredProjects.slice(0, 3);
  if (featured.length === 0) return null;

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-line/70 py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-heading"
            eyebrow="Projects"
            title="Featured work"
            description="Hands-on builds where I applied modern web tooling end to end. Each one links to a case study with the stack, features and decisions behind it."
          />
          <Link
            href="/projects"
            className={buttonClasses("secondary", "md", "shrink-0")}
          >
            All projects
            <ArrowRight />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={index === 0}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
