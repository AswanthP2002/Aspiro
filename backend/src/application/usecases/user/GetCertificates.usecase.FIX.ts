import Certificates from '../../../domain/entities/user/certificates.entity';
import ICertificateRepo from '../../../domain/interfaces/user/ICertificateRepo';
import ILoadCertificateUseCase from '../../interfaces/usecases/user/IGetCeritificates.usecase.FIX';
import CertificateDTO from '../../DTOs/user/certificate.dto.FIX';
import { inject, injectable } from 'tsyringe';
import CertificateMapper from '../../mappers/user/Certificate.mapperClass';

@injectable()
export default class GetCertificatesUseCase implements ILoadCertificateUseCase {
  constructor(
    @inject('ICertificateRepository') private _iCertificateRepo: ICertificateRepo,
    @inject('CertificateMapper') private _mapper: CertificateMapper
  ) {}

  async execute(userId?: string): Promise<CertificateDTO[] | null> {
    const result = await this._iCertificateRepo.findWithCandidateId(userId?.toString());
    if (result) {
      const dto: CertificateDTO[] = [];
      result.forEach((certificate: Certificates) => {
        dto.push(this._mapper.certificateToCertificateDTO(certificate));
      });

      return dto;
    }
    return null;
  }
}
