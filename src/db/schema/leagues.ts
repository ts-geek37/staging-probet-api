import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { countries } from "./countries";

export const leagues = pgTable(
  "leagues",
  {
    id: integer("id").primaryKey(),

    name: text("name").notNull(),
    shortCode: text("short_code"),
    type: text("type").notNull(),
    subtype: text("subtype"),
    logo: text("logo"),

    countryId: integer("country_id").references(() => countries.id),

    hasStandings: boolean("has_standings"),
    hasRounds: boolean("has_rounds"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("leagues_country_id_idx").on(table.countryId),
    index("leagues_type_idx").on(table.type),
    index("leagues_short_code_idx").on(table.shortCode),
    index("leagues_name_idx").on(table.name),
  ]
);
