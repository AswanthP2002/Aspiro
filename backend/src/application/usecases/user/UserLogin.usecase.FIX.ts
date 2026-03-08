import { generateRefreshToken, generateToken } from '../../../services/jwt';
import IUserLoginUseCase from '../../interfaces/usecases/user/IUserLogin.usecase.FIX';

import {
  InvalidUserError,
  UserBannedError,
  UserBlockedError,
  WrongPasswordError,
} from '../../../domain/errors/AppError';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import comparePassword from '../../Services/comparePassword';
import { UserLoginRequestDto, UserLoginResponseDto } from '../../DTOs/user/userLogin.dto';
import { inject, injectable } from 'tsyringe';
import UserMetaDataDTO from '../../DTOs/user/userMetaData.dto.FIX';

@injectable()
export class UserLoginUseCase implements IUserLoginUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(loginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this._userRepo.findByEmail(email);

    if (!user) throw new InvalidUserError();

    if (user.isBlocked) throw new UserBlockedError();
    if (user.isBanned) throw new UserBannedError();

    if (user.password) {
      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) throw new WrongPasswordError();
    } else {
      throw new Error();
    }

    const userData = await this._userRepo.getUserMetaData(user._id as string);

    const primaryRole = user.role?.[0] || 'user';

    const token = await generateToken({
      id: user._id as string,
      email: user.email as string,
      role: primaryRole,
    });

    const refreshToken = await generateRefreshToken({
      id: user._id as string,
      email: user.email as string,
      role: primaryRole,
    });
    await this._userRepo.update(user._id as string, { lastLogin: new Date() });
    return {
      accessToken: token,
      refreshToken,
      user: userData as UserMetaDataDTO,
      role: primaryRole,
    };
  }
}
