import IUser from '../../domain/entites/User.entity.js'
import { GetUserDto } from '../../domain/dtos/getuser.dto.js';

export function toGet(user: IUser): GetUserDto {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
}
