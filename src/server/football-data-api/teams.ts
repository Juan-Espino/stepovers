import { env } from "~/env";
import { NextResponse } from "next/server";
import { db } from "../db";
import { teams_table } from "../db/schema";

type TeamInsert = typeof teams_table.$inferInsert;

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

// TODO:add refresh function
