import { z } from "zod";

const messageInputValidation = z.object({
  content: z.string().trim().min(1),
  to: z.string().trim().regex(/^\+?\d{10,15}$/, "Invalid phone number format"),
  scheduledDate: z.string().datetime().refine((dateString) => {
    const date = new Date(dateString);
    return date > new Date();
  }, "Scheduled date must be in the future")
});

export const createMessageInputValidation = (object: object) => {
  try {
    return messageInputValidation.parse(object);
  } catch (error) {
    // @ts-ignore
    throw new Error(error.errors.map((err: any) => err.message).join(", "));
  }
};

export type CreateMessageInput = z.infer<typeof messageInputValidation>;
