import User from '../../../domain/entities/user/User.FIX';
import { CreateUserDto } from '../../DTOs/user/createUser.dto.FIX';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto.FIX';

export default class UserMapper {
  public dtoToUser(userDto: CreateUserDto): User {
    return {
      name: userDto.name,
      email: userDto.email,
      phone: userDto.phone,
      password: userDto.password,
      googleId: userDto.googleId,
      linkedinId: userDto.linkedinId,
      facebookId: userDto.facebookId,
    };
  }

  public updateDtoToUser(updateDto: UpdateUserDTO): User {
    return {
      ...updateDto,
    };
  }
}
