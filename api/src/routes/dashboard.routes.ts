import type { FastifyInstance } from "fastify";

import { getDashboardOverviewController } from "../controllers/dashboard.controller.js";

export const dashboardRoutes = async (app: FastifyInstance) => {
  app.get("/dashboard/overview", getDashboardOverviewController);
};
