import { CreateUserDto } from '../../../DTOs/user/createUser.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserDTO | null>;
}
