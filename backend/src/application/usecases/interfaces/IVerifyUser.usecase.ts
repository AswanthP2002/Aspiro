import VerifyUserDTO from '../../DTOs/candidate/verifyCandidate.dto';
import UserDTO from '../../DTOs/user/user.dto';

export default interface IVerifyUserUseCase {
  execute(verifyUser: VerifyUserDTO): Promise<UserDTO | null>;
}
