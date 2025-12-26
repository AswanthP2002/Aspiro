import { ResetPasswordDto } from '../../../DTOs/user/resetPassword.dto.FIX';
import { UserDto } from '../../../DTOs/user/user.dto.FIX';

export default interface IResetPasswordUsecase {
  execute(resetPasswordDto: ResetPasswordDto): Promise<UserDto | null>;
}
