import CertificateDTO, {
  CreateCertificateDTO,
} from '../../../DTOs/candidate -LEGACY/certificate.dto.FIX';

export default interface IAddCertificateUseCase {
  execute(createCertificateDto: CreateCertificateDTO): Promise<CertificateDTO | null>;
}
