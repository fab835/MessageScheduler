import { Pool } from "pg";

import { env } from "../helpers/env.js";

export const postgres = new Pool({
  connectionString: env.DATABASE_URL
});

export const closePostgres = async (): Promise<void> => {
  await postgres.end();
};

