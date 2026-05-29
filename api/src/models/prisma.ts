import { PrismaClient } from "@prisma/client";

import { env } from "../helpers/env.js";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: env.DATABASE_URL
    }
  }
});

