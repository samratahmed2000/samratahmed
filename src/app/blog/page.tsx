import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Book } from "@/components/ui/icons";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes and articles by Samrat Ahmed about building modern web applications. No published articles yet.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Notes on building for the web"
        description="I write about what I'm learning — patterns that clicked, bugs that taught me something, and how I work with AI tools day to day."
      />

      <section
        aria-labelledby="posts-heading"
        className="border-b border-line/70 py-16 sm:py-20"
      >
        <Container className="flex flex-col gap-8">
          <h2 id="posts-heading" className="sr-only">
            Articles
          </h2>

          {posts.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="flex h-full flex-col gap-3 rounded-card border border-line bg-card/50 p-6 transition-colors hover:border-accent/40"
                  >
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
                      <time dateTime={post.date}>{post.date}</time>
                      {post.readingTime ? (
                        <>
                          <span aria-hidden className="text-line">
                            /
                          </span>
                          <span>{post.readingTime}</span>
                        </>
                      ) : null}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <ul className="mt-1 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <li key={tag}>
                          <Badge tone="muted">{tag}</Badge>
                        </li>
                      ))}
                    </ul>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-6 rounded-card border border-dashed border-line bg-card/30 p-8 sm:p-10">
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-surface text-accent"
              >
                <Book />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-foreground">
                  No articles yet
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted">
                  I haven&apos;t published any articles yet, and I&apos;d rather
                  keep this page empty than fill it with placeholder posts. When
                  I have something genuinely useful to share, it will appear
                  here.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/projects"
                  className={buttonClasses("primary", "md")}
                >
                  Browse projects instead
                  <ArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className={buttonClasses("secondary", "md")}
                >
                  Suggest a topic
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
