import { Schema } from 'mongoose';
import Certificates from '../../../../domain/entities/certificate/certificates.entity';

export const CertificateSchema = new Schema<Certificates>(
  {
    name: { type: String, required: true },
    issuedOrganization: { type: String },
    issuedDate: { type: Date },
    certificateUrl: { type: String },
    certificatePublicId: { type: String },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  { timestamps: true }
);
