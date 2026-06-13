"server-only";
import { db } from "./db";
import { teams_table } from "./db/schema";

export const QUERIES = {
  getAllTeams: async function () {
    const teams = await db.select().from(teams_table);
    if (!teams[0]) {
      throw new Error("List of teams not found");
    }

    return teams;
  },
};
