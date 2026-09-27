import { getGithubContributions } from "@/lib/github";
import { GithubContributionsClient } from "@/components/github-contributions-client";

export async function GithubContributions({ username }: { username: string }) {
  const data = await getGithubContributions(username);

  if (!data) {
    return (
      <p className="text-sm text-muted-foreground">
        GitHub activity is unavailable right now.
      </p>
    );
  }

  return <GithubContributionsClient data={data} />;
}
