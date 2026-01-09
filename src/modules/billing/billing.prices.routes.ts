import { handler } from "@/utils";
import { Router } from "express";
import { BillingPriceRepository } from "./billing.price.repository";
import { BillingPricesController } from "./billing.prices.controller";
import { BillingPricesService } from "./billing.prices.service";

const router = Router();

const billingPriceRepository = new BillingPriceRepository();
const billingService = new BillingPricesService(billingPriceRepository);
const billingController = new BillingPricesController(billingService);

router.get("/", handler(billingController.getActivePlans));
router.get("/plan", handler(billingController.getActivePrice));

export default router;
