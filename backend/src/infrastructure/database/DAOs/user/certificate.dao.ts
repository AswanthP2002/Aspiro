import { model } from 'mongoose';
import Certificates from '../../../../domain/entities/user/certificates.entity';
import { CertificateSchema } from '../../Schemas/user/certificate.schema';

export const CertificateDAO = model<Certificates>(
  'certificate',
  CertificateSchema
);
