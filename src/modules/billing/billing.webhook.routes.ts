import bodyParser from "body-parser";
import express from "express";
import { BillingWebhookController } from "./billing.webhook.controller.ts";
import { BillingWebhookService } from "./billing.webhook.service";

const router = express.Router();

const controller = new BillingWebhookController(new BillingWebhookService());

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  controller.handle
);

export default router;
