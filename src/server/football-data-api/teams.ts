import { env } from "~/env";
import { NextResponse } from "next/server";

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

  const data = await res.json();

  const teams = data.teams.map((team: any) => ({
    id: team.id,
    name: team.name,
    shortName: team.shortName,
    crest: team.crest,
  }));

  console.log(teams);
}

// TODO:add refresh function
