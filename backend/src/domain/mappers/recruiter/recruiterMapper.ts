import { RegisterRecruiterDTO } from "../../../presentation/controllers/dtos/recruiter/registerRecruiterDTO";
import Recruiter from "../../entities/recruiter/recruiter";

export function createRecruiterFromDTO(dto : RegisterRecruiterDTO) : Recruiter {
    return {
        ...dto,
        about:"",
        benefit:"",
        companyName:"",
        companyType:"",
        coverphoto:"",
        createdAt:new Date(),
        foundIn:"",
        industry:"",
        location:{
            city:"",
            country:"",
            state:"",
            pinCode:""
        },
        phone:"",
        logo:"",
        socialLinks:[],
        teamStrength:"",
        updatedAt:new Date(),
        vision:"",
        website:"",
        isVerified : false,
        verificationToken:"",
        otpExpiresAt:new Date(Date.now() + 2 * 60 * 1000 )
    }
}