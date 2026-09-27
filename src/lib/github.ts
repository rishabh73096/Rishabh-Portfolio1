export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  /** Years with data, most recent first. */
  years: string[];
  /** Total contributions per year, e.g. { "2026": 1321 }. */
  totals: Record<string, number>;
  /** Each year's days, sorted chronologically ascending (Jan 1 -> Dec 31). */
  daysByYear: Record<string, ContributionDay[]>;
}

const FETCH_HEADERS = {
  "User-Agent": "Mozilla/5.0 (compatible; portfolio-contribution-graph)",
};

/** GitHub's own public contribution calendar for one calendar year (HTML). */
async function fetchYear(username: string, year: number) {
  const res = await fetch(
    `https://github.com/users/${username}/contributions?from=${year}-01-01&to=${year}-12-31`,
    { headers: FETCH_HEADERS, next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const html = await res.text();

  const totalMatch = html.match(
    /id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s*\n?\s*contributions?\b/
  );
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, "")) : 0;

  const days: ContributionDay[] = [];
  const dayRe = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
  let m: RegExpExecArray | null;
  while ((m = dayRe.exec(html))) {
    days.push({ date: m[1], count: 0, level: Number(m[2]) as ContributionDay["level"] });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  return { total, days };
}

async function accountCreationYear(username: string): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: FETCH_HEADERS,
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error("not ok");
    const data = await res.json();
    return new Date(data.created_at).getFullYear();
  } catch {
    return new Date().getFullYear() - 4;
  }
}

/**
 * Scrapes GitHub's own public contribution calendar (github.com/users/{u}/contributions)
 * year by year. This mirrors exactly what shows on the user's profile — including
 * private contributions, once "Include private contributions on my profile" is on —
 * with no token and no third-party caching lag.
 */
export async function getGithubContributions(
  username: string
): Promise<ContributionData | null> {
  try {
    const currentYear = new Date().getFullYear();
    const startYear = await accountCreationYear(username);
    const yearList: number[] = [];
    for (let y = currentYear; y >= startYear; y--) yearList.push(y);

    const results = await Promise.all(
      yearList.map((y) => fetchYear(username, y))
    );

    const totals: Record<string, number> = {};
    const daysByYear: Record<string, ContributionDay[]> = {};
    const years: string[] = [];

    results.forEach((r, i) => {
      if (!r || r.days.length === 0) return;
      const year = String(yearList[i]);
      years.push(year);
      totals[year] = r.total;
      daysByYear[year] = r.days;
    });

    if (years.length === 0) return null;
    return { years, totals, daysByYear };
  } catch {
    return null;
  }
}
