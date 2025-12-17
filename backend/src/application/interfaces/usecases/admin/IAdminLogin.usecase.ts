
import { UserLoginInpDTO, UserLoginOutpDTO } from '../../../DTOs/user/userLogin.dto';

export default interface IAdminLoginUseCase {
  execute(adminLoginDto: UserLoginInpDTO): Promise<UserLoginOutpDTO>;
}
