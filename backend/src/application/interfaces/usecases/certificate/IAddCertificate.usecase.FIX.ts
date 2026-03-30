import CertificateDTO, {
  CreateCertificateDTO,
} from '../../../DTOs/certificate/certificate.dto.FIX';

export default interface IAddCertificateUseCase {
  execute(createCertificateDto: CreateCertificateDTO): Promise<CertificateDTO | null>;
}
