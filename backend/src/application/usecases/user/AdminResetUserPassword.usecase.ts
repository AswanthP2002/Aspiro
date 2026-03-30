import { inject, injectable } from 'tsyringe';
import IAdminResetUserPasswordUsecase from '../../interfaces/usecases/user/IAdminResetUserPassword.usecase';
import UserMapper from '../../mappers/user/User.mapperClass';
import { AdminUserDetailsDTO } from '../../DTOs/user/userProfileAggregated.dto.FIX';
import { AdminUserPasswordResetDTO } from '../../DTOs/admin/adminUserPasswordRest.dto';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { generateToken, verifyToken } from '../../../services/jwt';
import IEmailService from '../../interfaces/services/IEmailService';

type DecodedValue = {
  code: string;
};

@injectable()
export default class AdminResetUserPasswordUsecase implements IAdminResetUserPasswordUsecase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('UserMapper') private _mapper: UserMapper,
    @inject('IEmailService') private _emailService: IEmailService
  ) {}

  async execute(dto: AdminUserPasswordResetDTO): Promise<AdminUserDetailsDTO | null> {
    const { userEmail, userId, token, code } = dto;
    console.log('Step (1) checking data from the frontend', dto);
    try {
      console.log('Step (2) Going to decode');
      const decode = (await verifyToken(token)) as DecodedValue;
      console.log('Step (3) Decode success decoded values', decode);
      if (decode.code !== code) {
        console.log('Code does not match');
        return null;
      }

      console.log('code is matched now generating new token for the user to reset the link');
      const newtoken = await generateToken({
        id: userId,
        email: userEmail,
        role: 'user',
      });
      console.log('preparting for email sending to the user');
      //send token along with email to access from the frontend
      const subject = 'Password Reset Link';
      const resetLink = `http://localhost:5173/password-reset?token=${newtoken}`;
      const content = `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
              <h2 style="text-align: center; color: #333;">${subject}</h2>
              <p>Hello,</p>
              <p>This is the link for reseting your password <a href=${resetLink}>Go to Reset password</a></p>
              <p>Best regards,<br>Aspiro Team</p>
            </div>
              `;
      const result = await this._emailService.sendEmail(userEmail, subject, content);
      console.log('Email send to the user result is here', result);
      const userDetails = await this._userRepo.getUserAggregatedProfile(userId);
      return userDetails as AdminUserDetailsDTO;
    } catch (error: unknown) {
      console.log('error occured while resting link send from admin side', error);
      throw new Error('Reset link send failed');
    }
  }
}
