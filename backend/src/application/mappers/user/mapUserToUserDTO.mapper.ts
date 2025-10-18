import User, { Role } from '../../../domain/entities/shared/User';
import UserDTO from '../../DTOs/user/user.dto';

export default function mapUserToUserDTO(user: User): UserDTO {
  return {
    ...user
  };
}
