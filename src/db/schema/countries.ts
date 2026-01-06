import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";

export const countries = pgTable("countries", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  iso2: text("iso2"),
  continent: text("continent"),
  flag: text("flag"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
