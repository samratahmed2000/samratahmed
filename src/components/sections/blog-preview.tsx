import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight, Book } from "@/components/ui/icons";
import { posts } from "@/data/blog";

export function BlogPreview() {
  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="border-b border-line/70 py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="blog-heading"
          eyebrow="Writing"
          title="Notes and articles"
          description="A place for write-ups on the things I'm learning. There are no published articles yet — this section stays honest until there are."
        />

        {posts.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-card border border-line bg-card/50 p-6 transition-colors hover:border-accent/40"
                >
                  <span className="font-mono text-xs text-muted">
                    {post.date}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-start gap-4 rounded-card border border-dashed border-line bg-card/30 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent"
              >
                <Book />
              </span>
              <div>
                <p className="text-sm font-medium text-foreground">
                  No articles published yet
                </p>
                <p className="mt-1 text-sm text-muted">
                  I&apos;d rather publish nothing than publish filler. New
                  writing will appear here as it&apos;s ready.
                </p>
              </div>
            </div>
            <Link
              href="/blog"
              className={buttonClasses("secondary", "md", "shrink-0")}
            >
              Visit blog
              <ArrowRight />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
