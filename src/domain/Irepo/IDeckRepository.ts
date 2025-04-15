import { Deck } from '../../domain/entites/deck.entity.js';
import { CreateDeckDTO, UpdateDeckDTO } from '../../domain/dtos/deck.dto.js';

export interface IDeckRepository {
  createDeck(deckData: CreateDeckDTO, userId: number): Promise<Deck>;
  getDecksByUserId(userId: number): Promise<Deck[]>;
  updateDeck(deckId: number, updates: UpdateDeckDTO): Promise<Deck | null>;
  deleteDeck(deckId: number): Promise<boolean>;
}