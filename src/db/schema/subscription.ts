import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { users } from "./users";

export const subscriptionStatusEnum = pgEnum("subscription_status", [
  "active",
  "past_due",
  "canceled",
]);

export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),

    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),

    stripePriceId: text("stripe_price_id").notNull(),

    status: subscriptionStatusEnum("status").notNull(),

    billingCycle: text("billing_cycle"),

    currentPeriodEnd: timestamp("current_period_end", {
      withTimezone: true,
    }).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("idx_subscriptions_user_active").on(
      table.userId,
      table.status,
      table.currentPeriodEnd
    ),

    index("idx_subscriptions_user_id").on(table.userId),

    index("idx_subscriptions_status").on(table.status),
  ]
);
