import { handler } from "@/utils";
import { Router } from "express";
import { BillingController } from "./billing.controller";
import { BillingPriceRepository } from "./billing.price.repository";
import { BillingService } from "./billing.service";

const router = Router();

const billingPriceRepository = new BillingPriceRepository();
const billingService = new BillingService(billingPriceRepository);
const billingController = new BillingController(billingService);

router.post(
  "/checkout-session",
  handler(billingController.createCheckoutSession)
);

router.get("/subscription", handler(billingController.getSubscription));

export default router;
