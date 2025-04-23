import CandidateRepo from "../../../domain/interfaces/candidate/candidateRepo";
import bcrypt from 'bcrypt'
import { generateToken } from "../../../services/jwt";

export class LoginCandidate {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(email : string, password : string) : Promise<object>{
        const candidate = await this.candidateRepo.findByEmail(email)
        if(!candidate) throw new Error('Not Found')
        
        const isPasswordMatch = await bcrypt.compare(password, candidate.password)
        if(!isPasswordMatch) throw new Error('Wrong Password')

        const token = generateToken({id:candidate._id})
        return {token:token, user:{id:candidate._id, email:candidate.email}}
    }
}