import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";

export default class VerifyRecruiter {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(email : string, otp : string) : Promise<Boolean>{
        console.log('email for finding :: recruiterRepository.ts', email)
        const recruiter = await this.recruiterRepo.findByEmail(email)
        console.log('founded recruiter', recruiter)

        if(!recruiter || !recruiter.otpExpiresAt) throw new Error('Invalid')
        
        if(recruiter.otpExpiresAt < new Date()) throw new Error('Expired')

        if(recruiter.verificationToken !== otp) throw new Error('Wrong')

        const recruiterVerified = await this.recruiterRepo.verifyRecruiter(email, 'isVerified', true)
        return recruiterVerified
    }
}