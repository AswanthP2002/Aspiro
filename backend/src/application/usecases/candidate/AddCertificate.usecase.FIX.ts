import ICertificateRepo from '../../../domain/interfaces/user/ICertificateRepo';
import streamifier from 'streamifier';
import cloudinary from '../../../utilities/cloudinary';
import { v4 } from 'uuid';
import IAddCertificateUseCase from './interface/IAddCertificate.usecase.FIX';
import CertificateDTO, {
  CreateCertificateDTO,
} from '../../DTOs/candidate -LEGACY/certificate.dto.FIX';
import { UploadApiResponse } from 'cloudinary';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class AddCertificateUseCase implements IAddCertificateUseCase {
  constructor(@inject('ICertificateRepository') private _iCertificateRepo: ICertificateRepo) {}

  async execute(addCertificateDto: CreateCertificateDTO): Promise<CertificateDTO | null> {
    const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: `candidate/documents/${addCertificateDto.path}_${new Date()}_${v4()}.pdf`,
          resource_type: 'raw',
          type: 'upload',
          access_mode: 'public',
        },
        (err, result) => {
          if (err) reject(err);

          resolve(result);
        }
      );

      streamifier.createReadStream(addCertificateDto.file).pipe(stream);
    });
    if (result) {
      const { secure_url, public_id } = result;

      const addCertificateResult = await this._iCertificateRepo.create({
        certificateId: addCertificateDto.candidateId,
        issuedOrganization: addCertificateDto.issuedOrganization,
        issuedDate: addCertificateDto.issuedDate,
        candidateId: addCertificateDto.candidateId?.toString(),
        certificateUrl: secure_url,
        certificatePublicId: public_id,
      });

      if (addCertificateResult) {
        const dto = plainToInstance(CertificateDTO, addCertificateResult);
        return dto;
      }
    }

    return null;
  }
}
