import { ENV } from "./env.js";

export const SERVICES = [
  {
    name: "identity",
    prefix: "/api/identity",
    target: ENV.SERVICES.IDENTITY,
    requireAuth: false,
  },
  {
    name: "content",
    prefix: "/api/content",
    target: ENV.SERVICES.CONTENT,
    requiresAuth: false,
  },
  {
    name: "notification",
    prefix: "/api/notification",
    target: ENV.SERVICES.NOTIFICATION,
    requiresAuth: false,
  },
  {
    name: "chat",
    prefix: "/api/chat",
    target: ENV.SERVICES.CHAT,
    requiresAuth: false,
  },
  {
    name: "media",
    prefix: "/api/media",
    target: ENV.SERVICES.MEDIA,
    requiresAuth: false,
  },
];
