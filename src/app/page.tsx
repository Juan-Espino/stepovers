import {
  GetGameWeekSchedule,
  filterGamesByDate,
} from "~/server/football-data-api/teams";
import { withFourScheduleDays } from "~/server/football-data-api/dashboard-preview";
import Hero from "./_hero/hero";
import PredictBestMatches from "./_components/predict-best-matches";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ preview?: string }>;
}) {
  const schedule = await GetGameWeekSchedule();
  const { preview } = await searchParams;
  const isPreview =
    process.env.NODE_ENV === "development" && preview === "four-days";
  const groupedByDate = isPreview
    ? filterGamesByDate(
        withFourScheduleDays(
          schedule.groupedByDate.flatMap((day) => day.matches),
        ),
      )
    : schedule.groupedByDate;

  return (
    <main className="text-white">
      <Hero
        gameweek={schedule.gameweek}
        groupedByDate={groupedByDate}
        preview={isPreview}
      />
      <PredictBestMatches />
    </main>
  );
}
