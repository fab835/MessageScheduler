import type { FastifyInstance } from "fastify";

import { dashboardRoutes } from "./dashboard.routes.js";
import { healthRoutes } from "./health.routes.js";
import { messageRoutes } from "./message.routes.js";

export const registerRoutes = async (app: FastifyInstance) => {
  await app.register(async (v1) => {
    await v1.register(healthRoutes);
    await v1.register(messageRoutes);
    await v1.register(dashboardRoutes);
  }, { prefix: "/v1" });
};
