import { env } from "~/env";
import { NextResponse } from "next/server";
import { db } from "../db";
import { teams_table } from "../db/schema";
import { addScoreToTeam } from "./score-map";

type TeamInsert = typeof teams_table.$inferInsert;
const matchDisplayTimeZone = "America/Los_Angeles";
const footballDataMatchesUrl =
  "https://api.football-data.org/v4/competitions/PL/matches";
const gameWeekScheduleCacheSeconds = 60 * 60 * 6;
const seededFallbackDateRange = {
  dateFrom: "2026-05-20",
  dateTo: "2026-05-26",
};

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
    chaosScore: addScoreToTeam(team.id, "chaos"),
    bigGamesScore: addScoreToTeam(team.id, "big games"),
    tacticalScore: addScoreToTeam(team.id, "tactical"),
  };
}

//add current teams in the Prem to db teams_table
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
  id: number;
  name: string;
  shortName: string;
  crest: string;
};
//objects from api
export type MatchFootBallData = {
  id: number;
  utcDate: string;
  matchday: number;
  season: { startDate: string; endDate: string };
  homeTeam: TeamFootBallData;
  awayTeam: TeamFootBallData;
};

type FootballDataMatchesResponse = {
  matches: MatchFootBallData[];
};

export type Team = {
  id: number;
  name: string;
  shortName: string;
  badgeUrl: string;
};

export type Match = {
  id: string;
  kickoff: string;
  time: string;
  gameweek: number;
  season: string;
  homeTeam: Team;
  awayTeam: Team;
};

export type MatchesByDate = {
  date: string;
  matches: Match[];
};

export function toTeam(team: TeamFootBallData): Team {
  return {
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    badgeUrl: team.crest,
  };
}

export function formatMatchDate(utcDate: string) {
  const kickoff = new Date(utcDate);

  return {
    day: new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: matchDisplayTimeZone,
    })
      .format(kickoff)
      .toLowerCase(),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: matchDisplayTimeZone,
    })
      .format(kickoff)
      .toLowerCase(),
  };
}

function formatApiDate(date: Date) {
  return date.toISOString().split("T")[0]!;
}

function getZonedCalendarDate(date: Date) {
  const dateParts = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: matchDisplayTimeZone,
  }).formatToParts(date);

  const year = Number(dateParts.find((part) => part.type === "year")?.value);
  const month = Number(dateParts.find((part) => part.type === "month")?.value);
  const day = Number(dateParts.find((part) => part.type === "day")?.value);

  return new Date(Date.UTC(year, month - 1, day));
}

function getGameWeekDateRange(date = new Date()) {
  const currentDate = getZonedCalendarDate(date);
  const daysSinceWednesday = (currentDate.getUTCDay() + 4) % 7;
  const dateFrom = new Date(currentDate);
  dateFrom.setUTCDate(currentDate.getUTCDate() - daysSinceWednesday);

  const dateTo = new Date(dateFrom);
  dateTo.setUTCDate(dateFrom.getUTCDate() + 6);

  return {
    dateFrom: formatApiDate(dateFrom),
    dateTo: formatApiDate(dateTo),
  };
}

async function fetchPremierLeagueMatches({
  dateFrom,
  dateTo,
}: {
  dateFrom: string;
  dateTo: string;
}) {
  const matchesUrl = new URL(footballDataMatchesUrl);
  matchesUrl.searchParams.set("dateFrom", dateFrom);
  matchesUrl.searchParams.set("dateTo", dateTo);

  const res = await fetch(matchesUrl, {
    headers: { "X-Auth-Token": env.FOOTBALL_DATA_API_KEY },
    next: { revalidate: gameWeekScheduleCacheSeconds },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Premier League Matches");
  }

  const data = (await res.json()) as FootballDataMatchesResponse;
  return data.matches.map((match) => toMatch(match));
}

export function toMatch(match: MatchFootBallData): Match {
  const formattedDate = formatMatchDate(match.utcDate);

  return {
    id: String(match.id),
    kickoff: match.utcDate,
    time: formattedDate.time,
    gameweek: match.matchday,
    season: `${match.season.startDate.slice(0, 4)}-${match.season.endDate.slice(2, 4)}`,
    homeTeam: toTeam(match.homeTeam),
    awayTeam: toTeam(match.awayTeam),
  };
}

export function filterGamesByDate(matches: readonly Match[]): MatchesByDate[] {
  const groupedByDate = matches.reduce(
    (acc, match) => {
      const day = formatMatchDate(match.kickoff).day;
      (acc[day] ??= []).push(match);
      return acc;
    },
    {} as Record<string, Match[]>,
  );

  return Object.entries(groupedByDate).map(([date, matches]) => ({
    date: date.replace(/, \d{4}$/, ""),
    matches,
  }));
}

type GameWeekSchedule = {
  groupedByDate: MatchesByDate[];
  gameweek: number;
};

export type GameWeekMatches = {
  matches: Match[];
  gameweek: number;
  season: string;
};

const isProduction = env.NODE_ENV === "production";

export async function GetGameWeekMatches(): Promise<GameWeekMatches> {
  const matches = await fetchPremierLeagueMatches(getGameWeekDateRange());
  const scheduleMatches =
    matches.length > 0 || isProduction
      ? matches
      : await fetchPremierLeagueMatches(seededFallbackDateRange);

  let season = scheduleMatches[0]?.season;
  if (!season) {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL",
      {
        headers: { "X-Auth-Token": env.FOOTBALL_DATA_API_KEY },
        next: { revalidate: gameWeekScheduleCacheSeconds },
      },
    );
    if (!response.ok) throw new Error("Failed to fetch Premier League season");
    const competition = (await response.json()) as {
      currentSeason: { startDate: string; endDate: string };
    };
    season = `${competition.currentSeason.startDate.slice(0, 4)}-${competition.currentSeason.endDate.slice(2, 4)}`;
  }

  return {
    matches: scheduleMatches,
    gameweek: scheduleMatches[0]?.gameweek ?? 0,
    season,
  };
}

export async function GetGameWeekSchedule(): Promise<GameWeekSchedule> {
  const { matches, gameweek } = await GetGameWeekMatches();
  const groupedByDate = filterGamesByDate(matches);

  return {
    groupedByDate: groupedByDate,
    gameweek,
  };
}
