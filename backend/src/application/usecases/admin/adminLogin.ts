import CandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import bcrypt from 'bcrypt'
import { generateRefreshToken, generateToken } from "../../../services/jwt";
import ICandidateRepo from "../../../domain/interfaces/candidate/ICandidateRepo";
import IAdminLoginUseCase from "./interfaces/IAdmiLoginUseCase";
import AdminLoginResDTO, { AdminLoginDTO } from "../../DTOs/admin/adminLoginResDTO";
export class AdminLoginUseCase implements IAdminLoginUseCase {
    constructor(private candidateRepo : ICandidateRepo) {}

    async execute(adminlognDto : AdminLoginDTO) : Promise<AdminLoginResDTO>{
        const admin = await this.candidateRepo.findByEmail(adminlognDto.email)
        if(!admin || !admin.isAdmin) throw new Error('Not Found')

        if(admin.password){
            const isPasswordMatch = await bcrypt.compare(adminlognDto.password, admin.password)
            if(!isPasswordMatch) throw new Error('Wrong Password')
        }else{
            throw new Error('No password found')
        }

        const token = await generateToken({id:admin._id, email:admin.email, role:'Admin'})
        const refreshToken = await generateRefreshToken({id:admin._id, email:admin.email, role:'Admin'})

        console.log('token before sending ::: admin login', token)

        return {token, refreshToken, admin:{id:admin._id, email:admin.email}}
    }
}