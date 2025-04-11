import pool from './db.js';
import Logger from '../Logger/consoleLogger.js';

/**
 * Creates the necessary database tables if they don't exist
 */
export const runMigrations = async (): Promise<void> => {
  try {
    Logger.Info('Running database migrations...');
    
    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    Logger.Success('Database migrations completed successfully');
  } catch (error) {
    Logger.Error(`Failed to run database migrations: ${error}`);
    throw new Error(`Migration failed: ${error}`);
  }
};