// import {Schema, Document} from 'mongoose'
// import Candidate from '../../../../domain/entities/candidate/candidates'
import SocialLinks from '../../../../domain/entities/socialLinks.entity';

import { Schema } from 'mongoose';
import Candidate from '../../../../domain/entities/candidate/candidate.entity';

const SocialLinksSchema = new Schema<SocialLinks>({
  domain: { type: String },
  url: { type: String },
});

// export interface CandidateDocuemnt extends Omit<Candidate, "_id">, Document {}

// export const CandidateSchema = new Schema<Candidate>({
//     name:{type:String, required:true},
//     email:{type:String, required:true},
//     password:{type:String},
//     phone:{type:String},
//     about:{type:String},
//     coverPhoto:{
//         cloudinaryPublicId:{type:String},
//         cloudinarySecureUrl:{type:String}
//     },
//     currentSubscription:{type:String},
//     dateOfBirth:{type:Date},
//     facebookid:{type:String},
//     googleid:{type:String},
//     isAdmin:{type:Boolean, default:false},
//     isBlocked:{type:Boolean, default:false},
//     isVerified:{type:Boolean, default:false},
//     location:{
//         city:{type:String, default:""},
//         district:{type:String, default:""},
//         state:{type:String, default:""},
//         country:{type:String,default:""},
//         pincode:{type:String, default:""}
//     },
//     verificationToken:{type:String},
//     otpExpiresAt:{type:Date},
//     profilePicture:{
//         cloudinaryPublicId:{type:String, default:""},
//         cloudinarySecureUrl:{type:String, default:""}
//     },
//     role:{type:String, default:""},
//     socialLinks:{type:[SocialLinksSchema], default:[]}
// }, {timestamps:true})

export const CandidateSchema = new Schema<Candidate>(
  {
    name: { type: String, required: true },
    jobTitle: { type: String },
    about: { type: String },
    dateOfBirth: { type: Date },
    socialLinks: { type: [SocialLinksSchema] },
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    location: {
      city: { type: String },
      district: { type: String },
      state: { type: String },
      country: { type: String },
      pincode: { type: String },
    },
  },

  { timestamps: true }
);
