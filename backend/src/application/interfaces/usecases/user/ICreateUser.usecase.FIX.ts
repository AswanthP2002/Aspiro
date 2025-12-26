import { CreateUserDto } from '../../../DTOs/user/createUser.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface ICreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserDto | null>;
}
