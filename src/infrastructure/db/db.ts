import { Pool } from "pg";
import dotenv from "dotenv";
import Logger from "../Logger/consoleLogger.js";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on("connect", () => {
  Logger.Success("Connected to the database.");
});

pool.on("error", (err) => {
    Logger.Error(err, "Database connection error");
    }
);

export default pool;
