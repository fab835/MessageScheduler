import { MESSAGE_STATUS, updateMessageStatus } from "../db/message-repository.js";
import { logger } from "../helpers/logger.js";
import { MessageSchemaType } from "./index.js";

export const handleMessageFailed = async (message : MessageSchemaType): Promise<void> => {
  logger.info(
    {
      offset: message.offset,
      key: message.key?.toString(),
      value: message.value?.toString()
    },
    "Received message.failed event"
  );

  if (!message.value) {
    logger.error(
      {
        offset: message.offset,
        key: message.key?.toString(),
      },
      "Received message.failed event with empty value"
    );
    return;
  }

  const payload = JSON.parse(message.value.toString());

  await updateMessageStatus(payload.messageUid, MESSAGE_STATUS.FAILED, MESSAGE_STATUS.QUEUED);
};
