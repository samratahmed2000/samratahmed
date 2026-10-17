import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/site";

/** An entry is "ongoing" only when the source data says so. */
function isOngoing(period: string): boolean {
  return /present|ongoing/i.test(period);
}

export function Education() {
  if (education.length === 0) return null;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="border-b border-line/70 py-16 sm:py-20"
    >
      <Container className="flex flex-col gap-10">
        <SectionHeading
          id="education-heading"
          eyebrow="Education"
          title="Academic background"
          description="Presented exactly as it stands today — ongoing study is shown as ongoing, not as a completed degree."
        />

        <ol className="flex flex-col gap-4">
          {education.map((entry) => (
            <li
              key={`${entry.degree}-${entry.institution}`}
              className="rounded-card border border-line bg-card/50 p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-foreground">
                  {entry.degree}
                </h3>
                {isOngoing(entry.period) ? (
                  <Badge tone="accent">Ongoing</Badge>
                ) : null}
              </div>
              <p className="mt-1.5 text-sm text-muted">{entry.institution}</p>
              <p className="mt-1 font-mono text-xs text-muted">
                {entry.period}
              </p>
              {entry.details ? (
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                  {entry.details}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
