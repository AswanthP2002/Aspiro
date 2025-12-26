import { Schema } from 'mongoose';
import Recruiter from '../../../../domain/entities/recruiter/recruiter.entity';
import SocialLinks from '../../../../domain/entities/SocialLinks';

const SocialLinkSchema = new Schema<SocialLinks>({
  domain: { type: String },
  url: { type: String },
});

export const RecruiterSchema = new Schema<Recruiter>(
  {
    employerType: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    organizationDetails: {
      organizationName: { type: String },
      organizationType: { type: String },
      organizationContactNumber: { type: String },
      summary: { type: String },
      linkedinUrl: { type: String },
      website: { type: String },
      teamStrength: { type: String },
      organizationEmail: { type: String },
      industry: { type: String },
    },
    focusingIndustries: { type: [String] },
    profileStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended', 'closed'],
      default: 'pending',
    },
    isDeleted: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
    recruitingExperience: { type: String },
    summary: { type: String },
  },
  { timestamps: true }
);
