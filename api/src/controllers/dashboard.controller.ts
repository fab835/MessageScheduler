import type { FastifyReply, FastifyRequest } from "fastify";

import { getDashboardOverviewUseCase } from "../business/use-cases/get-dashboard-overview.use-case.js";

export const getDashboardOverviewController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const overview = await getDashboardOverviewUseCase();

  return reply.send(overview);
};
