import mongoose, { Schema, Types } from 'mongoose';
import Experience from '../../../../domain/entities/candidate/experience.entity';
import { CandidateDAO } from '../../DAOs/candidate/candidateDAO';
import { boolean } from 'zod';

export const CandidateExperienceSchema = new Schema(
  {
    candidateId: { type: Schema.Types.ObjectId },
    role: { type: String },
    organization: { type: String },
    location: { type: String },
    locationtype: { type: String },
    jobtype: { type: String },
    ispresent: { type: Boolean },
    startdate: { type: Date },
    enddate: { type: Date },
  },
  { timestamps: true }
);
