import { User } from "@/modules/users/users.types";

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId?: string;
      };
      user?: User;
    }
  }
}

export { };

