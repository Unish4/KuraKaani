import { Router } from "express";
import proxy from "express-http-proxy";

import { SERVICES } from "./config/services.js";
import logger from "./config/logger.js";

function createProxyOptions(serviceName) {
  return {
    proxyReqPathResolver(req) {
      const prefix = `/api/${serviceName}`;
      const rest = req.originalUrl.slice(prefix.length) || "/";
      return rest;
    },

    proxyReqOptDecorator(proxyReqOpts, srcReq) {
      proxyReqOpts.headers["X-Request-ID"] = srcReq.id;
      proxyReqOpts.headers["X-Forwarded-Proto"] = srcReq.protocol || "http";
      return proxyReqOpts;
    },

    proxyErrorHandler(err, res, next) {
      logger.error("gateway.proxy_error", {
        service: serviceName,
        message: err.message,
        code: err.code,
      });

      if (res.headersSent) return next(err);

      res.status(502).json({
        error: {
          message: "Upstream service unavailable",
          code: "UPSTREAM_UNAVAILABLE",
          service: serviceName,
        },
      });
    },

    proxyTimeout: 10_000,
    timeout: 10_000,
  };
}

export function buildRouter() {
  const router = Router();

  for (const service of SERVICES) {
    const serviceProxy = proxy(
      service.target,
      createProxyOptions(service.name),
    );

    router.use(service.prefix, serviceProxy);

    logger.info("gateway.proxy_registered", {
      service: service.name,
      prefix: service.prefix,
      target: service.target,
    });
  }

  return router;
}
