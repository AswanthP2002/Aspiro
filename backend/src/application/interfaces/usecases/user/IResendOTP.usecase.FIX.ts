import { ResendOtpDto } from '../../../DTOs/user/resendOtp.dto.FIX';
import UserDTO from '../../../DTOs/user/user.dto.FIX';

export default interface IResendOTPUseCase {
  execute(resendOtpDto: ResendOtpDto): Promise<UserDTO | null>;
}
