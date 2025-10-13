import Post from '../../../../domain/entities/Post.entity';
import { CreatePostResDTO } from '../../../DTOs/post.dto';

export default interface IGetUserSpecificPosts {
  execute(userId: string): Promise<any[] | null>;
}
