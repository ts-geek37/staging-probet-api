import { Router } from "express";

import { clerkWebhookRoutes } from "./modules/clerk";
import { billingWebhookRoutes } from "./modules/billing";

const webhookRoutes = Router();

webhookRoutes.use("/clerk", clerkWebhookRoutes);
webhookRoutes.use("/stripe",billingWebhookRoutes);

export default webhookRoutes;
