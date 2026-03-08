import { UserLoginResponseDto } from '../../../DTOs/user/userLogin.dto';

export default interface IGoogleLoginUseCase {
  execute(googleToken: string): Promise<UserLoginResponseDto>;
}
