"use server";

import { redirect } from "next/navigation";
import { MUTATIONS } from "./queries";
import type { PlayStyleTypes } from "./schema";
import { auth } from "@clerk/nextjs/server";

export async function onBoardUser(
  favoriteTeam: string,
  playStyle: PlayStyleTypes,
) {
  const user = await auth();

  await MUTATIONS.onBoardUser(user.userId!, favoriteTeam, playStyle);
  redirect("/dashboard");
}
