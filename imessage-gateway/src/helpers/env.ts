import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  PORT: z.coerce.number().default(3335),
  KAFKA_BROKERS: z.string().min(1).default("localhost:9092"),
  KAFKA_CLIENT_ID: z.string().min(1).default("message-scheduler-imessage-gateway"),
  KAFKA_CONSUMER_GROUP_IMESSAGE_GATEWAY: z.string().min(1).default("imessage-gateway-consumers"),
  KAFKA_TOPIC_MESSAGE_DISPATCH_REQUESTED: z.string().min(1).default("message.dispatch.requested"),
  KAFKA_TOPIC_MESSAGE_SENT: z.string().min(1).default("message.sent"),
  KAFKA_TOPIC_MESSAGE_FAILED: z.string().min(1).default("message.failed"),
  GATEWAY_MIN_DELAY_MS: z.coerce.number().int().positive().default(1500),
  GATEWAY_MAX_DELAY_MS: z.coerce.number().int().positive().default(4000),
  GATEWAY_SUCCESS_RATE: z.coerce.number().min(0).max(1).default(0.7),
  LOG_LEVEL: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]).default("info")
});

export const env = envSchema.parse(process.env);

