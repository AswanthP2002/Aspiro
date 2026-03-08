import CertificateDTO, { CreateCertificateDTO } from '../../../DTOs/user/certificate.dto.FIX';

export default interface IAddCertificateUseCase {
  execute(createCertificateDto: CreateCertificateDTO): Promise<CertificateDTO | null>;
}
