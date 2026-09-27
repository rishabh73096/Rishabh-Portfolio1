"use client";

import { useState } from "react";
import type { ContributionData, ContributionDay } from "@/lib/github";
import { toWeeks, monthLabels } from "@/lib/github-heatmap";
import { cn } from "@/lib/utils";

const LEVEL_CLASS: Record<ContributionDay["level"], string> = {
  0: "bg-foreground/[0.06]",
  1: "bg-foreground/25",
  2: "bg-foreground/45",
  3: "bg-foreground/70",
  4: "bg-foreground",
};

export function GithubContributionsClient({ data }: { data: ContributionData }) {
  const [year, setYear] = useState(data.years[0]);

  const days = data.daysByYear[year] ?? [];
  const total = data.totals[year] ?? 0;
  const weeks = toWeeks(days);
  const labels = monthLabels(weeks);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {total.toLocaleString()} contributions in {year}
        </span>
        <div className="flex flex-wrap gap-1">
          {data.years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setYear(y)}
              className={cn(
                "rounded-md border px-2.5 py-1 font-mono text-xs transition-colors",
                y === year
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex min-w-full flex-col gap-1">
          <div
            className="grid text-xs text-muted-foreground"
            style={{ gridTemplateColumns: `repeat(${weeks.length}, minmax(0.65rem, 1fr))` }}
          >
            {labels.map((label, i) => (
              <span key={i} className="overflow-visible whitespace-nowrap">
                {label}
              </span>
            ))}
          </div>
          <div
            className="grid grid-flow-col gap-[3px]"
            style={{
              gridTemplateColumns: `repeat(${weeks.length}, minmax(0.65rem, 1fr))`,
              gridTemplateRows: "repeat(7, minmax(0.65rem, 1fr))",
            }}
          >
            {weeks.map((week, wi) =>
              week.map((day, di) => (
                <div
                  key={`${wi}-${di}`}
                  title={day ? `${day.count} contributions on ${day.date}` : undefined}
                  className={cn(
                    "aspect-square w-full rounded-[2px]",
                    day ? LEVEL_CLASS[day.level] : "bg-transparent"
                  )}
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-1.5 font-mono text-xs text-muted-foreground">
        <span>Less</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <div key={level} className={cn("size-2.5 rounded-[2px]", LEVEL_CLASS[level])} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
