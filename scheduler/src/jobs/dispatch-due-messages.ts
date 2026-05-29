import { findDueScheduledMessages, MESSAGE_STATUS, updateMessageStatus } from "../db/message-repository.js";
import { env } from "../helpers/env.js";
import { logger } from "../helpers/logger.js";
import { producer } from "../integrations/kafka.js";

export const dispatchDueMessages = async (): Promise<void> => {
  const now = new Date();

  const dueMessages = await findDueScheduledMessages(now);

  for (const message of dueMessages) {
    const claimed = await updateMessageStatus(message.uid, MESSAGE_STATUS.QUEUED);

    if (!claimed) continue;

    await producer.send({
      topic: env.KAFKA_TOPIC_MESSAGE_DISPATCH_REQUESTED,
      messages: [
        {
          key: message.uid,
          value: JSON.stringify({
            eventName: "message.dispatch.requested",
            messageUid: message.uid,
            content: message.content,
            to: message.to,
            scheduledDate: message.scheduledDate.toISOString(),
            dispatchedAt: now.toISOString()
          })
        }
      ]
    });

    logger.info(
      {
        messageUid: message.uid
      },
      "Dispatched message.dispatch.requested"
    );
  }
};
