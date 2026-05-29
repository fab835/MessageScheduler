import { MessageStatus } from "@prisma/client";
import { prisma } from "../../models/prisma.js";

export const getDashboardOverviewInteractor = async () => {
  const totals = await prisma.message.groupBy({
      by: ["status"],
      _count: {
        status: true
      }
    });

  const statusCounts = Object.values(MessageStatus).map((status) => {
    const existing = totals.find((item) => item.status === status);

    return {
      status,
      total: existing?._count.status ?? 0
    };
  });

  return {
    statusCounts
  };
};
