import dotenv from "dotenv";
dotenv.config();

const REQUIRED = ["PORT", "NODE_ENV", "CLIENT_URL", "LOG_LEVEL"];

const missing = REQUIRED.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `[identity] Missing required environment variables: ${missing.join(", ")}`,
  );
  process.exit(1);
}

export const ENV = Object.freeze({
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,
  LOG_LEVEL: process.env.LOG_LEVEL,

  IS_DEV: process.env.NODE_ENV === "development",
  IS_PROD: process.env.NODE_ENV === "production",
});
