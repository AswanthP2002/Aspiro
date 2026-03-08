import IUserRepository from '../../domain/interfaces/IUserRepo';
import { generateRefreshToken, generateToken } from '../../services/jwt';
import { UserLoginResponseDto } from '../DTOs/user/userLogin.dto';
import IGoogleLoginUseCase from '../interfaces/usecases/user/IGoogleLogin.usecase';
import { inject, injectable } from 'tsyringe';
import IGoogleAuthService from '../interfaces/services/IGoogleAuthService';
import UserMetaDataDTO from '../DTOs/user/userMetaData.dto.FIX';

@injectable()
export default class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    @inject('IGoogleAuthService') private _googleAuthService: IGoogleAuthService,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {}

  async execute(googleToken: string): Promise<UserLoginResponseDto> {
    //verify the token first
    const { googleId, email, name } = await this._googleAuthService.verify(googleToken);

    //check if any user exist with the email id
    const isUserExist = await this._userRepo.findByEmail(email);

    //if no user exist, create a new user
    let createdUser;
    if (!isUserExist) {
      createdUser = await this._userRepo.create({ name, email, googleId });
    }

    const userId = isUserExist ? isUserExist._id : createdUser?._id
    const userMetaData = await this._userRepo.getUserMetaData(userId as string)

    //create token
    const token = await generateToken({
      id: userId as string,
      email: createdUser?.email as string,
      role: 'user',
    });

    const refreshToken = await generateRefreshToken({
      id: userId as string,
      email: createdUser?.email as string,
      role: 'user',
    });

    return {
      accessToken: token,
      refreshToken,
      // user: { id: createdUser?._id?.toString() || 'no id', email: email },
      user: userMetaData as UserMetaDataDTO,
      role: 'user',
    };
  }
}
