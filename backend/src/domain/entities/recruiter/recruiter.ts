import SocialLinks from "../socialLinks"

export default interface Recruiter {
    _id?: string
    username : string
    email : string
    phone? : string
    password : string | undefined
    companyName? : string
    companyType? : string
    industry? : string
    logo? : {
        cloudinaryPublicId:string,
        cloudinarySecureUrl : string
    }
    coverphoto? : {
        cloudinaryPublicId:string,
        cloudinarySecureUrl : string
    }
    location? : {
        city : string
        country : string,
        state : string,
        pinCode : string
    },
    socialLinks?:SocialLinks[]
    teamStrength?:string
    foundIn?:string,
    website?:string
    vision?:string
    about?:string
    benefit?:String
    createdAt?:Date
    updatedAt?:Date
    currentSubscription?:string
    isVerified? : boolean
    isBlocked? : boolean
    verificationToken? : number | string
    otpExpiresAt? : Date
}