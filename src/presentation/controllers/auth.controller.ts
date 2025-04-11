import Logger from "../../infrastructure/Logger/consoleLogger.js";
import { PostUserDTO } from "../../domain/dtos/postuser.dto.js";
import { UserService } from "../../app/services/user.service.js";
import { Request, Response } from "express";

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

      //TODO : Generate Confirmation Token and send email to user

      res.status(201).json(result);
    } catch (error) {
      Logger.Error(error);
      res.status(500).json({
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
