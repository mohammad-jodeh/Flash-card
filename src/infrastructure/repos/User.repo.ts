import IUserRepo from "../../domain/Irepo/IUserRepo.js";
import { PostUserDTO } from "../../domain/dtos/postuser.dto.js";
import IUser from "../../domain/entites/User.entity.js";
import db from "../db/db.js";
import { v4 as uuidv4 } from "uuid";

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
    const userID = uuidv4();
    const query = `INSERT INTO "Users" (id,username, email, password) VALUES ($1, $2, $3 , $4) RETURNING *`;
    const values = [userID, user.username, user.email, user.password];

    try {
      const result = await db.query(query, values);
      return result.rows[0] as IUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    /**
     * * Retrieves a user from the database by email.
     * * @param {string} email - The email of the user to retrieve.
     * * @returns {Promise<IUser | null>} - The user object if found, null otherwise.
     * * @throws {Error} - If there is an error during the database operation.
     **/

    const query = `SELECT * FROM "Users" WHERE "email" = $1`;
    const values = [email];

    try {
      const result = await db.query(query, values);
      return result.rows.length > 0 ? (result.rows[0] as IUser) : null;
    } catch (error) {
      throw new Error(`Error retrieving user: ${error}`);
    }
  }
}
