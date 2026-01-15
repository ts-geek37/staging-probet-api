import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    clerkUserId: text("clerk_user_id").notNull().unique(),

    email: text("email").notNull().unique(),

    firstName: text("first_name"),
    lastName: text("last_name"),

    stripeCustomerId: text("stripe_customer_id").unique(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [index("users_created_at_idx").on(table.createdAt)]
);
