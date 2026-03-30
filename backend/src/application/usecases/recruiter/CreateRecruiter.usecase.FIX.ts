import IRecruiterRepo from '../../../domain/interfaces/recruiter/IRecruiterRepo';
import CreateRecruiterDTO, { RecruiterDTO } from '../../DTOs/recruiter/recruiter.dto.FIX';
import { injectable, inject } from 'tsyringe';
import ICreateRecruiterUsecase from '../../interfaces/usecases/recruiter/ICreateRecruiter.usecase.FIX';
import RecruiterMapper from '../../mappers/recruiter/Recruiter.mapperClass';
import { UploadApiResponse } from 'cloudinary';
import cloudinary from '../../../utilities/cloudinary';
import streamifier from 'streamifier';
import { v4 } from 'uuid';

@injectable()
export default class CreateRecruiterUsecase implements ICreateRecruiterUsecase {
  constructor(
    @inject('IRecruiterRepository') private _recruiterRepo: IRecruiterRepo,
    @inject('RecruiterMapper') private _mapper: RecruiterMapper
  ) {}

  async execute(createRecruiterDto: CreateRecruiterDTO): Promise<RecruiterDTO | null> {
    const newRecruiter = this._mapper.createRecruiterDtoToRecruiter(createRecruiterDto);
    const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: `recruiter/documents/${createRecruiterDto.verificationDocumentFilePath}_${new Date()}_${v4()}.pdf`,
          resource_type: 'raw',
          type: 'upload',
          access_mode: 'public',
        },
        (err, result) => {
          if (err) reject(err);

          resolve(result);
        }
      );

      streamifier.createReadStream(createRecruiterDto.verificationDocumentFile).pipe(stream);
    });
    const createRecruiterResult = await this._recruiterRepo.create({
      ...newRecruiter,
      verificationDocument: {
        publicId: result?.public_id,
        url: result?.secure_url,
      },
    });

    if (createRecruiterResult) {
      const recruiterDto = this._mapper.recruiterToRecruiterDTO(createRecruiterResult);
      return recruiterDto;
    }

    return null;
  }
}
