import { injectable } from 'tsyringe';
import ISavePostRepo from '../../../domain/interfaces/user/ISavePostRepo';
import SavePost from '../../../domain/entities/post/savePost.entity';
import { SavePostModel } from '../../database/Schemas/user/savePost.schema';
import BaseRepository from '../baseRepository';

@injectable()
export default class SavePostRepository extends BaseRepository<SavePost> implements ISavePostRepo {
  constructor() {
    super(SavePostModel);
  }
  async save(userId: string, postId: string): Promise<SavePost | null> {
    try {
      const result = await SavePostModel.create({ userId, postId });
      return result;
    } catch (error) {
      console.log(error);
      console.log(error);
      return null;
    }
  }

  async unsave(userId: string, postId: string): Promise<boolean> {
    const result = await SavePostModel.findOneAndDelete({ userId, postId });
    return !!result;
  }

  async isSaved(userId: string, postId: string): Promise<boolean> {
    const result = await SavePostModel.exists({ userId, postId });
    return !!result;
  }
}
