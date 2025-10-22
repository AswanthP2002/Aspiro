import ICandidateRepo from '../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../domain/interfaces/IUserRepo.refactored';
import { generateRefreshToken, generateToken } from '../../services/jwt';
import { UserLoginOutpDTO } from '../DTOs/user/userLogin.dto';
import mapToCandidate from '../mappers/candidate/mapToCandidate.mapper';
import IGoogleLoginUseCase from './interfaces/IGoogleLogin.usecase';
import IVerifyGoogleTokenUseCase from './interfaces/IVerifyGoogleToken.usecase';

export default class GoogleLoginUseCase implements IGoogleLoginUseCase {
  constructor(
    private _repo: ICandidateRepo,
    private _tokenVerify: IVerifyGoogleTokenUseCase,
    private _userRepo: IUserRepository
  ) {}

  async execute(googleToken: string): Promise<UserLoginOutpDTO> {
    //verify the token first
    const { googleId, email, name } = await this._tokenVerify.verify(
      googleToken
    );

    //check if any user exist with the email id
    const isUserExist = await this._userRepo.findByEmail(email);

    //if no user exist, create a new user
    let createdUser;
    if (!isUserExist) {
      const newUser = mapToCandidate({ email, name, googleid: googleId });
      createdUser = await this._repo.create(newUser);
    }

    //create token
    const token = await generateToken({
      id: createdUser?._id as string,
      email: 'createdUser?.email',
      role: 'Candidate',
    });

    const refreshToken = await generateRefreshToken({
      id: createdUser?._id as string,
      email: 'createdUser?.email',
      role: 'Candidate',
    });

    return {
      token,
      refreshToken,
      user: { id: createdUser?._id?.toString(), email: email },
    };
  }
}
