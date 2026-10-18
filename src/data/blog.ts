import type { BlogPost } from "@/types/type";

export const posts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}
