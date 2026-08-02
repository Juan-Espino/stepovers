import { requireOnboardedUser } from "~/server/auth/require-onboarded-user";
import WeeklyWatchDashboard from "./_components/weekly-watch-dashboard";
import { calculateScorePerGame } from "~/server/football-data-api/scores";

export default async function Dashboard() {
  const user = await requireOnboardedUser();

  const dashboardData = await calculateScorePerGame(
    user.favoriteTeam,
    user.playStyle,
  );

  return <WeeklyWatchDashboard {...dashboardData} />;
}
