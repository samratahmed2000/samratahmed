import type { MetadataRoute } from "next";
import { getPostSlugs } from "@/data/blog";
import { getProjectSlugs } from "@/data/projects";
import { siteUrl } from "@/lib/utils";

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.9 },
  { path: "/skills", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route.path}`,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...getProjectSlugs().map((slug) => ({
      url: `${siteUrl}/projects/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getPostSlugs().map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
