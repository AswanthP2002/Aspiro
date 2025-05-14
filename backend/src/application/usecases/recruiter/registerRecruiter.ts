import Recruiter from "../../../domain/entities/recruiter/recruiter";
import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import bcrypt from 'bcrypt'
import { generateCode } from "../../../utilities/generateCode";
import { sendEmail } from "../../../utilities/sendmail";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";


export default class RegisterRecruiter {
    constructor(private recruiterRepo : IRecruiterRepo, private crepo : CandidateRepo){}

    async execute(recruiter : Recruiter) : Promise<string>{
        const existingEmail = await this.recruiterRepo.findByEmail(recruiter?.email)
        const existinCandidate = await this.crepo.findByEmail(recruiter?.email)
        if(existingEmail || existinCandidate) throw new Error('duplicate email')
        
        const existingUsername = await this.recruiterRepo.findByUserName(recruiter?.username)
        const existingUserrnameCandidate = await this.crepo.findByUsername(recruiter?.username)

        if(existingUsername || existingUserrnameCandidate) throw new Error('duplicate username')
        let hashedPassword
        if(recruiter?.password){
            hashedPassword = await bcrypt.hash(recruiter.password, 10)
        }

        recruiter.password = hashedPassword

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

        recruiter.isVerified = false
        recruiter.verificationToken = otp
        recruiter.otpExpiresAt = otpExpiresAt

        const info = await sendEmail(recruiter.email, subject, content)
        console.log('otp send to the user', otp)

        const createRecruiter = await this.recruiterRepo.create(recruiter)
        return `${createRecruiter} - ${info}`
    }
}