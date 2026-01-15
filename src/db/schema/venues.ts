import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { countries } from "./countries";

export const venues = pgTable(
  "venues",
  {
    id: integer("id").primaryKey(),

    name: text("name").notNull(),

    city: text("city"),

    capacity: integer("capacity"),
    image: text("image"),

    countryId: integer("country_id").references(() => countries.id),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("venues_country_id_idx").on(table.countryId),
    index("venues_name_idx").on(table.name),
  ]
);
