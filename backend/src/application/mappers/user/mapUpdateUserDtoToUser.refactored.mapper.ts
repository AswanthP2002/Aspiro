import User from '../../../domain/entities/shared/User';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto';

export default function mapUpdateUserDtoToUser(updateUserDto: UpdateUserDTO): User {
  return {
    ...updateUserDto
  };
}
