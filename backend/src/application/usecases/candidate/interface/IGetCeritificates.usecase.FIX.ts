import CertificateDTO from '../../../DTOs/candidate -LEGACY/certificate.dto.FIX';

export default interface ILoadCertificateUseCase {
  execute(candidateId?: string): Promise<CertificateDTO[] | null>;
}
