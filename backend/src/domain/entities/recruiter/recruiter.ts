import { ObjectId } from "mongodb"
import SocialLinks from "./socialMedia"
export default interface Recruiter {
    _id?: ObjectId
    username : string
    email : string
    phone : string
    password : string | undefined
    companyName : string
    companyType : string
    industry : string
    logo : string
    coverphoto : string
    location:{
        city : string
        country : string,
        state : string,
        pinCode : string
    },
    socialLinks:SocialLinks[],
    teamStrength:string
    foundIn:string,
    website:string
    vision:string
    about:string
    benefit:String
    createdAt:Date
    updatedAt:Date
    currentSubscription?:ObjectId
    isVerified : boolean
    isBlocked : boolean
    verificationToken : number | string
    otpExpiresAt : Date
}