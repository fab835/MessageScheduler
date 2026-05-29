import { CreateMessageInput } from "../../helpers/model-validation/message.js";
import { prisma } from "../../models/prisma.js";
import { MessageStatus } from "@prisma/client";

export const createMessageInteractor = async (payload: CreateMessageInput) => {
  const createdMessage = await prisma.message.create({
    data: {
      content: payload.content,
      to: payload.to,
      status: MessageStatus.SCHEDULED,
      scheduledDate: new Date(payload.scheduledDate)
    }
  });

  return createdMessage;
};
