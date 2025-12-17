import { inject, injectable } from 'tsyringe';
import IResendOTPUseCase from '../../interfaces/usecases/user/IResendOTP.usecase';
import ResendOtpDTO from '../../DTOs/user/resendOtp.dto';
import UserDTO from '../../DTOs/user/user.dto';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import IEmailService from '../../interfaces/services/IEmailService';
import { generateCode } from '../../../utilities/generateCode';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import { InvalidUserError, UserAlreadyVerifiedError } from '../../../domain/errors/AppError';

@injectable()
export default class ResendOTPUseCase implements IResendOTPUseCase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('IEmailService') private _emailService: IEmailService
   ) {}

  async execute(resendOtpDto: ResendOtpDTO): Promise<UserDTO | null> {
    const { email, id } = resendOtpDto;
    //find user
    const user = await this._userRepo.findById(id);

    //check user
    if (!user) {
      throw new InvalidUserError()
    }
    //check if user is already verified
    if (user.isVerified) {
      throw new UserAlreadyVerifiedError();
    }


    //generate otp
    const otp = generateCode();
    const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000);

    //update database
    const result = await this._userRepo.update(user._id as string, {
      verificationToken: otp,
      otpExpiresAt: otpExpiresAt,
    });

    //send email
    const subject = 'Email Verification';
    const content = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="text-align: center; color: #333;">${subject}</h2>
        <p>Hello,</p>
        <p>Here is your new One-Time Password (OTP) for <strong>Aspiro</strong>. To activate your account, please use the following code: <span style="font-weight:'bold';">${otp}</span></p>
        <p>If you did not request a new OTP, you can safely ignore this email.</p>
        <p style="font-size: 14px; color: #888;">Note: This OTP is valid for 2 minutes.</p>
        <p>Best regards,<br>Aspiro Team</p>
      </div>
    `;
    
    await this._emailService.sendEmail(email, subject, content)

    if(result){
        return mapUserToUserDTO(result);
    }

    return null;
  }
}
