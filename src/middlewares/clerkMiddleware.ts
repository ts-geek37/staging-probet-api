import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { RequestHandler } from "express";

const clerk = ClerkExpressRequireAuth();

const clerkMiddleware: RequestHandler = (req, res, next) => {
  (clerk as unknown as RequestHandler)(req, res, next);
};

export default clerkMiddleware;
