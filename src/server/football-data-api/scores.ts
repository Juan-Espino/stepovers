import type { DashboardData } from "~/app/dashboard/_components/weekly-watch-dashboard";
import { GetGameWeekSchedule } from "./teams";

// export function scheduleToMatches();
//caculate scores for all matchups and have a featured match
//also get users favorite team and filter its match in return json
//                          As well as a verdict to watch it or not!!!
export async function calculateScorePerGame(
  favorite_team: string,
): Promise<DashboardData> {
  const gameWeekSchedule = await GetGameWeekSchedule();
  const matchesWithOutScore = gameWeekSchedule.groupedByDate.map((byDate) => {
    return byDate.matches;
  });

  return {
    gameweek: gameWeekSchedule.gameweek,
  };
}

//add entertainment scores manually (test)
export function addScoreToTeam(id: number): number {
  const score: Record<string, number> = {
    "1044": 45,
    "328": 36,
    "341": 20,
    "351": 17,
    "354": 21,
    "397": 17,
    "402": 39,
    "563": 29,
    "57": 15,
    "58": 22,
    "61": 48,
    "62": 11,
    "63": 17,
    "64": 48,
    "65": 49,
    "66": 50,
    "67": 35,
    "71": 0,
    "73": 7,
    "76": 3,
    "1076": 46,
    "322": 42,
    "349": 38,
  };

  return score[String(id)] ?? 0;
}
