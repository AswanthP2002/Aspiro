import VerifyUserDTO from '../../../DTOs/user/verifyUser.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IVerifyUserUseCase {
  execute(verifyUser: VerifyUserDTO): Promise<UserDTO | null>;
}
