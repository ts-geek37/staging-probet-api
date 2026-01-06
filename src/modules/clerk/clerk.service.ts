import type { UserJSON } from "@clerk/backend";
import { eq } from "drizzle-orm";

import { db } from "../../db";
import { users } from "../../db/schema/users";
import logger from "../../logger";

export class ClerkWebhookService {
  private getPrimaryEmail(user: UserJSON): string | null {
     const emailObj = user.email_addresses?.find(
      (e) => e.id === user.primary_email_address_id
    );
    return (
      emailObj?.email_address ||
      user.email_addresses?.[0]?.email_address ||
      null
    );
  }

  async createUser(user: UserJSON): Promise<void> {
    const email = this.getPrimaryEmail(user);

    logger.info(`Creating user from Clerk webhook: ${user.id}, ${email}`);

    await db
      .insert(users)
      .values({
        clerkUserId: user.id,
        email,
        firstName: user.first_name ?? null,
        lastName: user.last_name ?? null,
      })
      .onConflictDoNothing({
        target: users.clerkUserId,
      });

    logger.info(`User inserted or already exists: ${user.id}`);
  }

  async updateUser(user: UserJSON): Promise<void> {
    const email = this.getPrimaryEmail(user);

    logger.info(`Updating user from Clerk webhook: ${user.id}`);

    await db
      .update(users)
      .set({
        email,
        firstName: user.first_name ?? null,
        lastName: user.last_name ?? null,
        updatedAt: new Date(),
      })
      .where(eq(users.clerkUserId, user.id));

    logger.info(`User updated successfully: ${user.id}`);
  }

  async deleteUser(clerkUserId: string): Promise<void> {
    logger.info(`Deleting user from Clerk webhook: ${clerkUserId}`);

    await db.delete(users).where(eq(users.clerkUserId, clerkUserId));

    logger.info(`User deleted successfully: ${clerkUserId}`);
  }
}
