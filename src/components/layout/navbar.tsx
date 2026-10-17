"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { Close, Menu } from "@/components/ui/icons";
import { primaryNav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  // The menu is "open" only for the path it was opened on. When the route
  // changes, the derived value becomes false automatically — no effect needed.
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;

  const closeMenu = () => setOpenPath(null);
  const toggleMenu = () =>
    setOpenPath((current) => (current === pathname ? null : pathname));

  // Close on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/85 backdrop-blur-md">
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
            <Link href="/contact" className={buttonClasses("primary", "md")}>
              Let&apos;s Talk
            </Link>
          </div>

          <button
            type="button"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-foreground transition-colors hover:border-accent/60 hover:text-accent md:hidden"
          >
            {open ? <Close /> : <Menu />}
          </button>
        </nav>
      </Container>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-line/70 bg-background md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {primaryNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-lg px-3 py-3 text-base transition-colors",
                  isActive(link.href)
                    ? "bg-card text-foreground"
                    : "text-muted hover:bg-card hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className={buttonClasses("primary", "lg", "mt-2 w-full")}
            >
              Let&apos;s Talk
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
