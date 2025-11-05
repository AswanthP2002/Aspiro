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
    currentSubscription: { type: String },
    socialLinks: { type: [SocialLinkSchema] },
    organizationDetails: {
      organizationName: { type: String },
      organizationType: { type: String },
      organizationContactNumber: { type: String },
      aboutCompany: { type: String },
      vision: { type: String },
      website: { type: String },
      teamStrength: { type: String },
      socialLinks: { type: [SocialLinkSchema] },
      organizationEmail: { type: String },
      industry: { type: String },
    },
  },
  { timestamps: true }
);
