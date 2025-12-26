import { generateRefreshToken, generateToken } from '../../../services/jwt';
import IAdminLoginUseCase from '../../interfaces/usecases/admin/IAdminLogin.usecase..FIX';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { InvalidUserError, WrongPasswordError } from '../../../domain/errors/AppError';
import comparePassword from '../../Services/comparePassword';
import { inject, injectable } from 'tsyringe';
import AdminLoginRequestDTO from '../../DTOs/admin/adminLoginReq.dto.FIX';
import AdminLoginResponseDTO from '../../DTOs/admin/adminLoginRes.dto';

@injectable()
export class AdminLoginUseCase implements IAdminLoginUseCase {
  constructor(@inject('IUserRepository') private _userRepo: IUserRepository) {}

  async execute(adminLoginDto: AdminLoginRequestDTO): Promise<AdminLoginResponseDTO> {
    const { email, password } = adminLoginDto;

    //1. find admin
    const admin = await this._userRepo.findByEmail(email);

    //2. check for user availability and is it admin or not
    if (!admin || !admin.isAdmin) throw new InvalidUserError();

    if (admin.password) {
      const isPasswordMatch = await comparePassword(password, admin.password);
      if (!isPasswordMatch) throw new WrongPasswordError();
    } else {
      throw new Error('Something went wrong');
    }

    // Role in the first position of 'role' field is considered as primary role
    const primaryRole = admin.role?.[1] || 'admin'; //every user base role is 'user' which is in the first position

    const token = await generateToken({
      id: admin._id as string,
      email: admin.email as string,
      role: primaryRole,
    });
    const refreshToken = await generateRefreshToken({
      id: admin._id as string,
      email: admin.email as string,
      role: primaryRole,
    });

    return {
      token,
      refreshToken,
      user: { id: admin._id as string, email: admin.email },
      role: primaryRole,
    };
  }
}
