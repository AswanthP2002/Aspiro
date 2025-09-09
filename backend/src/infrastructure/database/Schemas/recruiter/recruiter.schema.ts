import { Schema } from "mongoose";
import Recruiter from "../../../../domain/entities/recruiter/recruiter";
import SocialLinks from "../../../../domain/entities/socialLinks";

const SocialLinkSchema = new Schema<SocialLinks>({
    domain:{type:String},
    url:{type:String}
})

export const RecruiterSchema = new Schema<Recruiter>({
    companyName:{type:String},
    companyType:{type:String},
    about:{type:String},
    benefit:{type:String},
    coverphoto:{
        cloudinaryPublicId:{type:String},
        cloudinarySecureUrl:{type:String}
    },
    email:{type:String},
    password:{type:String},
    currentSubscription:{type:String},
    foundIn:{type:String},
    industry:{type:String},
    isBlocked:{type:Boolean, default:false},
    isVerified:{type:Boolean, default:false},
    location:{
        city:{type:String},
        state:{type:String},
        country:{type:String},
        pinCode:{type:String}
    },
    logo:{
        cloudinaryPublicId:{type:String},
        cloudinarySecureUrl:{type:String}
    },
    otpExpiresAt:{type:Date},
    phone:{type:String},
    socialLinks:{type:[SocialLinkSchema]},
    teamStrength:{type:String},
    username:{type:String},
    verificationToken:{type:String},
    vision:{type:String},
    website:{type:String}
}, {timestamps:true})