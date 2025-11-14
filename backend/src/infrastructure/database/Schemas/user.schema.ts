import { Schema } from 'mongoose';
import User from '../../../domain/entities/user/User';
import { Role } from '../../../domain/entities/user/User';
import SocialLinks from '../../../domain/entities/SocialLinks';
export const SocialLinksSchema = new Schema<SocialLinks>({
  domain:{type:String},
  url:{type:String}
})
export const UserSchema = new Schema<User>(
  {
    coverPhoto:{
      cloudinaryPublicId:{type:String},
      cloudinarySecureUrl:{type:String}
    },
    dateOfBirth:{type:Date},
    email:{type:String, required:true},
    facebookId:{type:String},
    googleId:{type:String},
    linkedinId:{type:String},
    headline:{type:String},
    isAdmin:{type:Boolean, default:false},
    isRecruiter:{type:Boolean, default:false},
    isBlocked:{type:Boolean, default:false},
    isVerified:{type:Boolean, default:false},
    name:{type:String, required:true},
    password:{type:String},
    location:{
      city:{type:String},
      district:{type:String},
      state:{type:String},
      country:{type:String},
      pincode:{type:String}
    },
    phone:{type:String},
    profilePicture:{
      cloudinaryPublicId:{type:String},
      cloudinarySecureUrl:{type:String}
    },
    role:{type:[String], enum:["user", "recruiter", "admin"], default:["user"]},
    socialLinks:{type:[SocialLinksSchema]},
    summary:{type:String},
    verificationToken:{type:String},
    otpExpiresAt:{type:Date}
  },
  { timestamps: true }
);
