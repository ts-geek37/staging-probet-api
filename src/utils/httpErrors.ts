import { AppError } from "./errors";

export const badRequest = (message: string) => new AppError(message, 400);

export const unauthorized = (message = "Unauthorized") =>
  new AppError(message, 401);

export const forbidden = (message = "Forbidden") => new AppError(message, 403);

export const notFound = (message = "Not found") => new AppError(message, 404);

export const conflict = (message: string) => new AppError(message, 409);

export const internal = (message = "Internal server error") =>
  new AppError(message, 500);
