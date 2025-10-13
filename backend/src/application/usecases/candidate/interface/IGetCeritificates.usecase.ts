import CertificateDTO from '../../../DTOs/candidate/certificate.dto';

export default interface ILoadCertificateUseCase {
  execute(candidateId?: string): Promise<CertificateDTO[] | null>;
}
