import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core"
import { countries } from "./countries"

export const teams = pgTable("teams", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  shortCode: text("short_code"),
  logo: text("logo"),
  countryId: integer("country_id")
    .notNull()
    .references(() => countries.id),
  venueName: text("venue_name"),
  foundedYear: integer("founded_year"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull()
})
