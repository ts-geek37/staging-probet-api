import { StripeClient } from "../../integrations/stripe";
import logger from "../../logger";
import Stripe from "stripe";
import { UserRepository } from "../user";
import { BillingRepository } from "./billing.repository";

export class BillingWebhookService {
  processEvent = async (rawBody: Buffer, signature: string) => {
    const stripe = StripeClient.getInstance();

    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    const processed = await BillingRepository.hasProcessedStripeEvent(event.id);
    if (processed) return;

    await BillingRepository.markStripeEventProcessed(event.id, event.type);

    if (event.type === "checkout.session.completed")
      await this.handleCheckoutCompleted(event);

    if (event.type === "customer.subscription.updated")
      await this.handleSubscriptionUpdated(event);

    if (event.type === "customer.subscription.deleted")
      await this.handleSubscriptionDeleted(event);

    if (event.type === "invoice.payment_failed")
      await this.handleInvoice(event, "past_due");

    if (event.type === "invoice.payment_succeeded")
      await this.handleInvoice(event, "active");
  };

  private handleCheckoutCompleted = async (event: Stripe.Event) => {
    const session = event.data.object as Stripe.Checkout.Session;
    if (!session.subscription || !session.metadata?.userId) return;

    const stripe = StripeClient.getInstance();
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const currentPeriodEnd = this.convertTimestampToDate(
      subscription.items?.data[0]?.current_period_end
    );

    await BillingRepository.upsertSubscription({
      userId: session.metadata.userId,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status:
        subscription.status === "active" || subscription.status === "trialing"
          ? "active"
          : "past_due",
      billingCycle: session.metadata.billingCycle,
      currentPeriodEnd,
    });

    logger.info("Subscription created", {
      userId: session.metadata.userId,
      subscriptionId: subscription.id,
    });
  };

  convertTimestampToDate = (timestamp?: number): Date | null => {
    if (typeof timestamp !== "number") return null;
    return new Date(timestamp * 1000);
  };

  private handleSubscriptionUpdated = async (event: Stripe.Event) => {
    const subscription = event.data.object as Stripe.Subscription;
    const currentPeriodEnd = this.convertTimestampToDate(
      subscription.items?.data[0]?.current_period_end
    );

    await BillingRepository.upsertSubscription({
      userId: subscription.metadata.userId!,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status:
        subscription.status === "active" || subscription.status === "trialing"
          ? "active"
          : "past_due",
      billingCycle: subscription.metadata.billingCycle,
      currentPeriodEnd,
    });
  };

  private handleSubscriptionDeleted = async (event: Stripe.Event) => {
    const subscription = event.data.object as Stripe.Subscription;
    await UserRepository.updateStripeCustomerId(
      subscription.metadata.userId!,
      null
    );
    await BillingRepository.markSubscriptionCanceled(subscription.id);
  };

  private handleInvoice = async (
    event: Stripe.Event,
    status: "active" | "past_due"
  ) => {
    const invoice = event.data.object as Stripe.Invoice;
    const line = invoice.lines.data[0];
    if (!line?.subscription) return;

    const stripe = StripeClient.getInstance();
    const subscription = await stripe.subscriptions.retrieve(
      line.subscription as string
    );
    const currentPeriodEnd = this.convertTimestampToDate(
      subscription.items?.data[0]?.current_period_end
    );

    await BillingRepository.upsertSubscription({
      userId: subscription.metadata.userId!,
      stripeSubscriptionId: subscription.id,
      stripePriceId: subscription.items.data[0].price.id,
      status,
      billingCycle: subscription.metadata.billingCycle,
      currentPeriodEnd,
    });
  };
}
