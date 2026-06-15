"server-only";
import { asc } from "drizzle-orm";
import { db } from ".";
import { teams_table, users_table } from "./schema";
import type { PlayStyleTypes } from "./schema";

export const QUERIES = {
  getAllTeams: async function () {
    const teams = await db
      .select()
      .from(teams_table)
      .orderBy(asc(teams_table.name));
    if (!teams[0]) {
      throw new Error("List of teams not found");
    }
    return teams;
  },
};

export const MUTATIONS = {
  onBoardUser: async function (
    userId: string,
    favoriteTeam: string,
    playStyle: PlayStyleTypes,
  ) {
    await db
      .insert(users_table)
      .values({
        id: userId,
        favoriteTeam: favoriteTeam,
        playStyle: playStyle,
      })
      .onConflictDoUpdate({
        target: users_table.id,
        set: {
          favoriteTeam: favoriteTeam,
          playStyle: playStyle,
        },
      });
  },
};
