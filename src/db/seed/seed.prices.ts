import "dotenv/config";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { StripeClient } from "../../integrations/stripe";
import logger from "../../logger";
import { billingPrices } from "../schema/billing_prices";

const deriveBillingCycle = (
  interval: "month" | "year" | "day" | "week",
  intervalCount: number
): string | null => {
  if (interval === "month" && intervalCount === 1) return "monthly";
  if (interval === "month" && intervalCount === 3) return "quarterly";
  if (interval === "month" && intervalCount === 6) return "semi_annual";
  if (interval === "year" && intervalCount === 1) return "yearly";
  return null;
};

export const seedBillingPrices = async () => {
  logger.info("🔄 Syncing billing prices from Stripe...");
  const stripe = StripeClient.getInstance();

  const prices = await stripe.prices.list({
    active: true,
    expand: ["data.product"],
    limit: 100,
  });

  const activeStripePriceIds = new Set<string>();

  for (const price of prices.data) {
    if (!price.product || typeof price.product === "string") continue;
    if (!price.recurring) continue;

    const billingCycle = deriveBillingCycle(
      price.recurring.interval,
      price.recurring.interval_count
    );

    if (!billingCycle) {
      logger.warn(`⚠️ Unsupported billing cycle for price ${price.id}`);
      continue;
    }

    const unitAmount =
      price.unit_amount ??
      (price.unit_amount_decimal ? Number(price.unit_amount_decimal) : null);

    if (!unitAmount) continue;

    activeStripePriceIds.add(price.id);

    const existing = await db
      .select()
      .from(billingPrices)
      .where(eq(billingPrices.stripePriceId, price.id))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(billingPrices).values({
        product: "vip",
        stripePriceId: price.id,
        billingCycle,
        amount: (unitAmount / 100).toString(),
        currency: price.currency.toUpperCase(),
        active: true,
      });

      logger.info(`✅ Inserted ${billingCycle}`);
    } else {
      await db
        .update(billingPrices)
        .set({
          billingCycle,
          amount: (unitAmount / 100).toString(),
          currency: price.currency.toUpperCase(),
          active: true,
          updatedAt: new Date(),
        })
        .where(eq(billingPrices.stripePriceId, price.id));

      logger.info(`🔁 Updated ${billingCycle}`);
    }
  }

  // Mark removed Stripe prices as inactive
  await db
    .update(billingPrices)
    .set({ active: false })
    .where(eq(billingPrices.product, "vip"));

  for (const stripePriceId of activeStripePriceIds) {
    await db
      .update(billingPrices)
      .set({ active: true })
      .where(eq(billingPrices.stripePriceId, stripePriceId));
  }

  logger.info("✅ Billing prices sync complete");
};

const run = async () => {
  try {
    await seedBillingPrices();
    process.exit(0);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

run();
