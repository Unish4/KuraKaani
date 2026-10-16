import express from "express";
import cors from "cors";
import helmet from "helmet";

import { ENV } from "./config/env.js";
import logger from "./config/logger.js";
import { requestContext } from "./middleware/requestContext.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

const app = express();

app.use(requestContext);
app.use(helmet());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(express.json({ limit: "1mb" })); // Services DO parse JSON

// Health
app.get("/health", (_req, res) => {
  res.json({
    service: "identity",
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 404 + errors
app.use(notFoundHandler);
app.use(errorMiddleware);

const server = app.listen(ENV.PORT, () => {
  logger.info("identity.started", {
    port: ENV.PORT,
    env: ENV.NODE_ENV,
  });
});

function shutdown(signal) {
  logger.info("identity.shutdown_started", { signal });
  server.close(() => {
    logger.info("identity.shutdown_complete");
    process.exit(0);
  });
  setTimeout(() => {
    logger.error("identity.shutdown_forced", { signal });
    process.exit(1);
  }, 10_000).unref();
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
