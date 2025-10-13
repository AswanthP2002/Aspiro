import { generateRefreshToken, generateToken } from '../../../services/jwt';
import ICandidateRepo from '../../../domain/interfaces/candidate/ICandidateRepo';
import IAdminLoginUseCase from './interfaces/IAdminLogin.usecase';
import AdminLoginResDTO, {
  AdminLoginDTO,
} from '../../DTOs/admin/adminLoginRes.dto';
import IUserRepository from '../../../domain/interfaces/IUserRepo.refactored';
import {
  InvalidUserError,
  WrongPasswordError,
} from '../../../domain/errors/AppError';
import comparePassword from '../../Services/comparePassword';
import { inject, injectable } from 'tsyringe';

@injectable()
export class AdminLoginUseCase implements IAdminLoginUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(adminlognDto: AdminLoginDTO): Promise<AdminLoginResDTO> {
    const { email, password } = adminlognDto;
    const admin = await this._userRepo.findByEmail(email);
    if (!admin || !admin.isAdmin) throw new InvalidUserError();

    if (admin.password) {
      const isPasswordMatch = await comparePassword(password, admin.password);
      if (!isPasswordMatch) throw new WrongPasswordError();
    } else {
      throw new Error('Something went wrong');
    }

    const token = await generateToken({
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });
    const refreshToken = await generateRefreshToken({
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    console.log('token before sending ::: admin login', token);

    return {
      token,
      refreshToken,
      user: { id: admin._id, email: admin.email },
      role: admin.role,
    };
  }
}
