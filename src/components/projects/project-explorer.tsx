"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/project-card";
import { Search, Close } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/type";

interface ProjectExplorerProps {
  projects: Project[];
  technologies: string[];
}

export function ProjectExplorer({
  projects,
  technologies,
}: ProjectExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesTech = !activeTech || project.technologies.includes(activeTech);
      if (!matchesTech) return false;
      if (!q) return true;
      return (
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((tech) => tech.toLowerCase().includes(q))
      );
    });
  }, [projects, query, activeTech]);

  const hasFilters = query.trim().length > 0 || activeTech !== null;

  const clearFilters = () => {
    setQuery("");
    setActiveTech(null);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <div role="search" className="relative">
          <label htmlFor="project-search" className="sr-only">
            Search projects by title or technology
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="project-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title or technology…"
            className="h-12 w-full rounded-pill border border-line bg-card/60 pr-4 pl-11 text-sm text-foreground placeholder:text-muted/80 focus:border-accent/60 focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[0.15em] text-muted uppercase">
            Filter by technology
          </span>
          <ul className="flex flex-wrap gap-2">
            <li>
              <button
                type="button"
                onClick={() => setActiveTech(null)}
                aria-pressed={activeTech === null}
                className={cn(
                  "rounded-pill border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  activeTech === null
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : "border-line text-muted hover:border-accent/40 hover:text-foreground",
                )}
              >
                All
              </button>
            </li>
            {technologies.map((tech) => (
              <li key={tech}>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTech((current) => (current === tech ? null : tech))
                  }
                  aria-pressed={activeTech === tech}
                  className={cn(
                    "rounded-pill border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    activeTech === tech
                      ? "border-accent/60 bg-accent/10 text-accent"
                      : "border-line text-muted hover:border-accent/40 hover:text-foreground",
                  )}
                >
                  {tech}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p aria-live="polite" className="font-mono text-xs text-muted">
            {results.length} of {projects.length} projects
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 rounded-pill border border-line px-3.5 py-1.5 text-xs text-muted transition-colors hover:border-accent/40 hover:text-foreground"
            >
              <Close className="h-3.5 w-3.5" />
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3 rounded-card border border-dashed border-line bg-card/30 p-8">
          <p className="text-sm font-medium text-foreground">
            No projects match those filters
          </p>
          <p className="text-sm text-muted">
            Try a different technology or clear the search to see everything
            again.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-1 inline-flex items-center gap-1.5 rounded-pill border border-line px-4 py-2 text-sm text-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
