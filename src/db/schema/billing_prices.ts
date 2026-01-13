import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const billingPrices = pgTable("billing_prices", {
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
});
