import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import bcrypt from 'bcrypt'
import { generateCode } from "../../../utilities/generateCode";
import { sendEmail } from "../../../utilities/sendmail";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import { RegisterRecruiterDTO, RegisterRecruiterSchema } from "../../../presentation/controllers/dtos/recruiter/registerRecruiterDTO";
import { createRecruiterFromDTO } from "../../../domain/mappers/recruiter/recruiterMapper";
import IRegisterRecruiterUseCase from "./interface/IRegisterRecruiterUseCase";


export default class RegisterRecruiterUseCase implements IRegisterRecruiterUseCase {
    constructor(private recruiterRepo : IRecruiterRepo, private crepo : CandidateRepo){}

    async execute(recruiterDTO : RegisterRecruiterDTO) : Promise<string>{
        const validateRecruiter = RegisterRecruiterSchema.parse(recruiterDTO)
        const recruiterModel = createRecruiterFromDTO(validateRecruiter)
        const existingEmail = await this.recruiterRepo.findByEmail(recruiterModel?.email)
        const existinCandidate = await this.crepo.findByEmail(recruiterModel?.email)
        if(existingEmail || existinCandidate) throw new Error('duplicate email')
        
        const existingUsername = await this.recruiterRepo.findByUserName(recruiterModel?.username)
        const existingUserrnameCandidate = await this.crepo.findByUsername(recruiterModel?.username)

        if(existingUsername || existingUserrnameCandidate) throw new Error('duplicate username')
        let hashedPassword
        if(recruiterModel?.password){
            hashedPassword = await bcrypt.hash(recruiterModel.password, 10)
        }

        recruiterModel.password = hashedPassword

        const otp = generateCode()
        const otpExpiresAt = new Date(Date.now() + 2 * 60 * 1000)
        const subject = 'Email Verification'

        const content = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
  <h2 style="text-align: center; color: #333;">${subject}</h2>
  <p>Hello,</p>
  <p>Thank you for registering with <strong>Aspiro</strong>. To activate your account and start using our platform, please verify your email. Your otp for verification <span style="font-weight:'bold';">${otp}</span></p>
  <p>If you did not initiate this registration, you can safely ignore this email.</p>
  <p style="font-size: 14px; color: #888;">Note: This is a test environment. If you have any concerns or questions, please contact the admin or your support team.</p>
  <p>Best regards,<br>Aspiro Team</p>
</div>
        `

        recruiterModel.isVerified = false
        recruiterModel.verificationToken = otp
        recruiterModel.otpExpiresAt = otpExpiresAt

        const info = await sendEmail(recruiterModel.email, subject, content)
        console.log('otp send to the user', otp)

        const createRecruiter = await this.recruiterRepo.create(recruiterModel)
        return `${createRecruiter} - ${info}`
    }
}