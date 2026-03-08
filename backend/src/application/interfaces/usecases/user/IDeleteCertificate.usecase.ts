import { DeleteCertificateDTO } from '../../../DTOs/user/certificate.dto.FIX';

export default interface IDeleteCertificateUsecase {
  execute(deleteCertificateDto: DeleteCertificateDTO): Promise<void>;
}
