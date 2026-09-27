import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

/** Bracket-cornered "[ Label ]" chip used to head a section, e.g. "Work Experience". */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "relative inline-flex w-fit items-center rounded-md border border-dashed border-border px-4 py-1.5 text-sm font-semibold text-foreground",
        className
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1.5 -top-1.5 h-3 w-3 border-l border-t border-foreground/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1.5 -top-1.5 h-3 w-3 border-r border-t border-foreground/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1.5 -bottom-1.5 h-3 w-3 border-l border-b border-foreground/40"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1.5 -bottom-1.5 h-3 w-3 border-r border-b border-foreground/40"
      />
      {children}
    </div>
  );
}
