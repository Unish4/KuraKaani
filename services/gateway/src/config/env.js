import dotenv from "dotenv";
dotenv.config();

const REQUIRED = [
  "PORT",
  "NODE_ENV",
  "CLIENT_URL",
  "IDENTITY_SERVICE_URL",
  "CONTENT_SERVICE_URL",
  "NOTIFICATION_SERVICE_URL",
  "CHAT_SERVICE_URL",
  "MEDIA_SERVICE_URL",
  "JWT_SECRET",
  "LOG_LEVEL",
];

const missing = REQUIRED.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );
  process.exit(1);
}

export const ENV = Object.freeze({
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,

  SERVICES: {
    IDENTITY: process.env.IDENTITY_SERVICE_URL,
    CONTENT: process.env.CONTENT_SERVICE_URL,
    NOTIFICATION: process.env.NOTIFICATION_SERVICE_URL,
    CHAT: process.env.CHAT_SERVICE_URL,
    MEDIA: process.env.MEDIA_SERVICE_URL,
  },

  JWT_SECRET: process.env.JWT_SECRET,
  LOG_LEVEL: process.env.LOG_LEVEL,

  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",
});