import Comments from '../../../domain/entities/comment/comments.entity';
import { CreateCommentDto } from '../../DTOs/comment/comments.dto';

export default function mapCreateCommentDtoToComment(createCommentDto: CreateCommentDto): Comments {
  return {
    postId: createCommentDto.postId,
    userId: createCommentDto.userId,
    text: createCommentDto.text,
    parentId: createCommentDto.parentId,
    depth: createCommentDto.depth,
  };
}
