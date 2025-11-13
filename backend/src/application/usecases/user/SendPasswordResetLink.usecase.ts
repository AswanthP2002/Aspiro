import { inject, injectable } from "tsyringe";
import ISendResetPassworLinkUsecase from "../../interfaces/usecases/user/ISendPasswordResetLink.usecase";
import IEmailService from "../../interfaces/services/IEmailService";
import IUserRepository from "../../../domain/interfaces/IUserRepo";
import { InvalidUserError } from "../../../domain/errors/AppError";
import { generateToken } from "../../../services/jwt";

@injectable()
export default class SendResetPassworLinkUsecase implements ISendResetPassworLinkUsecase {
    constructor(
        @inject('IEmailService') private _emailService: IEmailService,
        @inject('IUserRepository') private _userRepository: IUserRepository
    ) {}

    async execute(email: string): Promise<void> {
        if(!email) throw new Error('Email is required')
        
        const user = await this._userRepository.findByEmail(email)

        if(!user){
            throw new InvalidUserError()
        }

        //generate token for password reset to identify particular user who intending the reset request
        const token = await generateToken({id:user._id as string, email:user.email as string, role:'user'})

        //send token along with email to access from the frontend
        const subject = 'Password Reset Link';
        const resetLink = `http://localhost:5173/password-reset?token=${token}`;
        const content = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="text-align: center; color: #333;">${subject}</h2>
        <p>Hello,</p>
        <p>This is the link for reseting your password <a href=${resetLink}>Go to Reset password</a></p>
        <p>Best regards,<br>Aspiro Team</p>
      </div>
        `
        const result = await this._emailService.sendEmail(email, subject, content)
        if(!result){
            throw new Error('Error sending email')
        }
    }
}