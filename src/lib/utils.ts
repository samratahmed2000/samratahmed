/**
 * Small dependency-free class-name helper.
 * Filters out falsy values so conditional classes stay readable.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Configurable canonical base URL. Set `NEXT_PUBLIC_SITE_URL` in the
 * deployment environment. Falls back to local development, and never
 * invents a deployed domain.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");
