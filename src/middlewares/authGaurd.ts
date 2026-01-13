import { clerkClient, ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { NextFunction, RequestHandler } from "express";

import { BillingRepository } from "@/modules/billing/billing.repository";
import { UserRepository } from "@/modules/user";
import { forbidden, unauthorized } from "@/utils";

type AuthGuardOptions = {
  attachUser?: boolean;
  requireVip?: boolean;
};

const clerkAuth = ClerkExpressRequireAuth();

export const authGuard =
  (options: AuthGuardOptions = {}): RequestHandler =>
  async (req: any, res: any, next: NextFunction) => {
    try {
      await new Promise<void>((resolve, reject) => {
        clerkAuth(req, res, (err: any) => {
          if (err) reject(err);
          else resolve();
        });
      });

      const clerkUserId = req.auth?.userId;
      if (!clerkUserId) {
        throw unauthorized("User not authenticated");
      }

      if (options.attachUser || options.requireVip) {
        let user = await UserRepository.findByClerkUserId(clerkUserId);

        if (!user) {
          const clerkUser = await clerkClient.users.getUser(clerkUserId);

          user = await UserRepository.createFromClerk({
            clerkUserId,
            email: clerkUser.emailAddresses[0]?.emailAddress!,
            firstName: clerkUser.firstName,
            lastName: clerkUser.lastName,
          });
        }

        req.user = user;

        if (options.requireVip) {
          const subscription = await BillingRepository.getUserSubscription(
            user.id
          );

          if (!subscription || subscription.status !== "active") {
            throw forbidden("VIP subscription required");
          }
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };
