import { Router } from "express";
import { DeckController } from "../controllers/deck.controller.js";


const router = Router();
const deckController = new DeckController();

router.post("/users/:userId/decks", (req, res) => {
  deckController.createDeck(req, res);
});
router.get("/users/:userId/decks",
  (req, rez) => {deckController.getDecksByUserId(req, rez);}
);
router.put("/decks/:deckId",
    (req,rez)=> {deckController.updateDeck(req,rez);}
);
router.delete("/decks/:deckId", (req, rez) => {
  deckController.deleteDeck(req, rez);
});

export default router;
