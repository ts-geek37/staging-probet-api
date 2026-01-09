export interface User {
  id: string;
  clerkUserId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  stripeCustomerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
