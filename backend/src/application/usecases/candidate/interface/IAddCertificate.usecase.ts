import CertificateDTO, {
  CreateCertificateDTO,
} from '../../../DTOs/candidate -LEGACY/certificate.dto';

export default interface IAddCertificateUseCase {
  execute(
    createCertificateDto: CreateCertificateDTO
  ): Promise<CertificateDTO | null>;
}
