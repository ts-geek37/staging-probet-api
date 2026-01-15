import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const billingPrices = pgTable(
  "billing_prices",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    product: text("product").notNull(),
    billingCycle: text("billing_cycle").notNull(),
    currency: text("currency").notNull(),

    amount: text("amount").notNull(),

    stripePriceId: text("stripe_price_id").notNull().unique(),

    active: boolean("active").default(true).notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("billing_prices_lookup_idx").on(
      table.product,
      table.billingCycle,
      table.currency,
      table.active
    ),

    index("billing_prices_active_idx").on(table.active),
  ]
);
