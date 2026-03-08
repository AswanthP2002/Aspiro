import Certificates from '../../../domain/entities/user/certificates.entity';
import CertificateDTO from '../../DTOs/user/certificate.dto.FIX';

export default class CertificateMapper {
  public certificateToCertificateDTO(certificate: Certificates): CertificateDTO {
    return {
      _id: certificate._id,
      name: certificate.name,
      issuedOrganization: certificate.issuedOrganization,
      issuedDate: certificate.issuedDate,
      certificatePublicId: certificate.certificatePublicId,
      certificateUrl: certificate.certificateUrl,
      createdAt: certificate.createdAt,
      userId: certificate.userId,
    };
  }
}
