import { requireOnboardedUser } from "~/server/auth/require-onboarded-user";
import WeeklyWatchDashboard from "./_components/weekly-watch-dashboard";
import { calculateScorePerGame } from "~/server/football-data-api/scores";

import { withFourMatchdays } from "~/server/football-data-api/dashboard-preview";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const user = await requireOnboardedUser();

  const dashboardData = await calculateScorePerGame(
    user.favoriteTeam,
    user.playStyle,
  );

  const { preview } = await searchParams;
  const isPreview =
    process.env.NODE_ENV === "development" && preview === "four-days";
  return (
    <WeeklyWatchDashboard
      {...(isPreview ? withFourMatchdays(dashboardData) : dashboardData)}
    />
  );
}
