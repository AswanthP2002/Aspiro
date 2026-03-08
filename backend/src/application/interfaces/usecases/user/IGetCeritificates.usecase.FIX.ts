import CertificateDTO from '../../../DTOs/user/certificate.dto.FIX';

export default interface ILoadCertificateUseCase {
  execute(userId?: string): Promise<CertificateDTO[] | null>;
}
