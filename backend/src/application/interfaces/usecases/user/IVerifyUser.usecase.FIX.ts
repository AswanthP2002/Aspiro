import { VerifyUserDto } from '../../../DTOs/user/verifyUser.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IVerifyUserUseCase {
  execute(verifyUser: VerifyUserDto): Promise<UserDto | null>;
}
