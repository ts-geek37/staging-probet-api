import { db } from "@/db";
import { stripeEvents } from "@/db/schema/stripe_events";
import { subscriptions } from "@/db/schema/subscription";
import { and, eq, gt } from "drizzle-orm";

export class BillingRepository {
  static async getUserSubscription(userId: string) {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .limit(1);

    return subscription ?? null;
  }

  static async getActiveUserSubscription(userId: string) {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(
        and(
          eq(subscriptions.userId, userId),
          eq(subscriptions.status, "active"),
          gt(subscriptions.currentPeriodEnd, new Date())
        )
      )
      .limit(1);

    return subscription ?? null;
  }

  static async upsertSubscription(params: {
    userId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    status: "active" | "past_due" | "canceled";
    billingCycle?: string | null;
    currentPeriodEnd: Date;
  }) {
    const existing = await db
      .select()
      .from(subscriptions)
      .where(
        eq(subscriptions.stripeSubscriptionId, params.stripeSubscriptionId)
      )
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(subscriptions)
        .set({
          status: params.status,
          stripePriceId: params.stripePriceId,
          billingCycle: params.billingCycle,
          currentPeriodEnd: params.currentPeriodEnd,
          updatedAt: new Date(),
        })
        .where(
          eq(subscriptions.stripeSubscriptionId, params.stripeSubscriptionId)
        );
      return;
    }

    await db.insert(subscriptions).values({
      userId: params.userId,
      stripeSubscriptionId: params.stripeSubscriptionId,
      stripePriceId: params.stripePriceId,
      status: params.status,
      billingCycle: params.billingCycle,
      currentPeriodEnd: params.currentPeriodEnd,
    });
  }

  static async markSubscriptionCanceled(stripeSubscriptionId: string) {
    await db
      .update(subscriptions)
      .set({
        status: "canceled",
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
  }

  static async hasProcessedStripeEvent(eventId: string): Promise<boolean> {
    const [event] = await db
      .select()
      .from(stripeEvents)
      .where(eq(stripeEvents.eventId, eventId))
      .limit(1);

    return !!event;
  }

  static async markStripeEventProcessed(eventId: string, eventType: string) {
    await db.insert(stripeEvents).values({
      eventId,
      eventType,
    });
  }
}
