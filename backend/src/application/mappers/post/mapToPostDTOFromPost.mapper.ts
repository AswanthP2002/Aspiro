import Post from '../../../domain/entities/post/Post';
import { PostDTO } from '../../DTOs/post/post.dto';

export default function mapToPostDTOFromPost(post: Post): PostDTO {
  return {
    _id: post._id,
    description: post.description as string,
    media: post.media,
    likes: post.likes,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    userId: post.userId,
  };
}
