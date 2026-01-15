import { badRequest, success } from "../../utils";
import { Request } from "express";
import { BillingWebhookService } from "./billing.webhook.service";

export class BillingWebhookController {
  constructor(private readonly service: BillingWebhookService) {}

  handle = async (req: Request) => {
    const sig = req.headers["stripe-signature"];
    if (!sig || typeof sig !== "string") {
      throw badRequest("Missing stripe signature");
    }

    await this.service.processEvent(req.body, sig);
    return success({ received: true });
  };
}
