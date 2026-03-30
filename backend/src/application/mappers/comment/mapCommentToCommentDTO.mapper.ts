import Comments from '../../../domain/entities/comment/comments.entity';
import CommentsDTO from '../../DTOs/comment/comments.dto';

export default function mapCommentToCommentDTO(comment: Comments): CommentsDTO {
  return {
    _id: comment._id,
    postId: comment.postId,
    userId: comment.userId,
    text: comment.text,
    createdAt: comment.createdAt,
    depth: comment.depth,
    likes: comment.likes,
    parentId: comment.parentId,
    replyCount: comment.replyCount,
  };
}
