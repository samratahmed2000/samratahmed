import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-soft border border-accent/60",
  secondary:
    "border border-line bg-card/60 text-foreground hover:border-accent/60 hover:text-accent",
  ghost: "border border-transparent text-muted hover:text-foreground",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm sm:text-base",
};

/**
 * Shared button classes so anchors, links, and buttons stay visually consistent.
 * Colours are driven by the theme tokens in `globals.css`.
 */
export function buttonClasses(
  variant: Variant = "primary",
  size: Size = "md",
  className?: string,
): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-pill font-medium",
    "transition-colors duration-200 whitespace-nowrap",
    variants[variant],
    sizes[size],
    className,
  );
}
