import IUserRepo from "../../domain/Irepo/IUserRepo.js";
import { PostUserDTO } from "../../domain/dtos/postuser.dto.js";
import IUser from "../../domain/entites/User.entity.js";
import db from "../db/db.js";

export class UserRepo implements IUserRepo {
  private static _instance: UserRepo;
  private constructor() {}

  public static get instance(): UserRepo {
    if (!this._instance) {
      this._instance = new UserRepo();
    }
    return this._instance;
  }

  async createUser(user: PostUserDTO): Promise<IUser> {
    /**
     * * Creates a new user in the database.
     * * @param {PostUserDTO} user - The user data to be created.
     * * @returns {Promise<IUser>} - The created user object.
     * * @throws {Error} - If there is an error during the database operation.
     **/

    const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const values = [user.username, user.email, user.password];

    try {
      const result = await db.query(query, values);
      return result.rows[0] as IUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }
}
