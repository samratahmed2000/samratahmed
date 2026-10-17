import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

/** Centered, max-width page gutter used across every section. */
export function Container({ className, children }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}
