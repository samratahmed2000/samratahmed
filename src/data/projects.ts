import raw from "../../db.json";
import type { Project } from "@/types/type";

/**
 * The same technology is written differently across projects ("React" vs
 * "React.js"). Mapping the known spellings to one canonical label keeps the
 * technology filter free of duplicates and lets a single tag match every
 * project that uses it. Only aliases that mean the same tool are listed; any
 * other value is kept exactly as authored.
 */
const TECHNOLOGY_ALIASES: Record<string, string> = {
  react: "React",
  "react.js": "React",
  reactjs: "React",
  "next.js": "Next.js",
  nextjs: "Next.js",
  "node.js": "Node.js",
  nodejs: "Node.js",
};

/** Canonical display label for a technology. */
function canonicalTechnology(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "";
  return TECHNOLOGY_ALIASES[trimmed.toLowerCase()] ?? trimmed;
}

/** Canonicalise and drop case-insensitive duplicates, preserving order. */
function normalizeTechnologies(technologies: string[] | undefined): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const technology of technologies ?? []) {
    const canonical = canonicalTechnology(technology);
    if (!canonical) continue;
    const key = canonical.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    normalized.push(canonical);
  }

  return normalized;
}

const projectEntries: Project[] = raw.projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  tagline: project.tagline,
  description: project.description,
  longDescription: project.longDescription,
  technologies: normalizeTechnologies(project.technologies),
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

/**
 * Tags that stay on the project cards but are not offered as filter chips —
 * they are used by almost every project, so they don't help narrow the list.
 * Matched case-insensitively.
 */
const TAGS_HIDDEN_FROM_FILTERS = new Set(["tailwind css"]);

/** Unique technology tags, already canonical, so no duplicate "React". */
export const projectTechnologies: string[] = Array.from(
  new Set(projects.flatMap((project) => project.technologies)),
)
  .filter((tech) => !TAGS_HIDDEN_FROM_FILTERS.has(tech.toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

/** True when a project uses a tag, ignoring case. */
export function projectUsesTechnology(
  project: Project,
  technology: string,
): boolean {
  const key = canonicalTechnology(technology).toLowerCase();
  return project.technologies.some((tech) => tech.toLowerCase() === key);
}

/** Free-text fields a keyword search should look through. */
export function projectSearchText(project: Project): string {
  return [
    project.title,
    project.tagline,
    project.description,
    ...project.technologies,
    ...project.keyFeatures,
  ]
    .join(" ")
    .toLowerCase();
}

/** Turns a typed term into the canonical form used by the tag list. */
export function canonicalSearchTerm(term: string): string {
  const trimmed = term.trim().toLowerCase();
  if (!trimmed) return "";
  return (TECHNOLOGY_ALIASES[trimmed] ?? trimmed).toLowerCase();
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
  return projects.map((project) => project.slug);
}

export const PROJECT_STATUS_LABEL = "Portfolio Project";
