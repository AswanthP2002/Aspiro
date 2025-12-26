import { inject, injectable } from 'tsyringe';
import IResumeRepo from '../../../domain/interfaces/user/IResumeRepo';
import cloudinary from '../../../utilities/cloudinary';
import { DeleteResumeDTO } from '../../DTOs/candidate -LEGACY/resume.dto';
import IDeleteResumeUseCase from './interface/IDeleteResume.usecase.FIX';

@injectable()
export default class DeleteResumeUseCase implements IDeleteResumeUseCase {
  constructor(@inject('IResumeRepository') private _iResumeRepo: IResumeRepo) {}

  async execute(deleteResumeDto: DeleteResumeDTO): Promise<void> {
    const { cloudinaryPublicId, resumeId } = deleteResumeDto;
    const promiseResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(
        cloudinaryPublicId,
        {
          resource_type: 'raw',
        },
        (err, result) => {
          if (err) reject(err);
          resolve(result);
        }
      );
    });

    if (promiseResult) {
      await this._iResumeRepo.delete(resumeId);
    }
  }
}
