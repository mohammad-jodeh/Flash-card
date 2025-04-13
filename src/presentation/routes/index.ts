import { Router } from "express";
import AuthRouter from "./auth.route.js";
import DeckRouter from "./dick.route.js";
import { UserRepo } from "../../infrastructure/repos/User.repo.js";
import { UserService } from "../../app/services/user.service.js";
import { AuthController } from "../controllers/auth.controller.js";
import { DeckController } from "../controllers/deck.controller.js";

// Singleton instance of UserRepo
const userRepo = UserRepo.instance;

// Instantiate services and controllers
const userService = new UserService(userRepo);
const authController = new AuthController(userService);
const deckController = new DeckController(/* pass any required dependencies here */);

export default function Routes() {
  const router = Router();

  // Use the AuthRouter for /auth routes
  router.use("/auth", AuthRouter(authController));

  // Use the DeckRouter for /decks routes
  router.use("/decks", DeckRouter(deckController));

  return router;
}