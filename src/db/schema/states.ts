import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const states = pgTable(
  "states",
  {
    id: integer("id").primaryKey(),

    state: text("state").notNull(),
    name: text("name").notNull(),

    shortName: text("short_name"),
    developerName: text("developer_name").notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("states_state_idx").on(table.state),
    index("states_developer_name_idx").on(table.developerName),
    index("states_name_idx").on(table.name),
  ]
);
