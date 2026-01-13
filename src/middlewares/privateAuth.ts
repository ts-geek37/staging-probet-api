import { BillingRepository } from "@/modules/billing/billing.repository";
import { UserRepository } from "@/modules/user";
import { forbidden, unauthorized } from "@/utils";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";

type PrivateAuthOptions = {
  vip?: boolean;
};

const privateAuth =
  (options?: PrivateAuthOptions) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) throw unauthorized("User not authenticated");

    const clerkUser = await clerkClient.users.getUser(clerkUserId);

    let user = await UserRepository.findByClerkUserId(clerkUserId);

    if (!user) {
      user = await UserRepository.createFromClerk({
        clerkUserId,
        email: clerkUser.emailAddresses[0]?.emailAddress!,
        firstName: clerkUser.firstName,
        lastName: clerkUser.lastName,
      });
    }

    req.user = user;

    if (options?.vip) {
      const subscription = await BillingRepository.getUserSubscription(user.id);

      if (!subscription || subscription.status !== "active") {
        throw forbidden("VIP subscription required");
      }
    }

    next();
  };

export default privateAuth;
