import type { NextConfig } from "next";

/**
 * How long content pages are cached before Next.js refreshes them in the
 * background — the Cache Components equivalent of the old route-level
 * `export const revalidate = 300`. Pages opt in with `'use cache'` and
 * `cacheLife('portfolio')`. `expire` must stay greater than `revalidate`.
 */
const CONTENT_REVALIDATE_SECONDS = 300;

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  cacheLife: {
    portfolio: {
      stale: CONTENT_REVALIDATE_SECONDS,
      revalidate: CONTENT_REVALIDATE_SECONDS,
      expire: 60 * 60,
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
