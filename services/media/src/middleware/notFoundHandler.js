import { AppError } from "../utils/AppError.js";

export function notFoundHandler(req, _res, next) {
  const err = new AppError(
    `Route ${req.method} ${req.originalUrl} not found`,
    404,
    "ROUTE_NOT_FOUND",
  );
  next(err);
}
