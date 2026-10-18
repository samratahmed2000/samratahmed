import raw from "../../db.json";
import type { Project } from "@/types/type";

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

export const projectTechnologies: string[] = Array.from(
  new Set(projects.flatMap((project) => project.technologies)),
).sort((a, b) => a.localeCompare(b));

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export const PROJECT_STATUS_LABEL = "Portfolio Project";
