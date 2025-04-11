import AuthRouter from "./auth.route.js";
import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { UserRepo } from "../../infrastructure/repos/User.repo.js";
import { UserService } from "../../app/services/user.service.js";

const repo = UserRepo.instance;
const Uservice = new UserService(repo);
const controller = {
  authController: new AuthController(Uservice),
};

export default function Routes() {
  const router = Router();

  router.use("/auth", AuthRouter(controller.authController));
  return router;
}
