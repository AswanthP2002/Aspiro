import { PostDTO } from '../../../DTOs/post/post.dto';

export default interface IGetUserSpecificPosts {
  execute(userId: string): Promise<PostDTO[] | null>;
}
