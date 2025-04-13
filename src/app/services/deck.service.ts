import {IDeckRepository} from "../../domain/Irepo/IDickRepo.js";
import {DeckDto} from "../../domain/dtos/deck.dto.js";
import  Deck  from "../../domain/entites/deck.js";


export class DeckService {
    constructor(private deckRepo: IDeckRepository) {}
    async createDeck(deckDto: DeckDto) {
        
      await this.deckRepo.createDeck(deckDto);
    }

    async getDeckById(deckId: DeckDto) {
        const deck = await this.deckRepo.findById(deckId.id);
        return deck;
    }

    async getAllDecks() {
        const decks = await this.deckRepo.findAll();
        return decks;
    }

    async updateDeck(deckId: number, deckDto: DeckDto) {
        await this.deckRepo.updateDeck(deckId, {
          id: deckDto.id,
          name: deckDto.name,
          description: deckDto.description,
          user_id: deckDto.user_id
        });
      }
    async deleteDeck(deckId: number) {
        await this.deckRepo.deleteDeck(deckId);
    }
   
    
}