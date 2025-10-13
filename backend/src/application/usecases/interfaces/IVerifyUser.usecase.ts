import VerifyUserDTO from '../../DTOs/candidate/verifyCandidate.dto';
import UserDTO from '../../DTOs/shared/user.dto';

export default interface IVerifyUserUseCase {
  execute(verifyUser: VerifyUserDTO): Promise<UserDTO | null>;
}
