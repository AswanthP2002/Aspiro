import IResumeRepo from '../../../domain/interfaces/candidate/IResumeRepo';
import cloudinary from '../../../utilities/cloudinary';
import { DeleteResumeDTO } from '../../DTOs/candidate -LEGACY/resume.dto';
import IDeleteResumeUseCase from './interface/IDeleteResume.usecase';

export default class DeleteResumeUseCase implements IDeleteResumeUseCase {
  constructor(private _iResumeRepo: IResumeRepo) {}

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
