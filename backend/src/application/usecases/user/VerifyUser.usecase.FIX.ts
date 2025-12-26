import IVerifyUserUseCase from '../../interfaces/usecases/user/IVerifyUser.usecase.FIX';
import { VerifyUserDto } from '../../DTOs/user/verifyUser.dto.FIX';
import {
  InvalidUserError,
  OtpExpiredError,
  WrongCredentialsError,
} from '../../../domain/errors/AppError';
import { UserDto } from '../../DTOs/user/user.dto.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';

@injectable()
export default class VerifyUserUseCase implements IVerifyUserUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(verifyUser: VerifyUserDto): Promise<UserDto | null> {
    //find user
    const user = await this._userRepo.findById(verifyUser.id);
    if (!user || !user.otpExpiresAt || !user.verificationToken) {
      throw new InvalidUserError(); // User not found or no pending verification
    }

    //check time
    if (user.otpExpiresAt < new Date()) throw new OtpExpiredError(); //custome

    //match otp
    if (user.verificationToken !== verifyUser.otp) {
      throw new WrongCredentialsError(); //custom
    }

    // Update verification status and clear the OTP to prevent reuse
    const result = await this._userRepo.update(user._id as string, {
      isVerified: true,
      verificationToken: undefined,
      otpExpiresAt: undefined,
    });

    if (result) {
      const userDto = plainToInstance(UserDto, result);
      return userDto;
    }
    return null;
  }
}
