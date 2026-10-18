import { site } from "@/data/site";

const stackPrimary = ["Next.js", "React", "TypeScript"];
const stackSecondary = ["Node.js", "Express", "MongoDB"];

export function HeroVisual() {
  return (
    <div className="relative">
      <div className="rounded-card border border-line bg-card/80 p-5 shadow-2xl shadow-black/30 sm:p-6">
        <div className="flex items-center gap-2 border-b border-line pb-4">
          <span aria-hidden className="h-3 w-3 rounded-full bg-accent/70" />
          <span aria-hidden className="h-3 w-3 rounded-full bg-line" />
          <span aria-hidden className="h-3 w-3 rounded-full bg-line" />
          <span className="ml-2 font-mono text-xs text-muted">
            samrat@portfolio
          </span>
        </div>

        <dl className="mt-5 space-y-5 font-mono text-xs leading-relaxed sm:text-sm">
          <div>
            <dt className="text-muted">
              <span className="text-accent">$</span> whoami
            </dt>
            <dd className="mt-1 text-foreground">
              {site.name} — {site.role}
            </dd>
          </div>

          <div>
            <dt className="text-muted">
              <span className="text-accent">$</span> stack --primary
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {stackPrimary.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-accent/30 bg-accent/10 px-2 py-1 text-accent"
                >
                  {item}
                </span>
              ))}
            </dd>
            <dd className="mt-2 flex flex-wrap gap-2">
              {stackSecondary.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line px-2 py-1 text-muted"
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="text-muted">
              <span className="text-accent">$</span> status
            </dt>
            <dd className="mt-1 text-foreground">{site.availability}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
