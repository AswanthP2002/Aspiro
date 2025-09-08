import mongoose, {Schema, Document} from 'mongoose'
import Candidate from '../../../../domain/entities/candidate/candidates'
import SocialLinks from '../../../../domain/entities/socialLinks'

const SocialLinksSchema = new Schema<SocialLinks>({
    domain:{type:String},
    url:{type:String}
})

export interface CandidateDocuemnt extends Omit<Candidate, "_id">, Document {}

export const CandidateSchema = new Schema<Candidate>({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    phone:{type:String, required:true},
    about:{type:String},
    coverPhoto:{
        cloudinaryPublicId:{type:String},
        cloudinarySecureUrl:{type:String}
    },
    currentSubscription:{type:String},
    dateOfBirth:{type:Date},
    facebookid:{type:String},
    googleid:{type:String},
    isAdmin:{type:Boolean, default:false},
    isBlocked:{type:Boolean, default:false},
    isVerified:{type:Boolean, default:false},
    location:{
        city:{type:String, default:""},
        district:{type:String, default:""},
        state:{type:String, default:""},
        country:{type:String,default:""},
        pincode:{type:String, default:""}
    },
    verificationToken:{type:String},
    otpExpiresAt:{type:Date},
    profilePicture:{
        cloudinaryPublicId:{type:String, default:""},
        cloudinarySecureUrl:{type:String, default:""}
    },
    role:{type:String, default:""},
    socialLinks:{type:[SocialLinksSchema], default:[]}
}, {timestamps:true})