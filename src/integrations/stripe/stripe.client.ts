
import Stripe from "stripe";
// do not update the logger import, helps with handling tsconfig error while running seed script
import logger from "../../logger";

const STRIPE_API_VERSION: Stripe.LatestApiVersion =
  (process.env.STRIPE_API_VERSION as Stripe.LatestApiVersion) ??
  "2025-12-15.clover";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export class StripeClient {
  private static instance: Stripe;

  static getInstance(): Stripe {
    if (!StripeClient.instance) {
      StripeClient.instance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: STRIPE_API_VERSION,
        typescript: true,
      });

      logger.info("Stripe client initialized", {
        apiVersion: STRIPE_API_VERSION,
      });
    }

    return StripeClient.instance;
  }
}
