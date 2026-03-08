import SocialLinks from '../../../../domain/entities/SocialLinks';

import { Schema } from 'mongoose';
import Candidate from '../../../../domain/entities/user/candidate.entity.GARBAGE';

const SocialLinksSchema = new Schema<SocialLinks>({
  domain: { type: String },
  url: { type: String },
});

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
