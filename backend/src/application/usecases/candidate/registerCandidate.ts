import Candidate from "../../../domain/entities/candidate/candidates";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import bcrypt from 'bcrypt'
import { generateCode } from "../../../utilities/generateCode";
import { sendEmail } from "../../../utilities/sendmail";
import { RegisterCandidateDTO, RegisterCandidateSchema } from "../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";
import { createCandidatefromDTO } from "../../../domain/mappers/candidate/candidateMapper";
import IRegisterCandidateUseCase from "./interface/IRegisterCandidateUseCase";
import IBaseRepo from "../../../domain/interfaces/IBaseRepo";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import CreateCandidateDTO from "../../DTOs/candidate/createCandidateDTO";
import CandidateDTO from "../../DTOs/candidate/candidateDTO";
import mapToCandidate from "../../mappers/candidate/mapToCandidate";
import mapToCandidateDTO from "../../mappers/candidate/mapToCandidateDto";

export default class RegisterCandidateUseCase implements IRegisterCandidateUseCase {
    constructor(private _candidateRepo : ICandidateRepo){}
    
    async execute(createCandidateDto : CreateCandidateDTO) : Promise<CandidateDTO | null>{ 
        //convert candidatedto into candidate entity to transfer to the repository
        const newCandidate = mapToCandidate(createCandidateDto)
        
        // const parsedCandidate = RegisterCandidateSchema.parse(candidatedto)
        // const candidate = createCandidatefromDTO(parsedCandidate)

        //check if the email is already exist
        const isExistingEmail = await this._candidateRepo.findByEmail(newCandidate.email)
        if(isExistingEmail) throw new Error('DuplicateEmail')
        
        //check if the mobile number is already exist or not
        const isExistingMobileNumber = await this._candidateRepo.findByMobileNumber(newCandidate.phone)
        if(isExistingMobileNumber) throw  new Error('DuplicateMobileNumber')
        
        //has the password before saving to the db
        let hashedPassword : string = ""
        if(newCandidate.password){
            hashedPassword = await bcrypt.hash(newCandidate.password, 10)   
        }
        
        //set hashed password
        newCandidate.password = hashedPassword
        
        // candidate.about = ""
        // candidate.certificates = []
        // candidate.coverPhoto = {
        //     cloudinaryPublicId:"",
        //     cloudinarySecureUrl:""
        // }
        // candidate.currentSubscription = ""
        // candidate.education = []
        // candidate.experience = []
        // candidate.favorites = []
        // candidate.isBlocked = false
        // candidate.location = {
        //     city:"",
        //     district:"",
        //     state:"",
        //     pincode:"",
        //     country:""
        // }
        // candidate.profilePicture = {
        //     cloudinaryPublicId:"",
        //     cloudinarySecureUrl:""
        // }
        // candidate.resume = []
        // candidate.socialLinks = []
        // candidate.isVerified = false
        // candidate.googleid = ""
        
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
        // candidate.isVerified = false
        newCandidate.verificationToken = otp
        newCandidate.otpExpiresAt = otpExpiresAt

        const info = await sendEmail(newCandidate.email, subject, content)
        console.log("otp send to the user ", otp)

        const createdCandidate = await this._candidateRepo.create(newCandidate)

        //convert it back to dto
        if(createdCandidate){
            let dto : CandidateDTO = mapToCandidateDTO(createdCandidate)
            return dto
        }

        return null
    }
}