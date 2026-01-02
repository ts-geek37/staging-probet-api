import { Request, Response } from "express";
import { Webhook } from "svix";

import { ClerkWebhookService } from "./clerk.service";
import logger from "../../logger";

export class ClerkWebhookController {
  private readonly service = new ClerkWebhookService();
  private readonly webhook: Webhook;

  constructor() {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      throw new Error("Missing CLERK_WEBHOOK_SECRET");
    }

    this.webhook = new Webhook(secret);
  }

  handleWebhook = async (req: Request, res: Response) => {
    const svixId = req.headers["svix-id"] as string;
    const svixTimestamp = req.headers["svix-timestamp"] as string;
    const svixSignature = req.headers["svix-signature"] as string;

    if (!svixId || !svixTimestamp || !svixSignature) {
      logger.error("Missing Svix headers");
      return res.status(400).send("Missing Svix headers");
    }

    let event: any;
    try {
      event = this.webhook.verify(req.body, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      });
    } catch (err: any) {
      logger.error(`Invalid webhook signature: ${err.message}`);
      return res.status(400).send("Invalid signature");
    }

    const { type, data } = event;

    try {
      switch (type) {
        case "user.created":
          await this.service.createUser(data);
          break;

        case "user.updated":
          await this.service.updateUser(data);
          break;

        case "user.deleted":
          await this.service.deleteUser(data.id);
          break;

        default:
          logger.info(`Unhandled Clerk event: ${type}`);
      }

      return res.status(200).json({ received: true });
    } catch (err: any) {
      logger.error(`Webhook handling failed (${type}): ${err.message}`);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
}
