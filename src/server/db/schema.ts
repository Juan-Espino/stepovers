// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { index, pgTableCreator, text, timestamp } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `stepovers_${name}`);

export const users_table = createTable(
  "users_table",
  {
    id: text().primaryKey().notNull(),
    favoriteTeam: text("favorite_team").notNull(),
    playStyle: text("play_style").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("id_idx").on(t.id)],
);

export const teams_table = createTable("teams_table", {
  id: text().primaryKey().notNull(),
  name: text(),
  shortName: text(),
  badgeUrl: text(),
});
