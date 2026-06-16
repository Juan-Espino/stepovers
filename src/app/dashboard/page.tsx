import { requireOnboardedUser } from "~/server/auth/require-onboarded-user";
import WeeklyWatchDashboard from "./_components/weekly-watch-dashboard";
import { gameweek30 } from "../sample-data/gameweek30";

function getFavoriteVerdict(score: number | null) {
  if (score === null) {
    return {
      label: "no fixture",
      detail:
        "Your favorite team is not on this gameweek slate, so this week is all about the neutral pick.",
      tone: "pass" as const,
    };
  }

  if (score >= 80) {
    return {
      label: "watch",
      detail:
        "Your team clears the watch line this week. Make time for the full match instead of waiting for highlights.",
      tone: "watch" as const,
    };
  }

  return {
    label: "highlights",
    detail:
      "This one is playable as highlights unless you are locked in for every minute of your team.",
    tone: "pass" as const,
  };
}

export default async function Dashboard() {
  const user = await requireOnboardedUser();
  const featuredMatch = gameweek30.matches.find(
    (match) => match.id === gameweek30.overallPick.matchId,
  );
  const favoriteMatch =
    gameweek30.matches.find(
      (match) =>
        match.homeTeam.name === user.favoriteTeam ||
        match.awayTeam.name === user.favoriteTeam,
    ) ?? null;

  if (!featuredMatch) {
    throw new Error("Match of the week not found");
  }

  return (
    <WeeklyWatchDashboard
      gameweek={gameweek30.gameweek}
      season={gameweek30.season}
      favoriteTeam={user.favoriteTeam}
      featuredMatch={featuredMatch}
      featuredReason={gameweek30.overallPick.reason}
      favoriteMatch={favoriteMatch}
      favoriteVerdict={getFavoriteVerdict(
        favoriteMatch?.entertainmentScore ?? null,
      )}
      matches={[...gameweek30.matches]}
    />
  );
}
