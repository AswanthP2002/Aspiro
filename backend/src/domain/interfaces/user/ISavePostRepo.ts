import SavePost from '../../entities/user/savePost.entity';
import IBaseRepo from '../IBaseRepo';

export default interface ISavePostRepo extends IBaseRepo<SavePost> {
  save(userId: string, postId: string): Promise<SavePost | null>;
  unsave(userId: string, postId: string): Promise<boolean>;
  isSaved(userId: string, postId: string): Promise<boolean>;
}
