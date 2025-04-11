import pkg from "pg";
import dotenv from "dotenv";
import Logger from "../Logger/consoleLogger.js";

const { Pool } = pkg;

dotenv.config();

if (!process.env.DATABASE_URL) {
  Logger.Error("DATABASE_URL environment variable is not defined");
  throw new Error("DATABASE_URL environment variable is not defined");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
});

pool.on("connect", () => {
  Logger.Success("Connected to the database.");
});

pool.on("error", (err) => {
  Logger.Error(err, "Database connection error");
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    Logger.Error(`Database connection test failed: ${err.message}`);
  } else {
    Logger.Success("Database connection test successful");
  }
});

export default pool;
