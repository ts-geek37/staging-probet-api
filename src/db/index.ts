import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DB_PROVIDER = process.env.DB_PROVIDER || "dev";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: DB_PROVIDER === "dev" ? false : { rejectUnauthorized: false },
});

export const db = drizzle(pool);
