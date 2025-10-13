import { CreateCertificateDTO } from '../../../application/DTOs/candidate/certificate.dto';
import { AddCertificateRequestDTO } from '../../DTOs/candidate/addCertificateRequestDTO';

export default function mapToCreateCertificateDTOFromRequest(
  requestDto: AddCertificateRequestDTO
): CreateCertificateDTO {
  return {
    candidateId: requestDto.candidateId,
    issuedOrganization: requestDto.issuedOrganization,
    issuedDate: requestDto.issuedDate,
    certificateId: requestDto.certificateId,
    file: requestDto.file,
    path: requestDto.path,
  };
}
