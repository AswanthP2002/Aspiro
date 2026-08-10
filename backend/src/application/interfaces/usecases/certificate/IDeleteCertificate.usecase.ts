import { DeleteCertificateDTO } from '../../../DTOs/certificate/certificate.dto';

export default interface IDeleteCertificateUsecase {
  execute(deleteCertificateDto: DeleteCertificateDTO): Promise<void>;
}
