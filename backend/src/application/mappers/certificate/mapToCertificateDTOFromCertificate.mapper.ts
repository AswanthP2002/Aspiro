import Certificates from '../../../domain/entities/certificate/certificates.entity';
import CertificateDTO from '../../DTOs/certificate/certificate.dto.FIX';

export default function mapToCertificateDTOFromCertificate(
  certificate: Certificates
): CertificateDTO {
  return {
    _id: certificate._id,
    certificateId: certificate.certificateId,
    issuedOrganization: certificate.issuedOrganization,
    issuedDate: certificate.issuedDate,
    certificateUrl: certificate.certificateUrl,
    certificatePublicId: certificate.certificatePublicId,
    candidateId: certificate.candidateId,
    createdAt: certificate.createdAt,
  };
}
