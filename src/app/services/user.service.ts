import IUserRepo from "../../domain/Irepo/IUserRepo.js";
import { PostUserDTO } from "../../domain/dtos/postuser.dto.js";
import { hash,compare } from "bcrypt";
import { toGet } from "../utils/userMappings.js";
import Logger from "../../infrastructure/Logger/consoleLogger.js";
import {PostLoginDto} from "../../domain/dtos/postlogin.dto.js";


export class UserService {
  constructor(private userRepo: IUserRepo) {}

  async register(user: PostUserDTO) {
    try {
        
      const existingUser = await this.userRepo.getUserByEmail(user.email);

      if (existingUser) {
        throw new Error("User already exists");
      }

      user.password = await hash(user.password, 10);

      return toGet(await this.userRepo.createUser(user));
    } catch (error) {
      throw new Error(`Error registering user: ${error}`);
    }
  }
  async login(user: PostLoginDto) {
    try {
      const login = await this.userRepo.getUserByEmail(user.email);

      if (!login) {
        throw new Error("User not found");
      }

      const isPasswordValid = await compare( user.password, login.password);
    

      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      

      return toGet(login);
    } catch (error) {
      Logger.Error(`Error logging in user: ${error}`);
      throw new Error(`Error logging in user: ${error}`);
    }
  }
}
