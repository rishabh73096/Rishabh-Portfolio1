import type { ContributionDay } from "@/lib/github";

/** An all-empty (level 0) calendar for a year we have no fetched data for. */
export function generateEmptyYear(year: number): ContributionDay[] {
  const days: ContributionDay[] = [];
  const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  const daysInYear = isLeap ? 366 : 365;
  const start = new Date(Date.UTC(year, 0, 1));
  for (let i = 0; i < daysInYear; i++) {
    const d = new Date(start);
    d.setUTCDate(start.getUTCDate() + i);
    days.push({ date: d.toISOString().slice(0, 10), count: 0, level: 0 });
  }
  return days;
}

export const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Chunk a chronological (ascending) list of days into Sunday-start weeks, padding the first week. */
export function toWeeks(days: ContributionDay[]) {
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

/** One label per month, skipping a label that would overlap the previous one. */
export function monthLabels(weeks: (ContributionDay | null)[][]) {
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
