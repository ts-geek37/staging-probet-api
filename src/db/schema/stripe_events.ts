import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const stripeEvents = pgTable("stripe_events", {
  eventId: text("event_id").primaryKey(),

  eventType: text("event_type").notNull(),

  processedAt: timestamp("processed_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
