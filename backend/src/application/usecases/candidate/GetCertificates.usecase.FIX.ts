import Certificates from '../../../domain/entities/user/certificates.entity';
import ICertificateRepo from '../../../domain/interfaces/user/ICertificateRepo';
import ILoadCertificateUseCase from './interface/IGetCeritificates.usecase.FIX';
import CertificateDTO from '../../DTOs/candidate -LEGACY/certificate.dto.FIX';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class GetCertificatesUseCase implements ILoadCertificateUseCase {
  constructor(@inject('ICertificateRepository') private _iCertificateRepo: ICertificateRepo) {}

  async execute(candidateId?: string): Promise<CertificateDTO[] | null> {
    const result = await this._iCertificateRepo.findWithCandidateId(candidateId?.toString()); //changed method to base repository method
    if (result) {
      const dto: CertificateDTO[] = [];
      result.forEach((certificate: Certificates) => {
        dto.push(plainToInstance(CertificateDTO, certificate));
      });

      return dto;
    }
    return null;
  }
}
