import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import bcrypt from 'bcrypt'
import { generateToken } from "../../../services/jwt";

export class LoginCandidate {
    constructor(private candidateRepo : CandidateRepo){}

    async execute(email : string, password : string) : Promise<object>{
        const candidate = await this.candidateRepo.findByEmail(email)
        if(!candidate) throw new Error('Not Found')
        
        if(candidate.password){
            const isPasswordMatch = await bcrypt.compare(password, candidate.password)
            if(!isPasswordMatch) throw new Error('Wrong Password')
        }else{
            throw new Error('No password found')
        }
        

        const token = await generateToken({id:candidate._id, email:candidate.email, name:candidate.name})
        console.log('loginCandidate class.ts ::: datas before sending to the frontend', token, candidate._id, candidate.email)
        return {token, user:{id:candidate._id, email:candidate.email}}
    }
}