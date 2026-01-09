import { badRequest, success, unauthorized } from "@/utils";
import { Request } from "express";
import { UserRepository } from "../user";
import { BillingService } from "./billing.service";

export class BillingController {
  constructor(private readonly service: BillingService) {}

  createCheckoutSession = async (req: Request) => {
    const user = req.user;
    if (!user) throw unauthorized("User not authenticated");

    const { billing_cycle } = req.body;
    if (
      billing_cycle !== "monthly" &&
      billing_cycle !== "quarterly" &&
      billing_cycle !== "semi_annual" &&
      billing_cycle !== "yearly"
    ) {
      throw badRequest("Invalid billing cycle");
    }

    const data = await this.service.createCheckoutSession({
      userId: user.id,
      email: user.email,
      stripeCustomerId: user.stripeCustomerId,
      billingCycle: billing_cycle,
      successUrl: `${process.env.APP_URL}/billing/success`,
      cancelUrl: `${process.env.APP_URL}/billing/cancel`,
    });

    if (!user.stripeCustomerId) {
      await UserRepository.updateStripeCustomerId(
        user.id,
        data.stripeCustomerId
      );
    }

    return success({
      checkout_url: data.checkoutUrl,
    });
  };

  getSubscription = async (req: Request) => {
    const user = req.user;
    if (!user) throw unauthorized("User not authenticated");

    const subscription = await this.service.getUserSubscription(user.id);
 
    if (!subscription) {
      return success({
        is_vip: false,
        status: null,
        billing_cycle: null,
        current_period_end: null,
      });
    }

    return success({
      is_vip:
        subscription.status === "active" &&
        subscription.currentPeriodEnd > new Date(),
      status: subscription.status,
      billing_cycle: subscription.billingCycle,
      current_period_end: subscription.currentPeriodEnd,
    });
  };
}
