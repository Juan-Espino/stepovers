import { env } from "~/env";
import { NextResponse } from "next/server";
import { db } from "../db";
import { teams_table } from "../db/schema";
import { gameweek30 } from "~/app/sample-data/gameweek30";

type TeamInsert = typeof teams_table.$inferInsert;

//objects from api

export type FootballDataTeam = {
  id: number;
  name: string;
  shortName: string;
  crest: string;
};

export type FootballDataTeamsResponse = {
  teams: FootballDataTeam[];
};

function toTeamRow(team: FootballDataTeam): TeamInsert {
  return {
    id: String(team.id),
    name: team.name,
    shortName: team.shortName,
    badgeUrl: team.crest, // API crest → DB badgeUrl
  };
}

export async function GET() {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/PL/teams",
    {
      headers: { "X-Auth-Token": env.FOOTBALL_DATA_API_KEY },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch Premier League teams" },
      { status: res.status },
    );
  }

  const data = (await res.json()) as FootballDataTeamsResponse;

  const teams = data.teams.map(toTeamRow);

  await db.transaction(async (tx) => {
    await tx.delete(teams_table);
    await tx.insert(teams_table).values(teams);
  });
}

//objects from api
export type TeamFootBallData = {
  name: string;
  shortName: string;
  crest: string;
};
//objects from api
export type MatchFootBallData = {
  id: number;
  utcDate: string;
  matchday: number;
  homeTeam: TeamFootBallData;
  awayTeam: TeamFootBallData;
};

export type Team = {
  name: string;
  shortName: string;
  badgeUrl: string;
};

export type Match = {
  id: string;
  kickoff: string;
  gameweek: number;
  homeTeam: Team;
  awayTeam: Team;
};

export type MatchesByDate = {
  date: string;
  matches: Match[];
};

export function toTeam(team: TeamFootBallData): Team {
  return {
    name: team.name,
    shortName: team.shortName,
    badgeUrl: team.crest,
  };
}

export function toMatch(match: MatchFootBallData): Match {
  return {
    id: String(match.id),
    kickoff: match.utcDate,
    gameweek: match.matchday,
    homeTeam: toTeam(match.homeTeam),
    awayTeam: toTeam(match.awayTeam),
  };
}

export function filterGamesByDate(matches: readonly Match[]): MatchesByDate[] {
  const groupedByDate = matches.reduce(
    (acc, match) => {
      const day = match.kickoff.split("T")[0]!;
      (acc[day] ??= []).push(match);
      return acc;
    },
    {} as Record<string, Match[]>,
  );

  return Object.entries(groupedByDate).map(([date, matches]) => ({
    date,
    matches,
  }));
}

type GameWeekSchedule = {
  groupedByDate: MatchesByDate[];
  gameweek: number;
};

export async function GetGameWeekSchedule(): Promise<GameWeekSchedule> {
  const res = await fetch(
    "https://api.football-data.org/v4/competitions/PL/matches?dateFrom=2026-05-19&dateTo=2026-05-26",

    {
      headers: { "X-Auth-Token": env.FOOTBALL_DATA_API_KEY },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Premier League Matches");
  }

  const data = await res.json();
  const matches: Match[] = data.matches.map((match: MatchFootBallData) =>
    toMatch(match),
  );

  const groupedByDate = filterGamesByDate(matches);

  return {
    groupedByDate: groupedByDate,
    gameweek: groupedByDate[0]?.matches[0]?.gameweek ?? 0,
  };
}
