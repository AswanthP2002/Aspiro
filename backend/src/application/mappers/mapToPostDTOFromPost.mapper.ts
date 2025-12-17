import Post from '../../domain/entities/user/Post';
import { PostDTO } from '../DTOs/post.dto';

export default function mapToPostDTOFromPost(post: Post): PostDTO {
  return {
    _id: post._id,
    description: post.description,
    media: post.media,
    likes: post.likes,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    userId: post.userId,
  };
}
