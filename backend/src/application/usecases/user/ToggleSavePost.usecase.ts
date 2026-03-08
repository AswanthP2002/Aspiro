import { inject, injectable } from 'tsyringe';
import IToggleSavePostUsecase from '../../interfaces/usecases/user/IToggleSavePost.usecase';
import ISavePostRepo from '../../../domain/interfaces/user/ISavePostRepo';
import SavePostDTO from '../../DTOs/user/savePost.dto';

@injectable()
export default class ToggleSavePostUsecase implements IToggleSavePostUsecase {
  constructor(@inject('ISavePostRepository') private _savePostRepo: ISavePostRepo) {}

  async execute(userId: string, postId: string): Promise<SavePostDTO | null> {
    const isSaved = await this._savePostRepo.isSaved(userId, postId);

    if (isSaved) {
      await this._savePostRepo.unsave(userId, postId);
      return { userId, postId, isSaved: false };
    } else {
      const saved = await this._savePostRepo.save(userId, postId);
      return {
        _id: saved?._id,
        userId,
        postId,
        isSaved: true,
      };
    }
  }
}
