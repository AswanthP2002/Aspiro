import IResumeRepo from '../../../domain/interfaces/user/IResumeRepo';
import cloudinary from '../../../utilities/cloudinary';
import streamifier from 'streamifier';
import { v4 } from 'uuid';
import IAddResumeUseCase from '../../interfaces/usecases/user/IAddResume.usecase.FIX';
import { UploadApiResponse } from 'cloudinary';
import ResumeDTO, { CreateResumeDTO } from '../../DTOs/user/resume.dto';
import { inject, injectable } from 'tsyringe';
import ResumeMapper from '../../mappers/user/Resume.mapperClass';

@injectable()
export default class AddResumeUseCase implements IAddResumeUseCase {
  constructor(
    @inject('IResumeRepository') private _iResumeRepo: IResumeRepo,
    @inject('ResumeMapper') private _mapper: ResumeMapper
  ) {}

  async execute(addResumeDto: CreateResumeDTO): Promise<ResumeDTO | null> {
    const result: UploadApiResponse | undefined = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          public_id: `candidate/documents/${addResumeDto.path}_${new Date()}_${v4()}`,
          resource_type: 'auto',
          access_mode: 'public',
        },
        async (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(addResumeDto.file).pipe(stream);
    });

    if (result) {
      //save the resume
      const addResumeResult = await this._iResumeRepo.create({
        userId: addResumeDto.userId,
        resumeUrlCoudinary: result.secure_url,
        resumePublicIdCloudinary: result?.public_id,
        name: addResumeDto.name,
        isPrimary: addResumeDto.isPrimary,
      });

      if (addResumeResult) {
        const dto = this._mapper.resumeToResumeDTO(addResumeResult);
        return dto;
      }
    }
    return null;
  }
}
