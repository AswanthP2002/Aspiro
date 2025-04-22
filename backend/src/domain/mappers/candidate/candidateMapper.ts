import { RegisterCandidateDTO } from "../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";
import Candidate from "../../entities/candidate/candidates";

export function createCandidatefromDTO(dto : RegisterCandidateDTO) : Candidate {
    return {
        ...dto,
        about:"",
        certificates:[],
        coverPhoto:"",
        currentSubscription:"",
        education:[],
        experience:[],
        favorites:[],
        isBlocked:false,
        location:{
            city:"",
            district:"",
            state:"",
            pincode:"",
            country:""
        },
        profilePicture:"",
        resume:[],
        socialLinks:[],
        isVerified:false,
        verificationToken:"",
        otpExpiresAt:new Date(Date.now() + 2 * 60 * 1000)
    }
}