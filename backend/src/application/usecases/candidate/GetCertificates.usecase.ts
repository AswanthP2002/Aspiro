import Certificates from '../../../domain/entities/user/certificates.entity';
import ICertificateRepo from '../../../domain/interfaces/candidate/ICertificateRepo';
import ILoadCertificateUseCase from './interface/IGetCeritificates.usecase';
import CertificateDTO from '../../DTOs/candidate/certificate.dto';
import mapToCertificateDTOFromCertificate from '../../mappers/user/mapToCertificateDTOFromCertificate.mapper';

export default class GetCertificatesUseCase implements ILoadCertificateUseCase {
  constructor(private _iCertificateRepo: ICertificateRepo) {}

  async execute(candidateId?: string): Promise<CertificateDTO[] | null> {
    const result = await this._iCertificateRepo.findWithCandidateId(
      candidateId?.toString()
    ); //changed method to base repository method
    if (result) {
      const dto: CertificateDTO[] = [];
      result.forEach((certificate: Certificates) => {
        dto.push(mapToCertificateDTOFromCertificate(certificate));
      });

      return dto;
    }
    return null;
  }
}
