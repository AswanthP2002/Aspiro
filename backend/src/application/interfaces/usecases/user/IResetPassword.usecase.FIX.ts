import { ResetPasswordDto } from '../../../DTOs/user/resetPassword.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IResetPasswordUsecase {
  execute(resetPasswordDto: ResetPasswordDto): Promise<UserDTO | null>;
}
