import IRecruiterRepo from "../../../domain/interfaces/recruiter/IRecruiterRepo";
import bcrypt from 'bcrypt'
import { generateRefreshToken, generateToken } from "../../../services/jwt";
import ILoginRecruiterrUseCase from "./interface/ILoginRecruiterUseCase";


export class LoginRecruiterUseCase implements ILoginRecruiterrUseCase {
    constructor(private recruiterRepo : IRecruiterRepo){}

    async execute(email : string, password : string) : Promise<object>{
        const recruiter = await this.recruiterRepo.findByEmail(email)
        if(!recruiter) throw new Error('Not Found')
        
        if(recruiter.password){
            const isPasswordMatch = await bcrypt.compare(password, recruiter.password)
            if(!isPasswordMatch) throw new Error('Wrong Password')
        }else{
            throw new Error('No password found')
        }

        const token = await generateToken({id:recruiter._id, email:recruiter.email, username:recruiter.username, role:'Recruiter'})
        const refreshToken = await generateRefreshToken({id:recruiter._id, email:recruiter.email, username:recruiter.username, role:'Recruiter'})
        console.log('Data before sending to the frontend ::: loginRecruiter.ts', token)
        return {token, refreshToken, recruiter:{id:recruiter._id, email:recruiter.email}}
    }

    
}