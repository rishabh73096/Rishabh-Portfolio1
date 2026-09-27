import { cn } from "@/lib/utils";

export function DashedBox({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-dashed border-border p-5 sm:p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
