import ICertificateRepo from '../../../domain/interfaces/user/ICertificateRepo';
import streamifier from 'streamifier';
import cloudinary from '../../../utilities/cloudinary';
import { v4 } from 'uuid';
import IAddCertificateUseCase from '../../interfaces/usecases/certificate/IAddCertificate.usecase.FIX';
import CertificateDTO, { CreateCertificateDTO } from '../../DTOs/certificate/certificate.dto.FIX';
import { UploadApiResponse } from 'cloudinary';
import { inject, injectable } from 'tsyringe';
import CertificateMapper from '../../mappers/certificate/Certificate.mapperClass';

@injectable()
export default class AddCertificateUseCase implements IAddCertificateUseCase {
  constructor(
    @inject('ICertificateRepository') private _iCertificateRepo: ICertificateRepo,
    @inject('CertificateMapper') private _mapper: CertificateMapper
  ) {}

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
        name: addCertificateDto.name,
        issuedOrganization: addCertificateDto.issuedOrganization,
        issuedDate: addCertificateDto.issuedDate,
        userId: addCertificateDto.userId?.toString(),
        certificateUrl: secure_url,
        certificatePublicId: public_id,
      });

      if (addCertificateResult) {
        const dto = this._mapper.certificateToCertificateDTO(addCertificateResult);
        return dto;
      }
    }

    return null;
  }
}
