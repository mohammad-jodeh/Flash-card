import { Router, Request, Response } from "express";

interface AuthController {
  register: (req: Request, res: Response) => Promise<Response | void>;
  login: (req: Request, res: Response) => Promise<Response | void>;
}

function AuthRouter(controller: AuthController) {
  const router = Router();
  router.post("/register", async (req, res) => {
    
   
    await controller.register(req, res);

  });
  router.post("/login", async (req, res) => {

   
     await controller.login(req, res);
  });

  return router;
}


export default AuthRouter;
