import { Schema } from 'mongoose';
import Certificates from '../../../../domain/entities/candidate/certificates.entity';

export const CertificateSchema = new Schema<Certificates>(
  {
    certificateId: { type: String },
    issuedOrganization: { type: String },
    issuedDate: { type: Date },
    certificateUrl: { type: String },
    certificatePublicId: { type: String },
    candidateId: {
      type: Schema.Types.ObjectId,
      ref: 'candidates',
      required: true,
    },
  },
  { timestamps: true }
);
