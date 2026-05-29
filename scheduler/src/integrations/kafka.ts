import { Kafka, logLevel } from "kafkajs";

import { env } from "../helpers/env.js";

const kafka = new Kafka({
  clientId: env.KAFKA_CLIENT_ID,
  brokers: env.KAFKA_BROKERS.split(","),
  logLevel: logLevel.NOTHING
});

export const producer = kafka.producer();

export const connectKafka = async (): Promise<void> => {
  await producer.connect();
};

export const disconnectKafka = async (): Promise<void> => {
  await producer.disconnect();
};

