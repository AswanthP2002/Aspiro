import { join } from "path";
import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IVerifyUserUseCase from "./interface/IVerifyUserUseCase";
import VerifyUserDTO from "../../DTOs/candidate/verifyCandidateDTO";

export default class VerifyUserUseCase implements IVerifyUserUseCase {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(verifyUser : VerifyUserDTO) : Promise<void> {
        //find user
        const candidate = await this.candidateRepo.findByEmail(verifyUser.email)
        if(!candidate || !candidate.otpExpiresAt) throw new Error('Invalid')
        //check time
        if(candidate.otpExpiresAt < new Date()) throw  new Error('Expired')
        //match otp
        if(candidate.verificationToken !== verifyUser.otp) throw new Error('Wrong')
        //update verification
        await this.candidateRepo.updateVerification(verifyUser.email)
    
    }
}