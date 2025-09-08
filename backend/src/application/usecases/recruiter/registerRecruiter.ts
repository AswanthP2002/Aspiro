import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import bcrypt from 'bcrypt'
import { generateCode } from "../../../utilities/generateCode";
import { sendEmail } from "../../../utilities/sendmail";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import { RegisterRecruiterDTO, RegisterRecruiterSchema } from "../../../presentation/controllers/dtos/recruiter/registerRecruiterDTO";
import { createRecruiterFromDTO } from "../../../domain/mappers/recruiter/recruiterMapper";
import IRegisterRecruiterUseCase from "./interface/IRegisterRecruiterUseCase";
import CreateRecruiterDTO, { RecruiterDTO } from "../../DTOs/recruiter/recruiterDTO";
import mapToRecruiterFromCreateRecruiterDTO from "../../mappers/recruiter/mapToRecruiterFromCreateRecruiterDto";
import mapToRecruiterDtoFromRecruiter from "../../mappers/recruiter/mapToRecruiterDtoFromRecruiter";


export default class RegisterRecruiterUseCase implements IRegisterRecruiterUseCase {
    constructor(private recruiterRepo : IRecruiterRepo, private crepo : CandidateRepo){}

    async execute(createRecruiterDto : CreateRecruiterDTO) : Promise<RecruiterDTO | null>{
       const newRecruiter = mapToRecruiterFromCreateRecruiterDTO(createRecruiterDto)
        const isExistingEmail = await this.recruiterRepo.findByEmail(newRecruiter.email)
        const isExistingCandidate = await this.crepo.findByEmail(newRecruiter.email)
        if(isExistingCandidate || isExistingEmail) throw new Error('DuplicateEmail')
        
        const existingUsername = await this.recruiterRepo.findByUserName(newRecruiter.username)
        // const existingUserrnameCandidate = await this.crepo.findByUsername(recruiterModel?.username)

        if(existingUsername) throw new Error('duplicate username')
        let hashedPassword
        if(newRecruiter?.password){
            hashedPassword = await bcrypt.hash(newRecruiter.password, 10)
        }

        newRecruiter.password = hashedPassword

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

        
        newRecruiter.verificationToken = otp
        newRecruiter.otpExpiresAt = otpExpiresAt

        const info = await sendEmail(newRecruiter.email, subject, content)
        console.log('otp send to the user', otp)

        const createRecruiter = await this.recruiterRepo.create(newRecruiter)

        if(createRecruiter){
            const dto = mapToRecruiterDtoFromRecruiter(createRecruiter)
            return dto
        }
        return null
    }
}