import { inject, injectable } from 'tsyringe';
import { DuplicateEmailError, DuplicateMobileError } from '../../../domain/errors/AppError';
import IUserRepository from '../../../domain/interfaces/IUserRepo';
import { generateCode } from '../../../utilities/generateCode';
import CreateUserDTO from '../../DTOs/user/createUser.dto';
import UserDTO from '../../DTOs/user/user.dto';
import mapCreateUserDtoToUser from '../../mappers/user/mapCreateUserDtoToUser.mapper';
import mapUserToUserDTO from '../../mappers/user/mapUserToUserDTO.mapper';
import hashPassword from '../../Services/hashPassword';
import ICreateUserUseCase from '../../interfaces/usecases/user/ICreateUser.usecase';
import IEmailService from '../../interfaces/services/IEmailService';

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('IUserRepository') private readonly _repo: IUserRepository,
    @inject('IEmailService') private _emailService: IEmailService
  ) {}

  async execute(createUserDto: CreateUserDTO): Promise<UserDTO | null> {
    let newUser = mapCreateUserDtoToUser(createUserDto);
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

    //hash the password
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

    // Set OTP and expiry on the user entity itself, not in the session
    newUser.verificationToken = otp;
    newUser.otpExpiresAt = otpExpiresAt;

    console.log(otp); //Development only : Testing the value

    // 1. Save user to the database first to ensure data integrity.
    const result = await this._repo.create(newUser);

    // 2. Then, send the verification email.
    const info = await this._emailService.sendEmail(newUser.email as string, subject, content);

    if (result) {
      const dto = mapUserToUserDTO(result);
      return dto;
    }

    return null;
  }
}
