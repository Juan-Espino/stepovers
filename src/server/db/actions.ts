"use server";

import { redirect } from "next/navigation";
import { MUTATIONS } from "./queries";
import type { PlayStyleTypes } from "./schema";

export async function onBoardUser(
  userId: string,
  favoriteTeam: string,
  playStyle: PlayStyleTypes,
) {
  await MUTATIONS.onBoardUser(userId, favoriteTeam, playStyle);
  redirect("/dashboard");
}
