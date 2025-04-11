import IUser from '../../domain/entites/User.entity.js'
//TODO import GetUserDTO from '../../domain/dtos/getuser.dto.js'

export function toGet(user: IUser): any {
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
}
