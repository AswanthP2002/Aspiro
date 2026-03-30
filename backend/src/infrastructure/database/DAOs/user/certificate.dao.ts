import { model } from 'mongoose';
import Certificates from '../../../../domain/entities/certificate/certificates.entity';
import { CertificateSchema } from '../../Schemas/user/certificate.schema';

export const CertificateDAO = model<Certificates>('certificate', CertificateSchema);
