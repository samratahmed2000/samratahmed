import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { ProjectExplorer } from "@/components/projects/project-explorer";
import { projectTechnologies, projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected web projects by Samrat Ahmed — price comparison, workout tracking and a developer stack builder — with the stack and decisions behind each one.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  "use cache";
  cacheLife("portfolio");

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Projects I've built to learn and solve real problems"
        description="These are hands-on, learning-focused builds. Filter by technology or search by name to find a specific one, then open its case study for the full detail."
      />

      <section
        aria-labelledby="projects-list-heading"
        className="border-b border-line/70 py-12 sm:py-16"
      >
        <Container className="flex flex-col gap-8">
          <h2 id="projects-list-heading" className="sr-only">
            All projects
          </h2>

          <ProjectExplorer
            projects={projects}
            technologies={projectTechnologies}
          />
        </Container>
      </section>
    </>
  );
}
