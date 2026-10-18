import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Github } from "@/components/ui/icons";
import { PROJECT_STATUS_LABEL } from "@/data/projects";
import type { Project } from "@/types/type";

function initialsFrom(title: string): string {
  return title
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

export function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const maxTech = 4;
  const visibleTech = project.technologies.slice(0, maxTech);
  const extraTech = project.technologies.length - visibleTech.length;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-card/60 transition-colors duration-200 hover:border-accent/40 focus-within:border-accent/60">
      <ProjectThumb project={project} priority={priority} />

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
          <span>{PROJECT_STATUS_LABEL}</span>
          {project.year ? (
            <>
              <span aria-hidden className="text-line">
                /
              </span>
              <span>{project.year}</span>
            </>
          ) : null}
          {project.role ? (
            <>
              <span aria-hidden className="text-line">
                /
              </span>
              <span>{project.role}</span>
            </>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors after:absolute after:inset-0 after:rounded-card after:content-[''] group-hover:text-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        </div>

        <ul className="flex flex-wrap gap-2">
          {visibleTech.map((tech) => (
            <li key={tech}>
              <Badge tone="muted">{tech}</Badge>
            </li>
          ))}
          {extraTech > 0 ? (
            <li>
              <Badge tone="muted">+{extraTech}</Badge>
            </li>
          ) : null}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/70 pt-4 text-sm">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground transition-colors group-hover:text-accent">
            Case study
            <ArrowUpRight className="h-4 w-4" />
          </span>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
            >
              Live site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
            >
              <Github className="h-4 w-4" />
              Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ProjectThumb({
  project,
  priority,
}: {
  project: Project;
  priority: boolean;
}) {
  if (!project.image) {
    return (
      <div
        aria-hidden
        className="bg-grid grid aspect-16/10 place-items-center border-b border-line bg-surface"
      >
        <span className="font-mono text-3xl font-semibold text-accent">
          {initialsFrom(project.title)}
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-16/10 overflow-hidden border-b border-line bg-surface">
      <Image
        src={project.image}
        alt={`${project.title} — interface preview`}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
