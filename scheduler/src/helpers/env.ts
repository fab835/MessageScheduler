import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3334),
  DATABASE_URL: z.string().min(1),
  KAFKA_BROKERS: z.string().min(1).default("localhost:9092"),
  KAFKA_CLIENT_ID: z.string().min(1).default("message-scheduler-scheduler"),
  KAFKA_CONSUMER_GROUP_SCHEDULER: z.string().min(1).default("scheduler-consumers"),
  KAFKA_TOPIC_MESSAGE_SENT: z.string().min(1).default("message.sent"),
  KAFKA_TOPIC_MESSAGE_FAILED: z.string().min(1).default("message.failed"),
  KAFKA_TOPIC_MESSAGE_DISPATCH_REQUESTED: z.string().min(1).default("message.dispatch.requested"),
  SCHEDULER_CRON: z.string().min(1).default("* * * * *"),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info")
});

export const env = envSchema.parse(process.env);
