import IUser from '../entites/User.entity.js'
import { PostUserDTO } from "../dtos/postuser.dto.js";
export default interface IUserRepo {
    createUser(user: PostUserDTO): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser | null>;
    

    
}