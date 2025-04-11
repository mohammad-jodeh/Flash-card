import { Router, Request, Response } from "express";

interface AuthController {
  register: (req: Request, res: Response) => Promise<Response | void>;
}

function AuthRouter(controller: AuthController) {
  const router = Router();
  router.post("/register", async (req, res) => {
    console.log("Register route hit");
    console.log(req.body);
    await controller.register(req, res);
  });
  return router;
}

export default AuthRouter;
