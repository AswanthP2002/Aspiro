import { inject, injectable } from 'tsyringe';
import {
  DuplicateEmailError,
  DuplicateMobileError,
} from '../../domain/errors/AppError';
import IUserRepository from '../../domain/interfaces/IUserRepo.refactored';
import { generateCode } from '../../utilities/generateCode';
import { sendEmail } from '../../utilities/sendmail';
import CreateUserDTO from '../DTOs/shared/createUser.dto';
import UserDTO from '../DTOs/shared/user.dto';
import mapCreateUserDtoToUser from '../mappers/shared/mapCreateUserDtoToUser.mapper';
import mapUserToUserDTO from '../mappers/shared/mapUserToUserDTO.mapper';
import hashPassword from '../Services/hashPassword';
import ICreateUserUseCase from './interfaces/ICreateUser.usecase';

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('IUserRepository') private readonly _repo: IUserRepository
  ) {}

  async execute(createUserDto: CreateUserDTO): Promise<UserDTO | null> {
    const newUser = mapCreateUserDtoToUser(createUserDto);
    //check if the email is already linked with another user
    const isExistingEmail = await this._repo.findByEmail(newUser.email);
    if (isExistingEmail) {
      throw new DuplicateEmailError();
    }

    //check if the mobile number is already linked
    const isExistingMobile = await this._repo.findByPhone(newUser.phone);

    if (isExistingMobile) {
      throw new DuplicateMobileError();
    }

    //has the password
    if (newUser.password) {
      newUser.password = await hashPassword(newUser.password, 10);
    }

    const otp: string = generateCode();
    const otpExpiresAt: Date = new Date(Date.now() + 2 * 60 * 1000);
    const subject: string = 'Email Verification';

    const content: string = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
      <h2 style="text-align: center; color: #333;">${subject}</h2>
      <p>Hello,</p>
      <p>Thank you for registering with <strong>Aspiro</strong>. To activate your account and start using our platform, please verify your email. Your otp for verification <span style="font-weight:'bold';">${otp}</span></p>
      <p>If you did not initiate this registration, you can safely ignore this email.</p>
      <p style="font-size: 14px; color: #888;">Note: This is a test environment. If you have any concerns or questions, please contact the admin or your support team.</p>
      <p>Best regards,<br>Aspiro Team</p>
    </div> 
            `;
    // candidate.isVerified = false
    newUser.verificationToken = otp;
    newUser.otpExpiresAt = otpExpiresAt;

    const info = await sendEmail(newUser.email, subject, content);
    console.log('otp send to the user ', otp);

    //save to db
    const result = await this._repo.create(newUser);

    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
