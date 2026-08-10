import { ResendOtpDto } from '../../../DTOs/user/resendOtp.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IResendOTPUseCase {
  execute(resendOtpDto: ResendOtpDto): Promise<UserDTO | null>;
}
