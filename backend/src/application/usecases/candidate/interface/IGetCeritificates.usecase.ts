import CertificateDTO from '../../../DTOs/candidate -LEGACY/certificate.dto';

export default interface ILoadCertificateUseCase {
  execute(candidateId?: string): Promise<CertificateDTO[] | null>;
}
