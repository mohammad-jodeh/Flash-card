import  Deck  from "../../domain/entites/deck.js";
import { IDeckRepository } from "../../domain/Irepo/IDickRepo.js";
import { DeckDto } from "../../domain/dtos/deck.dto.js";
import { v4 as uuidv4 } from "uuid";
import db from "../db/db.js";

export class DeckRepo implements IDeckRepository {
  private static _instance: DeckRepo;

  private constructor() {}

  public static get instance(): DeckRepo {
    if (!this._instance) {
      this._instance = new DeckRepo();
    }
    return this._instance;
  }

  async findAll(): Promise<Deck[]> {
    try {
      const query = `SELECT * FROM "Decks"`;
      const result = await db.query(query);
      return result.rows as Deck[];
    } catch (err) {
      console.error("Error fetching decks:", err);
      throw new Error("Failed to fetch decks");
    }
  }

  async findById(id: number): Promise<Deck | null> {
    try {
      const query = `SELECT * FROM "Decks" WHERE "id" = $1`;
      const result = await db.query(query, [id]);
      if (result.rowCount === 0) {
        return null;
      }
      return result.rows[0] as Deck;
    } catch (err) {
      console.error(`Error fetching deck with ID ${id}:`, err);
      throw new Error(`Failed to fetch deck with ID ${id}`);
    }
  }

  async createDeck(deck: DeckDto): Promise<Deck> {
    try {
      const id = uuidv4();
      const query = `
        INSERT INTO "Decks" ("id", "name", "description")
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      const result = await db.query(query, [id, deck.name, deck.description]);
      return result.rows[0] as Deck;
    } catch (err) {
      console.error("Error creating deck:", err);
      throw new Error("Failed to create deck");
    }
  }

  async updateDeck(id: number, deck: DeckDto): Promise<Deck | null> {
    try {
      const query = `UPDATE "Decks" SET "name" = $2, "description" = $3 WHERE "id" = $1 RETURNING *`;
      const result = await db.query(query, [id, deck.name, deck.description]);
      if (result.rowCount === 0) {
        return null;
      }
      return result.rows[0] as Deck;
    } catch (err) {
      console.error(`Error updating deck with ID ${id}:`, err);
      throw new Error(`Failed to update deck with ID ${id}`);
    }
  }

  async deleteDeck(id: number): Promise<void> {
    try {
      const query = `DELETE FROM "Decks" WHERE "id" = $1`;
      await db.query(query, [id]);
    } catch (err) {
      console.error(`Error deleting deck with ID ${id}:`, err);
      throw new Error(`Failed to delete deck with ID ${id}`);
    }
  }
}
