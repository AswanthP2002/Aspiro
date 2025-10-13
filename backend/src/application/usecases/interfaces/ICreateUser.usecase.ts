import CreateUserDTO from '../../DTOs/shared/createUser.dto';
import UserDTO from '../../DTOs/shared/user.dto';

export default interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDTO): Promise<UserDTO | null>;
}
