import Certificates from "../../../domain/entities/candidate/certificates"
import Education from "../../../domain/entities/candidate/educations"
import Experience from "../../../domain/entities/candidate/experience"
import Favorites from "../../../domain/entities/candidate/favorites"
import Resume from "../../../domain/entities/candidate/resume"
import SocialLinks from "../../../domain/entities/socialLinks"


export default interface CandidateDTO {
    _id? : string // domain entity id changed to string :: removed objectid prevent leakage of infrastructure details
    name : string
    // username : string  this item currently removed from the project, now only rely on email and password
    password : string
    role? : string
    phone : string
    email : string
    googleid? : string
    facebookid? : string
    // experience? : Experience[]
    // education? : Education[]
    location? : {
        city : string,
        district : string,
        state : string,
        pincode : string
        country : string
    }
    profilePicture? : {
        cloudinaryPublicId : string,
        cloudinarySecureUrl : string
    }
    coverPhoto? : {
        cloudinaryPublicId : string,
        cloudinarySecureUrl : string
    }
    // favorites? : Favorites[]
    // resume? : Resume[]
    // certificates? : Certificates[]
    about? : string
    dateOfBirth? : Date
    isBlocked? : boolean
    socialLinks? : SocialLinks[]
    currentSubscription? : string
    isVerified?:boolean
    isAdmin? : boolean
    verificationToken?:string
    otpExpiresAt?:Date,
    createdAt?:Date,
    updatedAt?:Date
}

//id : string, name : string, role : string, city : string, district : string, state : string, country : string, about : string
export interface EditCandidateDTO {
    id : string
    name : string
    role : string
    city : string
    district : string
    state : string
    country : string
    about : string
}

export interface FindCandidatesDTO {
    search : string
    page : number
    limit : number
    sort : string
    filter : any
}