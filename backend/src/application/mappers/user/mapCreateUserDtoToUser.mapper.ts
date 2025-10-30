import User from '../../../domain/entities/user/User';
import CreateUserDTO from '../../DTOs/user/createUser.dto';

export default function mapCreateUserDtoToUser(createUser: CreateUserDTO): User {
  return {
    name: createUser.name,
    email: createUser.email,
    phone: createUser.phone,
    password: createUser.password,
    googleId: createUser.googleId,
    facebookId: createUser.facebookId,
    linkedinId: createUser.linkedinId,
  };
}
