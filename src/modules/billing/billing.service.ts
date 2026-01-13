import { StripeClient } from "@/integrations/stripe";
import logger from "@/logger";
import { BillingCycle } from "./billing.constants";
import { BillingPriceRepository } from "./billing.price.repository";
import { BillingRepository } from "./billing.repository";

export class BillingService {
  constructor(
    private readonly billingPriceRepository: BillingPriceRepository
  ) {}
  createCheckoutSession = async (params: {
    userId: string;
    email: string;
    stripeCustomerId: string | null;
    billingCycle: BillingCycle;
    successUrl: string;
    cancelUrl: string;
  }): Promise<{ checkoutUrl: string; stripeCustomerId: string }> => {
    const {
      userId,
      email,
      stripeCustomerId,
      billingCycle,
      successUrl,
      cancelUrl,
    } = params;

    const existingSubscription =
      await BillingRepository.getActiveUserSubscription(userId);

    if (existingSubscription) {
      throw new Error("ALREADY_SUBSCRIBED");
    }

    const price = await this.billingPriceRepository.getActivePrice({
      product: "vip",
      billingCycle,
      currency: "USD",
    });

    if (!price) throw new Error("PRICE_NOT_FOUND");

    const priceId = price.stripePriceId;

    if (!priceId) {
      throw new Error("INVALID_PLAN");
    }

    const stripe = StripeClient.getInstance();

    const customerId =
      stripeCustomerId ??
      (await this.createStripeCustomer({
        userId,
        email,
      }));

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        billingCycle,
      },
    });

    logger.info("Stripe checkout session created", {
      userId,
      customerId,
      billingCycle,
      sessionId: session.id,
    });

    return {
      checkoutUrl: session.url!,
      stripeCustomerId: customerId,
    };
  };

  getUserSubscription = async (userId: string) => {
    return BillingRepository.getUserSubscription(userId);
  };

  private createStripeCustomer = async (params: {
    userId: string;
    email: string;
  }): Promise<string> => {
    const stripe = StripeClient.getInstance();

    const customer = await stripe.customers.create({
      email: params.email,
      metadata: {
        userId: params.userId,
      },
    });

    logger.info("Stripe customer created", {
      userId: params.userId,
      stripeCustomerId: customer.id,
    });

    return customer.id;
  };
}
