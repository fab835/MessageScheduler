import { env } from "../helpers/env.js";
import { consumer } from "../integrations/kafka.js";

import { handleMessageFailed } from "./handle-message-failed.js";
import { handleMessageSent } from "./handle-message-success.js";

export type MessageSchemaType = {
  offset?: any;
  key?: any;
  value?: any;
}

export const runConsumer = async (): Promise<void> => {
  await consumer.subscribe({
    topics: [
      env.KAFKA_TOPIC_MESSAGE_FAILED,
      env.KAFKA_TOPIC_MESSAGE_SENT,
    ]
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      switch (topic) {
        case env.KAFKA_TOPIC_MESSAGE_SENT:
          await handleMessageSent(message as MessageSchemaType);
          break;

        case env.KAFKA_TOPIC_MESSAGE_FAILED:
          await handleMessageFailed(message as MessageSchemaType);
          break;
      }
    }
  });
}