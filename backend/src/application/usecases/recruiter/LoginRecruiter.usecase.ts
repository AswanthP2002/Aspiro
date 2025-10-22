import { generateRefreshToken, generateToken } from '../../../services/jwt';
import ILoginRecruiterrUseCase from './interface/ILoginRecruiter.usecase';
import RecruiterLoginDTO, {
  RecruiterLoginResDTO,
} from '../../DTOs/recruiter/recruiterLogin.dto';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import {
  InvalidUserError,
  WrongPasswordError,
} from '../../../domain/errors/AppError';
import comparePassword from '../../Services/comparePassword';

@injectable()
export class LoginRecruiterUseCase implements ILoginRecruiterrUseCase {
  constructor(
    @inject('IUserRepository') private _userRepository: IUserRepository
  ) {}

  async execute(
    recruiterLoginDto: RecruiterLoginDTO
  ): Promise<RecruiterLoginResDTO | null> {
    const { email, password } = recruiterLoginDto;
    const user = await this._userRepository.findByEmail(email);
    if (!user) throw new InvalidUserError();

    if (user.password) {
      const isPasswordMatch = await comparePassword(password, user.password);
      if (!isPasswordMatch) throw new WrongPasswordError();
    } else {
      throw new Error('No password found');
    }

    const token = await generateToken({
      id: user._id as string,
      email: user.email as string,
      role: "recruiter"
    });
    const refreshToken = await generateRefreshToken({
      id: user._id as string,
      email: user.email as string,
      role: "recruiter",
    });

    return {
      token,
      refreshToken,
      user: { id: user._id, email: user.email as string },
      role: "recruiter"
    };
  }
}
