// src/domain/Irepo/deck.repo.ts
import  Deck  from '../entites/deck.js';

export interface IDeckRepository {
  findAll(): Promise<Deck[]>;
  findById(id: number): Promise<Deck | null>;
  createDeck(deck: Deck): Promise<Deck>;
  updateDeck(id: number, deck: Partial<Deck>): Promise<Deck | null>;
  deleteDeck(id: number): Promise<void>;
}
