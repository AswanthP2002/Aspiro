import CertificateDTO from '../../../DTOs/certificate/certificate.dto';

export default interface ILoadCertificateUseCase {
  execute(userId?: string): Promise<CertificateDTO[] | null>;
}
