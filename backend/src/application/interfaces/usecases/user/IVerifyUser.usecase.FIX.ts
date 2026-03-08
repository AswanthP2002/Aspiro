import VerifyUserDTO from '../../../DTOs/user/verifyUser.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IVerifyUserUseCase {
  execute(verifyUser: VerifyUserDTO): Promise<UserDTO | null>;
}
