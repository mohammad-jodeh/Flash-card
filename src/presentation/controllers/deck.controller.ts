import { Request, Response } from "express";
import { DeckService } from "../../app/services/deck.service.js";
import { CreateDeckDTO, UpdateDeckDTO } from "../../domain/dtos/deck.dto.js";
import { DeckRepository } from "../../infrastructure/repos/deck.repository.js";

export class DeckController {
  private deckService: DeckService;

  constructor() {
    const deckRepository = new DeckRepository();
    this.deckService = new DeckService(deckRepository);
  }

  createDeck = async (req: Request, res: Response): Promise<Response | void> => {
    const { userId } = req.params;
    const { title, description }: CreateDeckDTO = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    try {
      const deck = await this.deckService.createDeck({ title, description }, parseInt(userId, 10));
      res.status(201).json(deck);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create deck" });
    }
  };

  getDecksByUserId = async (req: Request, res: Response): Promise<Response | void> => {
    const { userId } = req.params;

    try {
      const decks = await this.deckService.getDecksByUserId(parseInt(userId, 10));
      res.status(200).json(decks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch decks" });
    }
  };

  updateDeck = async (req: Request, res: Response): Promise<Response | void> => {
    const { deckId } = req.params;
    const { title, description }: UpdateDeckDTO = req.body;

    if (!title && !description) {
      return res.status(400).json({ error: "At least one field (title or description) is required" });
    }

    try {
      const updatedDeck = await this.deckService.updateDeck(parseInt(deckId, 10), { title, description });
      if (!updatedDeck) {
        return res.status(404).json({ error: "Deck not found" });
      }
      res.status(200).json(updatedDeck);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update deck" });
    }
  };

  deleteDeck = async (req: Request, res: Response): Promise<Response | void> => {
    const { deckId } = req.params;

    try {
      const isDeleted = await this.deckService.deleteDeck(parseInt(deckId, 10));
      if (!isDeleted) {
        return res.status(404).json({ error: "Deck not found" });
      }
      res.status(200).json({ message: "Deck deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete deck" });
    }
  };
}