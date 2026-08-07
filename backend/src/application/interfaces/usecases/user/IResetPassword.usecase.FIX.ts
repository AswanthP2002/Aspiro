import { ResetPasswordDto } from '../../../DTOs/user/resetPassword.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IResetPasswordUsecase {
  execute(resetPasswordDto: ResetPasswordDto): Promise<UserDTO | null>;
}
