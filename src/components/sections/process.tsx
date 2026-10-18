import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processSteps } from "@/data/site";

export function Process() {
  if (processSteps.length === 0) return null;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="border-b border-line/70 py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="process-heading"
          eyebrow="Process"
          title="How I build, with AI as a tool"
          description="A four-step workflow that keeps AI assistance transparent - I plan, review, debug and test rather than pasting generated code blindly."
        />

        <ol className="grid gap-5 sm:grid-cols-2">
          {processSteps.map((step) => (
            <li
              key={step.step}
              className="flex flex-col gap-3 rounded-card border border-line bg-card/50 p-6"
            >
              <span className="font-mono text-xs tracking-[0.12em] text-accent uppercase">
                {step.step}
              </span>
              <h3 className="text-base font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
              {step.prompt ? (
                <figure className="mt-1 rounded-lg border border-line/80 bg-surface p-3">
                  <figcaption className="font-mono text-[0.7rem] tracking-[0.12em] text-muted uppercase">
                    Example prompt
                  </figcaption>
                  <blockquote className="mt-1.5 font-mono text-xs leading-relaxed text-foreground/90">
                    {step.prompt}
                  </blockquote>
                </figure>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
