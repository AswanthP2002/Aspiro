import { join } from "path";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";

export default class VerifyUser {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(email : string, otp : string) : Promise<boolean> {
        //find user
        const candidate = await this.candidateRepo.findByEmail(email)
        console.log('founded candidate', candidate)
        if(!candidate || !candidate.otpExpiresAt) throw new Error('Invalid')
        
        //check time
        if(candidate.otpExpiresAt < new Date()) throw  new Error('Expired')
        
        //match otp
        if(candidate.verificationToken !== otp) throw new Error('Wrong')
        
        //update verification
        const candidateVerified = await this.candidateRepo.updateCandidate(email, "isVerified", true)
        return true
    
    }
}