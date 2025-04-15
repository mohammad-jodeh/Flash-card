import { Deck } from '../../domain/entites/deck.entity.js';
import { CreateDeckDTO, UpdateDeckDTO } from '../../domain/dtos/deck.dto.js';
import { IDeckRepository } from '../../domain/Irepo/IDeckRepository.js';

export class DeckService {
  constructor(private deckRepository: IDeckRepository) {}

  async createDeck(deckData: CreateDeckDTO, userId: number): Promise<Deck> {
    return this.deckRepository.createDeck(deckData, userId);
  }

  async getDecksByUserId(userId: number): Promise<Deck[]> {
    return this.deckRepository.getDecksByUserId(userId);
  }

  async updateDeck(deckId: number, updates: UpdateDeckDTO): Promise<Deck | null> {
    return this.deckRepository.updateDeck(deckId, updates);
  }

  async deleteDeck(deckId: number): Promise<boolean> {
    return this.deckRepository.deleteDeck(deckId);
  }
}