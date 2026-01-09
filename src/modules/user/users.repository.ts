import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import { User } from "./users.types";

export class UserRepository {
  static findByClerkUserId = (clerkUserId: string) =>
    db
      .select()
      .from(users)
      .where(eq(users.clerkUserId, clerkUserId))
      .limit(1)
      .then(([user]) => user ?? null);

  static createFromClerk = async ({
    clerkUserId,
    email,
    firstName = null,
    lastName = null,
  }: {
    clerkUserId: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
  }): Promise<User> => {
    const [user] = await db
      .insert(users)
      .values({
        clerkUserId,
        email,
        firstName,
        lastName,
      })
      .returning();

    return user;
  };

  static findByStripeCustomerId = async (stripeCustomerId: string) => {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.stripeCustomerId, stripeCustomerId))
      .limit(1);

    return user[0] ?? null;
  };

  static updateStripeCustomerId = (userId: string, stripeCustomerId: string) =>
    db
      .update(users)
      .set({
        stripeCustomerId,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
}
