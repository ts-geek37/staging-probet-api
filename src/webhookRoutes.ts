import { Router } from "express";

import { clerkWebhookRoutes } from "./modules/clerk";

const webhookRoutes = Router();

webhookRoutes.use("/clerk", clerkWebhookRoutes);

export default webhookRoutes;
