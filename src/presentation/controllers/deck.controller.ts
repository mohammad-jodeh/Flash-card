import { Request, Response } from "express";
import { DeckService } from "../../app/services/deck.service.js";
import { DeckRepo } from "../../infrastructure/repos/Deck.repo.js";

// Use the singleton instance of DeckRepo
const deckService = new DeckService(DeckRepo.instance);

export class DeckController {
  async getAllDecks(_req: Request, res: Response): Promise<void> {
    try {
      const decks = await deckService.getAllDecks();
      res.json(decks);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getDeckById(req: Request, res: Response): Promise<void> {
    try {
      const deckId = Number(req.params.id);
      const deck = await deckService.getDeckById({ id: deckId } as any);
      if (!deck) {
        res.status(404).json({ message: "Deck not found" });
      } else {
        res.json(deck);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async createDeck(req: Request, res: Response): Promise<void> {
    try {
      const { name, description } = req.body;
      const newDeck = await deckService.createDeck({ name, description, id: 0, user_id: 1 });
      res.status(201).json(newDeck);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateDeck(req: Request, res: Response): Promise<void> {
    try {
      const deckId = Number(req.params.id);
      const updatedDeck = await deckService.updateDeck(deckId, req.body);
      res.json(updatedDeck);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteDeck(req: Request, res: Response): Promise<void> {
    try {
      const deckId = Number(req.params.id);
      await deckService.deleteDeck(deckId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new DeckController();