import IVerifyUserUseCase from '../../interfaces/usecases/user/IVerifyUser.usecase.FIX';
import VerifyUserDTO from '../../DTOs/user/verifyUser.dto.FIX';
import {
  InvalidUserError,
  OtpExpiredError,
  WrongCredentialsError,
} from '../../../domain/errors/AppError';
import UserDTO from '../../DTOs/user/user.dto.FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { inject, injectable } from 'tsyringe';
import UserMapper from '../../mappers/user/User.mapperClass';
import IAlertRepo from '../../../domain/interfaces/user/IAlertRepo';

@injectable()
export default class VerifyUserUseCase implements IVerifyUserUseCase {
  constructor(
    @inject('IUserRepository') private _userRepo: IUserRepository,
    @inject('IAlertsRepository') private _alertRepo: IAlertRepo,
    @inject('UserMapper') private _mapper: UserMapper
  ) {}

  async execute(verifyUser: VerifyUserDTO): Promise<UserDTO | null> {
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

    //create an alert for welcoming the user
    await this._alertRepo.create({
      recipientId: result?._id,
      title: 'Welcome to Aspiro',
      body: 'Your account has been successfully created, start exploring now',
      priority: 'LOW',
      status: 'ACTIVE',
      type: 'SYSTEM_SECURITY',
    });

    if (result) {
      const userDto = this._mapper.userToUserDto(result);
      return userDto;
    }
    return null;
  }
}
