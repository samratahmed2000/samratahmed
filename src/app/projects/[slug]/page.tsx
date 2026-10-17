import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { buttonClasses } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Github,
  Layers,
} from "@/components/ui/icons";
import { ContactCta } from "@/components/sections/contact-cta";
import {
  PROJECT_STATUS_LABEL,
  getProjectBySlug,
  getProjectSlugs,
  projects,
} from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project not found" };
  }
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projects
    .filter((item) => item.slug !== project.slug)
    .slice(0, 2);

  const meta = [
    { label: "Status", value: PROJECT_STATUS_LABEL },
    project.role ? { label: "Role", value: project.role } : null,
    project.year ? { label: "Year", value: project.year } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <>
      <section className="border-b border-line/70">
        <Container className="flex flex-col gap-6 py-12 sm:py-16">
          <Link
            href="/projects"
            className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180" />
            All projects
          </Link>

          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              {meta.map((item, index) => (
                <span key={item.label} className="inline-flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className="text-line">
                      /
                    </span>
                  ) : null}
                  <span>{item.value}</span>
                </span>
              ))}
            </div>

            <h1 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-base text-accent">{project.tagline}</p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("primary", "md")}
                >
                  Visit live site
                  <ArrowUpRight />
                </a>
              ) : null}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonClasses("secondary", "md")}
                >
                  <Github />
                  View source
                </a>
              ) : null}
            </div>
          )}
        </Container>
      </section>

      <section
        aria-label="Project screenshot"
        className="border-b border-line/70"
      >
        <Container className="py-10 sm:py-12">
          {project.image ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-card border border-line bg-surface">
              <Image
                src={project.image}
                alt={`${project.title} — screenshot of the interface`}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1100px"
                className="object-cover object-top"
              />
            </div>
          ) : (
            <div
              aria-hidden
              className="bg-grid grid aspect-[16/10] place-items-center rounded-card border border-line bg-surface"
            >
              <span className="font-mono text-sm text-muted">
                Screenshot coming soon
              </span>
            </div>
          )}
        </Container>
      </section>

      <section
        aria-labelledby="overview-heading"
        className="border-b border-line/70 py-14 sm:py-16"
      >
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2
                id="overview-heading"
                className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                Overview
              </h2>
              {project.longDescription && project.longDescription.length > 0 ? (
                project.longDescription.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="text-sm leading-relaxed text-muted sm:text-base"
                  >
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {project.description}
                </p>
              )}
            </div>

            {project.keyFeatures.length > 0 ? (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  Key features
                </h2>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.keyFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 rounded-card border border-line bg-card/50 p-4 text-sm text-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <InfoList title="Challenges" items={project.challenges} />
            <InfoList
              title="Engineering decisions"
              items={project.engineeringDecisions}
            />
            <InfoList
              title="Future improvements"
              items={project.futureImprovements}
            />
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-24">
            <div className="rounded-card border border-line bg-card/50 p-6">
              <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Layers className="h-4 w-4 text-accent" />
                Tech stack
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Badge tone="muted">{tech}</Badge>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-card/50 p-6">
              <h2 className="text-sm font-semibold text-foreground">
                Project details
              </h2>
              <dl className="mt-3 flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-muted">Status</dt>
                  <dd className="text-foreground">{PROJECT_STATUS_LABEL}</dd>
                </div>
                {project.role ? (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Role</dt>
                    <dd className="text-foreground">{project.role}</dd>
                  </div>
                ) : null}
                {project.year ? (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-muted">Year</dt>
                    <dd className="text-foreground">{project.year}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </aside>
        </Container>
      </section>

      {otherProjects.length > 0 ? (
        <section
          aria-labelledby="more-projects-heading"
          className="border-b border-line/70 py-14 sm:py-16"
        >
          <Container className="flex flex-col gap-6">
            <h2
              id="more-projects-heading"
              className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
            >
              More projects
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {otherProjects.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/projects/${item.slug}`}
                    className="flex h-full flex-col gap-2 rounded-card border border-line bg-card/50 p-5 transition-colors hover:border-accent/40"
                  >
                    <span className="text-sm font-semibold text-foreground">
                      {item.title}
                    </span>
                    <span className="text-sm text-muted">{item.tagline}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-accent">
                      Read case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <ContactCta />
    </>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {title}
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-muted"
          >
            <span
              aria-hidden
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
