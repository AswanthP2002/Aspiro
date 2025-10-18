import IVerifyUserUseCase from './interfaces/IVerifyUser.usecase';
import VerifyUserDTO from '../DTOs/candidate/verifyCandidate.dto';
import {
  InvalidUserError,
  OtpExpiredError,
  WrongCredentialsError,
} from '../../domain/errors/AppError';
import UserDTO from '../DTOs/user/user.dto';
import IUserRepository from '../../domain/interfaces/IUserRepo.refactored';
import mapUserToUserDTO from '../mappers/user/mapUserToUserDTO.mapper';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class VerifyUserUseCase implements IVerifyUserUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(verifyUser: VerifyUserDTO): Promise<UserDTO | null> {
    //find user
    console.log('upcoming user id', verifyUser.id);
    const user = await this._userRepo.findById(verifyUser.id);
    console.log('founded user', user);
    //const candidate = await this._candidateRepo.findById(verifyUser.id);
    if (!user || !user.otpExpiresAt) throw new InvalidUserError(); //custome
    //check time
    if (user.otpExpiresAt < new Date()) throw new OtpExpiredError(); //custome
    //match otp
    if (user.verificationToken !== verifyUser.otp) {
      throw new WrongCredentialsError(); //custom
    }
    //update verification
    const result = await this._userRepo.updateVerify(user._id);
    if (result) {
      const userDto = mapUserToUserDTO(result);
      return userDto;
    }
    return null;
  }
}
