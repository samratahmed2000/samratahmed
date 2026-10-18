import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "@/components/ui/icons";
import { getPostBySlug, getPostSlugs } from "@/data/blog";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export const instant = false;

export function generateStaticParams() {
  const slugs = getPostSlugs().map((slug) => ({ slug }));
  return slugs.length > 0 ? slugs : [{ slug: "_no-posts-yet" }];
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <section className="border-b border-line/70">
          <Container className="flex flex-col gap-6 py-12 sm:py-16">
            <Link
              href="/blog"
              className="inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              All articles
            </Link>

            <div className="flex flex-col gap-4">
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
              <h1 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
                {post.title}
              </h1>
              <p className="max-w-2xl text-base text-muted">{post.excerpt}</p>
              {post.tags.length > 0 ? (
                <ul className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge tone="muted">{tag}</Badge>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Container>
        </section>

        {post.content && post.content.length > 0 ? (
          <section className="border-b border-line/70 py-14 sm:py-16">
            <Container className="flex max-w-3xl flex-col gap-5">
              {post.content.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-sm leading-relaxed text-muted sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </Container>
          </section>
        ) : null}
      </article>
    </>
  );
}
