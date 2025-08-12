import { RegisterCandidateDTO } from "../../../presentation/controllers/dtos/candidate/registerCandidateDTOs";
import { RegisterGoogleAuthCandidateDTO } from "../../../presentation/controllers/dtos/candidate/registerGoogleAuthCandidate";
import Candidate from "../../entities/candidate/candidates";

export function createCandidatefromDTO(dto : RegisterCandidateDTO) : Candidate {
    return {
        ...dto,
        about:"",
        certificates:[],
        coverPhoto:{
            cloudinaryPublicId:"",
            cloudinarySecureUrl:""
        },
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
        profilePicture:{
            cloudinaryPublicId:"",
            cloudinarySecureUrl:""
        },
        resume:[],
        socialLinks:[],
        isVerified:false,
        verificationToken:"",
        isAdmin:false,
        otpExpiresAt:new Date(Date.now() + 2 * 60 * 1000),
        createdAt:new Date(),
        updatedAt:new Date()
    }
}

export function createGoogleAutCandidatefromDTO(dto : RegisterGoogleAuthCandidateDTO) : Candidate {
    return {
        ...dto,
        about:"",
        certificates:[],
        coverPhoto:{
            cloudinaryPublicId:"",
            cloudinarySecureUrl:""
        },
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
        profilePicture:{
            cloudinaryPublicId:"",
            cloudinarySecureUrl:""
        },
        resume:[],
        socialLinks:[],
        isVerified:false,
        verificationToken:"",
        otpExpiresAt:new Date(Date.now() + 2 * 60 * 1000),
        phone:"",
        isAdmin:false,
        username:"",
        password:"",
        createdAt:new Date(),
        updatedAt : new Date()
    }
}