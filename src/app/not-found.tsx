import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonClasses } from "@/components/ui/button";
import { ArrowRight, Compass } from "@/components/ui/icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-30"
      />
      <Container className="relative flex min-h-[60vh] flex-col items-start justify-center gap-6 py-20">
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-card text-accent"
        >
          <Compass />
        </span>
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
          404 — Page not found
        </p>
        <h1 className="max-w-2xl text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl">
          That page doesn&apos;t exist
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          The link may be broken or the page may have moved. Here are a few
          places that definitely work.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/" className={buttonClasses("primary", "lg")}>
            Back home
            <ArrowRight />
          </Link>
          <Link href="/projects" className={buttonClasses("secondary", "lg")}>
            View projects
          </Link>
          <Link href="/contact" className={buttonClasses("ghost", "lg")}>
            Contact me
          </Link>
        </div>
      </Container>
    </section>
  );
}
