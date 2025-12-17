import {
  UserLoginInpDTO,
  UserLoginOutpDTO,
} from '../../../DTOs/user/userLogin.dto';

export default interface IUserLoginUseCase {
  execute(loginDetails: UserLoginInpDTO): Promise<UserLoginOutpDTO>;
}
