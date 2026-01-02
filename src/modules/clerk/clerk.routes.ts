import express from "express";
import { ClerkWebhookController } from "./clerk.controller";

const clerkWebhookRoutes = express.Router();
const controller = new ClerkWebhookController();

clerkWebhookRoutes.post(
  "/",
  express.raw({ type: "application/json" }),
  controller.handleWebhook
);

export default clerkWebhookRoutes;
