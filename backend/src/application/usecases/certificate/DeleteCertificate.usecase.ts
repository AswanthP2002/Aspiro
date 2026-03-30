import { inject, injectable } from 'tsyringe';
import IDeleteCertificateUsecase from '../../interfaces/usecases/certificate/IDeleteCertificate.usecase';
import ICertificateRepo from '../../../domain/interfaces/user/ICertificateRepo';
import { DeleteCertificateDTO } from '../../DTOs/certificate/certificate.dto.FIX';
import deleteAssetsCloudinary from '../../../services/deleteAssetsCloudinary';

@injectable()
export default class DeleteCertificateUsecase implements IDeleteCertificateUsecase {
  constructor(@inject('ICertificateRepository') private _repo: ICertificateRepo) {}

  async execute(deleteCertificateDto: DeleteCertificateDTO): Promise<void> {
    const { certificateId, cloudinaryPublicId } = deleteCertificateDto;

    await deleteAssetsCloudinary(cloudinaryPublicId);
    await this._repo.delete(certificateId);
  }
}
