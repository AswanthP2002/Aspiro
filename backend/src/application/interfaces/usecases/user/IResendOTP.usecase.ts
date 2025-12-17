import ResendOtpDTO from '../../../DTOs/user/resendOtp.dto';
import UserDTO from '../../../DTOs/user/user.dto';

export default interface IResendOTPUseCase {
  execute(resendOtpDto: ResendOtpDTO): Promise<UserDTO | null>;
}
