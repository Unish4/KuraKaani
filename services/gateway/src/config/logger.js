import winston from "winston";
import { ENV } from "./env.js";

const SERVICE_NAME = "gateway";

// Fields appearing in both dev and prod
const sharedFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DDTHH:mm:ss.SSSZ" }),
  winston.format.errors({ stack: true }),
);

// dev format
const devFormat = winston.format.combine(
  sharedFormat,
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message, timestamp, service, ...meta }) => {
    const rid = meta.requestId ? ` [${meta.requestId}]` : "";
    const rest = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `${timestamp} [${level}] [${service}]${rid} ${message}${rest}`;
  }),
);

// prod format
const prodFormat = winston.format.combine(sharedFormat, winston.format.json());

// transports
const transports = [
  new winston.transports.Console({
    format: ENV.IS_DEV ? devFormat : prodFormat,
    handleExceptions: true,
  }),
];

const logger = winston.createLogger({
  level: ENV.LOG_LEVEL,
  format: ENV.IS_DEV ? devFormat : prodFormat,
  defaultMeta: { service: SERVICE_NAME },
  transports,
  exitOnError: false,
});

export default logger;
