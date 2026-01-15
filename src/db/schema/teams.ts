import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { countries } from "./countries";

export const teams = pgTable(
  "teams",
  {
    id: integer("id").primaryKey(),

    name: text("name").notNull(),
    shortCode: text("short_code"),
    logo: text("logo"),

    countryId: integer("country_id").references(() => countries.id),

    venueName: text("venue_name"),
    foundedYear: integer("founded_year"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("teams_country_id_idx").on(table.countryId),
    index("teams_short_code_idx").on(table.shortCode),
    index("teams_name_idx").on(table.name),
  ]
);
