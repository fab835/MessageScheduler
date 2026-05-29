import { createMessageInputValidation } from "../../helpers/model-validation/message.js";
import { MessageEntity } from "../entities/message.entity.js";
import { createMessageInteractor } from "../interactors/create-message.interactor.js";

const messageEntity = new MessageEntity();

export const createMessageUseCase = async (input: object) => {
  const validatedInput = createMessageInputValidation(input);
  const createdMessage = await createMessageInteractor(validatedInput);

  return messageEntity.new(createdMessage);
};
