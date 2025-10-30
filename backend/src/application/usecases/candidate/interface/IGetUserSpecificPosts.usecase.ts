import Post from '../../../../domain/entities/user/Post';
import { CreatePostResDTO } from '../../../DTOs/post.dto';

export default interface IGetUserSpecificPosts {
  execute(userId: string): Promise<any[] | null>;
}
