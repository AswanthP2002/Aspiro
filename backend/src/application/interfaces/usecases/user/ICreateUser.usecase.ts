import { CreateUserDto } from '../../../DTOs/user/createUser.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserDTO | null>;
}
