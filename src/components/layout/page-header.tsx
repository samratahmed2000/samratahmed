import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Consistent hero band used at the top of every secondary page. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-line/70">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <Container className="relative flex flex-col gap-4 py-14 sm:py-20">
        <span className="inline-flex w-fit items-center gap-2 font-mono text-xs tracking-[0.18em] text-accent uppercase">
          <span aria-hidden className="h-px w-6 bg-accent/60" />
          {eyebrow}
        </span>
        <h1 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            {description}
          </p>
        ) : null}
        {children ? <div className="pt-2">{children}</div> : null}
      </Container>
    </section>
  );
}
