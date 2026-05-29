import { prisma } from "../../models/prisma.js";

export const listMessagesInteractor = async () =>
  prisma.message.findMany({
    orderBy: {
      scheduledDate: "asc"
    }
  });
