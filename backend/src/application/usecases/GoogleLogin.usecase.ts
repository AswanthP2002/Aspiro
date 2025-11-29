import ICandidateRepo from '../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../domain/interfaces/IUserRepo';
import { generateRefreshToken, generateToken } from '../../services/jwt';
import { UserLoginOutpDTO } from '../DTOs/user/userLogin.dto';
import mapToCandidate from '../mappers/user/mapToCandidate.mapper';
import IGoogleLoginUseCase from '../interfaces/usecases/user/IGoogleLogin.usecase';
import IVerifyGoogleTokenUseCase from '../interfaces/services/IGoogleAuthService';
import { inject, injectable } from 'tsyringe';
import IGoogleAuthService from '../interfaces/services/IGoogleAuthService';

@injectable()
export default class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    @inject('IGoogleAuthService') private _googleAuthService: IGoogleAuthService,
    @inject('IUserRepository') private _userRepo: IUserRepository
  ) {}

  async execute(googleToken: string): Promise<UserLoginOutpDTO> {
    //verify the token first
    const { googleId, email, name } = await this._googleAuthService.verify(googleToken)

    //check if any user exist with the email id
    const isUserExist = await this._userRepo.findByEmail(email);

    //if no user exist, create a new user
    let createdUser;
    if (!isUserExist) {
      createdUser = await this._userRepo.create({name, email, googleId})
    }

    //create token
    const token = await generateToken({
      id: createdUser?._id as string,
      email: createdUser?.email as string,
      role: 'user'
    });

    const refreshToken = await generateRefreshToken({
      id: createdUser?._id as string,
      email: createdUser?.email as string,
      role: 'user',
    });

    return {
      token,
      refreshToken,
      user: { id: createdUser?._id?.toString() || 'no id', email: email },
      role: 'user',
    };
  }
}
