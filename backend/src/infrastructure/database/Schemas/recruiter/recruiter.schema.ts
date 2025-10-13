import { Schema } from 'mongoose';
import Recruiter from '../../../../domain/entities/recruiter/recruiter.entity';
import SocialLinks from '../../../../domain/entities/socialLinks.entity';

const SocialLinkSchema = new Schema<SocialLinks>({
  domain: { type: String },
  url: { type: String },
});

export const RecruiterSchema = new Schema<Recruiter>(
  {
    name: { type: String },
    employerType: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    about: { type: String },
    currentSubscription: { type: String },
    location: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pinCode: { type: String },
    },
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
