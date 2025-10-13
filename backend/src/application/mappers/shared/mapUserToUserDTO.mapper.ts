import User from '../../../domain/entities/shared/User.entitty';
import UserDTO from '../../DTOs/shared/user.dto';

export default function mapUserToUserDTO(user: User): UserDTO {
  return {
    ...user,
  };
}
