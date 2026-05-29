import type { FastifyReply, FastifyRequest } from "fastify";

import { createMessageUseCase } from "../business/use-cases/create-message.use-case.js";
import { listMessagesUseCase } from "../business/use-cases/list-messages.use-case.js";
import { acceptedParams } from "../helpers/route-params-validation.js";

const expectedParams = ["content", "to", "scheduledDate"];

// capture errors in the use case and return appropriate responses
export const createMessageController = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await createMessageUseCase(acceptedParams(expectedParams, request.body));

    return reply.status(201).send(result);
  } catch (error) {
    // @ts-ignore
    console.error("Error creating message:", error.message);
    // @ts-ignore
    return reply.status(400).send({ error: error.message });
  }
};

export const listMessagesController = async (_request: FastifyRequest, reply: FastifyReply) => {
  const result = await listMessagesUseCase();

  return reply.send(result);
};
