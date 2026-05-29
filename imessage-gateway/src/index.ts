import { z } from "zod";

import { delay } from "./helpers/delay.js";
import { env } from "./helpers/env.js";
import { logger } from "./helpers/logger.js";
import { connectKafka, consumer, disconnectKafka, producer } from "./integrations/kafka.js";

const requestedSchema = z.object({
  eventName: z.literal("message.dispatch.requested"),
  messageUid: z.string(),
  content: z.string(),
  to: z.string(),
  scheduledDate: z.string()
});

const getRandomDelay = (): number => {
  const min = env.GATEWAY_MIN_DELAY_MS;
  const max = env.GATEWAY_MAX_DELAY_MS;

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const publishEvent = async (topic: string, key: string, payload: Record<string, unknown>): Promise<void> => {
  await producer.send({
    topic,
    messages: [
      {
        key,
        value: JSON.stringify(payload)
      }
    ]
  });
};

const start = async (): Promise<void> => {
  await connectKafka();
  await consumer.subscribe({
    topic: env.KAFKA_TOPIC_MESSAGE_DISPATCH_REQUESTED,
    fromBeginning: false
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const payload = requestedSchema.parse(JSON.parse(message.value.toString()));
      const simulatedDelay = getRandomDelay();

      await delay(simulatedDelay);

      if (Math.random() <= env.GATEWAY_SUCCESS_RATE) {
        await publishEvent(env.KAFKA_TOPIC_MESSAGE_SENT, payload.messageUid, {
          eventName: "message.sent",
          messageUid: payload.messageUid,
          to: payload.to,
          sentAt: new Date().toISOString(),
          gateway: "imessage-demo"
        });

        logger.info(
          {
            messageUid: payload.messageUid,
            delayMs: simulatedDelay
          },
          "Dispatched message.sent"
        );

        return;
      }

      await publishEvent(env.KAFKA_TOPIC_MESSAGE_FAILED, payload.messageUid, {
        eventName: "message.failed",
        messageUid: payload.messageUid,
        to: payload.to,
        failedAt: new Date().toISOString(),
        gateway: "imessage-demo",
        reason: "Simulated send failure"
      });

      logger.warn(
        {
          messageUid: payload.messageUid,
          delayMs: simulatedDelay
        },
        "Dispatched message.failed"
      );
    }
  });

  logger.info("iMessage gateway started");
};

const shutdown = async (): Promise<void> => {
  await disconnectKafka();
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
