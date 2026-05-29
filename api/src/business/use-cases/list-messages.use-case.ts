import { MessageEntity } from "../entities/message.entity.js";
import { listMessagesInteractor } from "../interactors/list-messages.interactor.js";

const messageEntity = new MessageEntity();

export const listMessagesUseCase = async () => {
  const messages = await listMessagesInteractor();

  return messageEntity.wrap(messages);
};
