import { ObjectId } from "mongodb"
import Certificates from "./certificates"
import Education from "./educations"
import Experience from "./experience"
import Favorites from "./favorites"
import Resume from "./resume"
import SocialLinks from "../socialLinks"

export default interface Candidate {
    _id? : ObjectId
    name : string
    username : string
    password? : string
    role : string
    phone : string
    email : string
    googleid? : string
    facebookid? : string
    experience : Experience[]
    education : Education[]
    location : {
        city : string,
        district : string,
        state : string,
        pincode : string
        country : string
    }
    profilePicture : {
        cloudinaryPublicId : string,
        cloudinarySecureUrl : string
    }
    coverPhoto : {
        cloudinaryPublicId : string,
        cloudinarySecureUrl : string
    }
    favorites : Favorites[]
    resume : Resume[]
    certificates : Certificates[]
    about : string
    dateOfBirth? : Date
    isBlocked : boolean
    socialLinks : SocialLinks[]
    currentSubscription : string
    isVerified:boolean
    isAdmin : boolean
    verificationToken:string
    otpExpiresAt?:Date,
    createdAt:Date,
    updatedAt:Date
}