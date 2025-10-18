import CreateUserDTO from '../../../DTOs/user/createUser.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDTO): Promise<UserDTO | null>;
}
