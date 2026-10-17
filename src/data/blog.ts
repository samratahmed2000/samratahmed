import type { BlogPost } from "@/types";

/**
 * Blog posts.
 *
 * There is no real published writing yet, and the project rules forbid
 * inventing articles. This array stays empty until genuine posts exist;
 * the blog routes render an honest empty state while it is empty.
 */
export const posts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}
