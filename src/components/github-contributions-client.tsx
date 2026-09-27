"use client";

import { useState } from "react";
import type { ContributionData, ContributionDay } from "@/lib/github";
import { toWeeks, monthLabels, generateEmptyYear } from "@/lib/github-heatmap";
import { cn } from "@/lib/utils";

const WINDOW_RADIUS = 4;

// GitHub's own light/dark contribution-graph green scale.
const LEVEL_CLASS: Record<ContributionDay["level"], string> = {
  0: "bg-[#ebedf0] dark:bg-[#161b22]",
  1: "bg-[#9be9a8] dark:bg-[#0e4429]",
  2: "bg-[#40c463] dark:bg-[#006d32]",
  3: "bg-[#30a14e] dark:bg-[#26a641]",
  4: "bg-[#216e39] dark:bg-[#39d353]",
};

export function GithubContributionsClient({ data }: { data: ContributionData }) {
  const [year, setYear] = useState(Number(data.years[0] ?? new Date().getFullYear()));

  // A sliding ±4-year window centered on whichever year is selected: pick an
  // edge year and the window recenters around it (2022 -> 2018-2026, 2026 -> 2022-2030).
  const windowYears = Array.from(
    { length: WINDOW_RADIUS * 2 + 1 },
    (_, i) => year - WINDOW_RADIUS + i
  );

  const days = data.daysByYear[String(year)] ?? generateEmptyYear(year);
  const total = data.totals[String(year)] ?? 0;
  const weeks = toWeeks(days);
  const labels = monthLabels(weeks);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted-foreground">
          {total.toLocaleString()} contributions in {year}
        </span>
        <div className="flex flex-wrap gap-1">
          {windowYears.map((y) => (
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
