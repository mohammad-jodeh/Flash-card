import { Deck } from '../../domain/entites/deck.entity.js';
import { CreateDeckDTO, UpdateDeckDTO } from '../../domain/dtos/deck.dto.js';
import { IDeckRepository } from '../../domain/Irepo/IDeckRepository.js';
import  pool from '../../infrastructure/db/db.js'; // Adjust the import based on your project structure

export class DeckRepository implements IDeckRepository {
  async createDeck(deckData: CreateDeckDTO, userId: number): Promise<Deck> {
    const result = await pool.query<Deck>(
      'INSERT INTO "Decks" (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, deckData.title, deckData.description]
    );
    return result.rows[0];
  }

  async getDecksByUserId(userId: number): Promise<Deck[]> {
    const result = await pool.query<Deck>('SELECT * FROM "Decks" WHERE user_id = $1', [userId]);
    return result.rows;
  }

  async updateDeck(deckId: number, updates: UpdateDeckDTO): Promise<Deck | null> {
    const updateFields: string[] = [];
    const values: any[] = [];

    if (updates.title) {
      updateFields.push(`title = $${updateFields.length + 1}`);
      values.push(updates.title);
    }
    if (updates.description) {
      updateFields.push(`description = $${updateFields.length + 1}`);
      values.push(updates.description);
    }

    values.push(deckId); // Add deckId as the last parameter for the WHERE clause

    const query = `
      UPDATE "Decks"
      SET ${updateFields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const result = await pool.query<Deck>(query, values);

    return (result?.rowCount ?? 0) > 0 ? result.rows[0] : null;
  }

  async deleteDeck(deckId: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM "Decks" WHERE id = $1 RETURNING *', [deckId]);
    return (result?.rowCount ?? 0) > 0;
  }
}















