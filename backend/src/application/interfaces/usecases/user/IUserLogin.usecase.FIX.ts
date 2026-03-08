import { UserLoginRequestDto, UserLoginResponseDto } from '../../../DTOs/user/userLogin.dto';

export default interface IUserLoginUseCase {
  execute(loginDetails: UserLoginRequestDto): Promise<UserLoginResponseDto>;
}
