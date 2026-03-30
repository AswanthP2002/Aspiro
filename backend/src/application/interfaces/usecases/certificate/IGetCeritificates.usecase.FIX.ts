import CertificateDTO from '../../../DTOs/certificate/certificate.dto.FIX';

export default interface ILoadCertificateUseCase {
  execute(userId?: string): Promise<CertificateDTO[] | null>;
}
