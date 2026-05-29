import cron, { type ScheduledTask } from "node-cron";

import { closePostgres } from "./db/postgres.js";
import { env } from "./helpers/env.js";
import { logger } from "./helpers/logger.js";
import { connectKafka, disconnectKafka } from "./integrations/kafka.js";
import { dispatchDueMessages } from "./jobs/dispatch-due-messages.js";

let scheduledTask: ScheduledTask | undefined;

const runCycle = async (): Promise<void> => {
  try {
    await dispatchDueMessages();
  } catch (error) {
    logger.error({ error }, "Scheduler cycle failed");
  }
};

const start = async (): Promise<void> => {
  await connectKafka();
  await runCycle();

  scheduledTask = cron.schedule(env.SCHEDULER_CRON, () => {
    void runCycle();
  });

  logger.info({ cron: env.SCHEDULER_CRON }, "Scheduler started");
};

const shutdown = async (): Promise<void> => {
  if (scheduledTask) {
    scheduledTask.stop();
    scheduledTask.destroy();
  }

  await disconnectKafka();
  await closePostgres();
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
