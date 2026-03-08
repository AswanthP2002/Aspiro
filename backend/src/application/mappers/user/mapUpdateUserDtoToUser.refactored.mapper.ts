import User from '../../../domain/entities/user/User.FIX';
import UpdateUserDTO from '../../DTOs/user/updateUser.dto.FIX';

export default function mapUpdateUserDtoToUser(updateUserDto: UpdateUserDTO): User {
  return {
    ...updateUserDto
  };
}
