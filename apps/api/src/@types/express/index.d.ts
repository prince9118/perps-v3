import type { AuthPayload } from "../../types/auth";

declare global {
  namespace Express {
    interface Request {
      user: AuthPayload;
    }
  }
}

export {};
