import Post from '../../domain/entities/user/Post';
import CreatePostDTO from '../DTOs/post.dto';

export default function mapToPostFromDTO(createPostDto: CreatePostDTO): Post {
  return {
    content: createPostDto.content,
    media: createPostDto.media,
    creatorType: createPostDto.creatorType,
    likes: createPostDto.likes,
    creatorId: createPostDto.creatorId,
  };
}
