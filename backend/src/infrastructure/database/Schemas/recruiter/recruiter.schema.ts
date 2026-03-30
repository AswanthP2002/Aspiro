import mongoose, { Schema } from 'mongoose';
import { NewRecruiter } from '../../../../domain/entities/recruiter/recruiter.entity';
// import SocialLinks from '../../../../domain/entities/user/SocialLinks';

// const SocialLinkSchema = new Schema<SocialLinks>({
//   domain: { type: String },
//   url: { type: String },
// });

const VerificationTimeLineSchema = new Schema<{
  action: string;
  actor: string;
  createdAt: string;
  updatedAt: string;
}>(
  {
    action: { type: String },
    actor: { type: String },
  },
  { timestamps: true }
);

export const RecruiterSchema = new Schema<NewRecruiter>(
  {
    fullName: { type: String },
    professionalTitle: { type: String },
    email: { type: String },
    phone: { type: String },
    applicationResendBufferDate: { type: Date },
    companyId: { type: mongoose.Types.ObjectId },
    isJobsHidden: { type: Boolean },
    isPermissionRevoked: { type: Boolean },
    isRejected: { type: Boolean },
    isVerified: { type: Boolean },
    profileStatus: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected', 'closed'],
      default: 'pending',
    },
    rejection: {
      reason: { type: String },
      feedback: { type: String },
    },
    verificationTimeline: { type: [VerificationTimeLineSchema] },
    linkedinUrl: { type: String },
    recruiterType: { type: String, enum: ['freelance', 'corporate'] },
    userId: { type: mongoose.Types.ObjectId },
    verificationDocument: {
      publicId: { type: String },
      url: { type: String },
    },
    yearOfExperience: { type: Number },
  },
  { timestamps: true }
);
