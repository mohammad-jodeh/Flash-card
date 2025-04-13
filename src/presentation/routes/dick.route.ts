// src/presentation/routes/deck.router.ts
// src/presentation/routes/deck.router.ts
import { Router, Request, Response } from "express";

interface DeckController {
  getAllDecks: (req: Request, res: Response) => Promise<Response | void>;
  getDeckById: (req: Request, res: Response) => Promise<Response | void>;
  createDeck: (req: Request, res: Response) => Promise<Response | void>;
  updateDeck: (req: Request, res: Response) => Promise<Response | void>;
  deleteDeck: (req: Request, res: Response) => Promise<Response | void>;
}

export default function DeckRouter(controller: DeckController) {
  const router = Router();

  // Define routes for deck operations
  router.get("/", async (req, res) => {
    try {
      await controller.getAllDecks(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      await controller.getDeckById(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.post("/", async (req, res) => {
    try {
      await controller.createDeck(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      await controller.updateDeck(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      await controller.deleteDeck(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
}