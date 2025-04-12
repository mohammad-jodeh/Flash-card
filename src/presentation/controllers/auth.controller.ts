import Logger from "../../infrastructure/Logger/consoleLogger.js";
import { PostUserDTO } from "../../domain/dtos/postuser.dto.js";
import { UserService } from "../../app/services/user.service.js";
import { Request, Response } from "express";
import token from "../../presentation/functions/tocken.js";
export class AuthController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response) {
    try {
        //TODO: validation middleware for not allowing empty fields
      if (!req.body || !req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({
          error: "Missing required fields. Username, email and password are required."
        });
      }


      const user: PostUserDTO = req.body;
      const result = await this.userService.register(user);

     

      res.status(201).json(result);
    } 
    
    
    catch (error) {
      Logger.Error(error);
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Missing required fields. Email and password are required.",
        });
      }
       
      const user = await this.userService.login({email, password});
     

      if (!user) {
        return res.status(401).json({
          error: "Invalid email or password.",
        });
      }
      const tokenValue = token( user.username, user.email);
      
      res.status(200).json(tokenValue);
    } catch (error) {
      Logger.Error(error);
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
