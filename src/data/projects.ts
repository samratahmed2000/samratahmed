import raw from "../../db.json";
import type { Project } from "@/types";

/**
 * Project data from `db.json`, normalised into a typed shape.
 *
 * An `image` path is only kept when a real asset exists in `public/`.
 * Missing collections default to empty arrays so components can render
 * optional sections conditionally.
 */
const projectEntries: Project[] = raw.projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  tagline: project.tagline,
  description: project.description,
  longDescription: project.longDescription,
  technologies: project.technologies ?? [],
  keyFeatures: project.keyFeatures ?? [],
  challenges: project.challenges ?? [],
  engineeringDecisions: project.engineeringDecisions ?? [],
  futureImprovements: project.futureImprovements ?? [],
  image: project.image || undefined,
  gradient: project.gradient || undefined,
  liveUrl: project.liveUrl || undefined,
  githubUrl: project.githubUrl || undefined,
  featured: Boolean(project.featured),
  year: project.year || undefined,
  role: project.role || undefined,
}));

export const projects: Project[] = projectEntries;

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** Unique technology names used to populate the project filter controls. */
export const projectTechnologies: string[] = Array.from(
  new Set(projects.flatMap((project) => project.technologies)),
).sort((a, b) => a.localeCompare(b));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Slugs for `generateStaticParams` on the dynamic project route. */
export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

/** Human-readable status label. Projects are learning/portfolio builds, not products. */
export const PROJECT_STATUS_LABEL = "Portfolio Project";
