import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import bcrypt from 'bcrypt'
import { generateCode } from "../../../utilities/generateCode";
import { sendEmail } from "../../../utilities/sendmail";
import { RegisterCandidateDTO, RegisterCandidateSchema } from "../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";
import { createCandidatefromDTO } from "../../../domain/mappers/candidate/candidateMapper";

export default class RegisterCandidateUseCase {
    constructor(private candidateRep : CandidateRepo){}
    
    async execute(candidatedto : RegisterCandidateDTO) : Promise<string>{ //changed to registerCandidateDTO from Candidate schema ::  swtiching the validation logic to usecase from candidate controller
        
        const parsedCandidate = RegisterCandidateSchema.parse(candidatedto)
        const candidate = createCandidatefromDTO(parsedCandidate)

        const existingEmail = await this.candidateRep.findByEmail(candidate.email)
        if(existingEmail) throw new Error('duplicate email')
        
        const existingUsername = await this.candidateRep.findByUsername(candidate.username)
        if(existingUsername) throw  new Error('duplicate username')
            
        let hashedPassword
        if(candidate.password){
            hashedPassword = await bcrypt.hash(candidate.password, 10)   
        }
            

        candidate.password = hashedPassword
        
        candidate.about = ""
        candidate.certificates = []
        candidate.coverPhoto = ""
        candidate.currentSubscription = ""
        candidate.education = []
        candidate.experience = []
        candidate.favorites = []
        candidate.isBlocked = false
        candidate.location = {
            city:"",
            district:"",
            state:"",
            pincode:"",
            country:""
        }
        candidate.profilePicture = ""
        candidate.resume = []
        candidate.socialLinks = []
        candidate.isVerified = false
        candidate.googleid = ""
        
        const otp : string = generateCode()
        const otpExpiresAt : Date = new Date(Date.now() + 2 * 60 * 1000)
        const subject : string = "Email Verification"

        const content : string = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
  <h2 style="text-align: center; color: #333;">${subject}</h2>
  <p>Hello,</p>
  <p>Thank you for registering with <strong>Aspiro</strong>. To activate your account and start using our platform, please verify your email. Your otp for verification <span style="font-weight:'bold';">${otp}</span></p>
  <p>If you did not initiate this registration, you can safely ignore this email.</p>
  <p style="font-size: 14px; color: #888;">Note: This is a test environment. If you have any concerns or questions, please contact the admin or your support team.</p>
  <p>Best regards,<br>Aspiro Team</p>
</div>
        `
        candidate.isVerified = false
        candidate.verificationToken = otp
        candidate.otpExpiresAt = otpExpiresAt

        const info = await sendEmail(candidate.email, subject, content)
        console.log("otp send to the user ", otp)

        const createdCandidate = await this.candidateRep.create(candidate)
        return `${createdCandidate} - ${info}`
    }
}