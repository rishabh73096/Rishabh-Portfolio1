import { cn } from "@/lib/utils";

interface TimelineItemProps {
  children: React.ReactNode;
  isLast?: boolean;
  active?: boolean;
}

/** Vertical dashed rail with a status dot, used to thread Work Experience / Education entries together. */
export function TimelineItem({ children, isLast, active }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center pt-6">
        <span
          className={cn(
            "size-2.5 shrink-0 rounded-full",
            active ? "bg-success" : "bg-muted-foreground/50"
          )}
        />
        {!isLast && (
          <span className="mt-1 w-px flex-1 border-l border-dashed border-border" />
        )}
      </div>
      <div className="min-w-0 flex-1 pb-4">{children}</div>
    </div>
  );
}
