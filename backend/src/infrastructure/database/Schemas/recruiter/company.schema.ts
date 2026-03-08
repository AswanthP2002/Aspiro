import { Schema, model } from 'mongoose';
import Company from '../../../../domain/entities/company.entity';

const CompanySchema = new Schema<Company>(
  {
    name: { type: String, required: true },
    website: { type: String },
    linkedin: { type: String },
    description: { type: String },
    industry: { type: String },
    location: { type: String },
    slogan: { type: String },
    logo: {
      cloudinaryPublicId: { type: String },
      cloudinarySecureUrl: { type: String },
    },
  },
  { timestamps: true }
);

export const CompanyDAO = model<Company>('companies', CompanySchema);
