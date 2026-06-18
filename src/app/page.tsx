import { GetGameWeekSchedule } from "~/server/football-data-api/teams";
import Hero from "./_hero/hero";
import PredictBestMatches from "./_components/predict-best-matches";

export default async function HomePage() {
  const groupedByDate = await GetGameWeekSchedule();

  return (
    <main className="text-white">
      <Hero
        gameweek={groupedByDate.gameweek}
        groupedByDate={groupedByDate.groupedByDate}
      />
      <PredictBestMatches />
    </main>
  );
}
