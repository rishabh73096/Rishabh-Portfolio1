export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  /** Years with data, most recent first. */
  years: string[];
  /** Total contributions per year, e.g. { "2026": 191 }. */
  totals: Record<string, number>;
  /** Each year's days, sorted chronologically ascending (Jan 1 -> Dec 31). */
  daysByYear: Record<string, ContributionDay[]>;
}

/**
 * Fetches the full multi-year GitHub contribution calendar for a username via
 * the public jogruber/github-contributions-api (no token required). Returns
 * null on any failure so callers can degrade gracefully instead of breaking
 * the build.
 */
export async function getGithubContributions(
  username: string
): Promise<ContributionData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=all`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    const totals: Record<string, number> = data?.total ?? {};
    const allDays: ContributionDay[] = Array.isArray(data?.contributions)
      ? data.contributions
      : [];
    if (allDays.length === 0) return null;

    const daysByYear: Record<string, ContributionDay[]> = {};
    for (const day of allDays) {
      const year = day.date.slice(0, 4);
      (daysByYear[year] ??= []).push(day);
    }
    for (const year of Object.keys(daysByYear)) {
      daysByYear[year].sort((a, b) => a.date.localeCompare(b.date));
    }

    const years = Object.keys(totals).sort((a, b) => Number(b) - Number(a));

    return { years, totals, daysByYear };
  } catch {
    return null;
  }
}
