import { AppError } from "../utils/AppError.js";
import { ENV } from "../config/env.js";

export function errorMiddleware(err, req, res, _next) {
  const isAppError = err instanceof AppError;
  const isOperational = isAppError && err.isOperational === true;

  const statusCode = isAppError ? err.statusCode : 500;

  const log = req.log ?? console;

  const logPayload = {
    err: {
      name: err?.name,
      message: err?.message,
      code: isAppError ? err.code : undefined,
      statusCode,
      isOperational,
      stack: err?.stack,
    },
    request: {
      method: req.method,
      path: req.originalUrl,
    },
  };

  if (statusCode >= 500) {
    log.error("error.unhandled", logPayload);
  } else {
    log.warn("error.handled", logPayload);
  }

  let message;
  if (isAppError) {
    message = err.message;
  } else if (ENV.IS_DEV) {
    message = err?.message ?? "Internal Server Error";
  } else {
    message = "Internal Server Error";
  }

  const body = {
    error: {
      message,
      code: isAppError ? err.code : "INTERNAL_ERROR",
    },
  };

  if (isAppError && err.details) {
    body.error.details = err.details;
  }

  if (ENV.IS_DEV && err?.stack) {
    body.error.stack = err.stack;
  }

  res.status(statusCode).json(body);
}
