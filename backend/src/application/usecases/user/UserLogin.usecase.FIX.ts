import { generateRefreshToken, generateToken } from '../../../services/jwt';
import IUserLoginUseCase from '../../interfaces/usecases/user/IUserLogin.usecase.FIX';

import {
  BlockedEntityError,
  InvalidUserError,
  WrongPasswordError,
} from '../../../domain/errors/AppError';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import comparePassword from '../../Services/comparePassword';
import { UserLoginRequestDto, UserLoginResponseDto } from '../../DTOs/user/userLogin.dto';
import { inject, injectable } from 'tsyringe';
import { plainToInstance } from 'class-transformer';

@injectable()
export class UserLoginUseCase implements IUserLoginUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(loginDto: UserLoginRequestDto): Promise<UserLoginResponseDto> {
    const { email, password } = loginDto;
    const user = await this._userRepo.findByEmail(email);

    if (!user) throw new InvalidUserError(); // no user found

    if (user.isBlocked) throw new BlockedEntityError();

    if (user.password) {
      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) throw new WrongPasswordError();
    } else {
      //currently throwing a generic error. Since social authentications are handled seperately
      //can scale in the future. Seperate password maintaing for social auth users.
      throw new Error();
    }

    //Role in the first poisition of 'role' field is considered as primary role
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

    const output = {
      token,
      refreshToken,
      user: { email: user.email as string, id: user._id?.toString() as string },
      role: primaryRole,
    };

    return plainToInstance(UserLoginResponseDto, output);
  }
}
