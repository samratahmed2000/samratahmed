import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SocialLinks } from "@/components/ui/social-links";
import { navLinks, primaryNav, site } from "@/data/site";

/**
 * Cache Components treats `new Date()` as unstable during prerendering.
 * Marking this helper with `"use cache"` bakes the value in at build time.
 */
async function getCopyrightYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="border-t border-line/70 bg-surface">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent"
              >
                SA
              </span>
              <span className="text-sm font-semibold text-foreground">
                {site.name}
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {site.role}. {site.availability}.
            </p>
            <SocialLinks />
          </div>

          <nav aria-label="Pages" className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              Pages
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Home sections" className="flex flex-col gap-3">
            <h2 className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
              On the home page
            </h2>
            <ul className="flex flex-col gap-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`/${link.href}`}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Built with Next.js and Tailwind CSS.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <Link
              href="/privacy"
              className="transition-colors hover:text-accent"
            >
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
