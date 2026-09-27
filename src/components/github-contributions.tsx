import { getGithubContributions, type ContributionDay } from "@/lib/github";
import { cn } from "@/lib/utils";

const LEVEL_CLASS: Record<ContributionDay["level"], string> = {
  0: "bg-foreground/[0.06]",
  1: "bg-foreground/25",
  2: "bg-foreground/45",
  3: "bg-foreground/70",
  4: "bg-foreground",
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Chunk a chronological list of days into Sunday-start weeks, padding the first week. */
function toWeeks(days: ContributionDay[]) {
  if (days.length === 0) return [];

  const firstDow = new Date(days[0].date).getDay(); // 0 = Sunday
  const padded: (ContributionDay | null)[] = [
    ...Array(firstDow).fill(null),
    ...days,
  ];

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }
  return weeks;
}

function monthLabels(weeks: (ContributionDay | null)[][]) {
  const labels: (string | null)[] = [];
  let lastMonth = -1;
  let lastLabelIndex = -Infinity;
  weeks.forEach((week, i) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) {
      labels.push(null);
      return;
    }
    const month = new Date(firstDay.date).getMonth();
    // Skip a label that would overlap the previous one (narrow first/last weeks).
    if (month !== lastMonth && i - lastLabelIndex >= 3) {
      labels.push(MONTH_NAMES[month]);
      lastMonth = month;
      lastLabelIndex = i;
    } else {
      labels.push(null);
    }
  });
  return labels;
}

export async function GithubContributions({ username }: { username: string }) {
  const data = await getGithubContributions(username);

  if (!data || data.days.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        GitHub activity is unavailable right now.
      </p>
    );
  }

  const weeks = toWeeks(data.days);
  const labels = monthLabels(weeks);

  return (
    <div className="space-y-4">
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

      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-muted-foreground">
        <span>
          This year, I made {data.total.toLocaleString()} contributions
        </span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <div
              key={level}
              className={cn("size-2.5 rounded-[2px]", LEVEL_CLASS[level])}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
