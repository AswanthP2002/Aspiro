import {UserLoginOutpDTO } from '../../DTOs/user/userLogin.dto';

export default interface IGoogleLoginUseCase {
  execute(googleToken: string): Promise<UserLoginOutpDTO>;
}
