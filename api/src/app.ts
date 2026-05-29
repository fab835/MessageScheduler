import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import Fastify from "fastify";
import type { ZodError } from "zod";

import { env } from "./helpers/env.js";
import { AppError } from "./helpers/errors.js";
import { registerRoutes } from "./routes/index.js";

export const buildApp = () => {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL,
      transport: env.NODE_ENV === "development"
        ? {
            target: "pino-pretty"
          }
        : undefined
    }
  });

  app.register(cors, {
    origin: true
  });
  app.register(sensible);
  app.register(registerRoutes);

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        error: error.message
      });
    }

    if (error.name === "ZodError") {
      return reply.status(422).send({
        error: "Validation error",
        details: (error as ZodError).issues
      });
    }

    app.log.error(error);

    return reply.status(500).send({
      error: "Internal server error"
    });
  });

  return app;
};

