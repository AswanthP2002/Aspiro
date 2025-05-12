import { RegisterCandidateDTO } from "../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";
import { RegisterGoogleAuthCandidateDTO } from "../../../presentation/controllers/dtos/candidate/registerGoogleAuthCandidate";
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
        role : "",
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

export function createGoogleAutCandidatefromDTO(dto : RegisterGoogleAuthCandidateDTO) : Candidate {
    return {
        ...dto,
        about:"",
        certificates:[],
        coverPhoto:"",
        currentSubscription:"",
        education:[],
        experience:[],
        favorites:[],
        role : "",
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
        otpExpiresAt:new Date(Date.now() + 2 * 60 * 1000),
        phone:"",
        username:"",
        password:"",
    }
}