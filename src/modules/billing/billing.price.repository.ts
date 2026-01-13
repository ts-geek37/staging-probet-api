import { db } from "@/db";
import { billingPrices } from "@/db/schema/billing_prices";
import { and, eq } from "drizzle-orm";

export class BillingPriceRepository {
  getActivePrice = async (params: {
    product: string;
    billingCycle: string;
    currency: string;
  }) => {
    const [price] = await db
      .select()
      .from(billingPrices)
      .where(
        and(
          eq(billingPrices.product, params.product),
          eq(billingPrices.billingCycle, params.billingCycle),
          eq(billingPrices.currency, params.currency),
          eq(billingPrices.active, true)
        )
      )
      .limit(1);

    return price ?? null;
  };

  getActivePlans = async (product: string) => {
    return db
      .select({
        product: billingPrices.product,
        billingCycle: billingPrices.billingCycle,
        currency: billingPrices.currency,
        amount: billingPrices.amount,
        intervalLabel: billingPrices.billingCycle,
      })
      .from(billingPrices)
      .where(
        and(eq(billingPrices.product, product), eq(billingPrices.active, true))
      );
  };

  getBillingCycleByPriceId = async (priceId: string) => {
    const row = await db
      .select({ billingCycle: billingPrices.billingCycle })
      .from(billingPrices)
      .where(eq(billingPrices.stripePriceId, priceId))
      .limit(1);

    if (!row.length) {
      throw new Error(`Unknown Stripe price: ${priceId}`);
    }

    return row[0].billingCycle;
  };
}
