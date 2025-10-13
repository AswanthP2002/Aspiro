import User from '../../../domain/entities/shared/User.entitty';
import CreateUserDTO from '../../DTOs/shared/createUser.dto';

export default function mapCreateUserDtoToUser(
  createUser: CreateUserDTO
): User {
  return {
    ...createUser,
  };
}
