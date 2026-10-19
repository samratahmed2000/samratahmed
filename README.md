# Samrat Ahmed — Portfolio

A dark, editorial portfolio for **Samrat Ahmed**, an AI-Driven Web Application
Engineer. Built with the Next.js App Router, TypeScript and Tailwind CSS v4.

All portfolio content is driven by [`db.json`](./db.json) through typed data
modules in `src/data/`, so personal details live in one place instead of being
scattered across components.

## Tech stack

| Area      | Choice                                              |
| --------- | --------------------------------------------------- |
| Framework | Next.js `16.4.2` (App Router, Cache Components on)  |
| UI        | React `19.3.0`                                      |
| Language  | TypeScript (strict)                                 |
| Styling   | Tailwind CSS v4 (`@tailwindcss/turbopack`)          |
| Linting   | ESLint 9 (flat config, `eslint-config-next`)        |
| Icons     | Inline SVG components (no icon dependency added)    |

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:3000)
```

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npx tsc --noEmit # type check
```

## Routes

| Route               | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `/`                 | Home — hero, about preview, featured projects, skills, process, education, blog preview, contact         |
| `/about`            | Story, learning journey, process and education       |
| `/projects`         | Searchable / filterable project listing              |
| `/projects/[slug]`  | Project case study                                   |
| `/skills`           | Skills grouped by category plus soft skills          |
| `/blog`             | Article listing with an honest empty state           |
| `/blog/[slug]`      | Article detail (reserved until real posts exist)     |
| `/contact`          | Contact methods and a mailto-based message form      |
| `/privacy`          | Plain-language privacy notes                         |
| custom `not-found`  | 404 page for unknown routes and slugs                |

## Editing content

All content is normalised in `src/data/`:

- `src/data/site.ts` — name, role, bio, contact details, socials, nav, about
  cards, process steps and education. **Edit these to change personal details.**
- `src/data/projects.ts` — projects and derived technology filters.
- `src/data/skills.ts` — skill categories and soft skills.
- `src/data/blog.ts` — articles. Currently empty on purpose.

Site-wide visual tokens (colours, fonts, radius) live in the `@theme` block of
`src/app/globals.css`.

### Content revalidation

The app runs with `cacheComponents: true`, so route-level
`export const revalidate` is not available (Next.js 16 removed it under Cache
Components). Instead the `portfolio` cache profile in `next.config.ts` sets
`revalidate: 300` (5 minutes), and the content pages opt in with:

```tsx
"use cache";
cacheLife("portfolio");
```

Applied to `/`, `/about`, `/projects`, `/blog`, `/skills` and `/resume`. Change
`CONTENT_REVALIDATE_SECONDS` in `next.config.ts` to adjust the interval for all
of them.

### Content integrity rules applied

This portfolio deliberately avoids unsupported claims:

- The placeholder certification ("Programming Hero (Placeholder)" with an
  `example.com` URL) is **not displayed**. Add a real credential to `db.json`
  before showing it.
- Numeric `level` values in `db.json` are **not** rendered as proficiency bars.
  Skills are shown as "in use / learned" or "currently learning" instead.
- The `experiences` array is empty, so no experience timeline is fabricated.
- Optional links (live site, repository, resume) only render when a value or
  file actually exists.
- Ongoing education is labelled **Ongoing** and never presented as a completed
  degree.
- No blog posts are invented; the blog shows an honest empty state.

## Environment

Set a canonical base URL for SEO metadata, sitemap and robots output:

```bash
# .env.local (or your host's environment settings)
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

If it is not set, `siteUrl` falls back to Vercel's own production/preview domain
(`VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`), so a deployment never
advertises `localhost`. Only outside Vercel does it fall back to
`http://localhost:3000`.

If the value is missing from your Open Graph tags, `sitemap.xml` or
`robots.txt`, that fallback failed — set `NEXT_PUBLIC_SITE_URL` explicitly and
redeploy.

## Contact form behaviour

There is no backend. The contact form validates the required fields and then
opens the visitor's own email app with the message pre-filled (`mailto:`). The
copy in the UI states this clearly — the site does not send or store messages.
If you later add a real delivery service, keep credentials server-side only.

## Assets

Place real files in `public/images/`:

- `project-bazardor.webp`, `project-fit-log.webp`, `project-devstack.webp` —
  project previews (present).
- `hero.webp` — portrait used on the hero and About page (present).
- `resume.pdf` — the résumé shown on `/resume` (present). `src/data/site.ts`
  sets `resumeUrl` to `/resume.pdf`; the page previews it inline and offers
  download / new-tab links.

Images are served as WebP so the Next.js image optimizer never has to decode a
multi-megabyte PNG. `hero.png` was ~1.74 MB; `hero.webp` is ~74 KB at the same
1024×1024 dimensions. Keep new assets compressed before committing.

If a project image is missing, the card falls back to a typographic placeholder
instead of showing a broken image.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in Vercel — the Next.js preset is detected automatically.
3. Add the `NEXT_PUBLIC_SITE_URL` environment variable with your production URL
   (for example `https://your-domain.com`) for the Production and Preview
   environments.
4. Deploy. No database, authentication or other services are required.

### Use a custom domain

Attach a real domain (Vercel → Project → **Settings → Domains**) rather than
sharing only the free `*.vercel.app` address. The free address is served from
Vercel's shared anycast IPs, and some ISPs intermittently blackhole or throttle
them, which surfaces as a long hang followed by "web page not available" in the
browser — not as an application error. A custom domain resolves through
`cname.vercel-dns.com` on a different IP range and avoids that class of problem.
After adding the domain, set `NEXT_PUBLIC_SITE_URL` to it and redeploy so
canonical URLs, `sitemap.xml` and `robots.txt` use the new host.

## Known limitations

- Unknown dynamic slugs (`/projects/<bad>`, `/blog/<bad>`) render the not-found
  page. Because Cache Components streams a prerendered shell, the very first
  request to a brand-new bad URL can return HTTP `200` before the cached `404`
  takes over. This is a Next.js 16 Cache Components behaviour, not missing
  handling.
- The blog detail route uses a placeholder `generateStaticParams` entry while
  there are no posts, because Cache Components requires at least one.
- Responsive behaviour and accessibility were checked by inspecting the
  rendered markup and class definitions; no automated browser / Lighthouse run
  was performed in this environment.
