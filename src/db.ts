import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    await pool.query("select 1");
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("Failed to connect to PostgreSQL", error);
    process.exit(1);
  }
};
