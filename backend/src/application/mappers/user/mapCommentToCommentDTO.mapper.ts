import Comments from "../../../domain/entities/user/comments.entity";
import CommentsDTO from "../../DTOs/comments.dto";

export default function mapCommentToCommentDTO(comment: Comments) : CommentsDTO {
    return {
        _id: comment._id,
        postId: comment.postId,
        userId: comment.userId,
        text: comment.text,
        createdAt: comment.createdAt
    }
}