import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class VerifyRecruiterUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(email : string, otp : string) : Promise<Boolean>{
        const recruiter = await this.recruiterRepo.findByEmail(email)

        if(!recruiter || !recruiter.otpExpiresAt) throw new Error('Invalid')
        
        if(recruiter.otpExpiresAt < new Date()) throw new Error('Expired')

        if(recruiter.verificationToken !== otp) throw new Error('Wrong')

        const recruiterVerified = await this.recruiterRepo.verifyRecruiter(email, 'isVerified', true)
        return recruiterVerified
    }
}