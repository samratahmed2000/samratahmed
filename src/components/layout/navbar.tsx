"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { primaryNav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
        <Container>
          <nav
            aria-label="Primary"
            className="flex h-16 items-center justify-between gap-4"
          >
            <Link
              href="/"
              className="group flex items-center gap-2.5 rounded-md"
              aria-label={`${site.name} — home`}
            >
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent"
              >
                SA
              </span>
              <span className="text-sm font-semibold tracking-tight text-foreground">
                {site.name}
              </span>
            </Link>

            <ul className="hidden items-center gap-1 md:flex">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "rounded-pill px-3.5 py-2 text-sm transition-colors",
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="hidden items-center gap-2 md:flex">
              <Link href="/resume" className={buttonClasses("primary", "md")}>
                Resume
              </Link>
            </div>

            {/* Mobile keeps the Resume action in the compact top bar. */}
            <Link
              href="/resume"
              className={cn(buttonClasses("primary", "md"), "md:hidden")}
            >
              Resume
            </Link>
          </nav>
        </Container>
      </header>

      {/* Mobile bottom navigation — replaces the old hamburger toggle. */}
      <nav
        aria-label="Primary mobile"
        className="fixed inset-x-0 bottom-0 z-50 border-t border-line/70 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      >
        <Container className="px-2">
          <ul className="grid grid-cols-6">
            {primaryNav.map((link) => (
              <li key={link.href} className="min-w-0">
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative flex h-16 flex-col items-center justify-center gap-1.5 px-1 text-[11px] font-medium transition-colors",
                    isActive(link.href)
                      ? "text-accent"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "h-0.5 w-6 rounded-full transition-colors",
                      isActive(link.href) ? "bg-accent" : "bg-transparent",
                    )}
                  />
                  <span className="w-full truncate text-center">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </nav>
    </>
  );
}
