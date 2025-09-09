import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import bcrypt from 'bcrypt'
import { generateRefreshToken, generateToken } from "../../../services/jwt";
import ILoginCandidateUseCase from "./interface/ILoginCandidateUseCase";
import { LoginCandidateInpDTO, LoginCandidateOutDTO } from "../../DTOs/candidate/candidateLoginDTO";

export class LoginCandidateUseCase implements ILoginCandidateUseCase{
    constructor(private candidateRepo : CandidateRepo){}

    async execute(loginDto : LoginCandidateInpDTO) : Promise<LoginCandidateOutDTO>{
        const candidate = await this.candidateRepo.findByEmail(loginDto.email)
        if(!candidate) throw new Error('Not Found')
        
        if(candidate.isBlocked) throw new Error('Blocked')
        
        if(candidate.password){
            const isPasswordMatch = await bcrypt.compare(loginDto.password, candidate.password)
            if(!isPasswordMatch) throw new Error('Wrong Password')
        }else{
            throw new Error('No password found')
        }
        

        const token = await generateToken({id:candidate._id, email:candidate.email, name:candidate.name, role:'Candidate'})
        const refreshToken = await generateRefreshToken({id:candidate._id, email:candidate.email, name:candidate.name, role:'Candidate'})
        
        console.log('Refresh token before sending candidateLoginUseCase.ts ::: ', refreshToken)
        return {
            token,
            refreshToken,
            user:{email:candidate.email, id:candidate._id?.toString()}
        }
    }
}