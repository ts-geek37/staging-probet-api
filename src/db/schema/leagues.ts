import { pgTable, integer, text, boolean, timestamp } from "drizzle-orm/pg-core"
import { countries } from "./countries"

export const leagues = pgTable("leagues", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  shortCode: text("short_code"),
  type: text("type").notNull(),
  logo: text("logo"),
  countryId: integer("country_id")
    .references(() => countries.id),
  hasStandings: boolean("has_standings"),
  hasRounds: boolean("has_rounds"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
})
