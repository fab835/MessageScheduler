import { buildApp } from "./app.js";
import { env } from "./helpers/env.js";
import { prisma } from "./models/prisma.js";
import { redis } from "./models/redis.js";

const app = buildApp();

const start = async () => {
  try {
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0"
    });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

const shutdown = async () => {
  await app.close();
  await prisma.$disconnect();

  if (redis.status === "ready") {
    await redis.quit();
  }
};

process.on("SIGINT", async () => {
  await shutdown();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await shutdown();
  process.exit(0);
});

void start();
