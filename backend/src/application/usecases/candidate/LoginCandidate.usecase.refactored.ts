import bcrypt from 'bcrypt';
import { generateRefreshToken, generateToken } from '../../../services/jwt';
import ILoginCandidateUseCase from './interface/ILoginCandidate.usecase';
import {
  LoginCandidateInpDTO,
  LoginCandidateOutDTO,
} from '../../DTOs/candidate/candidateLogin.dto';
import {
  BlockedEntityError,
  InvalidUserError,
  WrongPasswordError,
} from '../../../domain/errors/AppError';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import comparePassword from '../../Services/comparePassword';

export class LoginCandidateUseCase implements ILoginCandidateUseCase {
  constructor(
    private _candidateRepo: ICandidateRepo,
    private _userRepo: IUserRepository
  ) {}

  async execute(loginDto: LoginCandidateInpDTO): Promise<LoginCandidateOutDTO> {
    const { email, password } = loginDto;
    const user = await this._userRepo.findByEmail(email);
    if (!user) throw new InvalidUserError(); // no user found

    if (user.isBlocked) throw new BlockedEntityError();

    if (user.password) {
      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) throw new WrongPasswordError();
    } else {
      throw new Error();
    }

    const token = await generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken({
      id: user._id,
      email: user.email,
      role: user.role,
    });

    console.log(
      'Refresh token before sending candidateLoginUseCase.ts ::: ',
      refreshToken
    );
    return {
      token,
      refreshToken,
      user: { email: user.email, id: user._id?.toString() },
      role: user.role,
    };
  }
}
