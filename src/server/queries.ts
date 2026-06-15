"server-only";
import { asc } from "drizzle-orm";
import { db } from "./db";
import { teams_table } from "./db/schema";

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
