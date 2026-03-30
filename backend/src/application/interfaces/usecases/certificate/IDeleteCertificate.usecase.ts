import { DeleteCertificateDTO } from '../../../DTOs/certificate/certificate.dto.FIX';

export default interface IDeleteCertificateUsecase {
  execute(deleteCertificateDto: DeleteCertificateDTO): Promise<void>;
}
