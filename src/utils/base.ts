import { Response as ExpressResponse, Request } from "express";

import { Response } from "../types";

type ControllerFn = (req: Request) => Promise<Response<any> | void>;

export function success<T>(data: T, status = 200): Response<T> {
  return {
    status,
    body: {
      success: true,
      data,
      error: null,
    },
  };
}

export function failure(message: string, status = 400): Response<null> {
  return {
    status,
    body: {
      success: false,
      data: null,
      error: message,
    },
  };
}

export const handler = (fn: ControllerFn) => {
  return async (req: Request, res: ExpressResponse) => {
    try {
      const result = await fn(req);

      if (!result) {
        return res.status(200).json({
          success: true,
          data: null,
          error: null,
        });
      }

      return res.status(result.status).json(result.body);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return res.status((err as any).status || 500).json({
          success: false,
          data: null,
          error: err.message,
        });
      }

      return res.status(500).json({
        success: false,
        data: null,
        error: "Internal server error",
      });
    }
  };
};
