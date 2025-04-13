import { Router, Request, Response } from "express";

interface AuthController {
  register: (req: Request, res: Response) => Promise<Response | void>;
  login: (req: Request, res: Response) => Promise<Response | void>;
}

export default function AuthRouter(controller: AuthController) {
  const router = Router();

  // Register route
  router.post("/register", async (req, res) => {
    try {
      const result = await controller.register(req, res);
      if (!result) res.status(500).json({ message: "Registration failed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Login route
  router.post("/login", async (req, res) => {
    try {
      const result = await controller.login(req, res);
      if (!result) res.status(500).json({ message: "Login failed" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return router;
}