import type { FastifyInstance } from "fastify";

import { healthRoutes } from "./health.routes.js";

export const registerRoutes = async (app: FastifyInstance) => {
  await app.register(async (v1) => {
    await v1.register(healthRoutes);
  }, { prefix: "/v1" });
};
