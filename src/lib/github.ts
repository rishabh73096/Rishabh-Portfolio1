export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionData {
  total: number;
  days: ContributionDay[];
}

/**
 * Fetches the last-year GitHub contribution calendar for a username via the
 * public jogruber/github-contributions-api (no token required). Returns
 * null on any failure so callers can degrade gracefully instead of
 * breaking the build.
 */
export async function getGithubContributions(
  username: string
): Promise<ContributionData | null> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;

    const data = await res.json();
    if (!Array.isArray(data?.contributions)) return null;

    return {
      total: data?.total?.lastYear ?? 0,
      days: data.contributions,
    };
  } catch {
    return null;
  }
}
