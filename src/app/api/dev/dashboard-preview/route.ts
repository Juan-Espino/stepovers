import { NextResponse } from "next/server";
import { requireOnboardedUser } from "~/server/auth/require-onboarded-user";
import { calculateScorePerGame } from "~/server/football-data-api/scores";
import { withFourMatchdays } from "~/server/football-data-api/dashboard-preview";

export async function GET() {
  if (process.env.NODE_ENV !== "development")
    return new NextResponse(null, { status: 404 });
  const user = await requireOnboardedUser();
  const data = await calculateScorePerGame(user.favoriteTeam, user.playStyle);
  return NextResponse.json(
    {
      scenario: "four-matchdays",
      simulatedFields: ["date", "calendarDate", "kickoff"],
      ...withFourMatchdays(data),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
