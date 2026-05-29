import type { FastifyInstance } from "fastify";

import { createMessageController, listMessagesController } from "../controllers/message.controller.js";

export const messageRoutes = async (app: FastifyInstance) => {
  app.get("/messages", listMessagesController);
  app.post("/messages", createMessageController);
};
