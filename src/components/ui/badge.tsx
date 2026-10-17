import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  className?: string;
  tone?: "default" | "accent" | "muted";
}

const tones = {
  default: "border-line bg-card/70 text-muted",
  accent: "border-accent/40 bg-accent/10 text-accent",
  muted: "border-line/70 bg-transparent text-muted",
};

/** Small pill label for technologies, tags, and statuses. */
export function Badge({ children, className, tone = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border px-3 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
